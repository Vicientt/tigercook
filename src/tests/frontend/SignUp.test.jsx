import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import SignUp from "../../pages/SignUp.jsx";

vi.mock("../../firebase.js", () => ({ auth: {} }));
vi.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: vi.fn(),
  updateProfile: vi.fn(),
}));
vi.mock("../../hooks/useAuth.js", () => ({
  useAuth: () => ({ user: null, loading: false }),
}));

describe("SignUp page", () => {
  it("renders all four form fields (name, email, password, confirm password)", () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>,
    );

    expect(screen.getByPlaceholderText("John Doe")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("your.email@college.edu"),
    ).toBeInTheDocument();
    const passwordInputs = screen.getAllByPlaceholderText("••••••••");
    expect(passwordInputs).toHaveLength(2);
  });

  it("shows error when password and confirm password do not match", async () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText("John Doe"), {
      target: { value: "Tiger Cook" },
    });
    const [pw, confirm] = screen.getAllByPlaceholderText("••••••••");
    fireEvent.change(pw, { target: { value: "password1" } });
    fireEvent.change(confirm, { target: { value: "different2" } });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(
        screen.getByText(
          "Password and confirm password are not the same!",
        ),
      ).toBeInTheDocument();
    });
  });
});
