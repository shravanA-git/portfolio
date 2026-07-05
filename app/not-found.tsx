import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60dvh] flex-col items-center justify-center gap-6 py-24 text-center">
      <p className="font-mono text-label tracking-[0.08em] text-accent-on-text uppercase">
        Error
      </p>
      <h1 className="text-display-xl font-semibold text-foreground">404</h1>
      <p className="max-w-[40ch] text-body-lg text-foreground-muted">
        This page doesn&apos;t exist — but the rest of the site does.
      </p>
      <Link
        href="/"
        className="inline-flex min-h-[44px] items-center font-mono text-label tracking-[0.08em] text-accent-on-text uppercase underline-offset-4 hover:underline"
      >
        Back to home →
      </Link>
    </div>
  );
}
