
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <h1 className="text-4xl font-bold mb-8 text-center">How PixelShowroom Works</h1>
            <p className="text-xl text-center text-pixelgray-600 mb-16 max-w-3xl mx-auto">
              Transform your car photos with our simple three-step process. No technical skills required.
            </p>
            
            <div className="relative">
              {/* Line connecting steps */}
              <div className="absolute top-24 left-1/2 w-0.5 h-[calc(100%-120px)] bg-pixelblue-200 hidden md:block"></div>
              
              <div className="space-y-20 md:space-y-32">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 mb-8 md:mb-0">
                    <div className="bg-pixelblue-600 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto md:mx-0">1</div>
                    <h2 className="text-2xl font-bold mt-4 mb-4 text-center md:text-left">Upload Your Image</h2>
                    <p className="text-pixelgray-600 text-lg max-w-md">
                      Start by uploading any photo of your vehicle. Our system accepts most common image formats including JPG, PNG, and WEBP files.
                    </p>
                    <div className="mt-6 text-sm text-pixelgray-500">
                      <p className="flex items-center mb-2">
                        <svg className="w-4 h-4 mr-2 text-pixelblue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                        Supports JPG, PNG, WEBP formats
                      </p>
                      <p className="flex items-center mb-2">
                        <svg className="w-4 h-4 mr-2 text-pixelblue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                        Max file size: 10MB
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    <div className="rounded-lg overflow-hidden shadow-lg border-2 border-pixelblue-100">
                      <img 
                        src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80" 
                        alt="Upload car photo" 
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row-reverse items-center">
                  <div className="md:w-1/2 mb-8 md:mb-0">
                    <div className="bg-pixelblue-600 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto md:mx-0">2</div>
                    <h2 className="text-2xl font-bold mt-4 mb-4 text-center md:text-left">Edit & Customize</h2>
                    <p className="text-pixelgray-600 text-lg max-w-md">
                      Use our intuitive tools to remove backgrounds, mask license plates, or add your dealership logo. Select from professional backgrounds to showcase your vehicles.
                    </p>
                    <div className="mt-6 text-sm text-pixelgray-500">
                      <p className="flex items-center mb-2">
                        <svg className="w-4 h-4 mr-2 text-pixelblue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                        AI-powered background removal
                      </p>
                      <p className="flex items-center mb-2">
                        <svg className="w-4 h-4 mr-2 text-pixelblue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                        License plate privacy masking
                      </p>
                      <p className="flex items-center mb-2">
                        <svg className="w-4 h-4 mr-2 text-pixelblue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                        Professional background library
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pr-12">
                    <div className="rounded-lg overflow-hidden shadow-lg border-2 border-pixelblue-100">
                      <img 
                        src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80" 
                        alt="Edit car photo" 
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 mb-8 md:mb-0">
                    <div className="bg-pixelblue-600 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto md:mx-0">3</div>
                    <h2 className="text-2xl font-bold mt-4 mb-4 text-center md:text-left">Download & Share</h2>
                    <p className="text-pixelgray-600 text-lg max-w-md">
                      Download your professionally edited vehicle images in high resolution. Ready for your inventory listings, online marketplace, or social media channels.
                    </p>
                    <div className="mt-6 text-sm text-pixelgray-500">
                      <p className="flex items-center mb-2">
                        <svg className="w-4 h-4 mr-2 text-pixelblue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                        High-resolution output
                      </p>
                      <p className="flex items-center mb-2">
                        <svg className="w-4 h-4 mr-2 text-pixelblue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                        Web-optimized file sizes
                      </p>
                      <p className="flex items-center mb-2">
                        <svg className="w-4 h-4 mr-2 text-pixelblue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                        Multiple format options
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    <div className="rounded-lg overflow-hidden shadow-lg border-2 border-pixelblue-100">
                      <img 
                        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80" 
                        alt="Download car photo" 
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-20">
              <h3 className="text-2xl font-bold mb-6">Ready to transform your vehicle photos?</h3>
              <Button className="gradient-bg text-lg py-6 px-10 rounded-md">
                Try PixelShowroom Now
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;
