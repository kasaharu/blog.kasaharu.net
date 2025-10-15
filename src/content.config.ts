import { defineCollection, z } from 'astro:content';
import { createClient } from 'microcms-js-sdk';

const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

const microCMSLoader = (endpoint: string) => {
  return async () => {
    try {
      return await client.getAllContents({ endpoint });
    } catch (error) {
      console.error('---------------');
      console.error(`Failed - endpoint: ${endpoint} `, error);
      console.error('---------------');
      return [];
    }
  };
};

const blogs = defineCollection({
  loader: microCMSLoader('blogs'),
  schema: z.object({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    publishedAt: z.string(),
    revisedAt: z.string(),
    title: z.string(),
    content: z.string(),
  }),
});

export const collections = { blogs };
