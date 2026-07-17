"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarCheck, Check, Code2, LayoutTemplate, Mail, Menu, MessageCircle, Quote, RefreshCw, Search, Send, ShieldCheck, TrendingUp, X } from "lucide-react";
import { DiaTextReveal } from "@/components/ui/dia-text-reveal";
import { FAQAccordionBlock } from "@/components/ui/faq-accordion-block-shadcnui";

const packages = [
  { name:"Landing Page", price:"$599", audience:"Best for startups, freelancers, restaurants, and small businesses.", delivery:"5–7 Days", features:["1 Custom Page","Mobile Responsive Design","Contact Form","WhatsApp Button","Google Maps Integration","Basic SEO Setup","Social Media Links","1 Round of Revisions"] },
  { name:"Business Website", price:"$999", audience:"Best for SMEs, clinics, salons, construction companies, and agencies.", delivery:"7–14 Days", features:["Up to 5 Pages","Home","About","Services","Portfolio/Gallery","Contact","Mobile Responsive Design","Contact Form","WhatsApp Integration","Google Maps Integration","Basic SEO Setup","Social Media Links","2 Rounds of Revisions"] },
];
const packageIdeal = [
  ["Generating enquiries","Establishing credibility","Launching quickly online"],
  ["Growing your business","Showcasing services professionally","Generating consistent leads","Building long-term credibility"],
];
const services = [
  ["Landing Page Design","Focused, conversion-ready pages that turn attention into enquiries.",LayoutTemplate],
  ["Business Website Development","Professional multi-page websites built around your goals.",Code2],
  ["Website Redesign","A sharper, more credible digital presence for an existing website.",RefreshCw],
  ["Lead Generation Setup","Clear enquiry paths and calls to action that support growth.",TrendingUp],
  ["Booking System Integration","Simple online scheduling that reduces customer friction.",CalendarCheck],
  ["Basic SEO Setup","Solid search foundations so your website can be found.",Search],
] as const;
const stats = [["81%","of consumers research online before purchasing.",81],["75%","judge business credibility based on website quality.",75],["57%","are less likely to trust businesses without a website.",57]] as const;
const process = [
  ["Discovery","We understand your business, goals, and website requirements.","Day 1–2","Strategy Brief"],
  ["Planning","We structure your pages, content, features, and design direction.","Day 3–5","Sitemap & Wireframe"],
  ["Design & Build","We create a clean, responsive website aligned with your brand.","Day 6–12","Website Draft"],
  ["Review","You review the website and request revisions.","Day 13–14","Revision Round"],
  ["Launch","After approval and final payment, your website goes live.","Day 14+","Live Website"],
];
const reasons = ["Modern Design","Mobile Responsive","Lead Generation Focus","Fast Delivery","Clear Communication","Professional Process"];
const heroWords = ["Businesses.","Brands.","Websites.","Experiences.","Content.","Ideas.","Stories.","Results."];
const addOns = [
  {name:"Additional page",description:"Each extra page beyond your package scope",tag:"Per page",price:100},
  {name:"Logo design",description:"Custom logotype with 2 revision rounds",tag:"One-time",price:100},
  {name:"Copywriting",description:"Professional copy written for your audience",tag:"Per page",price:100},
  {name:"Booking system",description:"Integrated scheduling and appointment flow",tag:"Integration",price:200},
  {name:"Blog setup",description:"CMS-powered blog with post templates",tag:"CMS",price:150},
  {name:"Extra revision",description:"One additional round of design changes",tag:"Per round",price:50},
  {name:"Priority delivery",description:"Expedited timeline, delivered in 7 days",tag:"Fast-track",price:200},
];
const portfolio = [["Healthcare","Business website that converts visitors into patients","Clearer services, stronger booking path, and trust-first design for a multi-location clinic.","3× patient enquiries in 60 days"],["Construction","Lead generation website","Professional presence built around project enquiries.","2× quote requests"],["Hospitality","Landing page built for bookings","Mobile-first with direct contact actions above the fold.","58% mobile conversion"]];
const testimonials = [["The new website made our business look established immediately. Enquiries became more consistent and easier to manage.","Daniel Tan","Buildwell Projects","Construction","+38% enquiries"],["VRGIL kept the process clear and delivered exactly what our clinic needed: trust, clarity, and a simple booking journey.","Rachel Lim","Northline Clinic","Healthcare","More bookings"],["A professional result without unnecessary complexity. The site finally reflects the quality of our service.","Marcus Lee","Foundry Studio","Creative Studio","Stronger credibility"]];
const faqs = [["What is the difference between a landing page and a business website?","A landing page is one focused page built around a specific offer. A business website uses multiple pages to explain your company, services, work, and contact details."],["Do I need to provide content?","You can provide existing text, images, and brand assets. We guide you on exactly what is needed."],["Do you offer copywriting?","Yes. Copywriting is available as an add-on for clear, professional website content."],["Do you provide hosting and domains?","We can guide you through domain and hosting setup and connect your website to your chosen provider."],["How long does the project take?","Landing pages usually take 5–7 days. Business websites typically take 7–14 days."],["Can I request revisions?","Every package includes revision rounds. Additional revisions can be added for $50 per round."]];
const reveal = { initial:{opacity:0,y:28}, whileInView:{opacity:1,y:0}, viewport:{once:true,amount:.12}, transition:{duration:.7,ease:[.22,1,.36,1]} };
const whatsappUrl = "https://wa.me/?text=Hello%20VRGIL%20Web%20Solutions%2C%20I%27d%20like%20to%20discuss%20a%20website%20project.";

