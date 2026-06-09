import { z } from 'zod'

export const imageCreditFieldsSchema = z.object({
  author: z.string().optional(),
  authorUrl: z.string().optional(),
  source: z.string().optional(),
  sourceUrl: z.string().optional(),
})

export type ImageCreditFields = z.infer<typeof imageCreditFieldsSchema>

export type ImageCredit = {
  author: string
  authorUrl: string
  source: string
  sourceUrl: string
}

export function resolveImageCredit(
  credit: ImageCreditFields | null | undefined,
): ImageCredit | null {
  const author = credit?.author?.trim()
  const authorUrl = credit?.authorUrl?.trim()
  const sourceUrl = credit?.sourceUrl?.trim()
  if (!author || !authorUrl || !sourceUrl) return null
  return {
    author,
    authorUrl,
    sourceUrl,
    source: credit?.source?.trim() || 'Unsplash',
  }
}
