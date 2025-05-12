
import React from 'react';
import { Button } from "@/components/ui/button";
import { removeBackground } from '@/utils/imageUtils';
import { Card } from '@/components/ui/card';
import { Eraser } from 'lucide-react';

interface BackgroundRemoverProps {
  originalImage: string;
  onImageProcessed: (processedImage: string) => void;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
}

const BackgroundRemover: React.FC<BackgroundRemoverProps> = ({ 
  originalImage, 
  onImageProcessed,
  isProcessing,
  setIsProcessing
}) => {
  const handleRemoveBackground = async () => {
    setIsProcessing(true);
    
    try {
      const processedImage = await removeBackground(originalImage);
      onImageProcessed(processedImage);
    } catch (error) {
      console.error("Error removing background:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <Card className="p-6 border border-slate-200 bg-white shadow-sm hover:shadow transition-all rounded-xl">
      <div className="flex items-start mb-4">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
          <Eraser className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-1 text-slate-800">Background Removal</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Instantly remove the background from your car image, creating a clean professional look.
          </p>
        </div>
      </div>
      
      <div className="mt-6">
        <Button 
          onClick={handleRemoveBackground} 
          disabled={isProcessing || !originalImage}
          className="w-full font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all py-6"
          size="lg"
        >
          {isProcessing ? (
            <>
              <span className="mr-2 inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Processing...
            </>
          ) : 'Remove Background'}
        </Button>
      </div>
    </Card>
  );
};

export default BackgroundRemover;