function Brand({compact=false}:{compact?:boolean}) { return compact ? <Image className="symbol-logo" src="/vrgil-symbol.png" alt="VRGIL" width={225} height={225} sizes="34px"/> : <Image className="main-logo" src="/vrgil-logo-upscaled.jpeg" alt="VRGIL Web Solutions" width={1536} height={1024} sizes="(max-width: 760px) 92vw, 680px" priority/>; }
function Heading({number,title,text}:{number:string;title:string;text?:string}) { return <motion.div className="section-heading" {...reveal}><div><span>{number}</span><h2>{title}</h2></div>{text&&<p>{text}</p>}</motion.div>; }

const workflowRows = [
  ["Discovery","Client Review","Page Strategy","Content Planning","Brand Direction"],
  ["Responsive Build","QA & Optimization","Launch & Deploy","Lead Generation","SEO Setup"],
  ["Contact Forms","Mobile Design","Analytics","Booking Systems","Ongoing Support"],
];

function WorkflowBento() {
  const containerRef=useRef<HTMLDivElement>(null);
  const lensX=useMotionValue(0),lensY=useMotionValue(0);
  const clipPath=useMotionTemplate`circle(42px at calc(50% + ${lensX}px) calc(50% + ${lensY}px))`;
  const maskImage=useMotionTemplate`radial-gradient(circle 42px at calc(50% + ${lensX}px) calc(50% + ${lensY}px), transparent 99%, black 100%)`;
  return <motion.aside className="workflow-bento" initial={{opacity:0,x:45}} animate={{opacity:1,x:0}} transition={{duration:.9,delay:.25}}>
    <div className="workflow-window" ref={containerRef}>
      <motion.div className="workflow-rows workflow-muted" style={{WebkitMaskImage:maskImage,maskImage}}>
        {workflowRows.map((row,i)=><motion.div className="workflow-row" key={i} animate={{x:i%2===0?["0%","-33.333%"]:["-33.333%","0%"]}} transition={{duration:24,repeat:Infinity,ease:"linear"}}>{[...row,...row,...row].map((tag,j)=><span key={`${tag}-${j}`}><i/>{tag}</span>)}</motion.div>)}
      </motion.div>
      <motion.div className="workflow-rows workflow-reveal" style={{clipPath}}>
        {workflowRows.map((row,i)=><motion.div className="workflow-row" key={i} animate={{x:i%2===0?["0%","-33.333%"]:["-33.333%","0%"]}} transition={{duration:24,repeat:Infinity,ease:"linear"}}>{[...row,...row,...row].map((tag,j)=><span key={`${tag}-${j}`}><Check size={12}/>{tag}</span>)}</motion.div>)}
      </motion.div>
      <motion.div className="workflow-lens" drag dragMomentum={false} dragConstraints={containerRef} style={{x:lensX,y:lensY}} aria-hidden="true"><div/><i/></motion.div>
    </div>
    <div className="workflow-copy"><span>VRGIL / SYSTEM</span><h3>Intelligent Workflows</h3><p>A clear website process that connects strategy, design, development, and launch around your business goals.</p></div>
  </motion.aside>;
}

