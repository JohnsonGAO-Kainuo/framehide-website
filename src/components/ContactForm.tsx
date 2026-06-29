"use client";

import { useMemo, useState } from "react";

type ContactFormCopy = {
  title: string;
  body: string;
  requiredNote: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  companyLabel: string;
  companyPlaceholder: string;
  countryLabel: string;
  countryPlaceholder: string;
  interestLabel: string;
  interestPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submit: string;
  sending: string;
  successTitle: string;
  successBody: string;
  errorTitle: string;
  errorBody: string;
  configError: string;
  fallbackIntro: string;
  openEmail: string;
  openWhatsApp: string;
  honeypotLabel: string;
};

type ContactFormProps = {
  copy: ContactFormCopy;
  locale: string;
  emailHref: string;
  whatsappHref: string;
};

type SubmitState =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "success" }
  | { status: "error"; message: string };

const inputClass =
  "mt-2 w-full rounded-[1.25rem] border border-line bg-cream/55 px-4 py-3 text-sm text-ink outline-none transition-colors duration-300 placeholder:text-ink-soft/55 focus:border-coffee focus:bg-paper";

export function ContactForm({ copy, locale, emailHref, whatsappHref }: ContactFormProps) {
  const [state, setState] = useState<SubmitState>({ status: "idle" });

  const statusMessage = useMemo(() => {
    if (state.status === "success") return copy.successBody;
    if (state.status === "error") return state.message;
    return "";
  }, [copy.successBody, state]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setState({ status: "sending" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          name: String(formData.get("name") ?? ""),
          email: String(formData.get("email") ?? ""),
          company: String(formData.get("company") ?? ""),
          country: String(formData.get("country") ?? ""),
          interest: String(formData.get("interest") ?? ""),
          message: String(formData.get("message") ?? ""),
          website: String(formData.get("website") ?? ""),
        }),
      });

      const result = (await response.json().catch(() => ({}))) as { code?: string };
      if (!response.ok) {
        setState({
          status: "error",
          message: result.code === "email_not_configured" ? copy.configError : copy.errorBody,
        });
        return;
      }

      form.reset();
      setState({ status: "success" });
    } catch {
      setState({ status: "error", message: copy.errorBody });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-line bg-paper p-6 shadow-[0_18px_50px_rgba(62,42,26,0.08)] sm:p-8"
    >
      <div className="max-w-xl">
        <h2 className="font-display text-3xl leading-tight text-ink">{copy.title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">{copy.body}</p>
        <p className="mt-3 text-xs text-coffee">{copy.requiredNote}</p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink">
          {copy.nameLabel}
          <input name="name" required autoComplete="name" placeholder={copy.namePlaceholder} className={inputClass} />
        </label>
        <label className="block text-sm font-medium text-ink">
          {copy.emailLabel}
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={copy.emailPlaceholder}
            className={inputClass}
          />
        </label>
        <label className="block text-sm font-medium text-ink">
          {copy.companyLabel}
          <input name="company" autoComplete="organization" placeholder={copy.companyPlaceholder} className={inputClass} />
        </label>
        <label className="block text-sm font-medium text-ink">
          {copy.countryLabel}
          <input name="country" autoComplete="country-name" placeholder={copy.countryPlaceholder} className={inputClass} />
        </label>
      </div>

      <label className="mt-5 block text-sm font-medium text-ink">
        {copy.interestLabel}
        <input name="interest" placeholder={copy.interestPlaceholder} className={inputClass} />
      </label>

      <label className="mt-5 block text-sm font-medium text-ink">
        {copy.messageLabel}
        <textarea
          name="message"
          required
          rows={5}
          placeholder={copy.messagePlaceholder}
          className={`${inputClass} resize-none`}
        />
      </label>

      <label className="sr-only">
        {copy.honeypotLabel}
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={state.status === "sending"}
          className="group inline-flex items-center justify-center rounded-full bg-coffee px-6 py-3 text-sm font-medium text-paper transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state.status === "sending" ? copy.sending : copy.submit}
        </button>

        {statusMessage ? (
          <p
            className={`text-sm leading-relaxed ${
              state.status === "success" ? "text-olive" : "text-coffee"
            }`}
            role="status"
            aria-live="polite"
          >
            <span className="font-medium">{state.status === "success" ? copy.successTitle : copy.errorTitle}</span>{" "}
            {statusMessage}
          </p>
        ) : null}
      </div>

      {state.status === "error" ? (
        <div className="mt-5 rounded-[1.5rem] bg-cream px-5 py-4 text-sm leading-relaxed text-ink-soft">
          <p>{copy.fallbackIntro}</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <a href={emailHref} className="font-medium text-coffee underline-offset-4 hover:underline">
              {copy.openEmail}
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-coffee underline-offset-4 hover:underline"
            >
              {copy.openWhatsApp}
            </a>
          </div>
        </div>
      ) : null}
    </form>
  );
}
