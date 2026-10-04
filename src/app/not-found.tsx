import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
export default function NotFound() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="not-found container">
        <span className="eyebrow">404 / Page not found</span>
        <h1>This page isn’t here.</h1>
        <p>
          Explore our current work or start a conversation about your website.
        </p>
        <Link className="button" href="/#work">
          Explore Our Work →
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
