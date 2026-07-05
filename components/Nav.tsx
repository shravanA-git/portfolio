"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS, PERSON } from "@/lib/content";

export function Nav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b border-border backdrop-blur ${
        isMenuOpen ? "bg-background" : "bg-background/70"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-foreground"
        >
          {PERSON.name}
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8 font-mono text-label tracking-[0.08em] uppercase">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`inline-flex min-h-[44px] items-center border-b-2 transition-colors duration-fast ${
                      isActive
                        ? "border-accent text-foreground"
                        : "border-transparent text-foreground-muted hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          className="inline-flex h-11 w-11 items-center justify-center font-mono text-label tracking-[0.08em] text-foreground uppercase md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-border md:hidden"
        >
          <ul className="container-page flex flex-col gap-1 py-4 font-mono text-label tracking-[0.08em] uppercase">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex min-h-[44px] items-center text-foreground-muted hover:text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
