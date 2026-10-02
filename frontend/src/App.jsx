import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Context Providers
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import SkillsPage from './pages/SkillsPage';
import PortfolioPage from './pages/PortfolioPage';
import ExperiencePage from './pages/ExperiencePage';
import EducationPage from './pages/EducationPage';
import AchievementsPage from './pages/AchievementsPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import AccessibilityPage from './pages/AccessibilityPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProfile from './pages/admin/AdminProfile';
import AdminSkills from './pages/admin/AdminSkills';
import AdminPortfolio from './pages/admin/AdminPortfolio';
import AdminExperience from './pages/admin/AdminExperience';
import AdminEducation from './pages/admin/AdminEducation';
import AdminAchievements from './pages/admin/AdminAchievements';
import AdminBlog from './pages/admin/AdminBlog';
import AdminGallery from './pages/admin/AdminGallery';
import AdminMessages from './pages/admin/AdminMessages';
import AdminCv from './pages/admin/AdminCv';
import AdminMedia from './pages/admin/AdminMedia';
import AdminSettings from './pages/admin/AdminSettings';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AccessibilityProvider>
          <AuthProvider>
            <ToastProvider>
              <BrowserRouter>
                <Routes>
                  {/* Public Website Routes */}
                  <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="skills" element={<SkillsPage />} />
                    <Route path="portfolio" element={<PortfolioPage />} />
                    <Route path="experience" element={<ExperiencePage />} />
                    <Route path="education" element={<EducationPage />} />
                    <Route path="achievements" element={<AchievementsPage />} />
                    <Route path="blog" element={<BlogPage />} />
                    <Route path="blog/:slug" element={<BlogPostPage />} />
                    <Route path="gallery" element={<GalleryPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="privacy" element={<PrivacyPage />} />
                    <Route path="terms" element={<TermsPage />} />
                    <Route path="accessibility" element={<AccessibilityPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Route>

                  {/* Admin Portal Routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="profile" element={<AdminProfile />} />
                    <Route path="skills" element={<AdminSkills />} />
                    <Route path="portfolio" element={<AdminPortfolio />} />
                    <Route path="experience" element={<AdminExperience />} />
                    <Route path="education" element={<AdminEducation />} />
                    <Route path="achievements" element={<AdminAchievements />} />
                    <Route path="blog" element={<AdminBlog />} />
                    <Route path="gallery" element={<AdminGallery />} />
                    <Route path="messages" element={<AdminMessages />} />
                    <Route path="cv" element={<AdminCv />} />
                    <Route path="media" element={<AdminMedia />} />
                    <Route path="settings" element={<AdminSettings />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </ToastProvider>
          </AuthProvider>
        </AccessibilityProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
