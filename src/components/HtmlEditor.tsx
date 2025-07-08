
import { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw, Github, Heart, Monitor, Tablet, Smartphone, ZoomIn, ZoomOut, Download, Upload, Palette, Eye, EyeOff, Sun, Moon, Settings, Layout } from 'lucide-react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import CodeEditor from './CodeEditor';
import LivePreview from './LivePreview';
import CssEditor from './CssEditor';
import JsEditor from './JsEditor';
import DevTools from './DevTools';
import ProjectTemplates from './ProjectTemplates';

const HtmlEditor = () => {
  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Document</title>
    <style id="custom-styles">
        body {
            font-family: 'Georgia', serif;
            line-height: 1.6;
            margin: 40px;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }
        h1 {
            color: #4a5568;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 10px;
        }
        .introduction {
            background: #f7fafc;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        p {
            color: #2d3748;
            margin: 15px 0;
        }
        a {
            color: #4299e1;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
    <script id="custom-scripts">
        // Add your JavaScript here
        console.log('Welcome to HTML Editor!');
    </script>
</head>
<body>
    <h1>Welcome to HTML Editor</h1>
    <div class="introduction">
        <h2>Introduction</h2>
        <p>This is the introduction section. You can edit this text directly by clicking on it in the preview!</p>
        <p>Try selecting text and using the toolbar to format it, or click on elements to edit them directly.</p>
    </div>
    <div class="content">
        <h2>Main Content</h2>
        <p>This is the main content area. Each section will update precisely in the code when you make changes.</p>
        <p>The bidirectional sync ensures your changes in the preview are reflected exactly where they should be in the HTML code.</p>
    </div>
</body>
</html>`);

  const [cssCode, setCssCode] = useState(`/* Add your custom CSS here */
body {
    font-family: 'Georgia', serif;
    line-height: 1.6;
    margin: 40px;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

h1 {
    color: #4a5568;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 10px;
}

.introduction {
    background: #f7fafc;
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;
}

p {
    color: #2d3748;
    margin: 15px 0;
}

a {
    color: #4299e1;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}`);

  const [jsCode, setJsCode] = useState(`// Add your JavaScript here
console.log('Welcome to HTML Editor!');

// Example: Add interactivity
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded and ready!');
    
    // Add click handlers or other interactive features
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Button clicked:', this.textContent);
        });
    });
});`);

  const [previewKey, setPreviewKey] = useState(0);
  const [activeEditor, setActiveEditor] = useState('html');
  const [previewMode, setPreviewMode] = useState('desktop');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [darkMode, setDarkMode] = useState(false);
  const [showDevTools, setShowDevTools] = useState(false);
  const [fullScreenPreview, setFullScreenPreview] = useState(false);

  const handleCodeChange = useCallback((newCode: string) => {
    setHtmlCode(newCode);
    updateCombinedCode(newCode, cssCode, jsCode);
  }, [cssCode, jsCode]);

  const handleCssChange = useCallback((newCss: string) => {
    setCssCode(newCss);
    updateCombinedCode(htmlCode, newCss, jsCode);
  }, [htmlCode, jsCode]);

  const handleJsChange = useCallback((newJs: string) => {
    setJsCode(newJs);
    updateCombinedCode(htmlCode, cssCode, newJs);
  }, [htmlCode, cssCode]);

  const updateCombinedCode = (html: string, css: string, js: string) => {
    // Inject CSS and JS into HTML
    let updatedHtml = html;
    
    // Update or inject CSS
    const styleRegex = /<style id="custom-styles">[\s\S]*?<\/style>/;
    const newStyle = `<style id="custom-styles">\n${css}\n    </style>`;
    if (styleRegex.test(updatedHtml)) {
      updatedHtml = updatedHtml.replace(styleRegex, newStyle);
    } else {
      updatedHtml = updatedHtml.replace('</head>', `    ${newStyle}\n</head>`);
    }
    
    // Update or inject JavaScript
    const scriptRegex = /<script id="custom-scripts">[\s\S]*?<\/script>/;
    const newScript = `<script id="custom-scripts">\n${js}\n    </script>`;
    if (scriptRegex.test(updatedHtml)) {
      updatedHtml = updatedHtml.replace(scriptRegex, newScript);
    } else {
      updatedHtml = updatedHtml.replace('</head>', `    ${newScript}\n</head>`);
    }
    
    setHtmlCode(updatedHtml);
  };

  const refreshPreview = () => {
    setPreviewKey(prev => prev + 1);
  };

  const resetCode = () => {
    const defaultHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Document</title>
    <style id="custom-styles">
        body {
            font-family: 'Georgia', serif;
            line-height: 1.6;
            margin: 40px;
        }
        h1 {
            color: #4a5568;
        }
        p {
            color: #2d3748;
        }
    </style>
    <script id="custom-scripts">
        console.log('Welcome to HTML Editor!');
    </script>
</head>
<body>
    <h1>Welcome to HTML Editor</h1>
    <p>Start building your HTML content here!</p>
</body>
</html>`;
    
    const defaultCss = `/* Add your custom CSS here */
body {
    font-family: 'Georgia', serif;
    line-height: 1.6;
    margin: 40px;
}

h1 {
    color: #4a5568;
}

p {
    color: #2d3748;
}`;

    const defaultJs = `// Add your JavaScript here
console.log('Welcome to HTML Editor!');`;

    setHtmlCode(defaultHtml);
    setCssCode(defaultCss);
    setJsCode(defaultJs);
    refreshPreview();
  };

  const handleExport = () => {
    const blob = new Blob([htmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setHtmlCode(content);
        // Extract CSS and JS from imported HTML
        const cssMatch = content.match(/<style id="custom-styles">([\s\S]*?)<\/style>/);
        const jsMatch = content.match(/<script id="custom-scripts">([\s\S]*?)<\/script>/);
        
        if (cssMatch) setCssCode(cssMatch[1].trim());
        if (jsMatch) setJsCode(jsMatch[1].trim());
      };
      reader.readAsText(file);
    }
  };

  const handleZoom = (direction: 'in' | 'out') => {
    setZoomLevel(prev => {
      if (direction === 'in') return Math.min(200, prev + 25);
      return Math.max(25, prev - 25);
    });
  };

  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      default: return '100%';
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-background' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'}`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-card border-border' : 'bg-white/80 backdrop-blur-md border-slate-200/60'} border-b shadow-sm`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">&lt;/&gt;</span>
              </div>
              <div>
                <h1 className={`text-2xl font-semibold ${darkMode ? 'text-foreground' : 'text-slate-800'} tracking-tight`}>HTML Editor</h1>
                <p className={`text-sm ${darkMode ? 'text-muted-foreground' : 'text-slate-500'} mt-0.5`}>Create, edit, and preview HTML in real-time</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {/* Preview Mode */}
              <Select value={previewMode} onValueChange={setPreviewMode}>
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
              <Button onClick={() => handleZoom('out')} variant="outline" size="sm">
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-sm font-mono">{zoomLevel}%</span>
              <Button onClick={() => handleZoom('in')} variant="outline" size="sm">
                <ZoomIn className="w-4 h-4" />
              </Button>

              {/* Theme Toggle */}
              <Button
                onClick={() => setDarkMode(!darkMode)}
                variant="outline"
                size="sm"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>

              {/* Dev Tools Toggle */}
              <Button
                onClick={() => setShowDevTools(!showDevTools)}
                variant="outline"
                size="sm"
              >
                <Settings className="w-4 h-4" />
              </Button>

              {/* Full Screen Toggle */}
              <Button
                onClick={() => setFullScreenPreview(!fullScreenPreview)}
                variant="outline"
                size="sm"
              >
                {fullScreenPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>

              {/* Import/Export */}
              <input
                type="file"
                accept=".html"
                onChange={handleImport}
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
              
              <Button onClick={handleExport} variant="outline" size="sm">
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

              <Button onClick={refreshPreview} variant="outline" size="sm">
                <Play className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              
              <Button onClick={resetCode} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex gap-6 p-6">
        {fullScreenPreview ? (
          <Card className="flex-1 bg-white/90 backdrop-blur-sm border-slate-200/60 shadow-xl">
            <div className="h-full flex flex-col">
              <div className="p-5 border-b border-slate-200/60 bg-gradient-to-r from-blue-50 to-indigo-50">
                <h2 className="text-lg font-semibold text-slate-800">Full Screen Preview</h2>
              </div>
              <div className="flex-1" style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left' }}>
                <LivePreview
                  key={previewKey}
                  htmlCode={htmlCode}
                  onCodeChange={handleCodeChange}
                  previewWidth={getPreviewWidth()}
                />
              </div>
            </div>
          </Card>
        ) : (
          <ResizablePanelGroup direction="horizontal" className="flex-1">
            {/* Code Editor Side */}
            <ResizablePanel defaultSize={50} minSize={30}>
              <Card className="h-full bg-white/90 backdrop-blur-sm border-slate-200/60 shadow-xl">
                <div className="h-full flex flex-col">
                  <Tabs value={activeEditor} onValueChange={setActiveEditor} className="h-full flex flex-col">
                    <div className="p-5 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-blue-50">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="html">HTML</TabsTrigger>
                        <TabsTrigger value="css">CSS</TabsTrigger>
                        <TabsTrigger value="js">JavaScript</TabsTrigger>
                      </TabsList>
                    </div>
                    
                    <TabsContent value="html" className="flex-1 mt-0">
                      <CodeEditor
                        value={htmlCode}
                        onChange={handleCodeChange}
                        language="html"
                        darkMode={darkMode}
                      />
                    </TabsContent>
                    
                    <TabsContent value="css" className="flex-1 mt-0">
                      <CssEditor
                        value={cssCode}
                        onChange={handleCssChange}
                        darkMode={darkMode}
                      />
                    </TabsContent>
                    
                    <TabsContent value="js" className="flex-1 mt-0">
                      <JsEditor
                        value={jsCode}
                        onChange={handleJsChange}
                        darkMode={darkMode}
                      />
                    </TabsContent>
                  </Tabs>
                </div>
              </Card>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Live Preview Side */}
            <ResizablePanel defaultSize={50} minSize={30}>
              <Card className="flex-1 bg-white/90 backdrop-blur-sm border-slate-200/60 shadow-xl">
                <div className="h-full flex flex-col">
                  <div className="p-5 border-b border-slate-200/60 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <h2 className="text-lg font-semibold text-slate-800">Live Preview</h2>
                    <p className="text-sm text-slate-600 mt-1">
                      {previewMode.charAt(0).toUpperCase() + previewMode.slice(1)} view • 
                      Click elements to edit • Changes sync to code
                    </p>
                  </div>
                  <div className="flex-1" style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left' }}>
                    <LivePreview
                      key={previewKey}
                      htmlCode={htmlCode}
                      onCodeChange={handleCodeChange}
                      previewWidth={getPreviewWidth()}
                    />
                  </div>
                </div>
              </Card>
            </ResizablePanel>
          </ResizablePanelGroup>
        )}

        {/* Dev Tools Sidebar */}
        {showDevTools && (
          <Card className="w-80 bg-white/90 backdrop-blur-sm border-slate-200/60 shadow-xl">
            <DevTools htmlCode={htmlCode} />
          </Card>
        )}
      </main>

      {/* Footer */}
      <footer className={`${darkMode ? 'bg-card border-border' : 'bg-white/80 backdrop-blur-md border-slate-200/60'} border-t mt-auto`}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className={`flex items-center space-x-6 text-sm ${darkMode ? 'text-muted-foreground' : 'text-slate-600'}`}>
              <span className="flex items-center">
                Made with <Heart className="w-4 h-4 mx-1 text-red-400" fill="currentColor" /> for developers
              </span>
              <span>•</span>
              <span>Advanced HTML editing and preview</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`text-xs ${darkMode ? 'text-muted-foreground' : 'text-slate-500'}`}>
                <span>Keyboard shortcuts: </span>
                <kbd className={`px-2 py-1 ${darkMode ? 'bg-muted' : 'bg-slate-100'} rounded text-xs`}>Ctrl+S</kbd>
                <span className="mx-1">to save</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className={darkMode ? 'text-muted-foreground hover:text-foreground' : 'text-slate-500 hover:text-slate-700'}
                onClick={() => window.open('https://github.com', '_blank')}
              >
                <Github className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className={`mt-4 pt-4 border-t ${darkMode ? 'border-border' : 'border-slate-200/60'}`}>
            <p className={`text-xs ${darkMode ? 'text-muted-foreground' : 'text-slate-500'} text-center`}>
              © 2024 HTML Editor. Built with React, TypeScript, and Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HtmlEditor;
