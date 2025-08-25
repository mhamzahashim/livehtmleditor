import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Code, Eye, FileDown, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PdfConverterEditorProps {
  htmlContent: string;
  onContentChange: (content: string) => void;
}

const PdfConverterEditor = ({ htmlContent, onContentChange }: PdfConverterEditorProps) => {
  const [isConverting, setIsConverting] = useState(false);
  const [activeTab, setActiveTab] = useState('html');
  const previewRef = useRef<HTMLIFrameElement>(null);
  const { toast } = useToast();

  const handleConvertToPdf = async () => {
    setIsConverting(true);
    try {
      // First try server-side conversion via Supabase Edge Function
      try {
        const response = await fetch('/api/convert-html-to-pdf', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ html: htmlContent })
        });
        
        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `document-${Date.now()}.pdf`;
          a.click();
          URL.revokeObjectURL(url);
          toast({
            title: "PDF Generated",
            description: "Your PDF has been downloaded successfully.",
          });
          return;
        }
      } catch (error) {
        console.log('Server-side conversion failed, falling back to client-side');
      }

      // Fallback to client-side conversion
      const { default: jsPDF } = await import('jspdf');
      const { default: html2canvas } = await import('html2canvas');
      
      // Create a temporary div with the HTML content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlContent;
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.width = '210mm'; // A4 width
      tempDiv.style.padding = '20mm';
      tempDiv.style.backgroundColor = 'white';
      document.body.appendChild(tempDiv);

      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      document.body.removeChild(tempDiv);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`document-${Date.now()}.pdf`);
      
      toast({
        title: "PDF Generated",
        description: "Your PDF has been downloaded successfully using client-side conversion.",
      });
    } catch (error) {
      console.error('PDF conversion failed:', error);
      toast({
        title: "Conversion Failed",
        description: "There was an error converting your HTML to PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConverting(false);
    }
  };

  const updatePreview = () => {
    if (previewRef.current) {
      const doc = previewRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
                * { box-sizing: border-box; }
              </style>
            </head>
            <body>${htmlContent}</body>
          </html>
        `);
        doc.close();
      }
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Code className="h-5 w-5" />
            HTML Editor
          </CardTitle>
          <Button 
            onClick={handleConvertToPdf} 
            disabled={isConverting}
            className="flex items-center gap-2"
          >
            {isConverting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <FileDown className="h-4 w-4" />
            )}
            {isConverting ? 'Converting...' : 'Download PDF'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-2 mx-4 mb-4">
            <TabsTrigger value="html" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              HTML Code
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="html" className="flex-1 mx-4 mb-4">
            <Textarea
              value={htmlContent}
              onChange={(e) => onContentChange(e.target.value)}
              className="h-full min-h-[400px] font-mono text-sm resize-none"
              placeholder="Enter your HTML content here..."
            />
          </TabsContent>
          
          <TabsContent value="preview" className="flex-1 mx-4 mb-4">
            <div className="h-full border rounded-md">
              <iframe
                ref={previewRef}
                className="w-full h-full rounded-md"
                onLoad={updatePreview}
                title="HTML Preview"
                sandbox="allow-same-origin"
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PdfConverterEditor;