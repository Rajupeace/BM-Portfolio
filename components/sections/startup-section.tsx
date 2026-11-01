"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Building2, Calendar, MapPin, Users, Rocket, Clock } from "lucide-react";
import { srivoratech } from "@/content/srivoratech";

export function StartupSection() {
  const live = srivoratech.products.filter((p) => p.status === "live-demo");
  const upcoming = srivoratech.products.filter((p) => p.status === "upcoming");

  return (
    <section id="startup" aria-labelledby="startup-heading" className="scroll-mt-24 py-28 px-6 bg-white dark:bg-[#07101c] border-y border-slate-200 dark:border-slate-800/60">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">My startup</p>
            <h2 id="startup-heading" className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
              {srivoratech.name}
            </h2>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-brand-200 dark:border-brand-500/30 bg-brand-50 dark:bg-brand-500/10 px-3 py-1 text-sm font-semibold text-brand-700 dark:text-brand-300">
              <Building2 className="h-4 w-4" aria-hidden="true" />
              {srivoratech.myRole}
            </p>
            <p className="mt-6 text-lg leading-relaxed text-slate-700 dark:text-slate-300">{srivoratech.summary}</p>
            <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-400">{srivoratech.roleSummary}</p>

            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-5 w-5 text-slate-500 dark:text-slate-400" aria-hidden="true" />
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Founded</dt>
                  <dd className="font-medium">{srivoratech.founded}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-slate-500 dark:text-slate-400" aria-hidden="true" />
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Based in</dt>
                  <dd className="font-medium">{srivoratech.location}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:col-span-2">
                <Users className="mt-0.5 h-5 w-5 text-slate-500 dark:text-slate-400" aria-hidden="true" />
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Leadership</dt>
                  <dd>
                    <ul className="mt-1 space-y-1">
                      {srivoratech.leadership.map((p) => (
                        <li key={p.name} className="text-slate-700 dark:text-slate-300">
                          <span className="font-medium text-slate-900 dark:text-slate-100">{p.name}</span> — {p.role}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={srivoratech.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 dark:bg-white px-6 py-3 font-semibold text-white dark:text-slate-900 transition-colors hover:bg-slate-700 dark:hover:bg-slate-200"
              >
                Visit srivoratech.in <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <a
                href={srivoratech.founderPage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-700 px-6 py-3 font-semibold transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Founder profile <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-6"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">What SriVoraTech offers</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {srivoratech.services.map((s) => (
                <li key={s} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950/40 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300">
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="mt-16">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <h3 className="text-2xl font-bold">Products</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              As listed on{" "}
              <a href={srivoratech.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-brand-600 dark:hover:text-brand-400">
                srivoratech.in
              </a>
            </p>
          </div>

          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...live, ...upcoming].map((p) => (
              <li
                key={p.name}
                className="group flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-5 transition-colors hover:border-brand-400 dark:hover:border-brand-500/60"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">{p.category}</p>
                  {p.status === "live-demo" ? (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                      <Rocket className="h-3 w-3" aria-hidden="true" /> Live demo
                    </span>
                  ) : (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <Clock className="h-3 w-3" aria-hidden="true" /> Upcoming{p.statusDetail ? ` · ${p.statusDetail}` : ""}
                    </span>
                  )}
                </div>
                <h4 className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">{p.name}</h4>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{p.summary}</p>
                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{p.tech.join(" · ")}</p>
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline underline-offset-2"
                  >
                    Open demo <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">for {p.name} (opens in a new tab)</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
