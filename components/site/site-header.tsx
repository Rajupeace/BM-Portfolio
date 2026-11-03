"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu, Moon, Sun, X, FileText } from "lucide-react";
import { profile } from "@/content/profile";
import { NAV_ITEMS } from "./nav-items";

export { NAV_ITEMS };

export function SiteHeader() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const linkClass = (id: string) =>
    `relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      active === id
        ? "text-zinc-950 dark:text-white"
        : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
        scrolled || open
          ? "border-zinc-200 bg-zinc-50/90 backdrop-blur-md dark:border-zinc-800 dark:bg-[#0b0b0d]/90"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-6">
        <Link href="/#home" className="flex items-center gap-2.5 rounded-md text-sm font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-zinc-900 text-xs font-bold text-white dark:bg-white dark:text-zinc-900" aria-hidden="true">
            BS
          </span>
          <span>{profile.name}</span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a href={`/#${item.id}`} className={linkClass(item.id)} aria-current={active === item.id ? "true" : undefined}>
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 -bottom-px h-px bg-brand-600 transition-opacity dark:bg-brand-400 ${active === item.id ? "opacity-100" : "opacity-0"}`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn-secondary hidden h-9 px-3 text-sm sm:inline-flex">
            <FileText className="h-4 w-4" aria-hidden="true" />
            Resume
            <span className="sr-only">(PDF, opens in a new tab)</span>
          </a>
          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="icon-btn"
            aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
          >
            {isDark ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
          </button>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="icon-btn lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-zinc-200 px-5 pb-5 pt-2 dark:border-zinc-800 lg:hidden">
          <ul className="grid gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`/#${item.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.id ? "true" : undefined}
                  className={`block rounded-lg px-3 py-2.5 text-base font-medium ${
                    active === item.id ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-800/70 dark:text-white" : "text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="sm:hidden">
              <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="block rounded-lg px-3 py-2.5 text-base font-medium text-zinc-700 dark:text-zinc-300">
                Resume (PDF)
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
