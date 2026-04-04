
import { useRef, useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import EditorToolbar from './EditorToolbar';

interface LivePreviewProps { htmlCode: string; onCodeChange: (newCode: string) => void; previewWidth?: string; cssCode?: string; jsCode?: string; }

const LivePreview = ({ htmlCode, onCodeChange, previewWidth = '100%', cssCode = '', jsCode = '' }: LivePreviewProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [selectedText, setSelectedText] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
      if (doc) { try { doc.open(); doc.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>${cssCode}</style><script>${jsCode}<\/script></head><body>${htmlCode || ''}</body></html>`); doc.close(); setupPreviewInteractivity(doc); } catch (e) { console.error(e); } }
    }
  }, [htmlCode, cssCode, jsCode]);

  const setupPreviewInteractivity = (doc: Document) => {
    const style = doc.createElement('style');
    style.textContent = `body{margin:20px;font-family:Arial,sans-serif}.editable-selected{outline:2px solid #b45309!important;outline-offset:2px;position:relative}.editable-hover{outline:1px dashed #b45309!important;outline-offset:2px;cursor:pointer}[contenteditable="true"]{min-height:1em}.editable-selected::after{content:'Click to edit';position:absolute;top:-25px;left:0;background:#b45309;color:white;padding:2px 6px;font-size:11px;border-radius:3px;white-space:nowrap;z-index:1000}`;
    if (doc.head) doc.head.appendChild(style);
    const els = doc.querySelectorAll('p,h1,h2,h3,h4,h5,h6,span,div,li,td,th,blockquote');
    els.forEach(el => {
      el.setAttribute('contenteditable', 'true');
      el.addEventListener('mouseenter', () => { if (el !== selectedElement) el.classList.add('editable-hover'); });
      el.addEventListener('mouseleave', () => el.classList.remove('editable-hover'));
      el.addEventListener('click', (e) => { e.stopPropagation(); if (selectedElement) selectedElement.classList.remove('editable-selected'); el.classList.add('editable-selected'); el.classList.remove('editable-hover'); setSelectedElement(el); (el as HTMLElement).focus(); const sel = doc.getSelection(); if (sel?.toString()) setSelectedText(sel.toString()); });
      let composing = false;
      el.addEventListener('compositionstart', () => { composing = true; });
      el.addEventListener('compositionend', () => { composing = false; updateCode(doc); });
      el.addEventListener('input', () => { if (!composing) { clearTimeout((el as any)._t); (el as any)._t = setTimeout(() => updateCode(doc), 300); } });
      el.addEventListener('mouseup', (e) => { e.stopPropagation(); const sel = doc.getSelection(); if (sel?.toString()) setSelectedText(sel.toString()); });
      el.addEventListener('keydown', e => e.stopPropagation());
    });
    doc.addEventListener('click', (e) => { if (!e.target || !(e.target as Element).closest('[contenteditable="true"]')) { if (selectedElement) { selectedElement.classList.remove('editable-selected'); setSelectedElement(null); } } });
  };

  const updateCode = (doc: Document) => { try { const clean = doc.body.innerHTML.replace(/\scontenteditable="true"/g, '').replace(/\sclass="[^"]*editable-[^"]*"/g, '').replace(/\sclass=""/g, ''); if (clean !== htmlCode) onCodeChange(clean); } catch {} };

  const handleToolbarInsert = (code: string) => {
    if (!selectedElement) { toast({ title: "No element selected", description: "Click on an element in the preview first." }); return; }
    const doc = iframeRef.current?.contentDocument; if (!doc) return;
    try {
      if (selectedText) { const sel = doc.getSelection(); if (sel?.rangeCount) { const r = sel.getRangeAt(0); r.deleteContents(); const tmp = doc.createElement('div'); tmp.innerHTML = code; while (tmp.firstChild) r.insertNode(tmp.firstChild); sel.removeAllRanges(); } }
      else { const tmp = doc.createElement('div'); tmp.innerHTML = code; while (tmp.firstChild) selectedElement.appendChild(tmp.firstChild); }
      updateCode(doc); setSelectedText('');
    } catch { toast({ title: "Error", description: "Failed to insert content." }); }
  };

  const handleCopyContent = async () => {
    try { const doc = iframeRef.current?.contentDocument; if (!doc) return; const html = doc.body.innerHTML.replace(/\scontenteditable="true"/g, '').replace(/\sclass="[^"]*editable-[^"]*"/g, '').replace(/\sclass=""/g, ''); const tmp = document.createElement('div'); tmp.innerHTML = html; await navigator.clipboard.write([new ClipboardItem({ 'text/html': new Blob([html], { type: 'text/html' }), 'text/plain': new Blob([tmp.textContent || ''], { type: 'text/plain' }) })]); toast({ title: "Copied!" }); }
    catch { try { const doc = iframeRef.current?.contentDocument; if (doc) { await navigator.clipboard.writeText(doc.body.textContent || ''); toast({ title: "Copied as text" }); } } catch { toast({ title: "Copy failed", variant: "destructive" }); } }
  };

  const getFrame = (w: string) => {
    if (w === '375px') return { cc: 'mx-auto bg-stone-800 rounded-[2rem] p-2.5 max-w-fit shadow-warm-xl', ic: 'rounded-[1.5rem] bg-white', s: { width: '375px', height: '667px' } };
    if (w === '768px') return { cc: 'mx-auto bg-stone-800 rounded-[1.5rem] p-3 max-w-fit shadow-warm-xl', ic: 'rounded-[1rem] bg-white', s: { width: '768px', height: '1024px' } };
    return { cc: 'w-full h-full', ic: 'bg-white border-0', s: { width: '100%', height: '100%' } };
  };
  const f = getFrame(previewWidth);

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-border bg-background"><EditorToolbar onInsertCode={handleToolbarInsert} selectedText={selectedText} onCopyContent={handleCopyContent} /></div>
      <div className={`flex-1 ${previewWidth === '100%' ? 'p-0' : 'p-4 bg-muted/30'}`}>
        <div ref={containerRef} className={`h-full ${previewWidth === '100%' ? 'overflow-hidden' : 'overflow-auto'} ${f.cc}`} style={previewWidth === '100%' ? { width: '100%', height: '100%' } : f.s}>
          <iframe ref={iframeRef} className={`border-0 ${f.ic}`} title="Live Preview" sandbox="allow-scripts allow-same-origin" style={{ width: '100%', height: '100%', minHeight: previewWidth === '100%' ? '100vh' : '600px' }} />
        </div>
        {previewWidth !== '100%' && <div className="mt-2 text-[11px] text-muted-foreground text-center font-mono">Click to select &middot; Changes sync to code</div>}
      </div>
    </div>
  );
};

export default LivePreview;
