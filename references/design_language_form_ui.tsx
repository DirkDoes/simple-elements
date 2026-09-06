import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Check, 
  AlertCircle,
  ChevronDown,
  UploadCloud,
  Sun,
  Moon,
  LayoutDashboard,
  Users,
  Settings,
  Zap,
  Package,
  Activity,
  Database,
  Type,
  ToggleLeft,
  List,
  MousePointer2,
  X,
  ShieldAlert,
  Crown,
  FileText,
  Trash2,
  FileUp
} from 'lucide-react';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activePage, setActivePage] = useState('inputs');

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

  // Country Codes Data
  const countryCodes = [
    { code: '+1', country: 'United States', flag: '🇺🇸' },
    { code: '+1', country: 'Canada', flag: '🇨🇦' },
    { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
    { code: '+32', country: 'Belgium', flag: '🇧🇪' },
    { code: '+33', country: 'France', flag: '🇫🇷' },
    { code: '+34', country: 'Spain', flag: '🇪🇸' },
    { code: '+39', country: 'Italy', flag: '🇮🇹' },
    { code: '+41', country: 'Switzerland', flag: '🇨🇭' },
    { code: '+43', country: 'Austria', flag: '🇦🇹' },
    { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
    { code: '+45', country: 'Denmark', flag: '🇩🇰' },
    { code: '+46', country: 'Sweden', flag: '🇸🇪' },
    { code: '+47', country: 'Norway', flag: '🇳🇴' },
    { code: '+49', country: 'Germany', flag: '🇩🇪' },
    { code: '+55', country: 'Brazil', flag: '🇧🇷' },
    { code: '+61', country: 'Australia', flag: '🇦🇺' },
    { code: '+81', country: 'Japan', flag: '🇯🇵' },
    { code: '+86', country: 'China', flag: '🇨🇳' },
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+358', country: 'Finland', flag: '🇫🇮' }
  ];

  // Data Options (Shared across both types)
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
    { id: 'buttons', label: 'Buttons & Actions', icon: MousePointer2 },
    { id: 'uploads', label: 'File Uploads', icon: FileUp },
  ];

  // Reusable label component for consistency
  const Label = ({ children, required, htmlFor }) => (
    <label htmlFor={htmlFor} className="block text-sm font-semibold text-gray-800 dark:text-slate-200 mb-1.5 transition-colors">
      {children}
      {required && <span className="text-red-500 dark:text-red-400 ml-1">*</span>}
    </label>
  );

  // Reusable hint text
  const Hint = ({ children, error }) => (
    <p className={`text-xs mt-1.5 transition-colors ${error ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-slate-400'}`}>
      {children}
    </p>
  );

  // Custom Scrollbar & Sleek Resize Handle CSS
  const customScrollbarStyles = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: #cbd5e1;
      border-radius: 6px;
      border: 3px solid transparent;
      background-clip: content-box;
    }
    .dark .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: #475569;
    }
    .custom-scrollbar::-webkit-scrollbar-corner {
      background: transparent;
    }
    .custom-scrollbar::-webkit-resizer {
      background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 12L12 10M6 12L12 6M2 12L12 2' stroke='%2394A3B8' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: bottom 2px right 2px;
    }
    .dark .custom-scrollbar::-webkit-resizer {
      background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 12L12 10M6 12L12 6M2 12L12 2' stroke='%23475569' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
    }
  `;

  // Reusable Phone Input Component
  const PhoneInput = ({ label }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(countryCodes[2]); // Default NL
    const dropdownRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
          setSearchTerm('');
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredCountries = countryCodes.filter(c => 
      c.country.toLowerCase().includes(searchTerm.toLowerCase()) || 
      c.code.includes(searchTerm)
    );

    return (
      <div ref={dropdownRef}>
        <Label>{label}</Label>
        <div className="flex relative rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm transition-all focus-within:border-blue-500 dark:focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-500/10 dark:focus-within:ring-blue-400/10">
          
          {/* Prefix Trigger Button */}
          <button 
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-l-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors group outline-none focus-visible:bg-gray-50 dark:focus-visible:bg-slate-800"
          >
            <span className="text-base leading-none">{selectedCountry.flag}</span>
            <span className="text-sm font-medium text-gray-700 dark:text-slate-300 w-8 text-left">{selectedCountry.code}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-gray-400 dark:text-slate-500 transition-transform duration-200 group-hover:text-gray-600 dark:group-hover:text-slate-300 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Divider */}
          <div className="w-px bg-gray-200 dark:bg-slate-700 my-2"></div>

          {/* Phone Input */}
          <input 
            type="tel" 
            placeholder="6 12345678" 
            className="w-full flex-1 outline-none px-3 py-2.5 bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500" 
          />

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 z-20 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg shadow-xl dark:shadow-slate-900/50 overflow-hidden flex flex-col transition-colors">
              <div className="p-2 border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 dark:text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search country or code..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full outline-none pl-8 pr-3 py-1.5 bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-700 rounded-md text-sm focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all dark:text-white"
                  />
                </div>
              </div>
              <div className="max-h-60 overflow-y-auto custom-scrollbar py-1.5">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country, index) => (
                    <button
                      key={`${country.code}-${index}`}
                      onClick={() => {
                        setSelectedCountry(country);
                        setIsOpen(false);
                        setSearchTerm('');
                      }}
                      className={`w-full outline-none px-3 py-2.5 flex items-center gap-3 transition-colors text-left hover:bg-gray-50 dark:hover:bg-slate-800/80 focus:bg-gray-50 dark:focus:bg-slate-800/80
                        ${selectedCountry.country === country.country ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''}
                      `}
                    >
                      <span className="text-base leading-none">{country.flag}</span>
                      <span className={`text-sm truncate flex-1 transition-colors ${selectedCountry.country === country.country ? 'text-blue-700 dark:text-blue-300 font-medium' : 'text-gray-900 dark:text-slate-200'}`}>
                        {country.country}
                      </span>
                      <span className={`text-xs transition-colors ${selectedCountry.country === country.country ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-slate-400'}`}>
                        {country.code}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-center text-gray-500 dark:text-slate-400 transition-colors">
                    No results found.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Reusable Custom Dropdown (Single Select)
  const CustomDropdown = ({ label, options, selectedOption, setSelectedOption, disabled, placeholder = "Choose an option...", searchable = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);

    // Click outside handler
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
          setSearchTerm('');
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredOptions = options.filter(opt => 
      !searchable || 
      opt.label.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (opt.description && opt.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
      <div ref={dropdownRef}>
        <Label>{label}</Label>
        <div className="relative">
          <button 
            type="button"
            disabled={disabled}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            className={`w-full outline-none px-4 py-2.5 border rounded-lg text-sm shadow-sm transition-all text-left flex items-center justify-between group
              ${disabled 
                ? 'bg-gray-50 dark:bg-slate-900/50 border-gray-200 dark:border-slate-800 text-gray-500 dark:text-slate-500 cursor-not-allowed'
                : 'bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10 cursor-pointer'
              }
            `}
          >
            {selectedOption ? (
              <div className={`flex items-center gap-2.5 transition-colors truncate ${disabled ? 'text-gray-500 dark:text-slate-500' : 'text-gray-900 dark:text-white'}`}>
                {selectedOption.icon && <selectedOption.icon className={`w-4 h-4 shrink-0 ${disabled ? 'text-gray-400 dark:text-slate-600' : 'text-blue-600 dark:text-blue-400'}`} />}
                <span className="font-medium truncate">{selectedOption.label}</span>
              </div>
            ) : (
              <span className={`transition-colors truncate ${disabled ? 'text-gray-400 dark:text-slate-600' : 'text-gray-400 dark:text-slate-500'}`}>
                {placeholder}
              </span>
            )}
            <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-200 
              ${disabled ? 'text-gray-300 dark:text-slate-700' : 'text-gray-400 dark:text-slate-500 group-hover:text-gray-600 dark:group-hover:text-slate-300'}
              ${isOpen ? 'rotate-180' : ''}
            `} />
          </button>

          {isOpen && !disabled && (
            <div className="absolute z-20 w-full mt-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg shadow-xl dark:shadow-slate-900/50 overflow-hidden flex flex-col transition-colors">
              {searchable && (
                <div className="p-2 border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 dark:text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search options..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full outline-none pl-8 pr-3 py-1.5 bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-700 rounded-md text-sm focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all dark:text-white"
                    />
                  </div>
                </div>
              )}
              
              <div className="max-h-60 overflow-y-auto custom-scrollbar py-1.5">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <button
                      key={option.id}
                      disabled={option.disabled}
                      onClick={() => {
                        if (!option.disabled) {
                          setSelectedOption(option);
                          setIsOpen(false);
                          setSearchTerm('');
                        }
                      }}
                      className={`w-full outline-none px-4 py-3 flex gap-3 transition-colors text-left
                        ${option.description ? 'items-start' : 'items-center'}
                        ${option.disabled 
                          ? 'opacity-50 cursor-not-allowed bg-gray-50/50 dark:bg-slate-800/30' 
                          : 'hover:bg-gray-50 dark:hover:bg-slate-800/80 cursor-pointer focus:bg-gray-50 dark:focus:bg-slate-800/80'
                        }
                        ${selectedOption?.id === option.id && !option.disabled ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''}
                      `}
                    >
                      {option.icon && (
                        <div className={`shrink-0 transition-colors
                          ${selectedOption?.id === option.id && !option.disabled 
                            ? 'text-blue-600 dark:text-blue-400' 
                            : 'text-gray-400 dark:text-slate-500'
                          }
                        `}>
                          <option.icon className="w-5 h-5" strokeWidth={1.5} />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-semibold truncate transition-colors
                          ${selectedOption?.id === option.id && !option.disabled 
                            ? 'text-blue-700 dark:text-blue-300' 
                            : 'text-gray-900 dark:text-slate-200'
                          }
                        `}>
                          {option.label}
                        </div>
                        {option.description && (
                          <div className={`text-xs mt-0.5 transition-colors leading-relaxed
                            ${selectedOption?.id === option.id && !option.disabled 
                              ? 'text-blue-600/80 dark:text-blue-400/80' 
                              : 'text-gray-500 dark:text-slate-400'
                            }
                          `}>
                            {option.description}
                          </div>
                        )}
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-center text-gray-500 dark:text-slate-400 transition-colors">
                    No options found.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Reusable Multi-Select Dropdown Component
  const MultiSelectDropdown = ({ label, options, selectedOptions, setSelectedOptions, disabled, placeholder = "Select multiple...", searchable = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);

    // Click outside handler
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
          setSearchTerm('');
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Filter out options that are already selected AND match search
    const availableOptions = options.filter(
      opt => !selectedOptions.find(selected => selected.id === opt.id)
    ).filter(opt => 
      !searchable || 
      opt.label.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (opt.description && opt.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleRemove = (e, optionToRemove) => {
      e.stopPropagation();
      if (optionToRemove.locked) return;
      setSelectedOptions(selectedOptions.filter(opt => opt.id !== optionToRemove.id));
    };

    const handleAdd = (option) => {
      if (!option.disabled) {
        setSelectedOptions([...selectedOptions, option]);
        setSearchTerm('');
        // We do not close isOpen here to allow rapid multi-selecting
      }
    };

    return (
      <div ref={dropdownRef}>
        <Label>{label}</Label>
        <div className="relative">
          <div 
            onClick={() => !disabled && setIsOpen(!isOpen)}
            tabIndex={disabled ? -1 : 0}
            className={`w-full outline-none px-2.5 py-2 border rounded-lg shadow-sm transition-all text-left flex items-center min-h-[46px]
              ${disabled 
                ? 'bg-gray-50 dark:bg-slate-900/50 border-gray-200 dark:border-slate-800 text-gray-500 dark:text-slate-500 cursor-not-allowed'
                : 'bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-700 focus-within:border-blue-500 dark:focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-500/10 dark:focus-within:ring-blue-400/10 cursor-pointer group hover:border-gray-400 dark:hover:border-slate-500'
              }
            `}
          >
            <div className="flex-1 flex flex-wrap gap-2 items-center overflow-hidden">
              {selectedOptions.length > 0 ? (
                selectedOptions.map(opt => (
                  <span 
                    key={opt.id} 
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors border
                      ${opt.locked || disabled
                        ? 'bg-gray-100 dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300' 
                        : 'bg-blue-50 dark:bg-blue-900/40 border-blue-200 dark:border-blue-800/60 text-blue-800 dark:text-blue-300'
                      }
                    `}
                  >
                    {opt.icon && <opt.icon className="w-3.5 h-3.5 shrink-0 opacity-70" />}
                    <span>{opt.label}</span>
                    {opt.locked || disabled ? (
                      <Lock className="w-3.5 h-3.5 ml-0.5 text-gray-400 dark:text-slate-500" strokeWidth={2.5} />
                    ) : (
                      <span 
                        onClick={(e) => handleRemove(e, opt)}
                        className="ml-0.5 hover:bg-blue-200 dark:hover:bg-blue-800/80 rounded p-0.5 transition-colors cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" strokeWidth={2.5} />
                      </span>
                    )}
                  </span>
                ))
              ) : (
                <span className={`px-1.5 transition-colors text-sm truncate ${disabled ? 'text-gray-400 dark:text-slate-600' : 'text-gray-400 dark:text-slate-500'}`}>
                  {placeholder}
                </span>
              )}
            </div>
            
            <div className="pl-2 shrink-0 border-l border-gray-200 dark:border-slate-700 ml-2 h-5 flex items-center transition-colors">
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 
                ${disabled ? 'text-gray-300 dark:text-slate-700' : 'text-gray-400 dark:text-slate-500 group-hover:text-gray-600 dark:group-hover:text-slate-300'}
                ${isOpen ? 'rotate-180' : ''}
              `} />
            </div>
          </div>

          {/* Dropdown Menu */}
          {isOpen && !disabled && (
            <div className="absolute z-20 w-full mt-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg shadow-xl dark:shadow-slate-900/50 overflow-hidden flex flex-col transition-colors">
              
              {searchable && (
                <div className="p-2 border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 dark:text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search options..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full outline-none pl-8 pr-3 py-1.5 bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-700 rounded-md text-sm focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all dark:text-white"
                    />
                  </div>
                </div>
              )}

              <div className="max-h-60 overflow-y-auto custom-scrollbar py-1.5">
                {availableOptions.length > 0 ? (
                  availableOptions.map((option) => (
                    <button
                      key={option.id}
                      disabled={option.disabled}
                      onClick={() => handleAdd(option)}
                      className={`w-full outline-none px-4 py-3 flex gap-3 transition-colors text-left
                        ${option.description ? 'items-start' : 'items-center'}
                        ${option.disabled 
                          ? 'opacity-50 cursor-not-allowed bg-gray-50/50 dark:bg-slate-800/30' 
                          : 'hover:bg-gray-50 dark:hover:bg-slate-800/80 cursor-pointer focus:bg-gray-50 dark:focus:bg-slate-800/80'
                        }
                      `}
                    >
                      {option.icon && (
                        <div className="shrink-0 text-gray-400 dark:text-slate-500 transition-colors">
                          <option.icon className="w-5 h-5" strokeWidth={1.5} />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold truncate text-gray-900 dark:text-slate-200 transition-colors">
                          {option.label}
                        </div>
                        {option.description && (
                          <div className="text-xs mt-0.5 text-gray-500 dark:text-slate-400 transition-colors leading-relaxed">
                            {option.description}
                          </div>
                        )}
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-center text-gray-500 dark:text-slate-400 transition-colors">
                    No options available.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // File Upload Area
  const FileUploadZone = () => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = () => {
      setIsDragging(false);
    };

    const handleDrop = (e) => {
      e.preventDefault();
      setIsDragging(false);
      // Handle files here: e.dataTransfer.files
    };

    return (
      <div className="max-w-md transition-colors">
        <Label>Dropzone</Label>
        <div 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`mt-2 flex justify-center rounded-xl border-2 border-dashed px-6 py-10 transition-colors cursor-pointer group outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20
            ${isDragging 
              ? 'border-blue-500 bg-blue-50/80 dark:bg-blue-900/20 dark:border-blue-400' 
              : 'border-gray-300 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-900/50 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/10'
            }
          `}
        >
          <div className="text-center pointer-events-none">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110
              ${isDragging ? 'bg-blue-100 text-blue-700 dark:bg-blue-800/50 dark:text-blue-300' : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'}
            `}>
              <UploadCloud className="w-6 h-6" />
            </div>
            <div className="mt-4 flex text-sm leading-6 text-gray-600 dark:text-slate-400 justify-center transition-colors">
              <div className="relative rounded-md font-semibold text-blue-600 dark:text-blue-400">
                <span>{isDragging ? 'Drop file here' : 'Upload a file'}</span>
                <input ref={fileInputRef} type="file" className="sr-only" />
              </div>
              {!isDragging && <p className="pl-1">or drag and drop</p>}
            </div>
            <p className="text-xs leading-5 text-gray-500 dark:text-slate-500 mt-1 transition-colors">PNG, JPG, PDF up to 10MB</p>
          </div>
        </div>
      </div>
    );
  };

  // File Row with Folded Corner
  const FileRow = ({ filename, filesize, action = 'none', clickable = false }) => {
    const RowWrapper = clickable ? 'button' : 'div';

    const handleActionClick = (e) => {
      e.stopPropagation();
    };

    return (
      <RowWrapper 
        type={clickable ? "button" : undefined}
        className={`relative group/row w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm transition-all text-left outline-none
          ${clickable 
            ? 'cursor-pointer hover:border-blue-300 dark:hover:border-slate-500 hover:shadow-md' 
            : ''
          }
        `}
      >
        {/* Custom Focus Ring for the Folded Corner (Only shows on keyboard focus) */}
        {clickable && (
          <div className="absolute inset-[-4px] pointer-events-none opacity-0 group-focus-visible/row:opacity-100 transition-opacity z-0 rounded-[11px] overflow-hidden">
             <svg className="w-full h-full" preserveAspectRatio="none">
                 <rect width="100%" height="100%" rx="11" fill="none" className="stroke-blue-500/30" strokeWidth="8" />
             </svg>
             {/* Mask to cut out the top right of the standard focus ring */}
             <div className="absolute top-0 right-0 w-8 h-8 bg-[#f8fafc] dark:bg-slate-950"></div>
             {/* Diagonal line to complete the focus ring perfectly around the fold */}
             <svg className="absolute top-0 right-0 w-8 h-8" overflow="visible">
                 <line x1="8" y1="0" x2="32" y2="24" className="stroke-blue-500/30" strokeWidth="8" />
             </svg>
          </div>
        )}

        {/* Folded Corner Dog-ear on the entire row */}
        <div className="absolute -top-[1px] -right-[1px] w-6 h-6 z-10 pointer-events-none">
          <svg viewBox="0 0 24 24" className="w-full h-full" overflow="visible">
            {/* Mask to erase the parent's normal rounded corner */}
            <rect x="0" y="0" width="24" height="24" className="fill-white dark:fill-slate-900 transition-colors" />
            {/* Flap */}
            <polygon 
              points="0,0 0,24 24,24" 
              className={`fill-gray-50 dark:fill-slate-800 drop-shadow-sm transition-colors
                ${clickable 
                  ? 'stroke-gray-200 dark:stroke-slate-700 group-hover/row:stroke-blue-300 dark:group-hover/row:stroke-slate-500' 
                  : 'stroke-gray-200 dark:stroke-slate-700'
                }
              `}
              strokeWidth="1" 
              strokeLinejoin="round" 
            />
          </svg>
        </div>

        <div className="flex items-center gap-3 overflow-hidden relative z-10">
          <div className="w-10 h-10 shrink-0 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex items-center justify-center text-gray-400 dark:text-slate-500 transition-colors">
            <FileText className="w-5 h-5 opacity-80" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col min-w-0 pr-4">
            <span className="text-sm font-semibold text-gray-900 dark:text-slate-200 truncate">{filename}</span>
            <span className="text-xs text-gray-500 dark:text-slate-400">{filesize}</span>
          </div>
        </div>
        
        {/* Right Action Button (Pushed left to avoid the fold) */}
        {action !== 'none' && (
          <div className="relative z-20 shrink-0 pr-6 pl-2">
            <button 
              onClick={handleActionClick}
              type="button"
              className={`p-2 rounded-md transition-colors focus:outline-none focus:ring-2
                ${action === 'trash' 
                  ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 focus:ring-red-500/20' 
                  : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-slate-800 dark:hover:text-slate-300 focus:ring-gray-200'
                }
              `}
            >
              {action === 'trash' ? <Trash2 className="w-4 h-4" /> : <X className="w-4 h-4" />}
            </button>
          </div>
        )}
      </RowWrapper>
    );
  };


  // --- PAGE RENDERING LOGIC ---
  const renderContent = () => {
    switch (activePage) {
      case 'inputs':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 transition-colors">Text Inputs</h2>
              <p className="text-sm text-gray-500 dark:text-slate-400 mb-6 transition-colors">Standard and customized input fields for various data formats.</p>
              
              <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm transition-colors">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 max-w-4xl">
                  
                  {/* Standard Input */}
                  <div>
                    <Label>Standard Input</Label>
                    <input 
                      type="text" 
                      placeholder="Enter some text..." 
                      className="w-full outline-none px-4 py-2.5 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg text-sm shadow-sm placeholder-gray-400 dark:placeholder-slate-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10 transition-all dark:text-white" 
                    />
                  </div>

                  {/* Input with Icon Left */}
                  <div>
                    <Label>Email Address</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-gray-400 dark:text-slate-500 transition-colors" />
                      </div>
                      <input 
                        type="email" 
                        placeholder="you@example.com" 
                        className="w-full outline-none pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg text-sm shadow-sm placeholder-gray-400 dark:placeholder-slate-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10 transition-all dark:text-white" 
                      />
                    </div>
                  </div>

                  {/* Input with Action Right */}
                  <div>
                    <Label>Password</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-gray-400 dark:text-slate-500 transition-colors" />
                      </div>
                      <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        className="w-full outline-none pl-10 pr-12 py-2.5 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg text-sm shadow-sm placeholder-gray-400 dark:placeholder-slate-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10 transition-all dark:text-white" 
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)} 
                        className="absolute outline-none inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors focus-visible:text-blue-500"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Custom: Phone Number */}
                  <PhoneInput label="Phone Number" />

                  {/* Error State */}
                  <div>
                    <Label>Username (Error)</Label>
                    <div className="relative">
                      <input 
                        type="text" 
                        defaultValue="invalid_user_!" 
                        className="w-full outline-none px-4 py-2.5 bg-red-50/30 dark:bg-red-950/20 border border-red-300 dark:border-red-900/60 text-red-900 dark:text-red-400 rounded-lg text-sm shadow-sm placeholder-red-300 focus:border-red-500 dark:focus:border-red-500 focus:ring-4 focus:ring-red-500/10 dark:focus:ring-red-500/10 transition-all" 
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      </div>
                    </div>
                    <Hint error>Special characters are not allowed.</Hint>
                  </div>

                  {/* Disabled State */}
                  <div>
                    <Label>Disabled Input</Label>
                    <input 
                      type="text" 
                      disabled 
                      value="Cannot edit this" 
                      className="w-full outline-none px-4 py-2.5 bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 text-gray-500 dark:text-slate-500 rounded-lg text-sm shadow-sm cursor-not-allowed transition-colors" 
                    />
                  </div>

                  {/* Textareas */}
                  <div className="md:col-span-2 space-y-10">
                    <div>
                      <Label>Textarea (Fixed Height)</Label>
                      <textarea 
                        rows="3" 
                        placeholder="This text area cannot be resized..." 
                        className="custom-scrollbar resize-none w-full outline-none px-4 py-3 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg text-sm shadow-sm placeholder-gray-400 dark:placeholder-slate-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10 transition-colors dark:text-white"
                      ></textarea>
                    </div>

                    <div>
                      <Label>Textarea (Vertical Resizing)</Label>
                      <textarea 
                        rows="4" 
                        placeholder="Grab the bottom right corner to resize..." 
                        className="custom-scrollbar resize-y min-h-[44px] w-full outline-none px-4 py-3 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg text-sm shadow-sm placeholder-gray-400 dark:placeholder-slate-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10 transition-colors dark:text-white"
                      ></textarea>
                      <Hint>This textarea restricts resizing smaller than a standard input field.</Hint>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'controls':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 transition-colors">Selection Controls</h2>
              <p className="text-sm text-gray-500 dark:text-slate-400 mb-6 transition-colors">Checkboxes, radio buttons, toggles, and range sliders.</p>
              
              <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm transition-colors">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  <div className="space-y-4">
                    <Label>Checkboxes</Label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                          <input type="checkbox" className="peer sr-only" defaultChecked />
                          <div className="w-5 h-5 border-2 border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 peer-checked:bg-blue-600 peer-checked:border-blue-600 dark:peer-checked:bg-blue-500 dark:peer-checked:border-blue-500 transition-colors group-hover:border-blue-400 dark:group-hover:border-blue-400 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500/50 peer-focus-visible:ring-offset-2 dark:peer-focus-visible:ring-offset-slate-950"></div>
                          <Check className="absolute w-3.5 h-3.5 text-white dark:text-slate-900 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" strokeWidth={3} />
                        </div>
                        <span className="text-sm text-gray-700 dark:text-slate-300 select-none transition-colors">Selected option</span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                          <input type="checkbox" className="peer sr-only" />
                          <div className="w-5 h-5 border-2 border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 peer-checked:bg-blue-600 peer-checked:border-blue-600 dark:peer-checked:bg-blue-500 dark:peer-checked:border-blue-500 transition-colors group-hover:border-blue-400 dark:group-hover:border-blue-400 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500/50 peer-focus-visible:ring-offset-2 dark:peer-focus-visible:ring-offset-slate-950"></div>
                          <Check className="absolute w-3.5 h-3.5 text-white dark:text-slate-900 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" strokeWidth={3} />
                        </div>
                        <span className="text-sm text-gray-700 dark:text-slate-300 select-none transition-colors">Unselected option</span>
                      </label>

                      <label className="flex items-center gap-3 opacity-50 cursor-not-allowed">
                        <div className="relative flex items-center justify-center">
                          <input type="checkbox" className="peer sr-only" disabled defaultChecked />
                          <div className="w-5 h-5 border-2 border-gray-300 dark:border-slate-700 rounded bg-gray-200 dark:bg-slate-800 peer-checked:bg-gray-400 dark:peer-checked:bg-slate-600 peer-checked:border-gray-400 dark:peer-checked:border-slate-600"></div>
                          <Check className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" strokeWidth={3} />
                        </div>
                        <span className="text-sm text-gray-700 dark:text-slate-300 select-none transition-colors">Disabled selected</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Radio Buttons</Label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                          <input type="radio" name="radio-group" className="peer sr-only" defaultChecked />
                          <div className="w-5 h-5 border-2 border-gray-300 dark:border-slate-600 rounded-full bg-white dark:bg-slate-900 peer-checked:border-blue-600 dark:peer-checked:border-blue-500 transition-colors group-hover:border-blue-400 dark:group-hover:border-blue-400 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500/50 peer-focus-visible:ring-offset-2 dark:peer-focus-visible:ring-offset-slate-950"></div>
                          <div className="absolute w-2.5 h-2.5 bg-blue-600 dark:bg-blue-500 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none transform scale-50 peer-checked:scale-100 duration-200"></div>
                        </div>
                        <span className="text-sm text-gray-700 dark:text-slate-300 select-none transition-colors">Option One</span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                          <input type="radio" name="radio-group" className="peer sr-only" />
                          <div className="w-5 h-5 border-2 border-gray-300 dark:border-slate-600 rounded-full bg-white dark:bg-slate-900 peer-checked:border-blue-600 dark:peer-checked:border-blue-500 transition-colors group-hover:border-blue-400 dark:group-hover:border-blue-400 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500/50 peer-focus-visible:ring-offset-2 dark:peer-focus-visible:ring-offset-slate-950"></div>
                          <div className="absolute w-2.5 h-2.5 bg-blue-600 dark:bg-blue-500 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none transform scale-50 peer-checked:scale-100 duration-200"></div>
                        </div>
                        <span className="text-sm text-gray-700 dark:text-slate-300 select-none transition-colors">Option Two</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Form Switches</Label>
                    <div className="space-y-5">
                      <label className="flex items-center justify-between cursor-pointer group">
                        <span className="text-sm text-gray-700 dark:text-slate-300 select-none transition-colors pr-4">Enable Notifications</span>
                        <div className="relative shrink-0">
                          <input type="checkbox" className="peer sr-only" defaultChecked />
                          <div className="block w-11 h-6 bg-gray-200 dark:bg-slate-700 rounded-full peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500 transition-colors duration-300 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500/50 peer-focus-visible:ring-offset-2 dark:peer-focus-visible:ring-offset-slate-950"></div>
                          <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 peer-checked:translate-x-5 shadow-sm"></div>
                        </div>
                      </label>

                      <label className="flex items-center justify-between cursor-pointer group">
                        <span className="text-sm text-gray-700 dark:text-slate-300 select-none transition-colors pr-4">Subscribe to newsletter</span>
                        <div className="relative shrink-0">
                          <input type="checkbox" className="peer sr-only" />
                          <div className="block w-11 h-6 bg-gray-200 dark:bg-slate-700 rounded-full peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500 transition-colors duration-300 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500/50 peer-focus-visible:ring-offset-2 dark:peer-focus-visible:ring-offset-slate-950"></div>
                          <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 peer-checked:translate-x-5 shadow-sm"></div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="col-span-1 md:col-span-2 lg:col-span-3 max-w-md pt-4">
                    <div className="flex justify-between mb-1.5">
                      <Label>Range Slider</Label>
                      <span className="text-sm font-medium text-gray-900 dark:text-white transition-colors">{sliderValue}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={sliderValue}
                      onChange={(e) => setSliderValue(e.target.value)}
                      className="w-full outline-none h-2 bg-gray-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'dropdowns':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 transition-colors">Select Menus</h2>
              <p className="text-sm text-gray-500 dark:text-slate-400 mb-6 transition-colors">Custom styled single and multi-select dropdown components with optional search.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                
                {/* Single Select Section */}
                <div className="space-y-8 p-6 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm transition-colors">
                  <h3 className="text-sm font-bold tracking-widest text-gray-400 dark:text-slate-500 uppercase">Single Select</h3>
                  <div className="space-y-6">
                    <CustomDropdown 
                      label="Titles Only" 
                      options={optionsTitlesOnly} 
                      selectedOption={selectedTitleOnly} 
                      setSelectedOption={setSelectedTitleOnly} 
                    />
                    <CustomDropdown 
                      label="Titles with Icons (Searchable)" 
                      options={optionsTitlesIcons} 
                      selectedOption={selectedTitleIcon} 
                      setSelectedOption={setSelectedTitleIcon} 
                      searchable={true} 
                    />
                    <CustomDropdown 
                      label="Titles with Subtext (Searchable)" 
                      options={optionsTitlesSubtext} 
                      selectedOption={selectedTitleSubtext} 
                      setSelectedOption={setSelectedTitleSubtext} 
                      searchable={true}
                    />
                    <CustomDropdown 
                      label="Full Options (Icon + Subtext)" 
                      options={optionsFull} 
                      selectedOption={selectedFull} 
                      setSelectedOption={setSelectedFull} 
                    />
                    <CustomDropdown 
                      label="Disabled Dropdown" 
                      options={optionsTitlesOnly} 
                      selectedOption={null} 
                      setSelectedOption={() => {}} 
                      disabled={true} 
                      placeholder="Currently unavailable..." 
                    />
                  </div>
                </div>

                {/* Multi Select Section */}
                <div className="space-y-8 p-6 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm transition-colors">
                  <h3 className="text-sm font-bold tracking-widest text-gray-400 dark:text-slate-500 uppercase">Multi Select</h3>
                  <div className="space-y-6">
                    
                    <MultiSelectDropdown 
                      label="Titles Only (w/ Default Locked)" 
                      options={optionsTitlesOnly} 
                      selectedOptions={multiTitleOnly} 
                      setSelectedOptions={setMultiTitleOnly}
                    />

                    <MultiSelectDropdown 
                      label="Titles with Icons (Searchable)" 
                      options={optionsTitlesIcons} 
                      selectedOptions={multiTitleIcon} 
                      setSelectedOptions={setMultiTitleIcon}
                      searchable={true}
                    />

                    <MultiSelectDropdown 
                      label="Titles with Subtext (Searchable)" 
                      options={optionsTitlesSubtext} 
                      selectedOptions={multiTitleSubtext} 
                      setSelectedOptions={setMultiTitleSubtext}
                      searchable={true}
                    />

                    <MultiSelectDropdown 
                      label="Full Options (Icon + Subtext)" 
                      options={optionsFull} 
                      selectedOptions={multiFull} 
                      setSelectedOptions={setMultiFull}
                    />

                    <MultiSelectDropdown 
                      label="Disabled State" 
                      options={optionsTitlesOnly} 
                      selectedOptions={multiDisabled} 
                      setSelectedOptions={setMultiDisabled} 
                      disabled={true}
                      placeholder="Currently unavailable..."
                    />

                  </div>
                </div>

              </div>
            </div>
          </div>
        );

      case 'buttons':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 transition-colors">Buttons & Actions</h2>
              <p className="text-sm text-gray-500 dark:text-slate-400 mb-6 transition-colors">Various clickable action components with toned-down states.</p>
              
              <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm transition-colors">
                <div className="flex flex-wrap items-center gap-4 max-w-4xl">
                  <button className="outline-none px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-lg shadow-sm hover:bg-gray-800 dark:hover:bg-gray-100 focus:ring-4 focus:ring-gray-900/20 dark:focus:ring-white/20 transition-all active:scale-[0.98] flex items-center gap-2">
                    Primary Button
                  </button>
                  <button className="outline-none px-5 py-2.5 bg-blue-600 dark:bg-blue-500 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-blue-700 dark:hover:bg-blue-600 focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all active:scale-[0.98] flex items-center gap-2">
                    Brand Action
                  </button>
                  <button className="outline-none px-5 py-2.5 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-300 text-sm font-medium rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-slate-800 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-gray-200 dark:focus:ring-slate-700 transition-all active:scale-[0.98]">
                    Secondary Outline
                  </button>
                  <button className="outline-none px-5 py-2.5 bg-transparent text-gray-600 dark:text-slate-400 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white focus:ring-4 focus:ring-gray-200 dark:focus:ring-slate-800 transition-all active:scale-[0.98]">
                    Ghost Button
                  </button>
                  <button className="outline-none px-5 py-2.5 bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm font-medium rounded-lg shadow-sm hover:bg-red-50 dark:hover:bg-red-950/40 hover:border-red-300 dark:hover:border-red-800/60 focus:ring-4 focus:ring-red-500/20 dark:focus:ring-red-500/20 transition-all active:scale-[0.98]">
                    Destructive
                  </button>
                  <button disabled className="outline-none px-5 py-2.5 bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-600 text-sm font-medium rounded-lg cursor-not-allowed transition-colors">
                    Disabled State
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'uploads':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 transition-colors">File Uploads</h2>
              <p className="text-sm text-gray-500 dark:text-slate-400 mb-6 transition-colors">Drag and drop zones and file list items with custom folded corners.</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm transition-colors">
                  <FileUploadZone />
                </div>

                <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm transition-colors space-y-6">
                  <div>
                    <Label>Uploaded Files (Static)</Label>
                    <div className="space-y-3 mt-2">
                      <FileRow filename="Q3_Financial_Report.pdf" filesize="2.4 MB" action="none" />
                      <FileRow filename="company_logo_final.png" filesize="1.1 MB" action="x" />
                      <FileRow filename="user_data_export.csv" filesize="8.5 MB" action="trash" />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-slate-800 transition-colors">
                    <Label>Interactive Files (Clickable Row)</Label>
                    <div className="space-y-3 mt-2">
                      <FileRow filename="Interactive_Document.pdf" filesize="4.2 MB" action="trash" clickable={true} />
                      <Hint>The row acts as a button, but clicking the trash icon intercepts the click.</Hint>
                    </div>
                  </div>
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
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-64 border-r border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col transition-colors z-10 hidden md:flex">
          <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-slate-800 transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-inner">
                <LayoutDashboard className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight">Form UI</span>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5 custom-scrollbar">
            <div className="px-3 mb-2 text-xs font-bold tracking-widest text-gray-400 dark:text-slate-500 uppercase transition-colors">
              Components
            </div>
            
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`w-full outline-none flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group focus-visible:ring-2 focus-visible:ring-blue-500
                    ${isActive 
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 shadow-sm' 
                      : 'text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-slate-200'
                    }
                  `}
                >
                  <item.icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-slate-500 group-hover:text-gray-600 dark:group-hover:text-slate-400'} transition-colors`} />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-slate-800 transition-colors">
             <div className="flex items-center justify-between px-3 py-2">
              <span className="text-sm font-medium text-gray-500 dark:text-slate-400 transition-colors">Theme</span>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="relative inline-flex h-7 w-14 items-center rounded-full bg-gray-200 dark:bg-slate-800 transition-colors duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20"
                aria-label="Toggle Dark Mode"
              >
                <span className={`flex h-5 w-5 items-center justify-center rounded-full bg-white dark:bg-slate-950 shadow-sm transition-transform duration-300 ease-in-out ${
                    isDarkMode ? 'translate-x-8' : 'translate-x-1'
                  }`}
                >
                  {isDarkMode ? (
                    <Moon className="h-3 w-3 text-blue-400" strokeWidth={2.5} />
                  ) : (
                    <Sun className="h-3 w-3 text-amber-500" strokeWidth={2.5} />
                  )}
                </span>
              </button>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 h-full overflow-y-auto custom-scrollbar">
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
      </div>
    </div>
  );
}