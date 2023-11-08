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
  nodeEnv: process.env.NODE_ENV,
  allowedOrigins: process.env.ALLOWED_ORIGINS.split(','),
  activation: {
    secret: process.env.ACTIVATION_SECRET,
    expiresIn: process.env.ACTIVATION_EXPIRES_IN,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  mailer: {
    host: process.env.MAILER_HOST,
    port: +process.env.MAILER_PORT,
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
});
