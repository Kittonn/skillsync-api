export default () => ({
  port: +process.env.PORT || 3000,
  mongo: {
    uri: process.env.MONGO_URI,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: +process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
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
  mailer: {
    host: process.env.MAILER_HOST,
    port: +process.env.MAILER_PORT,
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
  jwt: {
    access: {
      secret: process.env.ACCESS_SECRET,
      expiresIn: process.env.ACCESS_EXPIRES_IN,
    },
    refresh: {
      secret: process.env.REFRESH_SECRET,
      expiresIn: process.env.REFRESH_EXPIRES_IN,
    },
  },
});
