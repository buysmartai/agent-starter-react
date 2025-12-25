'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { RoomContext } from '@livekit/components-react';
import { APP_CONFIG_DEFAULTS, type AppConfig, type AvatarConfig } from '@/app-config';
import { useRoom } from '@/hooks/useRoom';

export type ViewState = 'welcome' | 'avatar-select' | 'session';

const SessionContext = createContext<{
  appConfig: AppConfig;
  viewState: ViewState;
  selectedAvatar: AvatarConfig | null;
  isSessionActive: boolean;
  goToAvatarSelect: () => void;
  goToWelcome: () => void;
  selectAvatarAndStartSession: (avatar: AvatarConfig) => void;
  endSession: () => void;
}>({
  appConfig: APP_CONFIG_DEFAULTS,
  viewState: 'welcome',
  selectedAvatar: null,
  isSessionActive: false,
  goToAvatarSelect: () => {},
  goToWelcome: () => {},
  selectAvatarAndStartSession: () => {},
  endSession: () => {},
});

interface SessionProviderProps {
  appConfig: AppConfig;
  children: React.ReactNode;
}

export const SessionProvider = ({
  appConfig: initialAppConfig,
  children,
}: SessionProviderProps) => {
  const [viewState, setViewState] = useState<ViewState>('welcome');
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarConfig | null>(null);

  // Create appConfig with selected avatarId
  const appConfig = useMemo(
    () => ({
      ...initialAppConfig,
      avatarId: selectedAvatar?.id,
    }),
    [initialAppConfig, selectedAvatar]
  );

  const { room, isSessionActive, startSession, endSession: roomEndSession } = useRoom(appConfig);

  const goToAvatarSelect = useCallback(() => {
    setViewState('avatar-select');
  }, []);

  const goToWelcome = useCallback(() => {
    setViewState('welcome');
    setSelectedAvatar(null);
  }, []);

  const selectAvatarAndStartSession = useCallback(
    (avatar: AvatarConfig) => {
      setSelectedAvatar(avatar);
      setViewState('session');
      // Start session with avatarId directly (don't wait for state update)
      startSession(avatar.id);
    },
    [startSession]
  );

  const endSession = useCallback(() => {
    roomEndSession();
    setViewState('welcome');
    setSelectedAvatar(null);
  }, [roomEndSession]);

  const contextValue = useMemo(
    () => ({
      appConfig,
      viewState,
      selectedAvatar,
      isSessionActive,
      goToAvatarSelect,
      goToWelcome,
      selectAvatarAndStartSession,
      endSession,
    }),
    [
      appConfig,
      viewState,
      selectedAvatar,
      isSessionActive,
      goToAvatarSelect,
      goToWelcome,
      selectAvatarAndStartSession,
      endSession,
    ]
  );

  return (
    <RoomContext.Provider value={room}>
      <SessionContext.Provider value={contextValue}>{children}</SessionContext.Provider>
    </RoomContext.Provider>
  );
};

export function useSession() {
  return useContext(SessionContext);
}
