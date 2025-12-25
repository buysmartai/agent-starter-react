'use client';

import { useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useRoomContext } from '@livekit/components-react';
import { AvatarSelectView } from '@/components/app/avatar-select-view';
import { useSession } from '@/components/app/session-provider';
import { SessionView } from '@/components/app/session-view';
import { WelcomeView } from '@/components/app/welcome-view';

const MotionWelcomeView = motion.create(WelcomeView);
const MotionSessionView = motion.create(SessionView);
const MotionAvatarSelectView = motion.create(AvatarSelectView);

const VIEW_MOTION_PROPS = {
  variants: {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
  transition: {
    duration: 0.5,
    ease: 'linear',
  },
};

export function ViewController() {
  const room = useRoomContext();
  const isSessionActiveRef = useRef(false);
  const {
    appConfig,
    viewState,
    isSessionActive,
    goToAvatarSelect,
    goToWelcome,
    selectAvatarAndStartSession,
  } = useSession();

  // animation handler holds a reference to stale isSessionActive value
  isSessionActiveRef.current = isSessionActive;

  // disconnect room after animation completes
  const handleAnimationComplete = () => {
    if (!isSessionActiveRef.current && room.state !== 'disconnected') {
      room.disconnect();
    }
  };

  return (
    <AnimatePresence mode="wait">
      {/* Welcome screen */}
      {viewState === 'welcome' && (
        <MotionWelcomeView key="welcome" {...VIEW_MOTION_PROPS} onStartCall={goToAvatarSelect} />
      )}
      {/* Avatar selection screen */}
      {viewState === 'avatar-select' && (
        <MotionAvatarSelectView
          key="avatar-select"
          {...VIEW_MOTION_PROPS}
          avatars={appConfig.avatars}
          onAvatarSelect={selectAvatarAndStartSession}
          onBack={goToWelcome}
        />
      )}
      {/* Session view */}
      {viewState === 'session' && (
        <MotionSessionView
          key="session-view"
          {...VIEW_MOTION_PROPS}
          appConfig={appConfig}
          onAnimationComplete={handleAnimationComplete}
        />
      )}
    </AnimatePresence>
  );
}
