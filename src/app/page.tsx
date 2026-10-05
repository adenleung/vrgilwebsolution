import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  CheckCheck,
  Compass,
  Globe2,
  LayoutTemplate,
  Mail,
  MapPin,
  MessageCircle,
  PanelsTopLeft,
  PenTool,
  RefreshCw,
  Search,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { QuoteForm } from "@/components/quote-form";
import { JourneyEnhancement } from "@/components/journey-enhancement";
import {
  addOns,
  faqs,
  journey,
  packages,
  services,
  studio,
  whatsappLink,
} from "@/lib/site-data";
import { projects } from "@/lib/projects";
const serviceIcons = {
  layout: LayoutTemplate,
  pages: PanelsTopLeft,
  redesign: RefreshCw,
  mobile: Smartphone,
  search: Search,
  contact: MessageCircle,
  booking: CalendarDays,
  custom: Sparkles,
};
const benefits = [
  {
    title: "Look the part.",
    label: "Credibility",
    description:
      "Present your business, services and contact information with care and consistency.",
    icon: CheckCheck,
  },
  {
    title: "Be easier to find.",
    label: "Discoverability",
    description:
      "Give prospective customers another way to discover what you do, alongside your social channels.",
    icon: Compass,
  },
  {
    title: "Make contact simple.",
    label: "Customer enquiries",
    description:
      "Help visitors move from a question to a conversation with clear contact options.",
    icon: MessageCircle,
  },
  {
    title: "Own your story.",
    label: "Brand control",
    description:
      "Create a dedicated destination for your information, imagery and services.",
    icon: PenTool,
  },
];
const reasons = [
  ["Clear pricing", "Know the package, scope and costs before work begins."],
  [
    "Designed around you",
    "Your brand and business needs shape the layout and content.",
  ],
  [
    "Direct communication",
    "Speak directly with the person designing and building your website.",
  ],
  [
    "Thoughtful on every screen",
    "Responsive layouts make your information usable on mobile and desktop.",
  ],
  [
    "A structured delivery",
    "A clear brief, review rounds and handover keep the project understandable.",
  ],
  [
    "Business comes first",
    "Pages and contact paths are organised around what your customers need.",
  ],
];
function SectionHeading({
  title,
  text,
}: {
  title: React.ReactNode;
  text?: string;
}) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}
export default function Home() {
  const project = projects[0];
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader home />
      <main id="main">
        <section
          className="hero container"
          id="home"
          aria-labelledby="hero-heading"
        >
          <div className="hero-copy">
            <h1 id="hero-heading">
              Your business
              <br />
              deserves a<br />
              <em>better website.</em>
            </h1>
            <p>
              Professional websites that build credibility, showcase your
              services and make customer enquiries easier.
            </p>
            <div className="button-row">
              <a className="button" href="#contact">
                Get a Free Quote <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a className="text-link" href="#work">
                Explore Our Work <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <Link
              href={`/portfolio/${project.slug}`}
              className="hero-project"
              aria-label={`Explore ${project.name} website project`}
            >
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
                  className="desktop-preview"
                  src={project.desktop}
                  alt={project.desktopAlt}
                  width={1440}
                  height={1000}
                  sizes="(max-width: 700px) 92vw, (max-width: 960px) 80vw, 49vw"
                  priority
                />
              </div>
              <div className="phone-frame">
                <Image
                  src={project.mobile}
                  alt={project.mobileAlt}
                  width={390}
                  height={844}
                  sizes="(max-width: 700px) 26vw, 140px"
                  priority
                />
              </div>
            </Link>
            <div className="hero-caption">
              <Link
                href={`/portfolio/${project.slug}`}
                className="hero-project-link"
              >
                <strong>{project.name}</strong>
                <span>
                  Explore Project <ArrowUpRight size={17} aria-hidden="true" />
                </span>
              </Link>
            </div>
          </div>
        </section>
        <section
          className="section container business-problem"
          aria-labelledby="problem-heading"
        >
          <div className="problem-intro">
            <h2 id="problem-heading">
              You have a business to run.
              <br />
              <em>A website shouldn’t add to your workload.</em>
            </h2>
            <p>
              Between serving customers and managing the everyday, finding time
              for a website can be difficult. We make the next step feel
              manageable.
            </p>
            <a href="#process" className="text-link">
              See how it works <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
          <div className="problem-list">
            {[
              [
                "“I don’t know where to start.”",
                "We help organise your pages, content and priorities.",
              ],
              [
                "“I’m busy, and I’m not technical.”",
                "You focus on the business. We handle design and development.",
              ],
              [
                "“Will a website be expensive?”",
                "Simple packages make the starting cost and scope clear.",
              ],
              [
                "“We already use social media.”",
                "A website complements your channels with a dedicated home.",
              ],
              [
                "“What about after launch?”",
                "We agree the handover and discuss any support you need upfront.",
              ],
            ].map(([title, text]) => (
              <div key={title}>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="benefits-section section">
          <div className="container">
            <SectionHeading
              title={
                <>
                  A home for your business.
                  <br />
                  <em>A clear next step for your customers.</em>
                </>
              }
            />
            <div className="benefit-grid">
              {benefits.map(({ title, label, description, icon: Icon }) => (
                <article key={label}>
                  <Icon size={26} strokeWidth={1.4} aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section container" id="services">
          <SectionHeading
            title={
              <>
                The right website.
                <br />
                <em>For the way you work.</em>
              </>
            }
            text="From a focused landing page to a complete business website, we turn your requirements into a clear, considered online experience."
          />
          <div className="service-grid">
            {services.map((service) => {
              const Icon = serviceIcons[service.icon];
              return (
                <article key={service.title}>
                  <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </article>
              );
            })}
          </div>
          <div className="service-note">
            <span>
              <MapPin size={17} aria-hidden="true" /> For SMEs, startups, cafés,
              salons and service businesses.
            </span>
            <a href="#contact" className="text-link">
              Let’s talk about yours{" "}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </section>
        <section className="work-section section" id="work">
          <div className="container">
            <SectionHeading
              title={
                <>
                  Every business has a story.
                  <br />
                  <em>Here’s one we helped bring online.</em>
                </>
              }
              text="A closer look at design, practical details and the customer experience."
            />
            <article className="featured-work">
              <Link
                href={`/portfolio/${project.slug}`}
                className="work-preview"
                aria-label={`Explore ${project.name} project`}
              >
                <div className="browser-frame">
                  <div className="browser-toolbar" aria-hidden="true">
                    <div>
                      <i />
                      <i />
                      <i />
                    </div>
                    <span>{project.name}</span>
                    <Globe2 size={13} />
                  </div>
                  <Image
                    src={project.desktop}
                    alt={project.desktopAlt}
                    width={1440}
                    height={1000}
                    sizes="(max-width: 960px) 90vw, 58vw"
                  />
                </div>
              </Link>
              <div className="work-copy">
                <p className="project-industry">{project.industry}</p>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <ul className="feature-tags">
                  {project.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <div className="work-actions">
                  <Link
                    className="button button-light"
                    href={`/portfolio/${project.slug}`}
                  >
                    Explore Project{" "}
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                  {project.liveUrl && (
                    <a
                      className="button button-work-outline"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Website{" "}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          </div>
        </section>
        <section className="section container" id="pricing">
          <SectionHeading
            title={
              <>
                Choose the website
                <br />
                your business needs.
              </>
            }
          />
          <p className="pricing-promise">
            Start simple. Grow when you’re ready.
          </p>
          <p className="pricing-intro">
            Clear scope, transparent pricing, and a website built around what
            your business actually needs.
          </p>
          <div className="pricing-grid">
            {packages.map((p, i) => (
              <article
                key={p.id}
                className={`pricing-card${i === 1 ? " pricing-featured" : ""}`}
              >
                <p className="package-identity">{p.label}</p>
                <h3>{p.name}</h3>
                <p className="package-pitch">{p.pitch}</p>
                <p className="package-description">{p.description}</p>
                <div className="package-price">
                  <span className="package-amount">
                    <span>S$</span>
                    {p.price}
                  </span>
                  <small>
                    starting price
                    <br />
                    one-time project
                  </small>
                </div>
                <div className="package-scope">
                  <strong>{p.pages}</strong>
                  <span>{p.structure}</span>
                  <p>{p.journey}</p>
                </div>
                <div className="package-best-for">
                  <h4>Best for</h4>
                  <p>{p.bestFor}</p>
                </div>
                <h4 className="package-includes">
                  Included with every website
                </h4>
                <ul className="package-features">
                  {p.features.map((feature) => (
                    <li key={feature}>
                      <Check size={17} aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <dl className="package-project">
                  <div>
                    <dt>Revisions</dt>
                    <dd>{p.revisions}</dd>
                  </div>
                  <div>
                    <dt>Estimated delivery</dt>
                    <dd>{p.delivery}</dd>
                  </div>
                </dl>
                <a
                  className={`button${i === 0 ? " button-outline" : ""}`}
                  href="#contact"
                  data-package={p.id}
                >
                  Choose {p.name} <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
          <div className="package-guidance">
            <h3>Not sure which one fits?</h3>
            <div>
              {packages.map((p) => (
                <p key={p.id}>{p.guidance}</p>
              ))}
            </div>
            <a className="text-link" href="#contact">
              Get a recommendation <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
          <div className="pricing-notes">
            <p>
              Estimated from the point that the required content, project scope
              and deposit have been received. Custom work is quoted
              individually.
            </p>
            <p>
              Domain registration, hosting, third-party subscriptions and
              ongoing maintenance are separate unless explicitly included in
              your quotation. A 50% deposit starts the project; final payment is
              due on completion.
            </p>
          </div>
          <div className="addons">
            <div>
              <h3>
                A little extra,
                <br />
                <em>when you need it.</em>
              </h3>
              <p>
                Optional additions, agreed before we build. All prices below are
                starting prices. An additional standalone page expands the
                standard package scope, including a one-page Landing Page.
              </p>
            </div>
            <table>
              <caption className="sr-only">
                Optional services and starting prices in Singapore dollars
              </caption>
              <thead>
                <tr>
                  <th scope="col">Add-on</th>
                  <th scope="col">Starting price</th>
                </tr>
              </thead>
              <tbody>
                {addOns.map((a) => (
                  <tr key={a.name}>
                    <th scope="row">{a.name}</th>
                    <td>S${a.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="process-section section" id="process">
          <div className="container">
            <SectionHeading
              title={
                <>
                  You’ll know what’s next.
                  <br />
                  <em>Every step of the way.</em>
                </>
              }
              text="A straightforward journey, with clear milestones and space for your feedback."
            />
            <ol className="journey">
              {journey.map((step, i) => (
                <li className="journey-step" key={step.title}>
                  <div className="journey-node">0{i + 1}</div>
                  <div className="journey-content">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                    <div className="journey-milestone">
                      <Check size={15} aria-hidden="true" />
                      {step.milestone}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <div className="process-footnote">
              <span>
                A clear scope. A considered design. An agreed handover.
              </span>
              <a href="#contact" className="text-link">
                Start with a conversation{" "}
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
          <JourneyEnhancement />
        </section>
        <section className="section container why-section">
          <div className="why-heading">
            <h2>
              Small studio.
              <br />
              <em>Personal attention.</em>
            </h2>
            <p>
              VRGIL is an independent freelance web design and development
              studio. You work directly with your designer and developer, from
              the first conversation to handover.
            </p>
            <span className="studio-signature">
              VRGIL Web Solutions <span>Singapore</span>
            </span>
          </div>
          <div className="reason-grid">
            {reasons.map(([title, text]) => (
              <article key={title}>
                <Check size={17} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="faq-section section">
          <div className="container faq-layout">
            <div>
              <h2>
                Before you
                <br />
                <em>take the next step.</em>
              </h2>
              <p>
                Questions are welcome. We’ll help you understand what your
                project needs.
              </p>
              <a
                href={whatsappLink()}
                className="text-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ask us on WhatsApp <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
            <div className="faq-list">
              {faqs.map(([question, answer]) => (
                <details key={question}>
                  <summary>
                    <span>{question}</span>
                    <span className="faq-plus" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section className="contact-section section" id="contact">
          <div className="container contact-layout">
            <div className="contact-copy">
              <h2>
                Let’s build something that works <em>for your business.</em>
              </h2>
              <p>
                Starting fresh or ready for a redesign? Tell us a little about
                your business, and we’ll work out the next step together.
              </p>
              <div className="contact-methods">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle
                    size={22}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span>
                    <small>Chat on WhatsApp</small>
                    <strong>{studio.phone}</strong>
                  </span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
                <a href={`mailto:${studio.email}`}>
                  <Mail size={22} strokeWidth={1.5} aria-hidden="true" />
                  <span>
                    <small>Prefer email?</small>
                    <strong>{studio.email}</strong>
                  </span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </div>
              <p className="contact-small">
                No technical brief needed. Just a conversation about what your
                business needs.
              </p>
            </div>
            <QuoteForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
