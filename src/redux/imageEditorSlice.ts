import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { processImage } from "./imageEditorThunks.ts";

interface ImageEditorState {
  originalImage: string | null;
  processedImage: string | null;
  activeImage: string | null;
  isProcessing: boolean;
  activeTab: string;
  logoPosition: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const initialState: ImageEditorState = {
  originalImage: null,
  processedImage: null,
  activeImage: null,
  isProcessing: false,
  activeTab: "background",
  logoPosition: "bottom-right",
};

export const imageEditorSlice = createSlice({
  name: "imageEditor",
  initialState,
  reducers: {
    setOriginalImage: (state, action: PayloadAction<string | null>) => {
      debugger;
      state.originalImage = action.payload;
      state.activeImage = action.payload;
    },
    setProcessedImage: (state, action: PayloadAction<string | null>) => {
      state.processedImage = action.payload;
      state.activeImage = action.payload;
    },
    setIsProcessing: (state, action: PayloadAction<boolean>) => {
      state.isProcessing = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    resetImages: (state) => {
      state.originalImage = null;
      state.processedImage = null;
      state.activeImage = null;
    },
    setLogoPosition: (
      state,
      action: PayloadAction<
        "top-left" | "top-right" | "bottom-left" | "bottom-right"
      >
    ) => {
      state.logoPosition = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(processImage.pending, (state) => {
        debugger;
        state.isProcessing = true;
      })
      .addCase(processImage.fulfilled, (state, action) => {
        state.originalImage = action.payload.original;
        state.processedImage = action.payload.processed;
        state.activeImage = action.payload.processed;
        state.isProcessing = false;
      })
      .addCase(processImage.rejected, (state) => {
        state.isProcessing = false;
      });
  },
});

export const {
  setOriginalImage,
  setProcessedImage,
  setIsProcessing,
  setActiveTab,
  resetImages,
  setLogoPosition,
} = imageEditorSlice.actions;

export default imageEditorSlice.reducer;
