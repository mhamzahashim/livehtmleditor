
import { Button } from '@/components/ui/button';
import {
  Bold, Italic, Underline, Strikethrough, Link, Type, Image,
  List, ListOrdered, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Quote, Code, Superscript, Subscript, Undo, Redo, Table,
  Minus, Heading1, Heading2, Heading3, PaintBucket, Palette, Copy
} from 'lucide-react';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';

interface EditorToolbarProps {
  onInsertCode: (code: string) => void;
  selectedText?: string;
  onCopyContent?: () => void;
}

const ToolBtn = ({ onClick, title, children }: { onClick: () => void; title: string; children: React.ReactNode }) => (
  <Button onClick={onClick} variant="ghost" size="sm" className="toolbar-btn h-7 w-7 p-0" title={title}>
    {children}
  </Button>
);

const Sep = () => <Separator orientation="vertical" className="h-4 mx-0.5 bg-white/[0.06]" />;

const EditorToolbar = ({ onInsertCode, selectedText, onCopyContent }: EditorToolbarProps) => {
  const handleParagraphStyle = (style: string) => {
    const text = selectedText || 'Sample text';
    switch (style) {
      case 'h1': onInsertCode(`<h1>${text}</h1>`); break;
      case 'h2': onInsertCode(`<h2>${text}</h2>`); break;
      case 'h3': onInsertCode(`<h3>${text}</h3>`); break;
      case 'h4': onInsertCode(`<h4>${text}</h4>`); break;
      case 'h5': onInsertCode(`<h5>${text}</h5>`); break;
      case 'h6': onInsertCode(`<h6>${text}</h6>`); break;
      case 'blockquote': onInsertCode(`<blockquote>${text}</blockquote>`); break;
      default: onInsertCode(`<p>${text}</p>`);
    }
  };

  const handleFontSize = (size: string) => {
    onInsertCode(`<span style="font-size: ${size};">${selectedText || 'Sample text'}</span>`);
  };

  const wrap = (tag: string, fallback: string) => {
    onInsertCode(`<${tag}>${selectedText || fallback}</${tag}>`);
  };

  const handleAlignment = (align: string) => {
    onInsertCode(`<div style="text-align: ${align};">${selectedText || 'Aligned text'}</div>`);
  };

  const handleTextColor = () => {
    const color = prompt('Enter color (hex, rgb, or name):') || '#000000';
    onInsertCode(`<span style="color: ${color};">${selectedText || 'Colored text'}</span>`);
  };

  const handleBackgroundColor = () => {
    const color = prompt('Enter background color:') || '#ffff00';
    onInsertCode(`<span style="background-color: ${color};">${selectedText || 'Highlighted text'}</span>`);
  };

  const handleLink = () => {
    const url = prompt('Enter URL:');
    if (url) onInsertCode(`<a href="${url}">${selectedText || 'Link text'}</a>`);
  };

  const handleImage = () => {
    const src = prompt('Enter image URL:');
    const alt = prompt('Enter alt text:') || 'Image';
    if (src) onInsertCode(`<img src="${src}" alt="${alt}" style="max-width: 100%; height: auto;" />`);
  };

  const handleUnorderedList = () => onInsertCode(`<ul>\n  <li>List item 1</li>\n  <li>List item 2</li>\n  <li>List item 3</li>\n</ul>`);
  const handleOrderedList = () => onInsertCode(`<ol>\n  <li>First item</li>\n  <li>Second item</li>\n  <li>Third item</li>\n</ol>`);

  const handleTable = () => {
    onInsertCode(`<table border="1" style="border-collapse: collapse; width: 100%;">\n  <thead>\n    <tr>\n      <th style="padding: 8px; border: 1px solid #ddd;">Header 1</th>\n      <th style="padding: 8px; border: 1px solid #ddd;">Header 2</th>\n      <th style="padding: 8px; border: 1px solid #ddd;">Header 3</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td style="padding: 8px; border: 1px solid #ddd;">Cell 1</td>\n      <td style="padding: 8px; border: 1px solid #ddd;">Cell 2</td>\n      <td style="padding: 8px; border: 1px solid #ddd;">Cell 3</td>\n    </tr>\n    <tr>\n      <td style="padding: 8px; border: 1px solid #ddd;">Cell 4</td>\n      <td style="padding: 8px; border: 1px solid #ddd;">Cell 5</td>\n      <td style="padding: 8px; border: 1px solid #ddd;">Cell 6</td>\n    </tr>\n  </tbody>\n</table>`);
  };

  const handleBlockquote = () => {
    onInsertCode(`<blockquote style="margin: 1em 0; padding: 0.5em 1em; border-left: 3px solid #ccc; font-style: italic;">${selectedText || 'This is a blockquote.'}</blockquote>`);
  };

  const handleCode = () => {
    onInsertCode(`<code style="background-color: #f4f4f4; padding: 2px 4px; border-radius: 3px; font-family: monospace;">${selectedText || 'code'}</code>`);
  };

  const handleCodeBlock = () => {
    onInsertCode(`<pre style="background-color: #f4f4f4; padding: 1em; border-radius: 5px; overflow-x: auto;"><code>${selectedText || 'function example() {\n  console.log("Hello World!");\n}'}</code></pre>`);
  };

  const handleHorizontalRule = () => onInsertCode('<hr style="border: none; border-top: 1px solid #ccc; margin: 1em 0;" />');

  const handleUndo = () => toast({ title: "Undo", description: "Undo would be implemented with editor state management." });
  const handleRedo = () => toast({ title: "Redo", description: "Redo would be implemented with editor state management." });

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 bg-surface-2/60 border-b border-white/[0.04]">
      <ToolBtn onClick={handleUndo} title="Undo"><Undo className="w-3.5 h-3.5" /></ToolBtn>
      <ToolBtn onClick={handleRedo} title="Redo"><Redo className="w-3.5 h-3.5" /></ToolBtn>

      <Sep />

      <Select onValueChange={handleParagraphStyle}>
        <SelectTrigger className="w-28 h-7 text-[11px] bg-transparent border-white/[0.06] text-[#9DA3B4] focus:ring-indigo-500/30">
          <SelectValue placeholder="Paragraph" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="p">Paragraph</SelectItem>
          <SelectItem value="h1">Heading 1</SelectItem>
          <SelectItem value="h2">Heading 2</SelectItem>
          <SelectItem value="h3">Heading 3</SelectItem>
          <SelectItem value="h4">Heading 4</SelectItem>
          <SelectItem value="h5">Heading 5</SelectItem>
          <SelectItem value="h6">Heading 6</SelectItem>
          <SelectItem value="blockquote">Quote</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={handleFontSize}>
        <SelectTrigger className="w-16 h-7 text-[11px] bg-transparent border-white/[0.06] text-[#9DA3B4] focus:ring-indigo-500/30">
          <SelectValue placeholder="Size" />
        </SelectTrigger>
        <SelectContent>
          {['10px','12px','14px','16px','18px','20px','24px','32px','48px'].map(s => (
            <SelectItem key={s} value={s}>{s}</SelectItem>
          ))}
        </SelectContent>
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
      <ToolBtn onClick={handleBackgroundColor} title="Background Color"><PaintBucket className="w-3.5 h-3.5" /></ToolBtn>

      <Sep />

      <ToolBtn onClick={() => handleAlignment('left')} title="Align Left"><AlignLeft className="w-3.5 h-3.5" /></ToolBtn>
      <ToolBtn onClick={() => handleAlignment('center')} title="Align Center"><AlignCenter className="w-3.5 h-3.5" /></ToolBtn>
      <ToolBtn onClick={() => handleAlignment('right')} title="Align Right"><AlignRight className="w-3.5 h-3.5" /></ToolBtn>
      <ToolBtn onClick={() => handleAlignment('justify')} title="Justify"><AlignJustify className="w-3.5 h-3.5" /></ToolBtn>

      <Sep />

      <ToolBtn onClick={handleUnorderedList} title="Bullet List"><List className="w-3.5 h-3.5" /></ToolBtn>
      <ToolBtn onClick={handleOrderedList} title="Numbered List"><ListOrdered className="w-3.5 h-3.5" /></ToolBtn>

      <Sep />

      <ToolBtn onClick={handleLink} title="Insert Link"><Link className="w-3.5 h-3.5" /></ToolBtn>
      <ToolBtn onClick={handleImage} title="Insert Image"><Image className="w-3.5 h-3.5" /></ToolBtn>
      <ToolBtn onClick={handleTable} title="Insert Table"><Table className="w-3.5 h-3.5" /></ToolBtn>
      <ToolBtn onClick={handleBlockquote} title="Blockquote"><Quote className="w-3.5 h-3.5" /></ToolBtn>
      <ToolBtn onClick={handleCode} title="Inline Code"><Code className="w-3.5 h-3.5" /></ToolBtn>
      <ToolBtn onClick={handleCodeBlock} title="Code Block">
        <span className="text-[10px] font-mono font-bold">&lt;/&gt;</span>
      </ToolBtn>
      <ToolBtn onClick={handleHorizontalRule} title="Horizontal Rule"><Minus className="w-3.5 h-3.5" /></ToolBtn>

      <Sep />

      <ToolBtn onClick={onCopyContent || (() => {})} title="Copy Content"><Copy className="w-3.5 h-3.5" /></ToolBtn>
    </div>
  );
};

export default EditorToolbar;
