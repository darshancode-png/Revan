/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Menu, X, ArrowRight, Sparkles, MessageSquare, Users, 
  Target, Calendar, CheckCircle2, ShieldCheck, Layers, 
  Send, Compass, Award, Lightbulb, Upload, Check, Image as ImageIcon, ExternalLink,
  Zap, Activity, ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Configuration variable for remote response collection
const GOOGLE_FORM_URL = "https://forms.gle/EQ541SagmBDVja3XA";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Student Voice State
  const [submittedMessage, setSubmittedMessage] = useState(false);

  // Candidate Photo State:
  // 1. Checks user local upload if available
  // 2. Otherwise defaults to bundled production candidate image
  const [heroImage, setHeroImage] = useState<string | null>(() => {
    try {
      return localStorage.getItem('pixel_hero_img');
    } catch {
      return null;
    }
  });

  const [imageSrc, setImageSrc] = useState<string>(() => {
    try {
      const local = localStorage.getItem('pixel_hero_img');
      if (local) return local;
    } catch {
      // ignore
    }
    return "/candidate.jpg";
  });

  // Deterministic, memoized particle generation
  const particles: Particle[] = useMemo(() => 
    Array.from({ length: 32 }, (_, i) => ({
      id: i,
      x: (i * 37) % 100,
      y: (i * 61) % 100,
      size: (i % 3) + 1.5,
      duration: (i % 6) + 7,
      delay: (i % 4) * 0.8
    })), []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setHeroImage(result);
        setImageSrc(result);
        try {
          localStorage.setItem('pixel_hero_img', result);
        } catch (err) {
          console.error(err);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmitClick = () => {
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
    }, 8000);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#071426] text-white font-sans selection:bg-[#0869E8] selection:text-white relative overflow-x-hidden">
      
      {/* Dynamic Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft Ambient Radial Lights */}
        <div className="absolute top-[-15%] left-[15%] w-[700px] h-[700px] bg-gradient-to-br from-[#0869E8]/20 via-[#0869E8]/5 to-transparent rounded-full blur-[140px]" />
        <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-bl from-[#0869E8]/15 via-[#0869E8]/5 to-transparent rounded-full blur-[160px]" />
        <div className="absolute bottom-[5%] left-[10%] w-[550px] h-[550px] bg-[#0869E8]/10 rounded-full blur-[150px]" />
        
        {/* Subtle Interactive Particle Glows */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: `${p.x}vw`, y: `${p.y}vh`, opacity: 0.15 }}
            animate={{ 
              y: [`${p.y}vh`, `${(p.y + 18) % 100}vh`, `${p.y}vh`],
              x: [`${p.x}vw`, `${(p.x + 8) % 100}vw`, `${p.x}vw`],
              opacity: [0.15, 0.55, 0.15],
              scale: [1, 1.25, 1]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay
            }}
            style={{
              width: p.size,
              height: p.size,
            }}
            className="absolute rounded-full bg-[#0869E8] shadow-[0_0_12px_#0869E8]"
          />
        ))}

        {/* High-Tech Blueprint Grid Texture */}
        <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* =================================================== */}
      {/* 1. PREMIUM GLASS NAVBAR                             */}
      {/* =================================================== */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#071426]/90 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl shadow-black/50' 
          : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between w-full">
          <div className="hidden lg:flex items-center gap-8 text-xs font-semibold tracking-wider text-white/75">
            <button onClick={() => scrollToSection('home')} className="hover:text-white transition-colors cursor-pointer">HOME</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors cursor-pointer">ABOUT</button>
            <button onClick={() => scrollToSection('process')} className="hover:text-white transition-colors cursor-pointer">ROADMAP</button>
            <button onClick={() => scrollToSection('vision')} className="hover:text-white transition-colors cursor-pointer">VISION</button>
            <button onClick={() => scrollToSection('voice')} className="hover:text-white transition-colors cursor-pointer">STUDENT VOICE</button>
          </div>

          <div className="hidden md:flex items-center gap-4 ml-auto">
            <a 
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleFormSubmitClick}
              className="relative px-5 py-2.5 rounded-full bg-gradient-to-r from-[#0869E8] to-[#0650b3] hover:from-[#0973ff] hover:to-[#0869E8] text-white text-xs font-bold tracking-wider shadow-lg shadow-[#0869E8]/35 transition-all flex items-center gap-2 group hover:shadow-xl hover:shadow-[#0869E8]/50 cursor-pointer"
            >
              <span>SHARE YOUR INPUT</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-white backdrop-blur-md ml-auto cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#071426]/98 backdrop-blur-2xl border-b border-white/10 px-6 py-6 flex flex-col gap-4 text-sm font-semibold shadow-2xl"
            >
              <button onClick={() => scrollToSection('home')} className="text-left py-2 border-b border-white/5 hover:text-[#0869E8] cursor-pointer">HOME</button>
              <button onClick={() => scrollToSection('about')} className="text-left py-2 border-b border-white/5 hover:text-[#0869E8] cursor-pointer">ABOUT</button>
              <button onClick={() => scrollToSection('process')} className="text-left py-2 border-b border-white/5 hover:text-[#0869E8] cursor-pointer">ROADMAP</button>
              <button onClick={() => scrollToSection('vision')} className="text-left py-2 border-b border-white/5 hover:text-[#0869E8] cursor-pointer">VISION</button>
              <button onClick={() => scrollToSection('voice')} className="text-left py-2 hover:text-[#0869E8] cursor-pointer">STUDENT VOICE</button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* =================================================== */}
      {/* 2. HERO — CINEMATIC IMPACT                         */}
      {/* =================================================== */}
      <section id="home" className="relative min-h-screen flex items-center pt-32 pb-24 px-6 md:px-12 z-10">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Live Campaign Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.05] border border-white/15 text-xs font-bold tracking-widest text-[#EAF3FF] mb-8 backdrop-blur-xl shadow-[0_8px_25px_rgba(8,105,232,0.25)] hover:border-[#0869E8]/50 transition-colors">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0869E8] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0869E8]" />
              </span>
              <span>PIXEL 2K26 • CSE ELECTION 2026</span>
            </div>

            {/* Dominant Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.92] text-white mb-6 drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
              REVAN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0869E8] via-[#529bff] to-[#EAF3FF] drop-shadow-[0_0_40px_rgba(8,105,232,0.4)]">
                SIDDHESHWAR
              </span>
            </h1>

            {/* Subheading Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#0869E8]/10 border border-[#0869E8]/30 mb-8">
              <span className="text-xs sm:text-sm md:text-base font-bold tracking-widest text-[#EAF3FF] uppercase">
                CSE Department <span className="text-[#0869E8] font-black">President Candidate</span>
              </span>
            </div>

            {/* Simple Quote / Manifesto (No box) */}
            <div className="mb-10 max-w-xl">
              <p className="text-xl md:text-2xl lg:text-3xl font-light italic text-white/95 tracking-wide leading-relaxed">
                &ldquo;Listen. Plan. Coordinate. Execute. Represent.&rdquo;
              </p>
              <p className="mt-2 text-xs font-mono tracking-widest text-[#0869E8] uppercase font-bold">
                Official Leadership Manifesto
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <motion.button 
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection('vision')}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#0869E8] to-[#0756c4] hover:from-[#0a78ff] hover:to-[#0869E8] text-white font-bold text-sm tracking-wider shadow-[0_15px_35px_rgba(8,105,232,0.4)] transition-all flex items-center gap-3 group cursor-pointer"
              >
                <span>EXPLORE VISION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </motion.button>

              <motion.a 
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleFormSubmitClick}
                className="px-8 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white font-bold text-sm tracking-wider border border-white/20 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all flex items-center gap-2 hover:border-[#0869E8]/50 cursor-pointer"
              >
                <span>SHARE YOUR INPUT</span>
                <ExternalLink className="w-4 h-4 text-[#0869E8]" />
              </motion.a>
            </div>
          </motion.div>

          {/* Right Clean, Flat, Premium Candidate Image Container with Sophisticated Pink/Rose Accent */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            {/* Subtle light/dark pink accent glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/15 via-rose-400/10 to-transparent rounded-2xl blur-2xl -z-10" />
            
            <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden border border-pink-500/30 bg-[#071426] flex flex-col items-center justify-center group/card shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              <img 
                src={imageSrc} 
                alt="Revan Siddheshwar Candidate Portrait" 
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover/card:scale-105"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.endsWith('/candidate.svg')) {
                    setImageSrc('/candidate.svg');
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071426]/90 via-transparent to-transparent opacity-85 pointer-events-none" />
              
              {/* Official Candidate Badge Overlay */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#071426]/90 backdrop-blur-md border border-pink-500/25 pointer-events-none">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white text-base tracking-wide">Revan Siddheshwar</h3>
                    <p className="text-[11px] text-pink-300 font-semibold tracking-wider mt-0.5">PIXEL 2K26 • CSE PRESIDENT CANDIDATE</p>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                </div>
              </div>

              {/* Discreet Photo Selector for Owner */}
              <label 
                className="absolute top-4 right-4 p-2.5 rounded-xl bg-[#071426]/80 hover:bg-pink-600/90 text-white/70 hover:text-white border border-white/10 hover:border-pink-500/50 backdrop-blur-xl shadow-lg transition-all cursor-pointer opacity-0 group-hover/card:opacity-100 focus-within:opacity-100"
                title="Change or test photo locally"
              >
                <Upload className="w-4 h-4" />
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
          </motion.div>

        </div>
      </section>

      {/* =================================================== */}
      {/* 3. INTRODUCTION SECTION — PHILOSOPHY                */}
      {/* =================================================== */}
      <section id="about" className="py-24 px-6 md:px-12 border-t border-white/10 relative z-10 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0869E8]/10 border border-[#0869E8]/30 text-[11px] font-bold tracking-widest text-[#0869E8] uppercase mb-6">
              <Zap className="w-3.5 h-3.5" />
              <span>CORE PHILOSOPHY</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-8 leading-tight">
              &ldquo;LEADERSHIP IS NOT ONLY ABOUT IDEAS.&rdquo;
            </h2>

            <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 backdrop-blur-md shadow-2xl relative">
              <p className="text-lg md:text-xl text-[#EAF3FF]/90 font-normal leading-relaxed mb-8">
                Technical skills, academics and hackathons matter.<br />
                Great events also require planning, communication, coordination, teamwork and execution.
              </p>

              {/* 4 Feature highlight chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10">
                {[
                  { label: "Technical Acumen", icon: Activity },
                  { label: "Strategic Planning", icon: Calendar },
                  { label: "Active Coordination", icon: Users },
                  { label: "Accountable Execution", icon: ShieldCheck }
                ].map((chip, idx) => {
                  const Icon = chip.icon;
                  return (
                    <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center gap-2 text-xs font-semibold text-[#EAF3FF]/85">
                      <Icon className="w-3.5 h-3.5 text-[#0869E8]" />
                      <span>{chip.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* =================================================== */}
      {/* 4. FROM IDEA TO EXECUTION (01–04 PROCESS CARDS)    */}
      {/* =================================================== */}
      <section id="process" className="py-24 px-6 md:px-12 relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0869E8]/10 border border-[#0869E8]/30 text-[11px] font-bold tracking-widest text-[#0869E8] uppercase mb-4">
              <span>THE 4-STEP ROADMAP</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white">
              FROM IDEA TO EXECUTION
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                num: '01', 
                title: 'IDEA', 
                desc: '“Listen to student needs, suggestions and expectations before shaping the event.”' 
              },
              { 
                num: '02', 
                title: 'PLAN', 
                desc: '“Turn student input into clear priorities, timelines and practical event plans.”' 
              },
              { 
                num: '03', 
                title: 'COORDINATE', 
                desc: '“Work closely with student teams, volunteers and faculty to keep everyone connected.”' 
              },
              { 
                num: '04', 
                title: 'EXECUTE', 
                desc: '“Deliver well-organized events with clear communication, participation and accountability.”' 
              }
            ].map((step, idx) => (
              <div
                key={idx}
                className="group relative p-7 rounded-3xl bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] border border-white/15 backdrop-blur-xl hover:border-[#0869E8]/60 hover:bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),0_15px_35px_rgba(0,0,0,0.3)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_20px_40px_rgba(8,105,232,0.18)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Refined gradient border line on top */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#0869E8] to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />
                {/* Subtle glass glow orb in background of card */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#0869E8]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#0869E8]/20 transition-colors" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl font-black text-[#0869E8] font-mono">{step.num}</span>
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/60 group-hover:border-[#0869E8]/30 transition-colors">
                      Phase {step.num}
                    </span>
                  </div>
                  <h4 className="text-xl font-extrabold text-white mb-3 tracking-wide group-hover:text-[#529bff] transition-colors">{step.title}</h4>
                  <p className="text-xs text-[#EAF3FF]/80 leading-relaxed font-light">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =================================================== */}
      {/* 5. WHAT STUDENTS SHOULD EXPECT (5 PILLARS)         */}
      {/* =================================================== */}
      <section id="vision" className="py-24 px-6 md:px-12 border-t border-white/10 relative z-10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0869E8]/10 border border-[#0869E8]/30 text-[11px] font-bold tracking-widest text-[#0869E8] uppercase mb-4">
              <span>CANDIDATE PLEDGE &amp; PILLARS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white">
              WHAT STUDENTS SHOULD EXPECT
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                num: '01',
                icon: Calendar,
                title: 'BETTER PLANNING', 
                desc: 'More structured preparation and coordination for CSE activities.' 
              },
              { 
                num: '02',
                icon: Users,
                title: 'STUDENT PARTICIPATION', 
                desc: 'Create more opportunities for students from different batches and groups to participate.' 
              },
              { 
                num: '03',
                icon: MessageSquare,
                title: 'CLEAR COMMUNICATION', 
                desc: 'Make information and updates easier to understand and access.' 
              },
              { 
                num: '04',
                icon: Lightbulb,
                title: 'NEW IDEAS', 
                desc: 'Encourage fresh ideas for technical, cultural and student activities.' 
              },
              { 
                num: '05',
                icon: CheckCircle2,
                title: 'FEEDBACK & FOLLOW-UP', 
                desc: 'Listen to genuine student concerns and follow up on them.' 
              }
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5, scale: 1.015 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="group relative p-8 rounded-3xl bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] border border-white/15 backdrop-blur-xl hover:border-[#0869E8]/60 hover:bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),0_20px_40px_rgba(0,0,0,0.35)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_25px_50px_rgba(8,105,232,0.2)] transition-all duration-300 overflow-hidden"
                >
                  {/* Refined gradient border line on top */}
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#0869E8] to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />
                  {/* Subtle glass glow orb in background */}
                  <div className="absolute -top-14 -right-14 w-32 h-32 bg-[#0869E8]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#0869E8]/25 transition-colors" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-2xl font-black text-[#0869E8] font-mono">{card.num}</span>
                      <div className="w-10 h-10 rounded-xl bg-[#0869E8]/15 border border-[#0869E8]/35 flex items-center justify-center text-[#0869E8] group-hover:scale-105 group-hover:bg-[#0869E8] group-hover:text-white transition-all shadow-md shadow-[#0869E8]/20">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3 tracking-wide group-hover:text-[#529bff] transition-colors">{card.title}</h4>
                    <p className="text-sm text-[#EAF3FF]/80 leading-relaxed font-light">{card.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =================================================== */}
      {/* 6. YOUR VOICE MATTERS (GOOGLE FORM BACKEND)        */}
      {/* =================================================== */}
      <section id="voice" className="py-24 px-6 md:px-12 border-t border-white/10 relative z-10 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto text-center">
          
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0869E8]/10 border border-[#0869E8]/30 text-[11px] font-bold tracking-widest text-[#0869E8] uppercase mb-4">
              <span>OPEN DIALOGUE</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6">
              YOUR VOICE MATTERS
            </h2>
            <p className="text-base md:text-lg text-[#EAF3FF]/80 max-w-2xl mx-auto leading-relaxed">
              Share your semester, specific responses, core presidential values (Fairness, Communication, Coordination, Participation, Execution), and suggestions directly with Revan via our secure Google Form.
            </p>
          </div>

          <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-b from-white/[0.05] via-white/[0.02] to-transparent border border-white/15 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0869E8] to-transparent opacity-80" />
            
            {submittedMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-6 rounded-2xl bg-[#0869E8]/20 border border-[#0869E8]/50 text-white flex items-center justify-center gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-[#0869E8] flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-base">Thank you. Your input has been received.</h4>
                  <p className="text-xs text-[#EAF3FF]/90">The Google Form has opened in a new tab.</p>
                </div>
              </motion.div>
            )}

            <div className="space-y-6 max-w-xl mx-auto">
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-left space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-xs text-[#0869E8] uppercase tracking-wider">What the Google Form collects:</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Live Channel
                  </span>
                </div>
                <ul className="text-xs text-[#EAF3FF]/85 space-y-2.5">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0869E8]" />
                    <span><strong>Semester:</strong> 3rd Sem | 5th Sem | 7th Sem</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0869E8]" />
                    <span><strong>Semester-specific response</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0869E8]" />
                    <span><strong>What should your President stand for?:</strong> Fairness | Communication | Coordination | Participation | Execution</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0869E8]" />
                    <span><strong>Additional suggestion</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0869E8]" />
                    <span><strong>Optional name &amp; Anonymous submission option</strong></span>
                  </li>
                </ul>
              </div>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleFormSubmitClick}
                className="w-full py-5 rounded-2xl bg-gradient-to-r from-[#0869E8] via-[#0973ff] to-[#0756c4] hover:shadow-[0_15px_40px_rgba(8,105,232,0.5)] text-white font-black text-sm tracking-widest shadow-2xl shadow-[#0869E8]/40 transition-all flex items-center justify-center gap-3 group cursor-pointer"
              >
                <span>SUBMIT YOUR INPUT →</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.a>
              
              <p className="text-[11px] text-white/50">
                Direct to candidate • 100% confidential or named • Takes under 60 seconds
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =================================================== */}
      {/* 7. FINAL SECTION — CALL TO ACTION                   */}
      {/* =================================================== */}
      <section className="py-28 px-6 md:px-12 bg-gradient-to-b from-[#071426] to-[#040c17] border-t border-white/10 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white mb-10 leading-tight">
            YOUR IDEAS. <br />
            YOUR VOICE. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0869E8] via-[#529bff] to-[#EAF3FF]">
              YOUR CSE.
            </span>
          </h2>

          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleFormSubmitClick}
            className="px-10 py-5 rounded-full bg-gradient-to-r from-[#0869E8] to-[#0756c4] text-white font-bold text-sm tracking-widest shadow-2xl shadow-[#0869E8]/40 hover:shadow-[0_15px_45px_rgba(8,105,232,0.55)] transition-all inline-flex items-center gap-3 group cursor-pointer"
          >
            <span>SUBMIT YOUR INPUT →</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </motion.a>

        </div>
      </section>

      {/* =================================================== */}
      {/* 8. FOOTER                                          */}
      {/* =================================================== */}
      <footer className="py-12 px-6 border-t border-white/10 relative z-10 text-center bg-[#040c17]">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <p className="text-base md:text-lg font-bold text-[#0869E8] tracking-wider">
            Designed by Darshan
          </p>
        </div>
      </footer>

      {/* Discreet Floating Back-to-Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            transition={{ duration: 0.25 }}
            onClick={scrollToTop}
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#071426]/85 backdrop-blur-xl border border-white/15 text-white/70 hover:text-white hover:border-[#0869E8]/60 hover:bg-[#0869E8]/15 shadow-xl shadow-black/50 transition-all duration-300 group cursor-pointer"
          >
            <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
