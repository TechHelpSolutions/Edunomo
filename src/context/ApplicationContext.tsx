import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Application, ApplicationStatus, DocumentItem } from '../types';
import { studyAbroadService } from '../services/studyAbroadService';
import { notificationService } from '../services/notificationService';
import { useToast } from './ToastContext';

interface ApplicationContextType {
  applications: Application[];
  loading: boolean;
  savedCollegeIds: string[];
  refreshApplications: () => Promise<void>;
  createApplication: (newApp: Omit<Application, 'id' | 'submissionDate' | 'status' | 'timeline'>) => Promise<Application>;
  updateStatus: (appId: string, status: ApplicationStatus, note?: string) => Promise<void>;
  updateDocument: (appId: string, docId: string, updates: Partial<DocumentItem>) => Promise<void>;
  toggleSaveCollege: (collegeId: string) => void;
  isCollegeSaved: (collegeId: string) => boolean;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [savedCollegeIds, setSavedCollegeIds] = useState<string[]>([]);
  const { showToast } = useToast();

  const refreshApplications = useCallback(async () => {
    setLoading(true);
    try {
      const list = await studyAbroadService.getApplications();
      setApplications(list);
      setSavedCollegeIds(studyAbroadService.getSavedCollegeIds());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshApplications();
  }, [refreshApplications]);

  const createApplication = async (
    newApp: Omit<Application, 'id' | 'submissionDate' | 'status' | 'timeline'>
  ): Promise<Application> => {
    const created = await studyAbroadService.createApplication(newApp);
    setApplications((prev) => [created, ...prev]);

    // Send notification
    notificationService.addNotification({
      title: `Application Submitted (${created.id})`,
      message: `Your application for ${created.courseTitle} at ${created.collegeName} was received.`,
      type: 'success',
      link: `/applications/${created.id}`
    });

    showToast(`Application #${created.id} submitted successfully!`, 'success');
    return created;
  };

  const updateStatus = async (appId: string, status: ApplicationStatus, note?: string) => {
    const updated = await studyAbroadService.updateApplicationStatus(appId, status, note);
    if (updated) {
      setApplications((prev) => prev.map((a) => (a.id === appId ? updated : a)));

      let notifType: 'info' | 'success' | 'warning' | 'alert' = 'info';
      if (status === 'Documents Required') notifType = 'warning';
      if (status === 'Accepted') notifType = 'success';

      notificationService.addNotification({
        title: `Status Update: ${status}`,
        message: note || `Application #${appId} status has changed to ${status}.`,
        type: notifType,
        link: `/applications/${appId}`
      });

      showToast(`Status updated to ${status}`, notifType === 'warning' ? 'error' : 'info');
    }
  };

  const updateDocument = async (appId: string, docId: string, updates: Partial<DocumentItem>) => {
    const updated = await studyAbroadService.updateApplicationDocument(appId, docId, updates);
    if (updated) {
      setApplications((prev) => prev.map((a) => (a.id === appId ? updated : a)));
      showToast('Document updated successfully', 'success');
    }
  };

  const toggleSaveCollege = (collegeId: string) => {
    const isNowSaved = studyAbroadService.toggleSaveCollege(collegeId);
    setSavedCollegeIds(studyAbroadService.getSavedCollegeIds());
    showToast(isNowSaved ? 'University added to shortlisted' : 'University removed from shortlisted', 'info');
  };

  const isCollegeSaved = (collegeId: string) => {
    return savedCollegeIds.includes(collegeId);
  };

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        loading,
        savedCollegeIds,
        refreshApplications,
        createApplication,
        updateStatus,
        updateDocument,
        toggleSaveCollege,
        isCollegeSaved,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplications = (): ApplicationContextType => {
  const ctx = useContext(ApplicationContext);
  if (!ctx) {
    throw new Error('useApplications must be used within ApplicationProvider');
  }
  return ctx;
};
