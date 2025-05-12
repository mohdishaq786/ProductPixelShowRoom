
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Features = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Product Features</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-pixelblue-50 to-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-pixelblue-600 mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">Background Removal</h3>
            <p className="text-pixelgray-700">
              Remove backgrounds from your car images with just one click. Our AI technology precisely detects vehicle edges for clean, professional results every time.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-pixelblue-50 to-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-pixelblue-600 mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">License Plate Masking</h3>
            <p className="text-pixelgray-700">
              Protect your customers' privacy with automatic license plate detection and blurring. Ensure compliance with privacy regulations while showcasing vehicles.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-pixelblue-50 to-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-pixelblue-600 mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">Background Customization</h3>
            <p className="text-pixelgray-700">
              Choose from a variety of professional backgrounds to showcase your vehicles in the perfect setting. Indoor showroom, outdoor scenes, and more.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-pixelblue-50 to-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-pixelblue-600 mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">Brand Logo Addition</h3>
            <p className="text-pixelgray-700">
              Add your dealership logo to create branded, professional images. Position your logo anywhere on the image with our flexible positioning options.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Features;
