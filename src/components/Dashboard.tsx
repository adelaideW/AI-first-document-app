import { 
  Search, 
  Bell, 
  Plus, 
  Filter,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/Card';
import { Button } from './ui/Button';
import { cn } from '@/src/lib/utils';

export const Dashboard = () => {
  const stats = [
    { label: 'Pending Signatures', value: '24', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Completed Today', value: '12', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Expired', value: '3', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  const recentDocs = [
    { id: 1, name: 'Offer Letter - Jane Cooper', status: 'Pending', date: '2 hours ago', employee: 'Jane Cooper' },
    { id: 2, name: 'NDA - Tech Corp', status: 'Completed', date: '5 hours ago', employee: 'External' },
    { id: 3, name: 'Employee Handbook', status: 'Draft', date: '1 day ago', employee: 'All Employees' },
    { id: 4, name: 'Promotion Letter - Alex Reed', status: 'Sent', date: '2 days ago', employee: 'Alex Reed' },
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome back, HR Admin</h1>
          <p className="text-slate-500 text-sm">Here's what's happening with your documents today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search documents..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-64"
            />
          </div>
          <Button variant="secondary" size="icon">
            <Bell className="w-4 h-4" />
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Document
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 py-6">
              <div className={cn("p-3 rounded-xl", stat.bg)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Recent Activity</h3>
            <Button variant="ghost" size="sm" className="text-primary">View all</Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {recentDocs.map((doc) => (
                <div key={doc.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{doc.name}</p>
                      <p className="text-xs text-slate-500">{doc.employee} • {doc.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={cn(
                      "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      doc.status === 'Completed' ? "bg-emerald-100 text-emerald-700" :
                      doc.status === 'Pending' ? "bg-amber-100 text-amber-700" :
                      "bg-slate-100 text-slate-700"
                    )}>
                      {doc.status}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-slate-300" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="font-semibold text-slate-900">AI Insights</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Template Suggestion</span>
              </div>
              <p className="text-xs text-primary/80 leading-relaxed">
                Based on your recent hiring, you might need a "Remote Work Policy" template. 
              </p>
              <Button variant="ghost" size="sm" className="mt-3 text-primary p-0 hover:bg-transparent">
                Generate with AI →
              </Button>
            </div>
            
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Bottleneck Alert</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Offer letters for the Engineering department are taking 40% longer to sign than average.
              </p>
              <Button variant="ghost" size="sm" className="mt-3 text-slate-900 p-0 hover:bg-transparent">
                View Analytics →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
