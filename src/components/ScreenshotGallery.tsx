import Image from 'next/image';
import { screenshots, type Device } from '@/data/screenshots';

export default function ScreenshotGallery({device,title}:{device:Device;title:string}) {
  const items=screenshots(device,{featured:true});
  if (!items.length) return null;
  return <div className="mb-16">
    <h3 className="mb-7 text-center text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
    <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-2 pb-5 lg:flex-wrap lg:justify-center">
      {items.map(item=><figure key={item.id} className={`shrink-0 snap-center ${device==='watch'?'w-48':device==='appletv'?'w-80':device==='ipad'?'w-72':'w-64'}`}>
        {item.developmentPreview&&<p className="mb-2 rounded-full border border-amber-500/40 px-3 py-1 text-center text-xs font-semibold text-amber-600 dark:text-amber-300">Development preview</p>}
        <a href={item.jpg} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-2xl border border-white/15 bg-black shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400" aria-label={`View full screenshot: ${item.alt}`}>
          <Image src={item.webp} alt={item.alt} width={item.width} height={item.height} sizes={device==='watch'?'192px':device==='appletv'?'320px':device==='ipad'?'288px':'256px'} className="h-auto w-full" />
        </a>
        <figcaption className="mt-3 text-center text-sm leading-relaxed text-gray-600 dark:text-gray-300">{item.caption}{item.premium&&<span className="mt-1 block text-xs text-gray-500 dark:text-gray-400">{item.premium}</span>}{item.developmentPreview&&<span className="mt-1 block text-xs text-amber-600 dark:text-amber-300">Not included in the current downloadable build.</span>}</figcaption>
      </figure>)}
    </div>
  </div>;
}
