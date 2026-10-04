import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteUrl, studio } from "@/lib/site-data";
export const metadata: Metadata = {
  title: "Website terms",
  ...(siteUrl ? { alternates: { canonical: "/terms" } } : {}),
};
export default function Terms() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="container document-page">
        <span className="eyebrow">VRGIL / Website information</span>
        <h1>Website terms</h1>
        <p>
          This website introduces the freelance website design and development
          services offered under VRGIL Web Solutions. Browsing the website or
          preparing an enquiry does not create a project agreement.
        </p>
        <h2>Prices and project scope</h2>
        <p>
          Prices are in Singapore dollars and are starting prices for the stated
          scope. Additional pages, functionality and revisions can affect the
          quotation. Domain registration, hosting, third-party subscriptions and
          ongoing maintenance are separate unless expressly included. The
          written project quotation confirms the final scope, price, payment
          arrangements and handover.
        </p>
        <h2>Delivery estimates</h2>
        <p>
          Delivery estimates depend on receiving the required client materials
          and approvals. They are planning estimates rather than unconditional
          deadlines. Changes to the agreed scope or delays in feedback may
          affect the schedule.
        </p>
        <h2>Ownership and materials</h2>
        <p>
          Ownership, source files, account access and handover are agreed in the
          project quotation. Third-party software and assets are subject to
          their own licences. Clients should have permission to use any
          materials they supply.
        </p>
        <h2>Examples and external services</h2>
        <p>
          Portfolio previews illustrate the design and features of the featured
          project. External websites, email apps and WhatsApp are operated by
          their respective providers. Their availability and terms are outside
          VRGIL’s control.
        </p>
        <h2>Questions</h2>
        <p>
          For clarification before starting a project, contact{" "}
          <a href={`mailto:${studio.email}`}>{studio.email}</a>.
          Project-specific obligations should be confirmed in writing before
          work begins.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
