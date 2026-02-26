import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Send,
  Copy,
  Check,
  Music,
  Flame,
  Loader2,
  Zap
} from 'lucide-react';
import { generateSocialContent } from '../services/gemini';
import ReactMarkdown from 'react-markdown';
import { Campaign } from '../types';

interface AICreativeStudioProps {
  campaign?: Campaign;
}

export default function AICreativeStudio({ campaign }: AICreativeStudioProps) {
  const [brief, setBrief] = React.useState(campaign?.brand === 'Zalando' ? 'Campagne Zalando Fashion Week. Focus sur l\'organique, la culture urbaine et la transition entre street style et haute couture.' : '');
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<any>(null);
  const [copied, setCopied] = React.useState<string | null>(null);

  const handleGenerate = async () => {
    if (!brief.trim()) return;
    setIsLoading(true);

    if (campaign?.brand === 'Zalando') {
      await new Promise(resolve => setTimeout(resolve, 2500));
      setResult({
        hooks: [
          "POV: Tu réalises que la Fashion Week se passe en fait dans ta rue, pas sur le runway. 🏙️",
          "L'histoire oubliée du baggy : comment la rue a hacké la haute couture. 🧵",
          "Transition check : Du café du coin au front row de Milan sans changer de outfit. ✨"
        ],
        script: "### Script Organique - Zalando\n\n**Intro (0-3s):** Plan serré sur tes sneakers qui foulent le pavé. Pas de musique, juste le son de la ville.\n\n**Body (3-15s):** 'On nous dit souvent que la mode c'est des podiums et des flashs. Mais la vraie culture, elle est là, dans la manière dont on porte nos pièces au quotidien.'\n\n**Transition (15-20s):** Cut rapide vers un look stylisé Zalando. 'C'est ça l'ADN de cette collection : l'élégance brute.'\n\n**Outro (20-30s):** 'Checkez le lien en bio pour voir comment la rue redéfinit les codes cette saison. #ZalandoFashionWeek'",
        caption: "La mode n'est pas une destination, c'est un mouvement. 🕊️ Découvrez la nouvelle collection Zalando pensée pour ceux qui font la culture au quotidien. #Zalando #StreetCulture #FashionWeek #Beastly"
      });
      setIsLoading(false);
      return;
    }

    try {
      const data = await generateSocialContent(brief);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (campaign?.brand === 'Zalando') {
      setBrief('Campagne Zalando Fashion Week. Focus sur l\'organique, la culture urbaine et la transition entre street style et haute couture.');
    }
  }, [campaign]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-beastly-beige">AI Creative Studio</h1>
          <p className="text-beastly-beige/40 mt-1 font-extrabold uppercase tracking-widest text-[11px]">Your personal strategist. Turn any brief into a viral hit.</p>
        </div>
        {campaign && (
          <div className="px-4 py-2 bg-beastly-green/10 border border-beastly-green/20 rounded-full flex items-center gap-2">
            <Zap size={14} className="text-beastly-green" />
            <span className="text-[10px] font-extrabold text-beastly-green uppercase tracking-widest">Context: {campaign.brand}</span>
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-7 bg-beastly-beige rounded-2xl space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-beastly-green rounded-full flex items-center justify-center">
                <Sparkles size={18} className="text-beastly-dark" />
              </div>
              <h2 className="text-xl font-black text-beastly-dark">Brand Brief</h2>
            </div>

            <textarea
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              placeholder="Paste the brand brief, campaign goals, or key talking points here..."
              className="w-full h-64 bg-beastly-dark rounded-2xl p-6 text-beastly-beige placeholder:text-beastly-beige/30 focus:outline-none focus:ring-2 focus:ring-beastly-green/30 transition-colors resize-none font-bold"
            />

            <button
              onClick={handleGenerate}
              disabled={isLoading || !brief.trim()}
              className="w-full py-5 bg-beastly-green text-beastly-dark rounded-full font-extrabold flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-50 disabled:hover:brightness-100 uppercase tracking-wider"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <Send size={20} />
                  Convert to Social
                </>
              )}
            </button>
          </div>

          {/* Results Section */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Hooks */}
                <div className="p-7 bg-beastly-beige rounded-2xl">
                  <h3 className="text-xl font-black mb-5 flex items-center gap-2 text-beastly-dark">
                    <div className="w-9 h-9 rounded-full bg-beastly-orange flex items-center justify-center">
                      <Flame size={16} className="text-beastly-dark" />
                    </div>
                    Viral Hooks
                  </h3>
                  <div className="grid gap-3">
                    {result.hooks.map((hook: string, i: number) => (
                      <div key={i} className="group relative p-5 bg-beastly-dark rounded-2xl hover:ring-1 hover:ring-beastly-green/30 transition-all">
                        <p className="pr-10 text-sm font-bold leading-relaxed text-beastly-beige">{hook}</p>
                        <button
                          onClick={() => copyToClipboard(hook, `hook-${i}`)}
                          className="absolute top-5 right-5 text-beastly-beige/30 hover:text-beastly-green transition-colors"
                        >
                          {copied === `hook-${i}` ? <Check size={18} /> : <Copy size={18} />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Script */}
                <div className="p-7 bg-beastly-beige rounded-2xl">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-xl font-black text-beastly-dark">Natural Tone Script</h3>
                    <button
                      onClick={() => copyToClipboard(result.script, 'script')}
                      className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-beastly-dark/40 hover:text-beastly-dark transition-colors"
                    >
                      {copied === 'script' ? <Check size={16} /> : <Copy size={16} />}
                      Copy Script
                    </button>
                  </div>
                  <div className="prose prose-invert max-w-none bg-beastly-dark p-7 rounded-2xl text-beastly-beige">
                    <ReactMarkdown>{result.script}</ReactMarkdown>
                  </div>
                </div>

                {/* Caption */}
                <div className="p-7 bg-beastly-beige rounded-2xl">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-xl font-black text-beastly-dark">SEO Caption</h3>
                    <button
                      onClick={() => copyToClipboard(result.caption, 'caption')}
                      className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-beastly-dark/40 hover:text-beastly-dark transition-colors"
                    >
                      {copied === 'caption' ? <Check size={16} /> : <Copy size={16} />}
                      Copy Caption
                    </button>
                  </div>
                  <div className="bg-beastly-dark p-7 rounded-2xl font-mono text-sm text-beastly-beige/70 leading-relaxed">
                    {result.caption}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          <div className="p-7 bg-beastly-beige rounded-2xl">
            <h2 className="text-xl font-black mb-5 flex items-center gap-2 text-beastly-dark">
              <div className="w-9 h-9 rounded-full bg-beastly-green flex items-center justify-center">
                <Music size={16} className="text-beastly-dark" />
              </div>
              Trend-Match
            </h2>
            <div className="space-y-3">
              {[
                { title: 'Espresso - Sabrina Carpenter', trend: 'Rising', audio: '12.4k uses' },
                { title: 'Old Money Aesthetic', trend: 'Peak', audio: '8.2k uses' },
                { title: 'POV: You are at Fashion Week', trend: 'Rising', audio: '5.1k uses' },
              ].map((trend, i) => (
                <div key={i} className="p-4 bg-beastly-dark rounded-2xl hover:ring-1 hover:ring-beastly-green/30 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-extrabold text-sm text-beastly-beige group-hover:text-beastly-green transition-colors">{trend.title}</p>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-beastly-green">{trend.trend}</span>
                  </div>
                  <p className="text-[10px] font-extrabold text-beastly-beige/40 uppercase tracking-widest">{trend.audio}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-7 bg-beastly-green rounded-2xl text-beastly-dark">
            <h3 className="font-black text-xl mb-3">Pro Tip</h3>
            <p className="text-sm font-bold leading-relaxed opacity-70">
              Use the "Natural Tone" script as a base, but don't be afraid to ad-lib. Authenticity is the #1 driver of conversion this month.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
