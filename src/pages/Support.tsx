
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Support = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-4xl font-bold mb-4 text-center">Support Center</h1>
          <p className="text-xl text-pixelgray-600 mb-12 text-center max-w-2xl mx-auto">
            Get help with PixelShowroom. Our team is ready to assist you.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-pixelblue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-pixelblue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Support</h3>
              <p className="text-pixelgray-600 mb-4">
                Send us an email and we'll get back to you within 24 hours.
              </p>
              <a href="mailto:support@pixelshowroom.com" className="text-pixelblue-600 font-medium hover:underline">
                support@pixelshowroom.com
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-pixelblue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-pixelblue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
              <p className="text-pixelgray-600 mb-4">
                Chat with our support team during business hours.
              </p>
              <Button variant="outline" className="text-pixelblue-600 border-pixelblue-200">
                Start Chat
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-pixelblue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-pixelblue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Knowledge Base</h3>
              <p className="text-pixelgray-600 mb-4">
                Browse our help articles and tutorials.
              </p>
              <Button variant="outline" className="text-pixelblue-600 border-pixelblue-200">
                Visit Knowledge Base
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <Input
                  id="subject"
                  placeholder="What is your inquiry about?"
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Please describe your issue or question in detail"
                  className="w-full min-h-[150px]"
                />
              </div>
              
              <div>
                <Button className="gradient-bg w-full md:w-auto">
                  Send Message
                </Button>
              </div>
            </form>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">How quickly will my images be processed?</h3>
                <p className="text-pixelgray-600">Most images are processed within seconds. For complex images or during periods of high traffic, processing may take up to a minute.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Can I process multiple images at once?</h3>
                <p className="text-pixelgray-600">Bulk processing is available on our Enterprise plan. This allows you to upload and process multiple vehicle images simultaneously.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">What image formats are supported?</h3>
                <p className="text-pixelgray-600">PixelShowroom supports JPEG, PNG, and WEBP file formats. The maximum file size is 10MB per image.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">How do I add my dealership logo to images?</h3>
                <p className="text-pixelgray-600">Upload your logo in your account settings. Then, when editing an image, select the Logo tab and choose your preferred position for the logo placement.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Support;
