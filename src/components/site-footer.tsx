import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navigation, studio, whatsappLink } from "@/lib/site-data";
import { Brand } from "./brand";
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div>
          <Link href="/#home" aria-label="VRGIL home" className="brand-link">
            <Brand light />
          </Link>
          <p>
            We build websites.
            <br />
            You focus on your business.
          </p>
          <span className="footer-description">
            An independent web studio in Singapore.
          </span>
        </div>
        <nav aria-label="Footer navigation">
          {navigation
            .filter((item) => item.id !== "home")
            .map((item) => (
              <Link href={`/#${item.id}`} key={item.id}>
                {item.label}
              </Link>
            ))}
        </nav>
        <div className="footer-contact">
          <span>Start a conversation</span>
          <a href={`mailto:${studio.email}`}>
            {studio.email} <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            WhatsApp {studio.phone}{" "}
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {studio.name}
        </span>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Website terms</Link>
          <Link href="/#home">Back to top ↑</Link>
        </div>
      </div>
    </footer>
  );
}
