import { NextResponse } from "next/server";
import { cloudinary, configureCloudinary } from "@/lib/cloudinary";
import { Readable } from "stream";

// Helper to convert web File to Node.js stream
const bufferToStream = (buffer: Buffer) => {
  return Readable.from(buffer);
};

export async function POST(request: Request) {
  try {
    // Check if Cloudinary is configured
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return NextResponse.json(
        { error: "Cloudinary not configured - please set environment variables" },
        { status: 500 }
      );
    }

    // Ensure Cloudinary is configured
    configureCloudinary();

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "passertech";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "auto", // Auto-detect image/video
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      bufferToStream(buffer).pipe(stream);
    });

    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (error) {
    console.error("[Cloudinary Upload Error]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
