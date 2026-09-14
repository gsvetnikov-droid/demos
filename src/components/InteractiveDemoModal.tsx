"use client";

import { useEffect, useRef, useState, useId } from "react";
import { createPortal } from "react-dom";

// A self-contained accessible dialog wrapping a same-origin, locally-hosted
// static HTML demo in an iframe. Built for the HR roadmap demo but generic
// enough to reuse for any future `interactiveDemoUrl`.
//
// Security note: the iframe uses `allow-scripts allow-same-origin` together,
// which is a well-known combination that weakens the sandbox's isolation
// guarantee (a same-origin, script-capable frame can in principle reach back
// into its own origin). This is accepted here only because the demo's HTML
// is authored and reviewed by us, served from our own /public assets — not
// third-party or user-generated content. Do not point this component at
// untrusted content without reconsidering the sandbox flags.
export default function InteractiveDemoModal({
  demoUrl,
  triggerLabel,
  triggerClassName,
  modalTitle,
}: {
  demoUrl: string;
  triggerLabel: string;
  triggerClassName?: string;
  modalTitle: string;
}) {
  const [open, setOpen] = useState(false);
  const [loadState, setLoadState] = useState<"loading" | "ready" | "failed">("loading");
  const [confirmingReset, setConfirmingReset] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descId = useId();

  function close() {
    setOpen(false);
    setConfirmingReset(false);
    // Return focus to the button that opened the modal.
    triggerRef.current?.focus();
  }

  function launch() {
    setLoadState("loading");
    setOpen(true);
  }

  // Focus trap + Escape-to-close + background scroll lock, active only while open.
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const dialog = dialogRef.current;
    const focusable = () =>
      dialog
        ? Array.from(dialog.querySelectorAll<HTMLElement>('button, [href], iframe, [tabindex]:not([tabindex="-1"])')).filter(
            (el) => !el.hasAttribute("disabled"),
          )
        : [];

    const toFocus = focusable();
    (toFocus[0] ?? dialog)?.focus();

    function onKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === "Tab") {
        const items = focusable();
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    // The iframe's own document fires its own keydown events that never
    // reach this listener, so the demo itself posts a message on Escape
    // (see public/demos/hr-roadmap/index.html) — validated by origin and
    // source before we act on it, same as the "ready" signal below.
    function onMessage(e: MessageEvent) {
      if (e.origin !== window.location.origin) return;
      if (e.source !== iframeRef.current?.contentWindow) return;
      const data = e.data;
      if (!data || data.source !== "hr-roadmap-demo") return;
      if (data.type === "escape") close();
      if (data.type === "ready") setLoadState("ready");
    }

    document.addEventListener("keydown", onKeydown);
    window.addEventListener("message", onMessage);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeydown);
      window.removeEventListener("message", onMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Failure state if the iframe never reports itself loaded.
  useEffect(() => {
    if (!open || loadState !== "loading") return;
    const t = setTimeout(() => setLoadState((s) => (s === "loading" ? "failed" : s)), 8000);
    return () => clearTimeout(t);
  }, [open, loadState]);

  function requestReset() {
    setConfirmingReset(true);
  }

  function confirmReset() {
    const win = iframeRef.current?.contentWindow as (Window & { __hrRoadmapDemo?: { reset: () => void } }) | undefined;
    win?.__hrRoadmapDemo?.reset();
    setConfirmingReset(false);
  }

  // Rendered through a portal to document.body — a modal nested inside a
  // card that has any hover `transform` (as ours do, for the lift effect)
  // would otherwise have its `position: fixed` overlay trapped inside that
  // ancestor's bounding box instead of covering the viewport, since a
  // transformed ancestor becomes the containing block for fixed descendants.
  const modal = open && (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/60 p-0 sm:p-4"
          style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            tabIndex={-1}
            className="motion-safe:animate-fade-in-up flex h-[100dvh] w-full flex-col overflow-hidden bg-white sm:h-[90dvh] sm:max-h-[90dvh] sm:w-[94vw] sm:max-w-[1400px] sm:rounded-2xl sm:shadow-2xl"
          >
            <div className="flex flex-shrink-0 items-center justify-between gap-3 border-b border-cream-200 bg-cream-50 px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <h2 id={titleId} className="truncate text-sm font-semibold text-neutral-900">
                  {modalTitle}
                </h2>
                <p id={descId} className="truncate text-xs text-neutral-500">
                  Interactive portfolio demo
                </p>
              </div>
              <div className="flex flex-shrink-0 items-center gap-2">
                {confirmingReset ? (
                  <span className="flex items-center gap-2 text-xs">
                    <span className="hidden text-neutral-600 sm:inline">Reset all progress?</span>
                    <button
                      type="button"
                      onClick={confirmReset}
                      className="rounded-full bg-red-600 px-3 py-1.5 font-semibold text-white hover:bg-red-700"
                    >
                      Reset
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmingReset(false)}
                      className="rounded-full border border-cream-300 px-3 py-1.5 font-semibold text-neutral-700 hover:bg-white"
                    >
                      Cancel
                    </button>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={requestReset}
                    className="rounded-full border border-cream-300 px-3 py-1.5 text-xs font-semibold text-neutral-700 transition hover:border-cream-400 hover:bg-white"
                  >
                    Reset demo
                  </button>
                )}
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close interactive demo"
                  className="rounded-full border border-cream-300 px-3 py-1.5 text-xs font-semibold text-neutral-700 transition hover:border-cream-400 hover:bg-white"
                >
                  Close ✕
                </button>
              </div>
            </div>

            <p className="flex-shrink-0 border-b border-cream-200 bg-cream-50/60 px-4 py-2 text-xs text-neutral-500 sm:px-5">
              Explore the tabs, filter tasks, and mark items complete. Changes are saved in this browser only. This
              demo represents a delivery plan, not the production HR platform.
            </p>

            <div className="relative flex-1 overflow-hidden bg-cream-50">
              {loadState === "loading" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3 text-sm text-neutral-500">
                    <div
                      className="h-8 w-8 animate-spin rounded-full border-2 border-cream-300 border-t-neutral-900 motion-reduce:animate-none"
                      aria-hidden="true"
                    />
                    <span>Loading the interactive demo…</span>
                  </div>
                </div>
              )}
              {loadState === "failed" && (
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="max-w-sm text-center text-sm text-neutral-600">
                    <p className="font-semibold text-neutral-900">The demo didn&apos;t load in time.</p>
                    <p className="mt-1.5">
                      Try closing and reopening this window, or reload the page. If it keeps happening, the demo file
                      may be temporarily unavailable.
                    </p>
                  </div>
                </div>
              )}
              <iframe
                ref={iframeRef}
                src={demoUrl}
                title={modalTitle}
                className={loadState === "ready" ? "h-full w-full border-0" : "h-full w-full border-0 opacity-0"}
                sandbox="allow-scripts allow-same-origin"
                onLoad={() => {
                  // The iframe's own script posts "ready"; this onLoad is a
                  // fallback in case that message doesn't arrive in time.
                  setLoadState((s) => (s === "loading" ? "ready" : s));
                }}
              />
            </div>
          </div>
    </div>
  );

  return (
    <>
      <button ref={triggerRef} type="button" onClick={launch} className={triggerClassName}>
        {triggerLabel}
      </button>
      {open && typeof document !== "undefined" && createPortal(modal, document.body)}
    </>
  );
}
