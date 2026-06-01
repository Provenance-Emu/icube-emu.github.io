import React from 'react';
import Image, { StaticImageData } from 'next/image';

type DeviceType = 'iphone' | 'ipad' | 'appletv';

interface DeviceFrameProps {
  type: DeviceType;
  src: StaticImageData | string;
  alt: string;
  priority?: boolean;
  className?: string;
  video?: boolean;
  videoSrc?: string;
}

const frameStyles: Record<DeviceType, { outer: string; inner: string; aspect: string; width: string }> = {
  iphone: {
    outer: 'rounded-[2.5rem] border-[6px] border-gray-700 bg-gray-800 p-1 shadow-2xl shadow-black/40 ring-1 ring-white/5',
    inner: 'rounded-[2rem] overflow-hidden',
    aspect: 'aspect-[9/19.5]',
    width: 'w-56',
  },
  ipad: {
    outer: 'rounded-[1.5rem] border-[5px] border-gray-700 bg-gray-800 p-1 shadow-2xl shadow-black/40 ring-1 ring-white/5',
    inner: 'rounded-[1.2rem] overflow-hidden',
    aspect: 'aspect-[4/3]',
    width: 'w-[360px]',
  },
  appletv: {
    outer: 'rounded-xl border-[4px] border-gray-700 bg-gray-800 p-1 shadow-2xl shadow-black/40 ring-1 ring-white/5',
    inner: 'rounded-lg overflow-hidden',
    aspect: 'aspect-video',
    width: 'w-80',
  },
};

const DeviceFrame: React.FC<DeviceFrameProps> = ({ type, src, alt, priority = false, className = '', video = false, videoSrc }) => {
  const s = frameStyles[type];

  return (
    <div className={`${s.width} ${className}`}>
      <div className={s.outer}>
        {type === 'iphone' && (
          <div className="relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-[1.1rem] bg-gray-800 rounded-b-xl z-10" />
          </div>
        )}
        <div className={`${s.inner} ${s.aspect}`}>
          {video && videoSrc ? (
            <video
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          ) : (
            <Image
              src={src}
              alt={alt}
              className="h-full w-full object-cover"
              sizes={s.width.replace('w-', '').replace(/[\[\]]/g, '')}
              priority={priority}
            />
          )}
        </div>
        {type === 'iphone' && (
          <div className="flex justify-center py-1">
            <div className="w-[35%] h-1 rounded-full bg-gray-600" />
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceFrame;
