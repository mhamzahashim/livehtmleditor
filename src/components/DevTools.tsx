
import { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
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

  // Mock console capture
  useEffect(() => {
    const newLog = {
      type: 'info',
      message: 'Preview updated',
      timestamp: new Date().toLocaleTimeString()
    };
    setConsoleLog(prev => [...prev.slice(-19), newLog]);
  }, [htmlCode]);

  // HTML Validation
  useEffect(() => {
    const errors: Array<{type: string, message: string, line?: number}> = [];
    
    // Basic HTML validation
    const lines = htmlCode.split('\n');
    lines.forEach((line, index) => {
      if (line.includes('<img') && !line.includes('alt=')) {
        errors.push({
          type: 'warning',
          message: 'Image missing alt attribute',
          line: index + 1
        });
      }
      
      if (line.includes('<a') && line.includes('href=""')) {
        errors.push({
          type: 'warning',
          message: 'Empty href attribute',
          line: index + 1
        });
      }
      
      // Check for unclosed tags (basic)
      const openTags = line.match(/<[^/][^>]*>/g) || [];
      const closeTags = line.match(/<\/[^>]*>/g) || [];
      
      if (openTags.length > closeTags.length) {
        const selfClosing = line.match(/<[^>]*\/>/g) || [];
        if (openTags.length - selfClosing.length > closeTags.length) {
          // This is a very basic check - might have false positives
        }
      }
    });
    
    setHtmlErrors(errors);
  }, [htmlCode]);

  // Performance Metrics
  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlCode, 'text/html');
    
    const domElements = doc.querySelectorAll('*').length;
    const scripts = doc.querySelectorAll('script').length;
    const styles = doc.querySelectorAll('style').length;
    const cssRules = Array.from(doc.querySelectorAll('style')).reduce((count, style) => {
      return count + (style.textContent?.split('{').length - 1 || 0);
    }, 0);
    
    setPerformanceMetrics({
      loadTime: Math.random() * 500 + 200, // Mock load time
      domElements,
      cssRules,
      scripts
    });
  }, [htmlCode]);

  // Accessibility Check
  useEffect(() => {
    const issues: Array<{type: string, message: string, severity: string}> = [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlCode, 'text/html');
    
    // Check for missing alt attributes
    const images = doc.querySelectorAll('img');
    images.forEach((img, index) => {
      if (!img.getAttribute('alt')) {
        issues.push({
          type: 'Missing Alt Text',
          message: `Image ${index + 1} is missing alt attribute`,
          severity: 'medium'
        });
      }
    });
    
    // Check for heading structure
    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headings.length === 0) {
      issues.push({
        type: 'Heading Structure',
        message: 'No headings found - consider adding heading structure',
        severity: 'low'
      });
    }
    
    // Check for form labels
    const inputs = doc.querySelectorAll('input');
    inputs.forEach((input, index) => {
      const id = input.getAttribute('id');
      if (id) {
        const label = doc.querySelector(`label[for="${id}"]`);
        if (!label) {
          issues.push({
            type: 'Form Labels',
            message: `Input ${index + 1} missing associated label`,
            severity: 'medium'
          });
        }
      }
    });
    
    // Check for color contrast (simplified)
    const elements = doc.querySelectorAll('*');
    let hasLowContrast = false;
    elements.forEach(el => {
      const style = el.getAttribute('style') || '';
      if (style.includes('color: #') && style.includes('background')) {
        // This is a simplified check - real contrast checking is more complex
        hasLowContrast = true;
      }
    });
    
    if (hasLowContrast) {
      issues.push({
        type: 'Color Contrast',
        message: 'Some elements may have low color contrast',
        severity: 'low'
      });
    }
    
    setAccessibilityIssues(issues);
  }, [htmlCode]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'default';
      default: return 'default';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
        <h3 className="text-sm font-semibold text-slate-800">Developer Tools</h3>
        <p className="text-xs text-slate-600 mt-1">Debug and analyze your code</p>
      </div>
      
      <Tabs defaultValue="console" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-4 m-2">
          <TabsTrigger value="console" className="text-xs">Console</TabsTrigger>
          <TabsTrigger value="validator" className="text-xs">HTML</TabsTrigger>
          <TabsTrigger value="performance" className="text-xs">Perf</TabsTrigger>
          <TabsTrigger value="accessibility" className="text-xs">A11y</TabsTrigger>
        </TabsList>
        
        <TabsContent value="console" className="flex-1 mt-0">
          <ScrollArea className="h-full p-3">
            <div className="space-y-2">
              {consoleLog.map((log, index) => (
                <div key={index} className={`text-xs p-2 rounded ${
                  log.type === 'error' ? 'bg-red-50 text-red-700' :
                  log.type === 'warning' ? 'bg-yellow-50 text-yellow-700' :
                  'bg-blue-50 text-blue-700'
                }`}>
                  <div className="flex justify-between items-start">
                    <span>{log.message}</span>
                    <span className="text-slate-500 ml-2">{log.timestamp}</span>
                  </div>
                </div>
              ))}
              {consoleLog.length === 0 && (
                <div className="text-xs text-slate-500 text-center py-4">
                  Console output will appear here
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="validator" className="flex-1 mt-0">
          <ScrollArea className="h-full p-3">
            <div className="space-y-2">
              {htmlErrors.length === 0 ? (
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  No HTML validation errors found
                </div>
              ) : (
                htmlErrors.map((error, index) => (
                  <div key={index} className={`text-xs p-2 rounded flex items-start gap-2 ${
                    error.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'
                  }`}>
                    <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <div>{error.message}</div>
                      {error.line && (
                        <div className="text-slate-500 mt-1">Line {error.line}</div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="performance" className="flex-1 mt-0">
          <div className="p-3 space-y-3">
            <Card className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">Load Time</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(performanceMetrics.loadTime)}ms
              </div>
            </Card>
            
            <div className="grid grid-cols-2 gap-2">
              <Card className="p-3">
                <div className="text-xs text-slate-600">DOM Elements</div>
                <div className="text-lg font-bold">{performanceMetrics.domElements}</div>
              </Card>
              
              <Card className="p-3">
                <div className="text-xs text-slate-600">CSS Rules</div>
                <div className="text-lg font-bold">{performanceMetrics.cssRules}</div>
              </Card>
              
              <Card className="p-3">
                <div className="text-xs text-slate-600">Scripts</div>
                <div className="text-lg font-bold">{performanceMetrics.scripts}</div>
              </Card>
              
              <Card className="p-3">
                <div className="text-xs text-slate-600">Score</div>
                <div className="text-lg font-bold text-green-600">95</div>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="accessibility" className="flex-1 mt-0">
          <ScrollArea className="h-full p-3">
            <div className="space-y-2">
              {accessibilityIssues.length === 0 ? (
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  No accessibility issues found
                </div>
              ) : (
                accessibilityIssues.map((issue, index) => (
                  <div key={index} className="text-xs p-2 rounded border border-slate-200">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="font-medium">{issue.type}</span>
                      <Badge variant={getSeverityColor(issue.severity) as any} className="text-xs">
                        {issue.severity}
                      </Badge>
                    </div>
                    <div className="text-slate-600">{issue.message}</div>
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
