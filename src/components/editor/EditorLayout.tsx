import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodeEditor from '../CodeEditor';
import LivePreview from '../LivePreview';
import CssEditor from '../CssEditor';
import JsEditor from '../JsEditor';
import DevTools from '../DevTools';
import WordCountDisplay from '../WordCountDisplay';

interface EditorLayoutProps {
  fullScreenPreview: boolean; activeEditor: string; previewKey: number; previewMode: string;
  zoomLevel: number; showDevTools: boolean; htmlCode: string; cssCode: string; jsCode: string;
  onActiveEditorChange: (editor: string) => void; onCodeChange: (code: string) => void;
  onCssChange: (css: string) => void; onJsChange: (js: string) => void; getPreviewWidth: () => string;
}

const PanelShell = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`h-full rounded-xl border border-border bg-white shadow-warm-sm overflow-hidden ${className}`}>
    {children}
  </div>
);

const EditorLayout = ({
  fullScreenPreview, activeEditor, previewKey, previewMode, zoomLevel, showDevTools,
  htmlCode, cssCode, jsCode, onActiveEditorChange, onCodeChange, onCssChange, onJsChange, getPreviewWidth,
}: EditorLayoutProps) => {
  if (fullScreenPreview) {
    return (
      <PanelShell className="w-full">
        <div className="h-full flex flex-col">
          <div className="px-4 py-3 border-b border-border bg-background flex items-center gap-2">
            <div className="live-dot" />
            <h2 className="text-sm font-semibold text-foreground">Full Screen Preview</h2>
          </div>
          <div className="flex-1" style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left' }}>
            <LivePreview key={previewKey} htmlCode={htmlCode} onCodeChange={onCodeChange} previewWidth="100%" cssCode={cssCode} jsCode={jsCode} />
          </div>
        </div>
      </PanelShell>
    );
  }

  return (
    <>
      <ResizablePanelGroup direction="horizontal" className="flex-1 hidden lg:flex">
        <ResizablePanel defaultSize={50} minSize={30}>
          <PanelShell>
            <div className="h-full flex flex-col">
              <Tabs value={activeEditor} onValueChange={onActiveEditorChange} className="editor-tabs h-full flex flex-col">
                <div className="px-4 py-3 border-b border-border bg-background">
                  <div className="flex items-center justify-between">
                    <TabsList className="grid w-full grid-cols-3 max-w-[280px]">
                      <TabsTrigger value="html">HTML</TabsTrigger>
                      <TabsTrigger value="css">CSS</TabsTrigger>
                      <TabsTrigger value="js">JS</TabsTrigger>
                    </TabsList>
                    <WordCountDisplay htmlContent={htmlCode} />
                  </div>
                </div>
                <TabsContent value="html" className="flex-1 mt-0"><CodeEditor value={htmlCode} onChange={onCodeChange} language="html" /></TabsContent>
                <TabsContent value="css" className="flex-1 mt-0"><CssEditor value={cssCode} onChange={onCssChange} /></TabsContent>
                <TabsContent value="js" className="flex-1 mt-0"><JsEditor value={jsCode} onChange={onJsChange} /></TabsContent>
              </Tabs>
            </div>
          </PanelShell>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} minSize={30}>
          <PanelShell>
            <div className="h-full flex flex-col">
              <div className="px-4 py-3 border-b border-border bg-background">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="live-dot" />
                    <div>
                      <h2 className="text-sm font-semibold text-foreground">Live Preview</h2>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{previewMode.charAt(0).toUpperCase() + previewMode.slice(1)} &middot; Click to edit &middot; Syncs to code</p>
                    </div>
                  </div>
                  <WordCountDisplay htmlContent={htmlCode} />
                </div>
              </div>
              <div className="flex-1" style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left' }}>
                <LivePreview key={previewKey} htmlCode={htmlCode} onCodeChange={onCodeChange} previewWidth={getPreviewWidth()} cssCode={cssCode} jsCode={jsCode} />
              </div>
            </div>
          </PanelShell>
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Mobile */}
      <div className="flex-1 lg:hidden space-y-4">
        <PanelShell>
          <Tabs value={activeEditor} onValueChange={onActiveEditorChange} className="editor-tabs flex flex-col">
            <div className="px-4 py-3 border-b border-border bg-background">
              <div className="flex items-center justify-between">
                <TabsList className="grid w-full grid-cols-3 max-w-[280px]"><TabsTrigger value="html">HTML</TabsTrigger><TabsTrigger value="css">CSS</TabsTrigger><TabsTrigger value="js">JS</TabsTrigger></TabsList>
                <WordCountDisplay htmlContent={htmlCode} />
              </div>
            </div>
            <TabsContent value="html" className="mt-0"><div className="h-64"><CodeEditor value={htmlCode} onChange={onCodeChange} language="html" /></div></TabsContent>
            <TabsContent value="css" className="mt-0"><div className="h-64"><CssEditor value={cssCode} onChange={onCssChange} /></div></TabsContent>
            <TabsContent value="js" className="mt-0"><div className="h-64"><JsEditor value={jsCode} onChange={onJsChange} /></div></TabsContent>
          </Tabs>
        </PanelShell>
        <PanelShell>
          <div className="flex flex-col h-96">
            <div className="px-4 py-3 border-b border-border bg-background">
              <div className="flex items-center gap-2.5"><div className="live-dot" /><h2 className="text-sm font-semibold text-foreground">Live Preview</h2></div>
            </div>
            <div className="flex-1" style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left' }}>
              <LivePreview key={previewKey} htmlCode={htmlCode} onCodeChange={onCodeChange} previewWidth={getPreviewWidth()} cssCode={cssCode} jsCode={jsCode} />
            </div>
          </div>
        </PanelShell>
      </div>

      {showDevTools && (
        <div className="w-80 rounded-xl border border-border bg-white shadow-warm-sm overflow-hidden">
          <DevTools htmlCode={htmlCode} />
        </div>
      )}
    </>
  );
};

export default EditorLayout;
