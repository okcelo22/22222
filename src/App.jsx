import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  Instagram,
  Linkedin,
  Mail,
  Monitor,
  Zap,
  Sparkles,
  Briefcase,
  Layers,
  Cpu,
  Play,
  Camera,
  Smartphone,
  Download,
  ArrowLeft,
  Calendar,
  User,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Image as ImageIcon,
  Layout,
} from 'lucide-react';

// --- Yardımcı Animasyon Hook'u ---
const useScrollReveal = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold]);

  return [ref, isVisible];
};

// --- Animasyonlu Bileşenler --

const RevealText = ({ children, delay = 0 }) => {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div ref={ref} className="overflow-hidden">
      <div
        className={`transform transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0'
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    </div>
  );
};

const FadeInUp = ({ children, delay = 0, className = '' }) => {
  const [ref, isVisible] = useScrollReveal(0.1);
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const SkillBar = ({ name, percent }) => {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div ref={ref} className="mb-6 group">
      <div className="flex justify-between mb-2">
        <span className="text-[var(--text-main)] font-bold tracking-wide text-sm md:text-base">
          {name}
        </span>
        <span className="text-pink-500 font-mono text-xs md:text-sm">{percent}%</span>
      </div>
      <div className="w-full h-2 bg-[var(--border-color)] rounded-full overflow-hidden p-[2px]">
        <div
          className={`h-full bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-full origin-left transform transition-transform duration-[1.5s] ease-out ${
            isVisible ? 'scale-x-100' : 'scale-x-0'
          }`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
};

const PortfolioCategory = ({
  title,
  subtitle,
  icon: Icon,
  description,
  children,
  color = 'text-pink-400',
  buttonLabel = 'İNCELE',
  onButtonClick,
}) => {
  return (
    <div className="flex flex-col md:flex-row min-h-[80vh] border-t border-[var(--border-color)] py-24 relative transition-colors duration-500">
      <div className="w-full md:w-1/3 md:sticky md:top-32 md:self-start px-6 md:px-12 mb-16 md:mb-0 z-10">
        <FadeInUp>
          <div
            className={`inline-flex items-center gap-2 ${color} mb-6 px-4 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] w-max shadow-sm`}
          >
            <Icon size={18} />
            <span className="text-xs font-bold tracking-widest uppercase">{subtitle}</span>
          </div>
        </FadeInUp>
        <FadeInUp delay={100}>
          <h3 className="text-3xl md:text-5xl font-black mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-br from-[var(--title-gradient-from)] to-[var(--title-gradient-to)] drop-shadow-sm py-4 pr-2">
            {title}
          </h3>
        </FadeInUp>
        <FadeInUp delay={200}>
          <p className="text-[var(--text-sec)] text-lg leading-relaxed max-w-sm font-light">
            {description}
          </p>
        </FadeInUp>

        {/* Açıklama altı "İNCELE" butonu */}
        {onButtonClick && (
          <FadeInUp delay={300}>
            <button
              onClick={onButtonClick}
              className="mt-8 inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold tracking-widest text-xs md:text-sm bg-[var(--text-main)] text-[var(--bg-main)] hover:bg-pink-500 hover:text-white transition-all duration-300 shadow-lg"
            >
              {buttonLabel}
            </button>
          </FadeInUp>
        )}
      </div>
      <div className="w-full md:w-2/3 px-6 md:px-12">{children}</div>
    </div>
  );
};

// HoverOverlay bileşeni
const HoverOverlay = ({ text = 'İNCELE', icon: Icon }) => (
  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center z-20 backdrop-blur-sm">
    <div className="transform scale-50 group-hover:scale-100 transition-transform duration-500 flex flex-col items-center gap-4">
      {Icon && (
        <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-2xl shadow-pink-500/20">
          <Icon size={24} />
        </div>
      )}
      <span
        className={`text-white font-bold tracking-[0.2em] bg-black/80 px-5 py-2.5 rounded-full border border-white/20 shadow-lg ${
          !Icon ? 'text-sm' : 'text-xs'
        }`}
      >
        {text}
      </span>
    </div>
  </div>
);

// --- PROJE DETAY MODALI ---
const ProjectModal = ({ project, onClose, onContactClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeContentType, setActiveContentType] = useState('POST');

  useEffect(() => {
    setCurrentImageIndex(0);
    // Kategoriye göre varsayılan sekmeyi ayarla
    if (project?.cat === 'MOTION') {
      setActiveContentType('MOTION');
    } else if (project?.cat === 'AI') {
      // AI alt kategorilerine göre varsayılan içeriği ayarla
      if (project.subCat === 'AI_POST') setActiveContentType('POST');
      else if (project.subCat === 'AI_REELS') setActiveContentType('REELS');
      else if (project.subCat === 'AI_VIDEO') setActiveContentType('VIDEO');
      else setActiveContentType('POST');
    } else if (project?.cat === 'PHOTO') {
      // Fotoğraf için varsayılanı projenin layout tipine göre ayarla (Sekme olmadığı için)
      if (project.layout === 'SQUARE') setActiveContentType('SQUARE');
      else if (project.layout === 'LANDSCAPE') setActiveContentType('LANDSCAPE');
    } else {
      setActiveContentType('POST');
    }
  }, [project]);

  if (!project) return null;

  // --- GÜNCELLENMİŞ GÖRSEL SEÇİM MANTIĞI (GENEL & ROBUST) ---
  let currentImages = [];

  // 1. Öncelikli Kaynak: project.content içindeki aktif tipe ait veri
  const rawContent = project.content ? project.content[activeContentType] : null;

  // 2. Veriyi Normalize Et (String ise Array yap, Array ise olduğu gibi al)
  if (Array.isArray(rawContent)) {
    currentImages = rawContent;
  } else if (typeof rawContent === 'string' && rawContent.trim() !== '') {
    currentImages = [rawContent];
  }

  // 3. Fallback Mekanizması (Eğer yukarıdan veri gelmediyse)
  if (!currentImages || currentImages.length === 0) {
    // Varsa galeriyi, yoksa ana görseli kullan
    currentImages = project.gallery && project.gallery.length > 0 ? project.gallery : [project.img];
  }
  // -----------------------------------------------------------

  const getAspectRatioClass = () => {
    if (project.cat === 'PHOTO') {
      // PHOTO kategorisinde proje layout'una göre boyutlandır
      if (project.layout === 'SQUARE') return 'aspect-square max-w-lg';
      if (project.layout === 'LANDSCAPE') return 'aspect-video w-full';
      return 'aspect-[4/5]';
    }

    switch (activeContentType) {
      case 'POST':
        return 'aspect-[4/5] max-w-lg';
      case 'STORY':
        return 'aspect-[9/16] max-w-sm';
      case 'REELS':
        return 'aspect-[9/16] max-w-sm';
      case 'VIDEO':
        return 'aspect-video w-full';
      case 'MOTION':
        return 'aspect-[9/16] max-w-sm';
      default:
        return 'aspect-[4/5]';
    }
  };

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);

  // Kategori butonlarını belirle
  let contentTypes = [];

  // SOSYAL MEDYA için POST ve HİKAYE butonları
  if (project.cat === 'SOCIAL') {
    contentTypes = [
      { id: 'POST', label: 'POST', icon: Layout },
      { id: 'STORY', label: 'HİKAYE', icon: ImageIcon },
    ];
  } else if (project.cat === 'AI') {
    if (project.subCat === 'AI_POST') {
      contentTypes = [
        { id: 'POST', label: 'POST', icon: Layout },
        { id: 'STORY', label: 'HİKAYE', icon: ImageIcon },
      ];
    } else {
      contentTypes = [];
    }
  }
  // MOTION Kategorisi için buton yok
  else if (project.cat === 'MOTION') {
    contentTypes = [];
  }
  // PHOTO için buton yok

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[var(--bg-main)]/95 backdrop-blur-xl" onClick={onClose}></div>

      {/* Modal Container */}
      <div className="relative bg-[var(--bg-card)] w-full max-w-7xl h-[90vh] overflow-hidden rounded-[2rem] flex flex-col md:flex-row shadow-[0_0_100px_-20px_rgba(236,72,153,0.2)] border border-[var(--border-color)] animate-in zoom-in-95 duration-500">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 w-10 h-10 bg-[var(--bg-main)] hover:bg-[var(--text-main)] hover:text-[var(--bg-main)] backdrop-blur-md rounded-full text-[var(--text-main)] border border-[var(--border-color)] transition-all duration-300 flex items-center justify-center group"
        >
          <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Left Side: Dynamic Image Slider */}
        <div className="w-full md:w-2/3 bg-[var(--bg-sec)] relative h-[50%] md:h-full group flex items-center justify-center p-8 md:p-12 transition-colors duration-500">
          <div
            className={`relative w-full ${getAspectRatioClass()} shadow-2xl rounded-2xl overflow-hidden ring-1 ring-white/10 transition-all duration-500 ease-in-out`}
          >
            <div
              className="absolute inset-0 flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            >
              {currentImages.map((img, index) => (
                <div key={index} className="min-w-full h-full relative bg-[var(--bg-sec)]">
                  <img src={img} alt="" className="w-full h-full object-cover" />

                  {(activeContentType === 'REELS' ||
                    activeContentType === 'VIDEO' ||
                    activeContentType === 'MOTION') &&
                    project.cat !== 'PHOTO' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                          <Play fill="white" className="ml-1 text-white" />
                        </div>
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>

          {currentImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-[var(--bg-card)]/80 hover:bg-[var(--text-main)] hover:text-[var(--bg-card)] backdrop-blur-md rounded-full text-[var(--text-main)] transition-all shadow-lg border border-[var(--border-color)] z-20"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-[var(--bg-card)]/80 hover:bg-[var(--text-main)] hover:text-[var(--bg-card)] backdrop-blur-md rounded-full text-[var(--text-main)] transition-all shadow-lg border border-[var(--border-color)] z-20"
              >
                <ChevronRight size={24} />
              </button>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-black/30 backdrop-blur-xl rounded-full border border-white/10 z-20">
                {currentImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/30 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Right Side: Content & Controls */}
        <div className="w-full md:w-1/3 p-8 md:p-10 flex flex-col bg-[var(--bg-card)] overflow-hidden relative border-l border-[var(--border-color)] h-full justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-500 text-[10px] font-bold tracking-widest uppercase mb-6">
              <Sparkles size={12} /> {project.cat}
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-[var(--text-main)] mb-2 leading-tight">
              {project.title}
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-8"></div>

            <div className="grid grid-cols-2 gap-6 mb-8 text-sm">
              <div className="space-y-1">
                <span className="text-[var(--text-muted)] text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <User size={12} /> Müşteri
                </span>
                <p className="text-[var(--text-main)] font-medium">{project.client || 'Gizli'}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[var(--text-muted)] text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <Calendar size={12} /> Tarih
                </span>
                <p className="text-[var(--text-main)] font-medium">{project.year || '2024'}</p>
              </div>
              <div className="col-span-2 space-y-1">
                <span className="text-[var(--text-muted)] text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <Briefcase size={12} /> Hizmet
                </span>
                <p className="text-[var(--text-main)] font-medium">{project.service || 'Design'}</p>
              </div>
            </div>

            {contentTypes.length > 0 && (
              <div className="mb-8">
                <span className="text-[var(--text-muted)] text-xs font-bold uppercase tracking-wider mb-3 block">
                  İÇERİK TÜRÜ
                </span>
                <div
                  className={`grid gap-2 bg-[var(--bg-main)] p-1.5 rounded-xl border border-[var(--border-color)] ${
                    contentTypes.length >= 3 ? 'grid-cols-3' : 'grid-cols-2'
                  }`}
                >
                  {contentTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => {
                        setActiveContentType(type.id);
                        setCurrentImageIndex(0);
                      }}
                      className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-lg text-[10px] font-bold tracking-wider transition-all duration-300 ${
                        activeContentType === type.id
                          ? 'bg-[var(--text-main)] text-[var(--bg-card)] shadow-md'
                          : 'text-[var(--text-sec)] hover:bg-[var(--bg-sec)] hover:text-[var(--text-main)]'
                      }`}
                    >
                      <type.icon size={16} />
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="prose prose-invert prose-sm">
              <p className="text-[var(--text-sec)] leading-relaxed font-light line-clamp-4">
                {project.description}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[var(--border-color)] w-full">
            <button
              onClick={() => {
                onClose();
                onContactClick();
              }}
              className="w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold tracking-widest rounded-xl transition-all duration-300 shadow-lg shadow-pink-900/30 hover:shadow-pink-900/50 hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              İLETİŞİME GEÇ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- WORKS GALLERY ---
