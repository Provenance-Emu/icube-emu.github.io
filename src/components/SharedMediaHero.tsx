'use client';

import { useRef, useState, type ReactNode } from 'react';
import styles from './shared-media-hero.module.css';

type Clip = {
  src: string;
  poster: string;
  label: string;
  width: number;
  height: number;
};

type Props = {
  brand: 'fly' | 'cube';
  title: string;
  description: string;
  actions: ReactNode;
  primary: Clip;
  companion: Clip;
  detail?: string;
};

export default function SharedMediaHero({ brand, title, description, actions, primary, companion, detail }: Props) {
  const stage = useRef<HTMLDivElement>(null);
  const manuallyStarted = useRef(false);
  const [playing, setPlaying] = useState(false);

  const clips = () => Array.from(stage.current?.querySelectorAll('video') ?? []);
  const start = () => {
    const [lead, ...others] = clips();
    if (!lead) return;
    others.forEach(clip => { clip.currentTime = lead.currentTime; });
    void lead.play().catch(() => {});
    others.forEach(clip => { void clip.play().catch(() => {}); });
  };
  const stop = () => clips().forEach(clip => clip.pause());

  return (
    <section className={styles.hero} data-brand={brand}>
      <div className={styles.layout}>
        <header className={styles.copy}>
          <h1>{title}</h1>
          <p>{description}</p>
        </header>
        <div className={styles.actions}>{actions}</div>
        <div className={styles.media}>
          <div
            className={styles.stage}
            ref={stage}
            onPointerEnter={event => {
              if (event.pointerType === 'mouse' && !manuallyStarted.current &&
                  matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) start();
            }}
            onPointerLeave={() => { if (!manuallyStarted.current) stop(); }}
          >
            {[primary, companion].map((clip, index) => (
              <figure className={index === 0 ? styles.primary : styles.companion} key={clip.src}>
                <video
                  src={clip.src}
                  poster={clip.poster}
                  aria-label={clip.label}
                  width={clip.width}
                  height={clip.height}
                  preload="none"
                  playsInline
                  muted
                  loop
                  onPlaying={index === 0 ? () => setPlaying(true) : undefined}
                  onPause={index === 0 ? () => setPlaying(false) : undefined}
                />
                <figcaption>{clip.label}</figcaption>
              </figure>
            ))}
          </div>
          <div className={styles.controls}>
            {detail && <p>{detail}</p>}
            <button
              type="button"
              onClick={() => {
                manuallyStarted.current = !playing;
                if (playing) stop();
                else start();
              }}
            >{playing ? 'Pause gameplay' : 'Play gameplay'}</button>
          </div>
        </div>
      </div>
    </section>
  );
}
