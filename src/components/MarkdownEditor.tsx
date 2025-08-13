import React, { useCallback, useMemo, useRef, useState } from "react";
import TurndownService from "turndown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useToast } from "@/hooks/use-toast";
import { Download, ClipboardCopy, Trash2, RefreshCw, Rocket } from "lucide-react";

const MarkdownEditor: React.FC = () => {
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [auto, setAuto] = useState(true);
  const pasteHandledRef = useRef(false);

  const turndown = useMemo(() => {
    const td = new TurndownService({
      headingStyle: "atx",
      codeBlockStyle: "fenced",
      bulletListMarker: "-",
      emDelimiter: "_",
    });
    return td;
  }, []);

  const convertToMarkdown = useCallback(
    (raw: string) => {
      try {
        // Always try converting as HTML; plain text will pass through
        const md = turndown.turndown(raw);
        return md;
      } catch (e) {
        // Fallback: return as-is
        return raw;
      }
    },
    [turndown]
  );

  const handleConvert = useCallback(() => {
    const md = convertToMarkdown(input);
    setMarkdown(md);
    toast({ title: "Converted", description: "Content converted to Markdown." });
  }, [convertToMarkdown, input, toast]);

  const handleInputChange = (val: string) => {
    setInput(val);
    if (auto) setMarkdown(convertToMarkdown(val));
  };

  const handlePaste: React.ClipboardEventHandler<HTMLTextAreaElement> = (e) => {
    const html = e.clipboardData.getData("text/html");
    const text = e.clipboardData.getData("text/plain");

    // Prevent double handling on some browsers
    if (pasteHandledRef.current) {
      pasteHandledRef.current = false;
      return;
    }

    if (html && html.length > (text?.length || 0)) {
      e.preventDefault();
      setInput(html);
      const md = convertToMarkdown(html);
      setMarkdown(md);
      pasteHandledRef.current = true;
      toast({
        title: "HTML pasted",
        description: "We detected HTML and converted it to Markdown.",
      });
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      toast({ title: "Copied", description: "Markdown copied to clipboard." });
    } catch {
      toast({ title: "Copy failed", description: "Unable to copy.", variant: "destructive" });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setInput("");
    setMarkdown("");
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="gap-2">
        <CardTitle className="flex items-center justify-between">
          <span>Markdown Editor</span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Switch id="auto" checked={auto} onCheckedChange={setAuto} />
              <Label htmlFor="auto">Auto convert</Label>
            </div>
            <Separator orientation="vertical" className="h-6" />
            <Button variant="outline" size="sm" onClick={handleConvert}>
              <Rocket className="mr-2 h-4 w-4" /> Convert
            </Button>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <ClipboardCopy className="mr-2 h-4 w-4" /> Copy MD
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
            <Button variant="ghost" size="sm" onClick={handleClear}>
              <Trash2 className="mr-2 h-4 w-4" /> Clear
            </Button>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ResizablePanelGroup direction="horizontal" className="rounded-md border">
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full flex flex-col">
              <div className="px-3 py-2 text-sm text-muted-foreground flex items-center justify-between border-b">
                <span>Input (Paste HTML or type text)</span>
                <Button variant="ghost" size="icon" onClick={() => setInput("")}> 
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-3">
                <Textarea
                  value={input}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onPaste={handlePaste}
                  className="min-h-[320px] font-mono"
                  placeholder="Paste HTML or write here..."
                />
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50} minSize={30}>
            <Tabs defaultValue="markdown" className="h-full flex flex-col">
              <div className="px-3 py-2 border-b">
                <TabsList>
                  <TabsTrigger value="markdown">Markdown</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="markdown" className="flex-1 overflow-auto p-3">
                <Textarea
                  value={markdown}
                  onChange={(e) => setMarkdown(e.target.value)}
                  className="min-h-[320px] font-mono"
                  placeholder="Converted Markdown will appear here..."
                />
              </TabsContent>
              <TabsContent value="preview" className="flex-1 overflow-auto p-4">
                <div className="prose prose-slate max-w-none dark:prose-invert">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
                </div>
              </TabsContent>
            </Tabs>
          </ResizablePanel>
        </ResizablePanelGroup>
      </CardContent>
    </Card>
  );
};

export default MarkdownEditor;
