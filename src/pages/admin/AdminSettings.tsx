import React, { useState } from 'react';
import { Settings, Save, CheckCircle2, Shield } from 'lucide-react';
import { adminService } from '../../services/adminService';
import { SystemSettings } from '../../types/admin';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';

export const AdminSettings: React.FC = () => {
  const { showToast } = useToast();
  const [settings, setSettings] = useState<SystemSettings>(adminService.getSettings());

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    adminService.updateSettings(settings);
    showToast('Platform operational settings saved!', 'success');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          System Administration Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Global admission automation toggles, support contacts, and partner registration policies
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            Admissions Automation & Verification
          </h3>

          <div className="flex items-center justify-between py-2">
            <div>
              <span className="font-bold text-xs text-slate-800 block">Allow New Partner Registrations</span>
              <span className="text-xs text-slate-500">Public availability of /partner/register portal</span>
            </div>
            <input
              type="checkbox"
              checked={settings.allowNewPartnerRegistrations}
              onChange={(e) => setSettings({ ...settings, allowNewPartnerRegistrations: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded"
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <span className="font-bold text-xs text-slate-800 block">Auto-Forward Verified Applications</span>
              <span className="text-xs text-slate-500">Automatically dispatch dossiers to university partner queues upon document verification</span>
            </div>
            <input
              type="checkbox"
              checked={settings.autoForwardVerifiedApplications}
              onChange={(e) => setSettings({ ...settings, autoForwardVerifiedApplications: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded"
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <span className="font-bold text-xs text-slate-800 block">System Maintenance Mode</span>
              <span className="text-xs text-slate-500">Temporarily restrict public registrations for database maintenance</span>
            </div>
            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
              className="w-4 h-4 text-red-600 rounded"
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            Operations Contact Routing
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Central Admin Notification Email</label>
              <input
                type="email"
                value={settings.adminAlertEmail}
                onChange={(e) => setSettings({ ...settings, adminAlertEmail: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Emergency Operations Phone</label>
              <input
                type="text"
                value={settings.supportPhone}
                onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <Button type="submit" variant="primary" size="md" leftIcon={<Save className="w-4 h-4" />}>
            Save Configuration
          </Button>
        </div>
      </form>
    </div>
  );
};
