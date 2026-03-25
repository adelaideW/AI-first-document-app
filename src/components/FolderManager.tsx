import React, { useState } from 'react';
import { 
  FileText, 
  MoreVertical, 
  Search, 
  Plus,
  X,
  Save,
  Type,
  Layout,
  Sparkles,
  FileCode
} from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardContent } from './ui/Card';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { TemplateFullEditor } from './TemplateFullEditor';

import { Template } from '../types';

interface FolderManagerProps {
  templates: Template[];
  setTemplates: React.Dispatch<React.SetStateAction<Template[]>>;
}

export const FolderManager = ({ templates, setTemplates }: FolderManagerProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [view, setView] = useState<'list' | 'editor'>('list');

  const handleRowClick = (template: Template) => {
    setSelectedTemplate(template);
    setView('editor');
  };

  if (view === 'editor' && selectedTemplate) {
    return (
      <TemplateFullEditor 
        template={selectedTemplate} 
        onClose={() => {
          setView('list');
          setSelectedTemplate(null);
        }} 
      />
    );
  }

  return (
    <div className="h-full flex bg-white overflow-hidden relative">
      <div className="flex-1 p-8 space-y-8 max-w-7xl mx-auto h-full overflow-y-auto scrollbar-hide">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Templates</h1>
            <p className="text-sm text-slate-500">Manage your document templates and categories</p>
          </div>
          <div className="flex items-center gap-3">
            <Button className="gap-2 bg-primary hover:bg-primary/90 border-none rounded-xl px-4 text-white">
              <Plus className="w-4 h-4" />
              New Template
            </Button>
          </div>
        </header>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search templates..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Name</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tags</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last Modified</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {templates.map((template) => (
                <tr 
                  key={template.id} 
                  onClick={() => handleRowClick(template)}
                  className="hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-white transition-colors">
                        <FileText className="w-4 h-4 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{template.name}</p>
                        <p className="text-xs text-slate-500">{template.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg border",
                      template.type === 'AI suggested' ? "bg-purple-50 text-purple-600 border-purple-100" :
                      template.type === 'Uploaded' ? "bg-blue-50 text-blue-600 border-blue-100" :
                      "bg-slate-50 text-slate-600 border-slate-100"
                    )}>
                      {template.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {template.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-medium text-slate-600 px-2 py-0.5 bg-slate-100 rounded-md border border-slate-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={cn("w-1.5 h-1.5 rounded-full", template.status === 'active' ? "bg-emerald-500" : "bg-amber-500")} />
                      <span className="text-xs font-medium text-slate-600 capitalize">{template.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">{template.lastModified}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-400 transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

