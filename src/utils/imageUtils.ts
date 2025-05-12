
// A set of utility functions for image processing

/**
 * Loads an image from a File object and returns it as an HTMLImageElement
 */
export const loadImage = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
      img.src = e.target?.result as string;
    };
    
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

/**
 * Creates a canvas with the given image and returns it
 */
export const createImageCanvas = (img: HTMLImageElement, width?: number, height?: number): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Use original dimensions if not provided
  const w = width || img.width;
  const h = height || img.height;
  
  canvas.width = w;
  canvas.height = h;
  
  if (ctx) {
    ctx.drawImage(img, 0, 0, w, h);
  }
  
  return canvas;
};

/**
 * Removes background using a more sophisticated approach
 */
export const removeBackground = async (imageUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      // Draw the original image
      ctx.drawImage(img, 0, 0);
      
      // Get the image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Improved background removal with edge detection
      const edgeDetectionThreshold = 30;
      const colorThreshold = 220;
      
      // First pass: Detect potential car pixels based on color diversity
      const potentialCarPixels = new Set<number>();
      
      for (let y = 1; y < canvas.height - 1; y++) {
        for (let x = 1; x < canvas.width - 1; x++) {
          const idx = (y * canvas.width + x) * 4;
          
          // Check surrounding pixels for color difference (simple edge detection)
          const currentR = data[idx];
          const currentG = data[idx + 1];
          const currentB = data[idx + 2];
          
          // Check if the pixel is not likely to be background (white/gray)
          const isBackground = 
            currentR > colorThreshold && 
            currentG > colorThreshold && 
            currentB > colorThreshold;
          
          if (!isBackground) {
            potentialCarPixels.add(idx);
          }
          
          // Check for edges (significant color differences)
          const idxRight = idx + 4;
          const idxBottom = idx + (canvas.width * 4);
          
          if (idxRight < data.length && Math.abs(data[idx] - data[idxRight]) > edgeDetectionThreshold) {
            potentialCarPixels.add(idx);
            potentialCarPixels.add(idxRight);
          }
          
          if (idxBottom < data.length && Math.abs(data[idx] - data[idxBottom]) > edgeDetectionThreshold) {
            potentialCarPixels.add(idx);
            potentialCarPixels.add(idxBottom);
          }
        }
      }
      
      // Clear background pixels (make transparent)
      for (let i = 0; i < data.length; i += 4) {
        if (!potentialCarPixels.has(i)) {
          data[i + 3] = 0; // Set alpha to 0 (transparent)
        }
      }
      
      // Put modified image data back to canvas
      ctx.putImageData(imageData, 0, 0);
      
      // Return the data URL
      resolve(canvas.toDataURL('image/png'));
    };
    
    img.onerror = () => reject(new Error("Could not load image for processing"));
    img.src = imageUrl;
  });
};

/**
 * Improved license plate masking using a more targeted approach
 */
export const maskLicensePlate = async (imageUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }
      
      // Draw the original image
      ctx.drawImage(img, 0, 0);
      
      // In a real app, we'd use ML to detect license plates
      // For now, we'll use multiple rectangles at common license plate locations
      
      // Front license plate area (bottom third, center)
      const frontPlateWidth = canvas.width * 0.2;
      const frontPlateHeight = frontPlateWidth * 0.2;
      const frontPlateX = (canvas.width - frontPlateWidth) / 2;
      const frontPlateY = canvas.height * 0.85; // Lower position
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(frontPlateX, frontPlateY, frontPlateWidth, frontPlateHeight);
      
      // Back license plate area (middle, lower half)
      const backPlateWidth = canvas.width * 0.15;
      const backPlateHeight = backPlateWidth * 0.2;
      const backPlateX = (canvas.width - backPlateWidth) / 2;
      const backPlateY = canvas.height * 0.65; // Middle-lower position
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(backPlateX, backPlateY, backPlateWidth, backPlateHeight);
      
      // Return the data URL
      resolve(canvas.toDataURL('image/png'));
    };
    
    img.onerror = () => reject(new Error("Could not load image for processing"));
    img.src = imageUrl;
  });
};

/**
 * Improved custom background application with better blending
 */
export const applyCustomBackground = async (imageUrl: string, backgroundColor: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }
      
      // Create gradient background for more professional look
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      
      // Parse the hex color to RGB to create a slightly darker variant
      let r = 0, g = 0, b = 0;
      if (backgroundColor.length === 7) {
        r = parseInt(backgroundColor.slice(1, 3), 16);
        g = parseInt(backgroundColor.slice(3, 5), 16);
        b = parseInt(backgroundColor.slice(5, 7), 16);
      }
      
      // Create a subtle gradient
      const darkerColor = `rgba(${Math.max(0, r-20)}, ${Math.max(0, g-20)}, ${Math.max(0, b-20)}, 1)`;
      gradient.addColorStop(0, backgroundColor);
      gradient.addColorStop(1, darkerColor);
      
      // Fill the background with gradient
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw the image
      ctx.drawImage(img, 0, 0);
      
      // Return the data URL
      resolve(canvas.toDataURL('image/png'));
    };
    
    img.onerror = () => reject(new Error("Could not load image for processing"));
    img.src = imageUrl;
  });
};

/**
 * Add logo to the image
 */
export const addLogo = async (imageUrl: string, position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' = 'bottom-right'): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }
      
      // Draw the original image
      ctx.drawImage(img, 0, 0);
      
      // Create logo element programmatically
      const logoCanvas = document.createElement('canvas');
      logoCanvas.width = 200;
      logoCanvas.height = 80;
      const logoCtx = logoCanvas.getContext('2d');
      
      if (logoCtx) {
        // Logo background
        logoCtx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        logoCtx.roundRect(0, 0, 200, 80, 10);
        logoCtx.fill();
        
        // Car icon
        logoCtx.fillStyle = '#3B82F6';
        logoCtx.beginPath();
        logoCtx.ellipse(40, 40, 20, 20, 0, 0, 2 * Math.PI);
        logoCtx.fill();
        
        // Text
        logoCtx.font = 'bold 24px Arial';
        logoCtx.fillStyle = '#111827';
        logoCtx.fillText('Pixel', 70, 35);
        logoCtx.fillStyle = '#3B82F6';
        logoCtx.fillText('Showroom', 70, 60);
      }
      
      // Position the logo based on selected position
      const logoSize = { width: 200, height: 80 };
      const padding = 20;
      let x = 0;
      let y = 0;
      
      switch (position) {
        case 'top-left':
          x = padding;
          y = padding;
          break;
        case 'top-right':
          x = canvas.width - logoSize.width - padding;
          y = padding;
          break;
        case 'bottom-left':
          x = padding;
          y = canvas.height - logoSize.height - padding;
          break;
        case 'bottom-right':
        default:
          x = canvas.width - logoSize.width - padding;
          y = canvas.height - logoSize.height - padding;
          break;
      }
      
      // Draw the logo onto the main canvas
      ctx.drawImage(logoCanvas, x, y);
      
      // Return the data URL
      resolve(canvas.toDataURL('image/png'));
    };
    
    img.onerror = () => reject(new Error("Could not load image for processing"));
    img.src = imageUrl;
  });
};

