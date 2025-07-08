import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Monitor, Tablet, Smartphone, ZoomIn, ZoomOut, Upload, Download, Layout, Play, RotateCcw, Settings, Eye, EyeOff, Sun, Moon } from 'lucide-react';

interface EditorHeaderProps {
  darkMode: boolean;
  previewMode: string;
  zoomLevel: number;
  fullScreenPreview: boolean;
  showDevTools: boolean;
  onDarkModeToggle: () => void;
  onPreviewModeChange: (mode: string) => void;
  onZoom: (direction: 'in' | 'out') => void;
  onFullScreenToggle: () => void;
  onDevToolsToggle: () => void;
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onExport: () => void;
  onRefresh: () => void;
  onReset: () => void;
}

const EditorHeader = ({
  darkMode,
  previewMode,
  zoomLevel,
  fullScreenPreview,
  showDevTools,
  onDarkModeToggle,
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
    <header className={`${darkMode ? 'bg-card border-border' : 'bg-white/80 backdrop-blur-md border-slate-200/60'} border-b shadow-sm`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">&lt;/&gt;</span>
            </div>
            <div>
              <h1 className={`text-xl font-semibold ${darkMode ? 'text-foreground' : 'text-slate-800'} tracking-tight`}>HTML Editor</h1>
              <p className={`text-xs ${darkMode ? 'text-muted-foreground' : 'text-slate-500'} mt-0.5`}>Create, edit, and preview HTML in real-time</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {/* Preview Mode */}
            <Select value={previewMode} onValueChange={onPreviewModeChange}>
              <SelectTrigger className="w-32 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desktop"><Monitor className="w-4 h-4 mr-2 inline" />Desktop</SelectItem>
                <SelectItem value="tablet"><Tablet className="w-4 h-4 mr-2 inline" />Tablet</SelectItem>
                <SelectItem value="mobile"><Smartphone className="w-4 h-4 mr-2 inline" />Mobile</SelectItem>
              </SelectContent>
            </Select>

            {/* Zoom Controls */}
            <Button onClick={() => onZoom('out')} variant="outline" size="sm">
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm font-mono">{zoomLevel}%</span>
            <Button onClick={() => onZoom('in')} variant="outline" size="sm">
              <ZoomIn className="w-4 h-4" />
            </Button>

            {/* Theme Toggle */}
            <Button
              onClick={onDarkModeToggle}
              variant="outline"
              size="sm"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* Dev Tools Toggle */}
            <Button
              onClick={onDevToolsToggle}
              variant="outline"
              size="sm"
            >
              <Settings className="w-4 h-4" />
            </Button>

            {/* Full Screen Toggle */}
            <Button
              onClick={onFullScreenToggle}
              variant="outline"
              size="sm"
            >
              {fullScreenPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>

            {/* Import/Export */}
            <input
              type="file"
              accept=".html"
              onChange={onImport}
              className="hidden"
              id="import-file"
            />
            <Button
              onClick={() => document.getElementById('import-file')?.click()}
              variant="outline"
              size="sm"
            >
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            
            <Button onClick={onExport} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>

            <Button 
              onClick={() => window.open('/components', '_blank')} 
              variant="outline" 
              size="sm"
            >
              <Layout className="w-4 h-4 mr-2" />
              Components
            </Button>

            <Button onClick={onRefresh} variant="outline" size="sm">
              <Play className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            
            <Button onClick={onReset} variant="outline" size="sm">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default EditorHeader;