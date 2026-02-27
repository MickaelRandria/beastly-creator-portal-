import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ChevronDown, ChevronUp, Check, Sparkles } from 'lucide-react';
import { getInfluencerByToken, mockEvent } from '../../lib/mockData';

const STORAGE_KEY = 'beastly_brief_checklist';

interface ChecklistItem {
  id: number;
  text: string;
  checked: boolean;
}

interface Section {
  id: string;
  title: string;
  defaultOpen?: boolean;
  content: React.ReactNode;
}

function Accordion({ title, defaultOpen = false, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-beastly-beige rounded-2xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-6 py-4 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="font-black text-beastly-dark text-base">{title}</span>
        {open ? <ChevronUp size={16} className="text-beastly-dark/40" /> : <ChevronDown size={16} className="text-beastly-dark/40" />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function EventBrief() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const influencer = token ? getInfluencerByToken(token) : null;

  const savedChecklist = (() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as ChecklistItem[];
    } catch {}
    return null;
  })();

  const [checklist, setChecklist] = useState<ChecklistItem[]>(
    savedChecklist || mockEvent.brief.checklist
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checklist));
  }, [checklist]);

  const toggleCheck = (id: number) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const doneCount = checklist.filter(c => c.checked).length;

  if (!influencer) {
    return (
      <div className="min-h-screen bg-beastly-dark flex items-center justify-center">
        <p className="text-beastly-beige/40 font-bold">Token invalide</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beastly-dark">
      {/* Top bar */}
      <div className="px-5 pt-8 pb-4 flex items-center gap-3">
        <button
          onClick={() => navigate(`/event/${token}/dashboard`)}
          className="flex items-center gap-2 px-4 py-2 bg-beastly-beige rounded-full text-sm font-bold text-beastly-dark hover:bg-beastly-beige/80 transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          Retour
        </button>
      </div>

      <div className="px-5 pb-10 space-y-4 max-w-lg mx-auto">
        {/* Title */}
        <div>
          <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-full bg-beastly-green text-beastly-dark mb-3">
            Brief créateur
          </span>
          <h1 className="text-3xl font-black text-beastly-beige">{mockEvent.name}</h1>
          <p className="text-sm font-bold text-beastly-beige/40 mt-1">{mockEvent.brand} × Beastly</p>
        </div>

        {/* Objectif */}
        <Accordion title="🎯 Objectif" defaultOpen>
          <p className="text-sm font-bold text-beastly-dark/70 leading-relaxed">
            {mockEvent.brief.objective}
          </p>
        </Accordion>

        {/* Checklist */}
        <Accordion title={`📝 Ta checklist (${doneCount}/${checklist.length})`} defaultOpen>
          <div className="space-y-2">
            {/* Progress bar */}
            <div className="w-full h-1.5 bg-beastly-dark/10 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-beastly-green rounded-full transition-all duration-500"
                style={{ width: `${(doneCount / checklist.length) * 100}%` }}
              />
            </div>
            {checklist.map(item => (
              <button
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className="w-full flex items-center gap-3 p-3.5 bg-beastly-dark/5 rounded-xl border border-beastly-dark/10 hover:bg-beastly-dark/10 transition-colors text-left"
              >
                <div className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center transition-all ${item.checked ? 'bg-beastly-green' : 'border-2 border-beastly-dark/30'}`}>
                  {item.checked && <Check size={10} className="text-beastly-dark" strokeWidth={3} />}
                </div>
                <span className={`text-sm font-bold transition-all ${item.checked ? 'line-through text-beastly-dark/40' : 'text-beastly-dark'}`}>
                  {item.text}
                </span>
              </button>
            ))}
          </div>
        </Accordion>

        {/* Do's */}
        <Accordion title="✅ Do's">
          <ul className="space-y-2">
            {mockEvent.brief.dos.map((d, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm font-bold text-beastly-dark/70">
                <span className="text-beastly-dark mt-0.5 shrink-0">✓</span>
                {d}
              </li>
            ))}
          </ul>
        </Accordion>

        {/* Don'ts */}
        <Accordion title="❌ Don'ts">
          <ul className="space-y-2">
            {mockEvent.brief.donts.map((d, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm font-bold text-beastly-dark/70">
                <span className="text-beastly-orange mt-0.5 shrink-0">✗</span>
                {d}
              </li>
            ))}
          </ul>
        </Accordion>

        {/* Messages clés */}
        <Accordion title="💬 Messages clés">
          <div className="space-y-2.5">
            {mockEvent.brief.keyMessages.map((m, i) => (
              <div key={i} className="p-4 bg-beastly-dark/5 rounded-xl border-l-4 border-beastly-green">
                <p className="text-sm font-bold text-beastly-dark/80 italic">"{m}"</p>
              </div>
            ))}
          </div>
        </Accordion>

        {/* Hashtags */}
        <Accordion title="# Hashtags & mentions">
          <div className="flex flex-wrap gap-2">
            {mockEvent.brief.hashtags.map(h => (
              <span key={h} className="px-3 py-1.5 bg-beastly-dark text-beastly-green text-xs font-extrabold rounded-full">{h}</span>
            ))}
            {mockEvent.brief.mentions.map(m => (
              <span key={m} className="px-3 py-1.5 bg-beastly-dark text-beastly-blue text-xs font-extrabold rounded-full">{m}</span>
            ))}
          </div>
        </Accordion>

        {/* AI CTA */}
        <button
          onClick={() => navigate(`/event/${token}/ai`)}
          className="w-full py-5 bg-beastly-green text-beastly-dark rounded-full font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 transition-all group"
        >
          <Sparkles size={18} className="group-hover:scale-110 transition-transform" />
          Générer des idées avec l'IA Beastly
        </button>
      </div>
    </div>
  );
}
