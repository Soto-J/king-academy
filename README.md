This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Testing

This project uses [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/react) for unit and integration testing.

### Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm test -- --run

# Run tests with UI
npm test:ui

# Run tests with coverage report
npm test:coverage
```

### Test Structure

Tests are located next to the components they test with the `.test.tsx` or `.test.ts` extension:

```
src/
  modules/
    auth/
      ui/
        views/
          sign-in-view.tsx
          sign-in-view.test.tsx
          sign-up-view.tsx
          sign-up-view.test.tsx
```

### Writing Tests

Example test structure:

```typescript
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

describe("ComponentName", () => {
  it("should render correctly", () => {
    render(<ComponentName />);
    expect(screen.getByText("Expected Text")).toBeInTheDocument();
  });

  it("should handle user interactions", async () => {
    const user = userEvent.setup();
    render(<ComponentName />);

    await user.click(screen.getByRole("button"));
    expect(/* assertion */).toBeTruthy();
  });
});
```

### Mocking

- **Next.js Router**: Automatically mocked in test files
- **Auth Client**: Mock using `vi.mock("@/lib/auth/auth-client")`
- **Components**: Mock child components to isolate tests

### Test Coverage

Current test coverage includes:

- Authentication views (sign-in, sign-up)
- Form validation
- User interactions
- API calls with correct data
- Loading states
- Navigation links

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
