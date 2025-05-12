
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 px-4 bg-gradient-to-b from-white to-pixelblue-50">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Simple, Transparent Pricing</h1>
          <p className="text-xl text-pixelgray-600 mb-12 text-center max-w-2xl mx-auto">
            Choose the plan that's right for your business. No hidden fees or long-term contracts.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8">
            {/* Free Plan */}
            <div className="w-full md:w-80 bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105">
              <div className="p-8">
                <h3 className="text-xl font-semibold text-pixelgray-700 mb-2">Free</h3>
                <div className="flex items-end mb-6">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-pixelgray-500 ml-2">/month</span>
                </div>
                <p className="text-pixelgray-600 mb-6">Perfect for individual sellers or small dealers testing the waters.</p>
                <Button className="w-full bg-white text-pixelblue-600 border border-pixelblue-200 hover:bg-pixelblue-50">
                  Get Started
                </Button>
              </div>
              <div className="bg-gray-50 p-8">
                <p className="font-medium mb-4">Includes:</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-pixelblue-600 mr-3 shrink-0" />
                    <span className="text-sm text-pixelgray-600">10 image edits per month</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-pixelblue-600 mr-3 shrink-0" />
                    <span className="text-sm text-pixelgray-600">Basic background removal</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-pixelblue-600 mr-3 shrink-0" />
                    <span className="text-sm text-pixelgray-600">Standard resolution exports</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-pixelblue-600 mr-3 shrink-0" />
                    <span className="text-sm text-pixelgray-600">Community support</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Pro Plan */}
            <div className="w-full md:w-80 bg-white rounded-2xl shadow-xl overflow-hidden relative transition-transform hover:scale-105">
              <div className="absolute top-0 right-0 bg-pixelblue-600 text-white text-xs font-bold py-1 px-3 rounded-bl-lg">
                POPULAR
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-pixelgray-700 mb-2">Pro</h3>
                <div className="flex items-end mb-6">
                  <span className="text-4xl font-bold">$49</span>
                  <span className="text-pixelgray-500 ml-2">/month</span>
                </div>
                <p className="text-pixelgray-600 mb-6">Ideal for dealerships with regular inventory updates.</p>
                <Button className="w-full gradient-bg border-none">
                  Start 7-Day Free Trial
                </Button>
              </div>
              <div className="bg-gray-50 p-8">
                <p className="font-medium mb-4">Everything in Free, plus:</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-pixelblue-600 mr-3 shrink-0" />
                    <span className="text-sm text-pixelgray-600">100 image edits per month</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-pixelblue-600 mr-3 shrink-0" />
                    <span className="text-sm text-pixelgray-600">Advanced background removal</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-pixelblue-600 mr-3 shrink-0" />
                    <span className="text-sm text-pixelgray-600">License plate masking</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-pixelblue-600 mr-3 shrink-0" />
                    <span className="text-sm text-pixelgray-600">Custom background library</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-pixelblue-600 mr-3 shrink-0" />
                    <span className="text-sm text-pixelgray-600">High-resolution exports</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-pixelblue-600 mr-3 shrink-0" />
                    <span className="text-sm text-pixelgray-600">Email support</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Enterprise Plan */}
            <div className="w-full md:w-80 bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105">
              <div className="p-8">
                <h3 className="text-xl font-semibold text-pixelgray-700 mb-2">Enterprise</h3>
                <div className="flex items-end mb-6">
                  <span className="text-4xl font-bold">$199</span>
                  <span className="text-pixelgray-500 ml-2">/month</span>
                </div>
                <p className="text-pixelgray-600 mb-6">For large dealerships with high volume needs.</p>
                <Button className="w-full bg-white text-pixelblue-600 border border-pixelblue-200 hover:bg-pixelblue-50">
                  Contact Sales
                </Button>
              </div>
              <div className="bg-gray-50 p-8">
                <p className="font-medium mb-4">Everything in Pro, plus:</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-pixelblue-600 mr-3 shrink-0" />
                    <span className="text-sm text-pixelgray-600">Unlimited image edits</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-pixelblue-600 mr-3 shrink-0" />
                    <span className="text-sm text-pixelgray-600">Bulk processing</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-pixelblue-600 mr-3 shrink-0" />
                    <span className="text-sm text-pixelgray-600">API access</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-pixelblue-600 mr-3 shrink-0" />
                    <span className="text-sm text-pixelgray-600">Custom branding</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-pixelblue-600 mr-3 shrink-0" />
                    <span className="text-sm text-pixelgray-600">Dedicated account manager</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-pixelblue-600 mr-3 shrink-0" />
                    <span className="text-sm text-pixelgray-600">Priority phone support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-20 max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-2">Can I upgrade or downgrade my plan?</h4>
                <p className="text-pixelgray-600">Yes, you can change your plan at any time. When upgrading, we'll prorate the remaining days in your billing cycle. When downgrading, changes take effect at the start of the next billing cycle.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-2">What payment methods do you accept?</h4>
                <p className="text-pixelgray-600">We accept all major credit cards, including Visa, Mastercard, American Express, and Discover. Enterprise customers can also pay via invoice.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-2">Is there a long-term contract?</h4>
                <p className="text-pixelgray-600">No, all plans are month-to-month with no long-term commitment. You can cancel anytime from your account dashboard.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-2">What happens if I exceed my monthly limit?</h4>
                <p className="text-pixelgray-600">If you reach your monthly image processing limit, you can purchase additional credits or upgrade to a higher tier plan with more capacity.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
