"use client";

import { useCallback, useState } from "react";
import { UserRound, X } from "lucide-react";
import { useDialog } from "./use-dialog";

const LABELS: Record<string, string> = {
  name: "Name",
  phone: "Phone",
  email: "Email",
  dob: "Date of birth",
  address: "Address",
  father: "Father",
  mother: "Mother",
};

export function PersonalDetails({ details }: { details: Record<string, string> }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const closeRef = useDialog(open, close);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="btn-secondary">
        <UserRound className="h-4 w-4" aria-hidden="true" />
        Personal details
      </button>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-zinc-950/60 p-4" onClick={close}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="personal-title"
            className="card w-full max-w-md p-6 dark:bg-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 id="personal-title" className="text-lg font-semibold">
                Personal details
              </h2>
              <button ref={closeRef} type="button" onClick={close} className="icon-btn" aria-label="Close personal details">
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <dl className="mt-5 grid grid-cols-[auto_minmax(0,1fr)] gap-x-6 gap-y-3 text-sm">
              {Object.entries(details).map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="text-zinc-600 dark:text-zinc-400">{LABELS[k] ?? k}</dt>
                  <dd className="min-w-0 font-medium [overflow-wrap:anywhere]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </>
  );
}
