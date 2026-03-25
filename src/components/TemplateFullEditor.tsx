import React, { useState } from 'react';
import { 
  X, 
  Save, 
  Undo2, 
  Redo2, 
  Printer, 
  ChevronDown, 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  Code, 
  Type, 
  Highlighter, 
  Link2, 
  Image as ImageIcon, 
  Plus, 
  AlignLeft, 
  List, 
  ListOrdered, 
  Eraser, 
  MoreHorizontal,
  Search,
  Users,
  Layers,
  Settings,
  HelpCircle,
  MessageSquare,
  Share2
} from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '@/src/lib/utils';

import { Template } from '../types';

interface TemplateFullEditorProps {
  template: Template;
  onClose: () => void;
}

export const TemplateFullEditor: React.FC<TemplateFullEditorProps> = ({ template, onClose }) => {
  const [docName, setDocName] = useState(template.name);

  return (
    <div className="h-full flex flex-col bg-[#F8F9FA] overflow-hidden select-none">
      {/* Top Header */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 shrink-0 z-20">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div className="flex flex-col min-w-0">
            <input 
              type="text" 
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
              className="text-sm font-medium text-slate-900 bg-transparent border-none focus:ring-0 p-0 truncate w-full max-w-[400px]"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-2 text-slate-600 font-medium border border-slate-200">
            <Users className="w-4 h-4" />
            Recipient fields
          </Button>
          <Button variant="ghost" size="sm" className="gap-2 text-indigo-600 font-medium border border-indigo-100 bg-indigo-50/30">
            <Plus className="w-4 h-4" />
            Add variables
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-600 font-medium border border-slate-200">
            Preview
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-600 font-medium border border-slate-200">
            Import
          </Button>
          <Button className="bg-[#800080] hover:bg-[#660066] text-white font-medium rounded-lg px-6 ml-2">
            Publish
          </Button>
        </div>
      </header>

      {/* Toolbar */}
      <div className="h-10 bg-white border-b border-slate-200 flex items-center px-4 gap-1 shrink-0 z-10 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-0.5 pr-2 border-r border-slate-200 mr-2">
          <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500"><Undo2 className="w-4 h-4" /></button>
          <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500"><Redo2 className="w-4 h-4" /></button>
          <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500"><Printer className="w-4 h-4" /></button>
        </div>

        <div className="flex items-center gap-1 pr-2 border-r border-slate-200 mr-2">
          <button className="flex items-center gap-2 px-2 py-1 hover:bg-slate-100 rounded text-xs font-medium text-slate-700">
            Normal text <ChevronDown className="w-3 h-3" />
          </button>
          <div className="w-px h-4 bg-slate-200 mx-1" />
          <button className="flex items-center gap-2 px-2 py-1 hover:bg-slate-100 rounded text-xs font-medium text-slate-700">
            Times New Roman <ChevronDown className="w-3 h-3" />
          </button>
        </div>

        <div className="flex items-center gap-1 pr-2 border-r border-slate-200 mr-2">
          <button className="p-1 hover:bg-slate-100 rounded text-slate-700 font-medium text-sm w-6">-</button>
          <div className="px-2 py-0.5 border border-slate-200 rounded text-xs font-medium text-slate-700 bg-slate-50">11</div>
          <button className="p-1 hover:bg-slate-100 rounded text-slate-700 font-medium text-sm w-6">+</button>
        </div>

        <div className="flex items-center gap-0.5 pr-2 border-r border-slate-200 mr-2">
          <button className="p-1.5 hover:bg-slate-100 rounded text-slate-700"><Bold className="w-4 h-4" /></button>
          <button className="p-1.5 hover:bg-slate-100 rounded text-slate-700"><Italic className="w-4 h-4" /></button>
          <button className="p-1.5 hover:bg-slate-100 rounded text-slate-700"><Underline className="w-4 h-4" /></button>
          <button className="p-1.5 hover:bg-slate-100 rounded text-slate-700"><Strikethrough className="w-4 h-4" /></button>
          <button className="p-1.5 hover:bg-slate-100 rounded text-slate-700"><Code className="w-4 h-4" /></button>
        </div>

        <div className="flex items-center gap-0.5 pr-2 border-r border-slate-200 mr-2">
          <button className="p-1.5 hover:bg-slate-100 rounded text-slate-700"><Type className="w-4 h-4" /></button>
          <button className="p-1.5 hover:bg-slate-100 rounded text-slate-700"><Highlighter className="w-4 h-4" /></button>
          <button className="p-1.5 hover:bg-slate-100 rounded text-slate-700"><Link2 className="w-4 h-4" /></button>
          <button className="p-1.5 hover:bg-slate-100 rounded text-slate-700"><ImageIcon className="w-4 h-4" /></button>
          <button className="p-1.5 hover:bg-slate-100 rounded text-slate-700"><Plus className="w-4 h-4" /></button>
        </div>

        <div className="flex items-center gap-0.5">
          <button className="p-1.5 hover:bg-slate-100 rounded text-slate-700"><AlignLeft className="w-4 h-4" /></button>
          <button className="p-1.5 hover:bg-slate-100 rounded text-slate-700"><List className="w-4 h-4" /></button>
          <button className="p-1.5 hover:bg-slate-100 rounded text-slate-700"><ListOrdered className="w-4 h-4" /></button>
          <button className="p-1.5 hover:bg-slate-100 rounded text-slate-700"><Eraser className="w-4 h-4" /></button>
          <button className="p-1.5 hover:bg-slate-100 rounded text-slate-700"><MoreHorizontal className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <main className="flex-1 overflow-y-auto p-12 flex justify-center bg-[#F8F9FA]">
            <div className="w-[816px] min-h-[1056px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)] p-[96px] text-slate-900 relative">
              <div className="space-y-6 text-[11pt] leading-[1.5] font-serif">
                <div className="space-y-4">
                  <p className="font-bold">8. Employee Proprietary Information Agreement.</p>
                  <p className="text-justify">
                    As a condition of your employment with the Company, you will be required to sign and comply with an At-Will Employment, Confidential Information, Invention Assignment, and Arbitration Agreement (the <span className="font-bold">"Confidentiality Agreement"</span>), which requires, among other provisions, the assignment of patent rights to any invention made during your employment at the Company, and non-disclosure of Company proprietary information. A copy of the Confidentiality Agreement is attached hereto. In the event of any dispute or claim relating to or arising out of our employment relationship, you and the Company agree that (i) any and all disputes between you and the Company shall be fully and finally resolved by binding arbitration, (ii) you are waiving any and all rights to a jury trial but all court remedies will be available in arbitration, (iii) all disputes shall be resolved by a neutral arbitrator who shall issue a written opinion, (iv) the arbitration shall provide for adequate discovery, and (v) the Company shall pay all the arbitration fees, except an amount equal to the filing fees you would have paid had you filed a complaint in a court of law. The arbitration agreement referenced above is more fully set forth in the attached Confidentiality Agreement. Please note that we must receive your signed Confidentiality Agreement before your first day of employment with the Company.
                  </p>
                </div>

                <div className="space-y-4">
                  <p className="text-justify">
                    9. <span className="underline">Company Policies.</span> As a Company employee, you will be expected to abide by the Company's rules and standards. Specifically, you will be required to sign an acknowledgment that you have read and that you understand the Company's policies which are included in the Company Handbook, which the Company will soon complete and distribute.
                  </p>
                </div>

                <div className="space-y-4">
                  <p className="text-justify">
                    10. <span className="underline">General.</span> If you accept our offer, your first day of employment will be <span className="bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded border border-indigo-100 text-[10pt]">First start date <X className="w-3 h-3 inline-block ml-1 cursor-pointer" /></span>. This letter, Exhibit A, and the Confidentiality Agreement, set forth the terms of your employment with the Company and supersede any prior representations or agreements including, but not limited to, any representations made during your recruitment, interviews or pre-employment negotiations, whether written or oral. This letter, including, but not limited to, its at-will employment provision, may not be modified or amended except by a written agreement signed by the President of the Company and you. This offer letter will be governed by Texas law.
                  </p>
                </div>

                <div className="space-y-4 pt-4">
                  <p className="text-justify">
                    We look forward to you joining the Company. If the foregoing terms are agreeable, please indicate your acceptance by signing this offer letter in the space provided below and returning it to me, along with your completed and signed Confidentiality Agreement. This offer of employment will terminate if it is not accepted, signed and returned by <span className="bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded border border-indigo-100 text-[10pt]">Offer expiration date <X className="w-3 h-3 inline-block ml-1 cursor-pointer" /></span>.
                  </p>
                </div>

                <div className="pt-12 text-right space-y-1">
                  <p>Sincerely,</p>
                  <p>Company Inc.</p>
                  <div className="mt-4">
                    <span className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded border border-indigo-100 text-[10pt]">Company signatory signature <X className="w-3 h-3 inline-block ml-1 cursor-pointer" /></span>
                  </div>
                </div>

                <div className="pt-12">
                  <p className="font-bold uppercase">AGREED TO AND ACCEPTED:</p>
                </div>
              </div>
            </div>
          </main>

          {/* Floating Feedback Button */}
          <div className="absolute bottom-12 right-12 flex flex-col items-center gap-4 z-10">
            <button className="bg-white border border-slate-200 shadow-lg p-3 rounded-full text-slate-500 hover:text-slate-900 transition-all hover:scale-110">
              <MessageSquare className="w-5 h-5" />
            </button>
            <div className="[writing-mode:vertical-rl] text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <div className="w-px h-8 bg-slate-200" />
              Share Feedback
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="w-[280px] bg-white border-l border-slate-200 flex flex-col shrink-0 z-20">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">Recipients</h2>
            <button className="p-1 hover:bg-slate-100 rounded text-slate-400"><X className="w-4 h-4" /></button>
          </div>

          <div className="p-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search people" 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500/20 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="set-order" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20" />
              <label htmlFor="set-order" className="text-xs text-slate-600 flex items-center gap-1">
                Set order <HelpCircle className="w-3 h-3 text-slate-400" />
              </label>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-[10px]">E</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">Employee</p>
                  <p className="text-[10px] text-slate-400 truncate">Placeholder recipient</p>
                </div>
              </div>
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-[10px]">M</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">Manager</p>
                  <p className="text-[10px] text-slate-400 truncate">Placeholder recipient</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Far Right Rail */}
        <div className="w-12 bg-white border-l border-slate-200 flex flex-col items-center py-4 gap-6 shrink-0 z-20">
          <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><Layers className="w-5 h-5" /></button>
          <button className="p-2 text-indigo-600 bg-indigo-50 rounded-lg transition-colors"><Users className="w-5 h-5" /></button>
          <div className="flex-1" />
          <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><Settings className="w-5 h-5" /></button>
        </div>
      </div>
    </div>
  );
};
