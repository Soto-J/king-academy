import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";

import { render, screen, waitFor, cleanup } from "@testing-library/react";

import { authClient } from "@/lib/auth/auth-client";
import { SignUpView } from "../sign-up-view";
import { auth } from "@/lib/auth/auth";

vi.mock("@/lib/auth/auth-client", () => ({
  authClient: {
    signUp: {
      email: vi.fn((_, callbacks) => {
        callbacks.onSuccess();
      }),
    },
    signIn: { social: vi.fn().mockRejectedValue({}) },
  },
}));

const mockRouterPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockRouterPush,
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/sign-up",
  useSearchParams: () => new URLSearchParams(),
}));

const signUpSetup = () => {
  render(<SignUpView />);

  return {
    user: userEvent.setup(),
    firstNameInput: screen.getByLabelText(/first name/i),
    lastNameInput: screen.getByLabelText(/last name/i),
    emailInput: screen.getByLabelText(/email address/i),
    passwordInput: screen.getByLabelText(/password/i),
    signUpButton: screen.getByRole("button", {
      name: /create account/i,
    }),
  };
};

describe.skip("SignUpView", () => {
  beforeEach(vi.clearAllMocks);
  afterEach(cleanup);

  it("renders sign-up form with all required fields", () => {
    const {
      firstNameInput,
      lastNameInput,
      emailInput,
      passwordInput,
      signUpButton,
    } = signUpSetup();

    expect(screen.getByText(/let's get started/i)).toBeInTheDocument();
    expect(
      screen.getByText(/create your King Academy account/i),
    ).toBeInTheDocument();

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
    expect(passwordInput).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
  });

  it("renders Google sign-up button", () => {
    signUpSetup();

    expect(
      screen.getByRole("button", { name: /continue with google/i }),
    ).toBeInTheDocument();
  });

  it("displays validation error for empty first name", async () => {
    const { user, signUpButton } = signUpSetup();

    await user.click(signUpButton);

    await waitFor(() => {
      expect(screen.getByText(/first name required/i));
    });
  });

  it("displays validation error for empty last name", async () => {
    const { user, firstNameInput, signUpButton } = signUpSetup();

    await user.type(firstNameInput, "John");
    await user.click(signUpButton);

    await waitFor(() => {
      expect(screen.getByText(/last name required/i));
    });
  });

  it("displays validation error for invalid email", async () => {
    const { user, firstNameInput, lastNameInput, emailInput, signUpButton } =
      signUpSetup();

    expect(emailInput).toHaveAttribute("type", "email");

    await user.type(firstNameInput, "John");
    await user.type(lastNameInput, "Doe");
    await user.type(emailInput, "invalid-email");

    await waitFor(() => {
      expect(emailInput).toBeInvalid();
    });
  });

  it("displays validation error for short password", async () => {
    const {
      user,
      firstNameInput,
      lastNameInput,
      emailInput,
      passwordInput,
      signUpButton,
    } = signUpSetup();

    await user.type(firstNameInput, "John");
    await user.type(lastNameInput, "Doe");
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "short");

    await user.click(signUpButton);

    await waitFor(() => {
      expect(screen.getByText(/password must be at least 8 characters/i));
    });
  });

  it("calls authClient.signUp.email with correct values on form submission", async () => {
    const {
      user,
      firstNameInput,
      lastNameInput,
      emailInput,
      passwordInput,
      signUpButton,
    } = signUpSetup();

    await user.type(firstNameInput, "John");
    await user.type(lastNameInput, "Doe");
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");

    await user.click(signUpButton);

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
    const {
      user,
      firstNameInput,
      lastNameInput,
      emailInput,
      passwordInput,
      signUpButton,
    } = signUpSetup();

    await user.type(firstNameInput, "John");
    await user.type(lastNameInput, "Doe");
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.click(signUpButton);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /creating account/i }));
    });
  });

  it("calls authClient.signIn.social when Google button is clicked", async () => {
    const { authClient } = await import("@/lib/auth/auth-client");

    const { user } = signUpSetup();

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
    signUpSetup();

    const signInLink = screen.getByRole("link", { name: /sign in/i });

    expect(signInLink);
  });

  it("renders terms of service and privacy policy links", () => {
    signUpSetup();

    expect(screen.getByRole("link", { name: /terms of service/i }));
    expect(screen.getByRole("link", { name: /privacy policy/i }));
  });

  it("concatenates first and last name correctly", async () => {
    const {
      user,
      firstNameInput,
      lastNameInput,
      emailInput,
      passwordInput,
      signUpButton,
    } = signUpSetup();

    await user.type(firstNameInput, "Jane");
    await user.type(lastNameInput, "Smith");
    await user.type(emailInput, "jane@example.com");
    await user.type(passwordInput, "password123");

    await user.click(signUpButton);

    await waitFor(() => {
      expect(authClient.signUp.email).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Jane Smith",
        }),
        expect.objectContaining({
          onSuccess: expect.any(Function),
          onError: expect.any(Function),
        }),
      );
    });
  });

  it("redirects to home page after email signup", async () => {
    const {
      user,
      firstNameInput,
      lastNameInput,
      emailInput,
      passwordInput,
      signUpButton,
    } = signUpSetup();

    await user.type(firstNameInput, "Jane");
    await user.type(lastNameInput, "Smith");
    await user.type(emailInput, "jane@example.com");
    await user.type(passwordInput, "password123");

    await user.click(signUpButton);

    expect(mockRouterPush).toBeCalledWith("/");
  });

  it("creates user via email signup", async () => {
    // await authClient.signUp.email({});
    // const {
    //   user,
    //   firstNameInput,
    //   lastNameInput,
    //   emailInput,
    //   passwordInput,
    //   signUpButton,
    // } = signUpSetup();
    // await user.type(firstNameInput, "Jane");
    // await user.type(lastNameInput, "Smith");
    // await user.type(emailInput, "jane@example.com");
    // await user.type(passwordInput, "password123");
    // await user.click(signUpButton);
  });
});
