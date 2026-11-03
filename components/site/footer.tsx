import Link from "next/link";
import { profile } from "@/content/profile";
import { srivoratech } from "@/content/srivoratech";
import { NAV_ITEMS } from "./nav-items";
import { CurrentYear } from "./current-year";

export function SiteFooter() {
  const links = [
    { label: "GitHub", href: profile.contact.github },
    { label: "LeetCode", href: profile.contact.leetcode },
    { label: "HackerRank", href: profile.contact.hackerrank },
    { label: "SriVoraTech", href: srivoratech.url },
  ];
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-semibold">{profile.name}</p>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{profile.titles.join(" · ")}</p>
          <a href={`mailto:${profile.contact.email}`} className="btn-link mt-4">
            {profile.contact.email}
          </a>
        </div>
        <nav aria-label="Footer">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">Sections</p>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
            {NAV_ITEMS.map((n) => (
              <li key={n.id}>
                <Link href={`/#${n.id}`} className="text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/about-srikanth" className="text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white">
                About Srikanth
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">Elsewhere</p>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white">
                  {l.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="container-page flex flex-wrap items-center justify-between gap-3 py-5 text-xs text-zinc-600 dark:text-zinc-400">
          <p>© <CurrentYear /> {profile.name}. Built with Next.js.</p>
          <Link href="/#home" className="hover:text-zinc-900 dark:hover:text-white">
            Back to top ↑
          </Link>
        </div>
      </div>
    </footer>
  );
}
