import React, { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Upload, BarChart3, X, CheckCircle2, Image, FileVideo } from 'lucide-react';
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
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple: true,
  });

  return (
    <div className="space-y-3">
      <div
        {...getRootProps()}
        className={[
          'border-2 border-dashed rounded-2xl p-8 flex flex-col items-center gap-3 cursor-pointer transition-all',
          isDragActive
            ? 'border-beastly-green bg-beastly-green/10 scale-[1.01]'
            : 'border-beastly-beige/20 hover:border-beastly-beige/40 hover:bg-beastly-beige/5',
        ].join(' ')}
      >
        <input {...getInputProps()} />
        <div className="w-14 h-14 bg-beastly-beige/10 rounded-full flex items-center justify-center">
          <Upload size={24} className={isDragActive ? 'text-beastly-green' : 'text-beastly-beige/40'} />
        </div>
        <div className="text-center">
          <p className="font-extrabold text-beastly-beige text-sm">
            {isDragActive ? 'Dépose ici !' : label}
          </p>
          <p className="text-xs font-bold text-beastly-beige/30 mt-0.5">
            Glisse-dépose ou clique pour sélectionner
          </p>
        </div>
      </div>

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
