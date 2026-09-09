import React, { useState } from 'react';
import { History, Shield, Check } from 'lucide-react';
import { adminService } from '../../services/adminService';
import { AuditLogItem } from '../../types/admin';
import { DataTable, Column } from '../../components/common/DataTable';

export const AdminAudit: React.FC = () => {
  const [logs] = useState<AuditLogItem[]>(adminService.getAuditLogs());

  const columns: Column<AuditLogItem>[] = [
    {
      header: 'Timestamp',
      cell: (l) => <span className="font-mono text-xs text-slate-500">{l.timestamp}</span>,
    },
    {
      header: 'Administrator',
      cell: (l) => (
        <div>
          <span className="font-bold text-slate-900 block leading-tight">{l.actorName}</span>
          <span className="text-[10px] text-slate-400 block">{l.actorRole}</span>
        </div>
      ),
    },
    {
      header: 'Action Performed',
      cell: (l) => (
        <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
          {l.action}
        </span>
      ),
    },
    {
      header: 'Target Entity',
      cell: (l) => (
        <span className="text-xs font-semibold text-slate-800">{l.targetId}</span>
      ),
    },
    {
      header: 'Details',
      cell: (l) => <span className="text-xs text-slate-500 max-w-sm block truncate">{l.details}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          System Security & Operational Audit Trail
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Tamper-evident logs of partner approvals, admissions overrides, and document reviews
        </p>
      </div>

      <DataTable
        columns={columns}
        data={logs}
        searchPlaceholder="Search audit events by action or entity..."
        searchFilter={(l, q) =>
          l.action.toLowerCase().includes(q) ||
          l.targetId.toLowerCase().includes(q) ||
          l.actorName.toLowerCase().includes(q)
        }
        rowKey={(l) => l.id}
      />
    </div>
  );
};
