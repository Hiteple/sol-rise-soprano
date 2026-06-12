const PLACEHOLDER_IMAGE_PATTERN = /placeholder-(landscape|portrait)/i

/** True when a content image should show a letter placeholder instead of the image file. */
export function showsPlaceholderImage(image?: string): boolean {
  const src = image?.trim() ?? ''
  if (!src) return true
  return PLACEHOLDER_IMAGE_PATTERN.test(src)
}

/** First letter of a display name (organization, character, etc.). */
export function initialLetter(name: string): string {
  const trimmed = name.trim()
  return trimmed ? trimmed.charAt(0).toUpperCase() : ''
}
