import Link from "next/link";

const projects: Record<string, { number: string; title: string; type: string }> = {
  healthcare: { number: "01", title: "Healthcare Website", type: "Business Website" },
  construction: { number: "02", title: "Construction Website", type: "Lead Generation Website" },
  hospitality: { number: "03", title: "Hospitality Landing Page", type: "Landing Page" },
};

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

export default async function PortfolioPlaceholder({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects[slug] ?? { number: "00", title: "Portfolio Project", type: "Coming Soon" };

  return (
    <main className="portfolio-placeholder">
      <nav><Link href="/">VRGIL / HOME</Link><span>{project.number} / PORTFOLIO</span></nav>
      <section>
        <span>{project.type}</span>
        <h1>{project.title}</h1>
        <p>This project page is ready for your final case study, imagery, project details, and results.</p>
        <div><span>Project preview placeholder</span></div>
        <Link href="/">← Return to VRGIL</Link>
      </section>
    </main>
  );
}
