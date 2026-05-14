import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Header from "../../components/Header.jsx";

vi.mock("../../firebase.js", () => ({ auth: {} }));
vi.mock("../../hooks/useAuth.js", () => ({
  useAuth: () => ({
    user: { uid: "test-user", displayName: "Tiger" },
    loading: false,
    logout: vi.fn(),
  }),
}));

describe("Header", () => {
  it("renders the TigerCook brand name", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByText("TigerCook")).toBeInTheDocument();
  });

  it("renders all five navigation buttons", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Recipe Generator")).toBeInTheDocument();
    expect(screen.getByText("Explore Recipes")).toBeInTheDocument();
    expect(screen.getByText("Favorites")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });
});