const WorksGallery = ({ onBack, onContactClick, initialCategory = 'ALL', setHovered }) => {
  const [filter, setFilter] = useState(initialCategory);
  const [selectedProject, setSelectedProject] = useState(null);

  const getTitleData = () => {
    switch (filter) {
      case 'SOCIAL':
        return {
          main: 'SOSYAL',
          highlight: 'MEDYA',
          description:
            'Markalar için gönderi, hikâye ve kampanya odaklı sosyal medya tasarımlarımı bu bölümde bulabilirsin.',
        };
      case 'MOTION':
        return {
          main: 'MOTION',
          highlight: 'DESIGN',
          description:
            'Reels videoları, tanıtım filmleri, tipografik animasyonlar ve kurguları bu bölümde inceleyebilirsin.',
        };
      case 'AI':
        return {
          main: 'YAPAY ZEKÂ',
          highlight: '(AI)',
          description:
            'Görsel, video ve ses alanlarında yapay zekâ destekli üretimler gerçekleştirdiğim çalışmalarıma bu bölümden ulaşabilirsin.',
        };
      case 'PHOTO':
        return {
          main: 'TÜM',
          highlight: 'FOTOĞRAFLAR',
          description:
            'Anı yakalamaya odaklandığım fotoğraf çalışmalarım. Bu çalışmalar, zaman zaman tasarımlarımda da yer buluyor. Çektiğim fotoğrafları bu bölümde inceleyebilirsin.',
        };
      default:
        return {
          main: 'TÜM',
          highlight: 'İŞLERİM',
          description:
            'Farklı alanlarda ürettiğim tüm çalışmaları bir araya getirdim. Aşağı kaydırarak inceleyebilirsin.',
        };
    }
  };

  const titleData = getTitleData();

  // SOSYAL MEDYA İÇERİKLERİ
  const socialWorks = [
    {
      id: 1,
      cat: 'SOCIAL',
      title: 'Lezzet Durağı',
      client: 'Çeşnili Döner',
      year: '2024',
      service: 'Sosyal Medya Yönetimi',
      description: 'Çeşnili Döner için hazırlanan kapsamlı sosyal medya paketi.',
      img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80',
      content: {
        POST: [
          'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80',
          'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
          'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
          'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80',
        ],
        STORY: [
          'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
          'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80',
        ],
      },
    },
    {
      id: 2,
      cat: 'SOCIAL',
      title: 'Summer Vibes',
      client: 'Moda Butik',
      year: '2024',
      service: 'Kampanya Tasarımı',
      description: 'Yaz sezonu lansmanı görsel seti.',
      img: 'https://images.unsplash.com/photo-1611162616305-c69b3037c7bb?w=800&q=80',
      content: {
        POST: ['https://images.unsplash.com/photo-1611162616305-c69b3037c7bb?w=800&q=80'],
        STORY: ['https://images.unsplash.com/photo-1554048612-387768052bf7?w=800&q=80'],
      },
    },
    {
      id: 6,
      cat: 'SOCIAL',
      title: 'Kahve Molası',
      client: 'Coffee Shop',
      year: '2024',
      service: 'İçerik Üretimi',
      description: 'Kahve tutkunları için hazırlanan estetik ve minimalist sosyal medya içerikleri.',
      img: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&q=80',
      content: {
        POST: ['https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&q=80'],
        STORY: ['https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=800&q=80'],
      },
    },
  ];

  // MOTION İÇERİKLERİ (MOTION DESIGN)
  const motionWorks = [
    {
      id: 3,
      cat: 'MOTION',
      title: 'Urban Rhythm',
      client: 'Spor Giyim',
      year: '2023',
      service: 'Video Kurgu ve Motion',
      description: 'Şehir hayatının hızını yansıtan reklam filmi.',
      img: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&q=80',
      content: {
        // Sadece MOTION (Dikey) içeriğe çevrildi
        MOTION: ['https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80'],
      },
    },
    {
      id: 7,
      cat: 'MOTION',
      title: 'Nature Call',
      client: 'Belgesel',
      year: '2023',
      service: 'Video Kurgu',
      description: 'Doğa belgeseli için hazırlanan intro çalışması.',
      img: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
      content: {
        MOTION: ['https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80'],
      },
    },
  ];

  // AI İÇERİKLERİ
  const aiWorks = {
    posts: [
      {
        id: 'ap1',
        cat: 'AI',
        subCat: 'AI_POST',
        title: 'AI Post 01',
        img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
        description: 'Yapay zekâ ile üretilmiş dikey post tasarımı.',
        content: {
          POST: ['https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80'],
          STORY: ['https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80'],
        },
      },
      {
        id: 'ap2',
        cat: 'AI',
        subCat: 'AI_POST',
        title: 'AI Post 02',
        img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
        description: 'Konsept karakter tasarımı.',
        content: {
          POST: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80'],
          STORY: [],
        },
      },
      {
        id: 'ap3',
        cat: 'AI',
        subCat: 'AI_POST',
        title: 'AI Post 03',
        img: 'https://images.unsplash.com/photo-1535378433864-48cb1048265d?w=800&q=80',
        description: 'Fütüristik ürün lansman görseli.',
        content: {
          POST: ['https://images.unsplash.com/photo-1535378433864-48cb1048265d?w=800&q=80'],
          STORY: [],
        },
      },
    ],
    reels: [
      {
        id: 'ar1',
        cat: 'AI',
        subCat: 'AI_REELS',
        title: 'AI Reels 01',
        img: 'https://images.unsplash.com/photo-1614726365203-c03198eb6c33?w=800&q=80',
        description: 'Yapay zekâ destekli animasyon reels.',
        content: {
          REELS: ['https://images.unsplash.com/photo-1614726365203-c03198eb6c33?w=800&q=80'],
        },
      },
      {
        id: 'ar2',
        cat: 'AI',
        subCat: 'AI_REELS',
        title: 'AI Reels 02',
        img: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80',
        description: 'Sanal influencer konsept videosu.',
        content: {
          REELS: ['https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80'],
        },
      },
      {
        id: 'ar3',
        cat: 'AI',
        subCat: 'AI_REELS',
        title: 'AI Reels 03',
        img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
        description: 'Ürün dönüşüm animasyonu.',
        content: {
          REELS: ['https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80'],
        },
      },
    ],
    videos: [
      {
        id: 'av1',
        cat: 'AI',
        subCat: 'AI_VIDEO',
        title: 'AI Video 01',
        img: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1200&q=80',
        description: 'Sinematik AI video klibi.',
        content: {
          VIDEO: ['https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1600&q=80'],
        },
      },
      {
        id: 'av2',
        cat: 'AI',
        subCat: 'AI_VIDEO',
        title: 'AI Video 02',
        img: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80',
        description: 'Yapay zekâ ile üretilmiş belgesel kesiti.',
        content: {
          VIDEO: ['https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&q=80'],
        },
      },
      {
        id: 'av3',
        cat: 'AI',
        subCat: 'AI_VIDEO',
        title: 'AI Video 03',
        img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80',
        description: 'Reklam filmi konsept çalışması.',
        content: {
          VIDEO: ['https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80'],
        },
      },
    ],
  };

  // FOTOĞRAF İÇERİKLERİ
  const photoWorks = [
    {
      id: 'p1',
      cat: 'PHOTO',
      layout: 'SQUARE',
      title: 'Portre No.1',
      img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
      description: 'Karakter odaklı stüdyo portre çalışması.',
      content: {
        SQUARE: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80'],
      },
    },
    {
      id: 'p2',
      cat: 'PHOTO',
      layout: 'LANDSCAPE',
      title: 'Şehir Işıkları',
      img: 'https://images.unsplash.com/photo-1554048612-387768052bf7?w=1200&q=80',
      description: 'Gece şehrin dinamizmini yansıtan uzun pozlama çekim.',
      content: {
        LANDSCAPE: ['https://images.unsplash.com/photo-1554048612-387768052bf7?w=1600&q=80'],
      },
    },
    {
      id: 'p3',
      cat: 'PHOTO',
      layout: 'SQUARE',
      title: 'Minimalist',
      img: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=800&q=80',
      description: 'Sadelik ve doku üzerine kurgulanmış minimalist kompozisyon.',
      content: {
        SQUARE: ['https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=800&q=80'],
      },
    },
    {
      id: 'p4',
      cat: 'PHOTO',
      layout: 'LANDSCAPE',
      title: 'Doğa',
      img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&q=80',
      description: 'Doğal ışık kullanımıyla yakalanmış manzara fotoğrafı.',
      content: {
        LANDSCAPE: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1600&q=80'],
      },
    },
  ];

  // RENDER FONKSİYONLARI

  const renderSocialSection = (showTitle = false) => (
    <FadeInUp>
      {showTitle && (
        <h3 className="text-3xl font-black mb-8 text-[var(--text-main)] flex items-center gap-3">
          <span className="w-8 h-1 bg-pink-500 rounded-full"></span>
          SOSYAL MEDYA
        </h3>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {socialWorks.map((work) => (
          <div
            key={work.id}
            onClick={() => setSelectedProject(work)}
            // DÜZELTME: Kart yapısı güncellendi: Alt buton kaldırıldı, Overlay geri geldi (icon=null)
            className="group relative aspect-[4/5] bg-[var(--bg-card)] rounded-[2rem] overflow-hidden border border-[var(--border-color)] cursor-pointer hover:border-pink-500/30 transition-all duration-500 shadow-xl hover:shadow-[0_0_30px_-10px_rgba(236,72,153,0.3)] hover:-translate-y-2"
            onMouseEnter={() => setHovered && setHovered(true)}
            onMouseLeave={() => setHovered && setHovered(false)}
          >
            <img
              src={work.img}
              alt={work.title}
              className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
            />
            <HoverOverlay text="İNCELE" icon={null} />
          </div>
        ))}
      </div>
    </FadeInUp>
  );

  const renderMotionSection = (showTitle = false) => (
    <FadeInUp delay={showTitle ? 100 : 0}>
      {showTitle && (
        <h3 className="text-3xl font-black mb-8 mt-16 text-[var(--text-main)] flex items-center gap-3">
          <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
          MOTION DESIGN
        </h3>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {motionWorks.map((work) => (
          <div
            key={work.id}
            onClick={() => setSelectedProject(work)}
            className="group relative aspect-[9/16] bg-[var(--bg-card)] rounded-[2rem] overflow-hidden border border-[var(--border-color)] cursor-pointer hover:border-blue-500/30 transition-all duration-500 shadow-xl hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)] hover:-translate-y-2"
            onMouseEnter={() => setHovered && setHovered(true)}
            onMouseLeave={() => setHovered && setHovered(false)}
          >
            <img
              src={work.img}
              alt={work.title}
              className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
            />
            <HoverOverlay text="İNCELE" icon={null} />
          </div>
        ))}
      </div>
    </FadeInUp>
  );

  const renderAISection = (showTitle = false) => (
    <div className={showTitle ? 'mt-16' : ''}>
      {showTitle && (
        <h3 className="text-3xl font-black mb-12 text-[var(--text-main)] flex items-center gap-3">
          <span className="w-8 h-1 bg-purple-500 rounded-full"></span>
          YAPAY ZEKÂ (AI)
        </h3>
      )}
      <div className="space-y-32">
        {/* POSTLAR & HİKAYELER */}
        <FadeInUp>
          <h3 className="text-2xl font-bold mb-8 text-[var(--text-main)] flex items-center gap-3 pl-2 opacity-80">
            POSTLAR & HİKAYELER
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aiWorks.posts.map((work) => (
              <div
                key={work.id}
                onClick={() => setSelectedProject(work)}
                className="group relative aspect-[4/5] bg-[var(--bg-card)] rounded-[2rem] overflow-hidden border border-[var(--border-color)] cursor-pointer hover:border-pink-500/30 transition-all duration-500 shadow-xl hover:shadow-[0_0_30px_-10px_rgba(236,72,153,0.3)] hover:-translate-y-1"
                onMouseEnter={() => setHovered && setHovered(true)}
                onMouseLeave={() => setHovered && setHovered(false)}
              >
                <img
                  src={work.img}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <HoverOverlay text="İNCELE" icon={null} />
              </div>
            ))}
          </div>
        </FadeInUp>
        {/* REELSLAR */}
        <FadeInUp delay={200}>
          <h3 className="text-2xl font-bold mb-8 text-[var(--text-main)] flex items-center gap-3 pl-2 opacity-80">
            REELSLAR
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aiWorks.reels.map((work) => (
              <div
                key={work.id}
                onClick={() => setSelectedProject(work)}
                className="group relative aspect-[9/16] bg-[var(--bg-card)] rounded-[2rem] overflow-hidden border border-[var(--border-color)] transition-all duration-500 shadow-xl hover:shadow-[0_0_30px_-10px_rgba(168,85,247,0.3)] hover:-translate-y-1"
                onMouseEnter={() => setHovered && setHovered(true)}
                onMouseLeave={() => setHovered && setHovered(false)}
              >
                <img
                  src={work.img}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <HoverOverlay text="İNCELE" icon={null} />
              </div>
            ))}
          </div>
        </FadeInUp>
        {/* VİDEOLAR */}
        <FadeInUp delay={400}>
          <h3 className="text-2xl font-bold mb-8 text-[var(--text-main)] flex items-center gap-3 pl-2 opacity-80">
            VİDEOLAR
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aiWorks.videos.map((work) => (
              <div
                key={work.id}
                onClick={() => setSelectedProject(work)}
                className="group relative aspect-video bg-[var(--bg-card)] rounded-[2rem] overflow-hidden border border-[var(--border-color)] transition-all duration-500 shadow-xl hover:shadow-[0_0_30px_-10px_rgba(99,102,241,0.3)] hover:-translate-y-1"
                onMouseEnter={() => setHovered && setHovered(true)}
                onMouseLeave={() => setHovered && setHovered(false)}
              >
                <img
                  src={work.img}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <HoverOverlay text="İNCELE" icon={null} />
              </div>
            ))}
          </div>
        </FadeInUp>
      </div>
    </div>
  );

  const renderPhotoSection = (showTitle = false) => (
    <FadeInUp delay={showTitle ? 200 : 0}>
      {showTitle && (
        <h3 className="text-3xl font-black mb-8 mt-16 text-[var(--text-main)] flex items-center gap-3">
          <span className="w-8 h-1 bg-yellow-500 rounded-full"></span>
          FOTOĞRAFLAR
        </h3>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {photoWorks.map((work) => (
          <div
            key={work.id}
            onClick={() => setSelectedProject(work)}
            className={`group relative bg-[var(--bg-card)] rounded-[2rem] overflow-hidden border border-[var(--border-color)] cursor-pointer hover:border-pink-500/30 transition-all duration-500 shadow-xl hover:shadow-[0_0_30px_-10px_rgba(236,72,153,0.3)] hover:-translate-y-2
                            ${work.layout === 'SQUARE' ? 'aspect-square' : ''}
                            ${work.layout === 'LANDSCAPE' ? 'aspect-video' : ''}
                        `}
            onMouseEnter={() => setHovered && setHovered(true)}
            onMouseLeave={() => setHovered && setHovered(false)}
          >
            <img
              src={work.img}
              alt={work.title}
              className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
            />
            <HoverOverlay text="İNCELE" icon={null} />
          </div>
        ))}
      </div>
    </FadeInUp>
  );

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] pt-20 pb-20 px-6 animate-in fade-in duration-500 relative font-outfit transition-colors duration-500">
      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--blob-color-1)] rounded-full blur-[150px] animate-pulse"
          style={{ opacity: 'var(--blob-opacity)' }}
        ></div>
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--blob-color-2)] rounded-full blur-[150px] animate-pulse"
          style={{ animationDelay: '2s', opacity: 'var(--blob-opacity)' }}
        ></div>
      </div>

      <div className="container mx-auto relative z-10 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <button
              onClick={onBack}
              onMouseEnter={() => setHovered && setHovered(true)}
              onMouseLeave={() => setHovered && setHovered(false)}
              className="flex items-center gap-3 text-[var(--text-sec)] hover:text-[var(--text-main)] transition-all mb-8 group font-medium text-sm bg-[var(--bg-card)] hover:bg-[var(--bg-sec)] px-5 py-2 rounded-full border border-[var(--border-color)] w-max shadow-sm"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Ana Sayfaya Dön
            </button>

            <div className="pt-12 pb-12 max-w-xl">
              <h2 className="text-5xl md:text-8xl font-black mb-4 leading-tight tracking-tight uppercase py-4">
                <span className="text-[var(--text-main)]">{titleData.main}</span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
                  {titleData.highlight}
                </span>
              </h2>
              <p className="text-[var(--text-sec)] text-lg font-light">{titleData.description}</p>
            </div>
          </div>

          {/* Filtreler */}
          <div className="flex flex-wrap gap-2 md:gap-3">
            {[
              { id: 'ALL', label: 'Hepsi' },
              { id: 'SOCIAL', label: 'Sosyal Medya' },
              { id: 'MOTION', label: 'Motion' },
              { id: 'AI', label: 'Yapay Zekâ' },
              { id: 'PHOTO', label: 'Fotoğraf' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                onMouseEnter={() => setHovered && setHovered(true)}
                onMouseLeave={() => setHovered && setHovered(false)}
                className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 border ${
                  filter === f.id
                    ? 'bg-[var(--text-main)] text-[var(--bg-main)] border-[var(--text-main)] shadow-lg scale-105'
                    : 'bg-transparent text-[var(--text-sec)] border-[var(--border-color)] hover:border-[var(--text-main)] hover:text-[var(--text-main)]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* --- İÇERİK RENDER ALANI --- */}

        {/* 1. SOCIAL (TEK GRID) */}
        {filter === 'SOCIAL' && renderSocialSection(false)}

        {/* 2. MOTION (TEK GRID) */}
        {filter === 'MOTION' && renderMotionSection(false)}

        {/* 3. AI (3 KATEGORİ) */}
        {filter === 'AI' && renderAISection(false)}

        {/* 4. PHOTO (TEK GRID KARIŞIK) */}
        {filter === 'PHOTO' && renderPhotoSection(false)}

        {/* 5. ALL (HEPSİ SIRAYLA) */}
        {filter === 'ALL' && (
          <div className="space-y-24">
            {renderSocialSection(true)}
            {renderMotionSection(true)}
            {renderAISection(true)}
            {renderPhotoSection(true)}
          </div>
        )}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onContactClick={onContactClick}
      />
    </div>
  );
};

const SelinayPortfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [activeView, setActiveView] = useState('home');
  const [targetCategory, setTargetCategory] = useState('ALL');
  const [theme, setTheme] = useState('dark');

  // Scroll hafızası için ref
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const openWorks = (category = 'ALL') => {
    // Mevcut scroll pozisyonunu kaydet
    scrollPositionRef.current = window.scrollY;
    setTargetCategory(category);
    setActiveView('works');
    window.scrollTo(0, 0);
  };

  const closeWorks = () => {
    setActiveView('home');
    // Scroll pozisyonunu geri yükle
    setTimeout(() => {
      window.scrollTo(0, scrollPositionRef.current);
    }, 0);
  };

  const goToContact = () => {
    setActiveView('home');
    setTimeout(() => {
      const contactSection = document.getElementById('iletisim');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleMenuClick = (e, id) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (activeView !== 'home') {
      setActiveView('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const menuItems = [
    { label: 'HAKKIMDA', id: 'hakkımda' },
    { label: 'HİZMETLER', id: 'hizmetler' },
    { label: 'PORTFOLYO', id: 'portfolyo' },
    { label: 'SÜREÇ', id: 'süreç' },
    { label: 'BECERİLER', id: 'beceriler' },
    { label: 'YOLCULUĞUM', id: 'yolculuğum' },
    { label: 'İLETİŞİM', id: 'iletisim' },
  ];

  const services = [
    {
      title: 'Marka Kimliği',
      icon: <Layers size={28} />,
      desc: 'Logo, renk, tipografi ve görsel dili kapsayan tutarlı kurumsal kimlik sistemleri tasarlıyorum.',
    },
    {
      title: 'Sosyal Medya',
      icon: <Zap size={28} />,
      desc: 'Gönderi, hikâye ve kampanya odaklı sosyal medya tasarımları üretiyorum.',
    },
    {
      title: 'Motion Design',
      icon: <Monitor size={28} />,
      desc: 'Reels, hareketli grafikler ve tipografi temelli animasyonlar hazırlıyorum.',
    },
    {
      title: 'AI Destekli Üretim',
      icon: <Cpu size={28} />,
      desc: 'Görsel, video ve ses odaklı yapay zekâ destekli içerik üretimleri gerçekleştiriyorum.',
    },
  ];

  const timeline = [
    {
      year: '2025 - Şimdi',
      role: 'Grafik Tasarımcı / Hareket Tasarımcısı / Yapay Zekâ Uzmanı',
      company: 'Artı Çizgi Reklam Ajansı',
      desc: 'Aktif olarak markalar için sosyal medya içerikleri, hareketli grafik (motion) animasyonları ve yapay zekâ destekli görsel, video ve ses üretim çalışmaları yürütüyorum.',
    },
    {
      year: '2025',
      role: 'Grafik Tasarımcı',
      company: 'Reklamartgo Ajansı',
      desc: '2 ay boyunca markalara yönelik sosyal medya tasarımlarını hazırladım ve kreatif üretim süreçlerini yönettim.',
    },
    {
      year: '2024',
      role: 'Grafik Tasarımcı',
      company: 'Zexpa Apparel',
      desc: '3 ay boyunca e-ticaret platformlarında yer alan ürünlerin baskı süreçlerine yönelik grafik tasarım çalışmalarını gerçekleştirdim.',
    },
    {
      year: '2024',
      role: 'Mezuniyet',
      company: 'İstanbul Arel Üniversitesi',
      desc: 'Grafik Tasarımı Bölümü',
    },
    {
      year: '2022',
      role: 'Mezuniyet',
      company: 'Türk Telekom MTAL',
      desc: 'Mesleki ve Teknik Anadolu Lisesi',
    },
  ];

  return (
    <div
      className={`font-outfit selection:bg-pink-600 selection:text-white ${
        theme === 'light' ? 'light-mode' : ''
      } bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-500`}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700;800;900&display=swap');
        .font-outfit { font-family: 'Outfit', sans-serif; }

        :root {
            --bg-main: #050505;
            --bg-sec: #080808;
            --bg-card: #0a0a0a;
            --text-main: #ffffff;
            --text-sec: #9ca3af; /* gray-400 */
            --text-muted: #6b7280; /* gray-500 */
            --border-color: rgba(255,255,255,0.1);
            --stroke-color: rgba(255,255,255,0.5);
            /* Başlık gradientleri (Dark Mode: Beyaz -> Gri) */
            --title-gradient-from: #ffffff;
            --title-gradient-to: #9ca3af;
            /* Dark Mode'da sabit ışıkları görünür yap (1 veya daha düşük) */
            --blob-opacity: 1;
            --blob-color-1: rgba(88, 28, 135, 0.1); /* purple-900/10 */
            --blob-color-2: rgba(131, 24, 67, 0.1); /* pink-900/10 */
        }

        .light-mode {
            --bg-main: #fcfcfc; /* DÜZELTME: Hafif kırık beyaz */
            --bg-sec: #f4f4f5; /* DÜZELTME: Hafif gri (zinc-100) */
            --bg-card: #ffffff; /* Saf beyaz */
            --text-main: #111827; /* gray-900 */
            --text-sec: #4b5563; /* gray-600 */
            --text-muted: #9ca3af; /* gray-400 */
            --border-color: rgba(0,0,0,0.06);
            --stroke-color: rgba(0,0,0,0.8);
            /* Başlık gradientleri (Light Mode: Pembe -> Mor) */
            --title-gradient-from: #db2777; /* pink-600 */
            --title-gradient-to: #9333ea; /* purple-600 */
            /* Light Mode'da da sabit ışıkları görünür yap ama daha yumuşak */
            --blob-opacity: 0.4; /* DÜZELTME: Opaklık %40'a düşürüldü */
            --blob-color-1: rgba(244, 114, 182, 0.1); /* DÜZELTME: Renk yoğunluğu 0.1'e düşürüldü */
            --blob-color-2: rgba(192, 132, 252, 0.1); /* DÜZELTME: Renk yoğunluğu 0.1'e düşürüldü */
        }

        body {
            overflow-x: hidden;
            background-color: var(--bg-main);
        }

        .stroke-text {
            -webkit-text-stroke: 1px var(--stroke-color);
            color: transparent;
            transition: all 0.5s ease;
        }

        .stroke-text:hover {
            color: var(--text-main);
            text-shadow: 0 0 30px rgba(236, 72, 153, 0.3);
            -webkit-text-stroke: 0px transparent;
        }

        .text-glow:hover {
            text-shadow: 0 0 20px rgba(236, 72, 153, 0.5);
        }

        /* Portfolio Items Hover Effects */
        .portfolio-item:hover .portfolio-img {
            transform: scale(1.05);
        }
        .portfolio-item:hover .portfolio-overlay {
            opacity: 1;
        }

        ::-webkit-scrollbar { width: 0px; background: transparent; }
      `}</style>

      {/* CUSTOM CURSOR */}
      <div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center transition-all duration-300 ease-out
        ${hovered ? 'w-8 h-8 bg-pink-500 mix-blend-screen opacity-80' : 'w-4 h-4 bg-white mix-blend-difference'}`}
        style={{
          transform: `translate(${cursorPos.x - (hovered ? 16 : 8)}px, ${
            cursorPos.y - (hovered ? 16 : 8)
          }px)`,
        }}
      ></div>

      {/* DÜZELTME: WorksGallery bileşenine setHovered geçirildi */}
      {activeView === 'works' ? (
        <div className={theme === 'light' ? 'light-mode' : ''}>
          <WorksGallery
            onBack={closeWorks}
            onContactClick={goToContact}
            initialCategory={targetCategory}
            setHovered={setHovered}
          />
        </div>
      ) : (
        <div style={{ display: 'block' }}>
          {/* Navbar */}
          <nav className="fixed w-full z-50 p-6 flex justify-between items-center mix-blend-difference">
            <a
              href="#"
              className="text-xl md:text-2xl font-black tracking-tighter text-white hover:text-pink-500 transition-colors"
            >
              SB.
            </a>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="text-white hover:text-pink-500 transition-colors p-2 rounded-full border border-white/20 hover:bg-white/10"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="text-white hover:text-pink-500 transition-colors group flex items-center gap-2"
              >
                <span className="text-xs tracking-widest hidden md:block group-hover:mr-2 transition-all font-bold">
                  MENÜ
                </span>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>

          {/* Fullscreen Menu */}
          {isMenuOpen && (
            <div className="fixed inset-0 bg-[var(--bg-main)]/95 backdrop-blur-xl z-40 flex items-center justify-center animate-in fade-in duration-300">
              <div className="flex flex-col space-y-4 text-center">
                {menuItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    /* DÜZELTME: onClick artık handleMenuClick fonksiyonunu çağırıyor */
                    onClick={(e) => handleMenuClick(e, item.id)}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    className="text-3xl md:text-6xl font-black text-transparent stroke-text hover:text-[var(--text-main)] hover:stroke-0 transition-all duration-300 tracking-tighter cursor-none hover:italic"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* HERO SECTION */}
          <header className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-[var(--bg-main)] pt-10 md:pt-20 transition-colors duration-500">
            {/* SABİT ARKA PLAN IŞIKLARI (TEKRAR AKTİF EDİLDİ) */}
            <div
              className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-[var(--blob-color-1)] rounded-full blur-[150px] animate-pulse"
              style={{ opacity: 'var(--blob-opacity)' }}
            ></div>
            <div
              className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[var(--blob-color-2)] rounded-full blur-[120px] animate-pulse"
              style={{ animationDelay: '2s', opacity: 'var(--blob-opacity)' }}
            ></div>

            <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center">
              <RevealText delay={100}>
                {/* DÜZELTME: py-4 eklendi, leading rahatlatıldı */}
                <h1 className="text-[12vw] md:text-[12vw] font-black leading-tight tracking-tight text-[var(--text-main)] py-4">
                  SELİNAY{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                    BENLİ
                  </span>
                </h1>
              </RevealText>

              <RevealText delay={300}>
                {/* DÜZELTME: 'uppercase' sınıfı kaldırıldı. Metin "Grafik Tasarımcı | Motion Designer | AI" olarak güncellendi.
                            Böylece İngilizce kelimelerdeki 'i' harflerinin Türkçe büyük 'İ'ye dönüşmesi (MOTİON vb.) engellendi. */}
                <div className="mt-6 md:mt-8 inline-block border border-[var(--border-color)] px-6 py-2.5 rounded-full bg-[var(--bg-card)] backdrop-blur-sm shadow-sm">
                  <span className="text-xs md:text-lg font-bold tracking-widest text-[var(--text-main)]">
                    GRAFİK TASARIMCI | MOTION DESIGNER | AI
                  </span>
                </div>
              </RevealText>

              <RevealText delay={500}>
                {/* DÜZELTME: max-w-xl yerine max-w-4xl yapılarak metnin tek satıra yayılması sağlandı. */}
                <p className="mt-10 text-[var(--text-sec)] max-w-4xl mx-auto text-base md:text-lg font-light leading-relaxed">
                  Grafik tasarım, sosyal medya yönetimi ve yapay zekâ destekli içerik üretimi alanlarında çalışmalar yürütüyor;{' '}
                  <span className="text-[var(--text-main)] font-medium">
                    {' '}
                    dijital tasarım ve yaratıcı içerik odaklı projeler geliştiriyorum.
                  </span>
                </p>
              </RevealText>

              <RevealText delay={700}>
                <div className="mt-12 flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-center flex-wrap">
                  <button
                    className="px-8 py-3 bg-[var(--text-main)] text-[var(--bg-main)] font-bold uppercase tracking-widest hover:bg-pink-500 hover:text-white transition-all duration-300 rounded-full text-[10px] md:text-xs shadow-lg"
                    onClick={() => openWorks('ALL')}
                  >
                    PORTFOLYOMU GÖR
                  </button>
                  <button
                    className="px-8 py-3 border border-[var(--border-color)] text-[var(--text-main)] font-bold uppercase tracking-widest hover:border-pink-500 hover:bg-pink-500/10 transition-all duration-300 rounded-full text-[10px] md:text-xs"
                    onClick={() => document.getElementById('iletisim').scrollIntoView({ behavior: 'smooth' })}
                  >
                    İLETİŞİME GEÇİN
                  </button>
                  {/* YENİ EKLENEN BUTON: CV İNDİR - GÜNCELLENDİ */}
                  <a
                    /* DÜZELTME: Dosya yolunun başına '/' eklendi. Bu, dosyanın 'public' kök dizininde aranmasını sağlar. */
                    href="/Selinay Benli CV.jpg"
                    download="Selinay Benli CV"
                    className="px-8 py-3 border border-[var(--border-color)] text-[var(--text-main)] font-bold uppercase tracking-widest hover:border-pink-500 hover:bg-pink-500/10 transition-all duration-300 rounded-full text-[10px] md:text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <Download size={14} /> CV İNDİR
                  </a>
                </div>
              </RevealText>

              {/* Özet Maddeler */}
              <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-left border-t border-[var(--border-color)] pt-12 w-full max-w-5xl">
                {[
                  'Marka kimliği, dijital illüstrasyon ve sosyal medya içeriği üretimi',
                  'Detay odaklı, estetik ve anlam dengesini önemseyen yaklaşım',
                  'Yapay zekâ ile ürün gerçekliğini bozmadan sahne/atmosfer kurgulama',
                ].map((item, i) => (
                  <FadeInUp key={i} delay={800 + i * 100}>
                    <div className="flex gap-4 opacity-70 hover:opacity-100 transition-opacity">
                      <span className="text-pink-500 font-bold text-lg font-mono">0{i + 1}.</span>
                      <p className="text-xs md:text-sm font-light leading-relaxed text-[var(--text-sec)]">
                        {item}
                      </p>
                    </div>
                  </FadeInUp>
                ))}
              </div>
            </div>
          </header>

          {/* HAKKIMDA */}
          <section
            id="hakkımda"
            className="py-24 md:py-32 bg-[var(--bg-sec)] relative overflow-hidden transition-colors duration-500"
          >
            <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16 md:gap-24">
              <div className="w-full md:w-1/2">
                <FadeInUp>
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-[2rem] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-700"></div>
                    <img
                      src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Creative Workspace"
                      className="relative rounded-[2rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 w-full"
                    />
                  </div>
                </FadeInUp>
              </div>
              <div className="w-full md:w-1/2 space-y-8">
                <RevealText>
                  {/* DÜZELTME: py-2 eklendi */}
                  <h2 className="text-4xl md:text-6xl font-black py-2 text-[var(--text-main)]">
                    BENİM <span className="text-pink-500 italic">HAKKIMDA</span>
                  </h2>
                </RevealText>
                <div className="space-y-6 text-base md:text-lg text-[var(--text-sec)] font-light leading-relaxed">
                  <FadeInUp delay={100}>
                    <p>
                      Merhaba, ben Selinay. 21 yaşımdayım. Grafik tasarım ve sosyal medya alanında; markalar için
                      dijital dünyada karşılığı olan görsel sistemler ve içerikler üretiyorum. Sosyal medya tasarımları,
                      kreatif kampanya görselleri, motion tabanlı içerikler ve yapay zekâ destekli üretim süreçleriyle
                      çalışıyorum.
                    </p>
                  </FadeInUp>
                  <FadeInUp delay={200}>
                    <p>
                      Her projede markanın kimliğini, hedef kitlesini ve iletişim kurduğu mecrayı merkeze alırım. Amacım
                      yalnızca dikkat çeken işler üretmek değil; tutarlı, sürdürülebilir ve markayı doğru şekilde temsil
                      eden görsel yapılar oluşturmaktır.
                    </p>
                  </FadeInUp>
                  <FadeInUp delay={300}>
                    <p>
                      Ayrıca üretim sürecimi besleyen alanlara da zaman ayırmayı seviyorum. Dijital çizimler yapmak ve
                      fotoğrafçılıkla ilgilenmek, görsel bakış açımı geliştiriyor ve tasarımlarıma farklı bir perspektif
                      katıyor. Bu yüzden detay odaklı çalışır; görsel gücü, amaca hizmet eden bir yapı ile birleştirmeyi
                      önemserim.
                    </p>
                  </FadeInUp>
                </div>
              </div>
            </div>
          </section>

          {/* HİZMETLER */}
          <section id="hizmetler" className="py-20 bg-[var(--bg-main)] transition-colors duration-500">
            <div className="container mx-auto px-6">
              <RevealText>
                {/* DÜZELTME: py-2 eklendi */}
                <h2 className="text-3xl md:text-5xl font-black mb-16 text-center md:text-left py-2 text-[var(--text-main)]">
                  NE <span className="stroke-text text-white">YAPIYORUM?</span>
                </h2>
              </RevealText>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                  <FadeInUp key={index} delay={index * 100}>
                    <div className="group p-8 border border-[var(--border-color)] bg-[var(--bg-card)] hover:bg-[var(--bg-sec)] hover:border-pink-500/30 rounded-[2rem] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-900/10">
                      <div className="w-14 h-14 bg-[var(--bg-main)] rounded-2xl flex items-center justify-center text-[var(--text-main)] mb-6 group-hover:bg-pink-500 group-hover:text-white group-hover:scale-110 transition-all duration-500 rotate-3 group-hover:rotate-6">
                        {service.icon}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold mb-3 text-[var(--text-main)]">{service.title}</h3>
                      <p className="text-[var(--text-sec)] text-sm md:text-base group-hover:text-[var(--text-main)] font-light">
                        {service.desc}
                      </p>
                    </div>
                  </FadeInUp>
                ))}
              </div>
            </div>
          </section>

          {/* --- YENİLENEN PORTFOLYO BÖLÜMÜ (STICKY GALLERY) --- */}
          <div id="portfolyo" className="bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-500">
            {/* Giriş Başlığı */}
            {/* DÜZELTME: pt-48 (aşırı boşluğu düzelttik) ve pb-12 ile daha dengeli hale getirdik. max-w-xl ile metnin dağılmasını engelledik. */}
            <div className="container mx-auto px-6 pt-48 pb-12">
              <div className="max-w-xl">
                <RevealText>
                  <h2 className="text-3xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4 leading-tight py-2 cursor-default text-[var(--text-main)]">
                    <span className="stroke-text">PORTFOLYOM</span>
                  </h2>
                </RevealText>
                <FadeInUp delay={200}>
                  <p className="text-[var(--text-sec)] text-lg font-light leading-relaxed">
                    Farklı alanlarda ürettiğim tüm çalışmaları bir araya getirdim. Aşağı kaydırarak inceleyebilirsin.
                  </p>
                </FadeInUp>
              </div>
            </div>

            {/* 1. KATEGORİ: SOSYAL MEDYA */}
            <PortfolioCategory
              title="SOSYAL MEDYA"
              subtitle="Social Media"
              icon={Smartphone}
              // DÜZELTME: Açıklama metni isteğinize göre güncellendi.
              description="Markalar için gönderi, hikâye ve kampanya odaklı sosyal medya tasarımlarımı bu bölümde bulabilirsin."
              color="text-pink-400"
              onButtonClick={() => openWorks('SOCIAL')}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <FadeInUp key={i} delay={i * 100}>
                    <div
                      className="portfolio-item group relative rounded-3xl overflow-hidden aspect-[4/5] bg-[#0a0a0a] cursor-pointer border border-white/5"
                      onClick={() => openWorks('SOCIAL')}
                    >
                      <img
                        src={`https://images.unsplash.com/photo-1611162617${i}47-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80`}
                        alt=""
                        className="portfolio-img w-full h-full object-cover transition-transform duration-700"
                      />
                      {/* Hover Overlay - Kaldırıldı */}
                    </div>
                  </FadeInUp>
                ))}
              </div>
            </PortfolioCategory>

            {/* 2. KATEGORİ: VİDEO & MOTION */}
            <PortfolioCategory
              title="MOTION DESIGN"
              subtitle="Motion Design"
              icon={Play}
              description="Reels videoları, tanıtım filmleri, tipografik animasyonlar ve kurguları bu bölümde inceleyebilirsin."
              color="text-blue-400"
              onButtonClick={() => openWorks('MOTION')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FadeInUp delay={200}>
                  <div
                    className="portfolio-item group relative rounded-[2rem] overflow-hidden aspect-[9/16] bg-[#0a0a0a] cursor-pointer border border-white/5"
                    onClick={() => openWorks('MOTION')}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      className="portfolio-img w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                </FadeInUp>
                <FadeInUp delay={400}>
                  <div
                    className="portfolio-item group relative rounded-[2rem] overflow-hidden aspect-[9/16] bg-[#0a0a0a] cursor-pointer border border-white/5"
                    onClick={() => openWorks('MOTION')}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      className="portfolio-img w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                </FadeInUp>
              </div>
            </PortfolioCategory>

            {/* 3. KATEGORİ: YAPAY ZEKÂ (AI) */}
            <PortfolioCategory
              title="YAPAY ZEKÂ (AI)"
              subtitle="AI Generation"
              icon={Cpu}
              description="Görsel, video ve ses alanlarında yapay zekâ destekli üretimler gerçekleştirdiğim çalışmalarıma bu bölümden ulaşabilirsin."
              color="text-purple-400"
              onButtonClick={() => openWorks('AI')}
            >
              <div className="grid grid-cols-1 gap-6">
                <FadeInUp>
                  <div
                    className="portfolio-item group relative rounded-[2.5rem] overflow-hidden aspect-[16/9] md:aspect-[21/9] bg-[#0a0a0a] cursor-pointer border border-white/10"
                    onClick={() => openWorks('AI')}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                      className="portfolio-img w-full h-full object-cover"
                      alt=""
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent flex flex-col justify-end p-8 md:p-12 pointer-events-none">
                      <h4 className="text-3xl md:text-5xl font-black mb-2 text-white">NEON DREAMS</h4>
                      <p className="text-gray-300 max-w-lg">
                        Yapay zekâ ile oluşturulmuş, siberpunk estetiğine sahip konsept ürün çekimi serisi.
                      </p>
                    </div>
                  </div>
                </FadeInUp>

                <div className="grid grid-cols-2 gap-6">
                  <FadeInUp delay={200}>
                    <div
                      className="portfolio-item group relative rounded-3xl overflow-hidden aspect-square bg-[#0a0a0a] border border-white/5"
                      onClick={() => openWorks('AI')}
                    >
                      <img
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        className="portfolio-img w-full h-full object-cover"
                        alt=""
                      />
                    </div>
                  </FadeInUp>
                  <FadeInUp delay={400}>
                    <div
                      className="portfolio-item group relative rounded-3xl overflow-hidden aspect-square bg-[#0a0a0a] border border-white/5"
                      onClick={() => openWorks('AI')}
                    >
                      <img
                        src="https://images.unsplash.com/photo-1614726365203-c03198eb6c33?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        className="portfolio-img w-full h-full object-cover"
                        alt=""
                      />
                    </div>
                  </FadeInUp>
                </div>
              </div>
            </PortfolioCategory>

            {/* 4. KATEGORİ: FOTOĞRAFLAR - SIRALAMA DEĞİŞTİRİLDİ (En sona alındı) */}
            <PortfolioCategory
              title="FOTOĞRAFLAR"
              subtitle="Photography"
              icon={Camera}
              description="Anı yakalamaya odaklandığım fotoğraf çalışmalarım. Bu çalışmalar, zaman zaman tasarımlarımda da yer buluyor. Çektiğim fotoğrafları bu bölümde inceleyebilirsin."
              color="text-yellow-400"
              onButtonClick={() => openWorks('PHOTO')}
            >
              <div className="columns-2 md:columns-2 gap-6 space-y-6">
                {[
                  'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                  'https://images.unsplash.com/photo-1554048612-387768052bf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                  'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                ].map((src, i) => (
                  <FadeInUp key={i} delay={i * 150} className="break-inside-avoid">
                    <div
                      className="portfolio-item group relative rounded-3xl overflow-hidden bg-[#0a0a0a] border border-white/5"
                      onClick={() => openWorks('PHOTO')}
                    >
                      <img src={src} className="portfolio-img w-full h-auto object-cover" alt="" />
                    </div>
                  </FadeInUp>
                ))}
              </div>
            </PortfolioCategory>
          </div>

          {/* SÜREÇ */}
          <section id="süreç" className="py-24 bg-[var(--bg-sec)] transition-colors duration-500">
            <div className="container mx-auto px-6">
              <RevealText>
                {/* DÜZELTME: py-2 eklendi */}
                <h2 className="text-center text-3xl md:text-4xl font-black mb-16 py-2 text-[var(--text-main)]">
                  ÇALIŞMA <span className="text-pink-500 italic">SÜRECİM</span>
                </h2>
              </RevealText>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  {
                    step: '01',
                    title: 'Özet (Brief) ve Hedef',
                    desc: 'Markanın ihtiyaçlarını, hedef kitlesini ve proje amacını netleştiririm.',
                  },
                  {
                    step: '02',
                    title: 'Konsept ve Tasarım',
                    desc: 'Moodboard oluşturur, farklı görsel yaklaşımlar ve tasarım yönleri belirlerim.',
                  },
                  {
                    step: '03',
                    title: 'Üretim',
                    desc: 'Tasarım, motion içerikler ve yapay zekâ destekli üretim sürecini yürütürüm.',
                  },
                  {
                    step: '04',
                    title: 'Teslim ve Revize',
                    desc: 'Final dosyalarını hazırlar, yayınlanacağı mecralara uygun düzenlemeleri yaparım.',
                  },
                ].map((item, index) => (
                  <FadeInUp key={index} delay={index * 150}>
                    <div className="relative p-8 border-l-2 border-[var(--border-color)] hover:border-pink-500 transition-colors duration-300">
                      <span className="text-6xl font-black text-[var(--text-main)] opacity-10 absolute -top-5 left-6 z-0 select-none">
                        {item.step}
                      </span>
                      <div className="relative z-10 pt-4">
                        <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">{item.title}</h3>
                        <p className="text-sm text-[var(--text-sec)] leading-relaxed font-light">{item.desc}</p>
                      </div>
                    </div>
                  </FadeInUp>
                ))}
              </div>
            </div>
          </section>

          {/* YOLCULUĞUM & BECERİLER */}
          <section id="beceriler" className="py-24 bg-[var(--bg-main)] transition-colors duration-500">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
              {/* Yolculuğum (Timeline) */}
              <div id="yolculuğum">
                <FadeInUp>
                  {/* DÜZELTME: py-2 eklendi */}
                  <h2 className="text-2xl md:text-3xl font-black mb-12 flex items-center gap-3 py-2 text-[var(--text-main)]">
                    <Briefcase className="text-pink-500" size={28} />
                    YOLCULUĞUM
                  </h2>
                </FadeInUp>

                {/* DÜZELTME: Dikey çizgi (border-l) kaldırıldı. Liste yapısı Flexbox ile yeniden düzenlendi. */}
                <div className="space-y-12">
                  {timeline.map((item, index) => (
                    <FadeInUp key={index} delay={index * 150}>
                      <div className="flex gap-6 group">
                        {/* Nokta İşaretçisi */}
                        <div className="flex-none mt-1.5">
                          <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-[var(--bg-card)] border-2 border-[var(--border-color)] group-hover:border-pink-500 group-hover:bg-pink-500 transition-all"></div>
                        </div>

                        {/* İçerik */}
                        <div>
                          <span className="text-pink-500 font-bold text-xs tracking-widest uppercase mb-1 block">
                            {item.year}
                          </span>
                          <h3 className="text-xl md:text-2xl font-bold text-[var(--text-main)] mb-1">
                            {item.company}
                          </h3>
                          <h4 className="text-base md:text-lg text-[var(--text-sec)] italic mb-2 font-light">
                            {item.role}
                          </h4>
                          <p className="text-xs md:text-sm text-[var(--text-muted)] font-light">{item.desc}</p>
                        </div>
                      </div>
                    </FadeInUp>
                  ))}
                </div>
              </div>

              {/* Beceriler */}
              <div>
                <FadeInUp>
                  {/* DÜZELTME: py-2 eklendi */}
                  <h2 className="text-2xl md:text-3xl font-black mb-12 flex items-center gap-3 py-2 text-[var(--text-main)]">
                    <Sparkles className="text-pink-500" size={28} />
                    BECERİLER
                  </h2>
                </FadeInUp>
                <div className="space-y-4">
                  <FadeInUp delay={100}>
                    <p className="text-[var(--text-sec)] mb-10 text-sm md:text-base font-light">
                      Yaratıcı vizyonlarınızı hayata geçirmek için ustalaştığım araçlar ve teknikler.
                    </p>
                  </FadeInUp>

                  <SkillBar name="Adobe Photoshop" percent={90} />
                  <SkillBar name="Adobe Illustrator" percent={90} />
                  <SkillBar name="Adobe InDesign" percent={70} />
                  <SkillBar name="Figma" percent={65} />
                  <SkillBar name="Canva" percent={100} />
                  <SkillBar name="CapCut" percent={80} />
                  <SkillBar name="Yapay Zekâ Tasarım Araçları" percent={90} />
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer
            id="iletisim"
            className="min-h-[70vh] bg-[var(--bg-sec)] text-[var(--text-main)] flex flex-col justify-center py-24 px-6 relative overflow-hidden border-t border-[var(--border-color)] transition-colors duration-500"
          >
            {/* Theme-aware gradient backdrop */}
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-500/10 via-[var(--bg-sec)] to-[var(--bg-sec)] transition-colors duration-500"
              />
            </div>

            <div className="relative z-10 container mx-auto text-center">
              <FadeInUp>
                <div className="mb-12">
                  <p className="text-[var(--text-sec)] text-sm md:text-base font-light tracking-[0.2em] mb-4 py-2">
                    YENİ BİR PROJENİZ Mİ VAR?
                  </p>
                  <h2 className="text-2xl md:text-4xl font-light tracking-wide">
                    <span className="font-normal text-pink-500">Selinay Benli</span> ile iletişime geçin.
                  </h2>
                </div>
              </FadeInUp>

              <FadeInUp delay={200}>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=selinaybenliii@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 md:gap-4 text-xl md:text-3xl font-light tracking-wider
                                 border-b border-[var(--border-color)] pb-4
                                 hover:border-pink-500 hover:text-pink-500 transition-all cursor-pointer"
                >
                  <Mail size={24} className="md:w-6 md:h-6" /> selinaybenliii@gmail.com
                </a>
              </FadeInUp>

              <FadeInUp delay={400}>
                <div className="flex justify-center gap-4 md:gap-6 mt-16 flex-wrap">
                  <a
                    href="https://www.linkedin.com/in/selinaybenli/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-full
                                   bg-[var(--bg-card)] border border-[var(--border-color)]
                                   hover:border-transparent hover:bg-[#0077b5] transition-all group"
                  >
                    <Linkedin
                      size={20}
                      className="text-[var(--text-main)] group-hover:text-white group-hover:scale-110 transition-transform"
                    />
                    <span className="text-sm font-bold text-[var(--text-main)] group-hover:text-white transition-colors">
                      LinkedIn
                    </span>
                  </a>

                  <a
                    href="https://instagram.com/selinaybenlii"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-full
                                   bg-[var(--bg-card)] border border-[var(--border-color)]
                                   hover:border-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-orange-500 transition-all group"
                  >
                    <Instagram
                      size={20}
                      className="text-[var(--text-main)] group-hover:text-white group-hover:scale-110 transition-transform"
                    />
                    <span className="text-sm font-bold text-[var(--text-main)] group-hover:text-white transition-colors">
                      Instagram
                    </span>
                  </a>

                  <a
                    href="https://wa.me/905339783380"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-full
                                   bg-[var(--bg-card)] border border-[var(--border-color)]
                                   hover:border-transparent hover:bg-green-600 transition-all group"
                  >
                    <Smartphone
                      size={20}
                      className="text-[var(--text-main)] group-hover:text-white group-hover:scale-110 transition-transform"
                    />
                    <span className="text-sm font-bold text-[var(--text-main)] group-hover:text-white transition-colors">
                      WhatsApp
                    </span>
                  </a>
                </div>
              </FadeInUp>
            </div>

            <div className="absolute bottom-8 w-full text-center text-[var(--text-muted)] text-xs md:text-sm font-light tracking-wide transition-colors duration-500">
              <p>© 2025 Selinay Benli. Tüm hakları saklıdır. İstanbul, TR.</p>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
};

export default SelinayPortfolio;
