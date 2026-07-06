import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  Briefcase,
  TrendingUp,
  Layers,
  LineChart,
  ShieldCheck,
  Wallet,
  Cpu,
  GitMerge,
  Leaf,
  Building2,
  HeartPulse,
  Factory,
  ShoppingBag,
  MonitorSmartphone,
  Home as HomeIcon,
  Zap,
  Landmark,
  GraduationCap,
  Truck,
  Radio,
  Search,
  Compass,
  Rocket,
  Wrench,
  Sparkles,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Star,
  Menu,
  X,
  ChevronDown,
  Plus,
  Minus,
  Globe2,
} from "lucide-react";

import heroSkyline from "@/assets/hero-skyline.jpg";
import aboutBoardroom from "@/assets/about-boardroom.jpg";
import patternGrid from "@/assets/pattern-grid.jpg";

export const Route = createFileRoute("/")({
  component: MarketStrategyHome,
});

/* ------------------------------- Primitives ------------------------------- */

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: reduced
          ? "none"
          : `opacity 0.9s cubic-bezier(0.2,0.8,0.2,1) ${delay}ms, transform 0.9s cubic-bezier(0.2,0.8,0.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  intro,
  center,
  invert,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  center?: boolean;
  invert?: boolean;
}) {
  return (
    <div className={`${center ? "text-center mx-auto" : ""} max-w-3xl`}>
      <div className="eyebrow">
        <span className="gold-line" />
        {eyebrow}
      </div>
      <h2
        className={`mt-5 text-4xl md:text-5xl lg:text-6xl leading-[1.05] ${
          invert ? "text-white" : "text-navy-deep"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-6 text-base md:text-lg leading-relaxed ${
            invert ? "text-white/70" : "text-muted-foreground"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

function GoldButton({
  children,
  variant = "solid",
  href = "#contact",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "solid" | "outline" | "ghost";
  href?: string;
  className?: string;
}) {
  const base =
    "inline-flex items-center gap-2 px-6 h-12 text-sm font-medium tracking-wide transition-all duration-300 group";
  const styles =
    variant === "solid"
      ? "bg-gold text-navy-deep hover:bg-gold-soft"
      : variant === "outline"
        ? "border border-white/30 text-white hover:border-gold hover:text-gold"
        : "text-white/80 hover:text-gold";
  return (
    <a href={href} className={`${base} ${styles} ${className}`}>
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

/* --------------------------------- Data ---------------------------------- */

const services = [
  { icon: Search, title: "Market Research & Intelligence", desc: "Deep sector analysis, competitive benchmarking, and forward-looking market signals." },
  { icon: Compass, title: "Corporate Strategy", desc: "Board-level strategy design, portfolio choices, and long-range planning." },
  { icon: TrendingUp, title: "Growth Consulting", desc: "Revenue expansion, pricing, and go-to-market acceleration programs." },
  { icon: Rocket, title: "Business Transformation", desc: "Operating model redesign and enterprise-wide performance uplift." },
  { icon: LineChart, title: "Investment Advisory", desc: "Portfolio construction, capital allocation, and buy-side diligence." },
  { icon: ShieldCheck, title: "Risk Management", desc: "Enterprise risk frameworks, stress testing, and regulatory readiness." },
  { icon: Wallet, title: "Financial Planning", desc: "Capital structure, cash flow strategy, and long-horizon financial modeling." },
  { icon: Cpu, title: "Digital Strategy", desc: "AI, data, and platform strategy tied to measurable business outcomes." },
  { icon: GitMerge, title: "Mergers & Acquisitions", desc: "Origination, valuation, and post-merger value capture." },
  { icon: Leaf, title: "ESG & Sustainability", desc: "Sustainable finance, decarbonization roadmaps, and reporting frameworks." },
];

const industries = [
  { icon: Landmark, name: "Banking" },
  { icon: Briefcase, name: "Financial Services" },
  { icon: HeartPulse, name: "Healthcare" },
  { icon: Factory, name: "Manufacturing" },
  { icon: ShoppingBag, name: "Retail" },
  { icon: MonitorSmartphone, name: "Technology" },
  { icon: HomeIcon, name: "Real Estate" },
  { icon: Zap, name: "Energy" },
  { icon: Building2, name: "Government" },
  { icon: GraduationCap, name: "Education" },
  { icon: Truck, name: "Logistics" },
  { icon: Radio, name: "Telecommunications" },
];

const stats = [
  { value: 500, suffix: "+", label: "Global Clients" },
  { value: 35, suffix: "", label: "Countries" },
  { value: 20, suffix: "+", label: "Years of Advisory" },
  { value: 10, prefix: "$", suffix: "B+", label: "Strategic Value" },
  { value: 95, suffix: "%", label: "Client Satisfaction" },
];

const process = [
  { icon: Search, title: "Discovery", text: "Understand ambition, constraints, and the decisions that matter most." },
  { icon: BarChart3, title: "Market Analysis", text: "Quantify the opportunity with proprietary data and sector intelligence." },
  { icon: Compass, title: "Strategy Development", text: "Design defensible strategies with clear economic logic and choices." },
  { icon: Layers, title: "Execution Planning", text: "Translate strategy into sequenced initiatives, owners, and milestones." },
  { icon: Wrench, title: "Implementation Support", text: "Embed with client teams to move from decision to measurable action." },
  { icon: Sparkles, title: "Performance Optimization", text: "Instrument outcomes and compound value through continuous refinement." },
];

const insights = [
  { tag: "Market Trends", date: "Jun 12, 2026", title: "The New Geography of Capital: Where Growth Migrates Next" },
  { tag: "Investment Insights", date: "May 28, 2026", title: "Private Credit at Scale — Rethinking Portfolio Construction" },
  { tag: "Economic Outlook", date: "May 04, 2026", title: "Soft-Landing Playbook: Positioning for the Next Cycle" },
  { tag: "Digital Transformation", date: "Apr 22, 2026", title: "From Pilots to Platforms: AI That Actually Compounds" },
  { tag: "Leadership Perspectives", date: "Apr 08, 2026", title: "The CEO Agenda for a Fragmenting World" },
  { tag: "Industry Reports", date: "Mar 19, 2026", title: "Global Banking 2030 — Winning Models in a New Rate Regime" },
];

const cases = [
  { industry: "Banking", challenge: "Fragmented digital channels limiting cross-sell.", solution: "Unified client engagement platform and journey redesign.", results: "+38% conversion", roi: "4.2× ROI" },
  { industry: "Healthcare", challenge: "Margin pressure across specialty portfolio.", solution: "Portfolio rationalization and pricing architecture.", results: "+220 bps EBITDA", roi: "$180M value" },
  { industry: "Energy", challenge: "Transition strategy amid capital constraints.", solution: "Decarbonization roadmap and green financing structure.", results: "‑32% emissions", roi: "$2.1B financed" },
  { industry: "Technology", challenge: "Post-merger integration across three regions.", solution: "Operating model redesign and synergy program.", results: "12-mo synergies", roi: "3.7× multiple" },
  { industry: "Retail", challenge: "Loss of share in premium segment.", solution: "Brand repositioning and store-format economics.", results: "+14% comp sales", roi: "$95M uplift" },
  { industry: "Real Estate", challenge: "Underperforming asset portfolio.", solution: "Repositioning strategy and capital recycling.", results: "+22% NOI", roi: "6.1× ROI" },
];

const leaders = [
  { name: "Alexander Whitmore", role: "Chief Executive Officer", initials: "AW" },
  { name: "Priya Ranganathan", role: "Managing Director", initials: "PR" },
  { name: "Marcus Blackwood", role: "Chief Strategy Officer", initials: "MB" },
  { name: "Dr. Sofia Lindqvist", role: "Chief Economist", initials: "SL" },
  { name: "James Okonkwo", role: "Investment Director", initials: "JO" },
];

const testimonials = [
  { name: "Helena Vasquez", company: "CFO, Meridian Capital", quote: "Market Strategy reframed our capital allocation thesis with a rigor we hadn't seen before. Their team became an extension of our own." },
  { name: "Ravi Menon", company: "CEO, Northline Industries", quote: "A transformation partner in the truest sense — clear thinking, disciplined execution, and unmistakable financial impact." },
  { name: "Claire Dubois", company: "Chair, Aurelis Group", quote: "The most credible advisors we've worked with in twenty years. Board-ready insight backed by real operational depth." },
];

const offices = [
  { city: "New York", region: "North America", coords: { x: 26, y: 40 } },
  { city: "London", region: "Europe", coords: { x: 48, y: 34 } },
  { city: "Frankfurt", region: "Europe", coords: { x: 51, y: 36 } },
  { city: "Dubai", region: "Middle East", coords: { x: 60, y: 46 } },
  { city: "Mumbai", region: "South Asia", coords: { x: 66, y: 50 } },
  { city: "Singapore", region: "Southeast Asia", coords: { x: 74, y: 58 } },
];

const faqs = [
  { q: "How does an engagement with Market Strategy typically begin?", a: "Every relationship starts with a private diagnostic — a structured conversation with your leadership team to frame the decision at stake before any proposal is written." },
  { q: "Do you work with mid-market as well as global enterprises?", a: "Yes. We advise across the enterprise spectrum, from founder-led growth companies to Fortune 100 institutions and sovereign portfolios." },
  { q: "How is your work priced?", a: "Engagements are scoped as fixed-fee programs, retainers, or value-share arrangements — always tied to a defined outcome, not hours consumed." },
  { q: "Can you support post-strategy execution?", a: "Absolutely. Roughly 60% of our work is implementation-side — embedding senior operators alongside client teams until the outcome is realized." },
];

/* -------------------------------- Counter -------------------------------- */

function Counter({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const start = performance.now();
          const dur = 1800;
          const step = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(eased * target));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          io.unobserve(e.target);
        }
      });
    });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);
  return (
    <span ref={ref}>
      {prefix}
      {n}
      {suffix}
    </span>
  );
}

