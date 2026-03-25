import { 
  Plus, 
  FileCode, 
  FileUp, 
  MoreVertical, 
  Copy, 
  Trash2, 
  Edit3,
  Sparkles,
  Search
} from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardContent } from './ui/Card';
import { cn } from '@/src/lib/utils';

export const Templates = ({ onOpenEditor }: { onOpenEditor: () => void }) => {
  const templates = [
    { id: 1, name: 'Standard Offer Letter', type: 'HTML', lastUsed: '2 days ago', usage: 142 },
    { id: 2, name: 'Employee NDA', type: 'PDF', lastUsed: '5 hours ago', usage: 89 },
    { id: 3, name: 'Contractor Agreement', type: 'HTML', lastUsed: '1 week ago', usage: 34 },
    { id: 4, name: 'Performance Review', type: 'HTML', lastUsed: '3 days ago', usage: 210 },
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Templates</h1>
          <p className="text-slate-500 text-sm">Manage and create document templates for your organization.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="gap-2">
            <FileUp className="w-4 h-4" />
            Upload PDF
          </Button>
          <Button className="gap-2" onClick={onOpenEditor}>
            <Plus className="w-4 h-4" />
            Create HTML Template
          </Button>
        </div>
      </header>

      <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search templates..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">All</Button>
          <Button variant="ghost" size="sm">HTML</Button>
          <Button variant="ghost" size="sm">PDF</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card className="border-dashed border-2 border-slate-200 bg-slate-50/50 flex flex-col items-center justify-center p-8 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
            <Sparkles className="w-6 h-6 text-indigo-600" />
          </div>
          <h4 className="font-semibold text-slate-900 mb-1">AI Template Generator</h4>
          <p className="text-xs text-slate-500 text-center max-w-[200px]">
            Describe your document and let AI draft the template for you.
          </p>
        </Card>

        {templates.map((template) => (
          <Card key={template.id} className="group hover:border-indigo-200 transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={cn(
                  "p-3 rounded-xl",
                  template.type === 'HTML' ? "bg-blue-50 text-blue-600" : "bg-orange-50 text-orange-600"
                )}>
                  {template.type === 'HTML' ? <FileCode className="w-6 h-6" /> : <FileUp className="w-6 h-6" />}
                </div>
                <Button variant="ghost" size="icon" className="text-slate-400">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
              
              <h3 className="font-semibold text-slate-900 mb-1">{template.name}</h3>
              <p className="text-xs text-slate-500 mb-6">Last used {template.lastUsed} • {template.usage} uses</p>
              
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" className="flex-1 gap-2">
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit
                </Button>
                <Button variant="secondary" size="sm" className="gap-2">
                  <Copy className="w-3.5 h-3.5" />
                  Clone
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
