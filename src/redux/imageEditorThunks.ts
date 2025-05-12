import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ProcessImageResponse {
  original: string;
  processed: string;
}

interface Payload {
  carImage: File;
  backgroundImage?: File;
  logoImage?: File;
  logoPosition?: string;
}

export const processImage = createAsyncThunk<ProcessImageResponse, Payload>(
  "imageEditor/processImage",
  async ({ carImage, backgroundImage, logoImage, logoPosition }, thunkAPI) => {
    debugger;
    try {
      // Convert all files to base64 if provided
      const carBase64 = await fileToBase64(carImage);
      const bgBase64 = backgroundImage
        ? await fileToBase64(backgroundImage)
        : null;
      const logoBase64 = logoImage ? await fileToBase64(logoImage) : null;

      // Build the prompt dynamically
      let prompt = "Remove the background from the car image.";
      if (bgBase64) {
        prompt += " Replace it with the provided background image.";
      }
      if (logoBase64) {
        prompt += ` Add the logo image at the ${
          logoPosition || "bottom-right"
        } corner.`;
      }

      // Build image content array
      const content: any[] = [
        { type: "text", text: prompt },
        { type: "image_url", image_url: { url: carBase64 } },
      ];

      if (bgBase64) {
        content.push({ type: "image_url", image_url: { url: bgBase64 } });
      }

      if (logoBase64) {
        content.push({ type: "image_url", image_url: { url: logoBase64 } });
      }
      debugger;

      // Send to OpenAI Vision
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o",
          messages: [
            {
              role: "user",
              content,
            },
          ],
          max_tokens: 300,
        },
        {
          headers: {
            Authorization: `Bearer ${
              import.meta.env.VITE_PROD_SHOW_OPENAI_KEY
            }`,
            "Content-Type": "application/json",
          },
        }
      );

      return {
        original: carBase64,
        processed: response.data.choices[0].message.content,
      };
    } catch (err: any) {
      console.error("OpenAI error:", err.response?.data || err.message);
      return thunkAPI.rejectWithValue(
        err.response?.data || "Image processing failed"
      );
    }
  }
);

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
}
