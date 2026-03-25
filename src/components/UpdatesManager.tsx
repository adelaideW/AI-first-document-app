import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock,
  FileText,
  Circle,
  MoreHorizontal,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Button } from './ui/Button';

interface UpdateEntry {
  id: string;
  message: string;
  fileName: string;
  date: string;
  isUnread: boolean;
  isCompleted: boolean;
}

const initialUpdates: UpdateEntry[] = [
  { 
    id: '1', 
    message: 'Sarah Jenkins has signed Offer_Letter_Sarah_J.pdf', 
    fileName: 'Offer_Letter_Sarah_J.pdf', 
    date: 'Mar 15, 2026', 
    isUnread: true,
    isCompleted: false
  },
  { 
    id: '2', 
    message: 'Michael Chen has viewed Benefits_Summary_2026.docx', 
    fileName: 'Benefits_Summary_2026.docx', 
    date: 'Mar 18, 2026', 
    isUnread: true,
    isCompleted: false
  },
  { 
    id: '3', 
    message: 'Emily Rodriguez has signed Vendor_Agreement_v2.pdf', 
    fileName: 'Vendor_Agreement_v2.pdf', 
    date: 'Mar 12, 2026', 
    isUnread: true,
    isCompleted: false
  },
  { 
    id: '5', 
    message: 'Jessica Taylor has viewed Tax_Form_1099_2025.pdf', 
    fileName: 'Tax_Form_1099_2025.pdf', 
    date: 'Mar 20, 2026', 
    isUnread: true,
    isCompleted: false
  },
  { 
    id: '6', 
    message: 'Robert Wilson has signed Promotion_Letter_Robert.pdf', 
    fileName: 'Promotion_Letter_Robert.pdf', 
    date: 'Mar 21, 2026', 
    isUnread: true,
    isCompleted: false
  },
  { 
    id: '7', 
    message: 'Amanda White has viewed Invoice_MAR_001.pdf', 
    fileName: 'Invoice_MAR_001.pdf', 
    date: 'Mar 22, 2026', 
    isUnread: true,
    isCompleted: false
  },
  { 
    id: '8', 
    message: 'Kevin Lee has signed IT_Policy_v4.pdf', 
    fileName: 'IT_Policy_v4.pdf', 
    date: 'Mar 23, 2026', 
    isUnread: true,
    isCompleted: false
  },
];

export const UpdatesManager = () => {
  const [updates, setUpdates] = useState(initialUpdates);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const handleMarkAsRead = (id: string) => {
    setUpdates(prev => prev.map(update => 
      update.id === id ? { ...update, isUnread: false } : update
    ));
  };

  const handleToggleRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setUpdates(prev => prev.map(update => 
      update.id === id ? { ...update, isUnread: !update.isUnread } : update
    ));
    setOpenMenuId(null);
  };

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setUpdates(prev => prev.filter(update => update.id !== id));
    setOpenMenuId(null);
  };

  const handleMarkAllAsRead = () => {
    setUpdates(prev => prev.map(update => ({ ...update, isUnread: false })));
  };

  return (
    <div className="h-full flex flex-col bg-slate-50/50 overflow-hidden">
      <header className="p-8 bg-white border-b border-slate-100 shrink-0 flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-normal text-slate-900 mb-1">Updates</h1>
          <p className="text-slate-500 text-sm">Monitor real-time document actions and team updates.</p>
        </div>
        <button 
          onClick={handleMarkAllAsRead}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors px-4 py-2 hover:bg-indigo-50 rounded-lg"
        >
          Mark all as read
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-5xl mx-auto space-y-4">
          {updates.map((update) => (
            <div 
              key={update.id} 
              onClick={() => handleMarkAsRead(update.id)}
              className={cn(
                "bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm border border-slate-100 transition-all cursor-pointer hover:shadow-md group",
                update.isCompleted && "opacity-60 grayscale-[0.5]"
              )}
            >
              {/* Status Indicator */}
              <div className="shrink-0 w-6 flex justify-center">
                {update.isCompleted ? (
                  <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-500">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                ) : (
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                    update.isUnread ? "border-slate-200" : "border-slate-100 bg-slate-50"
                  )}>
                    {update.isUnread && (
                      <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                    )}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className={cn(
                  "text-base font-normal text-slate-900 transition-colors group-hover:text-primary",
                  update.isCompleted && "line-through text-slate-400"
                )}>
                  {update.message}
                </h3>
              </div>

              {/* Meta Info */}
              <div className="flex items-center gap-4 shrink-0 relative">
                <div className="flex items-center gap-2 text-slate-400 whitespace-nowrap">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-xs">{update.date}</span>
                </div>

                <div className="relative">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === update.id ? null : update.id);
                    }}
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>

                  {openMenuId === update.id && (
                    <>
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(null);
                        }}
                      />
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-20 overflow-hidden py-1">
                        <button 
                          onClick={(e) => handleToggleRead(update.id, e)}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          {update.isUnread ? (
                            <>
                              <Eye className="w-4 h-4 text-slate-400" />
                              Mark as read
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-4 h-4 text-slate-400" />
                              Mark as unread
                            </>
                          )}
                        </button>
                        <button 
                          onClick={(e) => handleRemove(update.id, e)}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

