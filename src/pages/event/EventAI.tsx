import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Sparkles, RefreshCw, ChevronDown, ChevronUp, Clock, Hash } from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';
import { getInfluencerByToken, mockEvent } from '../../lib/mockData';
import { fallbackIdeas, Idea } from '../../lib/fallbackIdeas';
import { GlowLightning } from '../../components/BeastlyIcons';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

async function generateIdeas(influencer: { instagramHandle: string; style: string }): Promise<Idea[]> {
  const brief = mockEvent.brief;
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: `Tu es l'assistant créatif de l'agence Beastly. Tu aides les influenceurs à créer du contenu en accord avec le brief de la marque.

## Brief de la campagne
- Marque : ${mockEvent.brand}
- Objectif : ${brief.objective}
- Messages clés : ${brief.keyMessages.join(', ')}
- Hashtags obligatoires : ${brief.hashtags.join(' ')}
- Mentions obligatoires : ${brief.mentions.join(' ')}
- Ton souhaité : ${brief.toneOfVoice}
- Do's : ${brief.dos.join(', ')}
- Don'ts : ${brief.donts.join(', ')}

## Profil de l'influenceur
- Pseudo : ${influencer.instagramHandle}
- Style habituel : ${influencer.style}

Génère exactement 3 concepts de stories/reels créatifs et personnalisés pour cet influenceur.`,
    config: {
      systemInstruction: 'Réponds UNIQUEMENT en JSON valide. Pas de markdown, pas de backticks.',
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          ideas: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                emoji: { type: Type.STRING },
                title: { type: Type.STRING },
                script: { type: Type.ARRAY, items: { type: Type.STRING } },
                hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
                mentions: { type: Type.ARRAY, items: { type: Type.STRING } },
                duration: { type: Type.STRING },
              },
              required: ['emoji', 'title', 'script', 'hashtags', 'mentions', 'duration'],
            },
          },
        },
        required: ['ideas'],
      },
    },
  });

  const parsed = JSON.parse(response.text || '{}');
  return parsed.ideas as Idea[];
}

function SkeletonCard() {
  return (
    <div className="bg-beastly-beige rounded-2xl p-6 space-y-3 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-beastly-dark/10 rounded-xl" />
        <div className="h-5 bg-beastly-dark/10 rounded-full w-40" />
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-beastly-dark/10 rounded-full w-full" />
        <div className="h-3 bg-beastly-dark/10 rounded-full w-4/5" />
        <div className="h-3 bg-beastly-dark/10 rounded-full w-3/4" />
      </div>
      <div className="h-3 bg-beastly-dark/10 rounded-full w-1/3" />
    </div>
  );
}

function IdeaCard({ idea }: { idea: Idea }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-beastly-beige rounded-2xl overflow-hidden"
    >
      <button
        className="w-full p-6 text-left space-y-3"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-beastly-dark rounded-xl flex items-center justify-center text-2xl">
              {idea.emoji}
            </div>
            <div>
              <p className="font-black text-beastly-dark text-base leading-tight">{idea.title}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Clock size={10} className="text-beastly-dark/40" />
                <span className="text-[10px] font-extrabold text-beastly-dark/40 uppercase tracking-wider">{idea.duration}</span>
              </div>
            </div>
          </div>
          {expanded ? <ChevronUp size={16} className="text-beastly-dark/40 shrink-0" /> : <ChevronDown size={16} className="text-beastly-dark/40 shrink-0" />}
        </div>

        {/* Hashtags preview */}
        <div className="flex flex-wrap gap-1.5">
          {idea.hashtags.slice(0, 3).map(h => (
            <span key={h} className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-beastly-dark/10 text-beastly-dark/60">{h}</span>
          ))}
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-4">
              {/* Script */}
              <div className="p-4 bg-beastly-dark rounded-xl space-y-2.5">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-beastly-beige/40">Script</p>
                {idea.script.map((step, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="w-5 h-5 bg-beastly-green rounded-full flex items-center justify-center shrink-0 text-[10px] font-black text-beastly-dark mt-0.5">{i + 1}</span>
                    <p className="text-xs font-bold text-beastly-beige/80 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>

              {/* All hashtags */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Hash size={12} className="text-beastly-dark/40" />
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-beastly-dark/40">Hashtags & mentions</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[...idea.hashtags, ...idea.mentions].map(tag => (
                    <span key={tag} className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-beastly-dark text-beastly-green">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function EventAI() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const influencer = token ? getInfluencerByToken(token) : null;
  const [ideas, setIdeas] = useState<Idea[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!influencer) return;
    setLoading(true);
    setIdeas(null);
    try {
      const result = await generateIdeas(influencer);
      setIdeas(result);
    } catch (err) {
      console.error('AI generation failed, using fallback', err);
      setIdeas(fallbackIdeas);
    } finally {
      setLoading(false);
    }
  };

  if (!influencer) {
    return (
      <div className="min-h-screen bg-beastly-dark flex items-center justify-center">
        <p className="text-beastly-beige/40 font-bold">Token invalide</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beastly-dark relative overflow-x-hidden">
      <GlowLightning className="absolute -top-10 -right-10 opacity-15 pointer-events-none" size={250} color="#b4ff00" />

      {/* Top bar */}
      <div className="px-5 pt-8 pb-4 flex items-center gap-3 relative z-10">
        <button
          onClick={() => navigate(`/event/${token}/brief`)}
          className="flex items-center gap-2 px-4 py-2 bg-beastly-beige rounded-full text-sm font-bold text-beastly-dark hover:bg-beastly-beige/80 transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          Retour
        </button>
      </div>

      <div className="px-5 pb-10 space-y-5 max-w-lg mx-auto relative z-10">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-beastly-green rounded-full flex items-center justify-center">
              <Sparkles size={15} className="text-beastly-dark" />
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-beastly-green">IA Beastly</span>
          </div>
          <h1 className="text-3xl font-black text-beastly-beige">Idées créatives</h1>
          <p className="text-sm font-bold text-beastly-beige/40 mt-1 leading-relaxed">
            L'IA Beastly analyse ton brief et ton style pour te proposer des idées de contenus sur-mesure.
          </p>
        </div>

        {/* Influencer context */}
        <div className="p-4 bg-beastly-beige/10 border border-beastly-beige/10 rounded-2xl flex items-center gap-3">
          <img
            src={influencer.profilePicture}
            alt={influencer.firstName}
            className="w-10 h-10 rounded-full object-cover bg-beastly-beige"
          />
          <div>
            <p className="text-sm font-black text-beastly-beige">{influencer.instagramHandle}</p>
            <p className="text-[11px] font-bold text-beastly-beige/40 leading-tight">{influencer.style}</p>
          </div>
        </div>

        {/* Generate button */}
        {!loading && (
          <button
            onClick={handleGenerate}
            className="w-full py-5 bg-beastly-green text-beastly-dark rounded-full font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 transition-all group"
          >
            {ideas ? (
              <>
                <RefreshCw size={17} className="group-hover:rotate-180 transition-transform duration-500" />
                Régénérer 3 idées
              </>
            ) : (
              <>
                <Sparkles size={17} />
                Générer 3 idées
              </>
            )}
          </button>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div className="space-y-3">
            <div className="text-center py-2">
              <p className="text-sm font-extrabold text-beastly-green uppercase tracking-wider">
                L'IA analyse ton profil...
              </p>
            </div>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {/* Ideas */}
        {ideas && !loading && (
          <div className="space-y-3">
            {ideas.map((idea, i) => (
              <IdeaCard key={i} idea={idea} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
