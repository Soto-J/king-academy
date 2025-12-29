import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { cleanup, render, screen, waitFor } from "@testing-library/react";

import { SignInView } from "../sign-in-view";

// vi.mock("next/navigation", () => ({
//   useRouter: () => ({
//     push: vi.fn(),
//     replace: vi.fn(),
//     refresh: vi.fn(),
//     back: vi.fn(),
//     forward: vi.fn(),
//     prefetch: vi.fn(),
//   }),
//   usePathname: () => "/sign-up",
//   useSearchParams: () => new URLSearchParams(),
// }));

// Mock authClient
vi.mock("@/lib/auth/auth-client", () => ({
  authClient: {
    signIn: {
      email: vi.fn(),
      social: vi.fn(),
    },
  },
}));

// // Mock AuthBrandPannel component
// vi.mock("@/modules/auth/ui/components/auth-brand-pannel", () => ({
//   AuthBrandPannel: () => <div data-testid="auth-brand-pannel">Brand Panel</div>,
// }));

// Mock AuthHeader component
// vi.mock("@/modules/auth/ui/components/auth-header", () => ({
//   AuthHeader: ({
//     title,
//     description,
//   }: {
//     title: string;
//     description: string;
//   }) => (
//     <div>
//       <h1>{title}</h1>
//       <p>{description}</p>
//     </div>
//   ),
// }));

const signInSetup = () => {
  render(<SignInView />);
  return {
    user: userEvent.setup(),
    emailInput: screen.getByLabelText(/email address/i),
    passwordInput: screen.getByLabelText(/password/i),
    signInButton: screen.getByRole("button", {
      name: /sign in/i,
    }),
  };
};

describe("SignInView", () => {
  beforeEach(vi.clearAllMocks);
  afterEach(cleanup);

  it("renders sign-in form with all required fields", () => {
    const { emailInput, passwordInput, signInButton } = signInSetup();

    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
    expect(
      screen.getByText(/access your king academy dashboard/i),
    ).toBeInTheDocument();

    expect(emailInput).toHaveAttribute("type", "email");
    expect(passwordInput).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
  });

  it("renders Google sign-in button", () => {
    signInSetup();

    expect(
      screen.getByRole("button", { name: /continue with google/i }),
    ).toBeInTheDocument();
  });

  it.todo("displays validation error for invalid email", async () => {
    const { user, emailInput, signInButton } = signInSetup();

    await user.type(emailInput, "invalid-email");
    await user.click(signInButton);

    await waitFor(() => {
      expect(emailInput).toBeInvalid();
    });
  });

  it("displays validation error for empty password", async () => {
    const { user, emailInput, signInButton } = signInSetup();

    await user.type(emailInput, "test@example.com");
    await user.click(signInButton);

    await waitFor(() => {
      expect(screen.getByText(/password is required/i));
    });
  });

  it("calls authClient.signIn.email with correct values on form submission", async () => {
    const { authClient } = await import("@/lib/auth/auth-client");

    const { user, emailInput, passwordInput, signInButton } = signInSetup();

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.click(signInButton);

    await waitFor(() => {
      expect(authClient.signIn.email).toHaveBeenCalledWith(
        expect.objectContaining({
          email: "test@example.com",
          password: "password123",
          callbackURL: "/",
        }),
        expect.any(Object),
      );
    });
  });

  it("shows loading state during sign-in", async () => {
    const { user, emailInput, passwordInput, signInButton } = signInSetup();

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.click(signInButton);

    expect(
      screen.getByRole("button", { name: /signing in/i }),
    ).toBeInTheDocument();
  });

  it("calls authClient.signIn.social when Google button is clicked", async () => {
    const { authClient } = await import("@/lib/auth/auth-client");

    const { user } = signInSetup();

    const googleButton = screen.getByRole("button", {
      name: /continue with google/i,
    });

    expect(googleButton).toBeInTheDocument();

    await user.click(googleButton);

    expect(authClient.signIn.social).toHaveBeenCalledWith(
      expect.objectContaining({
        provider: "google",
        callbackURL: "/",
      }),
      expect.objectContaining({
        onSuccess: expect.any(Function),
        onError: expect.any(Function),
      }),
    );
  });

  it("renders link to sign-up page", () => {
    signInSetup();

    expect(
      screen.getByRole("link", { name: /create account/i }),
    ).toBeInTheDocument();
  });

  it("renders terms of service and privacy policy links", () => {
    signInSetup();

    expect(
      screen.getByRole("link", { name: /terms of service/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /privacy policy/i }),
    ).toBeInTheDocument();
  });
});
