import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageEditor from "@/components/ImageEditor";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";
import { loadImage } from "@/utils/imageUtils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useToast } from "@/hooks/use-toast";
import {
  setOriginalImage,
  setIsProcessing,
  resetImages,
} from "@/redux/imageEditorSlice";
import { processImage } from "@/redux/imageEditorThunks";
import ImageUploadModal from "@/components/ImageUploadModal";

const Index = () => {
  const dispatch = useAppDispatch();
  const { originalImage, isProcessing } = useAppSelector(
    (state) => state.imageEditor
  );
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = async (payload: {
    carImage: File;
    backgroundImage?: File;
    logoImage?: File;
    logoPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  }) => {
    try {
      // dispatch(resetImages()); //changge
      dispatch(setIsProcessing(true));
      const resultAction = await dispatch(processImage(payload));

      if (processImage.fulfilled.match(resultAction)) {
        toast({
          title: "Image processed",
          description: "Your car image has been edited successfully.",
          duration: 3000,
        });
        debugger;
        console.log(" Image processed:", resultAction.payload.processed);
      } else {
        console.error("Image processing failed:", resultAction.payload);
        toast({
          title: "Image processing failed",
          // description: resultAction.payload,
        });
        dispatch(resetImages());
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      dispatch(resetImages());
    } finally {
      dispatch(setIsProcessing(false));
    }
  };

  const handleReset = () => {
    dispatch(setOriginalImage(null));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-gray-50 to-white">
      <Header />

      <main className="flex-1">
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto text-center max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Professional Car Images in{" "}
              <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                Seconds
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Transform your vehicle photos with our AI-powered tools. Remove
              backgrounds, mask license plates, and showcase your vehicles in
              the perfect setting.
            </p>

            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 mb-16">
              {!originalImage ? (
                <div className="w-full max-w-2xl mx-auto py-10">
                  <div className="flex flex-col items-center justify-center">
                    <div className="bg-indigo-50 rounded-full p-8 mb-6">
                      <Image className="w-16 h-16 text-indigo-500" />
                    </div>

                    <h2 className="text-3xl font-bold mb-4">
                      Transform Your Car Images
                    </h2>
                    <p className="text-gray-600 mb-8 text-center max-w-md">
                      Professional-looking vehicle images in just a few clicks.
                      Perfect for listings, websites, and marketing.
                    </p>

                    <Button
                      onClick={() => setUploadModalOpen(true)}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg"
                      size="lg"
                      disabled={isProcessing}
                    >
                      Get Started
                    </Button>

                    <ImageUploadModal
                      open={uploadModalOpen}
                      onOpenChange={setUploadModalOpen}
                      onImageUpload={handleImageUpload}
                    />
                  </div>
                </div>
              ) : (
                <ImageEditor
                  originalImage={originalImage}
                  onReset={handleReset}
                  onImageUpload={handleImageUpload}
                />
              )}
            </div>
          </div>
        </section>

        {!originalImage && (
          <>
            <section className="py-20 bg-gradient-to-b from-pixelgray-50 to-white">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">
                  How It Works
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white p-8 rounded-xl shadow-custom transform transition-transform hover:-translate-y-1 hover:shadow-lg">
                    <div className="w-14 h-14 rounded-full bg-pixelblue-100 flex items-center justify-center mb-6 text-pixelblue-600 font-bold text-xl">
                      1
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      Upload Your Image
                    </h3>
                    <p className="text-pixelgray-600">
                      Upload any photo of your vehicle. Our system works best
                      with clear, well-lit images.
                    </p>
                  </div>

                  <div className="bg-white p-8 rounded-xl shadow-custom transform transition-transform hover:-translate-y-1 hover:shadow-lg">
                    <div className="w-14 h-14 rounded-full bg-pixelblue-100 flex items-center justify-center mb-6 text-pixelblue-600 font-bold text-xl">
                      2
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      Edit & Customize
                    </h3>
                    <p className="text-pixelgray-600">
                      Remove backgrounds, mask license plates, and choose from
                      professional settings for your vehicle.
                    </p>
                  </div>

                  <div className="bg-white p-8 rounded-xl shadow-custom transform transition-transform hover:-translate-y-1 hover:shadow-lg">
                    <div className="w-14 h-14 rounded-full bg-pixelblue-100 flex items-center justify-center mb-6 text-pixelblue-600 font-bold text-xl">
                      3
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      Download & Share
                    </h3>
                    <p className="text-pixelgray-600">
                      Get your professional-looking vehicle images ready for
                      listings, social media, or your website.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-20">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
                    <h2 className="text-3xl font-bold mb-6">
                      Designed for Car Dealerships & Private Sellers
                    </h2>
                    <p className="text-pixelgray-600 mb-6">
                      PixelShowroom helps you create professional vehicle images
                      that stand out in online listings. Our tools are
                      specifically designed for showcasing pre-owned vehicles in
                      their best light.
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-pixelblue-100 flex items-center justify-center mr-3">
                          <svg
                            className="w-4 h-4 text-pixelblue-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        Increase listing engagement by up to 70%
                      </li>
                      <li className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-pixelblue-100 flex items-center justify-center mr-3">
                          <svg
                            className="w-4 h-4 text-pixelblue-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        Enhance vehicle presentation without professional
                        photography
                      </li>
                      <li className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-pixelblue-100 flex items-center justify-center mr-3">
                          <svg
                            className="w-4 h-4 text-pixelblue-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        Protect customer privacy with automatic license plate
                        masking
                      </li>
                      <li className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-pixelblue-100 flex items-center justify-center mr-3">
                          <svg
                            className="w-4 h-4 text-pixelblue-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        Create consistent, professional-looking inventory photos
                      </li>
                    </ul>
                  </div>
                  <div className="md:w-1/2">
                    <div className="rounded-xl overflow-hidden shadow-xl transform transition-transform hover:-translate-y-2 hover:shadow-2xl duration-300">
                      <img
                        src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                        alt="Car dealership"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-16 bg-gradient-to-r from-pixelblue-500 to-pixelblue-700 text-white">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-8">
                  Ready to Transform Your Vehicle Photos?
                </h2>
                <Button className="bg-white text-pixelblue-600 hover:bg-pixelgray-100 font-medium py-6 px-10 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all">
                  Get Started Free
                </Button>
                <p className="mt-4 text-pixelblue-100">
                  No credit card required. Try it risk-free today.
                </p>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
