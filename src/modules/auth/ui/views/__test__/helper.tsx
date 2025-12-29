import { vi } from "vitest";

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
let resolveSignup!: () => void;

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

// Mock react-icons
vi.mock("react-icons/fa", () => ({
  FaGoogle: () => <svg data-testid="google-icon" />,
}));

export { vi };
