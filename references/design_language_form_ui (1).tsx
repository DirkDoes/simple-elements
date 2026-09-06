import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, Mail, Lock, Eye, EyeOff, Check, AlertCircle, ChevronDown, 
  UploadCloud, Sun, Moon, LayoutDashboard, Users, Settings, Zap, 
  Package, Activity, Database, Type, ToggleLeft, List, MousePointer2, 
  X, ShieldAlert, Crown, FileText, Trash2, FileUp, ChevronRight, 
  ChevronLeft, MessageSquare, MoreVertical, Edit2, Copy, Send, 
  PanelRightClose, PanelRightOpen, Bell, LogOut, PanelLeftClose, PanelLeftOpen
} from 'lucide-react';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activePage, setActivePage] = useState('buttons');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Form States
  const [showPassword, setShowPassword] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  
  // Single-Select Dropdown States
  const [selectedTitleOnly, setSelectedTitleOnly] = useState(null);
  const [selectedTitleIcon, setSelectedTitleIcon] = useState(null);
  const [selectedTitleSubtext, setSelectedTitleSubtext] = useState(null);
  const [selectedFull, setSelectedFull] = useState(null);

  // Multi-Select Dropdown States
  const [multiTitleOnly, setMultiTitleOnly] = useState([
    { id: '1', label: 'Software Engineer', locked: true }
  ]);
  const [multiTitleIcon, setMultiTitleIcon] = useState([
    { id: '1', label: 'Dashboard', icon: LayoutDashboard, locked: true }
  ]);
  const [multiFull, setMultiFull] = useState([]);
  const [multiTitleSubtext, setMultiTitleSubtext] = useState([]);
  const [multiDisabled, setMultiDisabled] = useState([
    { id: '1', label: 'Software Engineer' },
    { id: '2', label: 'Product Manager' }
  ]);

  // Overlay States
  const [isSmallModalOpen, setIsSmallModalOpen] = useState(false);
  const [isLargeModalOpen, setIsLargeModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Split Button State
  const splitOptions = [
    { id: 'publish', label: 'Publish Changes', icon: Send },
    { id: 'draft', label: 'Save as Draft', icon: FileText },
    { id: 'schedule', label: 'Schedule Post', icon: Activity },
  ];
  const [splitAction, setSplitAction] = useState(splitOptions[0]);

  // Country Codes Data
  const countryCodes = [
    { code: '+1', country: 'United States', flag: '🇺🇸' },
    { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
    { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
    { code: '+49', country: 'Germany', flag: '🇩🇪' },
  ];

  // Data Options 
  const optionsTitlesOnly = [
    { id: '1', label: 'Software Engineer' },
    { id: '2', label: 'Product Manager' },
    { id: '3', label: 'Data Scientist', disabled: true },
  ];
  const optionsTitlesIcons = [
    { id: '1', label: 'Dashboard', icon: LayoutDashboard },
    { id: '2', label: 'Team Activity', icon: Activity },
    { id: '3', label: 'System Settings', icon: Settings, disabled: true },
  ];
  const optionsTitlesSubtext = [
    { id: '1', label: 'Basic Plan', description: 'Great for starters and individuals' },
    { id: '2', label: 'Pro Plan', description: 'For growing teams and businesses' },
    { id: '3', label: 'Enterprise', description: 'Contact sales to unlock this plan' },
  ];
  const optionsFull = [
    { id: '1', label: 'Web Applications', description: 'Deploy your frontend apps globally', icon: Package },
    { id: '2', label: 'Edge Functions', description: 'Run serverless code at the edge', icon: Zap },
    { id: '3', label: 'Managed Database', description: 'Currently undergoing maintenance', icon: Database },
  ];

  // Sidebar Navigation Items
  const navItems = [
    { id: 'inputs', label: 'Text Inputs', icon: Type },
    { id: 'controls', label: 'Selection Controls', icon: ToggleLeft },
    { id: 'dropdowns', label: 'Dropdowns & Selects', icon: List },
    { id: 'buttons', label: 'Buttons', icon: MousePointer2 },
    { id: 'uploads', label: 'File Uploads', icon: FileUp },
    { id: 'context', label: 'Contextual', icon: MessageSquare },
    { id: 'profiles', label: 'Profiles', icon: Users },
    { id: 'overlays', label: 'Overlays', icon: Zap },
  ];

  // --- REUSABLE SUB-COMPONENTS ---
  const Label = ({ children, required, htmlFor }) => (
    <label htmlFor={htmlFor} className="block text-sm font-semibold text-gray-800 dark:text-slate-200 mb-1.5 transition-colors">
      {children}
      {required && <span className="text-red-500 dark:text-red-400 ml-1">*</span>}
    </label>
  );

  const Hint = ({ children, error }) => (
    <p className={`text-xs mt-1.5 transition-colors ${error ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-slate-400'}`}>
      {children}
    </p>
  );

  // Custom Scrollbar CSS
  const customScrollbarStyles = `
    .custom-scrollbar::-webkit-scrollbar { width: 10px; height: 10px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 6px; border: 3px solid transparent; background-clip: content-box; }
    .dark .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #475569; }
    .custom-scrollbar::-webkit-scrollbar-corner { background: transparent; }
    .custom-scrollbar::-webkit-resizer { background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 12L12 10M6 12L12 6M2 12L12 2' stroke='%2394A3B8' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: bottom 2px right 2px; }
    .dark .custom-scrollbar::-webkit-resizer { background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 12L12 10M6 12L12 6M2 12L12 2' stroke='%23475569' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E"); }
  `;

  // Tooltip Component
  const Tooltip = ({ children, content }) => {
    return (
      <div className="relative group inline-block">
        {children}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 pointer-events-none w-max max-w-xs">
          <div className="bg-gray-900 dark:bg-white text-white dark:text-slate-900 text-xs font-medium py-1.5 px-2.5 rounded-lg shadow-xl relative transition-colors">
            {content}
            {/* Triangle Pointer */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-gray-900 dark:border-t-white transition-colors"></div>
          </div>
        </div>
      </div>
    );
  };

  // User Profile Component
  const UserProfile = ({ name, subtitle, initials, clickable }) => {
    const Wrapper = clickable ? 'button' : 'div';
    return (
      <Wrapper className={`flex items-center gap-3 text-left outline-none rounded-lg p-2 transition-all
        ${clickable ? 'hover:bg-gray-100 dark:hover:bg-slate-800 focus-visible:ring-4 focus-visible:ring-blue-500/20' : ''}
      `}>
        <div className="w-10 h-10 shrink-0 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 font-bold flex items-center justify-center text-sm shadow-sm transition-colors border border-blue-200 dark:border-blue-800/50">
          {initials}
        </div>
        <div>
          <div className="text-sm font-bold text-gray-900 dark:text-white transition-colors leading-tight">{name}</div>
          {subtitle && <div className="text-xs text-gray-500 dark:text-slate-400 transition-colors mt-0.5">{subtitle}</div>}
        </div>
      </Wrapper>
    );
  };

  // Dropdown Component Logic (Simplified here for space, reused from previous)
  const PhoneInput = ({ label }) => { /* ... existing phone input ... */ return <div>[Phone Input Component]</div> };
  const CustomDropdown = ({ label, options, selectedOption, setSelectedOption, disabled, placeholder = "Choose...", searchable = false }) => {
     // Utilizing the previously built rich dropdown logic
     const [isOpen, setIsOpen] = useState(false);
     const [searchTerm, setSearchTerm] = useState('');
     const dropdownRef = useRef(null);
 
     useEffect(() => {
       const handleClickOutside = (e) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false); };
       document.addEventListener('mousedown', handleClickOutside);
       return () => document.removeEventListener('mousedown', handleClickOutside);
     }, []);
 
     return (
       <div ref={dropdownRef}>
         {label && <Label>{label}</Label>}
         <div className="relative">
           <button type="button" disabled={disabled} onClick={() => !disabled && setIsOpen(!isOpen)} className={`w-full outline-none px-4 py-2.5 border rounded-lg text-sm shadow-sm transition-all text-left flex items-center justify-between group ${disabled ? 'bg-gray-50 dark:bg-slate-900/50 border-gray-200 dark:border-slate-800 text-gray-500 dark:text-slate-500 cursor-not-allowed' : 'bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10 cursor-pointer'}`}>
             {selectedOption ? (
               <div className={`flex items-center gap-2.5 transition-colors truncate ${disabled ? 'text-gray-500 dark:text-slate-500' : 'text-gray-900 dark:text-white'}`}>
                 {selectedOption.icon && <selectedOption.icon className={`w-4 h-4 shrink-0 ${disabled ? 'text-gray-400 dark:text-slate-600' : 'text-blue-600 dark:text-blue-400'}`} />}
                 <span className="font-medium truncate">{selectedOption.label}</span>
               </div>
             ) : <span className={`transition-colors truncate ${disabled ? 'text-gray-400 dark:text-slate-600' : 'text-gray-400 dark:text-slate-500'}`}>{placeholder}</span>}
             <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-200 ${disabled ? 'text-gray-300 dark:text-slate-700' : 'text-gray-400 dark:text-slate-500 group-hover:text-gray-600 dark:group-hover:text-slate-300'} ${isOpen ? 'rotate-180' : ''}`} />
           </button>
           {isOpen && !disabled && (
             <div className="absolute z-20 w-full mt-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg shadow-xl dark:shadow-slate-900/50 overflow-hidden flex flex-col transition-colors">
               {searchable && (
                 <div className="p-2 border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50">
                   <div className="relative">
                     <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 dark:text-slate-500" />
                     <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full outline-none pl-8 pr-3 py-1.5 bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-700 rounded-md text-sm focus:border-blue-500 dark:focus:border-blue-400 transition-all dark:text-white" />
                   </div>
                 </div>
               )}
               <div className="max-h-60 overflow-y-auto custom-scrollbar py-1.5">
                 {options.filter(o => !searchable || o.label.toLowerCase().includes(searchTerm.toLowerCase())).map((option) => (
                   <button key={option.id} disabled={option.disabled} onClick={() => { if (!option.disabled) { setSelectedOption(option); setIsOpen(false); setSearchTerm(''); } }} className={`w-full outline-none px-4 py-3 flex gap-3 transition-colors text-left ${option.description ? 'items-start' : 'items-center'} ${option.disabled ? 'opacity-50 cursor-not-allowed bg-gray-50/50 dark:bg-slate-800/30' : 'hover:bg-gray-50 dark:hover:bg-slate-800/80 cursor-pointer'} ${selectedOption?.id === option.id && !option.disabled ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''}`}>
                     {option.icon && <div className={`shrink-0 transition-colors ${selectedOption?.id === option.id && !option.disabled ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-slate-500'}`}><option.icon className="w-5 h-5" strokeWidth={1.5} /></div>}
                     <div className="flex-1 min-w-0">
                       <div className={`text-sm font-semibold truncate transition-colors ${selectedOption?.id === option.id && !option.disabled ? 'text-blue-700 dark:text-blue-300' : 'text-gray-900 dark:text-slate-200'}`}>{option.label}</div>
                       {option.description && <div className={`text-xs mt-0.5 transition-colors leading-relaxed ${selectedOption?.id === option.id && !option.disabled ? 'text-blue-600/80 dark:text-blue-400/80' : 'text-gray-500 dark:text-slate-400'}`}>{option.description}</div>}
                     </div>
                   </button>
                 ))}
               </div>
             </div>
           )}
         </div>
       </div>
     );
  };


  // --- PAGE RENDERING LOGIC ---
  const renderContent = () => {
    switch (activePage) {
      case 'buttons':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 transition-colors">Buttons</h2>
              <p className="text-sm text-gray-500 dark:text-slate-400 mb-6 transition-colors">Standard buttons, split buttons, label buttons, and icon buttons.</p>
              
              <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm transition-colors space-y-12">
                
                {/* Standard Buttons */}
                <div>
                  <h3 className="text-sm font-bold tracking-widest text-gray-400 dark:text-slate-500 uppercase mb-4">Standard Buttons</h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <button className="outline-none px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-lg shadow-sm hover:bg-gray-800 dark:hover:bg-gray-100 focus:ring-4 focus:ring-gray-900/20 dark:focus:ring-white/20 transition-all active:scale-[0.98]">
                      Primary Action
                    </button>
                    <button className="outline-none px-5 py-2.5 bg-blue-600 dark:bg-blue-500 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-blue-700 dark:hover:bg-blue-600 focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all active:scale-[0.98] flex items-center gap-2">
                      <Send className="w-4 h-4" /> Brand Action
                    </button>
                    <button className="outline-none px-5 py-2.5 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-300 text-sm font-medium rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-slate-800 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-gray-200 dark:focus:ring-slate-700 transition-all active:scale-[0.98] flex items-center gap-2">
                      <Settings className="w-4 h-4" /> Secondary Outline
                    </button>
                    <button className="outline-none px-5 py-2.5 bg-transparent text-gray-600 dark:text-slate-400 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white focus:ring-4 focus:ring-gray-200 dark:focus:ring-slate-800 transition-all active:scale-[0.98]">
                      Ghost Button
                    </button>
                    <button className="outline-none px-5 py-2.5 bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm font-medium rounded-lg shadow-sm hover:bg-red-50 dark:hover:bg-red-950/40 hover:border-red-300 dark:hover:border-red-800/60 focus:ring-4 focus:ring-red-500/20 dark:focus:ring-red-500/20 transition-all active:scale-[0.98] flex items-center gap-2">
                      <Trash2 className="w-4 h-4" /> Destructive
                    </button>
                  </div>
                </div>

                {/* Icon Only Buttons */}
                <div>
                  <h3 className="text-sm font-bold tracking-widest text-gray-400 dark:text-slate-500 uppercase mb-4">Icon Buttons</h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <Tooltip content="Upload settings">
                      <button className="outline-none p-2.5 bg-gray-900 dark:bg-white text-white dark:text-slate-900 rounded-lg shadow-sm hover:bg-gray-800 dark:hover:bg-gray-100 focus:ring-4 focus:ring-gray-900/20 dark:focus:ring-white/20 transition-all active:scale-[0.98]">
                        <UploadCloud className="w-4 h-4" />
                      </button>
                    </Tooltip>
                    <Tooltip content="Edit profile">
                      <button className="outline-none p-2.5 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-300 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-slate-800 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-gray-200 dark:focus:ring-slate-700 transition-all active:scale-[0.98]">
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </Tooltip>
                    <Tooltip content="Delete item">
                      <button className="outline-none p-2.5 bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 rounded-lg shadow-sm hover:bg-red-50 dark:hover:bg-red-950/40 focus:border-red-500 focus:ring-4 focus:ring-red-500/20 transition-all active:scale-[0.98]">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </Tooltip>
                  </div>
                </div>

                {/* Split Button */}
                <div>
                  <h3 className="text-sm font-bold tracking-widest text-gray-400 dark:text-slate-500 uppercase mb-4">Split Button</h3>
                  
                  {/* Split Button Implementation */}
                  <div className="inline-flex rounded-lg shadow-sm outline-none focus-within:ring-4 focus-within:ring-blue-500/20 dark:focus-within:ring-blue-400/20 transition-all relative">
                    {/* Left Main Button */}
                    <button 
                      className="outline-none px-5 py-2.5 bg-blue-600 dark:bg-blue-500 text-white text-sm font-medium rounded-l-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors active:bg-blue-800 dark:active:bg-blue-700 flex items-center gap-2 border-r border-blue-700 dark:border-blue-600"
                    >
                      <splitAction.icon className="w-4 h-4" /> {splitAction.label}
                    </button>
                    
                    {/* Right Dropdown Button */}
                    <div className="relative group/split">
                      <button 
                        className="outline-none px-2.5 py-2.5 h-full bg-blue-600 dark:bg-blue-500 text-white rounded-r-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors active:bg-blue-800 dark:active:bg-blue-700 flex items-center justify-center peer"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      
                      {/* Split Dropdown Menu */}
                      <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg shadow-xl dark:shadow-slate-900/50 py-1.5 opacity-0 invisible group-hover/split:opacity-100 group-hover/split:visible peer-focus:opacity-100 peer-focus:visible focus-within:opacity-100 focus-within:visible transition-all z-20">
                        {splitOptions.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => setSplitAction(opt)}
                            className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-200 transition-colors"
                          >
                            <opt.icon className="w-4 h-4 text-gray-400 dark:text-slate-500" />
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Hint>The main action updates based on your dropdown selection.</Hint>
                </div>

                {/* Label Buttons */}
                <div>
                  <h3 className="text-sm font-bold tracking-widest text-gray-400 dark:text-slate-500 uppercase mb-4">Label Buttons</h3>
                  <div className="flex flex-wrap items-center gap-6">
                    <button className="outline-none text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1">
                      Text Only
                    </button>
                    <button className="outline-none text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-semibold flex items-center gap-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1">
                      <Copy className="w-4 h-4" /> Copy Link
                    </button>
                    <button className="outline-none text-gray-500 dark:text-slate-500 hover:text-gray-900 dark:hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 rounded p-1">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                  <Hint>Used outside main action blocks (e.g., table rows, card footers).</Hint>
                </div>

              </div>
            </div>
          </div>
        );

      case 'context':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 transition-colors">Contextual Feedback</h2>
              <p className="text-sm text-gray-500 dark:text-slate-400 mb-6 transition-colors">Tooltips and context menus triggered by user interactions.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Tooltips */}
                <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm transition-colors space-y-6">
                  <h3 className="text-sm font-bold tracking-widest text-gray-400 dark:text-slate-500 uppercase">Tooltips</h3>
                  
                  <div className="flex items-center gap-8 py-4">
                    <Tooltip content="I point directly to the text!">
                      <span className="text-blue-600 dark:text-blue-400 font-medium underline decoration-dashed underline-offset-4 cursor-help">Hover me</span>
                    </Tooltip>

                    <Tooltip content="Settings & Preferences">
                      <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-slate-400 transition-colors">
                        <Settings className="w-5 h-5" />
                      </button>
                    </Tooltip>
                  </div>
                  <Hint>Tooltips stay pinned to the element using pure CSS.</Hint>
                </div>

                {/* Context Menu Simulation */}
                <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm transition-colors space-y-6">
                  <h3 className="text-sm font-bold tracking-widest text-gray-400 dark:text-slate-500 uppercase">Context Menu</h3>
                  
                  <div className="relative group/menu inline-block">
                    {/* Trigger */}
                    <button className="px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors dark:text-white flex items-center gap-2">
                      Right Click / More <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                    
                    {/* Context Menu Dropdown */}
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg shadow-xl dark:shadow-slate-900/50 py-1.5 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-20">
                      <button className="w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-200 transition-colors">
                        <Edit2 className="w-4 h-4 text-gray-400 dark:text-slate-500" /> Edit Details
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-200 transition-colors">
                        <Copy className="w-4 h-4 text-gray-400 dark:text-slate-500" /> Duplicate
                      </button>
                      <div className="my-1 border-t border-gray-100 dark:border-slate-800"></div>
                      <button disabled className="w-full text-left px-4 py-2 text-sm flex items-center gap-2 opacity-50 cursor-not-allowed text-gray-700 dark:text-slate-200">
                        <ShieldAlert className="w-4 h-4 text-gray-400 dark:text-slate-500" /> Freeze Account
                      </button>
                      <div className="my-1 border-t border-gray-100 dark:border-slate-800"></div>
                      <button className="w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" /> Delete Permanently
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        );

      case 'profiles':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 transition-colors">User Profiles</h2>
              <p className="text-sm text-gray-500 dark:text-slate-400 mb-6 transition-colors">Avatars and user info blocks for data display.</p>
              
              <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm transition-colors max-w-md space-y-8">
                
                <div>
                  <h3 className="text-sm font-bold tracking-widest text-gray-400 dark:text-slate-500 uppercase mb-4">Static Displays</h3>
                  <div className="space-y-4 border border-gray-100 dark:border-slate-800 p-4 rounded-lg bg-gray-50/50 dark:bg-slate-900/50">
                    <UserProfile name="Alexander Wolfe" initials="AW" clickable={false} />
                    <div className="w-full h-px bg-gray-200 dark:bg-slate-800"></div>
                    <UserProfile name="Sarah Jenkins" subtitle="Lead Product Designer" initials="SJ" clickable={false} />
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold tracking-widest text-gray-400 dark:text-slate-500 uppercase mb-4">Interactive Lists</h3>
                  <div className="space-y-1">
                    <UserProfile name="Michael Chang" subtitle="Admin Access" initials="MC" clickable={true} />
                    <UserProfile name="Emma Robertson" subtitle="Guest Viewer" initials="ER" clickable={true} />
                  </div>
                  <Hint>Clickable variants include hover backgrounds and focus rings.</Hint>
                </div>

              </div>
            </div>
          </div>
        );

      case 'overlays':
        return (
          <div className="space-y-6 relative">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 transition-colors">Modals & Drawers</h2>
              <p className="text-sm text-gray-500 dark:text-slate-400 mb-6 transition-colors">Disruptive and non-disruptive overlay components.</p>
              
              <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm transition-colors">
                <div className="flex flex-wrap gap-4">
                  <button onClick={() => setIsSmallModalOpen(true)} className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-lg shadow-sm hover:bg-gray-800 dark:hover:bg-gray-100">
                    Open Small Modal
                  </button>
                  <button onClick={() => setIsLargeModalOpen(true)} className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-blue-700 dark:hover:bg-blue-600">
                    Open Large Modal
                  </button>
                  <button onClick={() => setIsDrawerOpen(true)} className="px-4 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-300 text-sm font-medium rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-slate-800">
                    Open Side Drawer
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };


  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <style>{customScrollbarStyles}</style>
      <div className="flex h-screen overflow-hidden bg-[#f8fafc] dark:bg-slate-950 text-gray-900 dark:text-slate-50 font-sans selection:bg-blue-100 dark:selection:bg-blue-900/40 selection:text-blue-900 dark:selection:text-blue-100 transition-colors duration-300">
        
        {/* COLLAPSIBLE SIDEBAR */}
        <aside className={`border-r border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col transition-all duration-300 z-10 hidden md:flex ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
          <div className="h-16 flex items-center justify-between px-5 border-b border-gray-200 dark:border-slate-800 transition-colors">
            <div className={`flex items-center gap-3 overflow-hidden transition-all duration-300 ${isSidebarCollapsed ? 'w-8 opacity-0 pointer-events-none' : 'w-full opacity-100'}`}>
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-inner shrink-0">
                <LayoutDashboard className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight whitespace-nowrap">Form UI</span>
            </div>
            
            {/* Collapse Toggle */}
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:text-slate-500 dark:hover:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors absolute right-4"
            >
              {isSidebarCollapsed ? <PanelRightOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1.5 custom-scrollbar overflow-x-hidden">
            {!isSidebarCollapsed && (
              <div className="px-4 mb-2 text-xs font-bold tracking-widest text-gray-400 dark:text-slate-500 uppercase transition-colors whitespace-nowrap">
                Components
              </div>
            )}
            
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`w-full outline-none flex items-center gap-3 rounded-lg text-sm font-medium transition-all group focus-visible:ring-2 focus-visible:ring-blue-500
                    ${isSidebarCollapsed ? 'p-3 justify-center' : 'px-4 py-2.5'}
                    ${isActive 
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 shadow-sm' 
                      : 'text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-slate-200'
                    }
                  `}
                  title={isSidebarCollapsed ? item.label : undefined}
                >
                  <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-slate-500 group-hover:text-gray-600 dark:group-hover:text-slate-400'} transition-colors`} />
                  {!isSidebarCollapsed && <span className="whitespace-nowrap truncate">{item.label}</span>}
                </button>
              );
            })}
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-slate-800 transition-colors">
            {isSidebarCollapsed ? (
               <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="w-full flex justify-center p-2 rounded-lg text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-label="Toggle Dark Mode"
               >
                 {isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
               </button>
            ) : (
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm font-medium text-gray-500 dark:text-slate-400 transition-colors">Theme</span>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="relative inline-flex h-7 w-14 items-center rounded-full bg-gray-200 dark:bg-slate-800 transition-colors duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20"
                >
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full bg-white dark:bg-slate-950 shadow-sm transition-transform duration-300 ease-in-out ${
                      isDarkMode ? 'translate-x-8' : 'translate-x-1'
                    }`}
                  >
                    {isDarkMode ? <Moon className="h-3 w-3 text-blue-400" strokeWidth={2.5} /> : <Sun className="h-3 w-3 text-amber-500" strokeWidth={2.5} />}
                  </span>
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 h-full overflow-y-auto custom-scrollbar relative">
          <div className="p-8 md:p-12 max-w-6xl mx-auto pb-32">
            
            {/* Mobile Header (Shows only on small screens) */}
            <div className="md:hidden flex items-center justify-between mb-8 pb-6 border-b border-gray-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-inner">
                  <LayoutDashboard className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-lg tracking-tight">Form UI</span>
              </div>
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="outline-none p-2 bg-white dark:bg-slate-800 rounded-full border border-gray-200 dark:border-slate-700 shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500">
                {isDarkMode ? <Moon className="h-4 w-4 text-blue-400" /> : <Sun className="h-4 w-4 text-amber-500" />}
              </button>
            </div>

            {renderContent()}

          </div>
        </main>
        
        {/* --- PORTALED OVERLAYS (Rendered on top of everything) --- */}
        
        {/* Backdrop for all overlays */}
        {(isSmallModalOpen || isLargeModalOpen || isDrawerOpen) && (
          <div 
            className="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm z-40 transition-opacity"
            onClick={() => { setIsSmallModalOpen(false); setIsLargeModalOpen(false); setIsDrawerOpen(false); }}
          ></div>
        )}

        {/* Small Modal */}
        {isSmallModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border border-gray-200 dark:border-slate-800 pointer-events-auto transform scale-100 transition-transform">
              <div className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Delete Project?</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400">Are you sure you want to delete this project? This action cannot be undone.</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-slate-900/50 border-t border-gray-100 dark:border-slate-800 flex items-center justify-end gap-3">
                <button onClick={() => setIsSmallModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors">Cancel</button>
                <button onClick={() => setIsSmallModalOpen(false)} className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-colors">Delete</button>
              </div>
            </div>
          </div>
        )}

        {/* Large Modal */}
        {isLargeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden border border-gray-200 dark:border-slate-800 pointer-events-auto">
              <div className="p-6 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Account Settings</h3>
                  <p className="text-sm text-gray-500 dark:text-slate-400">Manage your profile and preferences.</p>
                </div>
                <button onClick={() => setIsLargeModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-slate-300 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Inset gray background for heavy content */}
              <div className="p-6 bg-[#f8fafc] dark:bg-slate-950 flex-1 overflow-y-auto">
                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-6 rounded-xl shadow-sm space-y-4">
                  <Label>Email Address</Label>
                  <input type="email" defaultValue="user@example.com" className="w-full outline-none px-4 py-2.5 bg-gray-50 dark:bg-slate-900/50 border border-gray-300 dark:border-slate-700 rounded-lg text-sm text-gray-500 dark:text-slate-500 cursor-not-allowed" disabled />
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-slate-800"></div>
                  
                  <Label>Language Preference</Label>
                  <select className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg text-sm shadow-sm dark:text-white outline-none">
                    <option>English (US)</option>
                    <option>Dutch (NL)</option>
                  </select>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-end gap-3">
                <button onClick={() => setIsLargeModalOpen(false)} className="px-5 py-2.5 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-300 text-sm font-medium rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-slate-800">Close</button>
                <button onClick={() => setIsLargeModalOpen(false)} className="px-5 py-2.5 bg-blue-600 dark:bg-blue-500 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-blue-700 dark:hover:bg-blue-600">Save Changes</button>
              </div>
            </div>
          </div>
        )}

        {/* Side Drawer */}
        <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white dark:bg-slate-900 shadow-2xl border-l border-gray-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out flex flex-col ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="h-16 px-6 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="font-bold text-gray-900 dark:text-white">Notifications</h3>
            <button onClick={() => setIsDrawerOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-slate-300 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#f8fafc] dark:bg-slate-950">
            {/* Example Notification Items */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">New feature released</p>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">You can now split buttons and create complex dropdowns.</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 font-medium">2 hours ago</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm flex gap-4 items-start opacity-75">
              <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">Project exported</p>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Your file 'Design_System.pdf' is ready for download.</p>
                <p className="text-xs text-gray-400 dark:text-slate-500 mt-2 font-medium">Yesterday</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}