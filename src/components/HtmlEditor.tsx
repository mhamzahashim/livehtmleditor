
import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Save, RotateCcw } from 'lucide-react';
import CodeEditor from './CodeEditor';
import LivePreview from './LivePreview';

const HtmlEditor = () => {
  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Document</title>
    <style>
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
</head>
<body>
    <h1>Welcome to HTML Editor</h1>
    <p>This is a sample paragraph. You can edit this text directly in the preview!</p>
    <p>Try adding a <a href="https://example.com">link</a> or editing existing content.</p>
</body>
</html>`);

  const [previewKey, setPreviewKey] = useState(0);

  const refreshPreview = () => {
    setPreviewKey(prev => prev + 1);
  };

  const resetCode = () => {
    setHtmlCode(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Document</title>
    <style>
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
</head>
<body>
    <h1>Welcome to HTML Editor</h1>
    <p>Start building your HTML content here!</p>
</body>
</html>`);
    refreshPreview();
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white/70 backdrop-blur-sm border-b border-slate-200/50">
        <h1 className="text-2xl font-light text-slate-700">HTML Editor</h1>
        <div className="flex gap-2">
          <Button
            onClick={refreshPreview}
            variant="outline"
            size="sm"
            className="text-slate-600 border-slate-300 hover:bg-slate-50"
          >
            <Play className="w-4 h-4 mr-1" />
            Refresh
          </Button>
          <Button
            onClick={resetCode}
            variant="outline"
            size="sm"
            className="text-slate-600 border-slate-300 hover:bg-slate-50"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
        </div>
      </div>

      {/* Editor Layout */}
      <div className="flex-1 flex gap-4 p-4">
        {/* Code Editor Side */}
        <Card className="flex-1 bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-slate-200/50">
              <h2 className="text-lg font-medium text-slate-700">HTML Code</h2>
              <p className="text-sm text-slate-500 mt-1">Edit your HTML, CSS, and JavaScript</p>
            </div>
            <div className="flex-1">
              <CodeEditor
                value={htmlCode}
                onChange={setHtmlCode}
              />
            </div>
          </div>
        </Card>

        {/* Live Preview Side */}
        <Card className="flex-1 bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-slate-200/50">
              <h2 className="text-lg font-medium text-slate-700">Live Preview</h2>
              <p className="text-sm text-slate-500 mt-1">Interactive preview - changes sync back to code</p>
            </div>
            <div className="flex-1">
              <LivePreview
                key={previewKey}
                htmlCode={htmlCode}
                onCodeChange={setHtmlCode}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HtmlEditor;
