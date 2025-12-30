import { render, RenderOptions } from "@testing-library/react";
import { ReactElement, ReactNode } from "react";

// Wrapper component for providers if needed
function AllTheProviders({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

// Custom render function
function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  return render(ui, { wrapper: AllTheProviders, ...options });
}

export * from "@testing-library/react";
export { customRender as render };
