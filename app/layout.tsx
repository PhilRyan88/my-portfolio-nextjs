import type { Metadata } from 'next';
import { Inter, Syne, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { CustomCursor } from './components/ui/CustomCursor';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const syne = Syne({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-syne' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-space' });

export const metadata: Metadata = {
  title: 'ADITYA S SOORAJ | Creative Director & Developer',
  description: 'Premium Awwwards-winning interactive portfolio.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${syne.variable} ${spaceGrotesk.variable} font-sans bg-[#030305] text-white antialiased relative selection:bg-[#00F0FF] selection:text-black`}>
        {/* Persistent Noise Overlay for Cinematic Texture */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-screen bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')]" />
        
        {/* Ambient Gradient Orbs */}
        <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#8A2BE2] opacity-[0.15] blur-[120px] pointer-events-none mix-blend-screen z-0" />
        <div className="fixed bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#00F0FF] opacity-[0.1] blur-[150px] pointer-events-none mix-blend-screen z-0" />

        <CustomCursor />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
