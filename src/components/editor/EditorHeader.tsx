import { Button } from '@/components/ui/button';
import { Monitor, Tablet, Smartphone, ZoomIn, ZoomOut, Upload, Download, Play, RotateCcw, Settings, Eye, EyeOff, Layout, Columns2 } from 'lucide-react';

interface EditorHeaderProps {
  previewMode: string;
  zoomLevel: number;
  fullScreenPreview: boolean;
  showDevTools: boolean;
  onPreviewModeChange: (mode: string) => void;
  onZoom: (direction: 'in' | 'out') => void;
  onFullScreenToggle: () => void;
  onDevToolsToggle: () => void;
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onExport: () => void;
  onRefresh: () => void;
  onReset: () => void;
}

const DeviceBtn = ({ active, onClick, children, title }: { active: boolean; onClick: () => void; children: React.ReactNode; title: string }) => (
  <button
    onClick={onClick}
    title={title}
    className={`p-1.5 rounded-md transition-all duration-150 ${
      active
        ? 'bg-indigo-600/20 text-indigo-400 shadow-[0_0_8px_-2px_rgba(99,102,241,0.4)]'
        : 'text-[#5C6178] hover:text-[#9DA3B4] hover:bg-white/[0.04]'
    }`}
  >
    {children}
  </button>
);

const EditorHeader = ({
  previewMode,
  zoomLevel,
  fullScreenPreview,
  showDevTools,
  onPreviewModeChange,
  onZoom,
  onFullScreenToggle,
  onDevToolsToggle,
  onImport,
  onExport,
  onRefresh,
  onReset,
}: EditorHeaderProps) => {
  return (
    <header className="glass border-b border-white/[0.06]">
      <div className="max-w-[1600px] mx-auto px-4 py-2.5">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Editor info */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_1px_rgba(52,211,153,0.5)]" />
              <span className="text-xs font-medium text-[#9DA3B4] whitespace-nowrap">Live Editor</span>
            </div>
          </div>

          {/* Center: Controls */}
          <div className="hidden md:flex items-center gap-1">
            {/* Device toggles */}
            <div className="flex items-center gap-0.5 p-1 rounded-lg bg-white/[0.03] border border-white/[0.06]">
              <DeviceBtn active={previewMode === 'desktop'} onClick={() => onPreviewModeChange('desktop')} title="Desktop">
                <Monitor className="w-3.5 h-3.5" />
              </DeviceBtn>
              <DeviceBtn active={previewMode === 'tablet'} onClick={() => onPreviewModeChange('tablet')} title="Tablet">
                <Tablet className="w-3.5 h-3.5" />
              </DeviceBtn>
              <DeviceBtn active={previewMode === 'mobile'} onClick={() => onPreviewModeChange('mobile')} title="Mobile">
                <Smartphone className="w-3.5 h-3.5" />
              </DeviceBtn>
            </div>

            <div className="w-px h-5 bg-white/[0.06] mx-2" />

            {/* Zoom */}
            <div className="flex items-center gap-1">
              <button onClick={() => onZoom('out')} className="toolbar-btn p-1.5 rounded-md" title="Zoom out">
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono text-[#5C6178] w-10 text-center tabular-nums">{zoomLevel}%</span>
              <button onClick={() => onZoom('in')} className="toolbar-btn p-1.5 rounded-md" title="Zoom in">
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="w-px h-5 bg-white/[0.06] mx-2" />

            {/* View toggles */}
            <button onClick={onDevToolsToggle} className={`toolbar-btn p-1.5 rounded-md ${showDevTools ? 'text-indigo-400 bg-indigo-600/10' : ''}`} title="Developer tools">
              <Settings className="w-3.5 h-3.5" />
            </button>
            <button onClick={onFullScreenToggle} className={`toolbar-btn p-1.5 rounded-md ${fullScreenPreview ? 'text-indigo-400 bg-indigo-600/10' : ''}`} title="Full screen preview">
              {fullScreenPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1.5">
            <input type="file" accept=".html" onChange={onImport} className="hidden" id="import-file" />

            <Button
              onClick={() => document.getElementById('import-file')?.click()}
              variant="ghost"
              size="sm"
              className="toolbar-btn h-7 px-2.5 text-xs gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Import</span>
            </Button>

            <Button onClick={onExport} variant="ghost" size="sm" className="toolbar-btn h-7 px-2.5 text-xs gap-1.5">
              <Download className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Export</span>
            </Button>

            <div className="w-px h-5 bg-white/[0.06] mx-0.5" />

            <Button
              onClick={() => window.open('/components', '_blank')}
              variant="ghost"
              size="sm"
              className="toolbar-btn h-7 px-2.5 text-xs gap-1.5"
            >
              <Columns2 className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Components</span>
            </Button>

            <Button
              onClick={() => window.open('/notepad', '_blank')}
              variant="ghost"
              size="sm"
              className="toolbar-btn h-7 px-2.5 text-xs gap-1.5"
            >
              <Layout className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Notepad</span>
            </Button>

            <div className="w-px h-5 bg-white/[0.06] mx-0.5" />

            <Button onClick={onRefresh} variant="ghost" size="sm" className="toolbar-btn h-7 px-2.5 text-xs gap-1.5 text-emerald-500 hover:text-emerald-400">
              <Play className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Run</span>
            </Button>

            <Button onClick={onReset} variant="ghost" size="sm" className="toolbar-btn h-7 px-2.5 text-xs gap-1.5">
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Reset</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default EditorHeader;
