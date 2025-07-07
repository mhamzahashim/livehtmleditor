
import { Button } from '@/components/ui/button';
import { 
  Bold, Italic, Underline, Strikethrough, Link, Type, Image, 
  List, ListOrdered, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Quote, Code, Superscript, Subscript, Undo, Redo, Table,
  Minus, Heading1, Heading2, Heading3, PaintBucket, Palette
} from 'lucide-react';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';

interface EditorToolbarProps {
  onInsertCode: (code: string) => void;
  selectedText?: string;
}

const EditorToolbar = ({ onInsertCode, selectedText }: EditorToolbarProps) => {
  const handleParagraphStyle = (style: string) => {
    const text = selectedText || 'Sample text';
    switch (style) {
      case 'h1':
        onInsertCode(`<h1>${text}</h1>`);
        break;
      case 'h2':
        onInsertCode(`<h2>${text}</h2>`);
        break;
      case 'h3':
        onInsertCode(`<h3>${text}</h3>`);
        break;
      case 'h4':
        onInsertCode(`<h4>${text}</h4>`);
        break;
      case 'h5':
        onInsertCode(`<h5>${text}</h5>`);
        break;
      case 'h6':
        onInsertCode(`<h6>${text}</h6>`);
        break;
      case 'p':
        onInsertCode(`<p>${text}</p>`);
        break;
      case 'blockquote':
        onInsertCode(`<blockquote>${text}</blockquote>`);
        break;
      default:
        onInsertCode(`<p>${text}</p>`);
    }
  };

  const handleFontSize = (size: string) => {
    const text = selectedText || 'Sample text';
    onInsertCode(`<span style="font-size: ${size};">${text}</span>`);
  };

  const handleBold = () => {
    if (selectedText) {
      onInsertCode(`<strong>${selectedText}</strong>`);
    } else {
      onInsertCode('<strong>Bold text</strong>');
    }
  };

  const handleItalic = () => {
    if (selectedText) {
      onInsertCode(`<em>${selectedText}</em>`);
    } else {
      onInsertCode('<em>Italic text</em>');
    }
  };

  const handleUnderline = () => {
    if (selectedText) {
      onInsertCode(`<u>${selectedText}</u>`);
    } else {
      onInsertCode('<u>Underlined text</u>');
    }
  };

  const handleStrikethrough = () => {
    if (selectedText) {
      onInsertCode(`<del>${selectedText}</del>`);
    } else {
      onInsertCode('<del>Strikethrough text</del>');
    }
  };

  const handleSuperscript = () => {
    if (selectedText) {
      onInsertCode(`<sup>${selectedText}</sup>`);
    } else {
      onInsertCode('X<sup>2</sup>');
    }
  };

  const handleSubscript = () => {
    if (selectedText) {
      onInsertCode(`<sub>${selectedText}</sub>`);
    } else {
      onInsertCode('H<sub>2</sub>O');
    }
  };

  const handleAlignment = (align: string) => {
    const text = selectedText || 'Aligned text';
    onInsertCode(`<div style="text-align: ${align};">${text}</div>`);
  };

  const handleTextColor = () => {
    const color = prompt('Enter color (hex, rgb, or color name):') || '#000000';
    const text = selectedText || 'Colored text';
    onInsertCode(`<span style="color: ${color};">${text}</span>`);
  };

  const handleBackgroundColor = () => {
    const color = prompt('Enter background color (hex, rgb, or color name):') || '#ffff00';
    const text = selectedText || 'Highlighted text';
    onInsertCode(`<span style="background-color: ${color};">${text}</span>`);
  };

  const handleLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      const linkText = selectedText || 'Link text';
      onInsertCode(`<a href="${url}">${linkText}</a>`);
    }
  };

  const handleImage = () => {
    const src = prompt('Enter image URL:');
    const alt = prompt('Enter image alt text:') || 'Image';
    if (src) {
      onInsertCode(`<img src="${src}" alt="${alt}" style="max-width: 100%; height: auto;" />`);
    }
  };

  const handleUnorderedList = () => {
    const listCode = `<ul>
  <li>List item 1</li>
  <li>List item 2</li>
  <li>List item 3</li>
</ul>`;
    onInsertCode(listCode);
  };

  const handleOrderedList = () => {
    const listCode = `<ol>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ol>`;
    onInsertCode(listCode);
  };

  const handleTable = () => {
    const tableCode = `<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr>
      <th style="padding: 8px; border: 1px solid #ddd;">Header 1</th>
      <th style="padding: 8px; border: 1px solid #ddd;">Header 2</th>
      <th style="padding: 8px; border: 1px solid #ddd;">Header 3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd;">Cell 1</td>
      <td style="padding: 8px; border: 1px solid #ddd;">Cell 2</td>
      <td style="padding: 8px; border: 1px solid #ddd;">Cell 3</td>
    </tr>
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd;">Cell 4</td>
      <td style="padding: 8px; border: 1px solid #ddd;">Cell 5</td>
      <td style="padding: 8px; border: 1px solid #ddd;">Cell 6</td>
    </tr>
  </tbody>
</table>`;
    onInsertCode(tableCode);
  };

  const handleBlockquote = () => {
    const text = selectedText || 'This is a blockquote.';
    onInsertCode(`<blockquote style="margin: 1em 0; padding: 0.5em 1em; border-left: 3px solid #ccc; font-style: italic;">${text}</blockquote>`);
  };

  const handleCode = () => {
    const text = selectedText || 'code';
    onInsertCode(`<code style="background-color: #f4f4f4; padding: 2px 4px; border-radius: 3px; font-family: monospace;">${text}</code>`);
  };

  const handleCodeBlock = () => {
    const text = selectedText || 'function example() {\n  console.log("Hello World!");\n}';
    onInsertCode(`<pre style="background-color: #f4f4f4; padding: 1em; border-radius: 5px; overflow-x: auto;"><code>${text}</code></pre>`);
  };

  const handleHorizontalRule = () => {
    onInsertCode('<hr style="border: none; border-top: 1px solid #ccc; margin: 1em 0;" />');
  };

  const handleUndo = () => {
    toast({
      title: "Undo",
      description: "Undo functionality would be implemented with a proper editor state management system.",
    });
  };

  const handleRedo = () => {
    toast({
      title: "Redo", 
      description: "Redo functionality would be implemented with a proper editor state management system.",
    });
  };

  return (
    <div className="flex flex-wrap gap-2 p-3 bg-slate-50 border-b border-slate-200">
      {/* Undo/Redo */}
      <Button
        onClick={handleUndo}
        variant="outline"
        size="sm"
        className="text-slate-600 hover:bg-slate-100"
        title="Undo"
      >
        <Undo className="w-4 h-4" />
      </Button>
      
      <Button
        onClick={handleRedo}
        variant="outline"
        size="sm"
        className="text-slate-600 hover:bg-slate-100"
        title="Redo"
      >
        <Redo className="w-4 h-4" />
      </Button>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Paragraph Style Selector */}
      <Select onValueChange={handleParagraphStyle}>
        <SelectTrigger className="w-32 h-8 text-xs">
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

      {/* Font Size */}
      <Select onValueChange={handleFontSize}>
        <SelectTrigger className="w-16 h-8 text-xs">
          <SelectValue placeholder="Size" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10px">10px</SelectItem>
          <SelectItem value="12px">12px</SelectItem>
          <SelectItem value="14px">14px</SelectItem>
          <SelectItem value="16px">16px</SelectItem>
          <SelectItem value="18px">18px</SelectItem>
          <SelectItem value="20px">20px</SelectItem>
          <SelectItem value="24px">24px</SelectItem>
          <SelectItem value="32px">32px</SelectItem>
          <SelectItem value="48px">48px</SelectItem>
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Text Formatting */}
      <Button
        onClick={handleBold}
        variant="outline"
        size="sm"
        className="text-slate-600 hover:bg-slate-100"
        title="Bold"
      >
        <Bold className="w-4 h-4" />
      </Button>
      
      <Button
        onClick={handleItalic}
        variant="outline"
        size="sm"
        className="text-slate-600 hover:bg-slate-100"
        title="Italic"
      >
        <Italic className="w-4 h-4" />
      </Button>
      
      <Button
        onClick={handleUnderline}
        variant="outline"
        size="sm"
        className="text-slate-600 hover:bg-slate-100"
        title="Underline"
      >
        <Underline className="w-4 h-4" />
      </Button>

      <Button
        onClick={handleStrikethrough}
        variant="outline"
        size="sm"
        className="text-slate-600 hover:bg-slate-100"
        title="Strikethrough"
      >
        <Strikethrough className="w-4 h-4" />
      </Button>

      <Button
        onClick={handleSuperscript}
        variant="outline"
        size="sm"
        className="text-slate-600 hover:bg-slate-100"
        title="Superscript"
      >
        <Superscript className="w-4 h-4" />
      </Button>

      <Button
        onClick={handleSubscript}
        variant="outline"
        size="sm"
        className="text-slate-600 hover:bg-slate-100"
        title="Subscript"
      >
        <Subscript className="w-4 h-4" />
      </Button>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Text Colors */}
      <Button
        onClick={handleTextColor}
        variant="outline"
        size="sm"
        className="text-slate-600 hover:bg-slate-100"
        title="Text Color"
      >
        <Palette className="w-4 h-4" />
      </Button>

      <Button
        onClick={handleBackgroundColor}
        variant="outline"
        size="sm"
        className="text-slate-600 hover:bg-slate-100"
        title="Background Color"
      >
        <PaintBucket className="w-4 h-4" />
      </Button>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Alignment */}
      <Button
        onClick={() => handleAlignment('left')}
        variant="outline"
        size="sm"
        className="text-slate-600 hover:bg-slate-100"
        title="Align Left"
      >
        <AlignLeft className="w-4 h-4" />
      </Button>

      <Button
        onClick={() => handleAlignment('center')}
        variant="outline"
        size="sm"
        className="text-slate-600 hover:bg-slate-100"
        title="Align Center"
      >
        <AlignCenter className="w-4 h-4" />
      </Button>

      <Button
        onClick={() => handleAlignment('right')}
        variant="outline"
        size="sm"
        className="text-slate-600 hover:bg-slate-100"
        title="Align Right"
      >
        <AlignRight className="w-4 h-4" />
      </Button>

      <Button
        onClick={() => handleAlignment('justify')}
        variant="outline"
        size="sm"
        className="text-slate-600 hover:bg-slate-100"
        title="Justify"
      >
        <AlignJustify className="w-4 h-4" />
      </Button>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Lists */}
      <Button
        onClick={handleUnorderedList}
        variant="outline"
        size="sm"
        className="text-slate-600 hover:bg-slate-100"
        title="Bullet List"
      >
        <List className="w-4 h-4" />
      </Button>
      
      <Button
        onClick={handleOrderedList}
        variant="outline"
        size="sm"
        className="text-slate-600 hover:bg-slate-100"
        title="Numbered List"
      >
        <ListOrdered className="w-4 h-4" />
      </Button>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Insert Elements */}
      <Button
        onClick={handleLink}
        variant="outline"
        size="sm"
        className="text-slate-600 hover:bg-slate-100"
        title="Insert Link"
      >
        <Link className="w-4 h-4" />
      </Button>
      
      <Button
        onClick={handleImage}
        variant="outline"
        size="sm"
        className="text-slate-600 hover:bg-slate-100"
        title="Insert Image"
      >
        <Image className="w-4 h-4" />
      </Button>

      <Button
        onClick={handleTable}
        variant="outline"
        size="sm"
        className="text-slate-600 hover:bg-slate-100"
        title="Insert Table"
      >
        <Table className="w-4 h-4" />
      </Button>

      <Button
        onClick={handleBlockquote}
        variant="outline"
        size="sm"
        className="text-slate-600 hover:bg-slate-100"
        title="Blockquote"
      >
        <Quote className="w-4 h-4" />
      </Button>

      <Button
        onClick={handleCode}
        variant="outline"
        size="sm"
        className="text-slate-600 hover:bg-slate-100"
        title="Inline Code"
      >
        <Code className="w-4 h-4" />
      </Button>

      <Button
        onClick={handleCodeBlock}
        variant="outline"
        size="sm"
        className="text-slate-600 hover:bg-slate-100"
        title="Code Block"
      >
        &lt;/&gt;
      </Button>

      <Button
        onClick={handleHorizontalRule}
        variant="outline"
        size="sm"
        className="text-slate-600 hover:bg-slate-100"
        title="Horizontal Rule"
      >
        <Minus className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default EditorToolbar;
