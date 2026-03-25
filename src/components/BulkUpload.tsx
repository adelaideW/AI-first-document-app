import { useDropzone } from 'react-dropzone';
import { 
  Upload, 
  FileArchive, 
  X, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Users,
  ArrowRight
} from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/Button';
import { Card, CardContent } from './ui/Card';
import { cn } from '@/src/lib/utils';

export const BulkUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'application/zip': ['.zip']
    }
  } as any);

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    setUploading(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setUploading(false);
      }
    }, 100);
  };

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Bulk Upload</h1>
        <p className="text-slate-500 text-sm">Upload a ZIP file containing documents to automatically map them to employee profiles.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div 
            {...getRootProps()} 
            className={cn(
              "border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center transition-all cursor-pointer",
              isDragActive ? "border-primary bg-primary/5" : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
            )}
          >
            <input {...getInputProps()} />
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">Drop your ZIP here</h3>
            <p className="text-sm text-slate-500 text-center max-w-xs">
              Drag and drop your ZIP file, or click to browse. Documents will be mapped by filename or employee ID.
            </p>
          </div>

          {files.length > 0 && (
            <Card>
              <CardContent className="p-4 space-y-4">
                {files.map((file, i) => (
                  <div key={i} className="flex items-center justify-between bg-slate-50 p-3 rounded-xl">
                    <div className="flex items-center gap-3">
                      <FileArchive className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">{file.name}</p>
                        <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeFile(i)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}

                {uploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-600">Processing documents...</span>
                      <span className="text-primary">{progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="bg-primary h-full transition-all duration-300" 
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <Button 
                  className="w-full" 
                  disabled={uploading}
                  onClick={handleUpload}
                >
                  {uploading ? 'Uploading...' : 'Start Bulk Upload'}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card className="bg-slate-900 text-white border-none">
            <CardContent className="p-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">How it works</h4>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold shrink-0">1</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Prepare a ZIP file with documents named as <code className="text-primary/70">EmployeeID_DocName.pdf</code>.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold shrink-0">2</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    AI scans the filenames and content to verify employee matches.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold shrink-0">3</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Documents are automatically uploaded to the "Documents" tab of each employee profile.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Recent Bulk Tasks</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-slate-900">Tax_Forms_2023.zip</p>
                    <p className="text-[10px] text-slate-500">142 docs • Completed 2d ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-slate-900">Health_Benefits.zip</p>
                    <p className="text-[10px] text-slate-500">89 docs • 3 errors • 1d ago</p>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-4 text-primary">View all history</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
