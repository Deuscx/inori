import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

// https://content.nuxt.com/docs/collections/define#defining-collections
export default defineContentConfig({
  collections: {
    post: defineCollection({
      type: 'page',
      source: 'posts/*.md',
      schema: z.object({
        created_at: z.date(),
        updated_at: z.date(),
        comments: z.number(),
        comments_url: z.string().url(),
        labels: z.array(z.object({
          id: z.number(),
          node_id: z.string(),
          url: z.string().url(),
          name: z.string(),
          color: z.string(),
          default: z.boolean(),
          description: z.string(),
        })),
        number: z.number(),
        title: z.string(),
      }),
    }),
  },
})
