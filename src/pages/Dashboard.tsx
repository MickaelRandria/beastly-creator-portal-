import React, { useState } from 'react';
import eventsData from '../data/events.json';
import contentsData from '../data/contents.json';
import creatorsData from '../data/creators.json';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Calendar, CheckCircle2, Upload, ChevronRight, BarChart3, ArrowUpRight, MapPin, FileText, UploadCloud, BrainCircuit, Loader2, Sparkles, Users, TrendingUp, ExternalLink, Zap, PenLine, Plus, Trash2 } from 'lucide-react';
import { GlowLightning, GlowEye, GlowArrow, BeastlyEye, BeastlySmiley, BeastlyDocument } from '../components/BeastlyIcons';
import AnimatedCounter from '../components/AnimatedCounter';
import { Brief } from '../types';

interface DashboardProps {
  onNavigate: (tab: string) => void;
  activeBrief: Brief | null;
  setActiveBrief: (brief: Brief | null) => void;
}

const engagementData = [
  { v: 1200 }, { v: 1800 }, { v: 1400 }, { v: 2200 }, { v: 2800 }, { v: 2400 }, { v: 3100 },
];

export default function Dashboard({ onNavigate, activeBrief, setActiveBrief }: DashboardProps) {
  const [agentState, setAgentState] = useState<'idle' | 'uploading' | 'extracting' | 'complete'>('idle');
  const [briefMode, setBriefMode] = useState<'pdf' | 'manual'>('pdf');
  const [manualForm, setManualForm] = useState({
    brand: '', campaignName: '', niche: '', dates: '',
    targetReach: '', targetEMV: '', budget: '',
  });
  const [deliverables, setDeliverables] = useState<string[]>(['']);

  const handleUpload = () => {
    setAgentState('uploading');
    setTimeout(() => {
      setAgentState('extracting');
      setTimeout(() => {
        setAgentState('complete');
        setActiveBrief({
          brand: 'FuzeTea',
          campaignName: 'Solidays x FuzeTea Passion',
          targetReach: 420000,
          targetEMV: 8000,
          budget: 22000,
          niche: 'Festival / Lifestyle',
          dates: '26 Juin - 28 Juin 2026',
          deliverables: ['1× Vidéo in-feed (TikTok ou Reels)', '3-5× Stories sur place', '#FuzeTeaPassion @FuzeTea']
        });
        setTimeout(() => setAgentState('idle'), 2000);
      }, 3000);
    }, 1500);
  };

  const handleManualSubmit = () => {
    if (!manualForm.brand || !manualForm.campaignName) return;
    setActiveBrief({
      brand: manualForm.brand,
      campaignName: manualForm.campaignName,
      niche: manualForm.niche || 'Non défini',
      dates: manualForm.dates || 'À définir',
      targetReach: parseInt(manualForm.targetReach) || 0,
      targetEMV: parseInt(manualForm.targetEMV) || 0,
      budget: parseInt(manualForm.budget) || 0,
      deliverables: deliverables.filter(d => d.trim() !== ''),
    });
  };
  const events = eventsData;
  const contents = contentsData;

  const activeEvents = events.filter(e => e.status === 'Active');
  const totalConfirmed = events.reduce((a, e) => a + e.confirmedCount, 0);
  const pendingContents = contents.filter(c => c.status === 'Pending').length;
  const nextEvent = events.find(e => e.status === 'Active' || e.status === 'Upcoming');

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-min">

      {/* KPI Cards */}
      <div className="md:col-span-4 p-7 bg-beastly-beige rounded-2xl flex flex-col justify-between min-h-[180px] relative overflow-hidden group cursor-pointer" onClick={() => onNavigate('events')}>
        <div className="flex items-center justify-between">
          <BeastlyEye size={40} bg="green" />
          <span className="text-[11px] font-extrabold text-beastly-dark/40 uppercase tracking-[0.15em]">En cours</span>
        </div>
        <div className="mt-auto relative z-10">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-beastly-dark/40 mb-1">Événements actifs</p>
          <p className="text-5xl font-black text-beastly-dark"><AnimatedCounter value={activeEvents.length} duration={1000} /></p>
        </div>
        <GlowLightning className="absolute -right-4 -bottom-4 opacity-15 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none" size={100} color="#b4ff00" />
      </div>

      <div className="md:col-span-4 p-7 bg-beastly-beige rounded-2xl flex flex-col justify-between min-h-[180px] relative overflow-hidden group cursor-pointer" onClick={() => onNavigate('creators')}>
        <div className="flex items-center justify-between">
          <BeastlySmiley size={40} bg="orange" />
          <span className="text-[11px] font-extrabold text-beastly-dark/40 uppercase tracking-[0.15em]">{creatorsData.length} dans la BDD</span>
        </div>
        <div className="mt-auto relative z-10">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-beastly-dark/40 mb-1">Créateurs confirmés</p>
          <p className="text-5xl font-black text-beastly-orange"><AnimatedCounter value={totalConfirmed} duration={1500} /></p>
        </div>
        <GlowEye className="absolute -right-4 -bottom-6 opacity-15 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none" size={100} color="#fc846d" />
      </div>

      <div className="md:col-span-4 p-7 bg-beastly-beige rounded-2xl flex flex-col justify-between min-h-[180px] relative overflow-hidden group cursor-pointer" onClick={() => onNavigate('contents')}>
        <div className="flex items-center justify-between relative z-10">
          <BeastlyDocument size={40} bg="green" />
          <button className="w-9 h-9 bg-beastly-dark/10 rounded-full flex items-center justify-center hover:bg-beastly-dark/20 transition-colors">
            <ArrowUpRight size={16} className="text-beastly-dark" />
          </button>
        </div>
        <div className="mt-auto relative z-10">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-beastly-dark/40 mb-1">Contenus en attente</p>
          <p className="text-5xl font-black text-beastly-green"><AnimatedCounter value={pendingContents} duration={1800} /></p>
        </div>
        <GlowLightning className="absolute -right-4 -bottom-4 opacity-15 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none" size={100} color="#b4ff00" />
      </div>

{/* Agent 0: Master Brief */}
      {!activeBrief && (
        <div className="md:col-span-12 bg-beastly-dark/80 backdrop-blur-xl border border-beastly-green/20 rounded-3xl relative overflow-hidden">
          <GlowLightning className="absolute -left-10 -top-10 opacity-20 pointer-events-none" size={200} color="#b4ff00" />

          {/* Mode toggle header */}
          {agentState === 'idle' && (
            <div className="flex items-center gap-1 p-3 border-b border-beastly-beige/10 relative z-10">
              <button
                onClick={() => setBriefMode('pdf')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${briefMode === 'pdf' ? 'bg-beastly-green text-beastly-dark' : 'text-beastly-beige/40 hover:text-beastly-beige hover:bg-beastly-beige/5'}`}
              >
                <UploadCloud size={13} /> Déposer un PDF
              </button>
              <button
                onClick={() => setBriefMode('manual')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${briefMode === 'manual' ? 'bg-beastly-green text-beastly-dark' : 'text-beastly-beige/40 hover:text-beastly-beige hover:bg-beastly-beige/5'}`}
              >
                <PenLine size={13} /> Saisir manuellement
              </button>
            </div>
          )}

          <div className="p-8">
            {/* PDF mode */}
            {agentState === 'idle' && briefMode === 'pdf' && (
              <div
                className="flex flex-col items-center justify-center border-2 border-dashed border-beastly-beige/10 hover:border-beastly-green/30 rounded-2xl p-10 cursor-pointer transition-colors relative z-10 bg-beastly-dark/50"
                onClick={handleUpload}
              >
                <div className="w-16 h-16 bg-beastly-green/10 rounded-full flex items-center justify-center mb-4">
                  <UploadCloud size={32} className="text-beastly-green" />
                </div>
                <h3 className="text-xl font-black text-beastly-beige">Glissez-déposez le Brief Marque (PDF)</h3>
                <p className="text-sm font-bold text-beastly-beige/40 mt-2 text-center max-w-lg leading-relaxed">Notre IA analyse ton brief pour extraire les objectifs, le budget et les livrables de la campagne — en quelques secondes.</p>
              </div>
            )}

            {/* Manual mode */}
            {agentState === 'idle' && briefMode === 'manual' && (
              <div className="relative z-10 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Marque */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-beastly-beige/40">Marque *</label>
                    <input
                      type="text"
                      placeholder="ex: FuzeTea"
                      value={manualForm.brand}
                      onChange={e => setManualForm(f => ({ ...f, brand: e.target.value }))}
                      className="w-full px-4 py-3 bg-beastly-dark border border-beastly-beige/10 rounded-xl text-sm font-bold text-beastly-beige placeholder:text-beastly-beige/20 focus:outline-none focus:border-beastly-green/40 transition-colors"
                    />
                  </div>
                  {/* Nom campagne */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-beastly-beige/40">Nom de la campagne *</label>
                    <input
                      type="text"
                      placeholder="ex: Solidays x FuzeTea Passion"
                      value={manualForm.campaignName}
                      onChange={e => setManualForm(f => ({ ...f, campaignName: e.target.value }))}
                      className="w-full px-4 py-3 bg-beastly-dark border border-beastly-beige/10 rounded-xl text-sm font-bold text-beastly-beige placeholder:text-beastly-beige/20 focus:outline-none focus:border-beastly-green/40 transition-colors"
                    />
                  </div>
                  {/* Niche */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-beastly-beige/40">Niche / Univers</label>
                    <input
                      type="text"
                      placeholder="ex: Festival / Lifestyle"
                      value={manualForm.niche}
                      onChange={e => setManualForm(f => ({ ...f, niche: e.target.value }))}
                      className="w-full px-4 py-3 bg-beastly-dark border border-beastly-beige/10 rounded-xl text-sm font-bold text-beastly-beige placeholder:text-beastly-beige/20 focus:outline-none focus:border-beastly-green/40 transition-colors"
                    />
                  </div>
                  {/* Dates */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-beastly-beige/40">Dates</label>
                    <input
                      type="text"
                      placeholder="ex: 26 Juin - 28 Juin 2026"
                      value={manualForm.dates}
                      onChange={e => setManualForm(f => ({ ...f, dates: e.target.value }))}
                      className="w-full px-4 py-3 bg-beastly-dark border border-beastly-beige/10 rounded-xl text-sm font-bold text-beastly-beige placeholder:text-beastly-beige/20 focus:outline-none focus:border-beastly-green/40 transition-colors"
                    />
                  </div>
                  {/* Target Reach */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-beastly-beige/40">Target Reach (vues)</label>
                    <input
                      type="number"
                      placeholder="ex: 420000"
                      value={manualForm.targetReach}
                      onChange={e => setManualForm(f => ({ ...f, targetReach: e.target.value }))}
                      className="w-full px-4 py-3 bg-beastly-dark border border-beastly-beige/10 rounded-xl text-sm font-bold text-beastly-beige placeholder:text-beastly-beige/20 focus:outline-none focus:border-beastly-green/40 transition-colors"
                    />
                  </div>
                  {/* Budget */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-beastly-beige/40">Budget OPS (€)</label>
                    <input
                      type="number"
                      placeholder="ex: 22000"
                      value={manualForm.budget}
                      onChange={e => setManualForm(f => ({ ...f, budget: e.target.value }))}
                      className="w-full px-4 py-3 bg-beastly-dark border border-beastly-beige/10 rounded-xl text-sm font-bold text-beastly-beige placeholder:text-beastly-beige/20 focus:outline-none focus:border-beastly-green/40 transition-colors"
                    />
                  </div>
                </div>

                {/* Livrables */}
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold uppercase tracking-widest text-beastly-beige/40">Livrables attendus</label>
                  {deliverables.map((d, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder={`Livrable ${i + 1} — ex: 1× Vidéo in-feed TikTok`}
                        value={d}
                        onChange={e => {
                          const next = [...deliverables];
                          next[i] = e.target.value;
                          setDeliverables(next);
                        }}
                        className="flex-1 px-4 py-3 bg-beastly-dark border border-beastly-beige/10 rounded-xl text-sm font-bold text-beastly-beige placeholder:text-beastly-beige/20 focus:outline-none focus:border-beastly-green/40 transition-colors"
                      />
                      {deliverables.length > 1 && (
                        <button
                          onClick={() => setDeliverables(deliverables.filter((_, j) => j !== i))}
                          className="p-2.5 rounded-xl bg-beastly-dark border border-beastly-beige/10 text-beastly-beige/30 hover:text-beastly-orange hover:border-beastly-orange/30 transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => setDeliverables([...deliverables, ''])}
                    className="flex items-center gap-2 text-xs font-extrabold text-beastly-beige/30 hover:text-beastly-green transition-colors mt-1"
                  >
                    <Plus size={13} /> Ajouter un livrable
                  </button>
                </div>

                <button
                  onClick={handleManualSubmit}
                  disabled={!manualForm.brand || !manualForm.campaignName}
                  className="w-full py-4 bg-beastly-green text-beastly-dark rounded-2xl text-sm font-extrabold uppercase tracking-wider hover:brightness-110 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={16} /> Valider le brief
                </button>
              </div>
            )}

            {agentState === 'uploading' && (
              <div className="flex flex-col items-center justify-center py-12 space-y-4 relative z-10">
                <UploadCloud size={48} className="text-beastly-beige/30 animate-bounce" />
                <p className="text-sm font-extrabold uppercase tracking-widest text-beastly-beige/60">Chargement du document...</p>
              </div>
            )}

            {agentState === 'extracting' && (
              <div className="flex flex-col items-center justify-center py-10 space-y-6 max-w-lg mx-auto relative z-10">
                <div className="flex items-center gap-4 text-beastly-green">
                  <BrainCircuit size={36} className="animate-pulse" />
                  <h3 className="text-xl font-black uppercase tracking-wider">Lecture du brief en cours</h3>
                </div>
                <div className="w-full space-y-3">
                  <div className="flex justify-between text-[10px] font-extrabold uppercase tracking-wider text-beastly-beige/40">
                    <span>Identification des objectifs...</span>
                    <span className="text-beastly-green animate-pulse">Extraction des données clés...</span>
                  </div>
                  <div className="w-full h-2 bg-beastly-dark/80 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full bg-linear-to-r from-beastly-green/50 to-beastly-green w-2/3 rounded-full animate-pulse relative">
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {agentState === 'complete' && (
              <div className="flex flex-col items-center justify-center py-10 space-y-4 relative z-10">
                <div className="w-20 h-20 bg-beastly-green/20 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(202,240,65,0.2)]">
                  <CheckCircle2 size={40} className="text-beastly-green" />
                </div>
                <h3 className="text-2xl font-black text-beastly-green">Brief analysé !</h3>
                <p className="text-sm font-bold text-beastly-beige/60">Toutes les infos clés ont été capturées. Le casting peut démarrer.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Active Brief Summary (When Uploaded) */}
      {activeBrief && (() => {
        const AVG_FOLLOWERS = 28000;
        const confirmed = Math.max(3, Math.ceil(activeBrief.targetReach / AVG_FOLLOWERS));
        const toContact  = Math.ceil(confirmed * 4.5);
        const budgetPer  = activeBrief.budget > 0 ? Math.round(activeBrief.budget / confirmed) : 0;
        const reachPer   = Math.round(activeBrief.targetReach / confirmed);
        return (
          <>
            <div className="md:col-span-12 bg-linear-to-r from-beastly-dark to-beastly-green/5 border border-beastly-green/30 rounded-3xl relative overflow-hidden shadow-[0_0_40px_rgba(202,240,65,0.05)]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-beastly-green/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

              {/* Top row: identity + KPIs + CTA */}
              <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center justify-between relative z-10">
                <div className="flex items-center gap-5 w-full md:w-auto shrink-0">
                  <div className="p-4 bg-linear-to-br from-beastly-green to-[#90cc00] rounded-2xl shadow-lg">
                    <FileText size={32} className="text-beastly-dark" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-beastly-green mb-1 flex items-center gap-1.5"><Sparkles size={10} /> Active Brief Master</p>
                    <h2 className="text-2xl font-black text-beastly-beige leading-none mb-2">{activeBrief.campaignName}</h2>
                    <p className="text-sm font-bold text-beastly-beige/50 bg-beastly-dark/50 inline-block px-3 py-1 rounded-full border border-white/5">{activeBrief.brand} • {activeBrief.niche}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full lg:w-auto flex-1">
                  <div className="bg-beastly-dark/80 p-4 rounded-2xl border border-white/5 backdrop-blur-xl">
                    <p className="text-[9px] uppercase font-black tracking-widest text-beastly-beige/40 mb-1 flex items-center gap-1.5"><Users size={12} /> Target Reach</p>
                    <p className="text-xl font-black text-beastly-green">{activeBrief.targetReach.toLocaleString('fr-FR')} <span className="text-sm text-beastly-green/50">vues</span></p>
                  </div>
                  <div className="bg-beastly-dark/80 p-4 rounded-2xl border border-white/5 backdrop-blur-xl">
                    <p className="text-[9px] uppercase font-black tracking-widest text-beastly-beige/40 mb-1 flex items-center gap-1.5"><TrendingUp size={12} /> Target EMV</p>
                    <p className="text-xl font-black text-beastly-blue">{activeBrief.targetEMV.toLocaleString('fr-FR')}€</p>
                  </div>
                  <div className="bg-beastly-dark/80 p-4 rounded-2xl border border-white/5 backdrop-blur-xl">
                    <p className="text-[9px] uppercase font-black tracking-widest text-beastly-beige/40 mb-1 flex items-center gap-1.5"><Calendar size={12} /> Budget OPS</p>
                    <p className="text-xl font-black text-beastly-beige">{activeBrief.budget.toLocaleString('fr-FR')}€</p>
                  </div>
                  <div className="flex flex-col justify-center h-full">
                    <button onClick={() => onNavigate('creators')} className="w-full h-full py-3 bg-beastly-green text-beastly-dark hover:brightness-110 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all flex justify-center items-center gap-2 group shadow-[0_0_20px_rgba(202,240,65,0.2)]">
                      Lancer le Casting <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Separator */}
              <div className="mx-6 md:mx-8 border-t border-beastly-beige/8 relative z-10" />

              {/* Bottom row: casting objectives */}
              <div className="px-6 md:px-8 py-5 relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <BrainCircuit size={12} className="text-beastly-green" />
                  <p className="text-[9px] font-extrabold uppercase tracking-widest text-beastly-beige/35">Objectifs de casting estimés</p>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* Profils à contacter */}
                  <div className="relative overflow-hidden rounded-2xl border border-beastly-blue/20 bg-beastly-dark/70 p-5">
                    <div className="absolute -top-3 -right-3 w-14 h-14 bg-beastly-blue/10 rounded-full blur-xl" />
                    <p className="text-[9px] font-extrabold uppercase tracking-wider text-beastly-beige/35 mb-2 flex items-center gap-1.5">
                      <Users size={10} className="text-beastly-blue" /> Profils à contacter
                    </p>
                    <p className="text-4xl font-black text-beastly-blue leading-none">{toContact}</p>
                    <p className="text-[9px] font-bold text-beastly-beige/25 mt-2">× 4,5 profils confirmés visés</p>
                  </div>
                  {/* Confirmations */}
                  <div className="relative overflow-hidden rounded-2xl border border-beastly-green/20 bg-beastly-dark/70 p-5">
                    <div className="absolute -top-3 -right-3 w-14 h-14 bg-beastly-green/10 rounded-full blur-xl" />
                    <p className="text-[9px] font-extrabold uppercase tracking-wider text-beastly-beige/35 mb-2 flex items-center gap-1.5">
                      <CheckCircle2 size={10} className="text-beastly-green" /> Confirmations estimées
                    </p>
                    <p className="text-4xl font-black text-beastly-green leading-none">{confirmed}</p>
                    <p className="text-[9px] font-bold text-beastly-beige/25 mt-2">profils nécessaires</p>
                  </div>
                  {/* Budget / créateur */}
                  <div className="relative overflow-hidden rounded-2xl border border-beastly-beige/10 bg-beastly-dark/70 p-5">
                    <div className="absolute -top-3 -right-3 w-14 h-14 bg-beastly-beige/5 rounded-full blur-xl" />
                    <p className="text-[9px] font-extrabold uppercase tracking-wider text-beastly-beige/35 mb-2 flex items-center gap-1.5">
                      <TrendingUp size={10} className="text-beastly-beige/50" /> Budget moy. / créateur
                    </p>
                    <p className="text-4xl font-black text-beastly-beige leading-none">{budgetPer > 0 ? `${budgetPer.toLocaleString('fr-FR')}€` : '—'}</p>
                    <p className="text-[9px] font-bold text-beastly-beige/25 mt-2">sur {activeBrief.budget.toLocaleString('fr-FR')}€ total</p>
                  </div>
                  {/* Reach / profil */}
                  <div className="relative overflow-hidden rounded-2xl border border-beastly-orange/20 bg-beastly-dark/70 p-5">
                    <div className="absolute -top-3 -right-3 w-14 h-14 bg-beastly-orange/10 rounded-full blur-xl" />
                    <p className="text-[9px] font-extrabold uppercase tracking-wider text-beastly-beige/35 mb-2 flex items-center gap-1.5">
                      <Upload size={10} className="text-beastly-orange" /> Reach cible / profil
                    </p>
                    <p className="text-4xl font-black text-beastly-orange leading-none">{reachPer >= 1000 ? `${Math.round(reachPer/1000)}k` : reachPer}</p>
                    <p className="text-[9px] font-bold text-beastly-beige/25 mt-2">vues en moyenne</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })()}

      {/* Events list */}
      <div className="md:col-span-8 p-7 bg-beastly-beige rounded-2xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-7">
          <h2 className="text-2xl font-black text-beastly-dark">Événements actifs</h2>
          <button onClick={() => onNavigate('events')} className="text-[11px] font-extrabold text-beastly-dark/40 uppercase tracking-[0.15em] hover:text-beastly-dark transition-colors flex items-center gap-1.5">
            Voir tout <ChevronRight size={14} />
          </button>
        </div>
        <div className="space-y-3 relative z-10">
          {activeEvents.map(ev => (
            <div
              key={ev.id}
              onClick={() => onNavigate('events')}
              className="group/item flex items-center gap-5 p-5 bg-beastly-dark/40 backdrop-blur-xl border border-white/5 rounded-2xl hover:bg-beastly-dark/60 transition-all cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: (ev.color || '#b4ff00') + '20' }}>
                <Calendar size={20} style={{ color: ev.color || '#b4ff00' }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-extrabold text-base text-beastly-beige">{ev.brand}</h3>
                  <span className="w-1 h-1 rounded-full bg-beastly-beige/20" />
                  <p className="text-sm font-bold text-beastly-beige/50 truncate">{ev.name}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-[10px] font-extrabold text-beastly-beige/40 uppercase tracking-widest">
                    <Calendar size={10} /> {ev.date}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-extrabold text-beastly-beige/40 uppercase tracking-widest">
                    <MapPin size={10} /> {ev.location}
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="font-black text-lg text-beastly-green">{ev.confirmedCount}<span className="text-sm font-bold text-beastly-beige/30">/{ev.invitedCount}</span></p>
                <p className="text-[10px] font-extrabold text-beastly-beige/30 uppercase tracking-widest">Confirmés</p>
              </div>
            </div>
          ))}
        </div>
        <GlowArrow className="absolute -right-6 -bottom-8 opacity-[0.07] pointer-events-none" size={160} color="#f1d8c4" />
      </div>

      {/* Right column */}
      <div className="md:col-span-4 space-y-5">
        {/* Engagement chart */}
        <div className="p-7 bg-beastly-beige rounded-2xl">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-black text-beastly-dark">Engagement</h2>
            <div className="w-9 h-9 rounded-full bg-beastly-dark/10 flex items-center justify-center">
              <BarChart3 size={16} className="text-beastly-dark/50" />
            </div>
          </div>
          <div className="h-28 w-full bg-beastly-dark rounded-xl p-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={engagementData}>
                <defs>
                  <linearGradient id="greenFade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#b4ff00" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#b4ff00" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#b4ff00" strokeWidth={2} fill="url(#greenFade)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-beastly-dark/40">Reach cumulé</p>
              <p className="text-xl font-black text-beastly-dark">+<AnimatedCounter value={547} />k vues</p>
            </div>
            <div className="px-3 py-1.5 bg-beastly-green rounded-full">
              <span className="text-[11px] font-extrabold text-beastly-dark">+18.3%</span>
            </div>
          </div>
        </div>

        {/* Prochain event */}
        {nextEvent && (
          <div className="p-7 bg-beastly-dark/80 backdrop-blur-xl rounded-2xl group relative overflow-hidden border border-beastly-beige/10">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-beastly-green rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Calendar size={20} className="text-beastly-dark fill-beastly-dark" />
              </div>
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-beastly-beige/40 mb-1">Prochain événement</p>
              <h3 className="text-xl font-black text-beastly-beige mb-1">{nextEvent.name}</h3>
              <p className="text-sm text-beastly-beige/40 font-bold mb-1">{nextEvent.brand}</p>
              <p className="text-xs text-beastly-beige/30 font-bold mb-5">{nextEvent.date} · {nextEvent.time}</p>
              <button onClick={() => onNavigate('events')} className="w-full py-3.5 bg-beastly-green rounded-full text-sm font-extrabold text-beastly-dark uppercase tracking-wider hover:brightness-110 transition-all">
                Voir le brief
              </button>
            </div>
            <GlowLightning className="absolute -right-6 -top-4 opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none rotate-12" size={150} color="#b4ff00" />
          </div>
        )}
      </div>

      {/* Demo Links Panel */}
      <div className="md:col-span-12 p-6 bg-beastly-dark/80 border border-beastly-green/20 rounded-3xl relative overflow-hidden">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 bg-beastly-green/20 rounded-full flex items-center justify-center">
            <Zap size={15} className="text-beastly-green" />
          </div>
          <div>
            <p className="text-sm font-black text-beastly-beige">Liens de démo</p>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-beastly-beige/30">Parcours influenceur & admin</p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { name: 'Léa Martin', handle: '@lea.festival', token: 'lea-abc123', color: 'bg-beastly-green' },
            { name: 'Hugo Durand', handle: '@hugo.taste', token: 'hugo-def456', color: 'bg-beastly-orange' },
            { name: 'Sarah Benali', handle: '@sarah.vibes', token: 'sarah-ghi789', color: 'bg-beastly-blue' },
            { name: 'Admin Beastly', handle: 'Dashboard OPS', token: null, color: 'bg-beastly-beige' },
          ].map((item) => (
            <a
              key={item.token ?? 'admin'}
              href={item.token ? `/event/${item.token}` : '/admin'}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-4 bg-beastly-beige/5 border border-beastly-beige/10 rounded-2xl hover:bg-beastly-beige/10 hover:border-beastly-beige/20 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                <div>
                  <p className="text-sm font-black text-beastly-beige leading-tight">{item.name}</p>
                  <p className="text-[10px] font-bold text-beastly-beige/40">{item.handle}</p>
                </div>
              </div>
              <ExternalLink size={13} className="text-beastly-beige/20 group-hover:text-beastly-green transition-colors shrink-0" />
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}
