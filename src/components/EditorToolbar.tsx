
import { Button } from '@/components/ui/button';
import { Bold, Italic, Underline, Link, Type, Image, List, ListOrdered } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface EditorToolbarProps {
  onInsertCode: (code: string) => void;
  selectedText?: string;
}

const EditorToolbar = ({ onInsertCode, selectedText }: EditorToolbarProps) => {
  const handleBold = () => {
    if (selectedText) {
      onInsertCode(`<b>${selectedText}</b>`);
    } else {
      onInsertCode('<b>Bold text</b>');
    }
  };

  const handleItalic = () => {
    if (selectedText) {
      onInsertCode(`<i>${selectedText}</i>`);
    } else {
      onInsertCode('<i>Italic text</i>');
    }
  };

  const handleUnderline = () => {
    if (selectedText) {
      onInsertCode(`<u>${selectedText}</u>`);
    } else {
      onInsertCode('<u>Underlined text</u>');
    }
  };

  const handleLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      const linkText = selectedText || 'Link text';
      onInsertCode(`<a href="${url}">${linkText}</a>`);
    }
  };

  const handleHeading = () => {
    const headingText = selectedText || 'Heading';
    onInsertCode(`<h2>${headingText}</h2>`);
  };

  const handleParagraph = () => {
    const paragraphText = selectedText || 'Your paragraph text here.';
    onInsertCode(`<p>${paragraphText}</p>`);
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

  return (
    <div className="flex flex-wrap gap-2 p-3 bg-slate-50 border-b border-slate-200">
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

      <div className="w-px h-6 bg-slate-300 mx-1"></div>
      
      <Button
        onClick={handleHeading}
        variant="outline"
        size="sm"
        className="text-slate-600 hover:bg-slate-100"
        title="Heading"
      >
        <Type className="w-4 h-4" />
      </Button>
      
      <Button
        onClick={handleParagraph}
        variant="outline"
        size="sm"
        className="text-slate-600 hover:bg-slate-100"
        title="Paragraph"
      >
        P
      </Button>

      <div className="w-px h-6 bg-slate-300 mx-1"></div>
      
      <Button
        onClick={handleLink}
        variant="outline"
        size="sm"
        className="text-slate-600 hover:bg-slate-100"
        title="Add Link"
      >
        <Link className="w-4 h-4" />
      </Button>
      
      <Button
        onClick={handleImage}
        variant="outline"
        size="sm"
        className="text-slate-600 hover:bg-slate-100"
        title="Add Image"
      >
        <Image className="w-4 h-4" />
      </Button>

      <div className="w-px h-6 bg-slate-300 mx-1"></div>
      
      <Button
        onClick={handleUnorderedList}
        variant="outline"
        size="sm"
        className="text-slate-600 hover:bg-slate-100"
        title="Unordered List"
      >
        <List className="w-4 h-4" />
      </Button>
      
      <Button
        onClick={handleOrderedList}
        variant="outline"
        size="sm"
        className="text-slate-600 hover:bg-slate-100"
        title="Ordered List"
      >
        <ListOrdered className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default EditorToolbar;
