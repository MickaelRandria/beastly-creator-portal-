import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Shirt, Clock, Check, ArrowRight, Zap, X, FileText, ExternalLink } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { getInfluencerByToken, mockEvent } from '../../lib/mockData';
import { GlowLightning } from '../../components/BeastlyIcons';

type Step = 'invite' | 'sign' | 'confirmed' | 'declined';

export default function EventRSVP() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const influencer = token ? getInfluencerByToken(token) : null;

  const [step, setStep] = useState<Step>('invite');
  const [signed, setSigned] = useState(false);
  const [signing, setSigning] = useState(false);

  if (!influencer) {
    return (
      <div className="min-h-screen bg-beastly-dark flex items-center justify-center">
        <p className="text-beastly-beige/40 font-bold">Token invalide</p>
      </div>
    );
  }

  const handleSign = () => {
    setSigning(true);
    setTimeout(() => {
      setSigning(false);
      setStep('confirmed');
    }, 1800);
  };

  const qrValue = `BEASTLY-${mockEvent.id}-${influencer.id}`;

  return (
    <div className="min-h-screen bg-beastly-dark flex flex-col items-center py-8 px-6 relative overflow-x-hidden">
      <GlowLightning className="absolute -top-10 -left-10 opacity-15 pointer-events-none" size={280} color="#b4ff00" />
      <GlowLightning className="absolute -bottom-20 -right-10 opacity-10 pointer-events-none rotate-180" size={280} color="#fc846d" />

      <div className="w-full max-w-sm relative z-10">
        <AnimatePresence mode="wait">

          {/* ── ÉTAPE 1 : Invitation ── */}
          {step === 'invite' && (
            <motion.div
              key="invite"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              {/* Logo */}
              <div className="flex items-center gap-2 justify-center mb-2">
                <div className="w-9 h-9 bg-beastly-beige rounded-full flex items-center justify-center">
                  <Zap className="text-beastly-dark fill-beastly-dark" size={16} />
                </div>
                <span className="text-lg font-black text-beastly-beige">Beastly Event Hub</span>
              </div>

              {/* Invitation card */}
              <div className="bg-beastly-beige rounded-3xl overflow-hidden">
                {/* Dark header */}
                <div className="bg-beastly-dark p-6 relative overflow-hidden">
                  <GlowLightning className="absolute -right-4 -top-4 opacity-20 pointer-events-none" size={120} color="#b4ff00" />
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-beastly-green mb-1 relative z-10">Invitation exclusive</p>
                  <h2 className="text-2xl font-black text-beastly-beige relative z-10 leading-tight">{mockEvent.name}</h2>
                  <p className="text-sm font-bold text-beastly-beige/50 mt-1 relative z-10">{mockEvent.brand}</p>
                </div>

                <div className="p-6 space-y-5">
                  {/* Date / Time / Location / Dress code */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-beastly-dark/5 rounded-xl">
                      <Calendar size={13} className="text-beastly-dark/40 mb-1" />
                      <p className="text-sm font-black text-beastly-dark">{mockEvent.date}</p>
                      <p className="text-[10px] font-extrabold text-beastly-dark/40 uppercase tracking-wider">Date</p>
                    </div>
                    <div className="p-3 bg-beastly-dark/5 rounded-xl">
                      <Clock size={13} className="text-beastly-dark/40 mb-1" />
                      <p className="text-sm font-black text-beastly-dark">{mockEvent.time}</p>
                      <p className="text-[10px] font-extrabold text-beastly-dark/40 uppercase tracking-wider">Horaires</p>
                    </div>
                    <div className="p-3 bg-beastly-dark/5 rounded-xl col-span-2">
                      <MapPin size={13} className="text-beastly-dark/40 mb-1" />
                      <p className="text-sm font-black text-beastly-dark">{mockEvent.location}</p>
                      <p className="text-[10px] font-extrabold text-beastly-dark/40 uppercase tracking-wider">Lieu</p>
                    </div>
                    <div className="p-3 bg-beastly-dark/5 rounded-xl col-span-2">
                      <Shirt size={13} className="text-beastly-dark/40 mb-1" />
                      <p className="text-sm font-black text-beastly-dark">{mockEvent.dressCode}</p>
                      <p className="text-[10px] font-extrabold text-beastly-dark/40 uppercase tracking-wider">Dress code</p>
                    </div>
                  </div>

                  {/* La mission */}
                  <div className="p-4 bg-beastly-dark/5 rounded-2xl space-y-1.5">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-beastly-dark/40">La mission</p>
                    <p className="text-xs font-bold text-beastly-dark/70 leading-relaxed">{mockEvent.description}</p>
                  </div>

                  {/* Ce qu'on attend de toi */}
                  <div className="space-y-2.5">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-beastly-dark/40">Ce qu'on attend de toi</p>
                    {mockEvent.deliverables.map((d, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <div className="w-5 h-5 bg-beastly-dark rounded-full flex items-center justify-center shrink-0">
                          <Check size={10} className="text-beastly-green" strokeWidth={3} />
                        </div>
                        <p className="text-xs font-bold text-beastly-dark/70">{d}</p>
                      </div>
                    ))}
                  </div>

                  {/* Tes avantages */}
                  <div className="p-4 bg-beastly-dark rounded-2xl space-y-2">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-beastly-beige/40">Tes avantages</p>
                    {mockEvent.perks.map((perk, i) => (
                      <p key={i} className="text-sm font-bold text-beastly-beige/80">{perk}</p>
                    ))}
                  </div>

                  {/* Accept CTA */}
                  <button
                    onClick={() => setStep('sign')}
                    className="w-full py-4 bg-beastly-dark text-beastly-green rounded-full font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-beastly-dark/80 transition-all group"
                  >
                    Je participe 🎉
                    <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Decline — less prominent, outside the card */}
              <button
                onClick={() => setStep('declined')}
                className="w-full text-center py-3 text-sm font-bold text-beastly-beige/30 hover:text-beastly-beige/60 transition-colors"
              >
                Je ne suis pas disponible
              </button>
            </motion.div>
          )}

          {/* ── ÉTAPE 2 : Signature ── */}
          {step === 'sign' && (
            <motion.div
              key="sign"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <div className="text-center space-y-1">
                <h2 className="text-2xl font-black text-beastly-beige">Une dernière étape ✍️</h2>
                <p className="text-sm font-bold text-beastly-beige/40">Cession de droits à l'image simplifiée</p>
              </div>

              <div className="bg-beastly-beige rounded-3xl p-6 space-y-5">
                <div className="p-4 bg-beastly-dark/5 rounded-2xl space-y-2.5">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-beastly-dark/40">Ce à quoi tu t'engages</p>
                  {[
                    "Publier au moins 1 contenu dans les 24h suivant l'event",
                    'Utiliser les hashtags officiels de la campagne',
                    'Autoriser Beastly à réutiliser tes contenus à des fins promotionnelles',
                    "J'autorise Beastly à utiliser, traiter et conserver mes données personnelles dans le cadre de cette opération événementielle et pour les prochaines à venir",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 bg-beastly-green rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={9} className="text-beastly-dark" strokeWidth={3} />
                      </div>
                      <p className="text-xs font-bold text-beastly-dark/70 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>

                {/* YouSign CTA */}
                <a
                  href="https://yousign.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-3 p-4 bg-beastly-dark rounded-2xl hover:bg-beastly-dark/80 transition-all group"
                >
                  <div className="w-9 h-9 bg-[#1a1a2e] border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <FileText size={16} className="text-[#6c63ff]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black text-beastly-beige leading-tight">Voir & signer le contrat</p>
                    <p className="text-[10px] font-bold text-beastly-beige/40 mt-0.5">Via YouSign · Signature électronique certifiée</p>
                  </div>
                  <ExternalLink size={14} className="text-beastly-beige/30 group-hover:text-beastly-beige/60 shrink-0 transition-colors" />
                </a>

                <button
                  onClick={() => setSigned(!signed)}
                  className="w-full flex items-center gap-3 p-4 bg-beastly-dark/5 rounded-2xl border-2 border-transparent hover:border-beastly-dark/20 transition-all text-left"
                >
                  <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center transition-all ${signed ? 'bg-beastly-green' : 'border-2 border-beastly-dark/30'}`}>
                    {signed && <Check size={12} className="text-beastly-dark" strokeWidth={3} />}
                  </div>
                  <p className="text-sm font-bold text-beastly-dark leading-tight">
                    Je, <span className="font-black">{influencer.firstName} {influencer.lastName}</span>, accepte les conditions ci-dessus et signe électroniquement ce document.
                  </p>
                </button>

                <button
                  onClick={handleSign}
                  disabled={!signed || signing}
                  className="w-full py-4 bg-beastly-dark text-beastly-green rounded-full font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-beastly-dark/80 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {signing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-beastly-green/30 border-t-beastly-green rounded-full animate-spin" />
                      Signature en cours...
                    </>
                  ) : (
                    'Confirmer ma participation'
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* ── ÉTAPE 3 : Confirmé + QR Code ── */}
          {step === 'confirmed' && (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="space-y-5"
            >
              <div className="text-center space-y-1">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                  className="w-16 h-16 bg-beastly-green rounded-full flex items-center justify-center mx-auto mb-3"
                >
                  <Check size={28} className="text-beastly-dark" strokeWidth={3} />
                </motion.div>
                <h2 className="text-2xl font-black text-beastly-beige">C'est confirmé ! 🎉</h2>
                <p className="text-sm font-bold text-beastly-beige/40">Voici ton pass d'entrée, {influencer.firstName}.</p>
              </div>

              <div className="bg-white rounded-3xl p-6 flex flex-col items-center gap-4">
                <QRCodeSVG
                  value={qrValue}
                  size={180}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="H"
                />
                <div className="text-center">
                  <p className="font-black text-black text-base">{influencer.firstName} {influencer.lastName}</p>
                  <p className="text-sm font-bold text-black/40">{influencer.instagramHandle}</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-black/5 rounded-full">
                  <span className="text-sm">📲</span>
                  <p className="text-xs font-extrabold text-black/50 uppercase tracking-wider">Ajouté à ton Wallet</p>
                </div>
              </div>

              <button
                onClick={() => navigate(`/event/${token}/dashboard`)}
                className="w-full py-4 bg-beastly-green text-beastly-dark rounded-full font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 transition-all group"
              >
                Accéder à mon espace
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </motion.div>
          )}

          {/* ── ÉTAPE 4 : Décliné ── */}
          {step === 'declined' && (
            <motion.div
              key="declined"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-5 text-center"
            >
              <div className="w-16 h-16 bg-beastly-beige/10 border border-beastly-beige/10 rounded-full flex items-center justify-center mx-auto">
                <X size={28} className="text-beastly-beige/40" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-beastly-beige">Invitation déclinée</h2>
                <p className="text-sm font-bold text-beastly-beige/40 leading-relaxed">
                  Dommage ! Si tu changes d'avis ou<br />pour toute question, contacte-nous.
                </p>
              </div>
              <div className="p-4 bg-beastly-beige/10 border border-beastly-beige/10 rounded-2xl">
                <p className="text-xs font-extrabold text-beastly-beige/40 uppercase tracking-wider">contact@beastly-agency.com</p>
              </div>
              <button
                onClick={() => setStep('invite')}
                className="w-full py-3 border border-beastly-beige/20 rounded-full text-sm font-bold text-beastly-beige/50 hover:text-beastly-beige/80 hover:border-beastly-beige/40 transition-all"
              >
                Revenir à l'invitation
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
