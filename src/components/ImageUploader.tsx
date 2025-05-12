
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, Image } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        processFile(file);
      }
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  };
  
  const processFile = (file: File) => {
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    // Pass file to parent component
    onImageUpload(file);
  };
  
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`relative rounded-xl overflow-hidden p-10 transition-all duration-300 ${
          isDragging 
            ? 'border-2 border-dashed border-blue-500 bg-blue-50' 
            : 'border-2 border-dashed border-gray-300 hover:border-blue-400 bg-white shadow-sm hover:shadow'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {!preview ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="mb-6 bg-blue-50 p-6 rounded-full">
              <Upload className="w-12 h-12 text-blue-500" strokeWidth={1.5} />
            </div>
            
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Upload Your Vehicle Photo</h3>
            <p className="text-gray-500 mb-8 text-center max-w-md">
              Upload a high-quality image of your vehicle for the best results. 
              Our AI tools work best with clear, well-lit photos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleButtonClick} 
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6"
                size="lg"
              >
                <Upload className="mr-2 h-5 w-5" /> Choose File
              </Button>
              <Button 
                variant="outline" 
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
                size="lg"
                onClick={() => {
                  // Show sample images or suggestions
                }}
              >
                <Image className="mr-2 h-5 w-5" /> View Examples
              </Button>
            </div>
            
            <input 
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-lg mx-auto">
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <div className="font-medium text-blue-800">High Resolution</div>
                <div className="text-xs text-blue-600">Recommended</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <div className="font-medium text-blue-800">Clear Lighting</div>
                <div className="text-xs text-blue-600">Improves results</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <div className="font-medium text-blue-800">Neutral Background</div>
                <div className="text-xs text-blue-600">For best output</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-md mx-auto mb-6">
              <img 
                src={preview} 
                alt="Car preview" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <Button 
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => setPreview(null)}
              >
                Change Image
              </Button>
            </div>
            <p className="text-center text-gray-500">
              Click "Start Editing" below to begin enhancing your image
            </p>
          </div>
        )}
      </div>
      
      <p className="text-sm text-gray-500 mt-4 text-center">
        Supported formats: JPG, PNG, WEBP | Max size: 10MB
      </p>
    </div>
  );
};

export default ImageUploader;
