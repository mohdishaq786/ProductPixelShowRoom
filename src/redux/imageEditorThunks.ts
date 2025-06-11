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
      const payload = new FormData();

      if (carImage) {
        payload.append("car_image", carImage);
      } else {
        throw new Error("Car image is required");
      }

      if (logoImage) {
        payload.append("logo", logoImage);
      }

      if (backgroundImage) {
        payload.append("background", backgroundImage);
      }

      payload.append("logo_position", logoPosition || "bottom-right");

      const url = "http://54.198.93.160/api/v1/process-car-image";

      const response = await axios.post(url, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      });
      const imageUrl = URL.createObjectURL(response.data);

      return {
        original: "",
        processed: imageUrl,
      };
    } catch (error: any) {
      console.error(
        "Image processing failed:",
        error.response?.data || error.message
      );
      return thunkAPI.rejectWithValue(
        error.response?.data || "Image processing failed"
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
