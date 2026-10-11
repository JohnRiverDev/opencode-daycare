"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

/**
 * Reusable accessible modal component using native <dialog> element.
 * Features:
 * - Focus trap (Tab/Shift+Tab cycle within modal)
 * - Closes with Escape key
 * - Returns focus to trigger element when closed
 * - Focuses first focusable element when opened
 * - ARIA attributes: role="dialog", aria-modal="true", aria-labelledby
 */
export function Modal({ open, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const titleId = "modal-title";

  // Handle open/close and focus management
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      // Save the element that triggered the modal
      triggerRef.current = document.activeElement as HTMLElement;
      dialog.showModal();

      // Focus first focusable element after dialog opens
      requestAnimationFrame(() => {
        const firstFocusable = dialog.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        firstFocusable?.focus();
      });
    } else if (dialog.open) {
      dialog.close();
      // Return focus to trigger element
      triggerRef.current?.focus();
      triggerRef.current = null;
    }
  }, [open]);

  // Handle dialog close event (triggered by Escape or close() method)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      if (open) {
        onClose();
      }
    };

    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose, open]);

  // Focus trap: Tab/Shift+Tab cycle within modal
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusableElements = dialog.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      if (!firstFocusable || !lastFocusable) return;

      if (e.shiftKey) {
        // Shift+Tab: if on first element, wrap to last
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus();
          e.preventDefault();
        }
      } else {
        // Tab: if on last element, wrap to first
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus();
          e.preventDefault();
        }
      }
    };

    dialog.addEventListener("keydown", handleKeyDown);
    return () => dialog.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Prevent closing on backdrop click (optional, can be enabled later)
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    // Only close if clicking directly on the dialog (backdrop), not its children
    if (e.target === dialogRef.current) {
      // Uncomment to enable backdrop click close:
      // onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={handleBackdropClick}
      className="m-0 w-[calc(100%-48px)] max-w-[520px] rounded-[24px] border border-edge bg-modal-bg p-0 shadow-[0_20px_50px_-24px_rgba(63,54,46,0.35)] backdrop:bg-black/30"
    >
      <div className="flex flex-col">
        {/* Title section - to be customized by child components */}
        <h2 id={titleId} className="sr-only">
          {title}
        </h2>
        {children}
      </div>
    </dialog>
  );
}
