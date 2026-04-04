import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import PdfConverterEditor from '@/components/pdf/PdfConverterEditor';
import PdfSettings from '@/components/pdf/PdfSettings';
import TemplateLibrary from '@/components/pdf/TemplateLibrary';

export interface PdfSettings { pageSize: 'A4' | 'A3' | 'Letter' | 'Legal'; orientation: 'portrait' | 'landscape'; margin: { top: number; bottom: number; left: number; right: number }; quality: 'low' | 'medium' | 'high'; includeCSS: boolean; }

const PdfConverter = () => {
  const [htmlContent, setHtmlContent] = useState('<h1>Welcome to PDF Converter</h1>\n<p>Start typing your HTML content here...</p>');
  const [settings, setSettings] = useState<PdfSettings>({ pageSize: 'A4', orientation: 'portrait', margin: { top: 20, bottom: 20, left: 20, right: 20 }, quality: 'medium', includeCSS: true });
  const [activeTab, setActiveTab] = useState('editor');

  return (
    <div className="min-h-screen dot-grid">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4" style={{ letterSpacing: '-0.02em' }}>HTML to PDF Converter</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Convert HTML to high-quality PDF documents with customizable settings and live preview.</p>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6"><TabsTrigger value="editor">Editor</TabsTrigger><TabsTrigger value="templates">Templates</TabsTrigger><TabsTrigger value="upload">Upload</TabsTrigger><TabsTrigger value="url">From URL</TabsTrigger></TabsList>
          <TabsContent value="templates"><TemplateLibrary onSelectTemplate={h => { setHtmlContent(h); setActiveTab('editor'); }} /></TabsContent>
          <TabsContent value="upload"><Card><CardHeader><CardTitle>Upload HTML File</CardTitle><CardDescription>Upload an HTML file to convert</CardDescription></CardHeader><CardContent><div className="border-2 border-dashed border-border rounded-xl p-8 text-center"><p className="text-muted-foreground">Drag & drop or click to browse</p><input type="file" accept=".html,.htm" className="mt-4" onChange={e => { const f = e.target.files?.[0]; if (f) { const r = new FileReader(); r.onload = ev => { setHtmlContent(ev.target?.result as string); setActiveTab('editor'); }; r.readAsText(f); } }} /></div></CardContent></Card></TabsContent>
          <TabsContent value="url"><Card><CardHeader><CardTitle>Convert from URL</CardTitle><CardDescription>Enter a website URL</CardDescription></CardHeader><CardContent><p className="text-muted-foreground">Coming soon...</p></CardContent></Card></TabsContent>
          <TabsContent value="editor"><ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-xl border border-border shadow-warm-sm"><ResizablePanel defaultSize={30} minSize={25}><div className="h-full p-4"><PdfSettings settings={settings} onSettingsChange={setSettings} /></div></ResizablePanel><ResizableHandle withHandle /><ResizablePanel defaultSize={70} minSize={50}><PdfConverterEditor htmlContent={htmlContent} onContentChange={setHtmlContent} /></ResizablePanel></ResizablePanelGroup></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PdfConverter;
