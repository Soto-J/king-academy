import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@/test/test-utils";

import userEvent from "@testing-library/user-event";

import { authClient } from "@/lib/auth/auth-client";
import { SignUpView } from "./sign-up-view";

let resolveSignup!: () => void;

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
    signUp: {
      email: vi.fn(
        () =>
          new Promise<void>((res) => {
            resolveSignup = res;
          }),
      ),
    },
    signIn: {
      social: vi.fn().mockRejectedValue({}),
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

describe("SignUpView", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders sign-up form with all required fields", () => {
    render(<SignUpView />);

    expect(screen.getByText(/let's get started/i)).toBeInTheDocument();
    expect(
      screen.getByText("Create your King Academy account"),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create account/i }),
    ).toBeInTheDocument();
  });

  it("renders Google sign-up button", () => {
    render(<SignUpView />);

    expect(
      screen.getByRole("button", { name: /continue with google/i }),
    ).toBeInTheDocument();
  });

  it("displays validation error for empty first name", async () => {
    const user = userEvent.setup();
    render(<SignUpView />);

    const submitButton = screen.getByRole("button", {
      name: /create account/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/first name required/i)).toBeInTheDocument();
    });
  });

  it("displays validation error for empty last name", async () => {
    const user = userEvent.setup();
    render(<SignUpView />);

    const firstNameInput = screen.getByLabelText(/first name/i);
    const submitButton = screen.getByRole("button", {
      name: /create account/i,
    });

    await user.type(firstNameInput, "John");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/last name required/i)).toBeInTheDocument();
    });
  });

  it.skip("displays validation error for invalid email", async () => {
    const user = userEvent.setup();
    render(<SignUpView />);

    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const submitButton = screen.getByRole("button", {
      name: /create account/i,
    });

    await user.type(firstNameInput, "John");
    await user.type(lastNameInput, "Doe");
    await user.type(emailInput, "invalid-email");
    await user.tab(); // Blur the field to trigger validation
    await user.click(submitButton);

    // Check if email input has aria-invalid attribute
    await waitFor(() => {
      expect(emailInput).toHaveAttribute("aria-invalid", "true");
    });
  });

  it("displays validation error for short password", async () => {
    const user = userEvent.setup();
    render(<SignUpView />);

    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", {
      name: /create account/i,
    });

    await user.type(firstNameInput, "John");
    await user.type(lastNameInput, "Doe");
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "short");
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/password must be at least 8 characters/i),
      ).toBeInTheDocument();
    });
  });

  it("calls authClient.signUp.email with correct values on form submission", async () => {
    const user = userEvent.setup();

    render(<SignUpView />);

    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", {
      name: /create account/i,
    });

    await user.type(firstNameInput, "John");
    await user.type(lastNameInput, "Doe");
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    await waitFor(() => {
      expect(authClient.signUp.email).toHaveBeenCalledWith(
        expect.objectContaining({
          firstName: "John",
          lastName: "Doe",
          email: "test@example.com",
          password: "password123",
          name: "John Doe",
          callbackURL: "/",
        }),
        expect.any(Object),
      );
    });
  });

  it("shows loading state during sign-up", async () => {
    const user = userEvent.setup();
    render(<SignUpView />);

    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", {
      name: /create account/i,
    });

    await user.type(firstNameInput, "John");
    await user.type(lastNameInput, "Doe");
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    expect(
      screen.getByRole("button", { name: /creating account/i }),
    ).toBeInTheDocument();

    resolveSignup();
  });

  it("calls authClient.signIn.social when Google button is clicked", async () => {
    const { authClient } = await import("@/lib/auth/auth-client");
    const user = userEvent.setup();

    render(<SignUpView />);

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

  it("renders link to sign-in page", () => {
    render(<SignUpView />);

    const signInLink = screen.getByRole("link", { name: /sign in/i });
    expect(signInLink).toBeInTheDocument();
    expect(signInLink).toHaveAttribute("href", "/sign-in");
  });

  it("renders terms of service and privacy policy links", () => {
    render(<SignUpView />);

    expect(
      screen.getByRole("link", { name: /terms of service/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /privacy policy/i }),
    ).toBeInTheDocument();
  });

  it("concatenates first and last name correctly", async () => {
    const { authClient } = await import("@/lib/auth/auth-client");
    const user = userEvent.setup();

    render(<SignUpView />);

    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", {
      name: /create account/i,
    });

    await user.type(firstNameInput, "Jane");
    await user.type(lastNameInput, "Smith");
    await user.type(emailInput, "jane@example.com");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    await waitFor(() => {
      expect(authClient.signUp.email).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Jane Smith",
        }),
        expect.any(Object),
      );
    });
  });
});
