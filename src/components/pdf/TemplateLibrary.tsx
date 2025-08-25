import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Mail, Users, Briefcase, GraduationCap, Heart, FileBarChart } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  category: 'business' | 'personal' | 'educational' | 'legal';
  icon: React.ComponentType<{ className?: string }>;
  html: string;
}

const templates: Template[] = [
  {
    id: 'business-letter',
    name: 'Business Letter',
    description: 'Professional business letter template with company letterhead',
    category: 'business',
    icon: Mail,
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px;">
          <h1 style="color: #333; margin: 0;">Your Company Name</h1>
          <p style="margin: 5px 0; color: #666;">123 Business Street, City, State 12345</p>
          <p style="margin: 5px 0; color: #666;">Phone: (555) 123-4567 | Email: info@company.com</p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <p style="margin: 0;"><strong>Date:</strong> [Date]</p>
          <br>
          <p style="margin: 0;"><strong>To:</strong></p>
          <p style="margin: 5px 0;">[Recipient Name]</p>
          <p style="margin: 5px 0;">[Recipient Address]</p>
          <p style="margin: 5px 0;">[City, State ZIP]</p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <p style="margin-bottom: 15px;"><strong>Subject:</strong> [Letter Subject]</p>
          
          <p>Dear [Recipient Name],</p>
          
          <p>This is a professional business letter template. Replace this text with your message content. You can add multiple paragraphs as needed.</p>
          
          <p>This template includes proper formatting for business correspondence, including company letterhead, recipient information, and professional closing.</p>
          
          <p>Thank you for your time and consideration.</p>
          
          <p>Sincerely,</p>
          <br>
          <p><strong>[Your Name]</strong></p>
          <p>[Your Title]</p>
          <p>[Your Company]</p>
        </div>
      </div>
    `
  },
  {
    id: 'invoice',
    name: 'Invoice Template',
    description: 'Professional invoice template for billing clients',
    category: 'business',
    icon: FileBarChart,
    html: `
      <div style="max-width: 700px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 30px;">
          <div>
            <h1 style="color: #2563eb; margin: 0; font-size: 28px;">INVOICE</h1>
            <p style="color: #666; margin: 5px 0;">Invoice #: INV-001</p>
            <p style="color: #666; margin: 5px 0;">Date: ${new Date().toLocaleDateString()}</p>
          </div>
          <div style="text-align: right;">
            <h2 style="color: #333; margin: 0;">Your Company</h2>
            <p style="margin: 5px 0; color: #666;">123 Business Street</p>
            <p style="margin: 5px 0; color: #666;">City, State 12345</p>
            <p style="margin: 5px 0; color: #666;">phone@company.com</p>
          </div>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h3 style="color: #333; margin-bottom: 10px;">Bill To:</h3>
          <p style="margin: 5px 0;"><strong>[Client Name]</strong></p>
          <p style="margin: 5px 0;">[Client Address]</p>
          <p style="margin: 5px 0;">[City, State ZIP]</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
          <thead>
            <tr style="background-color: #f8f9fa;">
              <th style="border: 1px solid #dee2e6; padding: 12px; text-align: left;">Description</th>
              <th style="border: 1px solid #dee2e6; padding: 12px; text-align: center;">Qty</th>
              <th style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">Rate</th>
              <th style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #dee2e6; padding: 12px;">Service Description</td>
              <td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;">1</td>
              <td style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">$100.00</td>
              <td style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">$100.00</td>
            </tr>
          </tbody>
        </table>
        
        <div style="text-align: right; margin-bottom: 30px;">
          <p style="margin: 5px 0;"><strong>Subtotal: $100.00</strong></p>
          <p style="margin: 5px 0;">Tax (8%): $8.00</p>
          <h3 style="color: #2563eb; margin: 10px 0;">Total: $108.00</h3>
        </div>
        
        <div style="border-top: 1px solid #dee2e6; padding-top: 20px;">
          <p><strong>Payment Terms:</strong> Net 30 days</p>
          <p><strong>Note:</strong> Thank you for your business!</p>
        </div>
      </div>
    `
  },
  {
    id: 'resume',
    name: 'Resume Template',
    description: 'Clean and professional resume template',
    category: 'personal',
    icon: Users,
    html: `
      <div style="max-width: 650px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.6;">
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 3px solid #2563eb; padding-bottom: 20px;">
          <h1 style="color: #333; margin: 0; font-size: 32px;">[Your Name]</h1>
          <p style="color: #666; margin: 10px 0; font-size: 18px;">[Your Professional Title]</p>
          <p style="color: #666; margin: 5px 0;">📧 your.email@example.com | 📱 (555) 123-4567 | 🌐 yourwebsite.com</p>
        </div>
        
        <div style="margin-bottom: 25px;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px;">Professional Summary</h2>
          <p>Experienced professional with a proven track record in [your field]. Skilled in [key skills] with a passion for [relevant interests]. Seeking to leverage expertise in [area] to contribute to [type of organization].</p>
        </div>
        
        <div style="margin-bottom: 25px;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px;">Experience</h2>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #333; margin-bottom: 5px;">[Job Title] - [Company Name]</h3>
            <p style="color: #666; margin-bottom: 10px; font-style: italic;">[Start Date] - [End Date] | [Location]</p>
            <ul style="margin-left: 20px;">
              <li>Achievement or responsibility description</li>
              <li>Quantified accomplishment with metrics</li>
              <li>Key project or initiative you led</li>
            </ul>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #333; margin-bottom: 5px;">[Previous Job Title] - [Previous Company]</h3>
            <p style="color: #666; margin-bottom: 10px; font-style: italic;">[Start Date] - [End Date] | [Location]</p>
            <ul style="margin-left: 20px;">
              <li>Key responsibility or achievement</li>
              <li>Process improvement or innovation</li>
              <li>Team collaboration or leadership example</li>
            </ul>
          </div>
        </div>
        
        <div style="margin-bottom: 25px;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px;">Education</h2>
          <h3 style="color: #333; margin-bottom: 5px;">[Degree] in [Field of Study]</h3>
          <p style="color: #666; margin-bottom: 5px;">[University Name] | [Graduation Year]</p>
          <p style="color: #666;">GPA: [X.XX] (if relevant) | Relevant Coursework: [courses]</p>
        </div>
        
        <div style="margin-bottom: 25px;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px;">Skills</h2>
          <div style="display: flex; flex-wrap: wrap; gap: 10px;">
            <span style="background-color: #f3f4f6; padding: 5px 10px; border-radius: 15px; font-size: 14px;">Skill 1</span>
            <span style="background-color: #f3f4f6; padding: 5px 10px; border-radius: 15px; font-size: 14px;">Skill 2</span>
            <span style="background-color: #f3f4f6; padding: 5px 10px; border-radius: 15px; font-size: 14px;">Skill 3</span>
            <span style="background-color: #f3f4f6; padding: 5px 10px; border-radius: 15px; font-size: 14px;">Skill 4</span>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'report',
    name: 'Report Template',
    description: 'Structured report template for academic or business use',
    category: 'educational',
    icon: GraduationCap,
    html: `
      <div style="max-width: 700px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.6;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="color: #1f2937; margin-bottom: 10px; font-size: 28px;">[Report Title]</h1>
          <p style="color: #6b7280; margin: 5px 0;">Prepared by: [Your Name]</p>
          <p style="color: #6b7280; margin: 5px 0;">Date: ${new Date().toLocaleDateString()}</p>
          <p style="color: #6b7280; margin: 5px 0;">Organization: [Your Organization]</p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 5px;">Executive Summary</h2>
          <p>This section provides a brief overview of the report's key findings, conclusions, and recommendations. It should be concise yet comprehensive enough for readers to understand the main points without reading the entire document.</p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 5px;">1. Introduction</h2>
          <p>This report examines [topic/subject]. The purpose of this analysis is to [state purpose]. The scope of this report includes [define scope] and excludes [define limitations].</p>
          
          <h3 style="color: #374151; margin-top: 20px;">1.1 Background</h3>
          <p>Provide context and background information relevant to the report topic.</p>
          
          <h3 style="color: #374151;">1.2 Objectives</h3>
          <ul>
            <li>Primary objective of the report</li>
            <li>Secondary objective</li>
            <li>Tertiary objective</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 5px;">2. Methodology</h2>
          <p>Describe the methods, approaches, and tools used in conducting the research or analysis.</p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 5px;">3. Findings</h2>
          <p>Present the main findings of your research or analysis. Use subheadings to organize different aspects of your findings.</p>
          
          <h3 style="color: #374151;">3.1 Key Finding One</h3>
          <p>Detailed explanation of the first key finding.</p>
          
          <h3 style="color: #374151;">3.2 Key Finding Two</h3>
          <p>Detailed explanation of the second key finding.</p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 5px;">4. Analysis</h2>
          <p>Analyze and interpret the findings. Discuss patterns, trends, implications, and significance.</p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 5px;">5. Recommendations</h2>
          <ol>
            <li><strong>Recommendation One:</strong> Description and rationale</li>
            <li><strong>Recommendation Two:</strong> Description and rationale</li>
            <li><strong>Recommendation Three:</strong> Description and rationale</li>
          </ol>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 5px;">6. Conclusion</h2>
          <p>Summarize the main points of the report and reiterate the key recommendations.</p>
        </div>
        
        <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 40px; font-size: 12px; color: #6b7280;">
          <p><strong>Contact Information:</strong></p>
          <p>[Your Name] | [Your Title] | [Email] | [Phone]</p>
        </div>
      </div>
    `
  },
  {
    id: 'wedding-invitation',
    name: 'Wedding Invitation',
    description: 'Elegant wedding invitation template',
    category: 'personal',
    icon: Heart,
    html: `
      <div style="max-width: 500px; margin: 0 auto; font-family: 'Georgia', serif; text-align: center; padding: 40px; border: 3px solid #d4af37; background: linear-gradient(135deg, #fef9e7, #fef3c7);">
        <div style="margin-bottom: 30px;">
          <h1 style="color: #8b5a2b; font-size: 24px; font-weight: normal; letter-spacing: 2px; margin: 0;">You're Invited</h1>
          <div style="width: 100px; height: 2px; background-color: #d4af37; margin: 15px auto;"></div>
        </div>
        
        <div style="margin-bottom: 30px;">
          <p style="color: #6b5b47; font-size: 16px; margin: 0; font-style: italic;">Together with their families</p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h2 style="color: #8b5a2b; font-size: 32px; font-weight: normal; margin: 10px 0; font-family: 'Brush Script MT', cursive;">[Bride's Name]</h2>
          <p style="color: #d4af37; font-size: 20px; margin: 15px 0;">&amp;</p>
          <h2 style="color: #8b5a2b; font-size: 32px; font-weight: normal; margin: 10px 0; font-family: 'Brush Script MT', cursive;">[Groom's Name]</h2>
        </div>
        
        <div style="margin-bottom: 30px;">
          <p style="color: #6b5b47; font-size: 18px; margin: 0;">request the pleasure of your company</p>
          <p style="color: #6b5b47; font-size: 18px; margin: 5px 0;">at their wedding celebration</p>
        </div>
        
        <div style="background-color: white; padding: 25px; border: 1px solid #d4af37; margin: 30px 0;">
          <p style="color: #8b5a2b; font-size: 18px; font-weight: bold; margin: 5px 0;">[Date]</p>
          <p style="color: #6b5b47; font-size: 16px; margin: 5px 0;">at [Time]</p>
          <div style="width: 50px; height: 1px; background-color: #d4af37; margin: 15px auto;"></div>
          <p style="color: #8b5a2b; font-size: 16px; font-weight: bold; margin: 5px 0;">[Venue Name]</p>
          <p style="color: #6b5b47; font-size: 14px; margin: 5px 0;">[Venue Address]</p>
          <p style="color: #6b5b47; font-size: 14px; margin: 5px 0;">[City, State]</p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <p style="color: #6b5b47; font-size: 14px; margin: 5px 0;">Reception to follow</p>
        </div>
        
        <div style="border-top: 1px solid #d4af37; padding-top: 20px;">
          <p style="color: #6b5b47; font-size: 14px; margin: 5px 0;">RSVP by [RSVP Date]</p>
          <p style="color: #6b5b47; font-size: 14px; margin: 5px 0;">[Contact Information]</p>
        </div>
        
        <div style="margin-top: 30px;">
          <p style="color: #8b5a2b; font-size: 16px; font-style: italic;">"Two souls, one heart"</p>
        </div>
      </div>
    `
  }
];

interface TemplateLibraryProps {
  onSelectTemplate: (html: string) => void;
}

const TemplateLibrary = ({ onSelectTemplate }: TemplateLibraryProps) => {
  const getCategoryColor = (category: Template['category']) => {
    switch (category) {
      case 'business':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'personal':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'educational':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'legal':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Template Library</h2>
        <p className="text-muted-foreground">Choose from our collection of professional templates</p>
      </div>

      <ScrollArea className="h-[600px]">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => {
            const IconComponent = template.icon;
            return (
              <Card key={template.id} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                    </div>
                    <Badge className={getCategoryColor(template.category)}>
                      {template.category}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {template.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col justify-between flex-1">
                  <div className="flex-1" />
                  <Button 
                    onClick={() => onSelectTemplate(template.html)}
                    className="w-full"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TemplateLibrary;