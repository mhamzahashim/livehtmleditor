import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { PdfSettings } from '@/pages/PdfConverter';

interface PdfPreviewProps {
  htmlContent: string;
  settings: PdfSettings;
}

const PdfPreview = ({ htmlContent, settings }: PdfPreviewProps) => {
  const previewRef = useRef<HTMLIFrameElement>(null);

  const updatePreview = () => {
    if (previewRef.current) {
      const doc = previewRef.current.contentDocument;
      if (doc) {
        const { pageSize, orientation, margin } = settings;
        
        // Calculate page dimensions based on settings
        const pageDimensions = {
          A4: { width: orientation === 'portrait' ? 210 : 297, height: orientation === 'portrait' ? 297 : 210 },
          A3: { width: orientation === 'portrait' ? 297 : 420, height: orientation === 'portrait' ? 420 : 297 },
          Letter: { width: orientation === 'portrait' ? 216 : 279, height: orientation === 'portrait' ? 279 : 216 },
          Legal: { width: orientation === 'portrait' ? 216 : 356, height: orientation === 'portrait' ? 356 : 216 },
        };

        const { width, height } = pageDimensions[pageSize];
        
        doc.open();
        doc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>PDF Preview</title>
              <style>
                @page {
                  size: ${pageSize} ${orientation};
                  margin: ${margin.top}mm ${margin.right}mm ${margin.bottom}mm ${margin.left}mm;
                }
                
                body { 
                  font-family: Arial, sans-serif; 
                  line-height: 1.6;
                  margin: 0;
                  padding: ${margin.top}mm ${margin.right}mm ${margin.bottom}mm ${margin.left}mm;
                  max-width: ${width - margin.left - margin.right}mm;
                  min-height: ${height - margin.top - margin.bottom}mm;
                  background: white;
                  color: black;
                  font-size: 12pt;
                }
                
                * { 
                  box-sizing: border-box; 
                }
                
                h1, h2, h3, h4, h5, h6 {
                  color: black;
                  margin-top: 1em;
                  margin-bottom: 0.5em;
                }
                
                p {
                  margin-bottom: 1em;
                }
                
                img {
                  max-width: 100%;
                  height: auto;
                }
                
                table {
                  border-collapse: collapse;
                  width: 100%;
                  margin-bottom: 1em;
                }
                
                th, td {
                  border: 1px solid #ddd;
                  padding: 8px;
                  text-align: left;
                }
                
                th {
                  background-color: #f5f5f5;
                  font-weight: bold;
                }
                
                code {
                  background-color: #f5f5f5;
                  padding: 2px 4px;
                  border-radius: 3px;
                  font-family: monospace;
                }
                
                pre {
                  background-color: #f5f5f5;
                  padding: 10px;
                  border-radius: 5px;
                  overflow-x: auto;
                }
                
                blockquote {
                  border-left: 4px solid #ddd;
                  margin: 1em 0;
                  padding-left: 1em;
                  color: #666;
                }
                
                /* Print-specific styles */
                @media print {
                  body {
                    print-color-adjust: exact;
                    -webkit-print-color-adjust: exact;
                  }
                }
              </style>
            </head>
            <body>
              ${htmlContent}
            </body>
          </html>
        `);
        doc.close();
      }
    }
  };

  useEffect(() => {
    updatePreview();
  }, [htmlContent, settings]);

  const handleQuickDownload = async () => {
    try {
      const { default: jsPDF } = await import('jspdf');
      const { default: html2canvas } = await import('html2canvas');
      
      if (previewRef.current?.contentDocument?.body) {
        const canvas = await html2canvas(previewRef.current.contentDocument.body, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff'
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF(
          settings.orientation === 'portrait' ? 'p' : 'l',
          'mm',
          settings.pageSize.toLowerCase() as any
        );
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pdfWidth - settings.margin.left - settings.margin.right;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(
          imgData, 
          'PNG', 
          settings.margin.left, 
          settings.margin.top, 
          imgWidth, 
          imgHeight
        );

        pdf.save(`preview-${Date.now()}.pdf`);
      }
    } catch (error) {
      console.error('Quick download failed:', error);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Eye className="h-5 w-5" />
              PDF Preview
            </CardTitle>
            <Badge variant="secondary">{settings.pageSize}</Badge>
            <Badge variant="outline">{settings.orientation}</Badge>
          </div>
          <Button size="sm" variant="outline" onClick={handleQuickDownload}>
            <Download className="h-4 w-4 mr-2" />
            Quick Save
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <div className="h-full border rounded-md bg-gray-100 p-4 overflow-auto">
          <div className="bg-white shadow-lg mx-auto" style={{
            width: settings.orientation === 'portrait' ? '210mm' : '297mm',
            minHeight: settings.orientation === 'portrait' ? '297mm' : '210mm',
            transform: 'scale(0.6)',
            transformOrigin: 'top center'
          }}>
            <iframe
              ref={previewRef}
              className="w-full h-full border-0"
              onLoad={updatePreview}
              title="PDF Preview"
              sandbox="allow-same-origin"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PdfPreview;