/* --------------------------------- Nav ----------------------------------- */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#industries", label: "Industries" },
    { href: "#insights", label: "Insights" },
    { href: "#cases", label: "Case Studies" },
    { href: "#careers", label: "Careers" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy-deep/90 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between h-20">
        <a href="#top" className="flex items-center gap-2.5 text-white">
          <div className="h-8 w-8 grid place-items-center border border-gold/50 text-gold font-display text-lg">M</div>
          <div className="leading-tight">
            <div className="font-display text-lg tracking-tight">Market Strategy</div>
            <div className="text-[10px] tracking-[0.24em] text-white/60 uppercase">Est. Global Advisory</div>
          </div>
        </a>
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-white/80 hover:text-gold transition-colors relative after:absolute after:left-0 after:-bottom-1.5 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:flex">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 h-10 px-5 text-sm text-navy-deep bg-gold hover:bg-gold-soft transition-colors"
          >
            Talk to an Expert
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <button
          className="lg:hidden text-white p-2 -mr-2"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden bg-navy-deep border-t border-white/10">
          <div className="container-x py-6 flex flex-col gap-4">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-white/80 hover:text-gold text-base" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center justify-center h-11 px-5 text-sm text-navy-deep bg-gold">
              Talk to an Expert
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* -------------------------------- Sections ------------------------------- */

function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden bg-navy-deep">
      <img
        src={heroSkyline}
        alt=""
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover opacity-55"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.17 0.04 265 / 0.7) 0%, oklch(0.17 0.04 265 / 0.5) 45%, oklch(0.17 0.04 265 / 0.95) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, oklch(0.78 0.13 82 / 0.25), transparent 40%), radial-gradient(circle at 80% 70%, oklch(0.4 0.12 260 / 0.3), transparent 45%)",
        }}
      />
      <div className="container-x relative z-10 pt-28 pb-20">
        <div className="max-w-4xl animate-fade-up">
          <div className="eyebrow">
            <span className="gold-line" />
            Global Strategic Advisory
          </div>
          <h1 className="mt-6 text-white text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.02]">
            Shaping Tomorrow's <br />
            <span className="italic text-gold-soft">Market Leaders</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-white/75 leading-relaxed">
            Helping organizations unlock sustainable growth through market intelligence,
            strategic consulting, digital transformation, and investment advisory — at
            enterprise scale, across five continents.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <GoldButton variant="solid" href="#contact">Get Started</GoldButton>
            <GoldButton variant="outline" href="#contact">Talk to an Expert</GoldButton>
          </div>
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-3xl border-t border-white/15 pt-8">
            {[
              ["500+", "Clients Advised"],
              ["35", "Countries"],
              ["$10B+", "Value Delivered"],
              ["20+", "Years"],
            ].map(([v, l]) => (
              <div key={l}>
                <div className="text-2xl md:text-3xl text-gold font-display">{v}</div>
                <div className="text-xs uppercase tracking-widest text-white/50 mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-[0.3em] uppercase flex flex-col items-center gap-2 animate-fade">
        Scroll
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative py-28 md:py-36 bg-background">
      <div className="container-x grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <Reveal>
          <div className="relative">
            <div className="absolute -top-4 -left-4 h-24 w-24 border-l border-t border-gold" />
            <img
              src={aboutBoardroom}
              alt="Executive boardroom strategy session"
              width={1600}
              height={1200}
              loading="lazy"
              className="relative w-full h-[520px] object-cover"
            />
            <div className="absolute -bottom-4 -right-4 h-24 w-24 border-r border-b border-gold" />
            <div className="absolute bottom-6 left-6 right-6 bg-navy-deep/90 backdrop-blur-md p-6 border-l-2 border-gold text-white max-w-sm">
              <div className="eyebrow text-gold">Since 2004</div>
              <div className="mt-2 font-display text-xl leading-snug">
                Trusted counsel to boards, investors, and operators across five continents.
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <SectionHeader
            eyebrow="About Market Strategy"
            title={<>Strategic counsel <span className="italic text-gold">built for consequential decisions.</span></>}
            intro="Market Strategy is an independent global advisory firm. We help enterprises navigate structural change with clarity — combining the intellectual rigor of a research house with the execution discipline of a top-tier consultancy."
          />
          <div className="mt-10 grid sm:grid-cols-2 gap-8">
            {[
              { title: "Vision", body: "To be the world's most trusted independent strategic advisor to enterprise leaders." },
              { title: "Mission", body: "Turn complexity into competitive advantage through evidence, judgment, and disciplined execution." },
              { title: "Values", body: "Independence. Intellectual honesty. Long-term partnership. Measurable impact." },
              { title: "Global Presence", body: "Six flagship offices, 35 country footprint, and a network of sector specialists." },
            ].map((b) => (
              <div key={b.title} className="border-t border-border pt-5">
                <div className="eyebrow text-navy-deep/70">{b.title}</div>
                <p className="mt-2 text-foreground/80 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="relative py-28 md:py-36 bg-navy-deep text-white overflow-hidden">
      <img src={patternGrid} alt="" width={1920} height={1080} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="container-x relative">
        <Reveal>
          <SectionHeader
            eyebrow="Practices"
            invert
            title={<>Ten disciplines. <span className="italic text-gold">One integrated firm.</span></>}
            intro="Cross-disciplinary teams combine sector depth with functional expertise — deployed as a single answer, not siloed workstreams."
          />
        </Reveal>
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-px bg-white/10 border border-white/10">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 40}>
              <div className="group relative bg-navy-deep p-8 h-full flex flex-col min-h-[280px] transition-colors duration-500 hover:bg-navy">
                <div className="h-12 w-12 grid place-items-center border border-gold/40 text-gold group-hover:bg-gold group-hover:text-navy-deep transition-colors duration-500">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-8 text-xl leading-snug text-white">{s.title}</h3>
                <p className="mt-3 text-sm text-white/60 leading-relaxed flex-1">{s.desc}</p>
                <a href="#contact" className="mt-6 inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-gold hover:gap-2.5 transition-all">
                  Learn More <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Industries() {
  return (
    <section id="industries" className="py-28 md:py-36 bg-background">
      <div className="container-x">
        <Reveal>
          <SectionHeader
            eyebrow="Industries"
            title={<>Sector fluency across the <span className="italic text-gold">global economy.</span></>}
            intro="Every engagement is staffed with senior operators who have led inside the industry they now advise."
          />
        </Reveal>
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {industries.map((ind, i) => (
            <Reveal key={ind.name} delay={i * 30}>
              <div className="group relative border border-border bg-card p-8 hover-lift cursor-default overflow-hidden">
                <div className="absolute inset-0 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 bg-navy-deep" />
                <div className="relative z-10 flex items-center gap-4">
                  <div className="h-11 w-11 grid place-items-center bg-navy-deep text-gold group-hover:bg-gold group-hover:text-navy-deep transition-colors duration-500">
                    <ind.icon className="h-5 w-5" />
                  </div>
                  <div className="font-display text-lg text-foreground group-hover:text-white transition-colors duration-500">
                    {ind.name}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section id="why" className="relative py-28 md:py-36 bg-navy text-white overflow-hidden">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, oklch(0.78 0.13 82 / 0.12), transparent 60%)" }} />
      <div className="container-x relative">
        <Reveal>
          <SectionHeader
            eyebrow="Why Market Strategy"
            invert
            center
            title={<>Two decades. <span className="italic text-gold">Measurable outcomes.</span></>}
            intro="A track record built one engagement at a time — with the world's most demanding boards and investment committees."
          />
        </Reveal>
        <div className="mt-20 grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="text-center border-t border-gold/30 pt-6">
                <div className="font-display text-5xl md:text-6xl text-gold">
                  <Counter target={s.value} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div className="mt-3 text-xs uppercase tracking-[0.2em] text-white/60">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="py-28 md:py-36 bg-background">
      <div className="container-x">
        <Reveal>
          <SectionHeader
            eyebrow="Our Process"
            title={<>Six steps from ambition to <span className="italic text-gold">enduring outcome.</span></>}
          />
        </Reveal>
        <div className="mt-16 relative">
          <div className="hidden lg:block absolute left-0 right-0 top-8 h-px bg-border" />
          <div className="grid gap-8 lg:grid-cols-6">
            {process.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className="relative">
                  <div className="relative z-10 h-16 w-16 grid place-items-center bg-navy-deep text-gold border border-navy-deep">
                    <p.icon className="h-6 w-6" />
                  </div>
                  <div className="mt-6 eyebrow text-navy-deep/50">Step 0{i + 1}</div>
                  <h3 className="mt-2 text-xl text-foreground">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Insights() {
  return (
    <section id="insights" className="py-28 md:py-36 bg-muted/50">
      <div className="container-x">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              eyebrow="Featured Insights"
              title={<>Research, briefings, <span className="italic text-gold">and long-form thinking.</span></>}
            />
            <a href="#insights" className="text-sm uppercase tracking-widest text-navy-deep border-b border-gold pb-1 hover:text-gold transition-colors">
              View All Insights
            </a>
          </div>
        </Reveal>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((post, i) => (
            <Reveal key={post.title} delay={i * 60}>
              <article className="group bg-card border border-border h-full flex flex-col hover-lift">
                <div
                  className="relative h-56 overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, oklch(0.17 0.04 265), oklch(0.24 0.06 265))`,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-700"
                    style={{
                      backgroundImage: `repeating-linear-gradient(45deg, transparent 0 12px, oklch(0.78 0.13 82 / 0.15) 12px 13px)`,
                    }}
                  />
                  <div className="absolute top-4 left-4 inline-flex items-center px-3 py-1 bg-gold text-navy-deep text-[10px] uppercase tracking-widest">
                    {post.tag}
                  </div>
                  <div className="absolute bottom-4 left-4 text-white/60 text-xs">{post.date}</div>
                </div>
                <div className="p-7 flex-1 flex flex-col">
                  <h3 className="text-xl leading-snug text-foreground group-hover:text-navy-deep transition-colors">
                    {post.title}
                  </h3>
                  <div className="mt-auto pt-6">
                    <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-navy-deep group-hover:text-gold transition-colors">
                      Read Insight <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudies() {
  const filters = ["All", "Banking", "Healthcare", "Energy", "Technology", "Retail", "Real Estate"];
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? cases : cases.filter((c) => c.industry === active);
  return (
    <section id="cases" className="py-28 md:py-36 bg-background">
      <div className="container-x">
        <Reveal>
          <SectionHeader
            eyebrow="Case Studies"
            title={<>Selected work. <span className="italic text-gold">Real economic impact.</span></>}
            intro="A small window into engagements delivered for boards, investors, and executive teams over the last decade."
          />
        </Reveal>
        <div className="mt-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 h-9 text-xs uppercase tracking-widest border transition-all ${
                active === f
                  ? "bg-navy-deep text-gold border-navy-deep"
                  : "bg-transparent text-foreground/70 border-border hover:border-navy-deep hover:text-navy-deep"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {filtered.map((c, i) => (
            <Reveal key={c.industry + i} delay={i * 60}>
              <div className="group border border-border bg-card p-8 hover-lift h-full">
                <div className="flex items-start justify-between gap-4">
                  <div className="eyebrow text-gold">{c.industry}</div>
                  <ArrowUpRight className="h-5 w-5 text-navy-deep/40 group-hover:text-gold group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="mt-4 text-2xl leading-snug text-foreground">{c.challenge}</h3>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  <span className="text-foreground font-medium">Approach — </span>{c.solution}
                </p>
                <div className="mt-6 pt-6 border-t border-border grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Result</div>
                    <div className="mt-1 font-display text-xl text-navy-deep">{c.results}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Impact</div>
                    <div className="mt-1 font-display text-xl text-gold">{c.roi}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Leadership() {
  return (
    <section id="leadership" className="py-28 md:py-36 bg-navy-deep text-white">
      <div className="container-x">
        <Reveal>
          <SectionHeader
            eyebrow="Leadership"
            invert
            title={<>The senior team <span className="italic text-gold">behind every engagement.</span></>}
            intro="Our partners average 20+ years leading strategy, capital, and transformation inside global institutions."
          />
        </Reveal>
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {leaders.map((l, i) => (
            <Reveal key={l.name} delay={i * 80}>
              <div className="group relative bg-navy border border-white/10 overflow-hidden">
                <div
                  className="aspect-[3/4] relative flex items-end justify-center"
                  style={{
                    background: `linear-gradient(180deg, oklch(0.24 0.06 265) 0%, oklch(0.17 0.04 265) 100%)`,
                  }}
                >
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="font-display text-6xl text-gold/40 group-hover:text-gold/70 transition-colors duration-700">
                      {l.initials}
                    </div>
                  </div>
                  <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 100%, oklch(0.17 0.04 265) 0%, transparent 70%)" }} />
                </div>
                <div className="p-6">
                  <h3 className="text-lg text-white leading-tight">{l.name}</h3>
                  <div className="mt-1 text-xs uppercase tracking-widest text-gold">{l.role}</div>
                  <p className="mt-3 text-sm text-white/60 leading-relaxed">
                    Two decades advising boards on strategy, capital, and transformation across global markets.
                  </p>
                  <div className="mt-5 flex gap-3">
                    <a href="#" aria-label={`${l.name} on LinkedIn`} className="h-9 w-9 grid place-items-center border border-white/20 text-white/70 hover:border-gold hover:text-gold transition-colors">
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <a href="#contact" aria-label={`Email ${l.name}`} className="h-9 w-9 grid place-items-center border border-white/20 text-white/70 hover:border-gold hover:text-gold transition-colors">
                      <Mail className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 7000);
    return () => clearInterval(t);
  }, []);
  const t = testimonials[i];
  return (
    <section className="py-28 md:py-36 bg-background">
      <div className="container-x max-w-4xl">
        <Reveal>
          <div className="eyebrow"><span className="gold-line" />Client Voices</div>
        </Reveal>
        <Reveal delay={100}>
          <blockquote key={i} className="mt-8 font-display text-3xl md:text-4xl lg:text-5xl leading-[1.2] text-navy-deep animate-fade">
            <span className="text-gold text-6xl leading-none align-top mr-2">“</span>
            {t.quote}
          </blockquote>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 grid place-items-center bg-navy-deep text-gold font-display text-xl">
                {t.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <div className="font-display text-lg text-navy-deep">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.company}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <div className="flex gap-2">
                {testimonials.map((_, k) => (
                  <button
                    key={k}
                    onClick={() => setI(k)}
                    aria-label={`Testimonial ${k + 1}`}
                    className={`h-1.5 transition-all ${k === i ? "w-8 bg-navy-deep" : "w-4 bg-border"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Careers() {
  return (
    <section id="careers" className="relative py-28 md:py-36 bg-navy text-white overflow-hidden">
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: "linear-gradient(90deg, oklch(0.78 0.13 82 / 0.1) 1px, transparent 1px)",
        backgroundSize: "80px 100%",
      }} />
      <div className="container-x relative grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <SectionHeader
            eyebrow="Careers"
            invert
            title={<>Do the most consequential <span className="italic text-gold">work of your career.</span></>}
            intro="Join a firm where the smartest people you know are also the people you'd most want to work with."
          />
          <div className="mt-10">
            <GoldButton variant="solid" href="#contact">Join Our Team</GoldButton>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="grid sm:grid-cols-2 gap-px bg-white/10 border border-white/10">
            {[
              { title: "Company Culture", body: "Meritocratic, apprenticeship-driven, and fiercely collaborative." },
              { title: "Benefits", body: "Market-leading compensation, equity, healthcare, and continued learning." },
              { title: "Open Positions", body: "Consultants, analysts, and senior advisors across all offices." },
              { title: "Graduate Programs", body: "Two-year rotation with sponsored MBA pathways." },
              { title: "Internships", body: "Summer associate programs in London, New York, and Singapore." },
              { title: "Global Mobility", body: "Rotate between our six flagship offices during your first five years." },
            ].map((b) => (
              <div key={b.title} className="bg-navy p-6">
                <div className="text-gold text-xs uppercase tracking-widest">{b.title}</div>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function GlobalOffices() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <section id="offices" className="py-28 md:py-36 bg-background">
      <div className="container-x">
        <Reveal>
          <SectionHeader
            eyebrow="Global Offices"
            center
            title={<>Six flagships. <span className="italic text-gold">One integrated firm.</span></>}
          />
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-16 relative bg-navy-deep border border-navy-deep overflow-hidden">
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: patternUrl }} />
            <svg viewBox="0 0 100 60" className="w-full h-auto relative z-10">
              <defs>
                <pattern id="dots" width="1.2" height="1.2" patternUnits="userSpaceOnUse">
                  <circle cx="0.6" cy="0.6" r="0.18" fill="oklch(0.78 0.13 82 / 0.35)" />
                </pattern>
                <mask id="worldMask">
                  <rect width="100" height="60" fill="black" />
                  {WORLD_PATH.map((p, i) => (
                    <path key={i} d={p} fill="white" />
                  ))}
                </mask>
              </defs>
              <rect width="100" height="60" fill="url(#dots)" mask="url(#worldMask)" />
              {offices.map((o) => (
                <g key={o.city} onMouseEnter={() => setActive(o.city)} onMouseLeave={() => setActive(null)} className="cursor-pointer">
                  <circle cx={o.coords.x} cy={o.coords.y} r={active === o.city ? 1.6 : 1.1} fill="oklch(0.78 0.13 82)" style={{ transition: "r 0.3s" }} />
                  <circle cx={o.coords.x} cy={o.coords.y} r="2.5" fill="oklch(0.78 0.13 82 / 0.25)">
                    <animate attributeName="r" values="2.5;5;2.5" dur="2.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0;0.6" dur="2.8s" repeatCount="indefinite" />
                  </circle>
                  <text
                    x={o.coords.x + 2}
                    y={o.coords.y - 1.5}
                    fill="white"
                    fontSize="1.6"
                    fontFamily="Inter, sans-serif"
                    opacity={active === o.city ? 1 : 0.7}
                    style={{ transition: "opacity 0.3s" }}
                  >
                    {o.city}
                  </text>
                </g>
              ))}
            </svg>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/10 border-t border-white/10 relative z-10">
              {offices.map((o) => (
                <button
                  key={o.city}
                  onMouseEnter={() => setActive(o.city)}
                  onMouseLeave={() => setActive(null)}
                  className={`text-left p-5 bg-navy-deep transition-colors ${active === o.city ? "bg-navy" : ""}`}
                >
                  <div className="flex items-center gap-2 text-gold">
                    <MapPin className="h-4 w-4" />
                    <div className="font-display text-lg text-white">{o.city}</div>
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-white/50">{o.region}</div>
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// Simplified continent shapes for the mask (stylized, not geographic-accurate)
const WORLD_PATH = [
  // North America
  "M8,22 Q14,18 22,20 L28,26 L30,34 L24,40 L18,42 L12,38 L8,30 Z",
  // South America
  "M26,42 L32,42 L34,50 L30,58 L26,56 L24,48 Z",
  // Europe
  "M46,22 L54,22 L56,30 L52,34 L46,34 L44,28 Z",
  // Africa
  "M46,36 L56,36 L58,46 L54,54 L48,54 L46,46 Z",
  // Middle East / Asia
  "M58,26 L74,24 L82,30 L84,38 L76,44 L66,42 L60,36 Z",
  // Southeast Asia
  "M72,46 L78,48 L80,54 L74,56 Z",
  // Australia
  "M82,50 L92,50 L94,56 L86,58 Z",
];

const patternUrl =
  "radial-gradient(circle at 30% 40%, oklch(0.78 0.13 82 / 0.2), transparent 40%), radial-gradient(circle at 70% 60%, oklch(0.4 0.12 260 / 0.3), transparent 50%)";

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-28 md:py-36 bg-muted/50">
      <div className="container-x max-w-4xl">
        <Reveal>
          <SectionHeader
            eyebrow="Frequently Asked"
            title={<>What clients most often <span className="italic text-gold">want to know.</span></>}
          />
        </Reveal>
        <div className="mt-14 border-t border-border">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-b border-border">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full py-6 flex items-start justify-between gap-6 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg md:text-xl text-navy-deep group-hover:text-gold transition-colors">{f.q}</span>
                  <span className="mt-1 h-8 w-8 grid place-items-center border border-navy-deep text-navy-deep shrink-0">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <div className={`grid transition-all duration-500 ${isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="text-muted-foreground leading-relaxed max-w-2xl">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setErrorMsg("");
    setFieldErrors({});
    const form = e.currentTarget;
    const fd = new FormData(form);

    // Honeypot: silently succeed for bots
    if (String(fd.get("website") ?? "").trim() !== "") {
      setStatus("success");
      form.reset();
      return;
    }

    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      company: String(fd.get("company") ?? "").trim(),
      role: String(fd.get("role") ?? "").trim(),
      interest: String(fd.get("interest") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
    };

    // Client-side validation
    const issues: Record<string, string[]> = {};
    if (payload.name.length < 2) issues.name = ["Please enter your full name."];
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) issues.email = ["Enter a valid email."];
    if (payload.company.length < 2) issues.company = ["Company is required."];
    if (payload.message.length < 10) issues.message = ["Please share a bit more (10+ chars)."];
    if (Object.keys(issues).length > 0) {
      setFieldErrors(issues);
      setErrorMsg("Please fix the highlighted fields.");
      setStatus("error");
      return;
    }

    const formspreeId = import.meta.env.VITE_FORMSPREE_ID as string | undefined;
    try {
      if (formspreeId) {
        const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          setErrorMsg("Something went wrong. Please try again or email us directly.");
          setStatus("error");
          return;
        }
        setStatus("success");
        form.reset();
      } else {
        // Fallback: open the user's mail client
        const subject = encodeURIComponent(`Inquiry from ${payload.name} — ${payload.company}`);
        const body = encodeURIComponent(
          `Name: ${payload.name}\nEmail: ${payload.email}\nCompany: ${payload.company}\nRole: ${payload.role}\nInterest: ${payload.interest}\n\n${payload.message}`,
        );
        window.location.href = `mailto:contact@marketstrategy.com?subject=${subject}&body=${body}`;
        setStatus("success");
        form.reset();
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  const fields: { name: string; label: string; type: string; placeholder: string; required?: boolean }[] = [
    { name: "name", label: "Full Name", type: "text", placeholder: "Jane Whitmore", required: true },
    { name: "email", label: "Business Email", type: "email", placeholder: "jane@company.com", required: true },
    { name: "company", label: "Company", type: "text", placeholder: "Your organization", required: true },
    { name: "role", label: "Role", type: "text", placeholder: "e.g. CFO" },
  ];

  return (
    <section id="contact" className="py-20 md:py-28 lg:py-36 bg-navy-deep text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true" style={{
        backgroundImage: "linear-gradient(oklch(0.78 0.13 82 / 0.3) 1px, transparent 1px)",
        backgroundSize: "100% 60px",
      }} />
      <div className="container-x relative grid lg:grid-cols-2 gap-12 lg:gap-16">
        <div>
          <Reveal>
            <SectionHeader
              eyebrow="Get in Touch"
              invert
              title={<>Start a conversation <span className="italic text-gold">with our team.</span></>}
              intro="Whether you're at the top of a market or navigating structural change, we're ready to help you make the next decision that matters."
            />
          </Reveal>
          <div className="mt-10 space-y-6">
            {[
              { icon: MapPin, label: "Headquarters", value: "One Financial Plaza, 42nd Floor, New York, NY 10005" },
              { icon: Mail, label: "Email", value: "contact@marketstrategy.com" },
              { icon: Phone, label: "Phone", value: "+1 (212) 555 0140" },
              { icon: Globe2, label: "Global Offices", value: "New York · London · Frankfurt · Dubai · Mumbai · Singapore" },
            ].map((c) => (
              <div key={c.label} className="flex gap-4 border-t border-white/10 pt-6">
                <div className="h-10 w-10 grid place-items-center border border-gold/40 text-gold shrink-0" aria-hidden="true">
                  <c.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="eyebrow text-white/60">{c.label}</div>
                  <div className="mt-1 text-white/90 break-words">{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Reveal delay={150}>
          <form
            noValidate
            onSubmit={handleSubmit}
            aria-labelledby="contact-form-title"
            className="bg-white/[0.03] border border-white/10 backdrop-blur-md p-6 sm:p-8 md:p-10"
          >
            <h3 id="contact-form-title" className="font-display text-2xl text-white">Request a private briefing</h3>
            <p className="mt-2 text-sm text-white/70">Typical response within one business day.</p>

            {/* Honeypot: hidden from users, visible to bots */}
            <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
              <label>
                Website
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 gap-5">
              {fields.map((f) => {
                const err = fieldErrors[f.name]?.[0];
                return (
                  <label key={f.name} className="block">
                    <span className="text-xs uppercase tracking-widest text-white/70">
                      {f.label}{f.required && <span className="text-gold" aria-hidden="true"> *</span>}
                    </span>
                    <input
                      required={f.required}
                      type={f.type}
                      name={f.name}
                      placeholder={f.placeholder}
                      autoComplete={f.name === "email" ? "email" : f.name === "name" ? "name" : "off"}
                      aria-invalid={err ? true : undefined}
                      aria-describedby={err ? `${f.name}-err` : undefined}
                      className="mt-2 w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/40 focus:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 transition-colors"
                    />
                    {err && <span id={`${f.name}-err`} className="mt-1 block text-xs text-red-300">{err}</span>}
                  </label>
                );
              })}
            </div>
            <label className="block mt-6">
              <span className="text-xs uppercase tracking-widest text-white/70">Area of Interest</span>
              <select
                name="interest"
                defaultValue={services[0]?.title}
                className="mt-2 w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
              >
                {services.map((s) => (
                  <option key={s.title} className="bg-navy-deep text-white">{s.title}</option>
                ))}
              </select>
            </label>
            <label className="block mt-6">
              <span className="text-xs uppercase tracking-widest text-white/70">How can we help? <span className="text-gold" aria-hidden="true">*</span></span>
              <textarea
                required
                name="message"
                rows={4}
                minLength={10}
                maxLength={2000}
                placeholder="Briefly describe the decision or challenge at hand..."
                aria-invalid={fieldErrors.message?.[0] ? true : undefined}
                className="mt-2 w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/40 focus:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 resize-none"
              />
              {fieldErrors.message?.[0] && <span className="mt-1 block text-xs text-red-300">{fieldErrors.message[0]}</span>}
            </label>

            <div aria-live="polite" className="mt-6 min-h-[1.25rem] text-sm">
              {status === "success" && (
                <p className="text-gold">Thank you. Our team will be in touch within one business day.</p>
              )}
              {status === "error" && (
                <p className="text-red-300">{errorMsg}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 min-h-12 py-4 bg-gold text-navy-deep font-medium tracking-wide hover:bg-gold-soft transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep"
            >
              {status === "submitting" ? "Sending…" : (<>Submit Inquiry <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></>)}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { title: "Firm", links: ["About", "Leadership", "Careers", "Global Offices", "Press"] },
    { title: "Services", links: ["Corporate Strategy", "Investment Advisory", "Growth Consulting", "Digital Strategy", "M&A Advisory"] },
    { title: "Industries", links: ["Banking", "Healthcare", "Energy", "Technology", "Real Estate"] },
    { title: "Resources", links: ["Insights", "Case Studies", "Reports", "Contact"] },
  ];
  return (
    <footer className="bg-navy-deep text-white border-t border-white/10">
      <div className="container-x py-20">
        <div className="grid lg:grid-cols-[1.4fr_2fr_1fr] gap-16">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 grid place-items-center border border-gold/50 text-gold font-display text-lg">M</div>
              <div className="font-display text-xl">Market Strategy</div>
            </div>
            <p className="mt-6 text-sm text-white/60 leading-relaxed max-w-sm">
              Independent global advisory to boards, investors, and executive teams navigating consequential decisions.
            </p>
            <div className="mt-8">
              <div className="eyebrow text-white/50">Newsletter</div>
              <form className="mt-3 flex border-b border-white/20 focus-within:border-gold transition-colors" onSubmit={(e) => e.preventDefault()}>
                <input type="email" required placeholder="you@company.com" className="flex-1 bg-transparent py-3 text-sm text-white placeholder:text-white/40 focus:outline-none" />
                <button type="submit" className="text-gold text-xs uppercase tracking-widest px-3">Subscribe</button>
              </form>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {cols.map((c) => (
              <div key={c.title}>
                <div className="eyebrow text-white/50">{c.title}</div>
                <ul className="mt-4 space-y-3">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-sm text-white/70 hover:text-gold transition-colors">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div>
            <div className="eyebrow text-white/50">Contact</div>
            <div className="mt-4 space-y-2 text-sm text-white/70">
              <div>One Financial Plaza</div>
              <div>New York, NY 10005</div>
              <div>contact@marketstrategy.com</div>
              <div>+1 (212) 555 0140</div>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-6">
          <div className="text-xs text-white/50">© {new Date().getFullYear()} Market Strategy Advisory LLC. All rights reserved.</div>
          <div className="flex flex-wrap gap-6 text-xs text-white/60">
            <a href="#" className="hover:text-gold">Privacy Policy</a>
            <a href="#" className="hover:text-gold">Terms of Use</a>
            <a href="#" className="hover:text-gold">Cookie Policy</a>
            <a href="#" className="hover:text-gold">Disclosures</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* --------------------------------- Page ---------------------------------- */

function MarketStrategyHome() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Services />
        <Industries />
        <WhyUs />
        <Process />
        <Insights />
        <CaseStudies />
        <Leadership />
        <Testimonials />
        <Careers />
        <GlobalOffices />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
