import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../contexts/ToastContext';
import ProjectCard from '../components/ProjectCard';
import SkillBar from '../components/SkillBar';
import TextToSpeechButton from '../components/TextToSpeechButton';
import Lightbox from '../components/Lightbox';
import CertificateModal from '../components/CertificateModal';
import {
  Download,
  ArrowRight,
  Sparkles,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle,
  FolderGit2,
  Calendar,
  Eye,
  Mail
} from 'lucide-react';

export default function Home() {
  const { profile: layoutProfile, socialLinks } = useOutletContext() || {};
  const [profile, setProfile] = useState(layoutProfile || null);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [featuredSkills, setFeaturedSkills] = useState([]);
  const [recentAchievements, setRecentAchievements] = useState([]);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const { t, getContent, isNepali } = useLanguage();
  const toast = useToast();

  useEffect(() => {
    // If layout profile exists, set it
    if (layoutProfile) setProfile(layoutProfile);

    // Fetch featured projects
    fetch('/api/portfolio?featured=true')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setFeaturedProjects(d.projects?.slice(0, 3) || []);
      })
      .catch(() => {});

    // Fetch skills
    fetch('/api/skills')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          const allSkills = d.categories.flatMap((c) => c.skills);
          const top = allSkills.filter((s) => s.isFeatured).slice(0, 6);
          setFeaturedSkills(top.length > 0 ? top : allSkills.slice(0, 6));
        }
      })
      .catch(() => {});

    // Fetch achievements
    fetch('/api/achievements?featured=true')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setRecentAchievements(d.achievements?.slice(0, 3) || []);
      })
      .catch(() => {});

    // Fetch latest blogs
    fetch('/api/blog?limit=3')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setLatestBlogs(d.posts || []);
      })
      .catch(() => {});
  }, [layoutProfile]);

  const handleDownloadCv = async () => {
    try {
      toast.info(isNepali ? 'CV डाउनलोड गरिँदैछ...' : 'Initiating CV download...');
      window.open('/api/cv/download', '_blank');
    } catch (e) {
      toast.error('Failed to download CV.');
    }
  };

  const fullName = getContent(profile?.fullName, profile?.fullNameNe) || 'Navin Sharma';
  const title = getContent(profile?.professionalTitle, profile?.professionalTitleNe) || 'Lead Software Architect & AI Systems Specialist';
  const tagline = getContent(profile?.tagline, profile?.taglineNe) || 'Engineering resilient digital architectures, ethical AI solutions, and hyper-accessible web experiences.';
  const shortBio = getContent(profile?.shortBio, profile?.shortBioNe) || 'Over 8+ years of expertise in architecting high-scale platforms and inclusive digital products.';

  const heroSpeech = `${fullName}. ${title}. ${tagline}. ${shortBio}`;

  return (
    <div>
      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section
        style={{
          position: 'relative',
          padding: '80px 0 60px 0',
          overflow: 'hidden'
        }}
      >
        {/* Ambient Glows */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(16, 185, 129, 0.05) 50%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '48px',
              alignItems: 'center'
            }}
          >
            {/* Left Content */}
            <div>
              {/* Badge & Audio Listen */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '20px',
                  flexWrap: 'wrap'
                }}
              >
                <div className="section-tag" style={{ margin: 0 }}>
                  <Sparkles size={14} />
                  <span>{isNepali ? 'डिजिटल पहिचान' : 'Digital Portfolio & Identity'}</span>
                </div>
                <TextToSpeechButton textToRead={heroSpeech} size="small" />
              </div>

              {/* Title & Name */}
              <h1
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  marginBottom: '16px'
                }}
              >
                {isNepali ? 'नमस्ते, म ' : 'Hello, I am '}
                <span className="gradient-text">{fullName}</span>
              </h1>

              <div
                style={{
                  fontSize: 'clamp(1.15rem, 2.5vw, 1.45rem)',
                  fontWeight: 600,
                  color: 'var(--primary)',
                  marginBottom: '16px'
                }}
              >
                {title}
              </div>

              <p
                style={{
                  fontSize: '1.15rem',
                  lineHeight: 1.6,
                  color: 'var(--text-secondary)',
                  marginBottom: '28px',
                  maxWidth: '560px'
                }}
              >
                {tagline}
              </p>

              {/* Call to Actions */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  flexWrap: 'wrap',
                  marginBottom: '36px'
                }}
              >
                <Link to="/about" className="btn btn-primary btn-lg">
                  <span>{t('aboutMeAction')}</span>
                  <ArrowRight size={18} />
                </Link>

                <button onClick={handleDownloadCv} className="btn btn-secondary btn-lg">
                  <Download size={18} />
                  <span>{t('downloadCv')}</span>
                </button>

                <Link to="/contact" className="btn btn-outline btn-lg">
                  <Mail size={18} />
                  <span>{t('contactMe')}</span>
                </Link>
              </div>

              {/* Trust Indicators / Badges */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  flexWrap: 'wrap',
                  color: 'var(--text-muted)',
                  fontSize: '0.85rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle size={16} color="#10b981" />
                  <span>WCAG 2.1 AAA Compliant</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle size={16} color="#10b981" />
                  <span>Verified Architecture</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle size={16} color="#10b981" />
                  <span>Kathmandu, Nepal</span>
                </div>
              </div>
            </div>

            {/* Right Profile Showcase */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              <div
                className="animate-float"
                style={{
                  position: 'relative',
                  width: '320px',
                  height: '380px',
                  borderRadius: '24px',
                  padding: '8px',
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.4) 0%, rgba(16, 185, 129, 0.4) 100%)',
                  boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.5)'
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    background: 'var(--bg-surface-elevated)',
                    position: 'relative'
                  }}
                >
                  <img
                    src={profile?.profilePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80'}
                    alt={fullName}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />

                  {/* Floating Experience Chip */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      left: '16px',
                      right: '16px',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(15, 23, 42, 0.85)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{t('yearsExp')}</div>
                      <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>
                        {profile?.yearsExperience || 8}+ Years
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{t('completedProjects')}</div>
                      <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#10b981' }}>
                        {profile?.projectsCompleted || 35}+
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          KEY STATISTICS METRICS BAR
          ========================================================================= */}
      <section style={{ padding: '20px 0 60px 0' }}>
        <div className="container">
          <div
            className="glass-panel"
            style={{
              padding: '28px 36px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
              textAlign: 'center'
            }}
          >
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)' }}>
                {profile?.projectsCompleted || 38}+
              </div>
              <div style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                {t('completedProjects')}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent)' }}>
                {profile?.yearsExperience || 8}+
              </div>
              <div style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                {t('yearsExp')}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#f59e0b' }}>
                {profile?.trainingsCount || 24}+
              </div>
              <div style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                {t('trainingsConducted')}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ec4899' }}>
                {profile?.achievementsCount || 15}+
              </div>
              <div style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                {t('majorAchievements')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FEATURED PORTFOLIO WORKS
          ========================================================================= */}
      <section className="section" style={{ background: 'var(--bg-subtle)' }}>
        <div className="container">
          <div className="section-title-wrap">
            <div className="section-tag">
              <FolderGit2 size={14} />
              <span>{t('portfolio')}</span>
            </div>
            <h2 className="section-heading">{t('featuredWorks')}</h2>
            <p className="section-subtitle">{t('featuredWorksSubtitle')}</p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '30px',
              marginBottom: '40px'
            }}
          >
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={(p) => setSelectedProject(p)}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/portfolio" className="btn btn-secondary btn-lg">
              <span>{t('allProjects')}</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          KEY SKILLS VISUALIZATION PREVIEW
          ========================================================================= */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrap">
            <div className="section-tag">
              <Sparkles size={14} />
              <span>{t('skills')}</span>
            </div>
            <h2 className="section-heading">{t('coreProficiencies')}</h2>
            <p className="section-subtitle">{t('coreProficienciesSubtitle')}</p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '20px',
              marginBottom: '36px'
            }}
          >
            {featuredSkills.map((skill) => (
              <SkillBar key={skill.id} skill={skill} />
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/skills" className="btn btn-outline">
              <span>{isNepali ? 'सबै प्राविधिक सीपहरू हेर्नुहोस्' : 'Explore Full Skill Matrix'}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          HONORS & ACHIEVEMENTS PREVIEW
          ========================================================================= */}
      {recentAchievements.length > 0 && (
        <section className="section" style={{ background: 'var(--bg-subtle)' }}>
          <div className="container">
            <div className="section-title-wrap">
              <div className="section-tag">
                <Award size={14} />
                <span>{t('achievements')}</span>
              </div>
              <h2 className="section-heading">{t('recentMilestones')}</h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px',
                marginBottom: '36px'
              }}
            >
              {recentAchievements.map((item) => (
                <div
                  key={item.id}
                  className="glass-card"
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '12px'
                    }}
                  >
                    <span className="badge badge-emerald">{item.date}</span>
                    <Award size={20} color="var(--accent)" />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
                    {getContent(item.title, item.titleNe)}
                  </h3>
                  <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '12px' }}>
                    {getContent(item.organization, item.organizationNe)}
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', flex: 1, lineHeight: 1.55 }}>
                    {getContent(item.description, item.descriptionNe)}
                  </p>

                  {item.certificateUrl && (
                    <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
                      <button
                        onClick={() => setSelectedAchievement(item)}
                        className="btn btn-outline btn-sm"
                        style={{ width: '100%' }}
                      >
                        <Eye size={14} />
                        <span>{t('viewCertificate')}</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <Link to="/achievements" className="btn btn-secondary">
                <span>{isNepali ? 'सबै सम्मान तथा पुरस्कार हेर्नुहोस्' : 'View All Achievements & Awards'}</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          LATEST BLOG ARTICLES
          ========================================================================= */}
      {latestBlogs.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-title-wrap">
              <div className="section-tag">
                <BookOpen size={14} />
                <span>{t('blog')}</span>
              </div>
              <h2 className="section-heading">{t('latestArticles')}</h2>
              <p className="section-subtitle">{t('latestArticlesSubtitle')}</p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '28px',
                marginBottom: '36px'
              }}
            >
              {latestBlogs.map((post) => (
                <article
                  key={post.id}
                  className="glass-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 0,
                    overflow: 'hidden'
                  }}
                >
                  {post.featuredImage && (
                    <div style={{ height: '190px', width: '100%', overflow: 'hidden' }}>
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  )}
                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                        marginBottom: '10px'
                      }}
                    >
                      <span className="badge badge-primary">{post.category}</span>
                      <span>{post.readingTime}</span>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', lineHeight: 1.35 }}>
                      <Link to={`/blog/${post.slug}`} style={{ color: 'inherit' }}>
                        {getContent(post.title, post.titleNe)}
                      </Link>
                    </h3>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px', flex: 1, lineHeight: 1.55 }}>
                      {getContent(post.excerpt, post.excerptNe)}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </span>
                      <Link to={`/blog/${post.slug}`} style={{ fontSize: '0.875rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span>{isNepali ? 'थप पढ्नुहोस्' : 'Read Article'}</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <Link to="/blog" className="btn btn-secondary">
                <span>{isNepali ? 'सबै लेखहरू हेर्नुहोस्' : 'Browse All Articles'}</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          CALL TO ACTION BANNER
          ========================================================================= */}
      <section style={{ padding: '40px 0 80px 0' }}>
        <div className="container">
          <div
            className="glass-panel"
            style={{
              padding: '48px 36px',
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(16, 185, 129, 0.1) 100%)',
              borderColor: 'rgba(99, 102, 241, 0.3)'
            }}
          >
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', marginBottom: '16px' }}>
              {isNepali ? 'सँगै केही उत्कृष्ट र प्रभावकारी निर्माण गरौँ' : 'Have a Vision for Impactful Software?'}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '640px', margin: '0 auto 28px auto' }}>
              {isNepali
                ? 'नयाँ आर्किटेक्चर, एआई प्रणाली, वा डिजिटल पहुँचयोग्यता विषयमा परामर्शका लागि म सधैं खुला छु।'
                : 'I am always excited to discuss software architectures, ethical AI implementations, and high-impact digital initiatives.'}
            </p>
            <Link to="/contact" className="btn btn-primary btn-lg">
              <span>{t('contactMe')}</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox / Modals */}
      {selectedAchievement && (
        <CertificateModal
          item={selectedAchievement}
          onClose={() => setSelectedAchievement(null)}
        />
      )}

      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)} role="dialog" aria-modal="true">
          <div className="modal-content animate-slide-up" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '780px', padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span className="badge badge-primary" style={{ marginBottom: '8px' }}>{selectedProject.category}</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{getContent(selectedProject.title, selectedProject.titleNe)}</h3>
              </div>
              <button onClick={() => setSelectedProject(null)} className="btn-icon" style={{ width: '36px', height: '36px' }}>✕</button>
            </div>

            {selectedProject.thumbnail && (
              <img
                src={selectedProject.thumbnail}
                alt={selectedProject.title}
                style={{ width: '100%', maxHeight: '340px', objectFit: 'cover', borderRadius: '12px', marginBottom: '20px' }}
              />
            )}

            <div style={{ whiteSpace: 'pre-line', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px', fontSize: '0.95rem' }}>
              {getContent(selectedProject.description, selectedProject.descriptionNe)}
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              {selectedProject.githubUrl && (
                <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">
                  <span>{t('githubRepo')}</span>
                </a>
              )}
              {selectedProject.projectUrl && (
                <a href={selectedProject.projectUrl} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                  <span>{t('livePreview')}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
