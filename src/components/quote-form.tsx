"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Copy,
  Mail,
  MessageCircle,
} from "lucide-react";
import { addOns, packages, studio, whatsappLink } from "@/lib/site-data";
type Enquiry = {
  name: string;
  business: string;
  email: string;
  phone: string;
  package: string;
  message: string;
  extras: string[];
};
export function QuoteForm() {
  const [ready, setReady] = useState(false);
  const [review, setReview] = useState<Enquiry | null>(null),
    [copied, setCopied] = useState(false),
    [copyError, setCopyError] = useState(false),
    [selected, setSelected] = useState("");
  const resultHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    setReady(true);
    function packageClick(event: MouseEvent) {
      const link = (event.target as HTMLElement).closest<HTMLElement>(
        "[data-package]",
      );
      if (link) {
        setSelected(link.dataset.package ?? "");
        setReview(null);
        setCopied(false);
        setCopyError(false);
      }
    }
    const initial = new URLSearchParams(window.location.search).get("package");
    if (packages.some((p) => p.id === initial)) setSelected(initial!);
    document.addEventListener("click", packageClick);
    return () => document.removeEventListener("click", packageClick);
  }, []);
  useEffect(() => {
    if (review) resultHeading.current?.focus();
  }, [review]);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const read = (key: string) => String(data.get(key) ?? "").trim();
    const messageField = event.currentTarget.elements.namedItem(
      "message",
    ) as HTMLTextAreaElement;
    if (!read("message")) {
      messageField.setCustomValidity("Please describe your project.");
      messageField.reportValidity();
      return;
    }
    const item = packages.find((p) => p.id === read("package"));
    setReview({
      name: read("name"),
      business: read("business"),
      email: read("email"),
      phone: read("phone"),
      package: item
        ? `${item.name} — S$${item.price}`
        : "Help me choose / custom project",
      message: read("message"),
      extras: data.getAll("extras").map(String),
    });
    setCopied(false);
    setCopyError(false);
  }
  const draft = review
    ? `Hello ${studio.name},\n\nName: ${review.name}\nBusiness: ${review.business || "Not provided"}\nEmail: ${review.email}\nPhone: ${review.phone || "Not provided"}\nPackage: ${review.package}\nAdd-ons: ${review.extras.join(", ") || "None selected"}\n\nProject details:\n${review.message}`
    : "";
  async function copy() {
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  }
  return (
    <div className="quote-form-wrap">
      <form
        className="quote-form"
        method="post"
        onSubmit={submit}
        hidden={!!review}
      >
        <fieldset disabled={!ready}>
          <div className="form-heading">
            <h3>Tell us what you have in mind.</h3>
            <p>A few details are enough to start.</p>
          </div>
          <div className="form-grid">
            <label htmlFor="name">
              Your name <span>(required)</span>
              <input
                id="name"
                name="name"
                autoComplete="name"
                required
                maxLength={100}
                pattern=".*\S.*"
                placeholder="Your name"
              />
            </label>
            <label htmlFor="business">
              Business name
              <input
                id="business"
                name="business"
                autoComplete="organization"
                maxLength={120}
                placeholder="Your business"
              />
            </label>
            <label htmlFor="email">
              Email <span>(required)</span>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={150}
                placeholder="you@business.com"
              />
            </label>
            <label htmlFor="phone">
              Contact number <span>(optional)</span>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                maxLength={40}
                placeholder="+65"
              />
            </label>
            <label className="full" htmlFor="package">
              Package of interest
              <select
                id="package"
                name="package"
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
              >
                <option value="">Help me choose / custom project</option>
                {packages.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — S${p.price}
                  </option>
                ))}
              </select>
            </label>
            <label className="full" htmlFor="message">
              About your project <span>(required)</span>
              <textarea
                onInput={(e) => e.currentTarget.setCustomValidity("")}
                id="message"
                name="message"
                rows={4}
                required
                maxLength={1500}
                placeholder="What does your business do, and what would you like your website to help with?"
              />
            </label>
          </div>
          <details className="form-extras">
            <summary>
              Add optional extras <span>+</span>
            </summary>
            <div>
              {addOns.map((a) => (
                <label key={a.name}>
                  <input type="checkbox" name="extras" value={a.name} />
                  <span>{a.name}</span>
                  <small>from S${a.price}</small>
                </label>
              ))}
            </div>
          </details>
          <p className="form-note">
            Review your enquiry, then choose email or WhatsApp. Nothing is sent
            from this form. Please avoid sharing sensitive information.
          </p>
          <button className="button form-submit" type="submit">
            Review enquiry <ArrowRight size={17} aria-hidden="true" />
          </button>
          <p className="form-privacy">
            Your details stay in this page until you choose how to send.{" "}
            <a href="/privacy">Privacy information</a>
          </p>
        </fieldset>
        <noscript>
          <p>
            To send an enquiry,{" "}
            <a href={`mailto:${studio.email}`}>email {studio.email}</a> or{" "}
            <a href={whatsappLink()}>contact us on WhatsApp</a>. The review form
            needs JavaScript.
          </p>
        </noscript>
      </form>
      {review && (
        <section className="enquiry-review" aria-labelledby="review-heading">
          <h3 ref={resultHeading} tabIndex={-1} id="review-heading">
            Your enquiry is ready.
          </h3>
          <p>
            Check the details below, then choose how to send. Your email app or
            WhatsApp opens with a draft; you send it there.
          </p>
          <pre>{draft}</pre>
          <div className="review-actions">
            <a
              className="button"
              href={whatsappLink(draft)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={17} aria-hidden="true" /> Continue to
              WhatsApp <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <a
              className="button button-outline"
              href={`mailto:${studio.email}?subject=${encodeURIComponent("Website enquiry — " + review.name)}&body=${encodeURIComponent(draft)}`}
            >
              <Mail size={17} aria-hidden="true" /> Open email draft
            </a>
          </div>
          <p className="form-note">
            Nothing has been sent yet. If your email app does not open, copy the
            enquiry and email it to{" "}
            <a href={`mailto:${studio.email}`}>{studio.email}</a>.
          </p>
          <div className="review-tools">
            <button className="text-button" type="button" onClick={copy}>
              <Copy size={15} aria-hidden="true" /> Copy enquiry
            </button>
            <button
              className="text-button"
              type="button"
              onClick={() => {
                setReview(null);
                requestAnimationFrame(() =>
                  document.getElementById("name")?.focus(),
                );
              }}
            >
              Edit details
            </button>
          </div>
          <p role="status" className="copy-status">
            {copied
              ? "Enquiry copied."
              : copyError
                ? "Copy was unavailable. Select and copy the draft text above."
                : ""}
          </p>
        </section>
      )}
    </div>
  );
}
