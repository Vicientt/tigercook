import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ForgotPassword from "../../pages/ForgotPassword.jsx";

vi.mock("../../firebase.js", () => ({ auth: {} }));
vi.mock("firebase/auth", () => ({
  sendPasswordResetEmail: vi.fn().mockResolvedValue(undefined),
}));
vi.mock("../../hooks/useAuth.js", () => ({
  useAuth: () => ({ user: null, loading: false }),
}));

describe("ForgotPassword page", () => {
  it("renders email input and Send Reset Link button", () => {
    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>,
    );

    expect(
      screen.getByPlaceholderText("your.email@college.edu"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send reset link/i }),
    ).toBeInTheDocument();
  });

  it("shows success message after reset email is sent", async () => {
    const { sendPasswordResetEmail } = await import("firebase/auth");
    sendPasswordResetEmail.mockResolvedValueOnce(undefined);

    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText("your.email@college.edu"), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /send reset link/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/reset link sent/i),
      ).toBeInTheDocument();
    });
  });
});
