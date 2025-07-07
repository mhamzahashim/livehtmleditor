
import { useRef, useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';

interface LivePreviewProps {
  htmlCode: string;
  onCodeChange: (newCode: string) => void;
}

const LivePreview = ({ htmlCode, onCodeChange }: LivePreviewProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (iframeRef.current && isLoaded) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (doc) {
        doc.open();
        doc.write(htmlCode);
        doc.close();
        
        // Add event listeners for content editing
        setupContentEditing(doc);
      }
    }
  }, [htmlCode, isLoaded]);

  const setupContentEditing = (doc: Document) => {
    // Make content editable
    const body = doc.body;
    if (body) {
      body.contentEditable = 'true';
      body.style.outline = 'none';
      
      // Add visual indicators for editable content
      const style = doc.createElement('style');
      style.textContent = `
        *:hover {
          outline: 1px dashed #4299e1 !important;
          outline-offset: 2px !important;
        }
        *:focus {
          outline: 2px solid #4299e1 !important;
          outline-offset: 2px !important;
        }
      `;
      doc.head.appendChild(style);

      // Listen for content changes
      body.addEventListener('input', () => {
        setTimeout(() => {
          updateHtmlCode(doc);
        }, 100);
      });

      // Handle image uploads (simplified - would need more robust implementation)
      body.addEventListener('paste', (e) => {
        const items = e.clipboardData?.items;
        if (items) {
          for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
              e.preventDefault();
              toast({
                title: "Image Upload",
                description: "Image upload feature would be implemented here",
              });
            }
          }
        }
      });

      // Handle link creation
      doc.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'k') {
          e.preventDefault();
          createLink(doc);
        }
      });
    }
  };

  const createLink = (doc: Document) => {
    const selection = doc.getSelection();
    if (selection && selection.toString()) {
      const url = prompt('Enter URL:');
      if (url) {
        doc.execCommand('createLink', false, url);
        setTimeout(() => {
          updateHtmlCode(doc);
        }, 100);
      }
    }
  };

  const updateHtmlCode = (doc: Document) => {
    try {
      // Get the updated HTML
      const updatedHtml = doc.documentElement.outerHTML;
      
      // Clean up the HTML (remove contenteditable attributes, etc.)
      const cleanedHtml = updatedHtml
        .replace(/contenteditable="true"/g, '')
        .replace(/style="outline: none;"/g, '')
        .replace(/\s+/g, ' ')
        .trim();

      // Update the code if it's different
      if (cleanedHtml !== htmlCode.replace(/\s+/g, ' ').trim()) {
        onCodeChange(`<!DOCTYPE html>\n${cleanedHtml}`);
        
        toast({
          title: "Code Updated",
          description: "Your changes have been synced to the code editor",
        });
      }
    } catch (error) {
      console.error('Error updating HTML code:', error);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="h-full p-4">
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
        Click to edit content • Ctrl+K to add links
      </div>
    </div>
  );
};

export default LivePreview;
