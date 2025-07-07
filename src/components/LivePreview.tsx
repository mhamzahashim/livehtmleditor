
import { useRef, useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import EditorToolbar from './EditorToolbar';

interface LivePreviewProps {
  htmlCode: string;
  onCodeChange: (newCode: string) => void;
}

const LivePreview = ({ htmlCode, onCodeChange }: LivePreviewProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [selectedText, setSelectedText] = useState('');

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (doc) {
        try {
          doc.open();
          doc.write(htmlCode || '<!DOCTYPE html><html><head></head><body></body></html>');
          doc.close();
          
          setupPreviewInteractivity(doc);
        } catch (error) {
          console.error('Error writing to iframe:', error);
        }
      }
    }
  }, [htmlCode]);

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
        
        // Update selected text
        const selection = doc.getSelection();
        if (selection && selection.toString()) {
          setSelectedText(selection.toString());
        }
      });
      
      // Handle content changes
      element.addEventListener('input', () => {
        updateHtmlCodePrecisely(doc, element);
      });
      
      // Handle text selection
      element.addEventListener('mouseup', () => {
        const selection = doc.getSelection();
        if (selection && selection.toString()) {
          setSelectedText(selection.toString());
        }
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
      // Create a temporary copy of the original HTML to work with
      const parser = new DOMParser();
      const originalDoc = parser.parseFromString(htmlCode, 'text/html');
      
      // Find the corresponding element in the original document
      const elementPath = getElementPath(changedElement, doc.body);
      const targetElement = getElementByPath(originalDoc.body, elementPath);
      
      if (targetElement && changedElement.textContent !== null) {
        // Update the content while preserving structure
        if (changedElement.innerHTML !== targetElement.innerHTML) {
          targetElement.innerHTML = changedElement.innerHTML;
          
          // Get the updated HTML
          const updatedHtml = originalDoc.documentElement.outerHTML;
          const cleanedHtml = cleanHtmlCode(updatedHtml);
          
          if (cleanedHtml !== htmlCode) {
            onCodeChange(cleanedHtml);
          }
        }
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

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="h-full flex flex-col">
      <EditorToolbar onInsertCode={handleToolbarInsert} selectedText={selectedText} />
      <div className="flex-1 p-4">
        <div className="h-full bg-white rounded-lg border border-slate-200 overflow-hidden shadow-inner">
          <iframe
            ref={iframeRef}
            onLoad={handleLoad}
            className="w-full h-full border-0"
            title="Live Preview"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
        <div className="mt-2 text-xs text-slate-500 text-center">
          Live preview • Click elements to select and edit • Changes sync back to code
        </div>
      </div>
    </div>
  );
};

export default LivePreview;
