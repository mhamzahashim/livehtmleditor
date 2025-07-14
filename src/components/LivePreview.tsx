
import { useRef, useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import EditorToolbar from './EditorToolbar';

interface LivePreviewProps {
  htmlCode: string;
  onCodeChange: (newCode: string) => void;
  previewWidth?: string;
  cssCode?: string;
  jsCode?: string;
}

const LivePreview = ({ htmlCode, onCodeChange, previewWidth = '100%', cssCode = '', jsCode = '' }: LivePreviewProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [selectedText, setSelectedText] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (doc) {
        try {
          doc.open();
          // Create a minimal HTML structure and inject the content, CSS, and JS
          const fullHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>${cssCode}</style><script>${jsCode}</script></head><body>${htmlCode || ''}</body></html>`;
          doc.write(fullHtml);
          doc.close();
          
          setupPreviewInteractivity(doc);
        } catch (error) {
          console.error('Error writing to iframe:', error);
        }
      }
    }
  }, [htmlCode, cssCode, jsCode]);

  const setupPreviewInteractivity = (doc: Document) => {
    // Add styling for interactive elements
    const style = doc.createElement('style');
    style.textContent = `
      body {
        margin: 20px;
        font-family: Arial, sans-serif;
      }
      .editable-selected {
        outline: 2px solid #4299e1 !important;
        outline-offset: 2px;
        position: relative;
      }
      .editable-hover {
        outline: 1px dashed #4299e1 !important;
        outline-offset: 2px;
        cursor: pointer;
      }
      [contenteditable="true"] {
        min-height: 1em;
      }
      .editable-selected::after {
        content: 'Click to edit';
        position: absolute;
        top: -25px;
        left: 0;
        background: #4299e1;
        color: white;
        padding: 2px 6px;
        font-size: 11px;
        border-radius: 3px;
        white-space: nowrap;
        z-index: 1000;
      }
    `;
    if (doc.head) {
      doc.head.appendChild(style);
    }

    // Make all text elements editable and add event listeners
    const textElements = doc.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div, li, td, th, blockquote');
    textElements.forEach((element) => {
      element.setAttribute('contenteditable', 'true');
      
      // Add hover effects
      element.addEventListener('mouseenter', () => {
        if (element !== selectedElement) {
          element.classList.add('editable-hover');
        }
      });
      
      element.addEventListener('mouseleave', () => {
        element.classList.remove('editable-hover');
      });
      
      // Handle selection
      element.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Remove previous selection
        if (selectedElement) {
          selectedElement.classList.remove('editable-selected');
        }
        
        // Add new selection
        element.classList.add('editable-selected');
        element.classList.remove('editable-hover');
        setSelectedElement(element);
        
        // Focus on the element for immediate editing
        (element as HTMLElement).focus();
        
        // Update selected text
        const selection = doc.getSelection();
        if (selection && selection.toString()) {
          setSelectedText(selection.toString());
        }
      });
      
      // Handle content changes - Fix for deselection issue
      let isComposing = false;
      
      element.addEventListener('compositionstart', () => {
        isComposing = true;
      });
      
      element.addEventListener('compositionend', () => {
        isComposing = false;
        updateHtmlCodePrecisely(doc, element);
      });
      
      element.addEventListener('input', (e) => {
        if (!isComposing) {
          // Debounce the update to prevent constant re-rendering
          clearTimeout((element as any).updateTimeout);
          (element as any).updateTimeout = setTimeout(() => {
            updateHtmlCodePrecisely(doc, element);
          }, 300);
        }
      });
      
      // Handle text selection without triggering update
      element.addEventListener('mouseup', (e) => {
        e.stopPropagation();
        const selection = doc.getSelection();
        if (selection && selection.toString()) {
          setSelectedText(selection.toString());
        }
      });
      
      // Prevent losing focus on keydown
      element.addEventListener('keydown', (e) => {
        e.stopPropagation();
        // Allow normal text editing without interference
      });
    });

    // Handle clicks outside elements to deselect
    doc.addEventListener('click', (e) => {
      if (!e.target || !(e.target as Element).closest('[contenteditable="true"]')) {
        if (selectedElement) {
          selectedElement.classList.remove('editable-selected');
          setSelectedElement(null);
        }
      }
    });
  };

  const updateHtmlCodePrecisely = (doc: Document, changedElement: Element) => {
    try {
      // Only save the body content, not the full HTML structure
      const bodyContent = doc.body.innerHTML;
      const cleanedContent = cleanHtmlCode(bodyContent);
      
      if (cleanedContent !== htmlCode) {
        onCodeChange(cleanedContent);
      }
    } catch (error) {
      console.error('Error updating HTML code precisely:', error);
    }
  };

  const getElementPath = (element: Element, root: Element | null): number[] => {
    const path: number[] = [];
    let current = element;
    
    while (current && current !== root && current.parentElement) {
      const parent = current.parentElement;
      const index = Array.from(parent.children).indexOf(current);
      path.unshift(index);
      current = parent;
    }
    
    return path;
  };

  const getElementByPath = (root: Element | null, path: number[]): Element | null => {
    let current = root;
    
    for (const index of path) {
      if (!current || !current.children[index]) {
        return null;
      }
      current = current.children[index];
    }
    
    return current;
  };

  const cleanHtmlCode = (html: string): string => {
    return html
      .replace(/\scontenteditable="true"/g, '')
      .replace(/\sclass="[^"]*editable-[^"]*[^"]*"/g, '')
      .replace(/\sclass=""/g, '');
  };

  const handleToolbarInsert = (code: string) => {
    if (!selectedElement) {
      toast({
        title: "No element selected",
        description: "Please click on an element in the preview to select it first.",
      });
      return;
    }

    const doc = iframeRef.current?.contentDocument;
    if (!doc) return;

    try {
      // Handle different types of insertions based on the selected element
      if (selectedText) {
        // Replace selected text
        const selection = doc.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          range.deleteContents();
          
          const tempDiv = doc.createElement('div');
          tempDiv.innerHTML = code;
          
          while (tempDiv.firstChild) {
            range.insertNode(tempDiv.firstChild);
          }
          
          selection.removeAllRanges();
        }
      } else {
        // Insert at the end of the selected element
        const tempDiv = doc.createElement('div');
        tempDiv.innerHTML = code;
        
        while (tempDiv.firstChild) {
          selectedElement.appendChild(tempDiv.firstChild);
        }
      }
      
      // Update the HTML code
      updateHtmlCodePrecisely(doc, selectedElement);
      setSelectedText('');
    } catch (error) {
      console.error('Error inserting code:', error);
      toast({
        title: "Error",
        description: "Failed to insert content. Please try again.",
      });
    }
  };

  const handleCopyContent = async () => {
    try {
      const doc = iframeRef.current?.contentDocument;
      if (!doc) return;
      
      const bodyContent = doc.body.innerHTML;
      const cleanedContent = cleanHtmlCode(bodyContent);
      
      await navigator.clipboard.writeText(cleanedContent);
      toast({
        title: "Content copied!",
        description: "HTML content has been copied to your clipboard.",
      });
    } catch (error) {
      console.error('Failed to copy content:', error);
      toast({
        title: "Copy failed",
        description: "Unable to copy content to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const getDeviceFrame = (width: string) => {
    if (width === '375px') {
      return {
        containerClass: 'mx-auto bg-black rounded-[2rem] p-2 max-w-fit',
        iframeClass: 'rounded-[1.5rem] bg-white',
        style: { width: '375px', height: '667px' }
      };
    } else if (width === '768px') {
      return {
        containerClass: 'mx-auto bg-black rounded-[1.5rem] p-3 max-w-fit',
        iframeClass: 'rounded-[1rem] bg-white',
        style: { width: '768px', height: '1024px' }
      };
    }
    return {
      containerClass: 'w-full h-full',
      iframeClass: 'bg-white border-0',
      style: { width: '100%', height: '100%' }
    };
  };

  const deviceFrame = getDeviceFrame(previewWidth);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50 px-3 py-2">
        <div className="flex-1">
          <EditorToolbar onInsertCode={handleToolbarInsert} selectedText={selectedText} />
        </div>
        <Button
          onClick={handleCopyContent}
          variant="outline"
          size="sm"
          className="ml-2 gap-2"
        >
          <Copy className="w-4 h-4" />
          Copy Output
        </Button>
      </div>
      <div className={`flex-1 ${previewWidth === '100%' ? 'p-0' : 'p-4'}`}>
        <div 
          ref={containerRef}
          className={`h-full ${previewWidth === '100%' ? 'overflow-hidden' : 'overflow-auto'} ${deviceFrame.containerClass}`}
          style={previewWidth === '100%' ? { width: '100%', height: '100%' } : deviceFrame.style}
        >
          <iframe
            ref={iframeRef}
            onLoad={handleLoad}
            className={`border-0 ${deviceFrame.iframeClass}`}
            title="Live Preview"
            sandbox="allow-scripts allow-same-origin"
            style={{ 
              width: '100%',
              height: '100%',
              minHeight: previewWidth === '100%' ? '100vh' : '600px'
            }}
          />
        </div>
        {previewWidth !== '100%' && (
          <div className="mt-2 text-xs text-slate-500 text-center">
            Live preview • Click elements to select and edit • Changes sync back to code
          </div>
        )}
      </div>
    </div>
  );
};

export default LivePreview;
