
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Logo from './Logo';

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="w-full border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/">
          <Logo />
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          <Link to="/features" 
            className={`${isActive('/features') ? 'text-pixelblue-600' : 'text-pixelgray-700'} hover:text-pixelblue-600 font-medium transition-colors`}>
            Features
          </Link>
          <Link to="/how-it-works" 
            className={`${isActive('/how-it-works') ? 'text-pixelblue-600' : 'text-pixelgray-700'} hover:text-pixelblue-600 font-medium transition-colors`}>
            How It Works
          </Link>
          <Link to="/pricing" 
            className={`${isActive('/pricing') ? 'text-pixelblue-600' : 'text-pixelgray-700'} hover:text-pixelblue-600 font-medium transition-colors`}>
            Pricing
          </Link>
          <Link to="/support" 
            className={`${isActive('/support') ? 'text-pixelblue-600' : 'text-pixelgray-700'} hover:text-pixelblue-600 font-medium transition-colors`}>
            Support
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="hidden md:inline-flex" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
          <Button className="gradient-bg border-none">
            <Link to="/login" className="text-white">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
