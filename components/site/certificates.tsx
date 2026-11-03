"use client";

import { useCallback, useState } from "react";
import { Award, ExternalLink, X } from "lucide-react";
import { useDialog } from "./use-dialog";

type Cert = { name: string; issuer: string; code: string; date: string; file: string };

export function Certificates({ items }: { items: Cert[] }) {
  const [open, setOpen] = useState<Cert | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const closeRef = useDialog(open !== null, close);

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => (
          <li key={c.code} className="card card-hover flex flex-col p-5">
            <Award className="h-5 w-5 text-brand-600 dark:text-brand-400" aria-hidden="true" />
            <h3 className="mt-3 font-semibold leading-snug">{c.name}</h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{c.issuer}</p>
            <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs text-zinc-600 dark:text-zinc-400">
              <dt>Issued</dt>
              <dd>{c.date}</dd>
              <dt>ID</dt>
              <dd className="font-mono">{c.code}</dd>
            </dl>
            <button type="button" onClick={() => setOpen(c)} className="btn-link mt-4 self-start">
              View certificate<span className="sr-only">: {c.name}</span>
            </button>
          </li>
        ))}
      </ul>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-zinc-950/60 p-4" onClick={close}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cert-dialog-title"
            className="card flex h-[85vh] w-full max-w-4xl flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-zinc-200 px-5 py-3 dark:border-zinc-800">
              <h2 id="cert-dialog-title" className="truncate text-base font-semibold">
                {open.name}
              </h2>
              <div className="flex shrink-0 items-center gap-2">
                <a href={open.file} target="_blank" rel="noopener noreferrer" className="btn-secondary h-9 px-3 text-sm">
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  Open PDF<span className="sr-only"> (opens in a new tab)</span>
                </a>
                <button ref={closeRef} type="button" onClick={close} className="icon-btn" aria-label="Close certificate">
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
            <iframe src={open.file} title={`${open.name} certificate`} tabIndex={-1} className="h-full w-full bg-white" />
          </div>
        </div>
      )}
    </>
  );
}
