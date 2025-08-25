import { useState, useRef } from 'react';
import * as React from 'react';
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
    console.log('Starting PDF conversion...');
    setIsConverting(true);
    try {
      console.log('Importing libraries...');
      const { default: jsPDF } = await import('jspdf');
      const { default: html2canvas } = await import('html2canvas');
      console.log('Libraries imported successfully');
      
      // Create a temporary div with the HTML content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlContent;
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.width = '794px'; // A4 width in pixels at 96 DPI
      tempDiv.style.padding = '40px';
      tempDiv.style.backgroundColor = 'white';
      tempDiv.style.fontFamily = 'Arial, sans-serif';
      tempDiv.style.fontSize = '14px';
      tempDiv.style.lineHeight = '1.6';
      tempDiv.style.color = 'black';
      document.body.appendChild(tempDiv);

      // Wait for any images to load
      const images = tempDiv.querySelectorAll('img');
      await Promise.all(Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.onload = img.onerror = resolve;
        });
      }));

      const canvas = await html2canvas(tempDiv, {
        scale: 2, // Reduced scale to prevent memory issues
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: tempDiv.scrollWidth,
        height: tempDiv.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        logging: false // Disable logging to improve performance
      });

      document.body.removeChild(tempDiv);

      // Convert to JPEG with compression to reduce size
      const imgData = canvas.toDataURL('image/jpeg', 0.85);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save(`html-to-pdf-${Date.now()}.pdf`);
      
      toast({
        title: "PDF Generated",
        description: "Your PDF has been downloaded successfully.",
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
    if (previewRef.current && previewRef.current.contentDocument) {
      const doc = previewRef.current.contentDocument;
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; color: black; background: white; }
              * { box-sizing: border-box; }
              h1, h2, h3, h4, h5, h6 { color: black; }
              p { color: black; }
            </style>
          </head>
          <body>${htmlContent}</body>
        </html>
      `);
      doc.close();
    }
  };

  // Update preview when content changes
  React.useEffect(() => {
    const timer = setTimeout(() => {
      updatePreview();
    }, 100);
    return () => clearTimeout(timer);
  }, [htmlContent]);

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
                sandbox="allow-same-origin allow-scripts"
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PdfConverterEditor;