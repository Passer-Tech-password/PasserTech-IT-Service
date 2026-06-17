"use client";

import React, { useState } from "react";
import CloudinaryUpload from "@/components/CloudinaryUpload";

const TestUploadPage = () => {
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [uploadedPublicId, setUploadedPublicId] = useState<string | null>(null);

  const handleUploadComplete = (url: string, publicId: string) => {
    setUploadedUrl(url);
    setUploadedPublicId(publicId);
  };

  return (
    <div className="min-h-screen bg-[#081120] text-white p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8">Test Cloudinary Upload</h1>
        
        <CloudinaryUpload
          onUploadComplete={handleUploadComplete}
          folder="passertech/test"
        />

        {uploadedUrl && (
          <div className="mt-8 p-4 bg-white/5 rounded-2xl">
            <h2 className="font-bold mb-4">Upload Successful!</h2>
            <div className="mb-2">
              <p className="text-sm text-white/60">Public ID:</p>
              <p className="text-xs font-mono">{uploadedPublicId}</p>
            </div>
            <div className="mb-2">
              <p className="text-sm text-white/60">URL:</p>
              <a
                href={uploadedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-primary hover:underline"
              >
                {uploadedUrl}
              </a>
            </div>
            {uploadedUrl.includes(".mp4") || uploadedUrl.includes(".mov") ? (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Video Preview:</h3>
                <video src={uploadedUrl} controls className="w-full rounded-xl" />
              </div>
            ) : (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Image Preview:</h3>
                <img src={uploadedUrl} alt="Uploaded" className="w-full rounded-xl" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestUploadPage;
