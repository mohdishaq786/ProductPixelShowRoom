
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { applyCustomBackground } from '@/utils/imageUtils';
import { Card } from '@/components/ui/card';

interface BackgroundCustomizerProps {
  originalImage: string;
  onImageProcessed: (processedImage: string) => void;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
}

const backgrounds = [
  { name: 'Studio White', value: '#ffffff' },
  { name: 'Studio Black', value: '#121212' },
  { name: 'Showroom Gray', value: '#f5f5f7' },
  { name: 'Dealership Blue', value: '#e6f0ff' },
  { name: 'Luxury Gold', value: '#faf3e0' },
];

const BackgroundCustomizer: React.FC<BackgroundCustomizerProps> = ({ 
  originalImage, 
  onImageProcessed,
  isProcessing,
  setIsProcessing
}) => {
  const [selectedBg, setSelectedBg] = useState(backgrounds[0].value);
  
  const handleApplyBackground = async () => {
    setIsProcessing(true);
    
    try {
      // Use the actual background customization function
      const processedImage = await applyCustomBackground(originalImage, selectedBg);
      onImageProcessed(processedImage);
    } catch (error) {
      console.error("Error applying custom background:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <Card className="p-4 border-slate-200">
      <h3 className="font-medium text-lg mb-2 text-slate-800">Background Customization</h3>
      <p className="text-slate-500 text-sm mb-4">
        Choose a professional background for your car image
      </p>
      
      <div className="mb-4">
        <Select value={selectedBg} onValueChange={setSelectedBg}>
          <SelectTrigger className="w-full border-slate-200">
            <SelectValue placeholder="Select background" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Backgrounds</SelectLabel>
              {backgrounds.map(bg => (
                <SelectItem key={bg.value} value={bg.value}>
                  <div className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-2 border border-slate-200" 
                      style={{ backgroundColor: bg.value }}
                    />
                    {bg.name}
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {backgrounds.map(bg => (
          <button
            key={bg.value}
            onClick={() => setSelectedBg(bg.value)}
            className={`w-8 h-8 rounded-full transition-all border ${
              selectedBg === bg.value ? 'ring-2 ring-blue-500 ring-offset-2' : 'border-slate-200'
            }`}
            style={{ backgroundColor: bg.value }}
            title={bg.name}
          />
        ))}
      </div>
      
      <Button 
        onClick={handleApplyBackground} 
        disabled={isProcessing || !originalImage}
        variant="secondary"
        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800"
      >
        {isProcessing ? 'Applying...' : 'Apply Background'}
      </Button>
    </Card>
  );
};

export default BackgroundCustomizer;
