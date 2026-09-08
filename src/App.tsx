import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { ApplicationProvider } from './context/ApplicationContext';
import { PageContainer } from './components/layout/PageContainer';
import { AuthModal } from './pages/auth/AuthModal';

// Pages
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { MyJourney } from './pages/MyJourney';
import { Notifications } from './pages/Notifications';
import { Profile } from './pages/Profile';

// Study Abroad Pages
import { StudyAbroadListing } from './pages/studyAbroad/Listing';
import { CollegeDetail } from './pages/studyAbroad/CollegeDetail';
import { CourseDetail } from './pages/studyAbroad/CourseDetail';
import { ApplyWizard } from './pages/studyAbroad/ApplyWizard';
import { ApplicationSuccess } from './pages/studyAbroad/ApplicationSuccess';
import { MyApplications } from './pages/studyAbroad/MyApplications';
import { ApplicationDetail } from './pages/studyAbroad/ApplicationDetail';

// Secondary Services Pages
import { VisaPage } from './pages/services/VisaPage';
import { FlightsPage } from './pages/services/FlightsPage';
import { HotelsPage } from './pages/services/HotelsPage';
import { CabsPage } from './pages/services/CabsPage';
import { TuitionPage } from './pages/services/TuitionPage';

// Scroll to top on route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <ApplicationProvider>
            <ScrollToTop />
            <PageContainer>
              <Routes>
                {/* Global BottomNav Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/my-journey" element={<MyJourney />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/profile" element={<Profile />} />

                {/* Study Abroad Module (Primary End-to-End Workflow) */}
                <Route path="/study-abroad" element={<StudyAbroadListing />} />
                <Route path="/study-abroad/colleges/:id" element={<CollegeDetail />} />
                <Route path="/study-abroad/courses/:id" element={<CourseDetail />} />
                <Route path="/apply/:courseId" element={<ApplyWizard />} />
                <Route path="/applications" element={<MyApplications />} />
                <Route path="/applications/:id" element={<ApplicationDetail />} />
                <Route path="/applications/success/:appId" element={<ApplicationSuccess />} />

                {/* Secondary Mobility Modules */}
                <Route path="/visa" element={<VisaPage />} />
                <Route path="/flights" element={<FlightsPage />} />
                <Route path="/hotels" element={<HotelsPage />} />
                <Route path="/cabs" element={<CabsPage />} />
                <Route path="/tuition" element={<TuitionPage />} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </PageContainer>
            {/* Global Authentication Modal */}
            <AuthModal />
          </ApplicationProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
