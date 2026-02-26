import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Download, ExternalLink, Image, Music, Link } from 'lucide-react';
import { getInfluencerByToken, mockEvent } from '../../lib/mockData';

type AssetType = 'image' | 'audio' | 'link';

const typeConfig: Record<AssetType, { Icon: React.ElementType; label: string; color: string }> = {
  image: { Icon: Image, label: 'Image', color: 'bg-beastly-blue/20 text-beastly-blue' },
  audio: { Icon: Music, label: 'Audio', color: 'bg-beastly-orange/20 text-beastly-orange' },
  link: { Icon: Link, label: 'Lien', color: 'bg-beastly-green/20 text-beastly-green' },
};

export default function EventAssets() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const influencer = token ? getInfluencerByToken(token) : null;
  const [downloaded, setDownloaded] = useState<Set<string>>(new Set());

  const handleDownload = (id: string) => {
    setDownloaded(prev => new Set(prev).add(id));
    setTimeout(() => {
      setDownloaded(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 2000);
  };

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

      <div className="px-5 pb-10 space-y-5 max-w-lg mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-black text-beastly-beige">📦 Ressources créatives</h1>
          <p className="text-sm font-bold text-beastly-beige/40 mt-1">
            Télécharge les éléments pour tes contenus.
          </p>
        </div>

        {/* Asset count */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-beastly-beige/10 border border-beastly-beige/10 rounded-full w-fit">
          <span className="w-2 h-2 rounded-full bg-beastly-green" />
          <span className="text-xs font-extrabold text-beastly-beige/60 uppercase tracking-wider">
            {mockEvent.assets.length} assets disponibles
          </span>
        </div>

        {/* Assets list */}
        <div className="space-y-3">
          {mockEvent.assets.map((asset, i) => {
            const config = typeConfig[asset.type];
            const isLink = asset.type === 'link';
            const isDone = downloaded.has(asset.id);

            return (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="p-5 bg-beastly-beige rounded-2xl flex items-center gap-4"
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${config.color.split(' ')[0]}`}>
                  <config.Icon size={20} className={config.color.split(' ')[1]} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-black text-beastly-dark text-sm truncate">{asset.name}</p>
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${config.color} mt-0.5 inline-block`}>
                    {config.label}
                  </span>
                </div>

                {/* Action */}
                {isLink ? (
                  <a
                    href={(asset as any).url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-beastly-dark text-beastly-beige text-xs font-extrabold rounded-xl uppercase tracking-wider hover:bg-beastly-dark/80 transition-all shrink-0"
                  >
                    <ExternalLink size={12} />
                    Ouvrir
                  </a>
                ) : (
                  <a
                    href={(asset as any).file}
                    download={asset.name}
                    onClick={() => handleDownload(asset.id)}
                    className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-extrabold rounded-xl uppercase tracking-wider transition-all shrink-0 ${
                      isDone
                        ? 'bg-beastly-green text-beastly-dark'
                        : 'bg-beastly-dark text-beastly-beige hover:bg-beastly-dark/80'
                    }`}
                  >
                    <Download size={12} />
                    {isDone ? 'Téléchargé ✓' : 'Télécharger'}
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Download all (placeholder) */}
        <button
          onClick={() => {
            mockEvent.assets.forEach(a => setDownloaded(prev => new Set(prev).add(a.id)));
          }}
          className="w-full py-4 bg-beastly-beige/10 border border-beastly-beige/10 text-beastly-beige/60 rounded-2xl font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-beastly-beige/15 transition-all"
        >
          <Download size={15} />
          Tout télécharger
        </button>
      </div>
    </div>
  );
}
