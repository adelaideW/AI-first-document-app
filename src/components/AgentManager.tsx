import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Play, 
  Settings, 
  Save, 
  X, 
  Database, 
  Globe, 
  Cpu, 
  Zap,
  ArrowRight,
  Layout,
  Code,
  FileText,
  Trash2,
  Check,
  ZoomIn,
  ZoomOut,
  Maximize
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/Button';
import { cn } from '@/src/lib/utils';

interface Agent {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'draft';
  lastModified: string;
  type: string;
}

const agents: Agent[] = [
  { id: '1', name: 'Web Scraper Pro', description: 'Extracts data from any website with AI', status: 'active', lastModified: '2h ago', type: 'Automation' },
  { id: '2', name: 'Offer Letter Drafter', description: 'Drafts personalized offer letters', status: 'active', lastModified: '1d ago', type: 'HR' },
  { id: '3', name: 'NDA Summarizer', description: 'Summarizes complex legal documents', status: 'draft', lastModified: '3d ago', type: 'Legal' },
  { id: '4', name: 'Onboarding Assistant', description: 'Guides new hires through the process', status: 'active', lastModified: '1w ago', type: 'HR' },
  { id: '5', name: 'HR customized', description: 'Custom HR workflow agent', status: 'active', lastModified: 'Just now', type: 'HR' },
];

interface Node {
  id: string;
  name: string;
  description: string;
  type: 'input' | 'scrape' | 'ai' | 'output';
  value: string;
  position: { x: number; y: number };
}

const initialNodes: Node[] = [
  { 
    id: 'node-1', 
    name: 'Input Source', 
    description: 'Entry point', 
    type: 'input', 
    value: 's24_batch_data',
    position: { x: 0, y: 0 }
  },
  { 
    id: 'node-2', 
    name: 'Scrape Website', 
    description: 'Data extraction', 
    type: 'scrape', 
    value: 'Extracting links from directory...',
    position: { x: 0, y: 160 }
  },
  { 
    id: 'node-3', 
    name: 'Ask AI', 
    description: 'Reasoning engine', 
    type: 'ai', 
    value: 'Summarize the key benefits and extract salary ranges from the scraped data.',
    position: { x: 0, y: 320 }
  },
  { 
    id: 'node-4', 
    name: 'Write to Sheets', 
    description: 'Destination', 
    type: 'output', 
    value: 'Updating Google Sheet ID: 1x7...',
    position: { x: 0, y: 480 }
  },
];

