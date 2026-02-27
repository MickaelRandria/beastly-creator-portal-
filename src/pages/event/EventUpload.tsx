import React, { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Upload, BarChart3, X, CheckCircle2, Image, FileVideo, Link2, Plus, Trash2, GalleryHorizontal } from 'lucide-react';
import { getInfluencerByToken } from '../../lib/mockData';
import { GlowLightning } from '../../components/BeastlyIcons';

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  status: 'uploading' | 'done';
}

function DropZone({
  label,
  accept,
  files,
  onDrop,
  onRemove,
}: {
  label: string;
  accept: Record<string, string[]>;
  files: UploadedFile[];
  onDrop: (accepted: File[]) => void;
  onRemove: (id: string) => void;
}) {
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept,
    multiple: true,
    noClick: false,
  });

  return (
    <div className="space-y-3">
      <div
        {...getRootProps()}
        className={[
          'border-2 border-dashed rounded-2xl cursor-pointer transition-all overflow-hidden',
          isDragActive
            ? 'border-beastly-green bg-beastly-green/10 scale-[1.01]'
            : 'border-beastly-dark/20 bg-beastly-dark/5 hover:border-beastly-dark/40 hover:bg-beastly-dark/10',
        ].join(' ')}
      >
        <input {...getInputProps()} />

        {/* Main drop area */}
        <div className="flex flex-col items-center gap-4 px-6 py-8">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${isDragActive ? 'bg-beastly-green text-beastly-dark' : 'bg-beastly-dark/10 text-beastly-dark/40'}`}>
            <Upload size={28} className={isDragActive ? 'animate-bounce' : ''} />
          </div>
          <div className="text-center space-y-1">
            <p className={`font-extrabold text-base transition-colors ${isDragActive ? 'text-beastly-green' : 'text-beastly-dark'}`}>
              {isDragActive ? '📂 Dépose ici !' : label}
            </p>
            <p className="text-xs font-bold text-beastly-dark/40">
              Glisse-dépose tes fichiers dans cette zone
            </p>
          </div>

          {/* Format pills */}
          {!isDragActive && (
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {Object.keys(accept).includes('image/*') && (
                <span className="flex items-center gap-1 px-3 py-1 bg-beastly-dark/10 rounded-full text-[10px] font-extrabold text-beastly-dark/50 uppercase tracking-wider">
                  <Image size={10} /> JPG · PNG · HEIC
                </span>
              )}
              {Object.keys(accept).includes('video/*') && (
                <span className="flex items-center gap-1 px-3 py-1 bg-beastly-dark/10 rounded-full text-[10px] font-extrabold text-beastly-dark/50 uppercase tracking-wider">
                  <FileVideo size={10} /> MP4 · MOV · Reels
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Gallery button */}
      <button
        type="button"
        onClick={e => { e.stopPropagation(); open(); }}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-beastly-dark text-beastly-beige text-xs font-extrabold uppercase tracking-wider hover:bg-beastly-dark/80 transition-all"
      >
        <GalleryHorizontal size={14} /> Choisir depuis la galerie
      </button>

      {/* Previews */}
      {files.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          <AnimatePresence>
            {files.map(f => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                className="relative group"
              >
                {f.file.type.startsWith('image/') ? (
                  <img
                    src={f.preview}
                    alt={f.file.name}
                    className="w-full aspect-square object-cover rounded-xl border border-beastly-beige/10"
                  />
                ) : (
                  <div className="w-full aspect-square bg-beastly-beige/10 rounded-xl flex flex-col items-center justify-center gap-1">
                    <FileVideo size={20} className="text-beastly-beige/40" />
                    <p className="text-[9px] font-bold text-beastly-beige/40 px-2 text-center truncate w-full">{f.file.name}</p>
                  </div>
                )}

                {/* Status overlay */}
                <div className={`absolute inset-0 rounded-xl flex items-center justify-center transition-all ${
                  f.status === 'uploading' ? 'bg-beastly-dark/50' : 'bg-beastly-green/20 opacity-0'
                }`}>
                  {f.status === 'uploading' && (
                    <div className="w-5 h-5 border-2 border-beastly-green/30 border-t-beastly-green rounded-full animate-spin" />
                  )}
                </div>

                {f.status === 'done' && (
                  <div className="absolute top-1 right-1 w-5 h-5 bg-beastly-green rounded-full flex items-center justify-center">
                    <CheckCircle2 size={12} className="text-beastly-dark" />
                  </div>
                )}

                <button
                  onClick={() => onRemove(f.id)}
                  className="absolute top-1 left-1 w-5 h-5 bg-beastly-dark/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={10} className="text-beastly-beige" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default function EventUpload() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const influencer = token ? getInfluencerByToken(token) : null;

  const [contentFiles, setContentFiles] = useState<UploadedFile[]>([]);
  const [statsFiles, setStatsFiles] = useState<UploadedFile[]>([]);
  const [postLinks, setPostLinks] = useState<string[]>(['']);

  const addLink = () => setPostLinks(prev => [...prev, '']);
  const updateLink = (i: number, val: string) => setPostLinks(prev => prev.map((l, idx) => idx === i ? val : l));
  const removeLink = (i: number) => setPostLinks(prev => prev.filter((_, idx) => idx !== i));

  const addFiles = (
    setter: React.Dispatch<React.SetStateAction<UploadedFile[]>>,
    accepted: File[]
  ) => {
    const newFiles: UploadedFile[] = accepted.map(file => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      file,
      preview: URL.createObjectURL(file),
      status: 'uploading' as const,
    }));

    setter(prev => [...prev, ...newFiles]);

    // Simulate upload
    newFiles.forEach(nf => {
      setTimeout(() => {
        setter(prev => prev.map(f => f.id === nf.id ? { ...f, status: 'done' } : f));
      }, 1200 + Math.random() * 800);
    });
  };

  const removeFile = (
    setter: React.Dispatch<React.SetStateAction<UploadedFile[]>>,
    id: string
  ) => {
    setter(prev => {
      const file = prev.find(f => f.id === id);
      if (file) URL.revokeObjectURL(file.preview);
      return prev.filter(f => f.id !== id);
    });
  };

  const totalDone = [...contentFiles, ...statsFiles].filter(f => f.status === 'done').length;
  const total = contentFiles.length + statsFiles.length;
  const allDone = total > 0 && totalDone === total;
  // Fake reach stat for the impact message
  const fakeReach = contentFiles.length * 7400 + statsFiles.length * 3200;

  if (!influencer) {
    return (
      <div className="min-h-screen bg-beastly-dark flex items-center justify-center">
        <p className="text-beastly-beige/40 font-bold">Token invalide</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beastly-dark relative overflow-x-hidden">
      <GlowLightning className="absolute -bottom-10 -left-10 opacity-10 pointer-events-none" size={200} color="#b4ff00" />

      {/* Top bar */}
      <div className="px-5 pt-8 pb-4 flex items-center gap-3 relative z-10">
        <button
          onClick={() => navigate(`/event/${token}/dashboard`)}
          className="flex items-center gap-2 px-4 py-2 bg-beastly-beige rounded-full text-sm font-bold text-beastly-dark hover:bg-beastly-beige/80 transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          Retour
        </button>
      </div>

      <div className="px-5 pb-10 space-y-5 max-w-lg mx-auto relative z-10">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-black text-beastly-beige">Dépôt de contenus</h1>
          <p className="text-sm font-bold text-beastly-beige/40 mt-1">
            Envoie tes créations et screenshots de stats.
          </p>
        </div>

        {/* Summary if files */}
        {total > 0 && (
          <div className="flex items-center gap-2 px-4 py-2.5 bg-beastly-green/10 border border-beastly-green/20 rounded-full w-fit">
            <CheckCircle2 size={13} className="text-beastly-green" />
            <span className="text-xs font-extrabold text-beastly-green uppercase tracking-wider">
              {totalDone}/{total} uploadé{totalDone > 1 ? 's' : ''}
            </span>
          </div>
        )}

        {/* Section 0: Post links */}
        <div className="p-6 bg-beastly-beige rounded-2xl space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-beastly-dark rounded-xl flex items-center justify-center">
              <Link2 size={16} className="text-beastly-blue" />
            </div>
            <div>
              <p className="font-black text-beastly-dark text-base">🔗 Liens des posts publiés</p>
              <p className="text-[11px] font-bold text-beastly-dark/50">Colle ici les URLs de tes publications</p>
            </div>
          </div>
          <div className="space-y-2">
            {postLinks.map((link, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="url"
                  value={link}
                  onChange={e => updateLink(i, e.target.value)}
                  placeholder="https://www.tiktok.com/@tonprofil/video/..."
                  className="flex-1 bg-beastly-dark/5 border border-beastly-dark/10 rounded-xl px-4 py-2.5 text-sm font-bold text-beastly-dark placeholder:text-beastly-dark/30 focus:outline-none focus:border-beastly-dark/30"
                />
                {postLinks.length > 1 && (
                  <button
                    onClick={() => removeLink(i)}
                    className="w-9 h-9 rounded-xl bg-beastly-dark/5 flex items-center justify-center hover:bg-beastly-orange/20 transition-colors shrink-0"
                  >
                    <Trash2 size={14} className="text-beastly-dark/40" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={addLink}
            className="flex items-center gap-2 text-xs font-extrabold text-beastly-dark/50 hover:text-beastly-dark transition-colors"
          >
            <Plus size={14} /> Ajouter un lien
          </button>
        </div>

        {/* Section 1: Contenus */}
        <div className="p-6 bg-beastly-beige rounded-2xl space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-beastly-dark rounded-xl flex items-center justify-center">
              <Image size={16} className="text-beastly-green" />
            </div>
            <div>
              <p className="font-black text-beastly-dark text-base">📤 Contenus créés</p>
              <p className="text-[11px] font-bold text-beastly-dark/50">Photos, vidéos, stories</p>
            </div>
          </div>
          <DropZone
            label="Dépose tes contenus ici"
            accept={{ 'image/*': [], 'video/*': [] }}
            files={contentFiles}
            onDrop={files => addFiles(setContentFiles, files)}
            onRemove={id => removeFile(setContentFiles, id)}
          />
        </div>

        {/* Section 2: Stats */}
        <div className="p-6 bg-beastly-beige rounded-2xl space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-beastly-dark rounded-xl flex items-center justify-center">
              <BarChart3 size={16} className="text-beastly-orange" />
            </div>
            <div>
              <p className="font-black text-beastly-dark text-base">📊 Screenshots de stats</p>
              <p className="text-[11px] font-bold text-beastly-dark/50">Vues, likes, impressions</p>
            </div>
          </div>
          <DropZone
            label="Dépose tes screenshots ici"
            accept={{ 'image/*': [] }}
            files={statsFiles}
            onDrop={files => addFiles(setStatsFiles, files)}
            onRemove={id => removeFile(setStatsFiles, id)}
          />
        </div>

        {/* Impact message — apparaît quand tout est uploadé */}
        <AnimatePresence>
          {allDone && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6 bg-beastly-green rounded-2xl space-y-3"
            >
              <p className="text-2xl">🎉</p>
              <h3 className="text-xl font-black text-beastly-dark">Merci {influencer.firstName} !</h3>
              <p className="text-sm font-bold text-beastly-dark/70 leading-relaxed">
                Tes contenus ont été transmis à l'équipe Beastly. Ton contenu a déjà touché{' '}
                <span className="font-black text-beastly-dark">
                  {fakeReach.toLocaleString('fr-FR')} personnes
                </span>{' '}
                — incroyable impact ! 🚀
              </p>
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-beastly-dark/50">
                Tu recevras le bilan de campagne dans 48h.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