function ContactOverlay({onClose}:{onClose:()=>void}) {
  const [details,setDetails]=useState(false);
  return <motion.div className="contact-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
    <button type="button" className="contact-overlay-close" aria-label="Close contact window" onClick={onClose}><X size={20}/></button>
    <AnimatePresence mode="wait">
      {!details?<motion.div className="contact-launcher" key="launcher" initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-24,scale:.96}}>
        <div className="contact-available"><i/><span>Available for projects</span></div>
        <button type="button" className="contact-launch-button" onClick={()=>setDetails(true)}>
          <h2>Let&apos;s work<br/><em>together</em></h2>
          <span className="contact-launch-lines"><i/><b><ArrowUpRight size={24}/></b><i/></span>
        </button>
        <p>Have a project in mind? I&apos;d love to hear about it. Let&apos;s create something exceptional together.</p>
        <a href="mailto:adenleung08@gmail.com">adenleung08@gmail.com</a>
      </motion.div>:<motion.div className="contact-details-card" key="details" initial={{opacity:0,y:24,scale:.97}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:20}}>
        <span>Get in touch</span><h2>Say hello</h2>
        <div>
          <a href="mailto:adenleung08@gmail.com"><Mail size={20}/><p><small>Email</small><strong>adenleung08@gmail.com</strong></p><ArrowUpRight size={17}/></a>
          <a href="https://wa.me/6583635900" target="_blank" rel="noreferrer"><MessageCircle size={20}/><p><small>WhatsApp</small><strong>+65 8363 5900</strong></p><ArrowUpRight size={17}/></a>
        </div>
        <button type="button" onClick={()=>setDetails(false)}><ArrowLeft size={14}/> Go back</button>
      </motion.div>}
    </AnimatePresence>
  </motion.div>;
}

const portfolioMenuItems = [
  {number:"01",label:"Healthcare Website",href:"/portfolio/healthcare"},
  {number:"02",label:"Construction Website",href:"/portfolio/construction"},
  {number:"03",label:"Hospitality Landing Page",href:"/portfolio/hospitality"},
];

function PortfolioMenu() {
  const [open,setOpen]=useState(false);
  useEffect(()=>{const close=(event:KeyboardEvent)=>{if(event.key==="Escape")setOpen(false)};window.addEventListener("keydown",close);return()=>window.removeEventListener("keydown",close)},[]);
  const positions=[{x:-8,y:-122},{x:-92,y:-92},{x:-122,y:-8}];
  return <div className="portfolio-command">
    <AnimatePresence>{open&&<motion.button type="button" aria-label="Close portfolio menu" className="portfolio-command-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setOpen(false)}/>}</AnimatePresence>
    <AnimatePresence>{open&&<div className="portfolio-command-items" role="menu">{portfolioMenuItems.map((item,index)=><motion.a role="menuitem" aria-label={item.label} href={item.href} key={item.number} className="portfolio-command-item" initial={{opacity:0,x:0,y:0,scale:0}} animate={{opacity:1,x:positions[index].x,y:positions[index].y,scale:1}} exit={{opacity:0,x:0,y:0,scale:0}} transition={{type:"spring",stiffness:380,damping:25,delay:index*.05}}><strong>{item.number}</strong><span>{item.label}</span></motion.a>)}</div>}</AnimatePresence>
    <motion.button type="button" className="portfolio-command-trigger" aria-label={open?"Close portfolio menu":"Open portfolio menu"} aria-expanded={open} aria-haspopup="menu" onClick={()=>setOpen(!open)} whileTap={{scale:.94}}><motion.span animate={{rotate:open?45:0}}>+</motion.span><small>Portfolio</small></motion.button>
  </div>;
}

function ProcessSection() {
  const timelineRef=useRef<HTMLDivElement>(null);
  const {scrollYProgress}=useScroll({target:timelineRef,offset:["start 70%","end 55%"]});
  const lineScale=useTransform(scrollYProgress,[0,1],[0,1]);
  return <section className="site-section process-section" id="process">
    <Heading number="03 / PROCESS" title="Clear From Start To Launch." text="A structured workflow designed to keep your project moving efficiently and professionally."/>
    <div className="process-timeline" ref={timelineRef}>
      <div className="process-line"><motion.div className="process-line-progress" style={{scaleY:lineScale}}/></div>
      {process.map(([title,description,timeline,deliverable],i)=><motion.article className="process-step" key={title} initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.45}} transition={{duration:.65,delay:i*.04}}>
        <motion.div className="process-node" initial={{backgroundColor:"#050505",borderColor:"rgba(255,255,255,.18)"}} whileInView={{backgroundColor:"#f3f3f3",borderColor:"#f3f3f3"}} viewport={{once:true,amount:.75}} transition={{duration:.45}}><span>{String(i+1).padStart(2,"0")}</span></motion.div>
        <div className="process-card">
          <div className="process-card-top"><span>Step {String(i+1).padStart(2,"0")}</span><span>{i===2?"Core Production":"Professional Workflow"}</span></div>
          <h3>{title}</h3><p>{description}</p>
          <div className="process-meta"><span><small>Timeline</small>{timeline}</span><span><small>Deliverable</small>{deliverable}</span></div>
        </div>
      </motion.article>)}
    </div>
    <motion.div className="process-summary" {...reveal}><div><span>Project Timeline</span><h3>A reliable path from brief to launch.</h3></div>{[["5","Steps"],["14+","Days"],["1","Dedicated Point of Contact"],["","Professional Delivery Process"]].map(([value,label])=><div key={label}>{value&&<strong>{value}</strong>}<span>{label}</span></div>)}</motion.div>
  </section>;
}

