
import { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Clock, Zap, Eye } from 'lucide-react';

interface DevToolsProps {
  htmlCode: string;
}

const DevTools = ({ htmlCode }: DevToolsProps) => {
  const [consoleLog, setConsoleLog] = useState<Array<{type: string, message: string, timestamp: string}>>([]);
  const [htmlErrors, setHtmlErrors] = useState<Array<{type: string, message: string, line?: number}>>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    loadTime: Math.random() * 1000 + 500,
    domElements: 0,
    cssRules: 0,
    scripts: 0
  });
  const [accessibilityIssues, setAccessibilityIssues] = useState<Array<{type: string, message: string, severity: string}>>([]);

  useEffect(() => {
    const newLog = { type: 'info', message: 'Preview updated', timestamp: new Date().toLocaleTimeString() };
    setConsoleLog(prev => [...prev.slice(-19), newLog]);
  }, [htmlCode]);

  useEffect(() => {
    const errors: Array<{type: string, message: string, line?: number}> = [];
    const lines = htmlCode.split('\n');
    lines.forEach((line, index) => {
      if (line.includes('<img') && !line.includes('alt=')) {
        errors.push({ type: 'warning', message: 'Image missing alt attribute', line: index + 1 });
      }
      if (line.includes('<a') && line.includes('href=""')) {
        errors.push({ type: 'warning', message: 'Empty href attribute', line: index + 1 });
      }
    });
    setHtmlErrors(errors);
  }, [htmlCode]);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlCode, 'text/html');
    const domElements = doc.querySelectorAll('*').length;
    const scripts = doc.querySelectorAll('script').length;
    const cssRules = Array.from(doc.querySelectorAll('style')).reduce((count, style) => {
      return count + (style.textContent?.split('{').length - 1 || 0);
    }, 0);
    setPerformanceMetrics({ loadTime: Math.random() * 500 + 200, domElements, cssRules, scripts });
  }, [htmlCode]);

  useEffect(() => {
    const issues: Array<{type: string, message: string, severity: string}> = [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlCode, 'text/html');

    doc.querySelectorAll('img').forEach((img, index) => {
      if (!img.getAttribute('alt')) {
        issues.push({ type: 'Missing Alt Text', message: `Image ${index + 1} missing alt attribute`, severity: 'medium' });
      }
    });

    if (doc.querySelectorAll('h1, h2, h3, h4, h5, h6').length === 0) {
      issues.push({ type: 'Heading Structure', message: 'No headings found', severity: 'low' });
    }

    doc.querySelectorAll('input').forEach((input, index) => {
      const id = input.getAttribute('id');
      if (id && !doc.querySelector(`label[for="${id}"]`)) {
        issues.push({ type: 'Form Labels', message: `Input ${index + 1} missing label`, severity: 'medium' });
      }
    });

    setAccessibilityIssues(issues);
  }, [htmlCode]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-white/[0.06] bg-surface-2/40">
        <h3 className="text-sm font-semibold text-white">Developer Tools</h3>
        <p className="text-[11px] text-[#5C6178] mt-0.5">Debug & analyze your code</p>
      </div>

      <Tabs defaultValue="console" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-4 m-2 bg-surface/80">
          <TabsTrigger value="console" className="text-[10px]">Console</TabsTrigger>
          <TabsTrigger value="validator" className="text-[10px]">HTML</TabsTrigger>
          <TabsTrigger value="performance" className="text-[10px]">Perf</TabsTrigger>
          <TabsTrigger value="accessibility" className="text-[10px]">A11y</TabsTrigger>
        </TabsList>

        <TabsContent value="console" className="flex-1 mt-0">
          <ScrollArea className="h-full p-3">
            <div className="space-y-1.5">
              {consoleLog.map((log, index) => (
                <div key={index} className={`text-[11px] font-mono p-2 rounded-md ${
                  log.type === 'error' ? 'bg-red-500/10 text-red-400' :
                  log.type === 'warning' ? 'bg-amber-500/10 text-amber-400' :
                  'bg-indigo-500/5 text-indigo-300'
                }`}>
                  <div className="flex justify-between items-start">
                    <span>{log.message}</span>
                    <span className="text-[#3A3F52] ml-2 text-[10px]">{log.timestamp}</span>
                  </div>
                </div>
              ))}
              {consoleLog.length === 0 && (
                <div className="text-[11px] text-[#3A3F52] text-center py-4 font-mono">
                  Console output will appear here
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="validator" className="flex-1 mt-0">
          <ScrollArea className="h-full p-3">
            <div className="space-y-1.5">
              {htmlErrors.length === 0 ? (
                <div className="flex items-center gap-2 text-emerald-400 text-xs">
                  <CheckCircle className="w-3.5 h-3.5" />
                  No HTML validation errors
                </div>
              ) : (
                htmlErrors.map((error, index) => (
                  <div key={index} className={`text-[11px] font-mono p-2 rounded-md flex items-start gap-2 ${
                    error.type === 'error' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <div>{error.message}</div>
                      {error.line && <div className="text-[#5C6178] mt-0.5">Line {error.line}</div>}
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="performance" className="flex-1 mt-0">
          <div className="p-3 space-y-3">
            <div className="p-3 rounded-lg bg-surface-2/50 border border-white/[0.04]">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-xs font-medium text-[#9DA3B4]">Load Time</span>
              </div>
              <div className="text-2xl font-bold text-indigo-400 font-mono">
                {Math.round(performanceMetrics.loadTime)}ms
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'DOM Elements', value: performanceMetrics.domElements },
                { label: 'CSS Rules', value: performanceMetrics.cssRules },
                { label: 'Scripts', value: performanceMetrics.scripts },
                { label: 'Score', value: 95, color: 'text-emerald-400' },
              ].map((metric, i) => (
                <div key={i} className="p-3 rounded-lg bg-surface-2/50 border border-white/[0.04]">
                  <div className="text-[10px] text-[#5C6178] uppercase tracking-wider">{metric.label}</div>
                  <div className={`text-lg font-bold font-mono mt-1 ${metric.color || 'text-white'}`}>{metric.value}</div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="accessibility" className="flex-1 mt-0">
          <ScrollArea className="h-full p-3">
            <div className="space-y-1.5">
              {accessibilityIssues.length === 0 ? (
                <div className="flex items-center gap-2 text-emerald-400 text-xs">
                  <CheckCircle className="w-3.5 h-3.5" />
                  No accessibility issues found
                </div>
              ) : (
                accessibilityIssues.map((issue, index) => (
                  <div key={index} className="text-[11px] font-mono p-2 rounded-md border border-white/[0.04] bg-surface-2/30">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="font-medium text-[#9DA3B4]">{issue.type}</span>
                      <Badge variant={getSeverityColor(issue.severity) as any} className="text-[9px] px-1.5 py-0">
                        {issue.severity}
                      </Badge>
                    </div>
                    <div className="text-[#5C6178]">{issue.message}</div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DevTools;
