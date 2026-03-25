import { 
  Users, 
  Mail, 
  Phone, 
  MapPin, 
  MoreHorizontal,
  Search,
  Filter,
  Download,
  UserPlus,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardContent } from './ui/Card';
import { cn } from '@/src/lib/utils';

export const RecipientManager = () => {
  const recipients = [
    { id: 1, name: 'Jane Cooper', email: 'jane.cooper@example.com', role: 'Product Designer', status: 'Active', docs: 12 },
    { id: 2, name: 'Wade Warren', email: 'wade.warren@example.com', role: 'Software Engineer', status: 'Pending', docs: 5 },
    { id: 3, name: 'Esther Howard', email: 'esther.howard@example.com', role: 'HR Manager', status: 'Active', docs: 28 },
    { id: 4, name: 'Cameron Williamson', email: 'cameron.williamson@example.com', role: 'Marketing Lead', status: 'Inactive', docs: 3 },
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto h-full overflow-y-auto scrollbar-hide bg-white">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Recipients</h1>
          <p className="text-slate-500 text-sm mt-1">Manage employees and external signers.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="gap-2 bg-white border-slate-200 text-slate-600 rounded-xl px-4 shadow-sm">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button className="gap-2 bg-primary hover:bg-primary/90 border-none rounded-xl px-4 text-white">
            <UserPlus className="w-4 h-4" />
            Add Recipient
          </Button>
        </div>
      </header>

      <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-xl p-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name, email, or role..." 
            className="w-full pl-10 pr-4 py-2 bg-transparent border-none text-slate-900 text-sm focus:ring-0 placeholder:text-slate-400"
          />
        </div>
        <Button variant="ghost" className="gap-2 text-slate-500 hover:text-slate-900 rounded-lg">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recipient</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Role</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Documents</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {recipients.map((person) => (
              <tr key={person.id} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-primary font-bold text-xs border border-slate-200">
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{person.name}</p>
                      <p className="text-[10px] text-slate-400">{person.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs text-slate-600 font-medium">{person.role}</td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                    person.status === 'Active' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                    person.status === 'Pending' ? "bg-amber-50 text-amber-600 border-amber-100" :
                    "bg-slate-50 text-slate-400 border-slate-100"
                  )}>
                    {person.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-slate-700 font-bold">{person.docs} docs</td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="icon" className="text-slate-300 hover:text-slate-600 transition-colors rounded-lg">
                    <MoreHorizontal className="w-5 h-5" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
