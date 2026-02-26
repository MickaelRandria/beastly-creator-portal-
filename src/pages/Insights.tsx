import React from 'react';
import {
  BarChart3,
  Users,
  MousePointer2,
  Heart,
  Share2,
  MessageCircle,
  TrendingUp,
  ArrowUpRight,
  Globe,
  Smartphone,
  Monitor,
  Eye
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { motion } from 'motion/react';
import { GlowEye, GlowCursor, GlowArrow } from '../components/BeastlyIcons';

const performanceData = [
  { name: 'Mon', views: 12400, clicks: 840 },
  { name: 'Tue', views: 15600, clicks: 1100 },
  { name: 'Wed', views: 18200, clicks: 1400 },
  { name: 'Thu', views: 14800, clicks: 980 },
  { name: 'Fri', views: 22400, clicks: 1800 },
  { name: 'Sat', views: 28900, clicks: 2400 },
  { name: 'Sun', views: 24500, clicks: 1900 },
];

const audienceData = [
  { name: '18-24', value: 45 },
  { name: '25-34', value: 35 },
  { name: '35-44', value: 15 },
  { name: '45+', value: 5 },
];

const COLORS = ['#b4ff00', '#fc846d', '#b1def3', '#f1d8c4'];

export default function Insights() {
  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-beastly-beige">Insights Hub</h1>
          <p className="text-beastly-beige/40 mt-1 font-extrabold uppercase tracking-widest text-[11px]">Deep dive into your performance metrics and audience data.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2.5 bg-beastly-beige/10 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-beastly-beige border border-beastly-beige/10">Last 30 Days</button>
          <button className="px-4 py-2.5 bg-beastly-green text-beastly-dark rounded-full text-[10px] font-extrabold uppercase tracking-widest">Export Report</button>
        </div>
      </header>

      {/* ─── Editorial Stats Row (Beastly "A propos" style) ─── */}
      <div className="bg-beastly-beige rounded-2xl p-8 md:p-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {[
            {
              label: 'Story Views',
              value: '145.2k',
              icon: (
                <svg width="22" height="22" viewBox="0 0 120 120" fill="none">
                  <path d="M10 60C10 60 30 25 60 25C90 25 110 60 110 60C110 60 90 95 60 95C30 95 10 60 10 60Z" fill="#fc846d" stroke="#fc846d" strokeWidth="6" />
                  <circle cx="60" cy="60" r="14" fill="black" />
                </svg>
              )
            },
            {
              label: 'Link Clicks',
              value: '12,840',
              icon: (
                <svg width="20" height="20" viewBox="0 0 120 120" fill="none">
                  <path d="M25 15L25 95L45 70L70 105L80 98L55 63L85 55L25 15Z" fill="#b4ff00" stroke="#b4ff00" strokeWidth="4" />
                </svg>
              )
            },
            {
              label: 'Engagement',
              value: '5.8%',
              icon: (
                <svg width="22" height="22" viewBox="0 0 120 120" fill="none">
                  <path d="M60 100L20 60C10 45 15 25 35 20C50 16 58 28 60 35C62 28 70 16 85 20C105 25 110 45 100 60L60 100Z" fill="#fc846d" stroke="#fc846d" strokeWidth="4" />
                </svg>
              )
            },
            {
              label: 'Sentiment',
              value: '+94%',
              icon: (
                <svg width="18" height="18" viewBox="0 0 120 120" fill="none">
                  <path d="M60 15L100 85H20L60 15Z" fill="#b1def3" stroke="#b1def3" strokeWidth="4" />
                </svg>
              )
            },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              {/* Big number with superscript icon */}
              <div className="relative inline-flex items-start mb-3">
                <span className="text-5xl md:text-6xl font-black text-beastly-dark tracking-tight leading-none">
                  {stat.value}
                </span>
                <span className="absolute -top-1 -right-6">
                  {stat.icon}
                </span>
              </div>
              {/* Label pill */}
              <span className="px-5 py-1.5 border border-beastly-dark/15 rounded-full text-[11px] font-bold italic text-beastly-dark/60">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Performance Chart */}
        <div className="lg:col-span-2 p-7 bg-beastly-beige rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-7">
            <h2 className="text-2xl font-black text-beastly-dark">Performance Overview</h2>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-beastly-green" />
                <span className="text-[10px] font-extrabold text-beastly-dark/40 uppercase tracking-widest">Views</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-beastly-orange" />
                <span className="text-[10px] font-extrabold text-beastly-dark/40 uppercase tracking-widest">Clicks</span>
              </div>
            </div>
          </div>

          <div className="h-80 w-full bg-beastly-dark rounded-xl p-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1d8c4" opacity={0.1} vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#f1d8c4', fontSize: 10, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: 'rgba(241,216,196,0.05)' }}
                  contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(241,216,196,0.1)', borderRadius: '1rem', color: '#f1d8c4' }}
                />
                <Bar dataKey="views" fill="#b4ff00" radius={[6, 6, 0, 0]} barSize={32} />
                <Bar dataKey="clicks" fill="#fc846d" radius={[6, 6, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Decorative brand icon */}
          <GlowEye
            className="absolute -right-8 -top-6 opacity-[0.08] pointer-events-none"
            size={160}
            color="#fc846d"
          />
        </div>

        {/* Audience Demographics */}
        <div className="p-7 bg-beastly-beige rounded-2xl">
          <h2 className="text-2xl font-black mb-7 text-beastly-dark">Audience Age</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={audienceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {audienceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {audienceData.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-[10px] font-extrabold text-beastly-dark/40 uppercase tracking-widest">{item.name}</span>
                <span className="text-[10px] font-extrabold text-beastly-dark ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="p-7 bg-beastly-beige rounded-2xl">
          <h2 className="text-2xl font-black mb-7 text-beastly-dark">Device Usage</h2>
          <div className="space-y-5">
            {[
              { label: 'Mobile', value: 84, icon: Smartphone, color: 'bg-beastly-green' },
              { label: 'Desktop', value: 12, icon: Monitor, color: 'bg-beastly-orange' },
              { label: 'Tablet', value: 4, icon: Globe, color: 'bg-beastly-blue' },
            ].map((device, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <device.icon size={16} className="text-beastly-dark/40" />
                    <span className="text-[10px] font-extrabold text-beastly-dark/40 uppercase tracking-widest">{device.label}</span>
                  </div>
                  <span className="text-[10px] font-extrabold text-beastly-dark">{device.value}%</span>
                </div>
                <div className="h-2 w-full bg-beastly-dark/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${device.value}%` }}
                    transition={{ duration: 1, delay: i * 0.2 }}
                    className={`h-full ${device.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sentiment Analysis */}
        <div className="lg:col-span-2 p-7 bg-beastly-beige rounded-2xl relative overflow-hidden">
          <h2 className="text-2xl font-black mb-7 text-beastly-dark relative z-10">Audience Sentiment</h2>
          <GlowCursor
            className="absolute -left-6 -bottom-6 opacity-[0.07] pointer-events-none"
            size={140}
            color="#f1d8c4"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-beastly-dark rounded-2xl text-center">
              <div className="w-11 h-11 bg-beastly-green rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart size={18} className="text-beastly-dark" />
              </div>
              <p className="text-2xl font-black text-beastly-green">92%</p>
              <p className="text-[10px] font-extrabold text-beastly-beige/40 uppercase tracking-widest mt-1">Positive</p>
            </div>
            <div className="p-5 bg-beastly-dark rounded-2xl text-center">
              <div className="w-11 h-11 bg-beastly-blue rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageCircle size={18} className="text-beastly-dark" />
              </div>
              <p className="text-2xl font-black text-beastly-blue">6%</p>
              <p className="text-[10px] font-extrabold text-beastly-beige/40 uppercase tracking-widest mt-1">Neutral</p>
            </div>
            <div className="p-5 bg-beastly-dark rounded-2xl text-center">
              <div className="w-11 h-11 bg-beastly-orange rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp size={18} className="text-beastly-dark rotate-180" />
              </div>
              <p className="text-2xl font-black text-beastly-orange">2%</p>
              <p className="text-[10px] font-extrabold text-beastly-beige/40 uppercase tracking-widest mt-1">Negative</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
