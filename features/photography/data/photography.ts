export interface Photo {
  id: string;
  src: string;
  alt: string;
  location?: string;
  camera?: string;
}

const rawPhotos = [
  '/assets/photography/20250611_131805 (1).jpg',
  '/assets/photography/20250629_180603 (1).jpg',
  '/assets/photography/20250925_223450 (1).jpg',
  '/assets/photography/20251227_174610.jpg',
  '/assets/photography/20260110_180007.jpg',
  '/assets/photography/20260110_180015.jpg',
  '/assets/photography/20260110_181420.jpg',
  '/assets/photography/20260110_182249 (1).jpg',
  '/assets/photography/20260110_182336.jpg',
  '/assets/photography/20251023_191431.jpg',
  '/assets/photography/20251031_141015.jpg',
  '/assets/photography/20251214_171502.jpg',
  '/assets/photography/20210720_171310.jpg',
  '/assets/photography/20220305_173036.jpg',
  '/assets/photography/20220311_161013 (1).jpg',
  '/assets/photography/20220816_190606.jpg',
  '/assets/photography/20230425_122341.jpg',
  '/assets/photography/20230615_135801.jpg',
  '/assets/photography/20230806_185347.jpg',
  '/assets/photography/20240116054016_IMG_5895 (1) (1).jpg',
  '/assets/photography/20240116055632_IMG_5946 (1).jpg',
  '/assets/photography/20240116063236_IMG_6008 (1).jpg',
  '/assets/photography/20240116204458_IMG_6315 (1).jpg',
  '/assets/photography/20250615_185626 (1).jpg',
  '/assets/photography/20250629_183241.jpg',
  '/assets/photography/20250930_205447.jpg',
  '/assets/photography/20251026_161111.jpg',
  '/assets/photography/20251026_170203 (1).jpg',
  '/assets/photography/20251109_161041.jpg',
  '/assets/photography/20251229_080524.jpg',
  '/assets/photography/20260101_171528 (1).jpg',
  '/assets/photography/20260101_183930(1).jpg',
  '/assets/photography/20260201_232711.jpg',
  '/assets/photography/20260209_165342.jpg',
  '/assets/photography/20260412_173303(1) (1).jpg',
  '/assets/photography/20260523_184307.jpg',
  '/assets/photography/20260523_185350.jpg',
  '/assets/photography/20260613_174555.jpg',
  '/assets/photography/20260613_174815.jpg',
  '/assets/photography/20260627_171253(1).jpg',
  '/assets/photography/ADB_LRM (1).jpg',
  '/assets/photography/ADB_LRM (12).jpg',
  '/assets/photography/ADB_LRM (13).jpg',
  '/assets/photography/ADB_LRM (21).jpg',
  '/assets/photography/IMG_20230428_161806_335.jpg',
  '/assets/photography/IMG_20231008_232757_321.jpg',
  '/assets/photography/IMG_20240212_104425_030 (1).jpg',
  '/assets/photography/IMG_20260111_150318_547.jpg',
  '/assets/photography/_20240403-124626.jpg'
];

export const photographyData: Photo[] = rawPhotos.map((src, index) => {
  // Extract a readable name from filename to use as alt, but keep it minimal
  const filename = src.split('/').pop() || `Photo ${index}`;
  
  return {
    id: `photo-${index}`,
    src,
    alt: filename,
    // We can leave location/camera undefined for now, 
    // it keeps the progressive disclosure minimal until real EXIF data is added.
  };
});
