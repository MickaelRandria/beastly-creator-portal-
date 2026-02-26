import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Creators from './pages/Creators';
import Contents from './pages/Contents';
import Finance from './pages/Finance';
import AssetBox from './pages/AssetBox';
import Trends from './pages/Trends';

// Influencer event flow
import EventSplash from './pages/event/EventSplash';
import EventRSVP from './pages/event/EventRSVP';
import EventDashboard from './pages/event/EventDashboard';
import EventBrief from './pages/event/EventBrief';
import EventAI from './pages/event/EventAI';
import EventAssets from './pages/event/EventAssets';
import EventQRCode from './pages/event/EventQRCode';
import EventUpload from './pages/event/EventUpload';

// Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminScan from './pages/admin/AdminScan';

import { Contract, Brief } from './types';

const INITIAL_CONTRACTS: Contract[] = [
  { id: 'c1', name: 'Accord-cadre Beastly', brand: 'Beastly Agency', campaignName: 'Conditions générales OPS', value: 0, status: 'Signed', date: 'Expire Déc 2025' },
  { id: 'c2', name: 'Contrat Event Jacquemus AW25', brand: 'Jacquemus', campaignName: 'Soirée Lancement AW25', value: 8500, status: 'Signed', date: 'Signé Fév 2025' },
  { id: 'c3', name: 'Contrat Pop-up Nike', brand: 'Nike', campaignName: 'Pop-up Store Experience', value: 12000, status: 'Pending', date: 'Envoyé Fév 2025' },
  { id: 'c4', name: 'Contrat Brunch Sézane', brand: 'Sézane', campaignName: 'Brunch Créateurs Printemps', value: 5500, status: 'Pending', date: 'En attente signature' },
  { id: 'c5', name: 'Contrat Galeries Lafayette', brand: 'Galeries Lafayette', campaignName: 'Défilé Influenceurs', value: 15000, status: 'Signed', date: 'Signé Jan 2025' },
];

// Portail OPS — espace interne Beastly
function OPSPortal() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [contracts, setContracts] = useState<Contract[]>(INITIAL_CONTRACTS);
  const [activeBrief, setActiveBrief] = useState<Brief | null>(null);

  const handleSignContract = (id: string) => {
    setContracts(prev => prev.map(c => c.id === id ? { ...c, status: 'Signed' } : c));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard onNavigate={setActiveTab} activeBrief={activeBrief} setActiveBrief={setActiveBrief} />;
      case 'events':    return <Events />;
      case 'creators':  return <Creators activeBrief={activeBrief} />;
      case 'contents':  return <Contents />;
      case 'admin':     return <Finance balance={0} contracts={contracts} onSign={handleSignContract} onWithdraw={() => false} />;
      case 'assetbox':  return <AssetBox />;
      case 'trends':    return <Trends />;
      default:          return <Dashboard onNavigate={setActiveTab} activeBrief={activeBrief} setActiveBrief={setActiveBrief} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Espace créateur — mobile, token-based */}
      <Route path="/event/:token"           element={<EventSplash />} />
      <Route path="/event/:token/rsvp"      element={<EventRSVP />} />
      <Route path="/event/:token/dashboard" element={<EventDashboard />} />
      <Route path="/event/:token/brief"     element={<EventBrief />} />
      <Route path="/event/:token/ai"        element={<EventAI />} />
      <Route path="/event/:token/assets"    element={<EventAssets />} />
      <Route path="/event/:token/qrcode"    element={<EventQRCode />} />
      <Route path="/event/:token/upload"    element={<EventUpload />} />

      {/* Admin check-in */}
      <Route path="/admin"      element={<AdminDashboard />} />
      <Route path="/admin/scan" element={<AdminScan />} />

      {/* Portail OPS interne Beastly */}
      <Route path="*" element={<OPSPortal />} />
    </Routes>
  );
}
