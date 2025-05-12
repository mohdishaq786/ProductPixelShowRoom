import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload, Image as ImageIcon, Loader } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import {
  setLogoPosition,
  setOriginalImage,
  setIsProcessing,
} from "@/redux/imageEditorSlice";

interface ImageUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // onImageUpload: (file: File) => void;
  onImageUpload: (payload: {
    carImage: File;
    backgroundImage?: File;
    logoImage?: File;
    logoPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  }) => void;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  open,
  onOpenChange,
  onImageUpload,
}) => {
  const dispatch = useAppDispatch();
  const [carImagePreview, setCarImagePreview] = useState<string | null>(null);
  const [carImageFile, setCarImageFile] = useState<File | null>(null);
  const [backgroundImageFile, setBackgroundImageFile] = useState<File | null>(
    null
  );
  const [logoImageFile, setLogoImageFile] = useState<File | null>(null);
  const [backgroundImagePreview, setBackgroundImagePreview] = useState<
    string | null
  >(null);
  const [logoImagePreview, setLogoImagePreview] = useState<string | null>(null);
  const [logoPosition, setLogoPositionState] = useState<
    "top-left" | "top-right" | "bottom-left" | "bottom-right"
  >("bottom-right");
  const [isUploading, setIsUploading] = useState(false);

  const carImageInputRef = useRef<HTMLInputElement>(null);
  const backgroundImageInputRef = useRef<HTMLInputElement>(null);
  const logoImageInputRef = useRef<HTMLInputElement>(null);

  const handleCarImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setCarImageFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        setCarImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      //my change
      setBackgroundImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setBackgroundImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setLogoImageFile(file); //my
      const reader = new FileReader();
      reader.onload = () => {
        setLogoImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      // Handle logo image upload (can be implemented later)
    }
  };

  const handleLogoPositionChange = (
    value: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  ) => {
    setLogoPositionState(value);
    // dispatch(setLogoPosition(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (carImageFile) {
      setIsUploading(true);
      dispatch(setIsProcessing(true));

      try {
        // Only call the onImageUpload function once the user clicks "Upload and Continue"
        // onImageUpload(carImageFile);
        //for all image n logo
        onImageUpload({
          carImage: carImageFile,
          backgroundImage: backgroundImageFile || undefined,
          logoImage: logoImageFile || undefined,
          logoPosition: logoPosition,
        });

        // Set the original image in Redux
        if (carImagePreview) {
          dispatch(setOriginalImage(carImagePreview));
        }

        // Close the modal after processing is complete
        onOpenChange(false);
      } catch (error) {
        console.error("Error processing image:", error);
        setIsUploading(false);
        dispatch(setIsProcessing(false));
      }
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isUploading) {
          onOpenChange(isOpen);
        }
      }}
    >
      <DialogContent className="max-w-xl p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        <DialogHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 sticky top-0 z-10">
          <DialogTitle className="text-xl font-bold">
            Upload Car Image
          </DialogTitle>
          <DialogDescription className="text-indigo-100 opacity-90 text-sm">
            Add your car image and customization options
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Car Image Upload (Required) */}
          <div className="space-y-2">
            <Label
              htmlFor="car-image"
              className="text-sm font-medium flex items-center"
            >
              <ImageIcon className="w-3 h-3 mr-1 text-indigo-600" />
              Car Image <span className="text-red-500 ml-1">*</span>
            </Label>

            <div
              className={`border-2 border-dashed rounded-lg p-3 ${
                carImagePreview ? "border-indigo-200" : "border-gray-300"
              } hover:border-indigo-400 transition-colors`}
            >
              {carImagePreview ? (
                <div className="relative">
                  <img
                    src={carImagePreview}
                    alt="Car preview"
                    className="max-h-28 mx-auto rounded-md"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="absolute top-1 right-1 bg-white/80 hover:bg-white p-1 h-6"
                    onClick={() => setCarImagePreview(null)}
                  >
                    Change
                  </Button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Upload className="mx-auto h-6 w-6 text-gray-400" />
                  <p className="mt-1 text-xs text-gray-600">
                    Click to upload or drag and drop
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 py-1 px-3 h-8 text-xs"
                    onClick={() => carImageInputRef.current?.click()}
                  >
                    Select Car Image
                  </Button>
                </div>
              )}
              <input
                id="car-image"
                ref={carImageInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCarImageChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Background Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="background-image" className="text-sm font-medium">
                Background (Optional)
              </Label>
              <div
                className={`border-2 border-dashed rounded-lg p-2 ${
                  backgroundImagePreview
                    ? "border-indigo-200"
                    : "border-gray-200"
                } hover:border-indigo-400 transition-colors`}
              >
                {backgroundImagePreview ? (
                  <div className="relative">
                    <img
                      src={backgroundImagePreview}
                      alt="Background preview"
                      className="max-h-20 mx-auto rounded-md"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="absolute top-1 right-1 bg-white/80 hover:bg-white p-1 h-6"
                      onClick={() => setBackgroundImagePreview(null)}
                    >
                      Change
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-2">
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 p-1 h-8 text-xs"
                      onClick={() => backgroundImageInputRef.current?.click()}
                    >
                      <Upload className="mr-1 h-3 w-3" />
                      Upload Background
                    </Button>
                  </div>
                )}
                <input
                  id="background-image"
                  ref={backgroundImageInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleBackgroundImageChange}
                />
              </div>
            </div>

            {/* Logo Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="logo-image" className="text-sm font-medium">
                Custom Logo (Optional)
              </Label>
              <div
                className={`border-2 border-dashed rounded-lg p-2 ${
                  logoImagePreview ? "border-indigo-200" : "border-gray-200"
                } hover:border-indigo-400 transition-colors`}
              >
                {logoImagePreview ? (
                  <div className="relative">
                    <img
                      src={logoImagePreview}
                      alt="Logo preview"
                      className="max-h-20 mx-auto rounded-md"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="absolute top-1 right-1 bg-white/80 hover:bg-white p-1 h-6"
                      onClick={() => setLogoImagePreview(null)}
                    >
                      Change
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-2">
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 p-1 h-8 text-xs"
                      onClick={() => logoImageInputRef.current?.click()}
                    >
                      <Upload className="mr-1 h-3 w-3" />
                      Upload Logo
                    </Button>
                  </div>
                )}
                <input
                  id="logo-image"
                  ref={logoImageInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoImageChange}
                />
              </div>
            </div>
          </div>

          {/* Logo Position */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Logo Position</Label>
            <RadioGroup
              value={logoPosition}
              onValueChange={(value: string) =>
                handleLogoPositionChange(
                  value as
                    | "top-left"
                    | "top-right"
                    | "bottom-left"
                    | "bottom-right"
                )
              }
              className="grid grid-cols-4 gap-2"
            >
              <div className="flex items-center space-x-1 border rounded-md p-1 hover:bg-gray-50 cursor-pointer">
                <RadioGroupItem
                  value="top-left"
                  id="top-left"
                  className="h-3 w-3"
                />
                <Label htmlFor="top-left" className="cursor-pointer text-xs">
                  Top Left
                </Label>
              </div>
              <div className="flex items-center space-x-1 border rounded-md p-1 hover:bg-gray-50 cursor-pointer">
                <RadioGroupItem
                  value="top-right"
                  id="top-right"
                  className="h-3 w-3"
                />
                <Label htmlFor="top-right" className="cursor-pointer text-xs">
                  Top Right
                </Label>
              </div>
              <div className="flex items-center space-x-1 border rounded-md p-1 hover:bg-gray-50 cursor-pointer">
                <RadioGroupItem
                  value="bottom-left"
                  id="bottom-left"
                  className="h-3 w-3"
                />
                <Label htmlFor="bottom-left" className="cursor-pointer text-xs">
                  Bottom Left
                </Label>
              </div>
              <div className="flex items-center space-x-1 border rounded-md p-1 hover:bg-gray-50 cursor-pointer">
                <RadioGroupItem
                  value="bottom-right"
                  id="bottom-right"
                  className="h-3 w-3"
                />
                <Label
                  htmlFor="bottom-right"
                  className="cursor-pointer text-xs"
                >
                  Bottom Right
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex space-x-3 justify-end pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-8 text-xs py-0 px-3"
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!carImagePreview || isUploading}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 h-8 text-xs py-0 px-3"
            >
              {isUploading ? (
                <span className="flex items-center">
                  <Loader className="h-3 w-3 mr-2 animate-spin" />
                  Processing...
                </span>
              ) : (
                "Upload and Continue"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadModal;
