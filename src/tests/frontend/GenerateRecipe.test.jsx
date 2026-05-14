import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import GenerateRecipe from "../../pages/GenerateRecipe.jsx";

vi.mock("../../firebase.js", () => ({ auth: {}, db: {} }));
vi.mock("../../hooks/useAuth.js", () => ({
  useAuth: () => ({ user: { uid: "test-user" }, loading: false }),
}));
vi.mock("../../components/Header.jsx", () => ({
  default: () => <div data-testid="header" />,
}));
vi.mock("../../components/Footer.jsx", () => ({
  default: () => <div data-testid="footer" />,
}));

describe("GenerateRecipe page", () => {
  it("renders budget, servings and cooking time slider labels", () => {
    render(
      <MemoryRouter>
        <GenerateRecipe />
      </MemoryRouter>,
    );

    expect(screen.getByText("Budget")).toBeInTheDocument();
    expect(screen.getByText("Servings")).toBeInTheDocument();
    expect(screen.getByText("Cooking Time")).toBeInTheDocument();
  });

  it("renders all diet and cuisine options including Vegetarian and Asian", () => {
    render(
      <MemoryRouter>
        <GenerateRecipe />
      </MemoryRouter>,
    );

    expect(screen.getByText("Vegetarian")).toBeInTheDocument();
    expect(screen.getByText("Vegan")).toBeInTheDocument();
    expect(screen.getByText("Asian")).toBeInTheDocument();
    expect(screen.getByText("Italian")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /generate recipe with ai/i }),
    ).toBeInTheDocument();
  });
});