function ScramblePlaceholder({active}:{active:boolean}) {
  const target="Enter access code";
  const randomChars="_!X$0-+*#";
  const [text,setText]=useState(target);
  useEffect(()=>{
    if(!active){setText("");return}
    let step=0;
    const timer=window.setInterval(()=>{
      const reveal=Math.min(Math.floor(step/2),target.length);
      setText(Array.from({length:target.length},(_,i)=>i<reveal?target[i]:i===reveal?randomChars[Math.floor(Math.random()*randomChars.length)]:" ").join(""));
      if(reveal===target.length){setText(target);window.clearInterval(timer)}
      step++;
    },42);
    return()=>window.clearInterval(timer);
  },[active]);
  return active?<span className="scramble-placeholder" aria-hidden="true">{text}</span>:null;
}

function Access({onUnlock}:{onUnlock:()=>void}) {
  const [code,setCode]=useState(""); const [focused,setFocused]=useState(false); const [status,setStatus]=useState<"idle"|"error"|"verifying"|"granted">("idle");
  function submit(e:FormEvent){e.preventDefault();if(code!=="123")return setStatus("error");setStatus("verifying");setTimeout(()=>{setStatus("granted");setTimeout(onUnlock,800)},800)}
  return <motion.main className="access" exit={{opacity:0,filter:"blur(10px)"}}>
    <div className="access-art"/><div className="access-top"><span className="secure-dot">● SECURE ACCESS</span></div>
    <motion.section className="access-center" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}}><Brand/><p className="logo-caption">WEB SOLUTIONS</p><h1>BUILD BETTER BUSINESSES</h1>
      <form className="access-form" onSubmit={submit}><label htmlFor="access-code">ACCESS CODE</label><div className={status==="error"?"access-field error":"access-field"}><div className="access-input-wrap"><ScramblePlaceholder active={!code&&!focused}/><input id="access-code" aria-invalid={status==="error"} aria-describedby={status==="error"?"access-error":undefined} autoComplete="one-time-code" type="password" inputMode="numeric" value={code} placeholder="" disabled={status==="verifying"||status==="granted"} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} onChange={e=>{setCode(e.target.value);if(status==="error")setStatus("idle")}}/></div><button disabled={status==="verifying"||status==="granted"}>{status==="verifying"?"Verifying...":status==="granted"?"Access Granted":"Enter"}{status==="granted"?<Check size={15}/>:<ArrowRight size={15}/>}</button></div><AnimatePresence>{status==="error"&&<motion.p id="access-error" role="alert" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><X size={12}/> Invalid Access Code</motion.p>}</AnimatePresence></form>
    </motion.section>
  </motion.main>;
}

