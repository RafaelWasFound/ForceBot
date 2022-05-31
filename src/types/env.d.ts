declare namespace NodeJS {
  interface ProcessEnv {
    CLIENT_ID: string;
    TOKEN: string;
    MONGO_URI: string;
    NODE_ENV: 'production' | 'development';
  }
}
