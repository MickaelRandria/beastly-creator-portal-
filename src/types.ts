export interface Deliverable {
  id: string;
  title: string;
  status: 'Pending' | 'In Review' | 'Approved';
  deadline: string;
}

export interface Campaign {
  id: string;
  brand: string;
  name: string;
  status: 'Active' | 'Pending' | 'Completed' | 'Paid';
  deadline: string;
  earnings: number;
  image: string;
  deliverables: Deliverable[];
}

export interface Contract {
  id: string;
  name: string;
  brand: string;
  campaignName: string;
  value: number;
  status: 'Signed' | 'Pending';
  date: string;
}

export interface Stats {
  storyViews: number;
  linkClicks: number;
  sentiment: number; // 0-100
}

export interface AIStudioOutput {
  hooks: string[];
  script: string;
  caption: string;
}

export interface Brief {
  brand: string;
  campaignName: string;
  targetReach: number;
  targetEMV: number;
  budget: number;
  niche: string;
  dates: string;
  deliverables: string[];
}

export interface SelectedInfluencer {
  id: string;
  name: string;
  handle: string;
  followers: number;
  engagement: number;
  platform: string;
  niche: string;
  avatar: string;
}
