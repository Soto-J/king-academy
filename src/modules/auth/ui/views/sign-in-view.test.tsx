import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import { SignInView } from "./sign-in-view";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/sign-up",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock authClient
vi.mock("@/lib/auth/auth-client", () => ({
  authClient: {
    signIn: {
      email: vi.fn(),
      social: vi.fn(),
    },
  },
}));

// Mock AuthBrandPannel component
vi.mock("@/modules/auth/ui/components/auth-brand-pannel", () => ({
  AuthBrandPannel: () => <div data-testid="auth-brand-pannel">Brand Panel</div>,
}));

// Mock AuthHeader component
vi.mock("@/modules/auth/ui/components/auth-header", () => ({
  AuthHeader: ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  ),
}));

describe("SignInView", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders sign-in form with all required fields", () => {
    render(<SignInView />);

    expect(screen.getByText("Welcome Back")).toBeInTheDocument();
    expect(
      screen.getByText("Access your King Academy dashboard"),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i }),
    ).toBeInTheDocument();
  });

  it("renders Google sign-in button", () => {
    render(<SignInView />);

    expect(
      screen.getByRole("button", { name: /continue with google/i }),
    ).toBeInTheDocument();
  });

  it.skip("displays validation error for invalid email", async () => {
    const user = userEvent.setup();
    render(<SignInView />);

    const emailInput = screen.getByLabelText(/email address/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    await user.type(emailInput, "invalid-email");
    await user.tab(); // Blur the field to trigger validation
    await user.click(submitButton);

    // Check if email input has aria-invalid attribute
    await waitFor(() => {
      expect(emailInput).toHaveAttribute("aria-invalid", "true");
    });
  });

  it("displays validation error for empty password", async () => {
    const user = userEvent.setup();
    render(<SignInView />);

    const emailInput = screen.getByLabelText(/email address/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    await user.type(emailInput, "test@example.com");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it("calls authClient.signIn.email with correct values on form submission", async () => {
    const { authClient } = await import("@/lib/auth/auth-client");
    const user = userEvent.setup();

    render(<SignInView />);

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

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
    const user = userEvent.setup();
    render(<SignInView />);

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    expect(
      screen.getByRole("button", { name: /signing in/i }),
    ).toBeInTheDocument();
  });

  it("calls authClient.signIn.social when Google button is clicked", async () => {
    const { authClient } = await import("@/lib/auth/auth-client");
    const user = userEvent.setup();

    render(<SignInView />);

    const googleButton = screen.getByRole("button", {
      name: /continue with google/i,
    });
    await user.click(googleButton);

    await waitFor(() => {
      expect(authClient.signIn.social).toHaveBeenCalledWith(
        expect.objectContaining({
          provider: "google",
          callbackURL: "/",
        }),
        expect.any(Object),
      );
    });
  });

  it("renders link to sign-up page", () => {
    render(<SignInView />);

    const signUpLink = screen.getByRole("link", { name: /create account/i });
    expect(signUpLink).toBeInTheDocument();
    expect(signUpLink).toHaveAttribute("href", "/sign-up");
  });

  it("renders terms of service and privacy policy links", () => {
    render(<SignInView />);

    expect(
      screen.getByRole("link", { name: /terms of service/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /privacy policy/i }),
    ).toBeInTheDocument();
  });
});
