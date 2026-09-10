import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { PartnerAuthProvider } from './context/PartnerAuthContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { ApplicationProvider } from './context/ApplicationContext';
import { PageContainer } from './components/layout/PageContainer';
import { PartnerLayout } from './components/partner/PartnerLayout';
import { AdminLayout } from './components/admin/AdminLayout';
import { AuthModal } from './pages/auth/AuthModal';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { DemoSwitcher } from './components/common/DemoSwitcher';

// Student Pages
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { Notifications } from './pages/Notifications';
import { Profile } from './pages/Profile';

// Student Study Abroad Pages
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

// Partner Portal Pages
import { PartnerLogin } from './pages/partner/PartnerLogin';
import { PartnerRegister } from './pages/partner/PartnerRegister';
import { PartnerProfile } from './pages/partner/PartnerProfile';
import { PartnerNotifications } from './pages/partner/PartnerNotifications';

// Partner Agent Pages
import { AgentDashboard } from './pages/partner/agent/AgentDashboard';
import { AgentStudents } from './pages/partner/agent/AgentStudents';
import { AgentStudentDetail } from './pages/partner/agent/AgentStudentDetail';
import { AgentApplications } from './pages/partner/agent/AgentApplications';
import { AgentCreateApplication } from './pages/partner/agent/AgentCreateApplication';
import { AgentColleges } from './pages/partner/agent/AgentColleges';

// Partner College Pages
import { CollegeDashboard } from './pages/partner/college/CollegeDashboard';
import { CollegeApplications } from './pages/partner/college/CollegeApplications';
import { CollegeCourses } from './pages/partner/college/CollegeCourses';

// Partner Hotel Pages
import { HotelDashboard } from './pages/partner/hotel/HotelDashboard';
import { HotelProperties } from './pages/partner/hotel/HotelProperties';
import { HotelBookings } from './pages/partner/hotel/HotelBookings';

// Partner Tutor Pages
import { TutorDashboard } from './pages/partner/tutor/TutorDashboard';
import { TutorSubjects } from './pages/partner/tutor/TutorSubjects';
import { TutorQualifications } from './pages/partner/tutor/TutorQualifications';
import { TutorAvailability } from './pages/partner/tutor/TutorAvailability';
import { TutorBookings } from './pages/partner/tutor/TutorBookings';

// Admin Panel Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminPartners } from './pages/admin/AdminPartners';
import { AdminStudents } from './pages/admin/AdminStudents';
import { AdminColleges } from './pages/admin/AdminColleges';
import { AdminCourses } from './pages/admin/AdminCourses';
import { AdminApplications } from './pages/admin/AdminApplications';
import { AdminDocuments } from './pages/admin/AdminDocuments';
import { AdminProperties } from './pages/admin/AdminProperties';
import { AdminTutors } from './pages/admin/AdminTutors';
import { AdminBookings } from './pages/admin/AdminBookings';
import { AdminCabs } from './pages/admin/AdminCabs';
import { AdminNotifications } from './pages/admin/AdminNotifications';
import { AdminAudit } from './pages/admin/AdminAudit';
import { AdminSettings } from './pages/admin/AdminSettings';

// Scroll to top on route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Wrapper for Student layout
const StudentRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <PageContainer>{children}</PageContainer>
);

