import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Login from "../../pages/Login.jsx";

vi.mock("../../firebase.js", () => ({ auth: {} }));
vi.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: vi.fn(),
}));
vi.mock("../../hooks/useAuth.js", () => ({
  useAuth: () => ({ user: null, loading: false }),
}));

describe("Login page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders email and password inputs with a login button", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    expect(
      screen.getByPlaceholderText("your.email@college.edu"),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("••••••••")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /login/i }),
    ).toBeInTheDocument();
  });

  it("shows validation error when submitting with empty fields", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    fireEvent.submit(screen.getByRole("button", { name: /login/i }).closest("form"));

    await waitFor(() => {
      expect(
        screen.getByText("Please enter your email and password."),
      ).toBeInTheDocument();
    });
  });
});
