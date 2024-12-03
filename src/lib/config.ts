const _config: Record<string, string | undefined> = Object.freeze({
  APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
  APPWRITE_PROJECT: process.env.NEXT_PUBLIC_APPWRITE_PROJECT,
  APPWRITE_DATABASE_ID: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
  APPWRITE_WORKSPACE_ID: process.env.NEXT_PUBLIC_APPWRITE_WORKSPACE_ID,
  APPWRITE_KEY: process.env.NEXT_APPWRITE_KEY,
});

const getEnv = (key: string) => {
  const value: string | undefined = _config[key];
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value;
};

export default getEnv;
