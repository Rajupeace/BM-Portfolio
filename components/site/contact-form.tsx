"use client";

import { useState } from "react";
import { Send } from "lucide-react";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(values: { name: string; email: string; message: string }): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (values.message.trim().length < 10) errors.message = "Please write at least 10 characters.";
  return errors;
}

export function ContactForm({ to }: { to: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      message: String(data.get("message") || ""),
    };
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("");
      const first = Object.keys(found)[0];
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const subject = encodeURIComponent(`Portfolio enquiry from ${values.name.trim()}`);
    const body = encodeURIComponent(`${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    setStatus(`Your email app should open with the message ready to send to ${to}. If it doesn't, email me directly.`);
  };

  const field = (name: keyof Errors, label: string, input: React.ReactNode) => (
    <div>
      <label htmlFor={`contact-${name}`} className="mb-1.5 block text-sm font-medium text-zinc-800 dark:text-zinc-200">
        {label}
      </label>
      {input}
      {errors[name] && (
        <p id={`contact-${name}-error`} className="mt-1.5 text-sm text-red-600 dark:text-red-400">
          {errors[name]}
        </p>
      )}
    </div>
  );

  const aria = (name: keyof Errors) => ({
    id: `contact-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
    className: "input",
  });

  return (
    <form onSubmit={handleSubmit} noValidate className="card grid gap-4 p-6" aria-label="Contact form">
      {field("name", "Name", <input type="text" autoComplete="name" {...aria("name")} />)}
      {field("email", "Email", <input type="email" autoComplete="email" {...aria("email")} />)}
      {field("message", "Message", <textarea rows={5} {...aria("message")} />)}
      <button type="submit" className="btn-primary justify-center">
        <Send className="h-4 w-4" aria-hidden="true" />
        Send message
      </button>
      <p className="text-xs text-zinc-600 dark:text-zinc-400">This opens your email app. Nothing is stored on this site.</p>
      <p role="status" aria-live="polite" className="text-sm text-emerald-700 dark:text-emerald-400">
        {status}
      </p>
    </form>
  );
}
