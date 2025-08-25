import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Settings, FileText, Palette } from 'lucide-react';
import type { PdfSettings as PdfSettingsType } from '@/pages/PdfConverter';

interface PdfSettingsProps {
  settings: PdfSettingsType;
  onSettingsChange: (settings: PdfSettingsType) => void;
}

const PdfSettings = ({ settings, onSettingsChange }: PdfSettingsProps) => {
  const updateSettings = (updates: Partial<PdfSettingsType>) => {
    onSettingsChange({ ...settings, ...updates });
  };

  const updateMargin = (side: keyof PdfSettingsType['margin'], value: number) => {
    updateSettings({
      margin: { ...settings.margin, [side]: value }
    });
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Settings className="h-5 w-5" />
          PDF Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Page Settings */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <Label className="text-sm font-medium">Page Settings</Label>
          </div>
          
          <div className="space-y-3">
            <div>
              <Label htmlFor="pageSize" className="text-sm">Page Size</Label>
              <Select
                value={settings.pageSize}
                onValueChange={(value: PdfSettingsType['pageSize']) => 
                  updateSettings({ pageSize: value })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A4">A4 (210 × 297 mm)</SelectItem>
                  <SelectItem value="A3">A3 (297 × 420 mm)</SelectItem>
                  <SelectItem value="Letter">Letter (8.5 × 11 in)</SelectItem>
                  <SelectItem value="Legal">Legal (8.5 × 14 in)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="orientation" className="text-sm">Orientation</Label>
              <Select
                value={settings.orientation}
                onValueChange={(value: PdfSettingsType['orientation']) => 
                  updateSettings({ orientation: value })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="portrait">Portrait</SelectItem>
                  <SelectItem value="landscape">Landscape</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator />

        {/* Margins */}
        <div className="space-y-4">
          <Label className="text-sm font-medium">Margins (mm)</Label>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="marginTop" className="text-xs text-muted-foreground">
                Top: {settings.margin.top}mm
              </Label>
              <Slider
                value={[settings.margin.top]}
                onValueChange={(value) => updateMargin('top', value[0])}
                max={50}
                min={0}
                step={5}
                className="mt-2"
              />
            </div>
            
            <div>
              <Label htmlFor="marginBottom" className="text-xs text-muted-foreground">
                Bottom: {settings.margin.bottom}mm
              </Label>
              <Slider
                value={[settings.margin.bottom]}
                onValueChange={(value) => updateMargin('bottom', value[0])}
                max={50}
                min={0}
                step={5}
                className="mt-2"
              />
            </div>
            
            <div>
              <Label htmlFor="marginLeft" className="text-xs text-muted-foreground">
                Left: {settings.margin.left}mm
              </Label>
              <Slider
                value={[settings.margin.left]}
                onValueChange={(value) => updateMargin('left', value[0])}
                max={50}
                min={0}
                step={5}
                className="mt-2"
              />
            </div>
            
            <div>
              <Label htmlFor="marginRight" className="text-xs text-muted-foreground">
                Right: {settings.margin.right}mm
              </Label>
              <Slider
                value={[settings.margin.right]}
                onValueChange={(value) => updateMargin('right', value[0])}
                max={50}
                min={0}
                step={5}
                className="mt-2"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Quality Settings */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <Label className="text-sm font-medium">Quality Settings</Label>
          </div>
          
          <div className="space-y-3">
            <div>
              <Label htmlFor="quality" className="text-sm">Output Quality</Label>
              <Select
                value={settings.quality}
                onValueChange={(value: PdfSettingsType['quality']) => 
                  updateSettings({ quality: value })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low (Faster, Smaller)</SelectItem>
                  <SelectItem value="medium">Medium (Balanced)</SelectItem>
                  <SelectItem value="high">High (Best Quality)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="includeCSS" className="text-sm">Include CSS Styles</Label>
              <Switch
                id="includeCSS"
                checked={settings.includeCSS}
                onCheckedChange={(checked) => updateSettings({ includeCSS: checked })}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Export Options */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Quick Actions</Label>
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>Current Size:</span>
              <span>{settings.pageSize} {settings.orientation}</span>
            </div>
            <div className="flex justify-between">
              <span>Margins:</span>
              <span>{settings.margin.top}/{settings.margin.right}/{settings.margin.bottom}/{settings.margin.left}mm</span>
            </div>
            <div className="flex justify-between">
              <span>Quality:</span>
              <span className="capitalize">{settings.quality}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PdfSettings;