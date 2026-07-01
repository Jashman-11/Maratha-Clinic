/**
 * Design: Warm Earth Sanctuary — updated with Dr. Maratha Clinic real data
 * Palette: Terra-copper, Sand, Bark, Cream, Gold
 * Fonts: Playfair Display (headings), DM Sans (body)
 * Layout: 5 full-viewport sections, generous whitespace, organic scroll animations
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Shield,
  Leaf,
  MapPin,
  Heart,
  Phone,
  Star,
  ChevronDown,
  Lock,
  Users,
  Award,
  Clock,
  Menu,
  X,
  CheckCircle,
  ArrowDown,
  MessageCircle,
} from "lucide-react";

// ── Image URLs ──
const HERO_BG1 = "/manus-storage/hero-clinic_aef35847.jpg";
const HERO_BG2 = "/manus-storage/hero-clinic-alt_fa43d506.jpg";
const LOGO = "https://storage.googleapis.com/hostinger-horizons-assets-prod/f78413fb-a807-48f8-b007-8ce63e93dc03/3b443e4d989bb63bc79a9289ccf90bec.png";
const ABOUT_IMG = "/manus-storage/about-section_e609bba7.jpg";
const TREATMENT_IMG = "/manus-storage/treatment-image_d4fab0bf.jpg";
const TESTIMONIAL_BG = "/manus-storage/testimonial-bg_15fc33a7.jpg";

// ── Unsplash fallbacks for less prominent areas ──
const PRIVACY_IMG = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80";
const NATURAL_IMG = "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80";
const PANINDIA_IMG = "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80";

// ── WhatsApp Phone ──
const WHATSAPP_PHONE = "919410949406";

// ── UseInView Hook ──
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// ── Animated Section Wrapper ──
function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isVisible } = useInView();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ── Section Divider ──
function SectionDivider({ color }: { color: string }) {
  return (
    <div className="relative -mb-1">
      <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 md:h-20">
        <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill={color} />
      </svg>
    </div>
  );
}

// ── Nav Sections ──
const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "conditions", label: "Treatments" },
  { id: "testimonials", label: "Stories" },
  { id: "contact", label: "Contact" },
];

// ── Main Page Component ──
export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Track scroll for sticky nav styling & active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      const sectionElements = SECTIONS.map((s) =>
        document.getElementById(s.id)
      );
      const scrollPos = window.scrollY + 200;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="min-h-screen font-[DM_Sans]">
      {/* ═══ Sticky Navigation ═══ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-cream/95 backdrop-blur-md shadow-lg shadow-bark/5"
            : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2 group"
          >
            <img src={LOGO} alt="Dr. Maratha Clinic" className="h-10 w-auto md:h-14 md:w-auto" />
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  activeSection === s.id
                    ? scrolled
                      ? "bg-terra text-white"
                      : "bg-white/20 text-white backdrop-blur-sm"
                    : scrolled
                    ? "text-bark hover:text-terra"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:9410949406`}
              className={`hidden xl:flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-full transition-all duration-300 border ${
                scrolled
                  ? "border-terra text-terra hover:bg-terra/5"
                  : "border-white/30 text-white hover:bg-white/10"
              }`}
            >
              <Phone className="w-4 h-4" />
              9410949406
            </a>
            <button
              onClick={() => scrollTo("contact")}
              className={`px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ${
                scrolled
                  ? "bg-terra text-white hover:bg-terra-dark"
                  : "bg-white text-terra hover:bg-sand"
              }`}
            >
              Book Consultation
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className={scrolled ? "text-bark" : "text-white"} size={24} />
            ) : (
              <Menu className={scrolled ? "text-bark" : "text-white"} size={24} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-cream/95 backdrop-blur-md border-t border-bark/10">
            <div className="container py-4 space-y-1">
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeSection === s.id
                      ? "bg-terra text-white"
                      : "text-bark hover:bg-sand"
                  }`}
                >
                  {s.label}
                </button>
              ))}
              <div className="flex items-center gap-2 px-4 py-2 text-sm text-bark">
                <Phone className="w-4 h-4" />
                9410949406
              </div>
              <button
                onClick={() => scrollTo("contact")}
                className="w-full mt-2 px-5 py-3 text-sm font-semibold bg-terra text-white rounded-lg"
              >
                Book Consultation
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* ═══ PAGE 1: Hero + Trust ═══ */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      >
        {/* Cinematic Slideshow Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[HERO_BG1, HERO_BG2].map((src, i) => (
            <div
              key={i}
              className="absolute inset-0 animate-hero-cinematic"
              style={{
                animationDelay: `${i * 8}s`,
                animationDuration: "16s",
              }}
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover animate-hero-kenburns"
                style={{
                  animationDelay: `${i * 8}s`,
                  animationDuration: "16s",
                }}
              />
            </div>          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-bark/90 via-bark/40 to-bark/20 z-10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container pb-16 md:pb-24 pt-24">
          <AnimatedSection>
            <p className="text-gold text-sm font-semibold tracking-[0.08em] uppercase mb-4">
              India's Trusted Ayurvedic Sexologist
            </p>
          </AnimatedSection>

          <AnimatedSection delay={150}>
            <h1 className="font-[Playfair_Display] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight max-w-4xl">
              Heal Naturally.
              <br />
              <span className="text-gold">Live Confidently.</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <p className="mt-6 text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed">
              Expert herbal treatment for erectile dysfunction, premature ejaculation,
              infertility, Gupt Rog, hormonal issues, and more — with 100% natural,
              confidential Ayurvedic care.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={450}>
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href={`https://wa.me/${WHATSAPP_PHONE}?text=Hello%20Dr.%20Maratha%20Clinic%2C%20I%20would%20like%20to%20book%20a%20confidential%20consultation.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-terra text-white font-semibold rounded-full text-base hover:bg-terra-dark transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-terra/30 flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Book Confidential Consultation
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full text-base border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                WhatsApp Us
              </a>
            </div>
          </AnimatedSection>

          {/* Trust Badges */}
          <AnimatedSection delay={600}>
            <div className="mt-12 flex flex-wrap gap-4 md:gap-6">
              {[
                { label: "25,000+", sub: "Happy Patients" },
                { label: "20+", sub: "Years of Trust" },
                { label: "95%", sub: "Treatment Success" },
                { label: "100%", sub: "Natural Solutions" },
              ].map((badge, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/10 hover:scale-105 transition-transform duration-300"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {i === 0 && <Users className="w-5 h-5 text-gold" />}
                  {i === 1 && <Award className="w-5 h-5 text-gold" />}
                  {i === 2 && <Shield className="w-5 h-5 text-gold" />}
                  {i === 3 && <Leaf className="w-5 h-5 text-gold" />}
                  <div>
                    <p className="text-white font-bold text-lg">{badge.label}</p>
                    <p className="text-white/60 text-xs">{badge.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
          <button
            onClick={() => scrollTo("about")}
            className="flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors"
          >
            <span className="text-xs tracking-[0.08em] uppercase">Scroll</span>
            <ArrowDown
              className="w-5 h-5 animate-bounce"
              style={{ animationDuration: "2s" }}
            />
          </button>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* ═══ PAGE 2: About + Why Choose Us ═══ */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section id="about" className="bg-cream relative">
        <SectionDivider color="oklch(0.97 0.01 80)" />

        <div className="container py-20 md:py-32">
          {/* About Story */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedSection>
              <div className="relative">
                <img
                  src={ABOUT_IMG}
                  alt="Dr. Maratha Clinic consultation"
                  className="w-full rounded-2xl shadow-2xl shadow-bark/10 object-cover aspect-[4/3]"
                />
                <div className="absolute -bottom-6 -right-6 bg-terra text-white rounded-2xl p-6 shadow-xl shadow-terra/20 hidden md:block">
                  <p className="font-[Playfair_Display] text-3xl font-bold">20+</p>
                  <p className="text-sm opacity-90">Years of Healing</p>
                </div>
              </div>
            </AnimatedSection>

            <div className="space-y-6">
              <AnimatedSection delay={100}>
                <p className="text-terra text-sm font-semibold tracking-[0.08em] uppercase">
                  Our Story
                </p>
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <h2 className="font-[Playfair_Display] text-3xl md:text-4xl font-bold text-bark leading-tight">
                  The Heart of
                  <br />
                  Dr. Maratha Clinic
                </h2>
              </AnimatedSection>

              <AnimatedSection delay={300}>
                <p className="text-bark-light leading-relaxed text-lg">
                  For over two decades, Dr. Maratha Clinic has been a beacon of hope
                  and healing, offering authentic Ayurvedic solutions for sexual
                  wellness. We blend ancient wisdom with modern understanding to
                  provide personalized, effective, and confidential care — helping you
                  reclaim your vitality and confidence.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={400}>
                <p className="text-bark-light leading-relaxed">
                  Our approach is rooted in the profound principles of Ayurveda and
                  Unani medicine — time-tested traditions that offer natural, holistic
                  pathways to sexual health. Founded in 2003, we now serve over
                  25,000 patients across multiple cities in India.
                </p>
              </AnimatedSection>

              {/* Doctor Cards */}
              <AnimatedSection delay={500}>
                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-bark/5">
                    <div className="w-12 h-12 rounded-xl bg-terra/10 flex items-center justify-center mb-3">
                      <Award className="w-6 h-6 text-terra" />
                    </div>
                    <h4 className="font-[Playfair_Display] text-lg font-bold text-bark">Dr. Maratha</h4>
                    <p className="text-terra text-sm font-medium">B.A.M.S. — Ayurvedic & Unani Sexologist</p>
                    <p className="text-bark-light/60 text-xs mt-2">20+ Years Experience • Board Certified</p>
                    <p className="text-bark-light text-sm mt-2">Male Sexual Dysfunction, Infertility, Gupt Rog</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-bark/5">
                    <div className="w-12 h-12 rounded-xl bg-terra/10 flex items-center justify-center mb-3">
                      <Award className="w-6 h-6 text-terra" />
                    </div>
                    <h4 className="font-[Playfair_Display] text-lg font-bold text-bark">Dr. Bharat</h4>
                    <p className="text-terra text-sm font-medium">B.U.M.S. — Ayurvedic Sexologist</p>
                    <p className="text-bark-light/60 text-xs mt-2">15+ Years Experience • Board Certified</p>
                    <p className="text-bark-light text-sm mt-2">Holistic Sexual Wellness, Herbal Medicine</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mt-20 md:mt-28">
            <AnimatedSection>
              <div className="text-center max-w-2xl mx-auto mb-14">
                <p className="text-terra text-sm font-semibold tracking-[0.08em] uppercase mb-3">
                  Why Patients Trust Us
                </p>
                <h2 className="font-[Playfair_Display] text-3xl md:text-4xl font-bold text-bark">
                  The Pillars of Our Practice
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  img: PRIVACY_IMG,
                  title: "Utmost Confidentiality",
                  desc: "Your privacy is paramount. We ensure a secure and discreet environment for all consultations and treatments — every detail is protected.",
                },
                {
                  img: NATURAL_IMG,
                  title: "100% Natural & Ayurvedic",
                  desc: "Embracing the power of nature, our treatments use pure, time-tested Ayurvedic herbs and formulations — no harmful chemicals or synthetic compounds.",
                },
                {
                  img: PANINDIA_IMG,
                  title: "Multi-City Presence",
                  desc: "Physical clinics in Haridwar, Haldwani, and Moradabad, plus online consultations serving 18+ cities across India — expert care is always accessible.",
                },
              ].map((item, i) => (
                <AnimatedSection key={i} delay={i * 150}>
                  <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-bark/5 transition-all duration-500">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bark/30 to-transparent" />
                    </div>
                    <div className="p-6 md:p-8">
                      <h3 className="font-[Playfair_Display] text-xl font-bold text-bark mb-3">
                        {item.title}
                      </h3>
                      <p className="text-bark-light text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Patient-Centric Process */}
          <div className="mt-20 md:mt-28">
            <AnimatedSection>
              <div className="text-center max-w-2xl mx-auto mb-14">
                <p className="text-terra text-sm font-semibold tracking-[0.08em] uppercase mb-3">
                  How It Works
                </p>
                <h2 className="font-[Playfair_Display] text-3xl md:text-4xl font-bold text-bark">
                  Your Path to Recovery
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Initial Consultation", desc: "A confidential discussion about your health concerns, lifestyle, and medical history with our expert Ayurvedic doctor." },
                { step: "02", title: "Ayurvedic Diagnosis", desc: "A thorough examination based on Ayurvedic principles — Nadi Pariksha, Prakriti Analysis — to identify root causes." },
                { step: "03", title: "Customized Treatment", desc: "A personalized plan including natural medicines, dietary advice, and lifestyle modifications tailored to you." },
                { step: "04", title: "Follow-up & Support", desc: "Continuous monitoring of progress, treatment adjustments if needed, and ongoing support for lasting wellness." },
              ].map((item, i) => (
                <AnimatedSection key={i} delay={i * 120}>
                  <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-sm">
                    <div className="text-terra text-4xl font-[Playfair_Display] font-bold opacity-20 mb-3">
                      {item.step}
                    </div>
                    <h3 className="font-[Playfair_Display] text-lg font-bold text-bark mb-2">
                      {item.title}
                    </h3>
                    <p className="text-bark-light text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* ═══ PAGE 3: Conditions Treated + Treatment Packages ═══ */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section id="conditions" className="bg-sand/30 relative">
        <SectionDivider color="oklch(0.95 0.015 75)" />

        <div className="container py-20 md:py-32">
          {/* Conditions Grid */}
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-terra text-sm font-semibold tracking-[0.08em] uppercase mb-3">
                What We Treat
              </p>
              <h2 className="font-[Playfair_Display] text-3xl md:text-4xl font-bold text-bark">
                Comprehensive Ayurvedic Treatments
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-20 md:mb-28">
            {[
              {
                title: "Erectile Dysfunction (ED)",
                desc: "92% Success Rate. Effective Ayurvedic solutions for achieving and maintaining strong erections. Duration: 3-6 months.",
                rate: "92%",
              },
              {
                title: "Premature Ejaculation (PE)",
                desc: "89% Success Rate. Gain better control and prolong intimacy. Calms the nervous system, strengthens reproductive organs. Duration: 2-4 months.",
                rate: "89%",
              },
              {
                title: "Low Libido / Sexual Weakness",
                desc: "90% Success Rate. Rekindle desire and boost sexual energy naturally. Ayurvedic aphrodisiacs and rejuvenation therapies. Duration: 2-5 months.",
                rate: "90%",
              },
              {
                title: "Nightfall / Swapndosh",
                desc: "95% Success Rate. Relief from frequent nocturnal emissions. Strengthens reproductive system, balances bodily energies. Duration: 1-3 months.",
                rate: "95%",
              },
              {
                title: "Infertility (Male & Female)",
                desc: "85% Success Rate. Comprehensive approach to enhance fertility. Improve reproductive health, balance hormones, address underlying causes. Duration: 6-12 months.",
                rate: "85%",
              },
              {
                title: "Low Sperm Count (Oligospermia)",
                desc: "88% Success Rate. Boost sperm count, motility, and morphology. Nourish reproductive tissues, enhance sperm production. Duration: 4-8 months.",
                rate: "88%",
              },
              {
                title: "Relationship & Marital Counseling",
                desc: "93% Success Rate. Strengthen your bond and improve intimacy. Navigate challenges, improve communication, foster healthier relationships. Session-based.",
                rate: "93%",
              },
              {
                title: "Hormonal Imbalances",
                desc: "Personalized herbal formulations and dietary protocols to restore hormonal balance naturally, addressing thyroid, testosterone, and other endocrine concerns.",
                rate: null,
              },
              {
                title: "White Discharge & Related Issues",
                desc: "Targeted Ayurvedic treatments for recurrent white discharge and related genital concerns, using internal cleansing and immunity-building formulations.",
                rate: null,
              },
            ].map((cond, i) => (
              <AnimatedSection key={i} delay={i * 80}>
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg hover:shadow-bark/5 transition-all duration-500 group">
                  {cond.rate && (
                    <div className="inline-flex items-center gap-1.5 bg-gold/10 text-gold text-xs font-semibold px-3 py-1 rounded-full mb-4">
                      <Star className="w-3.5 h-3.5 fill-gold" />
                      {cond.rate} Success Rate
                    </div>
                  )}
                  <h3 className="font-[Playfair_Display] text-lg font-bold text-bark mb-3">
                    {cond.title}
                  </h3>
                  <p className="text-bark-light text-sm leading-relaxed">
                    {cond.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Treatment Packages */}
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-terra text-sm font-semibold tracking-[0.08em] uppercase mb-3">
                Wellness Packages
              </p>
              <h2 className="font-[Playfair_Display] text-3xl md:text-4xl font-bold text-bark">
                Invest in Your Long-Term Wellbeing
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Silver Package",
                subtitle: "Foundational Ayurvedic Support",
                price: "₹7,500",
                original: "₹9,000",
                duration: "4-6 Weeks",
                items: [
                  "Initial Ayurvedic Consultation",
                  "Basic Herbal Detoxification Kit",
                  "Personalized Dietary Guidelines",
                  "Follow-up support",
                ],
              },
              {
                name: "Golden Package",
                subtitle: "Advanced Vitality Restoration",
                price: "₹15,000",
                original: "₹18,500",
                duration: "6-8 Weeks",
                popular: true,
                items: [
                  "Comprehensive Ayurvedic Consultation",
                  "Premium Revitalizing Herbal Blend",
                  "Customized Diet & Nutrition Plan",
                  "Regular follow-up sessions",
                ],
              },
              {
                name: "Diamond Package",
                subtitle: "Ultimate Sexual Rejuvenation",
                price: "₹25,000",
                original: "₹30,000",
                duration: "8-12 Weeks",
                items: [
                  "Extensive Ayurvedic Assessment & Diagnosis",
                  "Customized Premium Rasayana Therapies",
                  "Advanced Potent Herbal Formulations",
                  "Dedicated treatment coordinator",
                ],
              },
              {
                name: "Honeymoon Bliss Package",
                subtitle: "Specialized Care for Newly-Weds",
                price: "₹12,000",
                original: "₹15,000",
                duration: "4-6 Weeks",
                items: [
                  "Joint Couples Ayurvedic Consultation",
                  "Natural Aphrodisiac Herbs for Harmony",
                  "Intimacy & Communication Guidance",
                  "Pre-marriage wellness assessment",
                ],
              },
            ].map((pkg, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className={`relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-bark/5 transition-all duration-500 ${
                  pkg.popular ? "ring-2 ring-terra ring-offset-2" : ""
                }`}>
                  {pkg.popular && (
                    <div className="absolute top-4 right-4 bg-terra text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
                      Most Popular
                    </div>
                  )}
                  <div className="p-6 md:p-8">
                    <h3 className="font-[Playfair_Display] text-xl font-bold text-bark mb-1">
                      {pkg.name}
                    </h3>
                    <p className="text-bark-light text-sm mb-4">{pkg.subtitle}</p>
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="font-[Playfair_Display] text-3xl font-bold text-bark">
                        {pkg.price}
                      </span>
                      <span className="text-bark-light/40 text-sm line-through">
                        {pkg.original}
                      </span>
                    </div>
                    <p className="text-terra text-sm font-medium mb-5">
                      {pkg.duration} Program
                    </p>
                    <ul className="space-y-3">
                      {pkg.items.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-bark-light text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-terra mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={`https://wa.me/${WHATSAPP_PHONE}?text=Hello%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(pkg.name)}.%20Please%20provide%20more%20information.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 block w-full py-3 bg-terra text-white font-semibold rounded-xl text-center text-sm hover:bg-terra-dark transition-all duration-300"
                    >
                      Enquire on WhatsApp
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* ═══ PAGE 4: Testimonials + FAQ ═══ */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section
        id="testimonials"
        className="relative bg-bark text-white"
      >
        <div className="absolute inset-0 opacity-10">
          <img
            src={TESTIMONIAL_BG}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 container py-20 md:py-32">
          {/* Testimonials */}
          <div className="mb-20 md:mb-28">
            <AnimatedSection>
              <div className="text-center max-w-2xl mx-auto mb-12">
                <p className="text-gold text-sm font-semibold tracking-[0.08em] uppercase mb-3">
                  Patient Stories
                </p>
                <h2 className="font-[Playfair_Display] text-3xl md:text-4xl font-bold">
                  Stories of Renewed Vitality
                </h2>
                <p className="text-white/60 mt-4 text-lg">
                  Read what our patients say about their journey to sexual wellness
                  with Dr. Maratha Clinic.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <Carousel className="w-full max-w-4xl mx-auto">
                <CarouselContent>
                  {[
                    {
                      name: "Rajesh K.",
                      city: "Haridwar",
                      text: "Dr. Maratha Clinic's Ayurvedic treatment for my erectile dysfunction was a game-changer. I feel rejuvenated and confident. Highly recommend their confidential and effective care.",
                      rating: 5,
                    },
                    {
                      name: "Priya S.",
                      city: "Mumbai",
                      text: "I was struggling with low libido, and it affected my relationship. The natural treatment at Dr. Maratha Clinic helped me immensely. The doctors are understanding and professional.",
                      rating: 5,
                    },
                    {
                      name: "Amit V.",
                      city: "Delhi",
                      text: "The privacy and professionalism here is unmatched. After months of hesitation, I finally reached out. The personalized treatment plan and natural approach gave me real results in 4 months.",
                      rating: 5,
                    },
                    {
                      name: "Neha R.",
                      city: "Haldwani",
                      text: "As a woman, I was nervous about seeking help. But the team made me feel completely comfortable. The holistic approach to my hormonal issues worked where nothing else had.",
                      rating: 5,
                    },
                    {
                      name: "Suresh M.",
                      city: "Moradabad",
                      text: "Started with the Golden Package and the results exceeded my expectations. The herbal formulations, diet plan, and regular follow-ups made all the difference. Truly grateful.",
                      rating: 4,
                    },
                  ].map((t, i) => (
                    <CarouselItem key={i}>
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12">
                        <div className="flex gap-1 mb-6">
                          {Array.from({ length: t.rating }).map((_, j) => (
                            <Star
                              key={j}
                              className="w-5 h-5 fill-gold text-gold"
                            />
                          ))}
                        </div>
                        <blockquote className="text-lg md:text-xl leading-relaxed text-white/90 mb-8 font-light italic">
                          "{t.text}"
                        </blockquote>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-terra/30 flex items-center justify-center">
                            <span className="text-terra font-semibold text-lg">
                              {t.name[0]}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold">{t.name}</p>
                            <p className="text-white/50 text-sm">{t.city}</p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center gap-3 mt-8">
                  <CarouselPrevious className="static translate-y-0 bg-white/10 border-white/20 text-white hover:bg-white/20" />
                  <CarouselNext className="static translate-y-0 bg-white/10 border-white/20 text-white hover:bg-white/20" />
                </div>
              </Carousel>
            </AnimatedSection>
          </div>

          {/* FAQ */}
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-gold text-sm font-semibold tracking-[0.08em] uppercase mb-3">
                Your Questions Answered
              </p>
              <h2 className="font-[Playfair_Display] text-3xl md:text-4xl font-bold">
                Frequently Asked Questions
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={150}>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-3">
                {[
                  {
                    q: "What is Gupt Rog and how can Ayurveda help?",
                    a: "Gupt Rog is a traditional term for various sexual health disorders. Ayurveda addresses these through Vajikarana (rejuvenation therapy), herbal formulations, dietary changes, and lifestyle modifications — treating the root cause rather than just symptoms.",
                  },
                  {
                    q: "Is Ayurvedic treatment for sexual problems truly effective and safe?",
                    a: "Our treatments use 100% natural Ayurvedic medicines with no harmful side effects when taken as prescribed. With over 25,000 satisfied patients and success rates of 85-95% across conditions, the results speak for themselves.",
                  },
                  {
                    q: "How is patient confidentiality maintained at Dr. Maratha Clinic?",
                    a: "We maintain complete confidentiality. All consultations are private and your personal information is kept secure. No data is shared with third parties, and you can even choose to communicate under a pseudonym.",
                  },
                  {
                    q: "Do you offer online consultations?",
                    a: "Yes, we offer online consultations via phone and WhatsApp for patients who cannot visit our clinics. Call 9410949406 for details. We serve 18+ cities across India through our online consultation platform.",
                  },
                  {
                    q: "How long does the treatment take?",
                    a: "Treatment duration varies based on the condition. Most patients see improvement within 2-6 months of consistent treatment. Our Initial Consultation is the first step to understanding your personalized timeline.",
                  },
                  {
                    q: "What are the clinic hours and which cities do you serve?",
                    a: "We are open Monday to Saturday, 10:00 AM to 7:00 PM (Sunday closed). We have physical clinics in Haridwar, Haldwani, and Moradabad, and serve 18+ cities including Delhi, Mumbai, Bangalore, and more via online consultation.",
                  },
                ].map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
                  >
                    <AccordionTrigger className="px-6 py-5 text-left hover:no-underline text-left">
                      <span className="font-medium text-white/90 text-base pr-4">
                        {faq.q}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-5 text-white/70 text-sm leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* ═══ PAGE 5: Locations + Booking + Footer ═══ */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section id="contact" className="bg-cream relative">
        <SectionDivider color="oklch(0.97 0.01 80)" />

        <div className="container py-20 md:py-32">
          {/* Physical Branches */}
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-terra text-sm font-semibold tracking-[0.08em] uppercase mb-3">
                Our Branches
              </p>
              <h2 className="font-[Playfair_Display] text-3xl md:text-4xl font-bold text-bark">
                Visit a Clinic Near You
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                city: "Haridwar",
                state: "Uttarakhand",
                phone: "9917554821",
                areas: ["Haridwar", "Jwalapur", "Bahadrabad", "Roorkee", "Laksar", "Rishikesh"],
              },
              {
                city: "Haldwani",
                state: "Uttarakhand",
                phone: "9557986727",
                areas: ["Haldwani", "Nainital", "Ramnagar", "Kashipur", "Kichha", "Rudarpur"],
              },
              {
                city: "Moradabad",
                state: "Uttar Pradesh",
                phone: "9917554821",
                areas: ["Moradabad", "Rampur", "Bilaspur", "Amroha", "Sambhal"],
              },
            ].map((branch, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl hover:shadow-bark/5 transition-all duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-terra/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-terra" />
                    </div>
                    <div>
                      <h3 className="font-[Playfair_Display] text-lg font-bold text-bark">{branch.city}</h3>
                      <p className="text-bark-light text-xs">{branch.state}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Phone className="w-4 h-4 text-terra" />
                    <a href={`tel:${branch.phone}`} className="text-terra text-sm font-medium hover:underline">
                      {branch.phone}
                    </a>
                  </div>
                  <p className="text-bark-light/60 text-xs mb-3 uppercase tracking-wider font-medium">Areas Served:</p>
                  <div className="flex flex-wrap gap-2">
                    {branch.areas.map((area, j) => (
                      <span key={j} className="text-xs bg-sand/50 text-bark-light px-2 py-1 rounded-lg">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Online Cities */}
          <AnimatedSection>
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-terra/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-terra" />
                </div>
                <div>
                  <h3 className="font-[Playfair_Display] text-lg font-bold text-bark">
                    Online Consultation — 18+ Cities
                  </h3>
                  <p className="text-bark-light text-xs">
                    Serving patients across India via phone and WhatsApp
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {[
                  "Delhi NCR", "Mumbai", "Thane", "Navi Mumbai", "Gurgaon",
                  "Indore", "Goa", "Guwahati", "Chandigarh", "Shimla",
                  "Kurukshetra", "Ahmedabad", "Dehradun", "Meerut", "Ghaziabad",
                  "Rishikesh", "Bangalore", "Hyderabad",
                ].map((city, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-sand/30 rounded-lg px-3 py-2"
                  >
                    <MapPin className="w-3.5 h-3.5 text-terra shrink-0" />
                    <span className="text-xs font-medium text-bark">{city}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Booking Form */}
          <AnimatedSection>
            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl shadow-bark/5 overflow-hidden">
              <div className="grid md:grid-cols-5">
                <div className="md:col-span-2 bg-terra text-white p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    <h3 className="font-[Playfair_Display] text-2xl font-bold mb-4">
                      Book Your
                      <br />
                      Consultation
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Your first step towards natural healing. All information is
                      kept strictly confidential.
                    </p>
                  </div>
                  <div className="mt-8 space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-white/70" />
                      <div>
                        <p className="text-sm font-medium">9410949406</p>
                        <p className="text-xs text-white/50">General Enquiries</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-white/70" />
                      <div>
                        <p className="text-sm font-medium">9917554821</p>
                        <p className="text-xs text-white/50">Haridwar / Moradabad</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-white/70" />
                      <div>
                        <p className="text-sm font-medium">9557986727</p>
                        <p className="text-xs text-white/50">Haldwani</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-white/70" />
                      <span className="text-sm">Mon–Sat: 10AM – 7PM</span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-3 p-8 md:p-10">
                  <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-bark text-sm font-medium">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          placeholder="Your full name"
                          className="border-bark/20 focus:border-terra focus:ring-terra/20 rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-bark text-sm font-medium">
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          placeholder="Your phone number"
                          className="border-bark/20 focus:border-terra focus:ring-terra/20 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-bark text-sm font-medium">
                        Email
                      </Label>
                      <Input
                        id="email"
                        placeholder="Your email address"
                        type="email"
                        className="border-bark/20 focus:border-terra focus:ring-terra/20 rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-bark text-sm font-medium">
                        City
                      </Label>
                      <Input
                        id="city"
                        placeholder="Your city"
                        className="border-bark/20 focus:border-terra focus:ring-terra/20 rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="problem" className="text-bark text-sm font-medium">
                        Problem Type *
                      </Label>
                      <select
                        id="problem"
                        className="w-full h-10 rounded-xl border border-bark/20 bg-transparent px-4 text-sm text-bark focus:border-terra focus:ring-1 focus:ring-terra/20 outline-none"
                      >
                        <option value="">Select problem type</option>
                        <option value="erectile-dysfunction">Erectile Dysfunction</option>
                        <option value="premature-ejaculation">Premature Ejaculation</option>
                        <option value="low-libido">Low Libido / Sexual Weakness</option>
                        <option value="nightfall">Nightfall / Swapndosh</option>
                        <option value="infertility">Infertility</option>
                        <option value="white-discharge">White Discharge</option>
                        <option value="hormonal">Hormonal Issues</option>
                        <option value="low-sperm-count">Low Sperm Count</option>
                        <option value="relationship">Relationship / Marital Counseling</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-bark text-sm font-medium">
                        Additional Message
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Briefly describe your concern (optional). This helps us prepare for your consultation."
                        rows={3}
                        className="border-bark/20 focus:border-terra focus:ring-terra/20 rounded-xl resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-terra text-white font-semibold rounded-xl text-base hover:bg-terra-dark transition-all duration-300 hover:scale-[1.01] shadow-lg shadow-terra/20"
                    >
                      Send Consultation Request
                    </button>

                    <p className="text-center text-bark-light/60 text-xs flex items-center justify-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      Your information is encrypted and never shared
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* WhatsApp CTA */}
          <AnimatedSection delay={150}>
            <div className="mt-12 text-center">
              <p className="text-bark-light text-sm mb-4">
                Prefer instant messaging?
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_PHONE}?text=Hi,%20I%20would%20like%20to%20book%20a%20confidential%20consultation%20at%20Dr.%20Maratha%20Clinic.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white font-semibold rounded-full text-base hover:bg-[#1DA851] transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-[#25D366]/20"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp — 9410949406
              </a>
            </div>
          </AnimatedSection>
        </div>

        {/* Footer */}
        <footer className="bg-bark text-white/70">
          <div className="container py-12 md:py-16">
            <div className="grid md:grid-cols-3 gap-10">
              {/* Brand */}
              <div>
                <img src={LOGO} alt="Dr. Maratha Clinic" className="h-12 w-auto mb-4" />
                <p className="text-sm leading-relaxed text-white/50">
                  India's trusted clinic for 100% natural Ayurvedic treatment of
                  Gupt Rog and sexual health issues. Serving Haridwar, Moradabad,
                  Haldwani, Meerut, Ghaziabad and nearby areas — plus 18+ cities
                  online.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold text-white text-sm mb-4 tracking-wider uppercase">
                  Quick Links
                </h4>
                <ul className="space-y-2">
                  {[
                    { label: "Our Story", target: "about" },
                    { label: "Treatments", target: "conditions" },
                    { label: "Patient Stories", target: "testimonials" },
                    { label: "Book Consultation", target: "contact" },
                  ].map((link, i) => (
                    <li key={i}>
                      <button
                        onClick={() => scrollTo(link.target)}
                        className="text-white/50 text-sm hover:text-gold transition-colors"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-semibold text-white text-sm mb-4 tracking-wider uppercase">
                  Contact
                </h4>
                <ul className="space-y-3 text-sm text-white/50">
                  <li className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <div>
                      <a href="tel:9410949406" className="hover:text-white transition-colors">9410949406</a>
                      <span className="text-white/30 ml-1">(General)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <div>
                      <a href="tel:9917554821" className="hover:text-white transition-colors">9917554821</a>
                      <span className="text-white/30 ml-1">(Haridwar/Moradabad)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <div>
                      <a href="tel:9557986727" className="hover:text-white transition-colors">9557986727</a>
                      <span className="text-white/30 ml-1">(Haldwani)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Mon–Sat: 10 AM – 7 PM
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Sunday: Closed
                  </li>
                </ul>
              </div>
            </div>

            {/* Confidentiality Statement */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex items-start gap-3 max-w-3xl">
                <Shield className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <p className="text-xs text-white/40 leading-relaxed">
                  <strong className="text-white/60">Confidentiality Statement:</strong>{" "}
                  All patient information, consultation records, and treatment details
                  are strictly confidential and protected under medical privacy
                  regulations. Dr. Maratha Clinic does not share any patient data
                  with third parties. By using this website or booking a consultation,
                  you agree to our privacy policy. This website does not replace
                  professional medical advice — please consult a healthcare provider
                  for any medical concerns.
                </p>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-8 text-center text-xs text-white/30">
              © 2026 Dr. Maratha Clinic. All rights reserved.
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}
