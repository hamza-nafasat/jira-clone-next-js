type ConfigTypes = {
  [key: string]: string;
  APP_URL: string;
  APPWRITE_ENDPOINT: string;
  APPWRITE_PROJECT: string;
  DATABASE_ID: string;
  APPWRITE_KEY: string;
  IMAGES_BUCKET_ID: string;
  WORKSPACE_ID: string;
  MEMBERS_ID: string;
};

const _config: ConfigTypes = {
  APP_URL: process.env.NEXT_PUBLIC_APP_URL!,
  APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  APPWRITE_PROJECT: process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
  DATABASE_ID: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  IMAGES_BUCKET_ID: process.env.NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID!,
  APPWRITE_KEY: process.env.NEXT_APPWRITE_KEY!,
  WORKSPACE_ID: process.env.NEXT_PUBLIC_APPWRITE_WORKSPACE_ID!,
  MEMBERS_ID: process.env.NEXT_PUBLIC_APPWRITE_MEMBERS_ID!,
};

const ENV = new Proxy(_config, {
  get(target, key: string) {
    const value = target[key as keyof ConfigTypes];
    if (value) return value;
    throw new Error(`Missing environment variable: ${key}`);
  },
  set(_, key: string) {
    throw new Error(`Cannot set environment variable: ${key}`);
  },
});

// const validateConfig = (config: Partial<ConfigTypes>) => {
//   const missingKeys = Object.keys(config).filter((key) => config[key] === undefined || config[key] === "");
//   if (missingKeys.length > 0) {
//     throw new Error(`Missing environment variables: ${missingKeys.join(", ")}`);
//   }
// };

// validateConfig(_config);
export default ENV;
