export interface AvatarConfig {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface AppConfig {
  pageTitle: string;
  pageDescription: string;
  companyName: string;

  supportsChatInput: boolean;
  supportsVideoInput: boolean;
  supportsScreenShare: boolean;
  isPreConnectBufferEnabled: boolean;

  logo: string;
  startButtonText: string;
  accent?: string;
  logoDark?: string;
  accentDark?: string;

  // for LiveKit Cloud Sandbox
  sandboxId?: string;
  agentName?: string;

  // Avatar configuration
  avatars: AvatarConfig[];
  avatarId?: string;
}

export const APP_CONFIG_DEFAULTS: AppConfig = {
  companyName: 'liveC',
  pageTitle: 'liveC Voice Agent',
  pageDescription: 'A voice agent built with liveC',

  supportsChatInput: true,
  supportsVideoInput: true,
  supportsScreenShare: true,
  isPreConnectBufferEnabled: true,

  logo: 'https://livec.ai/_next/image?url=%2Ficon-96.png&w=96&q=75',
  accent: '#002cf2',
  logoDark: 'https://livec.ai/_next/image?url=%2Ficon-96.png&w=96&q=75',
  accentDark: '#1fd5f9',
  startButtonText: 'Start call',

  // for LiveKit Cloud Sandbox
  sandboxId: undefined,
  agentName: undefined,

  // Avatar configuration
  avatars: [
    {
      id: 'avatar_male_001',
      name: 'Michael',
      description: 'Senior social worker, specializing in counseling',
      image: '/avatars/avatar-male.jpg',
    },
    {
      id: 'avatar_female_001',
      name: 'Sarah',
      description: 'Professional social worker, dedicated to community service',
      image: '/avatars/avatar-female.jpg',
    },
  ],
  avatarId: undefined,
};
