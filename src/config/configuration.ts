export default () => ({
  port: +process.env.PORT || 3000,
  mongo: {
    uri: process.env.MONGO_URI,
  },
  redis: {
    uri: process.env.REDIS_URI,
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
});
