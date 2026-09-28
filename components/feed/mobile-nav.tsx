"use client";

import { useState } from "react";
import { NavLinks } from "./sidebar";

function MenuIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function MobileBrand() {
  return (
    <a href="#" className="flex items-center gap-[10px]">
      <div className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-linear-to-br from-peach to-flame">
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      </div>
      <span className="font-display text-base font-semibold text-ink">
        OpenDayCare
      </span>
    </a>
  );
}

/** Top bar with hamburger (visible below `lg`) + slide-in drawer with overlay. */
export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-edge bg-card px-4 lg:hidden">
        <MobileBrand />
        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream text-subtle"
        >
          <MenuIcon />
        </button>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Cerrar menú"
            className="absolute inset-0 bg-ink/40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[264px] flex-col bg-card px-4 py-5 shadow-[8px_0_32px_-16px_rgba(63,54,46,0.5)]">
            <div className="mb-4 flex items-center justify-between">
              <MobileBrand />
              <button
                type="button"
                aria-label="Cerrar menú"
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream text-subtle"
              >
                <CloseIcon />
              </button>
            </div>
            <NavLinks />
          </div>
        </div>
      )}
    </>
  );
}
