import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SkipToContent from '../components/SkipToContent';
import AiChatbot from '../components/AiChatbot';
import { initialProfile, initialSocialLinks } from '../data/initialData';

export default function MainLayout() {
  const [profile, setProfile] = useState(initialProfile);
  const [socialLinks, setSocialLinks] = useState(initialSocialLinks);

  useEffect(() => {
    fetch('/api/profile')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.profile) {
          setProfile(data.profile);
          setSocialLinks(data.socialLinks?.length ? data.socialLinks : initialSocialLinks);
        }
      })
      .catch(() => {
        // Fallback to initialProfile if API is not hosted/reachable
      });
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      <SkipToContent />
      <Navbar />

      <main
        id="main-content"
        tabIndex="-1"
        style={{
          flex: 1,
          outline: 'none'
        }}
      >
        <Outlet context={{ profile, socialLinks }} />
      </main>

      <Footer profile={profile} socialLinks={socialLinks} />
      <AiChatbot />
    </div>
  );
}
