import { 
  Sparkles, 
  Plus, 
  History, 
  Folder, 
  Users, 
  Settings,
  Zap,
  ChevronRight,
  Upload,
  MessageSquare,
  Search,
  MoreHorizontal,
  PanelLeftClose,
  Share,
  Pencil,
  Pin,
  Archive,
  Trash2
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import React, { useState, useRef, useEffect } from 'react';

interface SidebarProps {
  activeTask: string;
  setActiveTask: (task: string) => void;
  activeTaskId: string;
  setActiveTaskId: (id: string) => void;
  history: any[];
  onNewTask: () => void;
  onOpenBulkUpload: () => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

export const Sidebar = ({ 
  activeTask, 
  setActiveTask, 
  activeTaskId, 
  setActiveTaskId, 
  history, 
  onNewTask, 
  onOpenBulkUpload,
  isSidebarOpen,
  setIsSidebarOpen
}: SidebarProps) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuToggle = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (openMenuId === id) {
      setOpenMenuId(null);
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      setMenuPosition({ top: rect.top, left: rect.right + 4 });
      setOpenMenuId(id);
    }
  };

  const tools = [
    { id: 'templates', label: 'Templates', icon: Folder },
    { id: 'agent', label: 'Agents', icon: Sparkles },
    { id: 'logs', label: 'Logs', icon: History },
    { id: 'updates', label: 'Updates', icon: Zap },
  ];

  const handleHistoryClick = (id: string) => {
    setActiveTaskId(id);
    setActiveTask('chat');
  };

  return (
    <div className="w-[260px] h-screen bg-white flex flex-col text-[#1A1A1A] p-3 border-r border-slate-100">
      <div className="flex flex-col gap-2 mb-4 px-2">
        <div className="flex items-center gap-2">
          <button 
            onClick={onNewTask}
            className="flex items-center gap-2 hover:bg-slate-100 p-2 rounded-lg transition-colors group flex-1"
          >
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Plus className="text-white w-4 h-4" />
            </div>
            <span className="font-semibold text-sm">New task</span>
          </button>
          
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
          >
            <PanelLeftClose className="w-5 h-5" />
          </button>
        </div>

        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-slate-600 transition-colors" />
          <input 
            type="text"
            placeholder="Search task"
            className="w-full bg-slate-50 border border-slate-100 rounded-lg py-1.5 pl-9 pr-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide space-y-6 mt-2">
        <section>
          <h3 className="text-[11px] font-semibold text-slate-400 px-3 mb-2">Today</h3>
          <div className="space-y-0.5">
            {history.map((item) => (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => handleHistoryClick(item.id)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-3",
                    activeTaskId === item.id && activeTask === 'chat' ? "bg-slate-100" : "hover:bg-slate-100"
                  )}
                >
                  <span className="truncate flex-1">{item.label}</span>
                </button>
                <button 
                  onClick={(e) => handleMenuToggle(e, item.id)}
                  className={cn(
                    "absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-slate-200 transition-all z-10",
                    openMenuId === item.id ? "opacity-100 bg-slate-200" : "opacity-0 group-hover:opacity-100"
                  )}
                >
                  <MoreHorizontal className="w-4 h-4 text-slate-400" />
                </button>

                {openMenuId === item.id && (
                  <div 
                    ref={menuRef}
                    style={{ top: menuPosition.top, left: menuPosition.left }}
                    className="fixed w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-[9999] animate-in fade-in zoom-in duration-200"
                  >
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                      <Share className="w-4 h-4" />
                      Share
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                      <Pencil className="w-4 h-4" />
                      Rename
                    </button>
                    <div className="h-px bg-slate-100 my-1 mx-2" />
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                      <Pin className="w-4 h-4" />
                      Pin chat
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                      <Archive className="w-4 h-4" />
                      Archive
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="pt-8 border-t-2 border-slate-50">
          <div className="space-y-0.5">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTask(tool.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
                  activeTask === tool.id ? "bg-slate-100" : "hover:bg-slate-100"
                )}
              >
                <tool.icon className="w-4 h-4 text-slate-400" />
                {tool.label}
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-auto pt-2 space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-slate-100 transition-all group">
          <div className="w-6 h-6 rounded-full bg-primary flex-shrink-0" />
          <span className="truncate flex-1 font-medium">HR Admin</span>
        </button>
      </div>
    </div>
  );
};
