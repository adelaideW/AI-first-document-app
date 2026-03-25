import { useState, useCallback } from 'react';
import { 
  X, 
  Upload, 
  FileArchive, 
  Check, 
  AlertCircle, 
  Loader2,
  Users,
  FileText,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useDropzone } from 'react-dropzone';
import { Button } from './ui/Button';
import { cn } from '@/src/lib/utils';

export const BulkUploadModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState<'upload' | 'analyzing' | 'review'>('upload');
  const [files, setFiles] = useState<any[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    setStep('analyzing');
    
    // Simulate AI analysis
    setTimeout(() => {
      setStep('review');
    }, 3000);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/zip': ['.zip'],
      'application/x-zip-compressed': ['.zip']
    },
    multiple: false
  } as any);

  const mockAnalysis = {
    total: 142,
    mapped: 139,
    unmapped: 3,
    categories: [
      { name: 'Offer Letters', count: 85 },
      { name: 'NDAs', count: 42 },
      { name: 'Tax Forms', count: 15 }
    ]
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
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
            className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200"
          >
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <Upload className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-display font-bold text-slate-900 tracking-tight">Bulk Document Upload</h2>
                  <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] mt-0.5">AI-Powered Mapping</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-300 hover:text-slate-600">
                <X className="w-6 h-6" />
              </Button>
            </div>

            <div className="p-10">
              {step === 'upload' && (
                <div 
                  {...getRootProps()} 
                  className={cn(
                    "border-2 border-dashed rounded-[2rem] p-16 flex flex-col items-center justify-center text-center transition-all cursor-pointer",
                    isDragActive ? "border-emerald-500 bg-emerald-50" : "border-slate-200 hover:border-emerald-500/50 hover:bg-slate-50"
                  )}
                >
                  <input {...getInputProps()} />
                  <div className="w-20 h-20 bg-white border border-slate-100 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FileArchive className={cn("w-10 h-10 transition-colors", isDragActive ? "text-emerald-500" : "text-slate-300")} />
                  </div>
                  <h3 className="text-xl font-display font-bold text-slate-900 mb-2">Drop your ZIP file here</h3>
                  <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
                    Upload a ZIP containing employee documents. Our AI will automatically map them to the correct profiles.
                  </p>
                  <Button className="mt-8 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl px-8 font-bold shadow-lg shadow-indigo-500/20">
                    Select File
                  </Button>
                </div>
              )}

              {step === 'analyzing' && (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="relative mb-8">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="w-24 h-24 border-4 border-emerald-100 border-t-emerald-500 rounded-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-emerald-500 animate-pulse" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-slate-900 mb-3">Analyzing Documents...</h3>
                  <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
                    Our AI is extracting metadata and matching 142 documents against your employee database.
                  </p>
                  
                  <div className="w-full max-w-xs mt-12 space-y-4">
                    <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <span>Processing</span>
                      <span>65%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '65%' }}
                        className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 'review' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="glass-card p-6 border-emerald-100 bg-white">
                      <p className="text-[10px] font-bold text-emerald-600/60 uppercase tracking-widest mb-1">Total</p>
                      <p className="text-3xl font-display font-bold text-slate-900">{mockAnalysis.total}</p>
                    </div>
                    <div className="glass-card p-6 border-emerald-100 bg-white">
                      <p className="text-[10px] font-bold text-emerald-600/60 uppercase tracking-widest mb-1">Mapped</p>
                      <p className="text-3xl font-display font-bold text-slate-900">{mockAnalysis.mapped}</p>
                    </div>
                    <div className="glass-card p-6 border-amber-100 bg-white">
                      <p className="text-[10px] font-bold text-amber-600/60 uppercase tracking-widest mb-1">Unmapped</p>
                      <p className="text-3xl font-display font-bold text-slate-900">{mockAnalysis.unmapped}</p>
                    </div>
                  </div>

                  <div className="glass-card p-8 space-y-6">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Analysis Summary</h4>
                    <div className="space-y-4">
                      {mockAnalysis.categories.map(cat => (
                        <div key={cat.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.2)]" />
                            <span className="text-sm text-slate-700">{cat.name}</span>
                          </div>
                          <span className="text-sm font-bold text-slate-900">{cat.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {mockAnalysis.unmapped > 0 && (
                    <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-4">
                      <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-amber-600 mb-1">Attention Required</p>
                        <p className="text-[11px] text-amber-600/60 leading-relaxed">
                          3 documents couldn't be automatically mapped. You'll need to manually assign them after confirmation.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4 pt-4">
                    <Button variant="secondary" className="flex-1 bg-white border-slate-200 text-slate-600 rounded-xl h-14 font-bold" onClick={() => setStep('upload')}>
                      Back
                    </Button>
                    <Button className="flex-2 bg-emerald-600 hover:bg-emerald-700 border-none text-white rounded-xl h-14 font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20">
                      Confirm & Distribute
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
