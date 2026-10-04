import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { projects } from "@/lib/projects";
import { siteUrl } from "@/lib/site-data";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.name} — Website project`,
    description: project.summary,
    ...(siteUrl
      ? {
          alternates: { canonical: `/portfolio/${project.slug}` },
          openGraph: {
            title: `${project.name} | VRGIL Web Solutions`,
            description: project.summary,
            url: `${siteUrl}/portfolio/${project.slug}`,
            images: [
              {
                url: project.desktop,
                width: 1440,
                height: 1000,
                alt: `${project.name} website preview`,
              },
            ],
          },
        }
      : {}),
  };
}
export default async function Portfolio({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <section className="case-hero container">
          <Link href="/#work" className="text-link back-link">
            <ArrowLeft size={16} aria-hidden="true" /> Back to selected work
          </Link>
          <span className="eyebrow">{project.industry}</span>
          <h1>{project.name}</h1>
          <div className="case-intro">
            <p>{project.summary}</p>
            <div className="case-type">
              <span>What we developed</span>Website design & development
            </div>
          </div>
        </section>
        <div className="case-visual container">
          <div className="browser-frame">
            <div className="browser-toolbar" aria-hidden="true">
              <div>
                <i />
                <i />
                <i />
              </div>
              <span>{project.name}</span>
              <ArrowUpRight size={12} />
            </div>
            <Image
              src={project.desktop}
              alt={`${project.name} desktop website, with salon imagery and service information`}
              width={1440}
              height={1000}
              priority
              sizes="(max-width: 700px) 90vw, 70vw"
            />
          </div>
          <div className="case-phone">
            <Image
              src={project.mobile}
              alt={`${project.name} mobile website layout`}
              width={390}
              height={844}
              sizes="(max-width: 700px) 35vw, 18vw"
            />
          </div>
        </div>
        <section className="case-details container section">
          <div>
            <span className="eyebrow">The brief</span>
            <h2>A welcoming first impression.</h2>
            <p>{project.brief}</p>
          </div>
          <div>
            <span className="eyebrow">The approach</span>
            <h2>Design with a practical purpose.</h2>
            <p>{project.approach}</p>
            <ul className="case-feature-list">
              {project.features.map((f) => (
                <li key={f}>
                  <Check size={16} aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
            {project.liveUrl && (
              <a
                className="text-link"
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit the live website{" "}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
          </div>
        </section>
        <section className="case-cta container">
          <h2>
            A website that feels
            <br />
            <em>like your business.</em>
          </h2>
          <Link className="button" href="/#contact">
            Discuss your project <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
