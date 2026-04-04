
import { Button } from '@/components/ui/button';
import {
  Bold, Italic, Underline, Strikethrough, Link, Image,
  List, ListOrdered, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Quote, Code, Superscript, Subscript, Undo, Redo, Table,
  Minus, PaintBucket, Palette, Copy
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';

interface EditorToolbarProps { onInsertCode: (code: string) => void; selectedText?: string; onCopyContent?: () => void; }

const ToolBtn = ({ onClick, title, children }: { onClick: () => void; title: string; children: React.ReactNode }) => (
  <Button onClick={onClick} variant="ghost" size="sm" className="toolbar-btn h-7 w-7 p-0" title={title}>{children}</Button>
);
const Sep = () => <Separator orientation="vertical" className="h-4 mx-0.5 bg-border" />;

const EditorToolbar = ({ onInsertCode, selectedText, onCopyContent }: EditorToolbarProps) => {
  const handleParagraphStyle = (style: string) => { const text = selectedText || 'Sample text'; const tag = style === 'blockquote' ? 'blockquote' : style === 'p' ? 'p' : style; onInsertCode(`<${tag}>${text}</${tag}>`); };
  const handleFontSize = (size: string) => onInsertCode(`<span style="font-size: ${size};">${selectedText || 'Sample text'}</span>`);
  const wrap = (tag: string, fallback: string) => onInsertCode(`<${tag}>${selectedText || fallback}</${tag}>`);
  const handleAlignment = (align: string) => onInsertCode(`<div style="text-align: ${align};">${selectedText || 'Aligned text'}</div>`);
  const handleTextColor = () => { const color = prompt('Enter color (hex, rgb, or name):') || '#000000'; onInsertCode(`<span style="color: ${color};">${selectedText || 'Colored text'}</span>`); };
  const handleBackgroundColor = () => { const color = prompt('Enter background color:') || '#ffff00'; onInsertCode(`<span style="background-color: ${color};">${selectedText || 'Highlighted text'}</span>`); };
  const handleLink = () => { const url = prompt('Enter URL:'); if (url) onInsertCode(`<a href="${url}">${selectedText || 'Link text'}</a>`); };
  const handleImage = () => { const src = prompt('Enter image URL:'); const alt = prompt('Enter alt text:') || 'Image'; if (src) onInsertCode(`<img src="${src}" alt="${alt}" style="max-width: 100%; height: auto;" />`); };
  const handleUnorderedList = () => onInsertCode(`<ul>\n  <li>List item 1</li>\n  <li>List item 2</li>\n  <li>List item 3</li>\n</ul>`);
  const handleOrderedList = () => onInsertCode(`<ol>\n  <li>First item</li>\n  <li>Second item</li>\n  <li>Third item</li>\n</ol>`);
  const handleTable = () => onInsertCode(`<table border="1" style="border-collapse: collapse; width: 100%;">\n  <thead>\n    <tr>\n      <th style="padding: 8px; border: 1px solid #ddd;">Header 1</th>\n      <th style="padding: 8px; border: 1px solid #ddd;">Header 2</th>\n      <th style="padding: 8px; border: 1px solid #ddd;">Header 3</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td style="padding: 8px; border: 1px solid #ddd;">Cell 1</td>\n      <td style="padding: 8px; border: 1px solid #ddd;">Cell 2</td>\n      <td style="padding: 8px; border: 1px solid #ddd;">Cell 3</td>\n    </tr>\n  </tbody>\n</table>`);
  const handleBlockquote = () => onInsertCode(`<blockquote style="margin: 1em 0; padding: 0.5em 1em; border-left: 3px solid #ccc; font-style: italic;">${selectedText || 'This is a blockquote.'}</blockquote>`);
  const handleCode = () => onInsertCode(`<code style="background-color: #f4f4f4; padding: 2px 4px; border-radius: 3px; font-family: monospace;">${selectedText || 'code'}</code>`);
  const handleCodeBlock = () => onInsertCode(`<pre style="background-color: #f4f4f4; padding: 1em; border-radius: 5px; overflow-x: auto;"><code>${selectedText || 'function example() {\n  console.log("Hello World!");\n}'}</code></pre>`);
  const handleHorizontalRule = () => onInsertCode('<hr style="border: none; border-top: 1px solid #ccc; margin: 1em 0;" />');

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-border bg-background">
      <ToolBtn onClick={() => toast({ title: "Undo" })} title="Undo"><Undo className="w-3.5 h-3.5" /></ToolBtn>
      <ToolBtn onClick={() => toast({ title: "Redo" })} title="Redo"><Redo className="w-3.5 h-3.5" /></ToolBtn>
      <Sep />
      <Select onValueChange={handleParagraphStyle}>
        <SelectTrigger className="w-28 h-7 text-[11px] border-border"><SelectValue placeholder="Paragraph" /></SelectTrigger>
        <SelectContent>{['p','h1','h2','h3','h4','h5','h6','blockquote'].map(v => <SelectItem key={v} value={v}>{v === 'p' ? 'Paragraph' : v === 'blockquote' ? 'Quote' : `Heading ${v[1]}`}</SelectItem>)}</SelectContent>
      </Select>
      <Select onValueChange={handleFontSize}>
        <SelectTrigger className="w-16 h-7 text-[11px] border-border"><SelectValue placeholder="Size" /></SelectTrigger>
        <SelectContent>{['10px','12px','14px','16px','18px','20px','24px','32px','48px'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
      </Select>
      <Sep />
      <ToolBtn onClick={() => wrap('strong', 'Bold text')} title="Bold"><Bold className="w-3.5 h-3.5" /></ToolBtn>
      <ToolBtn onClick={() => wrap('em', 'Italic text')} title="Italic"><Italic className="w-3.5 h-3.5" /></ToolBtn>
      <ToolBtn onClick={() => wrap('u', 'Underlined text')} title="Underline"><Underline className="w-3.5 h-3.5" /></ToolBtn>
      <ToolBtn onClick={() => wrap('del', 'Strikethrough text')} title="Strikethrough"><Strikethrough className="w-3.5 h-3.5" /></ToolBtn>
      <ToolBtn onClick={() => onInsertCode(selectedText ? `<sup>${selectedText}</sup>` : 'X<sup>2</sup>')} title="Superscript"><Superscript className="w-3.5 h-3.5" /></ToolBtn>
      <ToolBtn onClick={() => onInsertCode(selectedText ? `<sub>${selectedText}</sub>` : 'H<sub>2</sub>O')} title="Subscript"><Subscript className="w-3.5 h-3.5" /></ToolBtn>
      <Sep />
      <ToolBtn onClick={handleTextColor} title="Text Color"><Palette className="w-3.5 h-3.5" /></ToolBtn>
      <ToolBtn onClick={handleBackgroundColor} title="Bg Color"><PaintBucket className="w-3.5 h-3.5" /></ToolBtn>
      <Sep />
      <ToolBtn onClick={() => handleAlignment('left')} title="Left"><AlignLeft className="w-3.5 h-3.5" /></ToolBtn>
      <ToolBtn onClick={() => handleAlignment('center')} title="Center"><AlignCenter className="w-3.5 h-3.5" /></ToolBtn>
      <ToolBtn onClick={() => handleAlignment('right')} title="Right"><AlignRight className="w-3.5 h-3.5" /></ToolBtn>
      <ToolBtn onClick={() => handleAlignment('justify')} title="Justify"><AlignJustify className="w-3.5 h-3.5" /></ToolBtn>
      <Sep />
      <ToolBtn onClick={handleUnorderedList} title="Bullets"><List className="w-3.5 h-3.5" /></ToolBtn>
      <ToolBtn onClick={handleOrderedList} title="Numbers"><ListOrdered className="w-3.5 h-3.5" /></ToolBtn>
      <Sep />
      <ToolBtn onClick={handleLink} title="Link"><Link className="w-3.5 h-3.5" /></ToolBtn>
      <ToolBtn onClick={handleImage} title="Image"><Image className="w-3.5 h-3.5" /></ToolBtn>
      <ToolBtn onClick={handleTable} title="Table"><Table className="w-3.5 h-3.5" /></ToolBtn>
      <ToolBtn onClick={handleBlockquote} title="Quote"><Quote className="w-3.5 h-3.5" /></ToolBtn>
      <ToolBtn onClick={handleCode} title="Code"><Code className="w-3.5 h-3.5" /></ToolBtn>
      <ToolBtn onClick={handleCodeBlock} title="Code Block"><span className="text-[10px] font-mono font-bold">&lt;/&gt;</span></ToolBtn>
      <ToolBtn onClick={handleHorizontalRule} title="HR"><Minus className="w-3.5 h-3.5" /></ToolBtn>
      <Sep />
      <ToolBtn onClick={onCopyContent || (() => {})} title="Copy"><Copy className="w-3.5 h-3.5" /></ToolBtn>
    </div>
  );
};

export default EditorToolbar;
