import React from 'react';
import {
  Wallet,
  ArrowUpRight,
  FileText,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Loader2,
  AlertCircle,
  Check,
  Clock
} from 'lucide-react';
import { Contract } from '../types';
import { GlowHeart, GlowLightning } from '../components/BeastlyIcons';
import { motion } from 'motion/react';

interface FinanceProps {
  balance: number;
  contracts: Contract[];
  onSign: (id: string) => void;
  onWithdraw: (amount: number) => void;
}

export default function Finance({ balance, contracts, onSign, onWithdraw }: FinanceProps) {
  const [withdrawAmount, setWithdrawAmount] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0 || amount > balance) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      onWithdraw(amount);
      setStatus('success');
      setWithdrawAmount('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-black text-beastly-beige">Administratif</h1>
        <p className="text-beastly-beige/40 mt-1 font-extrabold uppercase tracking-widest text-[11px]">Contrats, paiements et suivi administratif des événements.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">

          {/* Paiements événements */}
          <div className="p-7 bg-beastly-beige rounded-2xl">
            <h2 className="text-2xl font-black mb-7 text-beastly-dark">Paiements événements</h2>
            <div className="space-y-3">
              {[
                { brand: 'Jacquemus', type: 'Soirée Lancement AW25', amount: 8500, date: 'Fév 2025', status: 'Payé' },
                { brand: 'Galeries Lafayette', type: 'Défilé Influenceurs', amount: 15000, date: 'Jan 2025', status: 'Payé' },
                { brand: 'Nike', type: 'Pop-up Store Experience', amount: 12000, date: 'Mars 2025', status: 'En attente' },
              ].map((tx, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-beastly-dark rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center ${tx.status === 'Payé' ? 'bg-beastly-green/20 text-beastly-green' : 'bg-beastly-orange/20 text-beastly-orange'}`}>
                      {tx.status === 'Payé' ? <CheckCircle2 size={20} /> : <Clock size={20} />}
                    </div>
                    <div>
                      <p className="font-extrabold text-beastly-beige">{tx.brand}</p>
                      <p className="text-[10px] font-extrabold text-beastly-beige/40 uppercase tracking-widest">{tx.type} • {tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-black text-lg ${tx.status === 'Payé' ? 'text-beastly-green' : 'text-beastly-beige'}`}>{tx.amount.toLocaleString()}€</p>
                    <p className={`text-[10px] font-extrabold uppercase tracking-widest ${tx.status === 'Payé' ? 'text-beastly-green/60' : 'text-beastly-orange'}`}>{tx.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* À venir */}
          <div className="p-7 bg-beastly-beige rounded-2xl">
            <div className="flex items-center justify-between mb-7">
              <h2 className="text-2xl font-black text-beastly-dark">Paiements à venir</h2>
              <span className="px-3 py-1.5 bg-beastly-orange/20 rounded-full text-[10px] font-extrabold text-beastly-orange uppercase tracking-widest">En cours</span>
            </div>
            <div className="space-y-3">
              {[
                { brand: 'Sézane', campaign: 'Brunch Créateurs Printemps', amount: 5500, status: 'En attente contrat', date: 'Est. Avr 2025' },
                { brand: 'L\'Oréal Paris', campaign: 'Soirée Capsule Collection', amount: 9200, status: 'À signer', date: 'Est. Mai 2025' },
              ].map((payout, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-beastly-dark rounded-2xl group hover:ring-1 hover:ring-beastly-green/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-beastly-orange/20 rounded-full flex items-center justify-center text-beastly-orange">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="font-extrabold text-beastly-beige">{payout.brand}</p>
                      <p className="text-[10px] font-extrabold text-beastly-beige/40 uppercase tracking-widest">{payout.campaign} • {payout.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-lg text-beastly-beige">{payout.amount.toLocaleString()}€</p>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-beastly-orange">{payout.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contracts Sidebar */}
        <div className="space-y-6">
          <div className="p-7 bg-beastly-beige rounded-2xl">
            <h2 className="text-xl font-black mb-7 flex items-center gap-3 text-beastly-dark">
              <div className="w-9 h-9 rounded-full bg-beastly-green flex items-center justify-center">
                <FileText size={16} className="text-beastly-dark" />
              </div>
              Contrats
            </h2>
            <div className="space-y-3">
              {contracts.map((contract) => (
                <div key={contract.id} className="p-5 bg-beastly-dark rounded-2xl space-y-3">
                  <div>
                    <p className="font-extrabold text-sm text-beastly-beige">{contract.brand}</p>
                    <p className="text-[10px] font-extrabold text-beastly-beige/40 uppercase tracking-widest">{contract.campaignName}</p>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-widest text-beastly-beige/40">
                    <span>Value: <span className="text-beastly-green">${contract.value.toLocaleString()}</span></span>
                    <span>{contract.date}</span>
                  </div>
                  {contract.status === 'Signed' ? (
                    <div className="w-full py-3 bg-beastly-green/10 text-beastly-green rounded-full font-extrabold text-center text-xs flex items-center justify-center gap-2">
                      <Check size={14} /> Signed
                    </div>
                  ) : (
                    <button
                      onClick={() => onSign(contract.id)}
                      className="w-full py-3 bg-beastly-green text-beastly-dark rounded-full font-extrabold text-xs hover:scale-[1.02] transition-all uppercase tracking-wider"
                    >
                      Signer le contrat
                    </button>
                  )}
                </div>
              ))}
              {contracts.length === 0 && (
                <p className="text-beastly-dark/50 text-center py-8 font-extrabold uppercase tracking-widest text-[10px]">Aucun contrat en attente.</p>
              )}
            </div>
          </div>

          <div className="p-7 bg-beastly-dark rounded-2xl border border-beastly-beige/10">
            <h3 className="font-extrabold text-sm mb-4 uppercase tracking-widest text-beastly-beige/50">Documents légaux</h3>
            <p className="text-xs font-bold leading-relaxed text-beastly-beige/60">
              Les CGV et documents cadre Beastly Agency 2025 sont disponibles en téléchargement.
            </p>
            <button className="mt-4 text-beastly-green text-xs font-extrabold uppercase tracking-widest hover:underline">Télécharger PDF</button>
          </div>
        </div>
      </div>
    </div>
  );
}
