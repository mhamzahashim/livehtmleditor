
import { useState, useCallback } from 'react';
import EditorHeader from './editor/EditorHeader';
import EditorLayout from './editor/EditorLayout';
import EditorFooter from './editor/EditorFooter';

const HtmlEditor = () => {
  const [htmlCode, setHtmlCode] = useState(`<h1>Welcome to HTML Editor</h1>
<div class="introduction">
    <h2>Introduction</h2>
    <p>This is the introduction section. You can edit this text directly by clicking on it in the preview!</p>
    <p>Try selecting text and using the toolbar to format it, or click on elements to edit them directly.</p>
</div>
<div class="content">
    <h2>Main Content</h2>
    <p>This is the main content area. Each section will update precisely in the code when you make changes.</p>
    <p>The bidirectional sync ensures your changes in the preview are reflected exactly where they should be in the HTML code.</p>
</div>`);

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
  const [showDevTools, setShowDevTools] = useState(false);
  const [fullScreenPreview, setFullScreenPreview] = useState(false);

  const handleCodeChange = useCallback((newCode: string) => {
    setHtmlCode(newCode);
  }, []);

  const handleCssChange = useCallback((newCss: string) => {
    setCssCode(newCss);
  }, []);

  const handleJsChange = useCallback((newJs: string) => {
    setJsCode(newJs);
  }, []);

  const refreshPreview = () => {
    setPreviewKey(prev => prev + 1);
  };

  const resetCode = () => {
    const defaultHtml = `<h1>Welcome to HTML Editor</h1>
<p>Start building your HTML content here!</p>`;
    
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <EditorHeader
        previewMode={previewMode}
        zoomLevel={zoomLevel}
        fullScreenPreview={fullScreenPreview}
        showDevTools={showDevTools}
        onPreviewModeChange={setPreviewMode}
        onZoom={handleZoom}
        onFullScreenToggle={() => setFullScreenPreview(!fullScreenPreview)}
        onDevToolsToggle={() => setShowDevTools(!showDevTools)}
        onImport={handleImport}
        onExport={handleExport}
        onRefresh={refreshPreview}
        onReset={resetCode}
      />

      <main className="flex-1 flex flex-col lg:flex-row gap-6 p-3 lg:p-6">
        <EditorLayout
          fullScreenPreview={fullScreenPreview}
          activeEditor={activeEditor}
          previewKey={previewKey}
          previewMode={previewMode}
          zoomLevel={zoomLevel}
          showDevTools={showDevTools}
          htmlCode={htmlCode}
          cssCode={cssCode}
          jsCode={jsCode}
          onActiveEditorChange={setActiveEditor}
          onCodeChange={handleCodeChange}
          onCssChange={handleCssChange}
          onJsChange={handleJsChange}
          getPreviewWidth={getPreviewWidth}
        />
      </main>

      <EditorFooter />
    </div>
  );
};

export default HtmlEditor;
