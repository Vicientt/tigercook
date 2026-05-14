// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../firebase.js", () => ({ db: {} }));
vi.mock("firebase/firestore", () => ({
  collection: vi.fn().mockReturnValue("colRef"),
  getDocs: vi.fn(),
  orderBy: vi.fn().mockReturnValue("orderByClause"),
  query: vi.fn().mockReturnValue("queryRef"),
  where: vi.fn().mockReturnValue("whereClause"),
}));

import { getUserRecipes } from "../../utils/getUserRecipes.js";
import { getDocs, where, orderBy, query } from "firebase/firestore";

describe("getUserRecipes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns an empty array immediately when userId is falsy", async () => {
    expect(await getUserRecipes(null)).toEqual([]);
    expect(await getUserRecipes(undefined)).toEqual([]);
    expect(await getUserRecipes("")).toEqual([]);
    expect(getDocs).not.toHaveBeenCalled();
  });

  it("queries Firestore with the userId and maps snapshot docs to plain objects", async () => {
    getDocs.mockResolvedValueOnce({
      docs: [
        { id: "doc1", data: () => ({ title: "Pasta", userId: "u1" }) },
        { id: "doc2", data: () => ({ title: "Pizza", userId: "u1" }) },
      ],
    });

    const result = await getUserRecipes("u1");

    expect(getDocs).toHaveBeenCalledOnce();
    expect(where).toHaveBeenCalledWith("userId", "==", "u1");
    expect(orderBy).toHaveBeenCalledWith("createdAt", "desc");
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ id: "doc1", title: "Pasta", userId: "u1" });
    expect(result[1]).toEqual({ id: "doc2", title: "Pizza", userId: "u1" });
  });
});
