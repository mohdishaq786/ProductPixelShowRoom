
import React from 'react';
import { Button } from "@/components/ui/button";
import { maskLicensePlate } from '@/utils/imageUtils';
import { Card } from '@/components/ui/card';
import { Image } from 'lucide-react';

interface LicensePlateMaskerProps {
  originalImage: string;
  onImageProcessed: (processedImage: string) => void;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
}

const LicensePlateMasker: React.FC<LicensePlateMaskerProps> = ({ 
  originalImage, 
  onImageProcessed,
  isProcessing,
  setIsProcessing
}) => {
  const handleMaskLicensePlate = async () => {
    setIsProcessing(true);
    
    try {
      const processedImage = await maskLicensePlate(originalImage);
      onImageProcessed(processedImage);
    } catch (error) {
      console.error("Error masking license plate:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <Card className="p-6 border border-slate-200 bg-white shadow-sm hover:shadow transition-all rounded-xl">
      <div className="flex items-start mb-4">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
          <Image className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-1 text-slate-800">License Plate Masking</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Automatically detect and blur license plates for privacy and compliance.
          </p>
        </div>
      </div>
      
      <div className="mt-6">
        <Button 
          onClick={handleMaskLicensePlate} 
          disabled={isProcessing || !originalImage}
          variant="outline"
          className="w-full font-medium border-2 border-blue-200 hover:bg-blue-50 text-blue-700 shadow-sm hover:shadow transition-all py-6"
          size="lg"
        >
          {isProcessing ? (
            <>
              <span className="mr-2 inline-block w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
              Processing...
            </>
          ) : 'Mask License Plate'}
        </Button>
      </div>
    </Card>
  );
};

export default LicensePlateMasker;
