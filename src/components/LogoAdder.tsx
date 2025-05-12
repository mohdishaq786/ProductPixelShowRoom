
import React from 'react';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { addLogo } from '@/utils/imageUtils';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { setProcessedImage, setIsProcessing, setLogoPosition } from '@/redux/imageEditorSlice';

interface LogoAdderProps {
  originalImage: string;
  onImageProcessed: (processedImage: string) => void;
}

const LogoAdder: React.FC<LogoAdderProps> = ({ 
  originalImage, 
  onImageProcessed,
}) => {
  const dispatch = useAppDispatch();
  const logoPosition = useAppSelector(state => state.imageEditor.logoPosition);
  const isProcessing = useAppSelector(state => state.imageEditor.isProcessing);
  
  const handleAddLogo = async () => {
    dispatch(setIsProcessing(true));
    
    try {
      // Use the logo adding function
      const processedImage = await addLogo(originalImage, logoPosition);
      onImageProcessed(processedImage);
      dispatch(setProcessedImage(processedImage));
    } catch (error) {
      console.error("Error adding logo:", error);
    } finally {
      dispatch(setIsProcessing(false));
    }
  };
  
  return (
    <div className="p-6 border rounded-lg bg-white shadow-sm transition-all hover:shadow-md">
      <h3 className="font-medium text-lg mb-2">Logo Placement</h3>
      <p className="text-pixelgray-500 text-sm mb-6">
        Add your PixelShowroom logo to the vehicle image
      </p>
      
      <div className="mb-6">
        <RadioGroup 
          value={logoPosition}
          onValueChange={(value) => dispatch(setLogoPosition(value as any))}
          className="flex flex-col space-y-3"
        >
          <div className="flex items-center space-x-3 bg-gray-50 p-2 rounded-md hover:bg-gray-100 transition-colors">
            <RadioGroupItem value="top-left" id="top-left" className="text-pixelblue-600" />
            <Label htmlFor="top-left" className="cursor-pointer w-full">Top Left</Label>
          </div>
          <div className="flex items-center space-x-3 bg-gray-50 p-2 rounded-md hover:bg-gray-100 transition-colors">
            <RadioGroupItem value="top-right" id="top-right" className="text-pixelblue-600" />
            <Label htmlFor="top-right" className="cursor-pointer w-full">Top Right</Label>
          </div>
          <div className="flex items-center space-x-3 bg-gray-50 p-2 rounded-md hover:bg-gray-100 transition-colors">
            <RadioGroupItem value="bottom-left" id="bottom-left" className="text-pixelblue-600" />
            <Label htmlFor="bottom-left" className="cursor-pointer w-full">Bottom Left</Label>
          </div>
          <div className="flex items-center space-x-3 bg-gray-50 p-2 rounded-md hover:bg-gray-100 transition-colors">
            <RadioGroupItem value="bottom-right" id="bottom-right" className="text-pixelblue-600" />
            <Label htmlFor="bottom-right" className="cursor-pointer w-full">Bottom Right</Label>
          </div>
        </RadioGroup>
      </div>
      
      <Button 
        onClick={handleAddLogo} 
        disabled={isProcessing || !originalImage}
        variant="default"
        className="w-full gradient-bg"
      >
        {isProcessing ? (
          <>
            <span className="mr-2 inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Adding Logo...
          </>
        ) : 'Add Logo'}
      </Button>
    </div>
  );
};

export default LogoAdder;
