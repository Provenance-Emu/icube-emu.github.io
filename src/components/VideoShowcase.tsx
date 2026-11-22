import media from '@/data/media.json';
import commercial from '@/data/commercial-media.json';

function Player({clip,label}:{clip:typeof media.main;label:string}) {
  return <video controls muted playsInline preload="none" poster={clip.poster} width={clip.width} height={clip.height} aria-label={label} className="h-auto w-full rounded-2xl bg-black" style={{aspectRatio:`${clip.width} / ${clip.height}`}}>
    <source src={clip.src} type="video/mp4" />
    <a href={clip.src}>Download the gameplay video</a>
  </video>;
}

export default function VideoShowcase() {
  return <section id="gameplay" className="container mx-auto px-4 py-16">
    <div className="mx-auto max-w-5xl">
      <h2 className="mb-4 text-center text-3xl font-bold text-gray-900 dark:text-white">GameCube classics. In motion.</h2>
      <p className="mx-auto mb-8 max-w-2xl text-center text-gray-600 dark:text-gray-300">Super Smash Bros. Melee, captured in iCube with Trinitron CRT and native touch controls.</p>
      <div className="grid gap-8 ">
        {commercial.map(clip=><figure key={clip.src} className="overflow-hidden rounded-2xl border border-white/15 bg-black shadow-xl">
          <Player clip={clip} label={`${clip.game} on ${clip.system}, recorded in iCube`} />
          <figcaption className="space-y-1 p-5"><p className="text-xs font-semibold uppercase tracking-widest text-orange-300">{clip.system}</p><h3 className="text-xl font-semibold text-white">{clip.game}</h3>{clip.mode.startsWith('Attract')&&<p className="text-sm text-gray-400">Attract-mode match · both teams controlled by the game</p>}</figcaption>
        </figure>)}
      </div>
      <p className="mt-5 mb-14 text-center text-sm text-gray-600 dark:text-gray-300">Original game audio. Players start muted. Import your own game files; no games are included.</p>

      <h2 className="mb-4 text-center text-3xl font-bold text-gray-900 dark:text-white">GameCube and Wii homebrew in motion</h2>
      <p className="mx-auto mb-8 max-w-2xl text-center text-gray-600 dark:text-gray-300">Neverball coin pickups and SuperTux Wii, with Trinitron and touch controls.</p>
      <div className="overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl"><Player clip={media.main} label="iCube homebrew gameplay with recorded game audio" /></div>
      <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">Original game audio. Unmute the player to listen. Homebrew games shown. Import your own game files.</p>
      <p className="mt-2 text-center text-xs text-gray-600 dark:text-gray-300"><a href="https://github.com/mardy/neverball" className="underline">Neverball</a> · <a href="https://github.com/DeltaResero/SuperTux-Wii" className="underline">SuperTux Wii</a></p>
      <details className="mt-8 rounded-2xl border border-gray-500/30 p-5">
        <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white">Watch the iPhone and iPad previews</summary>
        <div className="mt-6 flex flex-wrap items-start justify-center gap-8">
          {media.previews.map(clip=><figure key={clip.src} className={clip.title==='iPhone'?'w-full max-w-xs':'w-full max-w-sm'}>
            <Player clip={clip} label={`iCube ${clip.title} app preview`} />
            <figcaption className="mt-3 text-center text-sm text-gray-600 dark:text-gray-300">{clip.title} · actual app controls and recorded game sound</figcaption>
          </figure>)}
        </div>
      </details>
    </div>
  </section>;
}
