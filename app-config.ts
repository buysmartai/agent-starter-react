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
  companyName: 'LiveKit',
  pageTitle: 'LiveKit Voice Agent',
  pageDescription: 'A voice agent built with LiveKit',

  supportsChatInput: true,
  supportsVideoInput: true,
  supportsScreenShare: true,
  isPreConnectBufferEnabled: true,

  logo: '/lk-logo.svg',
  accent: '#002cf2',
  logoDark: '/lk-logo-dark.svg',
  accentDark: '#1fd5f9',
  startButtonText: 'Start call',

  // for LiveKit Cloud Sandbox
  sandboxId: undefined,
  agentName: undefined,

  // Avatar configuration
  avatars: [
    {
      id: '80aee5e80c2e482fb1348adaeb19d421',
      name: '李明',
      description: '资深社工，擅长心理辅导',
      image: '/avatars/avatar-male.jpg',
    },
    {
      id: '80aee5e80c2e482fb1348adaeb19d421',
      name: '王芳',
      description: '专业社工，热心服务社区',
      image: '/avatars/avatar-female.jpg',
    },
  ],
  avatarId: undefined,
};
