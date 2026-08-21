import '@/lib/gallery-photoswipe.css'
import { useCallback, useEffect, useRef } from 'react'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import PhotoSwipeDynamicCaption from 'photoswipe-dynamic-caption-plugin'
import type { SlideData } from 'photoswipe'

import { netlifyImgSrc } from '@/lib/netlify-image'
import { resolvePublicPath } from '@/lib/public-path'
import { photographerCreditLabel } from '@/lib/photographer-credit'
import { youtubeIframeSrc } from '@/lib/utils'

export type GalleryLightboxItem = {
  image?: string
  videoUrl?: string
  alt: string
  title: string
  photographer?: string
}

type GallerySlideData = SlideData & {
  title: string
  photographer?: string
  mediaType?: 'image' | 'video'
  videoUrl?: string
}

const dimensionCache = new Map<string, { width: number; height: number }>()

/** Thin stroke icons aligned with Lucide `X` / zoom controls. */
function lucidePswpIcon(paths: string): string {
  return `<svg aria-hidden="true" class="pswp__icn pswp__icn--lucide" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`
}

const PHOTOSWIPE_UI_ICONS = {
  closeSVG: lucidePswpIcon('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'),
  zoomSVG: lucidePswpIcon(
    '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6"/><path d="M8 11h6"/>',
  ),
}

function lightboxImageSrc(path: string): string {
  return netlifyImgSrc(path, 2400, undefined, 'contain')
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function captionHtml(data: GallerySlideData): string {
  const credit = photographerCreditLabel(data.photographer)
  const photographer = credit
    ? `<p class="gallery-pswp-caption__photographer">${escapeHtml(credit)}</p>`
    : ''
  return `<p class="gallery-pswp-caption__title">${escapeHtml(data.title)}</p>${photographer}`
}

function loadImageDimensions(
  src: string,
): Promise<{ width: number; height: number }> {
  const cached = dimensionCache.get(src)
  if (cached) return Promise.resolve(cached)

  return new Promise((resolve) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => {
      const size = {
        width: img.naturalWidth || 1600,
        height: img.naturalHeight || 1200,
      }
      dimensionCache.set(src, size)
      resolve(size)
    }
    img.onerror = () => {
      const fallback = { width: 1600, height: 1200 }
      dimensionCache.set(src, fallback)
      resolve(fallback)
    }
    img.src = src
  })
}

function isVideoSlide(data: GallerySlideData): boolean {
  return data.mediaType === 'video' && Boolean(data.videoUrl?.trim())
}

function setZoomButtonVisible(lightbox: PhotoSwipeLightbox, visible: boolean) {
  const zoomButton = lightbox.pswp?.element?.querySelector('.pswp__button--zoom') as
    | HTMLElement
    | null
    | undefined
  if (zoomButton) {
    zoomButton.style.display = visible ? '' : 'none'
  }
}

function stopVideoIframes(root: ParentNode | null | undefined) {
  root?.querySelectorAll('.pswp__video-wrap iframe').forEach((iframe) => {
    ;(iframe as HTMLIFrameElement).src = ''
  })
}

function mountActiveVideoIframe(wrap: HTMLElement, data: GallerySlideData) {
  stopVideoIframes(wrap)
  wrap.replaceChildren()

  const iframe = document.createElement('iframe')
  iframe.className = 'pswp__video-iframe'
  iframe.src = youtubeIframeSrc(data.videoUrl!, { autoplay: true })
  iframe.title = data.alt || data.title
  iframe.allow =
    'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
  iframe.allowFullscreen = true
  wrap.appendChild(iframe)
}

function unmountVideoIframe(wrap: HTMLElement | null | undefined) {
  if (!wrap) return
  stopVideoIframes(wrap)
  wrap.replaceChildren()
}

async function toSlideData(item: GalleryLightboxItem): Promise<GallerySlideData> {
  const videoUrl = item.videoUrl?.trim()
  if (videoUrl) {
    return {
      mediaType: 'video',
      videoUrl,
      width: 1920,
      height: 1080,
      alt: item.alt,
      title: item.title,
      photographer: item.photographer,
    }
  }

  const image = item.image?.trim()
  if (!image) {
    return {
      mediaType: 'image',
      src: '',
      width: 1600,
      height: 1200,
      alt: item.alt,
      title: item.title,
      photographer: item.photographer,
    }
  }

  const src = lightboxImageSrc(image)
  const { width, height } = await loadImageDimensions(resolvePublicPath(image))

  return {
    mediaType: 'image',
    src,
    width,
    height,
    alt: item.alt,
    title: item.title,
    photographer: item.photographer,
  }
}

export function useGalleryPhotoSwipe() {
  const lightboxRef = useRef<PhotoSwipeLightbox | null>(null)

  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      pswpModule: () => import('photoswipe'),
      bgOpacity: 0.93,
      padding: { top: 48, bottom: 48, left: 16, right: 16 },
      showHideAnimationType: 'zoom',
      loop: false,
      wheelToZoom: true,
      ...PHOTOSWIPE_UI_ICONS,
    })

    new PhotoSwipeDynamicCaption(lightbox, {
      type: 'below',
      captionContent: (slide) => captionHtml(slide.data as GallerySlideData),
    })

    lightbox.on('contentLoad', (event) => {
      const data = event.content.data as GallerySlideData
      if (!isVideoSlide(data)) return

      event.preventDefault()

      // Placeholder only — iframe mounts on activate so preloaded neighbors don't autoplay.
      const wrap = document.createElement('div')
      wrap.className = 'pswp__video-wrap'
      event.content.element = wrap
      event.content.onLoaded()
    })

    lightbox.on('contentActivate', ({ content }) => {
      const data = content.data as GallerySlideData
      if (!isVideoSlide(data) || !(content.element instanceof HTMLElement)) return
      mountActiveVideoIframe(content.element, data)
    })

    lightbox.on('contentDeactivate', ({ content }) => {
      const data = content.data as GallerySlideData
      if (!isVideoSlide(data)) return
      unmountVideoIframe(content.element instanceof HTMLElement ? content.element : null)
    })

    lightbox.on('change', () => {
      const data = lightbox.pswp?.currSlide?.data as GallerySlideData | undefined
      setZoomButtonVisible(lightbox, !data || !isVideoSlide(data))
    })

    lightbox.on('close', () => {
      stopVideoIframes(lightbox.pswp?.element)
    })

    lightbox.init()
    lightboxRef.current = lightbox

    return () => {
      lightbox.destroy()
      lightboxRef.current = null
    }
  }, [])

  const openGallery = useCallback(async (items: GalleryLightboxItem[], index: number) => {
    const instance = lightboxRef.current
    if (!instance || items.length === 0) return

    const dataSource = await Promise.all(items.map(toSlideData))
    instance.loadAndOpen(index, dataSource)
  }, [])

  return { openGallery }
}
