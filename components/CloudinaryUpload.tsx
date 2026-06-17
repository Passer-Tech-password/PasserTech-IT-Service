"use client";

import React, { useState } from "react";
import { Loader2, Upload, CheckCircle, XCircle, Image as ImageIcon, Video } from "lucide-react";

interface CloudinaryUploadProps {
  onUploadComplete: (url: string, publicId: string) => void;
  folder?: string;
  accept?: string; // File types to accept (e.g., "image/*,video/*")
}

const CloudinaryUpload: React.FC<CloudinaryUploadProps> = ({ 
  onUploadComplete, 
  folder = "passertech",
  accept = "image/*,video/*" 
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<"image" | "video" | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);
    setPreview(null);
    setFileType(null);

    // Create a preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setFileType(file.type.startsWith("image/") ? "image" : "video");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/cloudinary/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Upload failed");
      }

      onUploadComplete(data.result.secure_url, data.result.public_id);
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
          accept={accept}
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
              {fileType === "image" ? (
                <img src={preview} alt="Preview" className="max-h-64 rounded-lg object-contain" />
              ) : (
                <video src={preview} className="max-h-64 rounded-lg" controls />
              )}
              <p className="text-xs text-foreground/40">Click to replace file</p>
            </div>
          ) : (
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6 text-foreground/40" />
              </div>
              <div>
                <p className="text-sm font-bold">Click to upload file</p>
                <p className="text-xs text-foreground/40 mt-1">Images (PNG, JPG, WebP) or Videos</p>
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

export default CloudinaryUpload;
