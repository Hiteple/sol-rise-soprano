declare module 'photoswipe-dynamic-caption-plugin' {
  import type PhotoSwipeLightbox from 'photoswipe/lightbox'

  type CaptionPluginOptions = {
    type?: 'auto' | 'below' | 'aside'
    captionContent?: string | ((slide: { data: unknown }) => string)
  }

  export default class PhotoSwipeDynamicCaption {
    constructor(lightbox: PhotoSwipeLightbox, options?: CaptionPluginOptions)
  }
}
