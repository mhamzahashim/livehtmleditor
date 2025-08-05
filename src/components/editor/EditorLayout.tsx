import { Card } from '@/components/ui/card';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodeEditor from '../CodeEditor';
import LivePreview from '../LivePreview';
import CssEditor from '../CssEditor';
import JsEditor from '../JsEditor';
import DevTools from '../DevTools';
import WordCountDisplay from '../WordCountDisplay';

interface EditorLayoutProps {
  fullScreenPreview: boolean;
  activeEditor: string;
  previewKey: number;
  previewMode: string;
  zoomLevel: number;
  showDevTools: boolean;
  htmlCode: string;
  cssCode: string;
  jsCode: string;
  onActiveEditorChange: (editor: string) => void;
  onCodeChange: (code: string) => void;
  onCssChange: (css: string) => void;
  onJsChange: (js: string) => void;
  getPreviewWidth: () => string;
}

const EditorLayout = ({
  fullScreenPreview,
  activeEditor,
  previewKey,
  previewMode,
  zoomLevel,
  showDevTools,
  htmlCode,
  cssCode,
  jsCode,
  onActiveEditorChange,
  onCodeChange,
  onCssChange,
  onJsChange,
  getPreviewWidth,
}: EditorLayoutProps) => {
  if (fullScreenPreview) {
    return (
      <Card className="w-full h-full bg-white/90 backdrop-blur-sm border-slate-200/60 shadow-xl">
        <div className="h-full flex flex-col">
          <div className="p-3 lg:p-5 border-b border-slate-200/60 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h2 className="text-lg font-semibold text-slate-800">Full Screen Preview</h2>
          </div>
          <div className="flex-1" style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left' }}>
            <LivePreview
              key={previewKey}
              htmlCode={htmlCode}
              onCodeChange={onCodeChange}
              previewWidth="100%"
              cssCode={cssCode}
              jsCode={jsCode}
            />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <>
      {/* Desktop Layout */}
      <ResizablePanelGroup direction="horizontal" className="flex-1 hidden lg:flex">
        {/* Code Editor Side */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <Card className="h-full bg-white/90 backdrop-blur-sm border-slate-200/60 shadow-xl">
            <div className="h-full flex flex-col">
              <Tabs value={activeEditor} onValueChange={onActiveEditorChange} className="h-full flex flex-col">
              <div className="p-3 lg:p-5 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-blue-50">
                <div className="flex items-center justify-between mb-3">
                  <TabsList className="grid w-full grid-cols-3 max-w-md">
                    <TabsTrigger value="html">HTML</TabsTrigger>
                    <TabsTrigger value="css">CSS</TabsTrigger>
                    <TabsTrigger value="js">JavaScript</TabsTrigger>
                  </TabsList>
                  <WordCountDisplay htmlContent={htmlCode} />
                </div>
              </div>
                
                <TabsContent value="html" className="flex-1 mt-0">
                  <CodeEditor
                    value={htmlCode}
                    onChange={onCodeChange}
                    language="html"
                  />
                </TabsContent>
                
                <TabsContent value="css" className="flex-1 mt-0">
                  <CssEditor
                    value={cssCode}
                    onChange={onCssChange}
                  />
                </TabsContent>
                
                <TabsContent value="js" className="flex-1 mt-0">
                  <JsEditor
                    value={jsCode}
                    onChange={onJsChange}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </Card>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Live Preview Side */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <Card className="h-full bg-white/90 backdrop-blur-sm border-slate-200/60 shadow-xl">
            <div className="h-full flex flex-col">
              <div className="p-3 lg:p-5 border-b border-slate-200/60 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">Live Preview</h2>
                    <p className="text-sm text-slate-600 mt-1">
                      {previewMode.charAt(0).toUpperCase() + previewMode.slice(1)} view • 
                      Click elements to edit • Changes sync to code
                    </p>
                  </div>
                  <WordCountDisplay htmlContent={htmlCode} />
                </div>
              </div>
              <div className="flex-1" style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left' }}>
                <LivePreview
                  key={previewKey}
                  htmlCode={htmlCode}
                  onCodeChange={onCodeChange}
                  previewWidth={getPreviewWidth()}
                  cssCode={cssCode}
                  jsCode={jsCode}
                />
              </div>
            </div>
          </Card>
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Mobile Layout */}
      <div className="flex-1 lg:hidden space-y-4">
        <Card className="bg-white/90 backdrop-blur-sm border-slate-200/60 shadow-xl">
          <div className="flex flex-col">
            <Tabs value={activeEditor} onValueChange={onActiveEditorChange} className="flex flex-col">
              <div className="p-3 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-blue-50">
                <div className="flex items-center justify-between mb-3">
                  <TabsList className="grid w-full grid-cols-3 max-w-md">
                    <TabsTrigger value="html">HTML</TabsTrigger>
                    <TabsTrigger value="css">CSS</TabsTrigger>
                    <TabsTrigger value="js">JavaScript</TabsTrigger>
                  </TabsList>
                  <WordCountDisplay htmlContent={htmlCode} />
                </div>
              </div>
              
              <TabsContent value="html" className="mt-0">
                <div className="h-64">
                  <CodeEditor
                    value={htmlCode}
                    onChange={onCodeChange}
                    language="html"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="css" className="mt-0">
                <div className="h-64">
                  <CssEditor
                    value={cssCode}
                    onChange={onCssChange}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="js" className="mt-0">
                <div className="h-64">
                  <JsEditor
                    value={jsCode}
                    onChange={onJsChange}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border-slate-200/60 shadow-xl">
          <div className="flex flex-col h-96">
            <div className="p-3 border-b border-slate-200/60 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">Live Preview</h2>
                  <p className="text-sm text-slate-600 mt-1">
                    {previewMode.charAt(0).toUpperCase() + previewMode.slice(1)} view • 
                    Click elements to edit
                  </p>
                </div>
                <WordCountDisplay htmlContent={htmlCode} />
              </div>
            </div>
            <div className="flex-1" style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left' }}>
              <LivePreview
                key={previewKey}
                htmlCode={htmlCode}
                onCodeChange={onCodeChange}
                previewWidth={getPreviewWidth()}
                cssCode={cssCode}
                jsCode={jsCode}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Dev Tools Sidebar */}
      {showDevTools && (
        <Card className="w-80 bg-white/90 backdrop-blur-sm border-slate-200/60 shadow-xl">
          <DevTools htmlCode={htmlCode} />
        </Card>
      )}
    </>
  );
};

export default EditorLayout;