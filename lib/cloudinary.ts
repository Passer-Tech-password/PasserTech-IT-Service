import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary (call this before using cloudinary functions)
const configureCloudinary = () => {
  if (
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  ) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
  }
};

// Call configure to set up if env vars exist (but don't throw on import)
configureCloudinary();

export { cloudinary, configureCloudinary };
