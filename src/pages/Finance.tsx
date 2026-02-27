import React, { useState } from 'react';
import { FileText, ChevronDown, Send, Download, User, Building2, Calendar, Package, AlertCircle, PartyPopper, Sparkles } from 'lucide-react';
import { SelectedInfluencer } from '../types';

interface FinanceProps {
  selectedInfluencers: SelectedInfluencer[];
  onContractSent: () => void;
}

const CAMPAIGNS = [
  'Solidays x FuzeTea Passion',
  'Pop-up Store Experience — Nike',
  'Brunch Créateurs — Sézane',
];

const CAMPAIGN_BRANDS: Record<string, string> = {
  'Solidays x FuzeTea Passion': 'FuzeTea',
  'Pop-up Store Experience — Nike': 'Nike',
  'Brunch Créateurs — Sézane': 'Sézane',
};

const FEES: Record<string, number> = {
  'Solidays x FuzeTea Passion': 850,
  'Pop-up Store Experience — Nike': 1200,
  'Brunch Créateurs — Sézane': 600,
};

const MOCK_INFLUENCERS: SelectedInfluencer[] = [
  { id: 'mock1', name: 'Léa Martin', handle: '@lea.festival', followers: 34000, engagement: 6.2, platform: 'Instagram', niche: 'Lifestyle', avatar: 'https://picsum.photos/seed/lea/100' },
  { id: 'mock2', name: 'Hugo Durand', handle: '@hugo.taste', followers: 18000, engagement: 8.1, platform: 'TikTok', niche: 'Food', avatar: 'https://picsum.photos/seed/hugo/100' },
  { id: 'mock3', name: 'Sarah Benali', handle: '@sarah.vibes', followers: 52000, engagement: 4.9, platform: 'Instagram', niche: 'Lifestyle', avatar: 'https://picsum.photos/seed/sarah/100' },
];

function today() {
  return new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
}

