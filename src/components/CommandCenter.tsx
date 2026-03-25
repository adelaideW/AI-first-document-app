import { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Paperclip, 
  Plus, 
  FileText, 
  Users, 
  Upload, 
  Zap,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreHorizontal,
  FileArchive,
  Search,
  Lightbulb,
  Code,
  FileSearch,
  GraduationCap,
  Mic,
  ChevronDown,
  Edit3,
  HelpCircle,
  Download,
  Eye,
  Check,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { Button } from './ui/Button';

interface BlockProps {
  type: 'template' | 'recipient' | 'bulk' | 'document' | 'progress' | 'actions';
  data: any;
  onOpenEditor?: () => void;
  onOpenBulkUpload?: () => void;
  onAction?: (action: string) => void;
}

const Block = ({ type, data, onOpenEditor, onOpenBulkUpload, onAction }: BlockProps) => {
  switch (type) {
    case 'actions':
      return (
        <div className="flex flex-wrap gap-2">
          {data.actions.map((action: any) => (
            <Button
              key={action.id}
              variant="secondary"
              size="sm"
              className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl px-4 py-2 text-xs font-medium shadow-sm"
              onClick={() => onAction?.(action.id)}
            >
              {action.label}
            </Button>
          ))}
        </div>
      );
    case 'progress':
      return (
        <div className="glass-card p-6 space-y-4 max-w-md border-primary/20 bg-primary/5">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-slate-900">Task Progress</h4>
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{data.percent}% Complete</span>
          </div>
          <div className="space-y-3">
            {data.steps.map((step: any, i: number) => (
              <div key={i} className="flex items-center gap-3">
                <div className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center border transition-all",
                  step.completed ? "bg-primary border-primary" : "bg-white border-slate-200"
                )}>
                  {step.completed ? <Check className="w-3 h-3 text-slate-900" /> : <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />}
                </div>
                <span className={cn("text-xs", step.completed ? "text-slate-900 font-medium" : "text-slate-400")}>{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      );
    case 'document':
      return (
        <div className="glass-card p-5 space-y-4 max-w-md border-slate-200 bg-white shadow-sm group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-slate-900 truncate">{data.name}</h4>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Draft • {data.size}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="primary" 
              size="sm" 
              className="flex-1 bg-primary hover:bg-primary/90 border-none rounded-xl gap-2"
              onClick={onOpenEditor}
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit
            </Button>
            <Button variant="secondary" size="sm" className="bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl gap-2">
              <Download className="w-3.5 h-3.5" />
              Download
            </Button>
          </div>
        </div>
      );
    case 'template':
      return (
        <div className="glass-card p-6 space-y-4 max-w-md border-primary/20 bg-primary/5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-display font-bold text-slate-900 tracking-tight">{data.name}</h4>
              <p className="text-[10px] text-slate-400 uppercase tracking-[0.1em]">AI Drafted Template</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            I've generated a draft for your {data.name}. It includes standard legal clauses and smart fields for employee data.
          </p>
          <div className="flex items-center gap-2">
            <Button 
              variant="primary" 
              size="sm" 
              className="bg-primary hover:bg-primary/90 border-none rounded-xl"
              onClick={onOpenEditor}
            >
              Edit Template
            </Button>
            <Button variant="secondary" size="sm" className="bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl">
              Preview
            </Button>
          </div>
        </div>
      );
    case 'bulk':
      return (
        <div className="glass-card p-6 space-y-4 max-w-md border-emerald-100 bg-emerald-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-xl">
              <Upload className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="font-display font-bold text-slate-900 tracking-tight">Bulk Upload Ready</h4>
              <p className="text-[10px] text-slate-400 uppercase tracking-[0.1em]">142 Documents Found</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span>Mapping Progress</span>
              <span>98%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
              <div className="bg-emerald-500 h-full w-[98%] shadow-[0_0_10px_rgba(16,185,129,0.2)]" />
            </div>
          </div>
          <Button 
            variant="primary" 
            size="sm" 
            className="w-full bg-emerald-600 hover:bg-emerald-700 border-none rounded-xl text-white"
            onClick={onOpenBulkUpload}
          >
            Confirm & Distribute
          </Button>
        </div>
      );
    default:
      return null;
  }
};

export const CommandCenter = ({ 
  activeTaskId,
  latestNewTaskId,
  onOpenEditor, 
  onOpenBulkUpload,
  updateHistoryLabel,
  history,
  onSaveTemplate
}: { 
  activeTaskId: string;
  latestNewTaskId: string;
  onOpenEditor?: () => void;
  onOpenBulkUpload?: () => void;
  updateHistoryLabel?: (id: string, label: string) => void;
  history: any[];
  onSaveTemplate?: (name: string, content: string) => void;
}) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [flowStep, setFlowStep] = useState<string | null>(null);
  const [recipient, setRecipient] = useState<string | null>(null);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If we are switching to a task that is marked as "fresh new task"
    if (activeTaskId === latestNewTaskId && latestNewTaskId !== '') {
      setMessages([]);
      setFlowStep(null);
      setRecipient(null);
      return;
    }

    // If we are switching to an existing task (or one that was just started but we are not in "fresh" mode anymore)
    // We only want to load history if messages are currently empty or if the activeTaskId changed
    if (activeTaskId === 'harry-porter') {
      // Mock history for Harry Porter
      const mockHistory = [
        { 
          id: 'hp-1', 
          role: 'user', 
          content: "Draft offer letter for Harry Porter" 
        },
        { 
          id: 'hp-2', 
          role: 'assistant', 
          content: "I'm starting the drafting process for Harry Porter's offer letter. I'll pull the standard Engineering template and populate it with the details we discussed." 
        },
        {
          id: 'hp-3',
          role: 'assistant',
          content: "I've mapped the compensation data and benefits package. Here's the current progress:",
          block: {
            type: 'progress',
            data: {
              percent: 65,
              steps: [
                { label: 'Template Selection', completed: true },
                { label: 'Employee Data Mapping', completed: true },
                { label: 'Compensation Review', completed: true },
                { label: 'Legal Clause Verification', completed: false },
                { label: 'Final Approval', completed: false },
              ]
            }
          }
        },
        {
          id: 'hp-4',
          role: 'assistant',
          content: "The draft is ready for your review. I've highlighted the variable fields for you to double-check.",
          block: {
            type: 'document',
            data: { name: 'Offer Letter - Harry Porter.pdf', size: '1.2 MB' }
          }
        }
      ];
      setMessages(mockHistory);
    } else if (activeTaskId !== latestNewTaskId) {
      // Generate fake history for other tasks only if they are not the "fresh" one
      const task = history.find(h => h.id === activeTaskId);
      if (task) {
        const fakeHistory = [
          {
            id: 'fake-1',
            role: 'user',
            content: task.label
          },
          {
            id: 'fake-2',
            role: 'assistant',
            content: `I've processed your request for "${task.label}". Everything looks good and the task has been completed successfully.`
          }
        ];
        setMessages(fakeHistory);
      }
    }
  }, [activeTaskId]); // Only run when activeTaskId changes

  const isEmpty = messages.length === 0;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;
    
    const userMsg = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate AI logic
    setTimeout(() => {
      let aiMsg: any = { id: (Date.now() + 1).toString(), role: 'assistant' };
      
      if (text.toLowerCase().includes('save this template for me')) {
        onSaveTemplate?.('New AI Template', '<h1>New Template</h1><p>This template was generated and saved via chat.</p>');
        aiMsg.content = "I've saved the template to your Templates library. You can find it there now!";
        setMessages(prev => [...prev, aiMsg]);
        return;
      }

      if (text.toLowerCase().includes('create templates')) {
        aiMsg.content = "What type of template do you want to create?";
        setMessages(prev => [...prev, aiMsg]);
        return;
      }

      if (flowStep === 'asking_recipient') {
        setRecipient(text);
        updateHistoryLabel?.(activeTaskId, `Get signatures + ${text}`);
        aiMsg.content = "What do you want to send?";
        aiMsg.block = {
          type: 'actions',
          data: {
            actions: [
              { id: 'select_template', label: 'Select from template' },
              { id: 'create_for_me', label: 'Create one for me' }
            ]
          }
        };
        setFlowStep('asking_document_type');
        setMessages(prev => [...prev, aiMsg]);
        return;
      }

      if (text === 'Get signatures') {
        updateHistoryLabel?.(activeTaskId, 'Get signatures');
        aiMsg.content = "Okay, who do you want to send to?";
        setFlowStep('asking_recipient');
        setMessages(prev => [...prev, aiMsg]);
        return;
      }

      if (text === 'Create templates') {
        updateHistoryLabel?.(activeTaskId, 'Create templates');
        aiMsg.content = "What type of template do you want to create?";
        setMessages(prev => [...prev, aiMsg]);
        return;
      }

      if (text.toLowerCase().includes('harry porter')) {
        aiMsg.content = "I'm starting the drafting process for Harry Porter's offer letter. I'll pull the standard Engineering template and populate it with the details we discussed.";
        setMessages(prev => [...prev, aiMsg]);

        // Sequence of messages
        setTimeout(() => {
          const progressMsg = {
            id: (Date.now() + 2).toString(),
            role: 'assistant',
            content: "I've mapped the compensation data and benefits package. Here's the current progress:",
            block: {
              type: 'progress',
              data: {
                percent: 65,
                steps: [
                  { label: 'Template Selection', completed: true },
                  { label: 'Employee Data Mapping', completed: true },
                  { label: 'Compensation Review', completed: true },
                  { label: 'Legal Clause Verification', completed: false },
                  { label: 'Final Approval', completed: false },
                ]
              }
            }
          };
          setMessages(prev => [...prev, progressMsg]);
        }, 1500);

        setTimeout(() => {
          const docMsg = {
            id: (Date.now() + 3).toString(),
            role: 'assistant',
            content: "The draft is ready for your review. I've highlighted the variable fields for you to double-check.",
            block: {
              type: 'document',
              data: { name: 'Offer Letter - Harry Porter.pdf', size: '1.2 MB' }
            }
          };
          setMessages(prev => [...prev, docMsg]);
        }, 3000);

        return;
      }

      if (text.toLowerCase().includes('offer letter')) {
        aiMsg.content = "I've drafted a standard offer letter template for you. You can review and edit the smart fields below.";
        aiMsg.block = { type: 'template', data: { name: 'Standard Offer Letter' } };
      } else if (text.toLowerCase().includes('bulk')) {
        aiMsg.content = "I've analyzed the ZIP file. I found 142 documents and mapped 139 of them to existing employee profiles.";
        aiMsg.block = { type: 'bulk', data: {} };
      } else {
        aiMsg.content = "I'm processing that request. I can help you with templates, bulk uploads, or document summaries. Which would you like to explore?";
      }
      
      setMessages(prev => [...prev, aiMsg]);
    }, 800);
  };

  const handleAction = (actionId: string) => {
    if (actionId === 'select_template') {
      setIsTemplateModalOpen(true);
    } else if (actionId === 'create_for_me') {
      const aiMsg = {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Sure, describe what document you want to send?"
      };
      setMessages(prev => [...prev, aiMsg]);
      setFlowStep('describing_document');
    }
  };

  const handleTemplateSelect = (templateName: string) => {
    setIsTemplateModalOpen(false);
    updateHistoryLabel?.(activeTaskId, `Get signatures + ${recipient} + ${templateName}`);
    const aiMsg = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `Great choice! I'll prepare the ${templateName} for ${recipient}.`
    };
    setMessages(prev => [...prev, aiMsg]);
  };

  return (
    <div className="h-full flex flex-col bg-white relative">
      {/* Template Selection Modal */}
      <AnimatePresence>
        {isTemplateModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsTemplateModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">Select Template</h3>
                <button onClick={() => setIsTemplateModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-slate-500">Choose a template to send for signature.</p>
                <div className="relative">
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none">
                    <option value="">Select a template...</option>
                    <option value="offer_letter">Offer Letter</option>
                    <option value="nda">Non-Disclosure Agreement</option>
                    <option value="contract">Employment Contract</option>
                    <option value="handbook">Employee Handbook</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
                
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-2xl py-6 font-bold"
                  onClick={() => handleTemplateSelect('Offer Letter Template')}
                >
                  Confirm Selection
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Top Navigation */}
      <header className="absolute top-0 left-0 right-0 h-14 flex items-center justify-between px-4 z-20">
        <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 p-2 rounded-lg transition-colors group">
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className={cn(
          "max-w-3xl mx-auto px-6 transition-all duration-500",
          isEmpty ? "h-full flex flex-col items-center justify-center pb-20" : "py-24 space-y-12"
        )}>
          {isEmpty ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex flex-col items-center"
            >
              <h1 className="text-[40px] font-semibold text-slate-900 mb-12 tracking-tight">What can I help with ?</h1>
              
              <div className="w-full max-w-2xl">
                <div className="bg-white rounded-[28px] p-4 shadow-sm border border-slate-200 focus-within:border-slate-300 transition-all">
                  <textarea 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Ask anything" 
                    className="w-full bg-transparent border-none text-slate-900 text-lg placeholder:text-slate-400 focus:ring-0 py-2 resize-none h-12"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-slate-200 text-slate-600 transition-colors">
                        <Paperclip className="w-4 h-4" />
                        <span className="text-xs font-medium">Attach</span>
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-slate-200 text-slate-600 transition-colors">
                        <Search className="w-4 h-4" />
                        <span className="text-xs font-medium">Search</span>
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-slate-200 text-slate-600 transition-colors">
                        <Lightbulb className="w-4 h-4" />
                        <span className="text-xs font-medium">Reason</span>
                      </button>
                    </div>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black text-white hover:bg-slate-800 transition-colors">
                      <Mic className="w-4 h-4" />
                      <span className="text-xs font-medium">Voice</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 mt-8 w-max max-w-none">
                  {[
                    { icon: Edit3, label: 'Get signatures', color: 'text-primary' },
                    { icon: FileText, label: 'Create templates', color: 'text-blue-500' },
                    { icon: Upload, label: 'Upload', color: 'text-emerald-500' },
                    { icon: FileSearch, label: 'Generate report', color: 'text-orange-500' },
                    { icon: Sparkles, label: 'Customize agent', color: 'text-amber-500' }
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleSend(item.label)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-200 hover:bg-slate-50 transition-all text-sm font-medium text-slate-600 whitespace-nowrap"
                    >
                      <item.icon className={cn("w-4 h-4", item.color)} />
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <AnimatePresence mode="popLayout">
              {messages.map((msg) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex flex-col gap-4",
                    msg.role === 'user' ? "items-end" : "items-start"
                  )}
                >
                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
                        <Zap className="text-white w-3.5 h-3.5 fill-current" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">AI Assistant</span>
                    </div>
                  )}
                  
                  <div className={cn(
                    "max-w-[85%] text-lg font-display tracking-tight leading-relaxed",
                    msg.role === 'user' ? "text-slate-900 text-right" : "text-slate-700"
                  )}>
                    {msg.content}
                  </div>

                  {msg.block && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Block 
                        type={msg.block.type} 
                        data={msg.block.data} 
                        onOpenEditor={onOpenEditor}
                        onOpenBulkUpload={onOpenBulkUpload}
                        onAction={handleAction}
                      />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {!isEmpty && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-3xl px-6">
          <div className="bg-white rounded-[28px] p-2 flex items-center gap-2 border border-slate-200 focus-within:border-slate-300 transition-all shadow-sm">
            <button className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
              <Plus className="w-5 h-5" />
            </button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Message ChatGPT" 
              className="flex-1 bg-transparent border-none text-slate-900 text-lg placeholder:text-slate-400 focus:ring-0 py-2"
            />
            <button 
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                input.trim() ? "bg-black text-white" : "bg-slate-200 text-slate-400"
              )}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Footer info */}
      <footer className="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none">
        <p className="text-[11px] text-slate-400 pointer-events-auto">
          By messaging ChatGPT, you agree to our <span className="underline cursor-pointer">Terms</span> and have read our <span className="underline cursor-pointer">Privacy Policy</span>.
        </p>
      </footer>
    </div>
  );
};