export function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <PartnerAuthProvider>
            <AdminAuthProvider>
              <ApplicationProvider>
                <ScrollToTop />
                <Routes>
                  {/* ================================================= */}
                  {/* 1. CUSTOMER PLATFORM & AUTH (edunomo.in)          */}
                  {/* ================================================= */}
                  {/* Public Authentication Routes */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />

                  {/* Public Browsing Routes */}
                  <Route path="/" element={<StudentRoute><Home /></StudentRoute>} />
                  <Route path="/explore" element={<StudentRoute><Explore /></StudentRoute>} />

                  {/* Protected Customer Routes */}
                  <Route path="/my-journey" element={<Navigate to="/" replace />} />
                  <Route path="/notifications" element={<ProtectedRoute><StudentRoute><Notifications /></StudentRoute></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><StudentRoute><Profile /></StudentRoute></ProtectedRoute>} />

                  {/* Study Abroad Module */}
                  <Route path="/study-abroad" element={<StudentRoute><StudyAbroadListing /></StudentRoute>} />
                  <Route path="/study-abroad/colleges/:id" element={<StudentRoute><CollegeDetail /></StudentRoute>} />
                  <Route path="/study-abroad/courses/:id" element={<StudentRoute><CourseDetail /></StudentRoute>} />
                  <Route path="/apply/:courseId" element={<ProtectedRoute><StudentRoute><ApplyWizard /></StudentRoute></ProtectedRoute>} />
                  <Route path="/applications" element={<ProtectedRoute><StudentRoute><MyApplications /></StudentRoute></ProtectedRoute>} />
                  <Route path="/applications/:id" element={<ProtectedRoute><StudentRoute><ApplicationDetail /></StudentRoute></ProtectedRoute>} />
                  <Route path="/applications/success/:appId" element={<ProtectedRoute><StudentRoute><ApplicationSuccess /></StudentRoute></ProtectedRoute>} />

                  {/* Secondary Mobility Modules */}
                  <Route path="/visa" element={<StudentRoute><VisaPage /></StudentRoute>} />
                  <Route path="/flights" element={<StudentRoute><FlightsPage /></StudentRoute>} />
                  <Route path="/hotels" element={<StudentRoute><HotelsPage /></StudentRoute>} />
                  <Route path="/cabs" element={<StudentRoute><CabsPage /></StudentRoute>} />
                  <Route path="/tuition" element={<StudentRoute><TuitionPage /></StudentRoute>} />

                  {/* ================================================= */}
                  {/* 2. UNIFIED PARTNER PORTAL (partner.edunomo.in)    */}
                  {/* ================================================= */}
                  <Route path="/partner" element={<Navigate to="/partner/login" replace />} />
                  <Route path="/partner/login" element={<PartnerLogin />} />
                  <Route path="/partner/register" element={<PartnerRegister />} />

                  {/* Unified Profile & Notifications */}
                  <Route path="/partner/profile" element={<PartnerLayout><PartnerProfile /></PartnerLayout>} />
                  <Route path="/partner/notifications" element={<PartnerLayout><PartnerNotifications /></PartnerLayout>} />

                  {/* Agent Partner Routes */}
                  <Route path="/partner/agent/dashboard" element={<PartnerLayout><AgentDashboard /></PartnerLayout>} />
                  <Route path="/partner/agent/students" element={<PartnerLayout><AgentStudents /></PartnerLayout>} />
                  <Route path="/partner/agent/students/:id" element={<PartnerLayout><AgentStudentDetail /></PartnerLayout>} />
                  <Route path="/partner/agent/applications" element={<PartnerLayout><AgentApplications /></PartnerLayout>} />
                  <Route path="/partner/agent/applications/new" element={<PartnerLayout><AgentCreateApplication /></PartnerLayout>} />
                  <Route path="/partner/agent/colleges" element={<PartnerLayout><AgentColleges /></PartnerLayout>} />

                  {/* College Partner Routes */}
                  <Route path="/partner/college/dashboard" element={<PartnerLayout><CollegeDashboard /></PartnerLayout>} />
                  <Route path="/partner/college/applications" element={<PartnerLayout><CollegeApplications /></PartnerLayout>} />
                  <Route path="/partner/college/courses" element={<PartnerLayout><CollegeCourses /></PartnerLayout>} />

                  {/* Hotel Partner Routes */}
                  <Route path="/partner/hotel/dashboard" element={<PartnerLayout><HotelDashboard /></PartnerLayout>} />
                  <Route path="/partner/hotel/properties" element={<PartnerLayout><HotelProperties /></PartnerLayout>} />
                  <Route path="/partner/hotel/bookings" element={<PartnerLayout><HotelBookings /></PartnerLayout>} />

                  {/* Tutor Partner Routes */}
                  <Route path="/partner/tutor/dashboard" element={<PartnerLayout><TutorDashboard /></PartnerLayout>} />
                  <Route path="/partner/tutor/subjects" element={<PartnerLayout><TutorSubjects /></PartnerLayout>} />
                  <Route path="/partner/tutor/qualifications" element={<PartnerLayout><TutorQualifications /></PartnerLayout>} />
                  <Route path="/partner/tutor/availability" element={<PartnerLayout><TutorAvailability /></PartnerLayout>} />
                  <Route path="/partner/tutor/bookings" element={<PartnerLayout><TutorBookings /></PartnerLayout>} />

                  {/* ================================================= */}
                  {/* 3. ENTERPRISE ADMIN PANEL (admin.edunomo.in)      */}
                  {/* ================================================= */}
                  <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
                  <Route path="/admin/partners" element={<AdminLayout><AdminPartners /></AdminLayout>} />
                  <Route path="/admin/students" element={<AdminLayout><AdminStudents /></AdminLayout>} />
                  <Route path="/admin/colleges" element={<AdminLayout><AdminColleges /></AdminLayout>} />
                  <Route path="/admin/courses" element={<AdminLayout><AdminCourses /></AdminLayout>} />
                  <Route path="/admin/applications" element={<AdminLayout><AdminApplications /></AdminLayout>} />
                  <Route path="/admin/documents" element={<AdminLayout><AdminDocuments /></AdminLayout>} />
                  <Route path="/admin/properties" element={<AdminLayout><AdminProperties /></AdminLayout>} />
                  <Route path="/admin/tutors" element={<AdminLayout><AdminTutors /></AdminLayout>} />
                  <Route path="/admin/bookings" element={<AdminLayout><AdminBookings /></AdminLayout>} />
                  <Route path="/admin/cabs" element={<AdminLayout><AdminCabs /></AdminLayout>} />
                  <Route path="/admin/notifications" element={<AdminLayout><AdminNotifications /></AdminLayout>} />
                  <Route path="/admin/audit" element={<AdminLayout><AdminAudit /></AdminLayout>} />
                  <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>

                {/* Global Demo Persona Switcher (Allows instant 1-click testing of all 6 roles) */}
                <DemoSwitcher />

                {/* Global Student Authentication Modal */}
                <AuthModal />
              </ApplicationProvider>
            </AdminAuthProvider>
          </PartnerAuthProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
