"use client";

import Link from "@/components/site-link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent,
  type KeyboardEvent,
} from "react";
import { navigation } from "@/content/navigation";
import { Arrow, Spark } from "@/components/icons";
import { MotionControl } from "@/components/motion/motion-control";
import { motionToken } from "@/components/motion/tokens";

const subscribeHydration = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export function Header() {
  const hydrated = useSyncExternalStore(
    subscribeHydration,
    clientReady,
    serverReady,
  );
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lock = useRef<{
    y: number;
    position: string;
    top: string;
    width: string;
    overflow: string;
  } | null>(null);
  const navigating = useRef(false);
  const unlock = useCallback(() => {
    if (!lock.current) return;
    const previous = lock.current;
    lock.current = null;
    Object.assign(document.body.style, {
      position: previous.position,
      top: previous.top,
      width: previous.width,
      overflow: previous.overflow,
    });
    window.scrollTo({ top: previous.y, behavior: "instant" });
  }, []);
  const finishClose = useCallback(
    (restore = true) => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      closeTimer.current = null;
      dialog.current?.close();
      if (dialog.current) delete dialog.current.dataset.closing;
      unlock();
      setOpen(false);
      if (restore) trigger.current?.focus({ preventScroll: true });
    },
    [unlock],
  );
  function closeMenu() {
    if (!dialog.current?.open || closeTimer.current) return;
    if (
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.dataset.motion === "paused"
    ) {
      finishClose();
      return;
    }
    dialog.current.dataset.closing = "true";
    closeTimer.current = setTimeout(
      () => finishClose(),
      motionToken("--menu-close-ms", 320),
    );
  }
  function openMenu() {
    if (!dialog.current || dialog.current.open) return;
    const style = document.body.style;
    lock.current = {
      y: window.scrollY,
      position: style.position,
      top: style.top,
      width: style.width,
      overflow: style.overflow,
    };
    Object.assign(style, {
      position: "fixed",
      top: `-${window.scrollY}px`,
      width: "100%",
      overflow: "hidden",
    });
    try {
      dialog.current.showModal();
      setOpen(true);
    } catch {
      unlock();
    }
  }
  function navigate(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    )
      return;
    navigating.current = true;
    finishClose(false);
    if (path === href)
      requestAnimationFrame(() => {
        document.querySelector<HTMLElement>("main h1")?.focus();
        navigating.current = false;
      });
  }
  function trapFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const elements = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),[tabindex="0"]',
      ),
    ).filter((el) => el.getClientRects().length > 0 && el.tabIndex >= 0);
    if (!elements.length) return;
    // WebKit can omit links from its native Tab order. Keep the site's complete
    // navigation sequence consistent in both directions across browsers.
    event.preventDefault();
    const current = elements.indexOf(document.activeElement as HTMLElement);
    const next =
      (current + (event.shiftKey ? -1 : 1) + elements.length) % elements.length;
    elements[next].focus();
  }
  useEffect(() => {
    // Route effects run after Next commits the destination content.
    if (dialog.current?.open) finishClose(false);
    if (navigating.current) {
      document
        .querySelector<HTMLElement>("main h1")
        ?.focus({ preventScroll: true });
      navigating.current = false;
    }
  }, [path, finishClose]);
  useEffect(() => {
    const onPop = () => finishClose(false);
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      if (closeTimer.current) clearTimeout(closeTimer.current);
      unlock();
    };
  }, [finishClose, unlock]);
  return (
    <>
      <header className="site-header">
        <Link href="/" className="wordmark" aria-label="MYSTENA トップ">
          MYSTENA
          <Spark />
        </Link>
        <span className="header-tagline">
          ENTERTAINMENT
          <br />
          MEETS TECHNOLOGY.
        </span>
        <div className="header-controls">
          <MotionControl />
          <button
            ref={trigger}
            type="button"
            className="menu-trigger"
            aria-label="メニューを開く"
            aria-expanded={open}
            aria-controls="site-navigation"
            disabled={!hydrated}
            onClick={openMenu}
          >
            <span>MENU</span>
            <span className="menu-lines" aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>
      </header>
      <dialog
        ref={dialog}
        id="site-navigation"
        className="fullscreen-nav"
        aria-labelledby="nav-title"
        onKeyDown={trapFocus}
        onCancel={(e) => {
          e.preventDefault();
          closeMenu();
        }}
        onClose={() => {
          if (dialog.current?.open) return;
          unlock();
          setOpen(false);
        }}
      >
        <div className="nav-curtains" aria-hidden="true">
          <i className="nav-curtain-lead" />
          <i className="nav-curtain-echo" />
        </div>
        <div className="nav-top">
          <Link
            href="/"
            className="wordmark"
            onClick={(e) => navigate(e, "/")}
            aria-label="MYSTENA トップ"
          >
            MYSTENA
            <Spark />
          </Link>
          <button
            type="button"
            className="menu-trigger close-trigger"
            onClick={closeMenu}
            aria-label="メニューを閉じる"
          >
            <span>CLOSE</span>
            <span className="close-icon" aria-hidden="true">
              ×
            </span>
          </button>
        </div>
        <h2 id="nav-title" className="sr-only">
          サイトナビゲーション
        </h2>
        <div className="nav-layout">
          <nav aria-label="メインナビゲーション">
            <ol>
              {navigation.map((item, i) => (
                <li
                  key={item.href}
                  data-palette={
                    (["sky", "iris", "mint", "apricot"] as const)[i % 4]
                  }
                  style={{ "--item-index": i } as React.CSSProperties}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => navigate(e, item.href)}
                    aria-current={path === item.href ? "page" : undefined}
                  >
                    <span className="nav-number">0{i + 1}</span>
                    <span className="nav-en">
                      <span className="nav-en-base">{item.en}</span>
                      <span
                        className="nav-en-color"
                        data-text={item.en}
                        aria-hidden="true"
                      />
                      <i className="nav-en-wipe" aria-hidden="true" />
                    </span>
                    <span className="nav-ja">{item.ja}</span>
                    <Arrow diagonal />
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
          <aside className="nav-aside">
            <span className="eyebrow">LET’S FIND WHAT’S NEXT.</span>
            <p>
              心が動く。
              <br />
              世界がひらく。
            </p>
            <Link
              href="/contact"
              onClick={(e) => navigate(e, "/contact")}
              className="text-link"
            >
              お問い合わせ
              <Arrow diagonal />
            </Link>
            <div className="nav-aux">
              <Link href="/privacy" onClick={(e) => navigate(e, "/privacy")}>
                プライバシーポリシー
              </Link>
              <MotionControl />
            </div>
          </aside>
        </div>
        <div className="nav-bottom">
          <span>MYSTENA</span>
          <span>BE CURIOUS. FIND YOUR NEXT.</span>
        </div>
      </dialog>
    </>
  );
}
