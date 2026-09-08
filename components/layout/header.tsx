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
import type { NavigationItem } from "@/content/navigation";
import type { Dictionary } from "@/content/dictionaries";
import {
  localizedPath,
  type Locale,
  type TranslationAvailability,
} from "@/content/i18n";
import { LanguageSwitcher } from "./language-switcher";
import { Arrow, Spark } from "@/components/icons";
import { MotionControl } from "@/components/motion/motion-control";
import { motionToken } from "@/components/motion/tokens";
import { RevealText } from "@/components/motion/reveal-text";
import { MenuInk } from "@/components/motion/menu-ink";
import { randomPalette, type Palette } from "@/components/motion/entrance";

const subscribeHydration = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export function Header({
  locale,
  labels,
  navigation,
  privacyLabel,
  available,
}: {
  locale: Locale;
  labels: Dictionary["common"];
  navigation: NavigationItem[];
  privacyLabel: string;
  available: TranslationAvailability;
}) {
  const home = localizedPath("/", locale);
  const contact = localizedPath("/contact", locale);
  const privacy = localizedPath("/privacy", locale);
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
      const returnY = lock.current?.y;
      // Restore document geometry before close() performs native focus return.
      // WebKit can otherwise scroll against the body's still-fixed position.
      unlock();
      dialog.current?.close();
      if (dialog.current) delete dialog.current.dataset.closing;
      setOpen(false);
      if (restore) {
        trigger.current?.focus({ preventScroll: true });
        // WebKit can finish native dialog focus/scroll restoration on the next
        // frame. Reapply the saved position once, only while focus is still on
        // the trigger; never override a navigation, reopen or a new focus target.
        requestAnimationFrame(() => {
          if (
            returnY !== undefined &&
            !dialog.current?.open &&
            !navigating.current &&
            document.activeElement === trigger.current
          )
            window.scrollTo({ top: returnY, behavior: "instant" });
        });
      }
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
      dialog.current
        .querySelectorAll<HTMLElement>(".menu-ink")
        .forEach((ink) => {
          ink.dataset.palette = randomPalette(ink.dataset.palette as Palette);
          const wipe = ink.querySelector<HTMLElement>(".menu-ink-wipe");
          if (wipe)
            wipe.dataset.palette = randomPalette(
              ink.dataset.palette as Palette,
            );
        });
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
        <Link href={home} className="wordmark" aria-label={labels.homeLink}>
          <RevealText kind="utility">MYSTENA</RevealText>
          <Spark />
        </Link>
        <nav className="header-shortcuts" aria-label={labels.primaryNav}>
          {navigation
            .filter((item) =>
              ["company", "contact"].some(
                (key) => item.href === localizedPath("/" + key, locale),
              ),
            )
            .map((item) => (
              <Link key={item.href} href={item.href}>
                <RevealText kind="utility">{item.label}</RevealText>
              </Link>
            ))}
        </nav>
        <LanguageSwitcher
          locale={locale}
          labels={labels}
          available={available}
        />
        <div className="header-controls">
          <MotionControl labels={labels.motion} />
          <button
            ref={trigger}
            type="button"
            className="menu-trigger"
            aria-label={labels.menuOpen}
            aria-expanded={open}
            aria-controls="site-navigation"
            disabled={!hydrated}
            onClick={openMenu}
          >
            <RevealText kind="utility">{labels.menu}</RevealText>
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
            href={home}
            className="wordmark"
            onClick={(e) => navigate(e, home)}
            aria-label={labels.homeLink}
          >
            <MenuInk kind="utility">MYSTENA</MenuInk>
            <Spark />
          </Link>
          <button
            type="button"
            className="menu-trigger close-trigger"
            onClick={closeMenu}
            aria-label={labels.menuClose}
          >
            <MenuInk kind="utility">{labels.close}</MenuInk>
            <span className="close-icon" aria-hidden="true">
              ×
            </span>
          </button>
        </div>
        <h2 id="nav-title" className="sr-only">
          {labels.siteNav}
        </h2>
        <div className="nav-layout">
          <nav aria-label={labels.primaryNav}>
            <ol>
              {navigation.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={(e) => navigate(e, item.href)}
                    aria-current={path === item.href ? "page" : undefined}
                  >
                    <span className="nav-number">
                      <MenuInk>{`0${i + 1}`}</MenuInk>
                    </span>
                    <span lang="en">
                      <MenuInk large kind="heading">
                        {item.english}
                      </MenuInk>
                    </span>
                    {locale === "ja" && (
                      <span className="nav-ja">
                        <MenuInk kind="subtitle">{item.label}</MenuInk>
                      </span>
                    )}
                    <Arrow diagonal />
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
          <aside className="nav-aside">
            <LanguageSwitcher
              locale={locale}
              labels={labels}
              available={available}
              menu
              onNavigate={() => finishClose(false)}
            />
            <p>
              <MenuInk kind="subtitle">{labels.navMessage}</MenuInk>
            </p>
            <Link
              href={contact}
              onClick={(e) => navigate(e, contact)}
              className="text-link"
            >
              <MenuInk>
                {navigation.find((item) => item.href === contact)!.label}
              </MenuInk>
              <Arrow diagonal />
            </Link>
            <div className="nav-aux">
              <Link href={privacy} onClick={(e) => navigate(e, privacy)}>
                <MenuInk>{privacyLabel}</MenuInk>
              </Link>
              <MotionControl labels={labels.motion} menu />
            </div>
          </aside>
        </div>
        <div className="nav-bottom">
          <MenuInk>MYSTENA</MenuInk>
          <MenuInk>{labels.brandNote}</MenuInk>
        </div>
      </dialog>
    </>
  );
}
