import { ReactNode } from "react";

// Required root layout for next-intl App Router pattern.
// HTML/body are provided by [locale]/layout.tsx
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}

