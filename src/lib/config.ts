const _config: Record<string, string | undefined> = Object.freeze({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
  NEXT_PUBLIC_APPWRITE_PROJECT: process.env.NEXT_PUBLIC_APPWRITE_PROJECT,
  NEXT_PUBLIC_APPWRITE_DATABASE_ID: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
  NEXT_APPWRITE_KEY: process.env.NEXT_APPWRITE_KEY,
});

const getEnv = (key: string) => {
  const value: string | undefined = _config[key];
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value;
};

export default getEnv;
