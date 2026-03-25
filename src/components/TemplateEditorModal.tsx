import { 
  X, 
  Save, 
  Eye, 
  Settings, 
  Type, 
  Image as ImageIcon, 
  Table, 
  Layout,
  Plus,
  ChevronDown,
  Sparkles,
  Zap,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/Button';
import { cn } from '@/src/lib/utils';
import { useState } from 'react';

export const TemplateEditorModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState('edit');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-7xl h-[92vh] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-slate-200"
          >
            {/* Header */}
            <header className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-display font-bold text-slate-900 leading-tight">Offer Letter Template</h2>
                  <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] mt-1">AI-Powered Drafting</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex bg-slate-100 p-1 rounded-2xl mr-4 border border-slate-200">
                  <button 
                    onClick={() => setActiveTab('edit')}
                    className={cn(
                      "px-6 py-2 text-xs font-bold rounded-xl transition-all",
                      activeTab === 'edit' ? "bg-white text-slate-900 shadow-lg" : "text-slate-400 hover:text-slate-900"
                    )}
                  >
                    Editor
                  </button>
                  <button 
                    onClick={() => setActiveTab('preview')}
                    className={cn(
                      "px-6 py-2 text-xs font-bold rounded-xl transition-all",
                      activeTab === 'preview' ? "bg-white text-slate-900 shadow-lg" : "text-slate-400 hover:text-slate-900"
                    )}
                  >
                    Preview
                  </button>
                </div>
                <Button variant="secondary" size="sm" className="gap-2 bg-white border-slate-200 text-slate-600 rounded-xl px-6 shadow-sm">
                  <Save className="w-4 h-4" />
                  Save Draft
                </Button>
                <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90 border-none rounded-xl px-6 text-white shadow-lg shadow-primary/20">
                  <Check className="w-4 h-4" />
                  Publish
                </Button>
                <Button variant="ghost" size="icon" onClick={onClose} className="ml-2 text-slate-300 hover:text-slate-600">
                  <X className="w-6 h-6" />
                </Button>
              </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
              {/* Sidebar Tools */}
              <aside className="w-20 border-r border-slate-100 flex flex-col items-center py-8 gap-8 bg-white">
                <button className="p-3 text-slate-300 hover:text-primary hover:bg-slate-50 rounded-2xl transition-all">
                  <Type className="w-6 h-6" />
                </button>
                <button className="p-3 text-slate-300 hover:text-primary hover:bg-slate-50 rounded-2xl transition-all">
                  <ImageIcon className="w-6 h-6" />
                </button>
                <button className="p-3 text-slate-300 hover:text-primary hover:bg-slate-50 rounded-2xl transition-all">
                  <Table className="w-6 h-6" />
                </button>
                <button className="p-3 text-slate-300 hover:text-primary hover:bg-slate-50 rounded-2xl transition-all">
                  <Layout className="w-6 h-6" />
                </button>
                <div className="w-10 h-px bg-slate-100 my-2" />
                <button className="p-3 text-primary bg-primary/5 rounded-2xl shadow-[0_0_20px_rgba(122,0,93,0.1)] border border-primary/10">
                  <Zap className="w-6 h-6" />
                </button>
              </aside>

              {/* Main Canvas */}
              <main className="flex-1 bg-slate-50 p-16 overflow-y-auto flex justify-center scrollbar-hide">
                <div className="w-full max-w-[850px] min-h-[1100px] bg-white text-slate-900 shadow-2xl rounded-sm p-20 relative">
                  <div className="space-y-12">
                    <div className="flex justify-between items-start">
                      <div className="w-40 h-16 bg-slate-100 rounded-xl flex items-center justify-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                        Company Logo
                      </div>
                      <div className="text-right text-sm text-slate-500 font-mono">
                        <p>March 20, 2024</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h1 className="text-5xl font-display font-bold text-slate-900 tracking-tight leading-none">Employment Offer</h1>
                      <p className="text-lg text-slate-600">Dear <span className="bg-primary/5 text-primary px-2 py-0.5 rounded-lg font-mono text-sm border border-primary/10">{"{{employee_name}}"}</span>,</p>
                      <p className="text-lg text-slate-600 leading-relaxed">
                        We are thrilled to offer you the position of <span className="bg-primary/5 text-primary px-2 py-0.5 rounded-lg font-mono text-sm border border-primary/10">{"{{job_title}}"}</span> at <span className="bg-primary/5 text-primary px-2 py-0.5 rounded-lg font-mono text-sm border border-primary/10">{"{{company_name}}"}</span>. 
                        We were incredibly impressed with your background and believe you will be a fantastic addition to our team.
                      </p>
                      
                      <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-6">
                        <h3 className="font-bold text-slate-900 text-xs uppercase tracking-[0.2em]">Compensation & Terms</h3>
                        <div className="grid grid-cols-2 gap-8">
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Base Salary</p>
                            <p className="text-lg font-bold text-slate-900"><span className="text-primary font-mono">{"{{salary}}"}</span> <span className="text-slate-400 font-normal">/ year</span></p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Start Date</p>
                            <p className="text-lg font-bold text-slate-900 font-mono text-primary">{"{{start_date}}"}</p>
                          </div>
                        </div>
                      </div>

                      <p className="text-lg text-slate-600 leading-relaxed">
                        This offer is contingent upon the successful completion of a background check and your ability to provide 
                        proof of eligibility to work in the United States.
                      </p>
                    </div>

                    <div className="pt-20 space-y-12">
                      <div className="grid grid-cols-2 gap-20">
                        <div className="space-y-6">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Company Representative</p>
                          <div className="h-px bg-slate-200 w-full" />
                          <p className="text-sm text-slate-400 italic">Authorized Signature</p>
                        </div>
                        <div className="space-y-6">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Employee Acceptance</p>
                          <div className="h-px bg-slate-200 w-full border-dashed border-primary/30" />
                          <p className="text-sm text-slate-400 italic">Candidate Signature</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Floating Suggestion */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute -right-56 top-1/4 w-48 p-6 bg-primary text-white rounded-[2rem] shadow-2xl shadow-primary/40 border border-white/20"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.1em]">AI Suggestion</span>
                    </div>
                    <p className="text-xs leading-relaxed opacity-90 font-medium">
                      Add a "Stock Options" clause? Most tech offer letters include this.
                    </p>
                    <button className="mt-4 w-full bg-white text-primary text-xs font-bold py-2.5 rounded-xl hover:bg-primary/5 transition-colors">
                      Add Clause
                    </button>
                  </motion.div>
                </div>
              </main>

              {/* Right Panel: Fields & AI */}
              <aside className="w-96 border-l border-slate-100 flex flex-col bg-white">
                <div className="p-8 border-b border-slate-100">
                  <h3 className="font-bold text-slate-400 text-sm uppercase tracking-[0.2em] mb-6">Smart Fields</h3>
                  <div className="space-y-3">
                    {['employee_name', 'job_title', 'salary', 'start_date', 'manager_name'].map(field => (
                      <div key={field} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl group hover:bg-primary/5 transition-all cursor-pointer border border-transparent hover:border-primary/10">
                        <span className="text-xs font-mono text-slate-500 group-hover:text-primary">{`{{${field}}}`}</span>
                        <Plus className="w-4 h-4 text-slate-300 group-hover:text-primary" />
                      </div>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="w-full mt-6 text-primary text-xs font-bold hover:bg-primary/5 rounded-xl">
                    + Add Custom Field
                  </Button>
                </div>

                <div className="p-8 flex-1 overflow-y-auto scrollbar-hide">
                  <h3 className="font-bold text-slate-400 text-sm uppercase tracking-[0.2em] mb-6">AI Assistant</h3>
                  <div className="bg-primary/5 rounded-[2rem] p-6 border border-primary/10">
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="w-4 h-4 text-primary fill-current" />
                      <p className="text-xs text-primary font-bold uppercase tracking-wider">Quick Actions</p>
                    </div>
                    <div className="space-y-3">
                      <button className="w-full text-left p-3 bg-white rounded-xl text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-100 transition-all">
                        "Make the tone more professional"
                      </button>
                      <button className="w-full text-left p-3 bg-white rounded-xl text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-100 transition-all">
                        "Add a non-compete clause"
                      </button>
                      <button className="w-full text-left p-3 bg-white rounded-xl text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-100 transition-all">
                        "Summarize the benefits section"
                      </button>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
