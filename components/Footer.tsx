import Link from "next/link";
import { PERSON } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-col gap-4 py-8 font-mono text-label tracking-[0.08em] text-foreground-muted uppercase sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 {PERSON.name}</p>
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center text-foreground-muted transition-colors duration-fast hover:text-foreground"
        >
          Back to home ↑
        </Link>
      </div>
    </footer>
  );
}
