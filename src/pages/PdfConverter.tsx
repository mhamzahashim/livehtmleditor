import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import PdfConverterEditor from '@/components/pdf/PdfConverterEditor';
import PdfPreview from '@/components/pdf/PdfPreview';
import PdfSettings from '@/components/pdf/PdfSettings';
import TemplateLibrary from '@/components/pdf/TemplateLibrary';

export interface PdfSettings {
  pageSize: 'A4' | 'A3' | 'Letter' | 'Legal';
  orientation: 'portrait' | 'landscape';
  margin: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  quality: 'low' | 'medium' | 'high';
  includeCSS: boolean;
}

const defaultSettings: PdfSettings = {
  pageSize: 'A4',
  orientation: 'portrait',
  margin: { top: 20, bottom: 20, left: 20, right: 20 },
  quality: 'medium',
  includeCSS: true,
};

const PdfConverter = () => {
  const [htmlContent, setHtmlContent] = useState('<h1>Welcome to PDF Converter</h1>\n<p>Start typing your HTML content here...</p>');
  const [settings, setSettings] = useState<PdfSettings>(defaultSettings);
  const [activeTab, setActiveTab] = useState('editor');

  const handleTemplateSelect = (templateHtml: string) => {
    setHtmlContent(templateHtml);
    setActiveTab('editor');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            HTML to PDF Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert your HTML content to high-quality PDF documents with customizable settings and live preview.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="url">From URL</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-6">
            <TemplateLibrary onSelectTemplate={handleTemplateSelect} />
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload HTML File</CardTitle>
                <CardDescription>
                  Upload an HTML file from your computer to convert to PDF
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <p className="text-muted-foreground">Drag & drop HTML files here or click to browse</p>
                  <input
                    type="file"
                    accept=".html,.htm"
                    className="mt-4"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          setHtmlContent(event.target?.result as string);
                          setActiveTab('editor');
                        };
                        reader.readAsText(file);
                      }
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="url" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Convert from URL</CardTitle>
                <CardDescription>
                  Enter a website URL to convert to PDF
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">URL conversion feature coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="editor" className="space-y-6">
            <ResizablePanelGroup direction="horizontal" className="min-h-[600px] border rounded-lg">
              <ResizablePanel defaultSize={30} minSize={25}>
                <div className="h-full p-4">
                  <PdfSettings settings={settings} onSettingsChange={setSettings} />
                </div>
              </ResizablePanel>
              
              <ResizableHandle withHandle />
              
              <ResizablePanel defaultSize={40} minSize={30}>
                <div className="h-full">
                  <PdfConverterEditor
                    htmlContent={htmlContent}
                    onContentChange={setHtmlContent}
                  />
                </div>
              </ResizablePanel>
              
              <ResizableHandle withHandle />
              
              <ResizablePanel defaultSize={30} minSize={25}>
                <div className="h-full">
                  <PdfPreview
                    htmlContent={htmlContent}
                    settings={settings}
                  />
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PdfConverter;