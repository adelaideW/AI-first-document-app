import { 
  X, 
  Save, 
  Type, 
  Image as ImageIcon, 
  Table, 
  Layout,
  Plus,
  Sparkles,
  Zap,
  Check,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/Button';
import { cn } from '@/src/lib/utils';
import { useState } from 'react';

export const SideEditor = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState('edit');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-[600px] h-full bg-white border-l border-slate-200 flex flex-col shadow-2xl relative z-50"
        >
          {/* Header */}
          <header className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 leading-tight">Offer Letter - Harry Porter</h2>
                <p className="text-[9px] text-slate-400 uppercase tracking-wider mt-0.5 font-bold">Drafting Mode</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </Button>
            </div>
          </header>

          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar Tools */}
            <aside className="w-16 border-r border-slate-100 flex flex-col items-center py-6 gap-6 bg-slate-50/50">
              <button className="p-2.5 text-slate-400 hover:text-primary hover:bg-white rounded-xl transition-all">
                <Type className="w-5 h-5" />
              </button>
              <button className="p-2.5 text-slate-400 hover:text-primary hover:bg-white rounded-xl transition-all">
                <ImageIcon className="w-5 h-5" />
              </button>
              <button className="p-2.5 text-slate-400 hover:text-primary hover:bg-white rounded-xl transition-all">
                <Table className="w-5 h-5" />
              </button>
              <div className="w-8 h-px bg-slate-200 my-1" />
              <button className="p-2.5 text-primary bg-white rounded-xl shadow-sm border border-primary/20">
                <Zap className="w-5 h-5" />
              </button>
            </aside>

            {/* Main Canvas */}
            <main className="flex-1 bg-slate-100 p-8 overflow-y-auto scrollbar-hide">
              <div className="w-full min-h-full bg-white text-slate-900 shadow-sm rounded-lg p-10 relative">
                <div className="space-y-8">
                  <div className="flex justify-between items-start">
                    <div className="w-24 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-[8px] text-slate-300 font-bold uppercase tracking-widest border border-slate-100">
                      Logo
                    </div>
                    <div className="text-right text-[10px] text-slate-400 font-mono">
                      <p>March 24, 2024</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Employment Offer</h1>
                    <p className="text-sm text-slate-600">Dear <span className="text-primary font-bold">Harry Porter</span>,</p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      We are thrilled to offer you the position of <span className="text-primary font-bold">Senior Software Engineer</span> at <span className="text-primary font-bold">Rippling</span>. 
                    </p>
                    
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                      <h3 className="font-bold text-slate-900 text-[10px] uppercase tracking-wider">Compensation</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Base Salary</p>
                          <p className="text-sm font-bold text-slate-900">$185,000 <span className="text-slate-400 font-normal">/ year</span></p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Start Date</p>
                          <p className="text-sm font-bold text-slate-900">April 15, 2024</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      This offer is contingent upon the successful completion of a background check.
                    </p>
                  </div>

                  <div className="pt-12 space-y-8">
                    <div className="grid grid-cols-2 gap-12">
                      <div className="space-y-4">
                        <div className="h-px bg-slate-200 w-full" />
                        <p className="text-[10px] text-slate-400 italic">Authorized Signature</p>
                      </div>
                      <div className="space-y-4">
                        <div className="h-px bg-slate-200 w-full border-dashed border-primary/20" />
                        <p className="text-[10px] text-slate-400 italic">Candidate Signature</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-slate-100 bg-white flex items-center gap-3">
            <Button variant="secondary" className="flex-1 rounded-xl gap-2">
              <Save className="w-4 h-4" />
              Save
            </Button>
            <Button className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-xl gap-2">
              <Check className="w-4 h-4" />
              Approve
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
