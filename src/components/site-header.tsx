"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "@/lib/site-data";
import { Brand } from "./brand";
export function SiteHeader({ home = false }: { home?: boolean }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const href = (id: string) => `${home ? "" : "/"}#${id}`;
  useEffect(() => {
    if (open)
      header.current?.querySelector<HTMLAnchorElement>("nav a")?.focus();
    function dismiss(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    function outside(event: PointerEvent) {
      if (open && !header.current?.contains(event.target as Node))
        setOpen(false);
    }
    const media = window.matchMedia("(min-width: 960px)");
    function resized() {
      if (media.matches) setOpen(false);
    }
    document.addEventListener("keydown", dismiss);
    document.addEventListener("pointerdown", outside);
    media.addEventListener("change", resized);
    return () => {
      document.removeEventListener("keydown", dismiss);
      document.removeEventListener("pointerdown", outside);
      media.removeEventListener("change", resized);
    };
  }, [open]);
  return (
    <header className="site-header" ref={header}>
      <div className="nav-shell container">
        <Link
          className="brand-link"
          href={href("home")}
          aria-label="VRGIL home"
          onClick={() => setOpen(false)}
        >
          <Brand />
        </Link>
        <nav
          id="main-navigation"
          className={`main-navigation${open ? " is-open" : ""}`}
          aria-label="Main navigation"
        >
          {navigation.map((item) => (
            <a
              key={item.id}
              href={href(item.id)}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          className="button button-small nav-quote"
          href={href("contact")}
          onClick={() => setOpen(false)}
        >
          Get a Quote <ArrowUpRight size={15} aria-hidden="true" />
        </a>
        <button
          ref={toggle}
          type="button"
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}
