import cloudinary from "cloudinary"

const upload = cloudinary.v2
upload.config({
  cloud_name: 'huytuong010101',
  api_key: '749615724453792',
  api_secret: 'KxrzYjWx5Bkkz8Y5uyO-SeL0p3c',
});
export default upload
