
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
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (doc) {
        try {
          doc.open();
          doc.write(htmlCode || '<!DOCTYPE html><html><head></head><body></body></html>');
          doc.close();
          
          // Add some basic styling to make content editable
          const style = doc.createElement('style');
          style.textContent = `
            body {
              margin: 20px;
              font-family: Arial, sans-serif;
            }
            *:hover {
              outline: 1px dashed #4299e1;
              outline-offset: 2px;
            }
            *:focus {
              outline: 2px solid #4299e1;
              outline-offset: 2px;
            }
          `;
          if (doc.head) {
            doc.head.appendChild(style);
          }

          // Make body editable
          if (doc.body) {
            doc.body.contentEditable = 'true';
            doc.body.style.outline = 'none';
            
            // Listen for content changes
            doc.body.addEventListener('input', () => {
              setTimeout(() => {
                updateHtmlCode(doc);
              }, 300);
            });
          }
        } catch (error) {
          console.error('Error writing to iframe:', error);
        }
      }
    }
  }, [htmlCode]);

  const updateHtmlCode = (doc: Document) => {
    try {
      const updatedHtml = doc.documentElement.outerHTML;
      const cleanedHtml = updatedHtml
        .replace(/contenteditable="true"/g, '')
        .replace(/style="outline: none;"/g, '');

      if (cleanedHtml !== htmlCode) {
        onCodeChange(cleanedHtml);
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
        Live preview of your HTML • Content is editable
      </div>
    </div>
  );
};

export default LivePreview;
