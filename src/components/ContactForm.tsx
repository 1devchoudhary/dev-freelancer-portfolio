"use client";

import { useId, useState, type FormEvent } from "react";

import { WEB3FORMS_KEY } from "@/lib/site";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string };

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Posts to Web3Forms with fetch so the page never reloads. Validation runs
 * before the request and errors are announced via aria-live, because a form
 * that silently fails is worse than no form.
 */
export function ContactForm() {
  const formId = useId();
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<FieldErrors>({});

  const fieldId = (name: string) => `${formId}-${name}`;
  const errorId = (name: string) => `${formId}-${name}-error`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const nextErrors: FieldErrors = {};
    if (!name) nextErrors.name = "Please enter your name.";
    if (!email) {
      nextErrors.email = "Please enter your email address.";
    } else if (!EMAIL_PATTERN.test(email)) {
      nextErrors.email = "That doesn't look like a valid email address.";
    }
    if (message.length < 10) {
      nextErrors.message =
        "Please add a sentence or two about what you need built.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus({ state: "idle" });
      // Move focus to the first field with a problem.
      const firstInvalid = Object.keys(nextErrors)[0];
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    if (!WEB3FORMS_KEY) {
      setStatus({
        state: "error",
        message:
          "The contact form isn't configured yet. Please email me directly and I'll reply the same way.",
      });
      return;
    }

    setStatus({ state: "submitting" });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New enquiry from ${name} via Devendra's Portfolio`,
          from_name: "devendrachoudhary.dev",
          Website: "Devendra's Freelancer site(devendrachoudhary.dev)",
          name,
          email,
          company: String(data.get("company") ?? ""),
          message,
          // Web3Forms honeypot — bots fill this, humans never see it.
          botcheck: String(data.get("botcheck") ?? ""),
        }),
      });

      const result = (await response.json()) as { success?: boolean; message?: string };

      if (response.ok && result.success) {
        form.reset();
        setStatus({ state: "success" });
      } else {
        setStatus({
          state: "error",
          message:
            result.message ??
            "Something went wrong sending that. Please email me directly instead.",
        });
      }
    } catch {
      setStatus({
        state: "error",
        message:
          "Couldn't reach the server. Check your connection, or email me directly.",
      });
    }
  }

  // on-ink-field rather than on-ink-line: form-control borders need 3:1
  // against the band, and --on-ink-line only reaches 1.34:1.
  const inputClasses =
    "w-full rounded-lg border border-on-ink-field bg-white/5 px-4 py-3 text-on-ink focus:border-on-ink-soft";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Honeypot: hidden from users and assistive tech, catnip for bots. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={fieldId("name")}
          errorId={errorId("name")}
          label="Your name"
          error={errors.name}
        >
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? errorId("name") : undefined}
            className={inputClasses}
          />
        </Field>

        <Field
          id={fieldId("email")}
          errorId={errorId("email")}
          label="Email"
          error={errors.email}
        >
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? errorId("email") : undefined}
            className={inputClasses}
          />
        </Field>
      </div>

      <Field
        id={fieldId("company")}
        errorId={errorId("company")}
        label="Company"
        optional
      >
        <input
          id={fieldId("company")}
          name="company"
          type="text"
          autoComplete="organization"
          className={inputClasses}
        />
      </Field>

      <Field
        id={fieldId("message")}
        errorId={errorId("message")}
        label="What are you trying to build?"
        error={errors.message}
      >
        <textarea
          id={fieldId("message")}
          name="message"
          rows={5}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? errorId("message") : undefined}
          className={`${inputClasses} resize-y`}
        />
      </Field>

      {/* Black on accent, stated literally rather than via `text-ink`: on the
          dark theme `--ink` is a LIGHT colour, and light on --accent is only
          3.7:1. Black on the violet is 5.6:1, and on the cyan hover, 11.2:1. */}
      <button
        type="submit"
        disabled={status.state === "submitting"}
        className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status.state === "submitting" ? "Sending…" : "Send message"}
      </button>

      {/* Announced to screen readers without stealing focus. */}
      <div aria-live="polite" className="min-h-0">
        {status.state === "success" && (
          <p className="rounded-lg border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-on-ink">
            Thanks — that came through. You&apos;ll have a reply within 24 hours
            on a working day.
          </p>
        )}
        {status.state === "error" && (
          <p className="rounded-lg border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-on-ink">
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  id,
  errorId,
  label,
  error,
  optional = false,
  children,
}: {
  id: string;
  errorId: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="label text-on-ink-soft">
        {label}
        {optional && <span className="ml-2 normal-case">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={errorId} className="text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