export default function Finance({ selectedInfluencers, onContractSent }: FinanceProps) {
  const influencers = selectedInfluencers.length > 0 ? selectedInfluencers : MOCK_INFLUENCERS;

  const [selectedCampaign, setSelectedCampaign] = useState(CAMPAIGNS[0]);
  const [selectedInfluencerId, setSelectedInfluencerId] = useState(influencers[0]?.id ?? '');
  const [sendState, setSendState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [contractCompleted, setContractCompleted] = useState(false);

  const influencer = influencers.find(i => i.id === selectedInfluencerId) ?? influencers[0];
  const brand = CAMPAIGN_BRANDS[selectedCampaign] ?? 'Marque';
  const fee = FEES[selectedCampaign] ?? 850;

  const handleSend = () => {
    setSendState('sending');
    setTimeout(() => {
      setSendState('sent');
      if (!contractCompleted) {
        setContractCompleted(true);
        onContractSent();
      }
    }, 1800);
  };

  return (
    <div className="space-y-5">

      {/* 🎉 Félicitations banner */}
      {contractCompleted && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-beastly-green/20 to-beastly-blue/10 border border-beastly-green/40 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-beastly-green/10 blur-2xl rounded-full" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 bg-beastly-green rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(180,255,0,0.3)] shrink-0">
              <PartyPopper size={28} className="text-beastly-dark" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-beastly-green">Campagne complétée</p>
                <Sparkles size={11} className="text-beastly-green" />
              </div>
              <h2 className="text-xl font-black text-beastly-beige leading-tight">
                Bravo ! Le contrat {selectedCampaign} a été envoyé. 🎉
              </h2>
              <p className="text-sm font-bold text-beastly-beige/50 mt-1">
                Le processus campagne est terminé — brief, sourcing, invitations, assets et contrats validés.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-black text-beastly-beige">Contrats</h1>
          <p className="text-sm font-bold text-beastly-beige/40 mt-1">Éditeur de contrats — style Google Doc</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {}}
            className="flex items-center gap-2 px-4 py-2.5 bg-beastly-beige/10 border border-beastly-beige/10 text-beastly-beige text-xs font-extrabold rounded-xl uppercase tracking-wider hover:bg-beastly-beige/20 transition-all"
          >
            <Download size={14} /> Générer PDF
          </button>
          <button
            onClick={handleSend}
            disabled={sendState !== 'idle'}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-extrabold rounded-xl uppercase tracking-wider transition-all ${
              sendState === 'sent'
                ? 'bg-beastly-green/20 text-beastly-green cursor-default'
                : 'bg-beastly-green text-beastly-dark hover:brightness-110'
            }`}
          >
            <Send size={14} />
            {sendState === 'idle' ? 'Envoyer' : sendState === 'sending' ? 'Envoi...' : '✓ Envoyé'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Left panel — settings */}
        <div className="lg:col-span-3 space-y-4">

          {/* Campaign selector */}
          <div className="p-5 bg-beastly-beige rounded-2xl space-y-3">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-beastly-dark/40">Campagne</p>
            <div className="relative">
              <select
                value={selectedCampaign}
                onChange={e => { setSelectedCampaign(e.target.value); setSendState('idle'); }}
                className="w-full bg-beastly-dark text-beastly-beige text-sm font-bold rounded-xl px-4 py-3 pr-8 focus:outline-none appearance-none border border-beastly-beige/10"
              >
                {CAMPAIGNS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-beastly-beige/40 pointer-events-none" />
            </div>
            <div className="flex items-center gap-2 p-3 bg-beastly-dark/10 rounded-xl">
              <Building2 size={14} className="text-beastly-dark/50" />
              <div>
                <p className="text-[10px] font-extrabold text-beastly-dark/40 uppercase tracking-wider">Marque</p>
                <p className="text-sm font-black text-beastly-dark">{brand}</p>
              </div>
            </div>
          </div>

          {/* Influencer selector */}
          <div className="p-5 bg-beastly-beige rounded-2xl space-y-3">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-beastly-dark/40">Créateur</p>
            {selectedInfluencers.length === 0 && (
              <div className="flex items-start gap-2 p-3 bg-beastly-orange/10 rounded-xl">
                <AlertCircle size={13} className="text-beastly-orange mt-0.5 shrink-0" />
                <p className="text-[10px] font-bold text-beastly-orange leading-relaxed">Aucun créateur sélectionné — affichage des profils de démo.</p>
              </div>
            )}
            <div className="space-y-2">
              {influencers.map(inf => (
                <button
                  key={inf.id}
                  onClick={() => { setSelectedInfluencerId(inf.id); setSendState('idle'); }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all border-2 ${selectedInfluencerId === inf.id ? 'border-beastly-green bg-beastly-dark/5' : 'border-transparent bg-beastly-dark/5 hover:border-beastly-dark/20'}`}
                >
                  <img src={inf.avatar} alt={inf.name} className="w-8 h-8 rounded-full shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-black text-beastly-dark truncate">{inf.name}</p>
                    <p className="text-[10px] font-bold text-beastly-dark/40">{inf.handle}</p>
                  </div>
                  {selectedInfluencerId === inf.id && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-beastly-green shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Contract meta */}
          <div className="p-5 bg-beastly-beige/10 border border-beastly-beige/10 rounded-2xl space-y-3">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-beastly-beige/40">Informations</p>
            <div className="space-y-2 text-xs font-bold text-beastly-beige/60">
              <div className="flex items-center gap-2"><Calendar size={12} /><span>Généré le {today()}</span></div>
              <div className="flex items-center gap-2"><Package size={12} /><span>Rémunération : {fee.toLocaleString('fr-FR')}€</span></div>
              <div className="flex items-center gap-2"><User size={12} /><span>Beastly Agency</span></div>
            </div>
          </div>
        </div>

        {/* Right panel — contract document */}
        <div className="lg:col-span-9">
          <div className="bg-white rounded-2xl shadow-[0_4px_40px_rgba(0,0,0,0.15)] overflow-hidden">
            {/* Doc toolbar */}
            <div className="px-6 py-3 border-b border-gray-100 flex items-center gap-3">
              <FileText size={16} className="text-gray-400" />
              <p className="text-sm font-bold text-gray-500">Contrat de prestation — {influencer?.name ?? '—'}</p>
              <span className="ml-auto text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-green-50 text-green-600">Brouillon</span>
            </div>

            {/* Document body */}
            <div className="px-10 py-10 space-y-8 text-gray-800" style={{ fontFamily: 'Georgia, "DM Serif Display", serif', lineHeight: 1.7 }}>

              {/* Title */}
              <div className="text-center space-y-2 pb-6 border-b border-gray-100">
                <h1 style={{ fontFamily: 'inherit' }} className="text-2xl font-bold text-gray-900 uppercase tracking-widest">
                  Contrat de Prestation d'Influence
                </h1>
                <p className="text-sm text-gray-400">Campagne {selectedCampaign}</p>
                <p className="text-xs text-gray-400">Référence : BSTLY-{new Date().getFullYear()}-{String(Math.floor(Math.random() * 900) + 100)}</p>
              </div>

              {/* Parties */}
              <section className="space-y-4">
                <h2 className="text-base font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">Article 1 — Les Parties</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-50 rounded-xl space-y-1">
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">Mandataire</p>
                    <p className="font-bold text-gray-900">Beastly Agency SAS</p>
                    <p className="text-sm text-gray-500">SIRET 123 456 789 00012</p>
                    <p className="text-sm text-gray-500">75 Rue de Rivoli, 75004 Paris</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl space-y-1">
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">Prestataire</p>
                    <p className="font-bold text-gray-900">{influencer?.name ?? '—'}</p>
                    <p className="text-sm text-gray-500">{influencer?.handle ?? '—'}</p>
                    <p className="text-sm text-gray-500">{influencer?.platform ?? '—'} · {influencer ? (influencer.followers / 1000).toFixed(0) + 'k abonnés' : ''}</p>
                  </div>
                </div>
              </section>

              {/* Mission */}
              <section className="space-y-3">
                <h2 className="text-base font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">Article 2 — Objet de la Mission</h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Dans le cadre de la campagne <strong className="text-gray-900">«{selectedCampaign}»</strong> pour la marque <strong className="text-gray-900">{brand}</strong>, {influencer?.name ?? 'le prestataire'} s'engage à produire et publier les contenus définis ci-après, dans le respect des guidelines créatives fournies par Beastly Agency.
                </p>
                <div className="mt-3 space-y-2">
                  {[
                    '1 × Vidéo in-feed (TikTok ou Reels, 30–60 secondes)',
                    '3–5 × Stories avec mention du compte officiel',
                    'Utilisation des hashtags #FuzeTeaPassion #Solidays2026',
                    'Mention obligatoire @FuzeTea dans les légendes',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </section>

              {/* Dates */}
              <section className="space-y-3">
                <h2 className="text-base font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">Article 3 — Calendrier</h2>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Événement', value: '26 – 28 Juin 2026' },
                    { label: 'Dépôt des contenus', value: '1er Juillet 2026' },
                    { label: 'Publication', value: '3 Juillet 2026 max.' },
                  ].map(({ label, value }) => (
                    <div key={label} className="p-3 bg-gray-50 rounded-xl">
                      <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">{label}</p>
                      <p className="text-sm font-bold text-gray-900 mt-0.5">{value}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Remuneration */}
              <section className="space-y-3">
                <h2 className="text-base font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">Article 4 — Rémunération</h2>
                <div className="flex items-center justify-between p-5 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-sm text-gray-500">Forfait de prestation</p>
                    <p className="text-xs text-gray-400">Paiement sous 30 jours après remise des livrables validés</p>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{fee.toLocaleString('fr-FR')} €<span className="text-sm font-normal text-gray-400 ml-1">HT</span></p>
                </div>
              </section>

              {/* Signature */}
              <section className="space-y-4 pt-4">
                <h2 className="text-base font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">Article 5 — Signatures</h2>
                <div className="grid grid-cols-2 gap-8 mt-6">
                  <div className="space-y-2">
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">Pour Beastly Agency</p>
                    <div className="h-16 border-b-2 border-dashed border-gray-200" />
                    <p className="text-xs text-gray-400">Nom, Qualité, Date</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">Pour {influencer?.name ?? 'le Prestataire'}</p>
                    <div className="h-16 border-b-2 border-dashed border-gray-200" />
                    <p className="text-xs text-gray-400">Précédé de « Lu et approuvé »</p>
                  </div>
                </div>
              </section>

              {/* Footer */}
              <div className="pt-6 border-t border-gray-100 text-center">
                <p className="text-[10px] text-gray-300 uppercase tracking-widest">Beastly Agency SAS — Document confidentiel — {today()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
