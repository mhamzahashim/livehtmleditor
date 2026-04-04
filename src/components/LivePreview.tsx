
import { useRef, useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
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
    const style = doc.createElement('style');
    style.textContent = `
      body { margin: 20px; font-family: Arial, sans-serif; }
      .editable-selected {
        outline: 2px solid #6366F1 !important;
        outline-offset: 2px;
        position: relative;
      }
      .editable-hover {
        outline: 1px dashed #6366F1 !important;
        outline-offset: 2px;
        cursor: pointer;
      }
      [contenteditable="true"] { min-height: 1em; }
      .editable-selected::after {
        content: 'Click to edit';
        position: absolute;
        top: -25px;
        left: 0;
        background: #6366F1;
        color: white;
        padding: 2px 6px;
        font-size: 11px;
        border-radius: 3px;
        white-space: nowrap;
        z-index: 1000;
      }
    `;
    if (doc.head) doc.head.appendChild(style);

    const textElements = doc.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div, li, td, th, blockquote');
    textElements.forEach((element) => {
      element.setAttribute('contenteditable', 'true');

      element.addEventListener('mouseenter', () => {
        if (element !== selectedElement) element.classList.add('editable-hover');
      });
      element.addEventListener('mouseleave', () => {
        element.classList.remove('editable-hover');
      });

      element.addEventListener('click', (e) => {
        e.stopPropagation();
        if (selectedElement) selectedElement.classList.remove('editable-selected');
        element.classList.add('editable-selected');
        element.classList.remove('editable-hover');
        setSelectedElement(element);
        (element as HTMLElement).focus();
        const selection = doc.getSelection();
        if (selection && selection.toString()) setSelectedText(selection.toString());
      });

      let isComposing = false;
      element.addEventListener('compositionstart', () => { isComposing = true; });
      element.addEventListener('compositionend', () => { isComposing = false; updateHtmlCodePrecisely(doc, element); });

      element.addEventListener('input', () => {
        if (!isComposing) {
          clearTimeout((element as any).updateTimeout);
          (element as any).updateTimeout = setTimeout(() => { updateHtmlCodePrecisely(doc, element); }, 300);
        }
      });

      element.addEventListener('mouseup', (e) => {
        e.stopPropagation();
        const selection = doc.getSelection();
        if (selection && selection.toString()) setSelectedText(selection.toString());
      });

      element.addEventListener('keydown', (e) => { e.stopPropagation(); });
    });

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
      const bodyContent = doc.body.innerHTML;
      const cleanedContent = cleanHtmlCode(bodyContent);
      if (cleanedContent !== htmlCode) onCodeChange(cleanedContent);
    } catch (error) {
      console.error('Error updating HTML code precisely:', error);
    }
  };

  const cleanHtmlCode = (html: string): string => {
    return html
      .replace(/\scontenteditable="true"/g, '')
      .replace(/\sclass="[^"]*editable-[^"]*[^"]*"/g, '')
      .replace(/\sclass=""/g, '');
  };

  const handleToolbarInsert = (code: string) => {
    if (!selectedElement) {
      toast({ title: "No element selected", description: "Click on an element in the preview first." });
      return;
    }
    const doc = iframeRef.current?.contentDocument;
    if (!doc) return;
    try {
      if (selectedText) {
        const selection = doc.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          range.deleteContents();
          const tempDiv = doc.createElement('div');
          tempDiv.innerHTML = code;
          while (tempDiv.firstChild) range.insertNode(tempDiv.firstChild);
          selection.removeAllRanges();
        }
      } else {
        const tempDiv = doc.createElement('div');
        tempDiv.innerHTML = code;
        while (tempDiv.firstChild) selectedElement.appendChild(tempDiv.firstChild);
      }
      updateHtmlCodePrecisely(doc, selectedElement);
      setSelectedText('');
    } catch (error) {
      console.error('Error inserting code:', error);
      toast({ title: "Error", description: "Failed to insert content." });
    }
  };

  const handleCopyContent = async () => {
    try {
      const doc = iframeRef.current?.contentDocument;
      if (!doc) return;
      const bodyContent = doc.body.innerHTML;
      const cleanedHtml = cleanHtmlCode(bodyContent);
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = cleanedHtml;
      const plainText = tempDiv.textContent || tempDiv.innerText || '';
      const clipboardItem = new ClipboardItem({
        'text/html': new Blob([cleanedHtml], { type: 'text/html' }),
        'text/plain': new Blob([plainText], { type: 'text/plain' })
      });
      await navigator.clipboard.write([clipboardItem]);
      toast({ title: "Copied!", description: "Rich text copied with formatting." });
    } catch (error) {
      try {
        const doc = iframeRef.current?.contentDocument;
        if (doc) {
          const plainText = doc.body.textContent || doc.body.innerText || '';
          await navigator.clipboard.writeText(plainText);
          toast({ title: "Copied!", description: "Content copied as plain text." });
        }
      } catch {
        toast({ title: "Copy failed", description: "Unable to copy to clipboard.", variant: "destructive" });
      }
    }
  };

  const handleLoad = () => setIsLoaded(true);

  const getDeviceFrame = (width: string) => {
    if (width === '375px') {
      return {
        containerClass: 'mx-auto bg-[#1A1E2E] rounded-[2rem] p-2.5 max-w-fit shadow-2xl shadow-black/30',
        iframeClass: 'rounded-[1.5rem] bg-white',
        style: { width: '375px', height: '667px' }
      };
    } else if (width === '768px') {
      return {
        containerClass: 'mx-auto bg-[#1A1E2E] rounded-[1.5rem] p-3 max-w-fit shadow-2xl shadow-black/30',
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
      <div className="border-b border-white/[0.04] bg-surface-2/40">
        <EditorToolbar
          onInsertCode={handleToolbarInsert}
          selectedText={selectedText}
          onCopyContent={handleCopyContent}
        />
      </div>
      <div className={`flex-1 ${previewWidth === '100%' ? 'p-0' : 'p-4 bg-surface-0/50'}`}>
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
          <div className="mt-2 text-[11px] text-[#3A3F52] text-center font-mono">
            Live preview &middot; Click to select &middot; Changes sync to code
          </div>
        )}
      </div>
    </div>
  );
};

export default LivePreview;
