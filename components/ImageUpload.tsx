"use client";

import React, { useState } from "react";
import { Loader2, Upload, XCircle } from "lucide-react";

interface ImageUploadProps {
  onUploadComplete: (url: string) => void;
  path?: string; // Kept for backward compatibility, now uses folder from Cloudinary
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadComplete, path }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.");
      return;
    }

    setError("");
    setUploading(true);
    setPreview(null);

    // Create a preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", path || "passertech");

      const res = await fetch("/api/cloudinary/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Upload failed");
      }

      onUploadComplete(data.result.secure_url);
    } catch (err) {
      console.error("[Cloudinary Upload Error]", err);
      setError("Failed to upload file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative group">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
        />
        <div className={`
          border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-all
          ${uploading ? "border-primary/50 bg-primary/5" : "border-white/10 hover:border-primary/50 hover:bg-white/5"}
          ${error ? "border-red-500/50 bg-red-500/5" : ""}
        `}>
          {uploading ? (
            <div className="text-center space-y-3">
              <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" />
              <p className="text-sm font-bold text-primary">Uploading...</p>
            </div>
          ) : preview ? (
            <div className="text-center space-y-3">
              <img src={preview} alt="Preview" className="max-h-64 rounded-lg object-contain" />
              <p className="text-xs text-foreground/40">Click to replace image</p>
            </div>
          ) : (
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6 text-foreground/40" />
              </div>
              <div>
                <p className="text-sm font-bold">Click to upload image</p>
                <p className="text-xs text-foreground/40 mt-1">PNG, JPG or WebP</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-500 text-xs font-medium bg-red-500/10 p-3 rounded-xl">
          <XCircle className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