function Welcome({onComplete}:{onComplete:()=>void}) {
  useEffect(()=>{
    const audio=new Audio("/welcome-vrgil.mp3");
    audio.volume=.9;
    audio.play().catch(()=>{});
    const timer=window.setTimeout(onComplete,3600);
    return()=>{window.clearTimeout(timer);audio.pause();audio.currentTime=0};
  },[onComplete]);
  return <motion.main className="welcome-transition" initial={{opacity:0,filter:"blur(22px)"}} animate={{opacity:1,filter:"blur(0px)"}} exit={{opacity:0,filter:"blur(24px)",scale:1.03}} transition={{duration:1,ease:[.22,1,.36,1]}}>
    <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:1.2,delay:.35}}>
      <span>Access Granted</span>
      <h1>Welcome to<br/><em>VRGIL Web Solutions</em></h1>
      <motion.i initial={{scaleX:0}} animate={{scaleX:1}} transition={{duration:2.4,delay:.7,ease:"easeInOut"}}/>
    </motion.div>
  </motion.main>;
}

function Agency() {
  const [menu,setMenu]=useState(false),[value,setValue]=useState(200),[enquiries,setEnquiries]=useState(10),[rate,setRate]=useState(10);
  const [selectedAddOns,setSelectedAddOns]=useState<number[]>([]);
  const [contactOpen,setContactOpen]=useState(false);
  const annual=Math.round(value*enquiries*(rate/100)*12);
  const addOnsTotal=selectedAddOns.reduce((total,index)=>total+addOns[index].price,0);
  const toggleAddOn=(index:number)=>setSelectedAddOns(current=>current.includes(index)?current.filter(item=>item!==index):[...current,index]);
  function submitEnquiry(e:FormEvent<HTMLFormElement>){e.preventDefault();const data=new FormData(e.currentTarget);const selected=selectedAddOns.map(index=>addOns[index].name).join(", ")||"None";const message=`Hello VRGIL Web Solutions,\n\nName: ${data.get("name")}\nBusiness: ${data.get("business")||"Not provided"}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")||"Not provided"}\nPackage: ${data.get("package")||"Not selected"}\nAdd-ons: ${selected}\n\nProject details:\n${data.get("message")||"Not provided"}`;window.open(`https://wa.me/?text=${encodeURIComponent(message)}`,"_blank","noopener,noreferrer")}
  useEffect(()=>{
    let animation=0;
    const handleAnchor=(event:MouseEvent)=>{
      const anchor=(event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if(!anchor)return;
      const id=anchor.getAttribute("href");
      if(!id||id==="#")return;
      const target=document.querySelector<HTMLElement>(id);
      if(!target)return;
      event.preventDefault();
      window.cancelAnimationFrame(animation);
      if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){target.scrollIntoView();return}
      const start=window.scrollY;
      const destination=id==="#home"?0:Math.max(0,target.getBoundingClientRect().top+start-92);
      const distance=destination-start;
      const duration=Math.min(1100,Math.max(650,Math.abs(distance)*.32));
      const started=performance.now();
      const tick=(now:number)=>{
        const progress=Math.min((now-started)/duration,1);
        const eased=progress<.5?4*progress*progress*progress:1-Math.pow(-2*progress+2,3)/2;
        window.scrollTo(0,start+distance*eased);
        if(progress<1)animation=window.requestAnimationFrame(tick);
        else history.replaceState(null,"",id);
      };
      animation=window.requestAnimationFrame(tick);
    };
    document.addEventListener("click",handleAnchor);
    return()=>{document.removeEventListener("click",handleAnchor);window.cancelAnimationFrame(animation)};
  },[]);
  const links=[["Home","home"],["Services","services"],["Packages","packages"],["Process","process"],["Contact","contact"]];
  return <motion.main className="agency" initial={{opacity:0}} animate={{opacity:1}}>
    <header className="site-nav"><a href="#home" aria-label="VRGIL home"><Brand compact/></a><nav id="site-menu" className={menu?"open":""}>{links.map(([x,id])=><a key={id} href={`#${id}`} onClick={()=>setMenu(false)}>{x}</a>)}</nav><button type="button" className="nav-action" onClick={()=>setContactOpen(true)}>Contact Us <ArrowUpRight size={13}/></button><button type="button" className="menu-toggle" aria-label={menu?"Close menu":"Open menu"} aria-expanded={menu} aria-controls="site-menu" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></header>
    <section className="hero" id="home"><motion.div className="hero-copy" initial={{opacity:0,y:28}} animate={{opacity:1,y:0}}><div className="eyebrow"><ShieldCheck size={14}/> Access Granted • Your solution is ready</div><span className="kicker">VRGIL WEB SOLUTIONS</span><h1>Build Better<br/><DiaTextReveal className="hero-rotating-word" text={heroWords} textColor="#707070" colors={["#707070","#f5f5f5","#9b9b9b","#707070"]} duration={1.35} repeat repeatDelay={.85} triggerOnView={false} once={false} fixedWidth/></h1><p>Modern websites designed to help businesses build trust, generate enquiries, and grow online.</p><div className="hero-buttons"><a className="primary-button" href="#packages">View Packages <ArrowRight size={15}/></a><a className="secondary-button" href="#contact">Start Your Project <ArrowUpRight size={15}/></a></div></motion.div><WorkflowBento/></section>
    <section className="trust-bar">{["Landing Pages","Business Websites","Mobile Responsive","SEO Ready","Lead Generation"].map(x=><span key={x}><i/>{x}</span>)}</section>

    <section className="site-section"><Heading number="01 / THE PROBLEM" title="Businesses Without Websites Lose Trust." text="Customers research businesses online before making purchasing decisions. Your digital presence shapes their first impression."/><div className="stat-grid">{stats.map(([v,t,a],i)=><motion.article key={v} {...reveal} transition={{...reveal.transition,delay:i*.08}}><strong>{v}</strong><p>{t}</p><div className="stat-chart"><motion.i initial={{width:0}} whileInView={{width:`${a}%`}} viewport={{once:true}} transition={{duration:1}}/></div></motion.article>)}</div></section>
    <section className="site-section missed-section"><motion.div className="section-heading missed-heading" {...reveal}><div><span>02 / THE COST</span><h2>Every day without a<br/>website<br/>is a <em>missed opportunity.</em></h2></div></motion.div><motion.div className="trust-diagram" {...reveal}><div className="diagram-axis"><span>LOW TRUST</span><i/><span>HIGH TRUST</span></div><div className="diagram-level level-low"><div><span>01</span><h3>No Website</h3><p>Hard to verify, hard to find, and easy to overlook.</p></div><strong>22%</strong></div><div className="diagram-level level-mid"><div><span>02</span><h3>Social Media Only</h3><p>Visible, but limited control and weaker business credibility.</p></div><strong>58%</strong></div><div className="diagram-level level-high"><div><span>03</span><h3>Professional Website</h3><p>Clear, credible, searchable, and built to generate enquiries.</p></div><strong>94%</strong></div><div className="diagram-arrow"><ArrowRight size={16}/><span>MORE CONTROL • MORE TRUST • MORE OPPORTUNITY</span></div></motion.div><div className="always-on">{["Works for your business 24/7","Generates enquiries","Builds trust","Converts visitors into customers"].map((x,i)=><motion.div key={x} {...reveal}><span>0{i+1}</span><p>{x}</p></motion.div>)}</div></section>
    <section className="site-section before-after"><Heading number="03 / THE SHIFT" title="The difference is visible." text="A professional website changes how customers perceive your business and how easily they can act."/><div className="comparison-grid"><motion.article {...reveal}><span>WITHOUT WEBSITE</span><h3>Easy to overlook.</h3>{["Less credibility","Harder to find online","Lost enquiries","Lower trust","Looks outdated"].map(x=><p key={x}><X size={14}/>{x}</p>)}</motion.article><motion.article className="positive" {...reveal}><span>WITH WEBSITE</span><h3>Built to be chosen.</h3>{["Professional image","Higher credibility","Google visibility","Lead generation","Business growth"].map(x=><p key={x}><Check size={14}/>{x}</p>)}</motion.article></div></section>
    <section className="site-section" id="services"><Heading number="04 / SERVICES" title="What we build." text="Focused digital solutions designed to improve credibility and help your business grow."/><div className="service-grid">{services.map(([t,p,Icon],i)=><motion.article className="service-card" key={t} {...reveal}><div><Icon size={20}/><span>0{i+1}</span></div><h3>{t}</h3><p>{p}</p><ArrowUpRight className="card-arrow" size={17}/></motion.article>)}</div></section>
    <section className="site-section muted-section" id="packages"><Heading number="05 / PACKAGES" title="Choose Your Foundation." text="Whether you need a simple online presence or a complete business website, VRGIL provides a solution designed to help your business grow."/><div className="package-grid">{packages.map((p,i)=><motion.article className={i===1?"package-card package-featured":"package-card"} key={p.name} {...reveal} whileHover={{y:i===1?-8:-5}}>{i===1&&<motion.span className="popular-badge" initial={{opacity:0,y:-8}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>Most Popular</motion.span>}<span className="card-number">0{i+1}</span><h3>{p.name}</h3><p>{p.audience}</p><span className="price-label">Starting From</span><strong>{p.price}</strong><div className="ideal-list"><span>Ideal For</span>{packageIdeal[i].map(x=><p key={x}><Check size={13}/>{x}</p>)}</div><ul>{p.features.map(x=><li key={x}><Check size={14}/>{x}</li>)}</ul><div className="delivery"><span>Estimated delivery</span><b>{p.delivery}</b></div><div className="professional-process"><span>Professional Process</span><p><Check size={13}/>50% Deposit Required</p><p><Check size={13}/>Final Payment Upon Completion</p></div><a href="#contact">Choose {p.name} <ArrowRight size={14}/></a></motion.article>)}</div><p className="pricing-note">Prices are starting from and may vary depending on project requirements.</p><motion.div className="package-trust" {...reveal}>{["Mobile Responsive","SEO Ready","WhatsApp Integration","Professional Design","Fast Delivery","Lead Generation Focus"].map(x=><span key={x}><Check size={13}/>{x}</span>)}</motion.div><motion.div className="package-value" {...reveal}><p>A professional website is often the first impression your customers have of your business.</p><strong>Designed correctly, it becomes a 24/7 sales tool that builds trust, generates enquiries, and supports business growth.</strong></motion.div></section>
    <section className="site-section roi-section"><motion.div {...reveal}><span className="section-tag">06 / RETURN ON INVESTMENT</span><h2>A Website Pays<br/>For Itself.</h2><p>If one customer is worth $200 profit and your website generates only one extra customer per month, that is <b>$2,400+</b> annual revenue compared with a $599 landing page.</p></motion.div><motion.div className="roi-calculator" {...reveal}><div><span>Estimated annual revenue</span><strong>${annual.toLocaleString()}</strong><small>Based on your inputs</small></div><label><span>Average customer value <b>${value}</b></span><input type="range" min="50" max="2000" step="50" value={value} onChange={e=>setValue(+e.target.value)}/></label><label><span>Monthly enquiries <b>{enquiries}</b></span><input type="range" min="1" max="100" value={enquiries} onChange={e=>setEnquiries(+e.target.value)}/></label><label><span>Conversion rate <b>{rate}%</b></span><input type="range" min="1" max="50" value={rate} onChange={e=>setRate(+e.target.value)}/></label></motion.div></section>
    <ProcessSection/>
    <section className="site-section why-section"><motion.div {...reveal}><span className="section-tag">08 / WHY VRGIL</span><h2>Focused On Results.<br/><em>Professional by default.</em></h2></motion.div><div className="reason-grid">{reasons.map(x=><motion.div key={x} {...reveal}><Check size={16}/><span>{x}</span></motion.div>)}</div></section>
    <section className="site-section muted-section addons-section"><Heading number="09 / ADD-ONS" title="Make it yours." text="Select any extras to add to your package."/><motion.div className="addons-menu" {...reveal}>{addOns.map((item,i)=>{const selected=selectedAddOns.includes(i);return <button type="button" className={selected?"addon-row selected":"addon-row"} key={item.name} onClick={()=>toggleAddOn(i)} aria-pressed={selected}><span className="addon-number">0{i+1}</span><span className="addon-select">{selected&&<Check size={12}/>}</span><span className="addon-details"><strong>{item.name}</strong><small>{item.description}</small></span><span className="addon-tag">{item.tag}</span><span className="addon-price">${item.price}</span></button>})}<div className="addons-total"><div><span>Add-ons total</span><small>{selectedAddOns.length?`${selectedAddOns.length} selected`:"Nothing selected yet"}</small></div><strong>${addOnsTotal}</strong><a href="#contact">Add to project <ArrowUpRight size={13}/></a></div></motion.div></section>
    <section className="site-section selected-work"><Heading number="10 / SELECTED WORK" title="Designed around business goals."/><div className="portfolio-grid">{portfolio.map(([industry,title,description,result],i)=><motion.article className={`portfolio-card portfolio-card-${i+1}`} key={industry} {...reveal} whileHover={{y:-5}}><div className={`browser-mockup browser-variant-${i+1}`}><div className="browser-bar"><span/><span/><span/><i/></div><div className="browser-content"><b/><strong/><em/><div className="mock-blocks"><i/><i/><i/></div></div></div><div className="portfolio-copy"><span>{industry}</span><h3>{title}</h3><p>{description}</p><b>{result}</b></div></motion.article>)}</div></section>
    <section className="site-section testimonial-section"><Heading number="11 / CLIENT REVIEWS" title="See What Clients Say." text="Real feedback from businesses after improving their digital presence."/><div className="reviews-stage">{testimonials.map(([review,name,company,industry,result],i)=><motion.article className={`review-position review-position-${i+1}`} key={name} initial={{opacity:0,y:45}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.35}} transition={{duration:.8,delay:i*.12}}><motion.div className="review-card" animate={{y:[0,i===1?-9:-6,0]}} transition={{duration:i===1?6:7.5,repeat:Infinity,ease:"easeInOut",delay:i*.6}} whileHover={{y:-12,scale:i===1?1.025:1.04}}><div className="review-top"><Quote size={22}/><span className="industry-pill">{industry}</span></div><div className="review-stars" aria-label="5 out of 5 stars">★★★★★</div><blockquote>“{review}”</blockquote><div className="review-person"><div><strong>{name}</strong><small>{company}</small></div><b>{result}</b></div></motion.div></motion.article>)}</div><motion.p className="reviews-note" {...reveal}>Demo reviews shown for presentation purposes. Replace with verified customer reviews before publishing.</motion.p></section>
    <section className="site-section muted-section"><FAQAccordionBlock faqs={faqs}/></section>
    <section className="closing-section"><motion.div {...reveal}><span className="section-tag">THE QUESTION IS</span><h2>Your Competitors<br/>Are Already Online.</h2><p>Will your customers find you or your competitors first?</p><div className="hero-buttons"><a className="primary-button" href="#contact">Start Your Project <ArrowRight size={15}/></a><a className="secondary-button" href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={15}/> Chat On WhatsApp</a></div></motion.div></section>
    <section className="site-section contact-section" id="contact"><motion.div className="contact-intro" {...reveal}><span className="section-tag">13 / CONTACT</span><h2>Start Your<br/>Project.</h2><p>Tell us where your business is heading. We’ll help shape the website that gets you there.</p><a href={whatsappUrl} target="_blank" rel="noreferrer" className="whatsapp"><MessageCircle size={16}/> Chat on WhatsApp</a></motion.div><motion.form className="contact-form" {...reveal} onSubmit={submitEnquiry}><label><span>Name</span><input name="name" required autoComplete="name" placeholder="Your name"/></label><label><span>Business Name</span><input name="business" autoComplete="organization" placeholder="Your business"/></label><label><span>Email</span><input name="email" required type="email" autoComplete="email" placeholder="you@business.com"/></label><label><span>Phone Number</span><input name="phone" type="tel" autoComplete="tel" placeholder="+65"/></label><label className="full"><span>Package Interested In</span><select name="package" defaultValue=""><option value="" disabled>Select a package</option><option>Landing Page — $599</option><option>Business Website — $999</option></select></label><label className="full"><span>Message</span><textarea name="message" rows={5} placeholder="Tell us about your project"/></label><button type="submit">Submit Enquiry <Send size={15}/></button></motion.form></section>
    <footer className="site-footer"><div><Brand compact/><strong>VRGIL Web Solutions</strong><p>Build Better Businesses</p></div><div><span>Services</span><p>Landing Pages • Business Websites • Digital Presence</p></div><div><span>Copyright</span><p>© 2026 VRGIL Web Solutions</p></div></footer>
    <AnimatePresence>{contactOpen&&<ContactOverlay onClose={()=>setContactOpen(false)}/>}</AnimatePresence>
    <PortfolioMenu/>
  </motion.main>;
}

export default function Home(){const[stage,setStage]=useState<"access"|"welcome"|"agency">("access");return <AnimatePresence mode="wait">{stage==="access"?<Access key="access" onUnlock={()=>setStage("welcome")}/>:stage==="welcome"?<Welcome key="welcome" onComplete={()=>setStage("agency")}/>:<Agency key="agency"/>}</AnimatePresence>}
