'use client';

import {useRef, useState} from 'react';

type Clip = {src: string; poster: string; width: number; height: number};

export default function GameplayPlayer({clip, label}: {clip: Clip; label: string}) {
  const video = useRef<HTMLVideoElement>(null);
  const hovering = useRef(false);
  const manual = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  function startPreview(event: React.PointerEvent) {
    if (event.pointerType !== 'mouse' || manual.current ||
        !window.matchMedia('(any-hover: hover) and (prefers-reduced-motion: no-preference)').matches) return;
    const player = video.current;
    if (!player || !player.paused) return;
    hovering.current = true;
    player.muted = true;
    setMuted(true);
    void player.play().catch(() => {});
  }

  function stopPreview() {
    if (!hovering.current) return;
    hovering.current = false;
    video.current?.pause();
  }

  function togglePlayback() {
    const player = video.current;
    if (!player) return;
    hovering.current = false;
    manual.current = true;
    if (player.paused) void player.play().catch(() => {});
    else player.pause();
  }

  function toggleSound() {
    const player = video.current;
    if (!player) return;
    hovering.current = false;
    manual.current = true;
    player.muted = !player.muted;
    setMuted(player.muted);
    if (!player.muted && player.paused) void player.play().catch(() => {});
  }

  const buttonStyle = 'min-h-11 rounded-full bg-black/80 px-4 text-sm font-semibold text-white ring-1 ring-white/30 hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

  return (
    <div className="relative overflow-hidden rounded-2xl bg-black" onPointerEnter={startPreview} onPointerLeave={stopPreview} onPointerCancel={stopPreview}>
      <video ref={video} muted playsInline preload="none" poster={clip.poster}
        width={clip.width} height={clip.height} aria-label={label}
        className="block h-auto w-full" style={{aspectRatio: `${clip.width} / ${clip.height}`}}
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}>
        <source src={clip.src} type="video/mp4" />
        <a href={clip.src}>Download the gameplay video</a>
      </video>
      <div className="absolute inset-x-3 bottom-3 flex justify-between gap-2">
        <button type="button" className={buttonStyle} onClick={togglePlayback} aria-label={`${playing ? 'Pause' : 'Play'} ${label}`}>
          {playing ? 'Pause' : '▶ Play'}
        </button>
        <button type="button" className={buttonStyle} onClick={toggleSound} aria-label={`${muted ? 'Unmute' : 'Mute'} ${label}`}>
          {muted ? 'Sound off' : 'Sound on'}
        </button>
      </div>
    </div>
  );
}