export const AgentManager = () => {
  const [agentsList, setAgentsList] = useState<Agent[]>(agents);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [view, setView] = useState<'list' | 'canvas'>('list');
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const [dragStartPos, setDragStartPos] = useState<{ [key: string]: { x: number, y: number } }>({});

  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedNodeId) {
        // Don't delete if we're typing in an input
        if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
        deleteNode(selectedNodeId);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNodeId]);

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      const newZoom = Math.min(2, Math.max(0.2, zoom + delta));
      
      if (canvasRef.current) {
        const container = canvasRef.current;
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate the point in the zoomed coordinate system
        const scrollX = container.scrollLeft;
        const scrollY = container.scrollTop;
        
        const pointX = (scrollX + mouseX) / zoom;
        const pointY = (scrollY + mouseY) / zoom;

        // Update zoom
        setZoom(newZoom);

        // Adjust scroll to keep the point under the mouse
        // This is a bit rough with spring animation but helps
        setTimeout(() => {
          container.scrollLeft = pointX * newZoom - mouseX;
          container.scrollTop = pointY * newZoom - mouseY;
        }, 10);
      } else {
        setZoom(newZoom);
      }
    }
  };

  const fitToView = () => {
    if (nodes.length === 0) return;
    
    const minX = Math.min(...nodes.map(n => n.position.x));
    const minY = Math.min(...nodes.map(n => n.position.y));
    const maxX = Math.max(...nodes.map(n => n.position.x + 320));
    const maxY = Math.max(...nodes.map(n => n.position.y + 200));

    const contentWidth = maxX - minX;
    const contentHeight = maxY - minY;
    
    if (canvasRef.current) {
      const container = canvasRef.current;
      const zoomX = container.clientWidth / (contentWidth + 200);
      const zoomY = container.clientHeight / (contentHeight + 200);
      const newZoom = Math.min(1.2, Math.max(0.4, Math.min(zoomX, zoomY)));
      
      setZoom(newZoom);
      
      setTimeout(() => {
        container.scrollTo({
          left: (minX + 800) * newZoom - (container.clientWidth - contentWidth * newZoom) / 2,
          top: (minY + 400) * newZoom - (container.clientHeight - contentHeight * newZoom) / 2,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  const handleAgentClick = (agent: Agent) => {
    setSelectedAgent(agent);
    setView('canvas');
    // Center nodes after view switch
    setTimeout(fitToView, 100);
  };

  const updateNode = (id: string, updates: Partial<Node>) => {
    setNodes(prev => prev.map(n => n.id === id ? { ...n, ...updates } : n));
  };

  const addNode = (type: Node['type']) => {
    const lastNode = nodes[nodes.length - 1];
    const newNode: Node = {
      id: `node-${Date.now()}`,
      name: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      description: 'New step description',
      type,
      value: type === 'ai' ? 'Enter prompt here...' : 'Enter value here...',
      position: { 
        x: lastNode ? lastNode.position.x : 0, 
        y: lastNode ? lastNode.position.y + 160 : 0 
      }
    };
    setNodes([...nodes, newNode]);
    setSelectedNodeId(newNode.id);
  };

  const deleteNode = (id: string) => {
    setNodes(prev => prev.filter(n => n.id !== id));
    if (selectedNodeId === id) setSelectedNodeId(null);
  };

  const getNodeIcon = (type: Node['type']) => {
    switch (type) {
      case 'input': return <Database className="w-5 h-5 text-indigo-500" />;
      case 'scrape': return <Globe className="w-5 h-5 text-sky-500" />;
      case 'ai': return <Cpu className="w-5 h-5 text-amber-500" />;
      case 'output': return <Layout className="w-5 h-5 text-emerald-500" />;
    }
  };

  if (view === 'canvas' && selectedAgent) {
    return (
      <div className="h-full flex flex-col bg-slate-50 select-none">
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setView('list')} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div>
              <input 
                type="text"
                value={selectedAgent.name}
                onChange={(e) => {
                  const newName = e.target.value;
                  setSelectedAgent({ ...selectedAgent, name: newName });
                  setAgentsList(prev => prev.map(a => a.id === selectedAgent.id ? { ...a, name: newName } : a));
                }}
                className="text-sm font-bold text-slate-900 bg-transparent border-none p-0 focus:ring-0 w-full"
              />
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Flow Designer</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-100 rounded-xl p-1 mr-4">
              {(['input', 'scrape', 'ai', 'output'] as const).map((type) => (
                <button 
                  key={type}
                  onClick={() => addNode(type)}
                  className="px-3 py-1.5 text-[10px] font-bold text-slate-600 hover:bg-white hover:shadow-sm rounded-lg transition-all flex items-center gap-2 capitalize"
                  title={`Add ${type} step`}
                >
                  <Plus className="w-3 h-3" />
                  {type}
                </button>
              ))}
            </div>
            <Button variant="secondary" size="sm" className="rounded-xl gap-2 h-9">
              <Play className="w-4 h-4" />
              Test Run
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-white border-none rounded-xl gap-2 h-9">
              <Save className="w-4 h-4" />
              Deploy
            </Button>
          </div>
        </header>

        <div className="flex-1 relative overflow-hidden flex">
          {/* Floating Controls - Moved outside scroll area to stay fixed */}
          <div className="absolute bottom-8 left-8 z-40 flex flex-col gap-2">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-1.5 flex flex-col gap-1">
              <button 
                onClick={(e) => { e.stopPropagation(); setZoom(prev => Math.min(2, prev + 0.1)); }}
                className="p-2.5 hover:bg-slate-50 text-slate-600 rounded-xl transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <div className="h-px bg-slate-100 mx-2" />
              <button 
                onClick={(e) => { e.stopPropagation(); setZoom(prev => Math.max(0.2, prev - 0.1)); }}
                className="p-2.5 hover:bg-slate-50 text-slate-600 rounded-xl transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); fitToView(); }}
              className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-3.5 hover:bg-slate-50 text-slate-600 transition-colors"
              title="Fit to View"
            >
              <Maximize className="w-5 h-5" />
            </button>
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 px-3 py-1.5 text-[10px] font-bold text-slate-400 text-center">
              {Math.round(zoom * 100)}%
            </div>
          </div>

          {/* Canvas Area */}
          <div 
            ref={canvasRef}
            onWheel={handleWheel}
            onMouseDown={(e) => {
              if (e.button === 1 || (e.button === 0 && (e.ctrlKey || e.metaKey))) {
                setIsPanning(true);
                e.preventDefault();
              }
            }}
            onMouseMove={(e) => {
              if (isPanning && canvasRef.current) {
                canvasRef.current.scrollLeft -= e.movementX;
                canvasRef.current.scrollTop -= e.movementY;
              }
            }}
            onMouseUp={() => setIsPanning(false)}
            onMouseLeave={() => setIsPanning(false)}
            className={cn(
              "flex-1 relative overflow-auto bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] scrollbar-hide",
              isPanning ? "cursor-grabbing" : "cursor-default"
            )}
            onClick={() => setSelectedNodeId(null)}
          >
            <motion.div 
              className="relative w-[4000px] h-[4000px]"
              animate={{ scale: zoom }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{ transformOrigin: '0 0' }}
            >
              {/* SVG Layer for Connections */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                {nodes.map((node, index) => {
                  if (index === nodes.length - 1) return null;
                  const nextNode = nodes[index + 1];
                  
                  const startX = node.position.x + 160 + 800; 
                  const startY = node.position.y + 120 + 400; 
                  const endX = nextNode.position.x + 160 + 800;
                  const endY = nextNode.position.y + 400; 

                  // Curvy path
                  const cp1y = startY + (endY - startY) / 2;
                  const cp2y = startY + (endY - startY) / 2;
                  
                  return (
                    <motion.path
                      key={`line-${node.id}-${nextNode.id}`}
                      d={`M ${startX} ${startY} C ${startX} ${cp1y}, ${endX} ${cp2y}, ${endX} ${endY}`}
                      stroke="#cbd5e1"
                      strokeWidth="2"
                      strokeDasharray="6 6"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  );
                })}
              </svg>

              {nodes.map((node) => (
                <motion.div
                  key={node.id}
                  onPanStart={() => {
                    setDragStartPos(prev => ({ ...prev, [node.id]: node.position }));
                  }}
                  onPan={(_, info) => {
                    const start = dragStartPos[node.id];
                    if (start) {
                      updateNode(node.id, { 
                        position: { 
                          x: start.x + info.offset.x / zoom, 
                          y: start.y + info.offset.y / zoom
                        } 
                      });
                    }
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedNodeId(node.id);
                  }}
                  style={{ 
                    left: node.position.x + 800, 
                    top: node.position.y + 400,
                    position: 'absolute'
                  }}
                  className={cn(
                    "w-80 bg-white rounded-[2rem] p-7 shadow-xl border transition-all cursor-grab active:cursor-grabbing z-10 group",
                    selectedNodeId === node.id 
                      ? "border-primary ring-4 ring-primary/10 scale-[1.02]" 
                      : "border-slate-200 hover:border-slate-300 hover:shadow-2xl hover:-translate-y-1"
                  )}
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm",
                      node.type === 'input' && "bg-indigo-50",
                      node.type === 'scrape' && "bg-sky-50",
                      node.type === 'ai' && "bg-amber-50",
                      node.type === 'output' && "bg-emerald-50"
                    )}>
                      {getNodeIcon(node.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={cn(
                          "text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md",
                          node.type === 'input' && "bg-indigo-100 text-indigo-600",
                          node.type === 'scrape' && "bg-sky-100 text-sky-600",
                          node.type === 'ai' && "bg-amber-100 text-amber-600",
                          node.type === 'output' && "bg-emerald-100 text-emerald-600"
                        )}>
                          {node.type}
                        </span>
                      </div>
                      <input 
                        type="text"
                        value={node.name}
                        onChange={(e) => updateNode(node.id, { name: e.target.value })}
                        onClick={(e) => e.stopPropagation()}
                        className="text-sm font-extrabold text-slate-900 bg-transparent border-none p-0 focus:ring-0 w-full truncate"
                      />
                      <input 
                        type="text"
                        value={node.description}
                        onChange={(e) => updateNode(node.id, { description: e.target.value })}
                        onClick={(e) => e.stopPropagation()}
                        className="text-[10px] text-slate-400 font-bold uppercase tracking-wider bg-transparent border-none p-0 focus:ring-0 w-full truncate"
                      />
                    </div>
                    {selectedNodeId === node.id && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNode(node.id);
                        }}
                        className="p-2 hover:bg-red-50 text-red-400 rounded-xl transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-white transition-colors">
                    {node.type === 'input' && <p className="text-[9px] text-slate-400 uppercase font-black mb-1.5 tracking-widest">Default Value</p>}
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 font-medium">{node.value}</p>
                  </div>
                  
                  {/* Connection Points */}
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-2 border-slate-200 rounded-full z-20" />
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-2 border-slate-200 rounded-full z-20" />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Side Panel: Settings */}
          <AnimatePresence>
            {selectedNode && (
              <motion.aside 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 320, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="bg-white border-l border-slate-200 flex flex-col z-20 overflow-hidden"
              >
                <div className="p-6 border-b border-slate-100 min-w-[320px]">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
                    Node Settings
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase mb-1.5 block">Node Name</label>
                        <input 
                          type="text" 
                          value={selectedNode.name} 
                          onChange={(e) => updateNode(selectedNode.id, { name: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium" 
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase mb-1.5 block">Description</label>
                        <input 
                          type="text" 
                          value={selectedNode.description} 
                          onChange={(e) => updateNode(selectedNode.id, { description: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
                        />
                      </div>
                      {selectedNode.type === 'ai' && (
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase mb-1.5 block">Model</label>
                          <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer">
                            <option>Gemini 1.5 Pro</option>
                            <option>Gemini 1.5 Flash</option>
                          </select>
                        </div>
                      )}
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase mb-1.5 block">
                          {selectedNode.type === 'ai' ? 'Prompt' : 'Value'}
                        </label>
                        <textarea 
                          rows={selectedNode.type === 'ai' ? 6 : 3} 
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none transition-all" 
                          value={selectedNode.value}
                          onChange={(e) => updateNode(selectedNode.id, { value: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 mt-auto border-t border-slate-100 min-w-[320px]">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-white border-none rounded-xl gap-2 py-6 font-bold"
                    onClick={() => setSelectedNodeId(null)}
                  >
                    <Check className="w-4 h-4" />
                    Done Editing
                  </Button>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Agents</h1>
          <p className="text-sm text-slate-500">Manage and deploy your AI agents</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white border-none rounded-xl gap-2">
          <Plus className="w-4 h-4" />
          Create Agent
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search agents..." 
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 border border-slate-200">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="border border-slate-100 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Name</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last Modified</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {agentsList.map((agent) => (
              <tr 
                key={agent.id} 
                className="hover:bg-slate-50 transition-colors cursor-pointer group"
                onClick={() => handleAgentClick(agent)}
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{agent.name || (agent as any).label}</p>
                    <p className="text-xs text-slate-500">{agent.description}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium text-slate-600 px-2 py-1 bg-slate-100 rounded-lg">{agent.type}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-1.5 h-1.5 rounded-full", agent.status === 'active' ? "bg-emerald-500" : "bg-amber-500")} />
                    <span className="text-xs font-medium text-slate-600 capitalize">{agent.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs text-slate-500">{agent.lastModified}</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-400 transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
