import { Volume2, VolumeX } from 'lucide-react';
import { GitHubLogoIcon, TwitterLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import { useUIStore } from '@/store/uiStore';
import { MagneticButton } from './MagneticButton';

export const Navbar = () => {
  const { isMuted, setIsMuted } = useUIStore();
  
  const links = ['WORK', 'ABOUT', 'SKILLS', 'CONTACT'];

  return (
    <nav className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50 mix-blend-difference text-white">
      {/* Brand */}
      <div className="font-display font-bold text-xl tracking-tighter cursor-pointer">
        A.SOORAJ <span className="text-neon-cyan">©</span>
      </div>

      {/* Center Links (Desktop only) */}
      <div className="hidden md:flex gap-12 font-mono text-sm tracking-widest uppercase">
        {links.map((link) => (
          <MagneticButton key={link}>
            <a href={`#${link.toLowerCase()}`} className="hover:text-neon-cyan transition-colors duration-300">
              {link}
            </a>
          </MagneticButton>
        ))}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center gap-6 border-r border-white/20 pr-6 mr-2">
          <MagneticButton><GitHubLogoIcon className="w-5 h-5 hover:text-neon-violet transition-colors cursor-pointer" /></MagneticButton>
          <MagneticButton><LinkedInLogoIcon className="w-5 h-5 hover:text-neon-cyan transition-colors cursor-pointer" /></MagneticButton>
        </div>
        
        <MagneticButton>
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </MagneticButton>
      </div>
    </nav>
  );
};
