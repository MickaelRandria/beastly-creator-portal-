import React, { useState } from 'react';
import { Check, FileText, Users, Send, Package, FilePen, ChevronUp, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const STEPS = [
  { id: 1, label: 'Brief déposé',  shortLabel: 'Brief',      icon: FileText, tab: 'dashboard' },
  { id: 2, label: 'Sourcing IA',   shortLabel: 'Sourcing',   icon: Users,    tab: 'creators'  },
  { id: 3, label: 'Invitations',   shortLabel: 'Invitations',icon: Send,     tab: 'creators'  },
  { id: 4, label: 'Assets',        shortLabel: 'Assets',     icon: Package,  tab: 'assetbox'  },
  { id: 5, label: 'Contrats',      shortLabel: 'Contrats',   icon: FilePen,  tab: 'admin'     },
];

interface Props {
  currentStep: number;
  onNavigate: (tab: string) => void;
}

export default function ProcessStepper({ currentStep, onNavigate }: Props) {
  const [open, setOpen] = useState(false);

  if (currentStep === 0) return null;

  const activeStep = STEPS.find(s => s.id === currentStep) ?? STEPS[0];
  const progress = Math.round(((currentStep - 1) / 4) * 100);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-72 bg-beastly-dark border border-beastly-beige/15 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.6)] overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-beastly-beige/10 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-beastly-beige/40">
                  Suivi campagne
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-1 flex-1 bg-beastly-beige/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-beastly-green rounded-full transition-all duration-700"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-black text-beastly-green shrink-0">{progress}%</span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg hover:bg-beastly-beige/10 text-beastly-beige/30 hover:text-beastly-beige transition-colors ml-3"
              >
                <X size={14} />
              </button>
            </div>

            {/* Steps list */}
            <div className="p-3 space-y-1">
              {STEPS.map(step => {
                const isDone = currentStep > step.id;
                const isActive = currentStep === step.id;
                const Icon = step.icon;
                return (
                  <button
                    key={step.id}
                    onClick={() => { onNavigate(step.tab); setOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all group ${
                      isActive
                        ? 'bg-beastly-green/10 ring-1 ring-beastly-green/30 hover:bg-beastly-green/15'
                        : isDone
                        ? 'hover:bg-beastly-beige/5'
                        : 'hover:bg-beastly-beige/5 opacity-50'
                    }`}
                  >
                    {/* Icon bubble */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isDone ? 'bg-beastly-green' :
                      isActive ? 'bg-beastly-beige/10 ring-1 ring-beastly-green' :
                      'bg-beastly-beige/5 ring-1 ring-beastly-beige/10'
                    }`}>
                      {isDone
                        ? <Check size={13} className="text-beastly-dark" strokeWidth={3} />
                        : <Icon size={13} className={isActive ? 'text-beastly-green' : 'text-beastly-beige/20'} />
                      }
                    </div>

                    {/* Label */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-extrabold ${
                        isActive ? 'text-beastly-beige' : isDone ? 'text-beastly-beige/70' : 'text-beastly-beige/40'
                      }`}>
                        {step.label}
                      </p>
                      {isActive && (
                        <p className="text-[10px] text-beastly-green/70 font-bold mt-0.5">En cours</p>
                      )}
                      {!isDone && !isActive && (
                        <p className="text-[10px] text-beastly-beige/25 font-bold mt-0.5">À venir</p>
                      )}
                    </div>

                    {/* Step number */}
                    <span className={`text-[10px] font-black shrink-0 ${
                      isDone ? 'text-beastly-green' : isActive ? 'text-beastly-green/50' : 'text-beastly-beige/20'
                    }`}>
                      {step.id}/5
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating pill trigger */}
      <motion.button
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-3 px-4 py-3 bg-beastly-dark border border-beastly-beige/15 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:border-beastly-green/30 transition-all"
      >
        {/* Step dot */}
        <div className="relative">
          <div className="w-2 h-2 rounded-full bg-beastly-green" />
          <div className="absolute inset-0 rounded-full bg-beastly-green animate-ping opacity-60" />
        </div>

        <div className="text-left">
          <p className="text-[9px] font-extrabold uppercase tracking-widest text-beastly-beige/40 leading-none mb-0.5">
            Étape {currentStep}/5
          </p>
          <p className="text-xs font-extrabold text-beastly-beige leading-none">
            {activeStep.label}
          </p>
        </div>

        {open
          ? <ChevronDown size={14} className="text-beastly-beige/40 ml-1" />
          : <ChevronUp size={14} className="text-beastly-beige/40 ml-1" />
        }
      </motion.button>
    </div>
  );
}
