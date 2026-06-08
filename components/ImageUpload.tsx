"use client";

import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { Loader2, Upload, CheckCircle, XCircle } from "lucide-react";

interface ImageUploadProps {
  onUploadComplete: (url: string) => void;
  path: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadComplete, path }) => {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.");
      return;
    }

    // Validate file size (e.g., 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError("File size should be less than 2MB.");
      return;
    }

    setError("");
    setUploading(true);
    
    const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(p);
      },
      (err) => {
        console.error("Upload error:", err);
        setError("Failed to upload image. Please check your permissions.");
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        onUploadComplete(downloadURL);
        setUploading(false);
        setProgress(0);
      }
    );
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
              <p className="text-sm font-bold text-primary">{Math.round(progress)}% Uploaded</p>
            </div>
          ) : (
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6 text-foreground/40" />
              </div>
              <div>
                <p className="text-sm font-bold">Click to upload image</p>
                <p className="text-xs text-foreground/40 mt-1">PNG, JPG or WebP (Max 2MB)</p>
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
