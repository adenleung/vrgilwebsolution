import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { studio, siteUrl } from "@/lib/site-data";
export const metadata: Metadata = {
  title: "Privacy information",
  ...(siteUrl ? { alternates: { canonical: "/privacy" } } : {}),
};
export default function Privacy() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="container document-page">
        <h1>Privacy information</h1>
        <p>
          This page explains how this website’s enquiry tools work. VRGIL Web
          Solutions is an independent freelance web design and development
          studio.
        </p>
        <h2>Details you enter in the form</h2>
        <p>
          The quote form prepares a draft using your name, business name, email
          address, optional phone number, package selection and project
          description. These entries remain in your current browser page. The
          website does not submit them to a database or email service, and it
          does not save them in browser storage.
        </p>
        <p>
          The review form becomes editable only when JavaScript is ready. If
          JavaScript is unavailable, use the direct email or WhatsApp links.
          Private enquiry fields are never placed in this website’s address.
        </p>
        <h2>Choosing email or WhatsApp</h2>
        <p>
          When you choose a delivery method, the details are placed in a draft
          addressed to VRGIL in your email app or WhatsApp. You review and send
          that draft yourself. The chosen provider’s privacy terms apply once
          you open its service. VRGIL receives your enquiry after you send it
          and uses it to discuss your request and any agreed project.
        </p>
        <h2>Website services</h2>
        <p>
          No advertising trackers or analytics tools are included in this
          website’s code. Fonts are served with the website. The hosting
          provider may process standard request information, such as IP address
          and browser details, to deliver and secure the website. Its own
          policies apply.
        </p>
        <h2>Contact and requests</h2>
        <p>
          Please avoid sending passwords, payment details or other sensitive
          information through the enquiry tools. For questions about your
          enquiry or requests concerning information you have sent, email{" "}
          <a href={`mailto:${studio.email}`}>{studio.email}</a>.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
