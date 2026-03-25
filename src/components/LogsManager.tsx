import React, { useState } from 'react';
import { 
  Search, 
  RefreshCw,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  Play,
  StopCircle,
  MoreVertical,
  Filter,
  History,
  Clock,
  AlertCircle,
  CheckCircle2,
  Download
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface LogEntry {
  id: string;
  timestamp: string;
  documentName: string;
  status: 'sent' | 'clicked' | 'viewed' | 'signed' | 'declined' | 'archived' | 'Corrected' | 'reassigned' | 'removed';
  recipient: {
    name: string;
    avatar: string;
  };
  request: 'to sign' | 'to view' | 'cced';
  message: string;
  path: string;
  level: 'error' | 'warning' | 'info';
}

const logs: LogEntry[] = [
  { 
    id: '1', 
    timestamp: 'MAR 25 10:45:12.76', 
    documentName: 'Offer_Letter_Sarah_J.pdf',
    status: 'signed', 
    recipient: { name: 'Sarah Jenkins', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
    request: 'to sign', 
    message: 'Please review the following documents and sign at the appropriate locations', 
    path: '/Employee/Documents/Offer letters/2026',
    level: 'info' 
  },
  { 
    id: '2', 
    timestamp: 'MAR 25 10:42:06.67', 
    documentName: 'Benefits_Summary_2026.docx',
    status: 'viewed', 
    recipient: { name: 'Michael Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael' },
    request: 'to view', 
    message: 'n/a', 
    path: '/HR/Benefits/Enrollment/Q1',
    level: 'info' 
  },
  { 
    id: '3', 
    timestamp: 'MAR 25 10:40:06.61', 
    documentName: 'Vendor_Agreement_v2.pdf',
    status: 'sent', 
    recipient: { name: 'Emily Rodriguez', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily' },
    request: 'cced', 
    message: 'n/a', 
    path: '/Legal/Contracts/Vendors/2026',
    level: 'info' 
  },
  { 
    id: '4', 
    timestamp: 'MAR 25 10:38:06.47', 
    documentName: 'Termination_Notice.pdf',
    status: 'declined', 
    recipient: { name: 'David Kim', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
    request: 'to sign', 
    message: 'Please review the following documents and sign at the appropriate locations', 
    path: '/Employee/Documents/Termination/2026',
    level: 'error' 
  },
  { 
    id: '5', 
    timestamp: 'MAR 25 10:35:06.23', 
    documentName: 'Tax_Form_1099_2025.pdf',
    status: 'archived', 
    recipient: { name: 'Jessica Taylor', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica' },
    request: 'to view', 
    message: 'n/a', 
    path: '/Archive/2025/Tax/Forms',
    level: 'info' 
  },
  { 
    id: '6', 
    timestamp: 'MAR 25 10:32:05.84', 
    documentName: 'Promotion_Letter_Robert.pdf',
    status: 'Corrected', 
    recipient: { name: 'Robert Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert' },
    request: 'to sign', 
    message: 'Updated version with the corrected salary figures. Please re-sign.', 
    path: '/Employee/Documents/Promotions/2026',
    level: 'warning' 
  },
  { 
    id: '7', 
    timestamp: 'MAR 25 10:30:05.50', 
    documentName: 'Invoice_MAR_001.pdf',
    status: 'reassigned', 
    recipient: { name: 'Amanda White', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amanda' },
    request: 'to sign', 
    message: 'n/a', 
    path: '/Finance/Approvals/Invoices/March',
    level: 'info' 
  },
  { 
    id: '8', 
    timestamp: 'MAR 25 10:28:05.44', 
    documentName: 'IT_Policy_v4.pdf',
    status: 'clicked', 
    recipient: { name: 'Kevin Lee', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin' },
    request: 'to sign', 
    message: 'n/a', 
    path: '/IT/Policy/AcceptableUse/2026',
    level: 'info' 
  },
  { 
    id: '9', 
    timestamp: 'MAR 25 10:25:12.76', 
    documentName: 'Non_Compete_Agreement.pdf',
    status: 'sent', 
    recipient: { name: 'Chris Evans', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chris' },
    request: 'to sign', 
    message: 'Please review and sign.', 
    path: '/Legal/Contracts/Employees/2026',
    level: 'info' 
  },
  { 
    id: '10', 
    timestamp: 'MAR 25 10:22:06.67', 
    documentName: 'Equity_Grant_Notice.pdf',
    status: 'signed', 
    recipient: { name: 'Scarlett Johansson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Scarlett' },
    request: 'to sign', 
    message: 'Congratulations on your grant!', 
    path: '/Finance/Equity/Grants/2026',
    level: 'info' 
  },
  { 
    id: '11', 
    timestamp: 'MAR 25 10:20:06.61', 
    documentName: 'Health_Plan_Selection.pdf',
    status: 'viewed', 
    recipient: { name: 'Mark Ruffalo', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mark' },
    request: 'to view', 
    message: 'n/a', 
    path: '/HR/Benefits/Enrollment/2026',
    level: 'info' 
  },
  { 
    id: '12', 
    timestamp: 'MAR 25 10:18:06.47', 
    documentName: 'Code_of_Conduct.pdf',
    status: 'clicked', 
    recipient: { name: 'Jeremy Renner', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jeremy' },
    request: 'to view', 
    message: 'Annual compliance review.', 
    path: '/Compliance/Policies/2026',
    level: 'info' 
  },
  { 
    id: '13', 
    timestamp: 'MAR 25 10:15:06.23', 
    documentName: 'Relocation_Package.pdf',
    status: 'declined', 
    recipient: { name: 'Elizabeth Olsen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elizabeth' },
    request: 'to sign', 
    message: 'Relocation terms for your move.', 
    path: '/HR/Relocation/2026',
    level: 'error' 
  },
  { 
    id: '14', 
    timestamp: 'MAR 25 10:12:05.84', 
    documentName: 'Bonus_Structure_Update.pdf',
    status: 'sent', 
    recipient: { name: 'Paul Rudd', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Paul' },
    request: 'cced', 
    message: 'n/a', 
    path: '/Finance/Compensation/Bonuses/2026',
    level: 'info' 
  },
  { 
    id: '15', 
    timestamp: 'MAR 25 10:10:05.50', 
    documentName: 'Remote_Work_Agreement.pdf',
    status: 'archived', 
    recipient: { name: 'Tom Holland', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tom' },
    request: 'to sign', 
    message: 'n/a', 
    path: '/Archive/2025/Remote',
    level: 'info' 
  },
];

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-slate-100 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 w-full text-left px-4 mb-2 group"
      >
        {isOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
        <span className="text-xs font-bold text-slate-900 group-hover:text-primary transition-colors">{title}</span>
      </button>
      {isOpen && <div className="px-4">{children}</div>}
    </div>
  );
};

export const LogsManager = () => {
  const [isLive, setIsLive] = useState(true);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const toggleStatus = (status: string) => {
    setSelectedStatuses(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status) 
        : [...prev, status]
    );
  };

  const filteredLogs = selectedStatuses.length > 0 
    ? logs.filter(log => selectedStatuses.includes(log.status.charAt(0).toUpperCase() + log.status.slice(1)))
    : logs;

  const statusCounts = logs.reduce((acc, log) => {
    const statusLabel = log.status.charAt(0).toUpperCase() + log.status.slice(1);
    acc[statusLabel] = (acc[statusLabel] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="h-full flex bg-white overflow-hidden">
      {/* Sidebar Filters */}
      <aside className="w-64 border-r border-slate-100 flex flex-col overflow-y-auto bg-white shrink-0">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-widest">Filters</span>
          <button 
            onClick={() => setSelectedStatuses([])}
            className="text-[10px] font-bold text-slate-400 hover:text-slate-900 uppercase tracking-widest px-2 py-1 bg-slate-50 rounded"
          >
            Reset
          </button>
        </div>

        <FilterSection title="Timeline">
          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 border-r border-slate-200">
              <Clock className="w-4 h-4 text-slate-900" />
            </div>
            <select className="w-full bg-white border border-slate-200 rounded-lg pl-12 pr-10 py-2.5 text-sm font-medium text-slate-900 appearance-none focus:outline-none focus:ring-1 focus:ring-primary/20 cursor-pointer">
              <option>Last 30 minutes</option>
              <option>Last 1 hour</option>
              <option>Last 24 hours</option>
              <option>Custom Range</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-900 pointer-events-none" />
          </div>
        </FilterSection>

        <FilterSection title="Status">
          <div className="border border-slate-100 rounded-lg overflow-hidden divide-y divide-slate-100">
            {[
              'Sent', 'Clicked', 'Viewed', 'Signed', 'Declined', 'Archived', 'Corrected', 'Reassigned', 'Removed'
            ].map((statusLabel) => (
              <label key={statusLabel} className="flex items-center justify-between px-3 py-2.5 hover:bg-slate-50 cursor-pointer group">
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={selectedStatuses.includes(statusLabel)}
                    onChange={() => toggleStatus(statusLabel)}
                    className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/20" 
                  />
                  <span className="text-sm text-slate-600 group-hover:text-slate-900">{statusLabel}</span>
                </div>
                <span className="text-xs text-slate-400 font-medium">{statusCounts[statusLabel] || 0}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Requests" defaultOpen={false}>
          <div className="border border-slate-100 rounded-lg overflow-hidden divide-y divide-slate-100">
            {[
              { label: 'To sign', count: 42 },
              { label: 'To view', count: 15 },
              { label: 'CCed', count: 8 }
            ].map((req) => (
              <label key={req.label} className="flex items-center justify-between px-3 py-2.5 hover:bg-slate-50 cursor-pointer group">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/20" />
                  <span className="text-sm text-slate-600 group-hover:text-slate-900">{req.label}</span>
                </div>
                <span className="text-xs text-slate-400 font-medium">{req.count}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {['Recipients', 'Messages', 'Path'].map(filter => (
          <FilterSection key={filter} title={filter} defaultOpen={false}>
            <div className="text-[10px] text-slate-400 italic">No filters applied</div>
          </FilterSection>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-white">
        {/* Top Toolbar */}
        <div className="h-14 border-b border-slate-100 flex items-center px-4 gap-4 shrink-0">
          <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400">
            <Filter className="w-4 h-4" />
          </button>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
            <input 
              type="text" 
              placeholder="Search logs..." 
              className="w-full bg-white border border-slate-200 rounded-lg py-1.5 pl-10 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-primary/20"
            />
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-300" />
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsLive(!isLive)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all",
                isLive 
                  ? "bg-white border-blue-500 text-blue-600" 
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
              )}
            >
              <div className={cn("w-1.5 h-1.5 rounded-full", isLive ? "bg-blue-500 animate-pulse" : "bg-slate-300")} />
              {isLive ? <StopCircle className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              Live
            </button>
            <button className="p-2 hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-600">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-600">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Histogram Visualization */}
        <div className="h-16 border-b border-slate-100 px-4 flex items-end gap-[2px] pb-2 shrink-0">
          {Array.from({ length: 60 }).map((_, i) => {
            const height = Math.random() * 20 + 5;
            const isError = Math.random() > 0.9;
            return (
              <div 
                key={i} 
                className={cn(
                  "flex-1 rounded-t-[1px]",
                  isError ? "bg-red-400" : "bg-slate-200"
                )}
                style={{ height: `${height}px` }}
              />
            );
          })}
        </div>

        {/* Logs Table */}
        <div className="flex-1 overflow-auto scrollbar-hide">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-white z-10">
              <tr className="border-b border-slate-100">
                <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-40">Time</th>
                <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-48">Document Name</th>
                <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-24">Status</th>
                <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-48">Recipient</th>
                <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-24">Request</th>
                <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-64">Messages</th>
                <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Path</th>
              </tr>
            </thead>
            <tbody className="text-[11px] text-slate-500 divide-y divide-slate-50">
              <tr className="bg-blue-50/30 text-blue-600">
                <td colSpan={7} className="px-4 py-2 flex items-center gap-2">
                  <Play className="w-3 h-3 fill-current" />
                  <span className="font-bold uppercase tracking-widest text-[10px]">Live Mode</span>
                </td>
              </tr>
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                  <td className="px-4 py-2 whitespace-nowrap uppercase truncate max-w-[160px]">{log.timestamp}</td>
                  <td className="px-4 py-2 text-slate-900 font-medium truncate max-w-[192px]">{log.documentName}</td>
                  <td className="px-4 py-2">
                    <span className={cn(
                      "font-bold uppercase text-[9px] px-1.5 py-0.5 rounded border",
                      log.status === 'signed' && "text-emerald-700 bg-emerald-50 border-emerald-200/50",
                      log.status === 'sent' && "text-blue-700 bg-blue-50 border-blue-200/50",
                      (log.status === 'viewed' || log.status === 'clicked') && "text-teal-700 bg-teal-50 border-teal-200/50",
                      (log.status === 'declined' || log.status === 'removed') && "text-rose-700 bg-rose-50 border-rose-200/50",
                      log.status === 'archived' && "text-slate-600 bg-slate-50 border-slate-200/50",
                      log.status === 'reassigned' && "text-amber-700 bg-amber-50 border-amber-200/50",
                      log.status === 'Corrected' && "text-yellow-800 bg-yellow-50 border-yellow-200/50"
                    )}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 truncate max-w-[192px]">
                    <div className="flex items-center gap-2">
                      <span className="truncate">{log.recipient.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 font-bold truncate max-w-[100px]">{log.request}</td>
                  <td className="px-4 py-2 text-slate-900 group-hover:text-primary truncate max-w-[256px]">
                    <div className="flex items-center gap-2">
                      <History className="w-3 h-3 text-slate-300 shrink-0" />
                      <span className="truncate">{log.message}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-slate-400 italic truncate">{log.path}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

