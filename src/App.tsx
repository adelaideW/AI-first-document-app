import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { CommandCenter } from './components/CommandCenter';
import { FolderManager } from './components/FolderManager';
import { RecipientManager } from './components/RecipientManager';
import { AgentManager } from './components/AgentManager';
import { LogsManager } from './components/LogsManager';
import { UpdatesManager } from './components/UpdatesManager';
import { TemplateEditorModal } from './components/TemplateEditorModal';
import { BulkUploadModal } from './components/BulkUploadModal';
import { SideEditor } from './components/SideEditor';
import { motion, AnimatePresence } from 'motion/react';
import { PanelLeftOpen } from 'lucide-react';
import { Template } from './types';

const initialTemplates: Template[] = [
  { 
    id: 1, 
    name: 'Offer Letter Template v2', 
    description: 'Standard offer letter for new hires',
    type: 'AI suggested', 
    tags: ['HRIS', 'Payroll'], 
    lastModified: '2h ago',
    status: 'active',
    content: '<h1>Employment Offer</h1><p>Dear {{name}},</p><p>We are thrilled to offer you the position of Senior Software Engineer...</p>'
  },
  { 
    id: 2, 
    name: 'NDA Standard', 
    description: 'Mutual non-disclosure agreement',
    type: 'Uploaded', 
    tags: ['Legal', 'IT'], 
    lastModified: '1d ago',
    status: 'active',
    content: 'This Non-Disclosure Agreement (the "Agreement") is entered into by and between...'
  },
  { 
    id: 3, 
    name: 'Remote Work Policy', 
    description: 'Guidelines for remote and hybrid work',
    type: 'Created', 
    tags: ['Benefits', 'HRIS'], 
    lastModified: '3d ago',
    status: 'draft',
    content: 'Our remote work policy is designed to support a flexible and productive work environment...'
  },
  { 
    id: 4, 
    name: 'Performance Review Form', 
    description: 'Annual performance evaluation template',
    type: 'AI suggested', 
    tags: ['HRIS'], 
    lastModified: '1w ago',
    status: 'active',
    content: 'Employee Performance Evaluation Form. Section 1: Core Competencies...'
  },
  { 
    id: 5, 
    name: 'IT Asset Policy', 
    description: 'Policy for company-issued hardware',
    type: 'Created', 
    tags: ['IT', 'Security'], 
    lastModified: '2w ago',
    status: 'active',
    content: 'This policy outlines the responsibilities of employees regarding company-issued hardware...'
  },
];

export default function App() {
  const [activeTask, setActiveTask] = useState('chat');
  const [activeTaskId, setActiveTaskId] = useState('initial-task');
  const [latestNewTaskId, setLatestNewTaskId] = useState('initial-task');
  const [history, setHistory] = useState([
    { id: 'initial-task', label: 'New task', date: 'Just now' },
    { id: 'harry-porter', label: 'Draft offer letter for Harry Porter', date: '2m ago' },
    { id: '2', label: 'Bulk Upload ZIP', date: '1h ago' },
    { id: '3', label: 'Summarize NDA', date: 'Yesterday' },
    { id: '4', label: 'Employee Onboarding', date: '2 days ago' },
    { id: '5', label: 'Contract Review', date: '3 days ago' },
  ]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isSideEditorOpen, setIsSideEditorOpen] = useState(false);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);

  const handleNewTask = () => {
    const newId = Date.now().toString();
    const newTask = { id: newId, label: 'New task', date: 'Just now' };
    setHistory(prev => [newTask, ...prev]);
    setActiveTaskId(newId);
    setLatestNewTaskId(newId);
    setActiveTask('chat');
  };

  const handleSaveTemplate = (name: string, content: string) => {
    const newTemplate: Template = {
      id: Date.now(),
      name,
      description: `AI generated template for ${name}`,
      type: 'AI suggested',
      tags: ['AI Generated'],
      lastModified: 'Just now',
      status: 'active',
      content
    };
    setTemplates(prev => [newTemplate, ...prev]);
  };

  const updateHistoryLabel = (id: string, newLabel: string) => {
    setHistory(prev => prev.map(item => 
      item.id === id ? { ...item, label: newLabel } : item
    ));
    // If we update the label, it's no longer a "fresh" new task
    if (id === latestNewTaskId) {
      setLatestNewTaskId('');
    }
  };

  const renderContent = () => {
    switch (activeTask) {
      case 'chat':
        return (
          <CommandCenter 
            activeTaskId={activeTaskId}
            latestNewTaskId={latestNewTaskId}
            onOpenEditor={() => setIsSideEditorOpen(true)} 
            onOpenBulkUpload={() => setIsBulkUploadOpen(true)} 
            updateHistoryLabel={updateHistoryLabel}
            history={history}
            onSaveTemplate={handleSaveTemplate}
          />
        );
      case 'templates':
        return <FolderManager templates={templates} setTemplates={setTemplates} />;
      case 'recipients':
        return <RecipientManager />;
      case 'agent':
        return <AgentManager />;
      case 'logs':
        return <LogsManager />;
      case 'updates':
        return <UpdatesManager />;
      default:
        return (
          <CommandCenter 
            activeTaskId={activeTaskId}
            latestNewTaskId={latestNewTaskId}
            onOpenEditor={() => setIsSideEditorOpen(true)} 
            onOpenBulkUpload={() => setIsBulkUploadOpen(true)} 
            updateHistoryLabel={updateHistoryLabel}
            history={history}
            onSaveTemplate={handleSaveTemplate}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-white font-sans text-[#1A1A1A] overflow-hidden selection:bg-[#7A005D]/20">
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 260, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-full overflow-hidden"
          >
            <Sidebar 
              activeTask={activeTask} 
              setActiveTask={setActiveTask} 
              activeTaskId={activeTaskId}
              setActiveTaskId={setActiveTaskId}
              history={history}
              onNewTask={handleNewTask}
              onOpenBulkUpload={() => setIsBulkUploadOpen(true)}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      <main className="flex-1 overflow-hidden relative flex flex-row">
        <div className="flex-1 overflow-hidden relative flex flex-col">
          {/* Toggle Sidebar Button (when closed) */}
          {!isSidebarOpen && (
            <div className="absolute top-4 left-4 z-30">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
              >
                <PanelLeftOpen className="w-5 h-5" />
              </button>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTask}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full relative z-10"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        <SideEditor isOpen={isSideEditorOpen} onClose={() => setIsSideEditorOpen(false)} />
      </main>

      <TemplateEditorModal isOpen={isEditorOpen} onClose={() => setIsEditorOpen(false)} />
      <BulkUploadModal isOpen={isBulkUploadOpen} onClose={() => setIsBulkUploadOpen(false)} />
    </div>
  );
}
