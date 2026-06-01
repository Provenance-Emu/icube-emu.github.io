import React from 'react';

interface VideoShowcaseProps {
  videoSrc?: string;
  posterSrc?: string;
  className?: string;
}

const VideoShowcase: React.FC<VideoShowcaseProps> = ({ videoSrc, posterSrc, className = '' }) => {
  const hasVideo = !!videoSrc;

  return (
    <section className={`container mx-auto px-4 py-16 ${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">See iCube in Action</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          Nintendo GameCube and Wii games on iPhone, iPad, and Apple TV. No jailbreak required.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* iPhone landscape device frame */}
        <div className="rounded-[1.5rem] border-[5px] border-gray-700 bg-gray-800 p-1 shadow-2xl shadow-black/40 ring-1 ring-white/5">
          <div className="rounded-[1.2rem] overflow-hidden aspect-video bg-black">
            {hasVideo ? (
              <video
                src={videoSrc}
                poster={posterSrc}
                controls
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            ) : (
              /* Placeholder — swap for real video when Joe captures it */
              <div className="h-full w-full flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-500/10 ring-1 ring-blue-500/20 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-400 ml-1" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm font-medium">Gameplay video coming soon</p>
                  <p className="text-gray-500 text-xs mt-1">iPhone landscape capture</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Video caption */}
        <p className="text-center text-gray-500 dark:text-gray-500 text-sm mt-4">
          {hasVideo
            ? 'Captured on iPhone — actual gameplay, no post-processing'
            : 'Video placeholder — drop an MP4 at public/video/gameplay.mp4 to replace'
          }
        </p>
      </div>
    </section>
  );
};

export default VideoShowcase;
