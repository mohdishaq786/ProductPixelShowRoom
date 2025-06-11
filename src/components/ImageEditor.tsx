import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Image, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { resetImages } from "@/redux/imageEditorSlice";
import { Card } from "@/components/ui/card";
import ImageUploadModal from "./ImageUploadModal";

interface ImageEditorProps {
  originalImage: string | null;
  onReset: () => void;
  onImageUpload: (payload: {
    carImage: File;
    backgroundImage?: File;
    logoImage?: File;
    logoPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  }) => void;
}

const ImageEditor: React.FC<ImageEditorProps> = ({
  originalImage,
  onReset,
  onImageUpload,
}) => {
  const dispatch = useAppDispatch();
  const { activeImage, isProcessing } = useAppSelector(
    (state) => state.imageEditor
  );

  const { toast } = useToast();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  useEffect(() => {
    // console.log("ImageEditor sees activeImage:", activeImage);
  }, [activeImage]);

  const handleDownload = () => {
    if (!activeImage) return;

    const link = document.createElement("a");
    link.href = activeImage;
    link.download = "pixelshowroom-edited-car.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Download Started",
      description: "Your edited image is downloading now.",
      duration: 3000,
    });
  };

  const handleReset = () => {
    onReset();
    // dispatch(resetImages());
  };

  if (!activeImage) {
    return (
      <div className="w-full max-w-3xl mx-auto mt-12 text-center">
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="bg-indigo-50 p-6 rounded-full mb-6">
            <Image className="w-12 h-12 text-indigo-500" strokeWidth={1.5} />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Ready to Transform Your Car Images?
          </h2>
          <p className="text-gray-600 max-w-lg mb-8">
            Upload your car image and customize it with our professional tools.
            Add your logo, change backgrounds, and more.
          </p>

          <Button
            onClick={() => setUploadModalOpen(true)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-6 text-lg"
            size="lg"
          >
            <Image className="mr-2 h-5 w-5" /> Upload Car Image
          </Button>

          <ImageUploadModal
            open={uploadModalOpen}
            onOpenChange={setUploadModalOpen}
            onImageUpload={(payload) => {
              setUploadModalOpen(false);
              onImageUpload(payload); // delegate to parent
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto mt-8">
      <div className="grid grid-cols-1 gap-8">
        <Card className="overflow-hidden border border-slate-200 rounded-2xl shadow-md">
          <div className="bg-gradient-to-r from-slate-100 to-slate-50 p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-1">
              Image Preview
            </h2>
            <p className="text-slate-500 text-sm">Your customized car image</p>
          </div>

          <div className="relative bg-[#f8f9fb] overflow-hidden flex items-center justify-center p-8">
            {activeImage ? (
              <img
                src={activeImage}
                alt="Car"
                className="max-w-full max-h-[450px] object-contain rounded-md shadow-sm"
              />
            ) : (
              <div className="text-center text-slate-400 p-10 flex flex-col items-center">
                <Image className="w-16 h-16 mb-4 text-slate-300" />
                <p className="text-lg">No image available</p>
                <p className="text-sm text-slate-400">
                  Upload a car image to get started
                </p>
              </div>
            )}

            {isProcessing && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                <div className="text-white text-center">
                  <div className="w-20 h-20 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin mx-auto mb-4"></div>
                  <p className="text-xl font-medium">Processing</p>
                  <p className="text-sm opacity-80 mt-2">
                    This may take a moment...
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-white flex flex-wrap gap-4 justify-between">
            <Button
              onClick={() => setUploadModalOpen(true)}
              variant="outline"
              disabled={isProcessing}
              className="flex-1 py-6 border-slate-200 hover:bg-slate-50 transition-colors"
              size="lg"
            >
              <Image className="w-4 h-4 mr-2" />
              Change Image
            </Button>

            <Button
              onClick={handleDownload}
              className="flex-1 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all"
              disabled={isProcessing || !activeImage}
              size="lg"
            >
              <Download className="mr-2 h-4 w-4" /> Download Edited Image
            </Button>
          </div>
        </Card>

        <div className="flex justify-between items-center">
          <Button
            onClick={handleReset}
            variant="link"
            className="text-indigo-600 hover:text-indigo-800"
            disabled={isProcessing}
          >
            Upload New Image
          </Button>

          <Button
            variant="ghost"
            className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
            disabled={isProcessing}
          >
            <Save className="w-4 h-4 mr-2" />
            Save to Favorites
          </Button>
        </div>
      </div>

      <ImageUploadModal
        open={uploadModalOpen}
        onOpenChange={setUploadModalOpen}
        onImageUpload={(payload) => {
          setUploadModalOpen(false);
          onImageUpload(payload); // delegate to parent
        }}
      />
    </div>
  );
};

export default ImageEditor;
