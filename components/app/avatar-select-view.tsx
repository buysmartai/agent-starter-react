'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ArrowLeft, Check } from '@phosphor-icons/react';
import type { AvatarConfig } from '@/app-config';
import { Button } from '@/components/livekit/button';

interface AvatarSelectViewProps {
  avatars: AvatarConfig[];
  onAvatarSelect: (avatar: AvatarConfig) => void;
  onBack: () => void;
}

export const AvatarSelectView = ({
  avatars,
  onAvatarSelect,
  onBack,
  ref,
}: Omit<React.ComponentProps<'div'>, 'onSelect'> & AvatarSelectViewProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const t = useTranslations('avatarSelect');
  const tAvatars = useTranslations('avatars');

  const handleConfirm = () => {
    const avatar = avatars.find((a) => a.id === selectedId);
    if (avatar) {
      onAvatarSelect(avatar);
    }
  };

  // Get translated avatar name and description
  const getAvatarName = (avatar: AvatarConfig) => {
    try {
      return tAvatars(`${avatar.id}.name`);
    } catch {
      return avatar.name;
    }
  };

  const getAvatarDescription = (avatar: AvatarConfig) => {
    try {
      return tAvatars(`${avatar.id}.description`);
    } catch {
      return avatar.description;
    }
  };

  return (
    <div ref={ref} className="mx-auto w-full max-w-2xl px-4">
      <section className="bg-background flex flex-col items-center justify-center text-center">
        {/* Header */}
        <div className="mb-8 flex w-full items-center justify-between">
          <button
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm">{t('back')}</span>
          </button>
          <h1 className="text-foreground text-xl font-semibold">{t('title')}</h1>
          <div className="w-16" /> {/* Spacer for alignment */}
        </div>

        {/* Avatar description */}
        <p className="text-muted-foreground mb-8 max-w-prose leading-6">{t('description')}</p>

        {/* Avatar grid */}
        <div className="mb-8 grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
          {avatars.map((avatar) => (
            <button
              key={avatar.id}
              onClick={() => setSelectedId(avatar.id)}
              className={`relative flex flex-col items-center rounded-2xl border-2 p-6 transition-all duration-200 ${
                selectedId === avatar.id
                  ? 'border-primary bg-primary/5 scale-[1.02] shadow-lg'
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
              } `}
            >
              {/* Selection indicator */}
              {selectedId === avatar.id && (
                <div className="bg-primary absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full">
                  <Check size={14} weight="bold" className="text-primary-foreground" />
                </div>
              )}

              {/* Avatar image */}
              <div className="ring-background relative mb-4 h-52 w-40 overflow-hidden rounded-2xl shadow-md ring-4">
                <Image
                  src={avatar.image}
                  alt={getAvatarName(avatar)}
                  fill
                  className="object-cover object-top"
                  sizes="160px"
                />
              </div>

              {/* Avatar info */}
              <h3 className="text-foreground mb-1 text-lg font-semibold">
                {getAvatarName(avatar)}
              </h3>
              <p className="text-muted-foreground text-sm">{getAvatarDescription(avatar)}</p>
            </button>
          ))}
        </div>

        {/* Confirm button */}
        <Button
          variant="primary"
          size="lg"
          onClick={handleConfirm}
          disabled={!selectedId}
          className="w-64 font-mono"
        >
          {t('startChat')}
        </Button>
      </section>
    </div>
  );
};
