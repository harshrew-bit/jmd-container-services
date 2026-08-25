import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Public layout components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileStickyBar } from './components/layout/MobileStickyBar';

// Public pages
import { HomePage } from './pages/HomePage';
import { ContainersPage } from './pages/ContainersPage';
import { ContainerDetailPage } from './pages/ContainerDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { CustomSolutionsPage } from './pages/CustomSolutionsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Owner Dashboard pages
import { OwnerLoginPage } from './pages/owner/OwnerLoginPage';
import { OwnerLayout } from './pages/owner/OwnerLayout';
import { OwnerOverviewPage } from './pages/owner/OwnerOverviewPage';
import { OwnerContainersPage } from './pages/owner/OwnerContainersPage';
import { OwnerProjectsPage } from './pages/owner/OwnerProjectsPage';
import { OwnerMediaPage } from './pages/owner/OwnerMediaPage';
import { OwnerBusinessInfoPage } from './pages/owner/OwnerBusinessInfoPage';
import { OwnerEnquiriesPage } from './pages/owner/OwnerEnquiriesPage';

// Helper component to scroll window to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname]);

  return null;
}

// Public layout wrapper (includes header, footer, sticky bar)
function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-charcoal-950 text-charcoal-900 dark:text-slate-100 selection:bg-brand-700 selection:text-white pb-16 md:pb-0 transition-colors duration-200">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileStickyBar />
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Owner Login Route */}
            <Route path="/owner/login" element={<OwnerLoginPage />} />

            {/* Legacy alias redirect */}
            <Route path="/owner-portal" element={<Navigate to="/owner" replace />} />

            {/* Protected Owner Management System */}
            <Route
              path="/owner"
              element={
                <ProtectedRoute>
                  <OwnerLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<OwnerOverviewPage />} />
              <Route path="containers" element={<OwnerContainersPage />} />
              <Route path="projects" element={<OwnerProjectsPage />} />
              <Route path="media" element={<OwnerMediaPage />} />
              <Route path="business-info" element={<OwnerBusinessInfoPage />} />
              <Route path="enquiries" element={<OwnerEnquiriesPage />} />
            </Route>

            {/* Public Website Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/containers" element={<ContainersPage />} />
              <Route path="/containers/:id" element={<ContainerDetailPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/our-work" element={<ProjectsPage />} />
              <Route path="/custom-solutions" element={<CustomSolutionsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
