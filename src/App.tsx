import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MedicalDisclaimer } from './components/MedicalDisclaimer';
import { Services } from './components/Services';
import { Courses } from './components/Courses';
import { News } from './components/News';
import { Team } from './components/Team';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { LoginModal } from './components/admin/LoginModal';
import { AdminPanel } from './components/admin/AdminPanel';

const MainApp: React.FC = () => {
  const { user } = useAuth();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  const [selectedServiceForForm, setSelectedServiceForForm] = useState<string>('');

  const handleSelectService = (serviceName: string) => {
    setSelectedServiceForForm(serviceName);
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreClick = () => {
    const servicesSection = document.getElementById('servicios');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 flex flex-col selection:bg-forest-100 selection:text-forest-900">
      
      {/* Fixed Navbar with brand, links, WhatsApp CTA and discreet admin button */}
      <Navbar
        onOpenLogin={() => setLoginModalOpen(true)}
        onOpenAdmin={() => setAdminPanelOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        
        {/* Hero Banner with exact Stitch aesthetic */}
        <Hero onExploreClick={handleExploreClick} />

        {/* Ethical commitment & Medical disclaimer banner */}
        <MedicalDisclaimer />

        {/* 3 Detailed Services Cards */}
        <Services onSelectService={handleSelectService} />

        {/* Dynamic Courses Section from Firestore */}
        <Courses onSelectCourse={handleSelectService} />

        {/* Dynamic News & Announcements Section from Firestore */}
        <News onSelectNews={handleSelectService} />

        {/* Therapeutic Team: Silvia Villanueva & Roberto Vizza */}
        <Team />

        {/* Direct Consultation Contact Form */}
        <ContactForm initialService={selectedServiceForForm} />

      </main>

      {/* Comprehensive Footer */}
      <Footer
        onOpenLogin={() => setLoginModalOpen(true)}
        onOpenAdmin={() => setAdminPanelOpen(true)}
        isLoggedIn={Boolean(user)}
      />

      {/* Admin Authentication Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={() => setAdminPanelOpen(true)}
      />

      {/* Full Admin Management Panel */}
      <AdminPanel
        isOpen={adminPanelOpen}
        onClose={() => setAdminPanelOpen(false)}
      />

    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
