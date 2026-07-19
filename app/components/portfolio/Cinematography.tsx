import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const videos = [
  { src: '/assets/cinematography/20260627_180543.mp4', title: 'Urban Lights', desc: 'Documentary / 2026' },
  { src: '/assets/cinematography/20260627_175256.mp4', title: 'Golden Hour', desc: 'Short Film / 2026' },
  { src: '/assets/cinematography/20260523_184908.mp4', title: 'Vibrance', desc: 'Commercial / 2026' },
];

const VideoPlayer = ({ video }: { video: { src: string; title: string; desc: string } }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-[70vw] md:w-[50vw] lg:w-[40vw] aspect-video bg-gray-900 rounded-lg overflow-hidden group cursor-pointer relative shrink-0">
      <video
        ref={videoRef}
        src={video.src}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
      />
      <div className="absolute inset-0 bg-black/60 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
      <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 pointer-events-none">
        <h3 className="text-2xl font-bold text-white">{video.title}</h3>
        <p className="text-gray-300">{video.desc}</p>
      </div>
    </div>
  );
};

export const Cinematography = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => {
        const trackWidth = trackRef.current?.scrollWidth || 0;
        return -(trackWidth - window.innerWidth + 100);
      };

      gsap.to(trackRef.current, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${getScrollAmount() * -1}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="cinematography" className="w-full relative">
      <div ref={sectionRef} className="w-full h-screen overflow-hidden bg-[#0a0a0a] flex items-center relative">
        <div className="absolute top-16 left-6 md:left-16 z-10 pointer-events-none">
          <h2 className="text-[16vw] sm:text-[12vw] md:text-7xl font-bold text-white tracking-tighter mix-blend-difference leading-[0.85]">
            <span className="hidden md:inline">CINEMATOGRAPHY</span>
            <span className="md:hidden block">CINEMA<br/>TOGRAPHY</span>
          </h2>
        </div>

        <div ref={trackRef} className="flex gap-16 px-16 w-max items-center h-full pt-24 cursor-grab active:cursor-grabbing">
          {videos.map((video, idx) => (
            <VideoPlayer key={idx} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
};
