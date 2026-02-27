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

import { Brief, SelectedInfluencer } from './types';
import ProcessStepper from './components/ProcessStepper';

// Portail OPS — espace interne Beastly
function OPSPortal() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeBrief, setActiveBrief] = useState<Brief | null>(null);
  const [selectedInfluencers, setSelectedInfluencers] = useState<SelectedInfluencer[]>([]);
  const [invitationSent, setInvitationSent] = useState(false);
  const [assetsSent, setAssetsSent] = useState(false);
  const [contractSent, setContractSent] = useState(false);

  // Stepper: computed from state
  const campaignStep = !activeBrief ? 0
    : contractSent ? 5
    : assetsSent ? 4
    : invitationSent ? 3
    : selectedInfluencers.length > 0 ? 2
    : 1;

  const handleSetActiveBrief = (brief: Brief | null) => {
    setActiveBrief(brief);
    if (!brief) { setInvitationSent(false); setSelectedInfluencers([]); setAssetsSent(false); setContractSent(false); }
  };

  const handleInviteSelection = (selected: SelectedInfluencer[]) => {
    setSelectedInfluencers(selected);
    setInvitationSent(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard onNavigate={setActiveTab} activeBrief={activeBrief} setActiveBrief={handleSetActiveBrief} />;
      case 'events':    return <Events />;
      case 'creators':  return <Creators activeBrief={activeBrief} onSelectionChange={handleInviteSelection} />;
      case 'contents':  return <Contents />;
      case 'admin':     return <Finance selectedInfluencers={selectedInfluencers} onContractSent={() => setContractSent(true)} />;
      case 'assetbox':  return <AssetBox invitedInfluencers={selectedInfluencers} onAssetsSent={() => setAssetsSent(true)} />;
      case 'trends':    return <Trends />;
      default:          return <Dashboard onNavigate={setActiveTab} activeBrief={activeBrief} setActiveBrief={handleSetActiveBrief} campaignStep={campaignStep} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
      <ProcessStepper currentStep={campaignStep} onNavigate={setActiveTab} />
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
