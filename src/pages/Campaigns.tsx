import React from 'react';
import {
  Calendar,
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Campaign } from '../types';

interface CampaignsProps {
  campaign: Campaign;
  onUpdateStatus: (deliverableId: string, status: any) => void;
  onNavigateToStudio: () => void;
}

export default function Campaigns({ campaign, onUpdateStatus, onNavigateToStudio }: CampaignsProps) {
  const [isUploading, setIsUploading] = React.useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      const pending = campaign.deliverables.find(d => d.status === 'Pending');
      if (pending) {
        onUpdateStatus(pending.id, 'In Review');
      }
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className={`px-3 py-1.5 ${campaign.status === 'Active' ? 'bg-beastly-green/20 text-beastly-green' : 'bg-beastly-beige/20 text-beastly-beige/60'} text-[10px] font-extrabold rounded-full uppercase tracking-widest`}>
              {campaign.status}
            </span>
            <span className="text-beastly-beige/40 text-[10px] font-extrabold uppercase tracking-widest">Campaign ID: #{campaign.id.toUpperCase()}</span>
          </div>
          <h1 className="text-4xl font-black text-beastly-beige">{campaign.brand} — {campaign.name}</h1>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-4 bg-beastly-beige/10 rounded-full font-extrabold text-sm text-beastly-beige hover:bg-beastly-beige/20 transition-colors">
            Brand Assets
          </button>
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="px-8 py-4 bg-beastly-green text-beastly-dark rounded-full font-extrabold text-sm flex items-center gap-2 disabled:opacity-50 hover:brightness-110 transition-all"
          >
            {isUploading ? <Loader2 className="animate-spin" size={20} /> : 'Submit Preview'}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Guidelines & Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Brand Guidelines */}
          <div className="p-7 bg-beastly-beige rounded-2xl">
            <h2 className="text-2xl font-black mb-7 flex items-center gap-3 text-beastly-dark">
              <div className="w-9 h-9 rounded-full bg-beastly-blue flex items-center justify-center">
                <FileText size={16} className="text-beastly-dark" />
              </div>
              Brand Guidelines
            </h2>
            <div className="space-y-6 text-beastly-dark/60 leading-relaxed font-bold">
              <section>
                <h3 className="text-beastly-dark font-extrabold mb-3 uppercase tracking-widest text-xs">The Vibe</h3>
                <p>Urban, sophisticated, and high-energy. Focus on the transition between street style and high fashion. Use fast cuts and dynamic camera movements.</p>
              </section>
              <section>
                <h3 className="text-beastly-dark font-extrabold mb-3 uppercase tracking-widest text-xs">Key Messaging</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-beastly-green mt-2 shrink-0" />
                    "Fashion Week isn't just for the runway."
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-beastly-green mt-2 shrink-0" />
                    Highlight the versatility of the new {campaign.brand} collection.
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-beastly-green mt-2 shrink-0" />
                    Call to action: Use code BEASTLY20 for 20% off.
                  </li>
                </ul>
              </section>
            </div>
          </div>

          {/* Deliverables */}
          <div className="p-7 bg-beastly-beige rounded-2xl">
            <h2 className="text-2xl font-black mb-7 text-beastly-dark">Deliverables</h2>
            <div className="space-y-3">
              {campaign.deliverables.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-5 bg-beastly-dark rounded-2xl">
                  <div className="flex items-center gap-4">
                    {item.status === 'Approved' ? (
                      <div className="w-8 h-8 rounded-full bg-beastly-green/20 flex items-center justify-center">
                        <CheckCircle2 className="text-beastly-green" size={18} />
                      </div>
                    ) : item.status === 'In Review' ? (
                      <div className="w-8 h-8 rounded-full bg-beastly-orange/20 flex items-center justify-center">
                        <AlertCircle className="text-beastly-orange" size={18} />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full border-2 border-beastly-beige/20" />
                    )}
                    <div>
                      <p className="font-extrabold text-beastly-beige">{item.title}</p>
                      <p className="text-[10px] font-extrabold text-beastly-beige/40 uppercase tracking-widest">Deadline: {item.deadline}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {item.title.includes('TikTok') && (
                      <button
                        onClick={onNavigateToStudio}
                        className="px-4 py-2 bg-beastly-green/10 text-beastly-green border border-beastly-green/20 rounded-full text-[10px] font-extrabold uppercase tracking-widest hover:bg-beastly-green hover:text-beastly-dark transition-all flex items-center gap-2 group"
                      >
                        <Loader2 size={12} className="group-hover:animate-spin" />
                        AI Ideas
                      </button>
                    )}
                    <span className={`text-[10px] font-extrabold px-4 py-1.5 rounded-full uppercase tracking-widest ${item.status === 'Approved' ? 'bg-beastly-green/10 text-beastly-green' :
                      item.status === 'In Review' ? 'bg-beastly-orange/10 text-beastly-orange' :
                        'bg-beastly-beige/10 text-beastly-beige/50'
                      }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
              {campaign.deliverables.length === 0 && (
                <p className="text-beastly-dark/40 text-center py-12 font-extrabold uppercase tracking-widest text-xs">No active deliverables for this campaign.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Deadlines & Upload */}
        <div className="space-y-6">
          {/* Deadline Widget */}
          <div className="p-7 bg-beastly-beige rounded-2xl">
            <h2 className="text-xl font-black mb-7 flex items-center gap-3 text-beastly-dark">
              <div className="w-9 h-9 rounded-full bg-beastly-orange flex items-center justify-center">
                <Calendar size={16} className="text-beastly-dark" />
              </div>
              Timeline
            </h2>
            <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-beastly-dark/10">
              {[
                { date: 'Oct 20', event: 'Briefing Call', done: true },
                { date: 'Oct 22', event: 'Content Concept Due', done: true },
                { date: 'Oct 24', event: 'First Draft Submission', done: campaign.deliverables.some(d => d.status !== 'Pending') },
                { date: 'Oct 28', event: 'Final Posting Date', done: false },
              ].map((step, i) => (
                <div key={i} className="flex gap-5 relative">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 ${step.done ? 'bg-beastly-green' : 'bg-beastly-beige border-2 border-beastly-dark/10'}`}>
                    {step.done && <CheckCircle2 size={14} className="text-beastly-dark" />}
                  </div>
                  <div>
                    <p className={`text-sm font-extrabold ${step.done ? 'text-beastly-dark' : 'text-beastly-dark/40'}`}>{step.event}</p>
                    <p className="text-[10px] font-extrabold text-beastly-dark/30 uppercase tracking-widest mt-0.5">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upload Zone */}
          <div
            onClick={handleUpload}
            className="p-8 bg-beastly-beige border-2 border-dashed border-beastly-dark/15 rounded-2xl text-center group hover:border-beastly-green/50 transition-colors cursor-pointer"
          >
            <div className="w-14 h-14 bg-beastly-dark rounded-full flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
              {isUploading ? <Loader2 className="animate-spin text-beastly-green" size={24} /> : <Upload className="text-beastly-beige group-hover:text-beastly-green" size={24} />}
            </div>
            <h3 className="font-extrabold mb-1 text-beastly-dark">Upload Preview</h3>
            <p className="text-[10px] font-extrabold text-beastly-dark/40 uppercase tracking-widest mb-6">MP4, MOV or HEIC up to 500MB</p>
            <button className="w-full py-4 bg-beastly-dark rounded-full text-xs font-extrabold uppercase tracking-widest text-beastly-beige hover:bg-beastly-dark/80 transition-colors">
              {isUploading ? 'Uploading...' : 'Select Files'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
