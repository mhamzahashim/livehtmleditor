import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Code, FileDown, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PdfConverterEditorProps {
  htmlContent: string;
  onContentChange: (content: string) => void;
}

const PdfConverterEditor = ({ htmlContent, onContentChange }: PdfConverterEditorProps) => {
  const [isConverting, setIsConverting] = useState(false);
  const { toast } = useToast();

  const handleConvertToPdf = async () => {
    setIsConverting(true);
    try {
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
      tempDiv.style.fontFamily = 'Arial, sans-serif';
      tempDiv.style.fontSize = '12pt';
      tempDiv.style.lineHeight = '1.6';
      tempDiv.style.color = 'black';
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
      <CardContent className="flex-1 flex flex-col p-4">
        <Textarea
          value={htmlContent}
          onChange={(e) => onContentChange(e.target.value)}
          className="h-full min-h-[400px] font-mono text-sm resize-none"
          placeholder="Enter your HTML content here..."
        />
      </CardContent>
    </Card>
  );
};

export default PdfConverterEditor;