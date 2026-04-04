import { Button } from '@/components/ui/button';
import { Monitor, Tablet, Smartphone, ZoomIn, ZoomOut, Upload, Download, Play, RotateCcw, Settings, Eye, EyeOff, Layout, Columns2 } from 'lucide-react';

interface EditorHeaderProps {
  previewMode: string; zoomLevel: number; fullScreenPreview: boolean; showDevTools: boolean;
  onPreviewModeChange: (mode: string) => void; onZoom: (direction: 'in' | 'out') => void;
  onFullScreenToggle: () => void; onDevToolsToggle: () => void;
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onExport: () => void; onRefresh: () => void; onReset: () => void;
}

const DeviceBtn = ({ active, onClick, children, title }: { active: boolean; onClick: () => void; children: React.ReactNode; title: string }) => (
  <button
    onClick={onClick} title={title}
    className={`p-1.5 rounded-md transition-all duration-150 ${
      active ? 'bg-amber-600/10 text-amber-700 shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
    }`}
  >
    {children}
  </button>
);

const EditorHeader = ({
  previewMode, zoomLevel, fullScreenPreview, showDevTools,
  onPreviewModeChange, onZoom, onFullScreenToggle, onDevToolsToggle,
  onImport, onExport, onRefresh, onReset,
}: EditorHeaderProps) => {
  return (
    <header className="border-b border-border bg-white shadow-warm-sm">
      <div className="max-w-[1600px] mx-auto px-4 py-2.5">
        <div className="flex items-center justify-between gap-4">
          {/* Left */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="live-dot" />
              <span className="text-xs font-semibold text-muted-foreground">Live Editor</span>
            </div>
          </div>

          {/* Center */}
          <div className="hidden md:flex items-center gap-1">
            <div className="flex items-center gap-0.5 p-1 rounded-lg bg-muted border border-border">
              <DeviceBtn active={previewMode === 'desktop'} onClick={() => onPreviewModeChange('desktop')} title="Desktop"><Monitor className="w-3.5 h-3.5" /></DeviceBtn>
              <DeviceBtn active={previewMode === 'tablet'} onClick={() => onPreviewModeChange('tablet')} title="Tablet"><Tablet className="w-3.5 h-3.5" /></DeviceBtn>
              <DeviceBtn active={previewMode === 'mobile'} onClick={() => onPreviewModeChange('mobile')} title="Mobile"><Smartphone className="w-3.5 h-3.5" /></DeviceBtn>
            </div>
            <div className="w-px h-5 bg-border mx-2" />
            <button onClick={() => onZoom('out')} className="toolbar-btn p-1.5"><ZoomOut className="w-3.5 h-3.5" /></button>
            <span className="text-[11px] font-mono text-muted-foreground w-10 text-center tabular-nums">{zoomLevel}%</span>
            <button onClick={() => onZoom('in')} className="toolbar-btn p-1.5"><ZoomIn className="w-3.5 h-3.5" /></button>
            <div className="w-px h-5 bg-border mx-2" />
            <button onClick={onDevToolsToggle} className={`toolbar-btn p-1.5 ${showDevTools ? 'text-amber-700 bg-amber-50' : ''}`} title="Dev tools"><Settings className="w-3.5 h-3.5" /></button>
            <button onClick={onFullScreenToggle} className={`toolbar-btn p-1.5 ${fullScreenPreview ? 'text-amber-700 bg-amber-50' : ''}`} title="Fullscreen">{fullScreenPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}</button>
          </div>

          {/* Right */}
          <div className="flex items-center gap-1.5">
            <input type="file" accept=".html" onChange={onImport} className="hidden" id="import-file" />
            <Button onClick={() => document.getElementById('import-file')?.click()} variant="ghost" size="sm" className="toolbar-btn h-7 px-2.5 text-xs gap-1.5"><Upload className="w-3.5 h-3.5" /><span className="hidden lg:inline">Import</span></Button>
            <Button onClick={onExport} variant="ghost" size="sm" className="toolbar-btn h-7 px-2.5 text-xs gap-1.5"><Download className="w-3.5 h-3.5" /><span className="hidden lg:inline">Export</span></Button>
            <div className="w-px h-5 bg-border mx-0.5" />
            <Button onClick={() => window.open('/components', '_blank')} variant="ghost" size="sm" className="toolbar-btn h-7 px-2.5 text-xs gap-1.5"><Columns2 className="w-3.5 h-3.5" /><span className="hidden xl:inline">Components</span></Button>
            <Button onClick={() => window.open('/notepad', '_blank')} variant="ghost" size="sm" className="toolbar-btn h-7 px-2.5 text-xs gap-1.5"><Layout className="w-3.5 h-3.5" /><span className="hidden xl:inline">Notepad</span></Button>
            <div className="w-px h-5 bg-border mx-0.5" />
            <Button onClick={onRefresh} variant="ghost" size="sm" className="h-7 px-2.5 text-xs gap-1.5 text-green-700 hover:bg-green-50 hover:text-green-800"><Play className="w-3.5 h-3.5" /><span className="hidden lg:inline">Run</span></Button>
            <Button onClick={onReset} variant="ghost" size="sm" className="toolbar-btn h-7 px-2.5 text-xs gap-1.5"><RotateCcw className="w-3.5 h-3.5" /><span className="hidden lg:inline">Reset</span></Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default EditorHeader;
