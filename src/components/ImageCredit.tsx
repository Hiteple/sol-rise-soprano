import type { CSSProperties } from 'react'

import { ExternalLink } from '@/components/ExternalLink'
import type { ImageCredit as ImageCreditData } from '../../schemas/image-credit'
import { cn } from '@/lib/utils'

type ImageCreditProps = {
  credit: ImageCreditData
  className?: string
  style?: CSSProperties
  'data-sb-field-path'?: string
}

export function ImageCredit({
  credit,
  className,
  style,
  'data-sb-field-path': fieldPath,
}: ImageCreditProps) {
  return (
    <p
      className={cn(
        'font-body text-xs leading-snug tracking-wide opacity-55 hover:opacity-90 transition-opacity max-w-[14rem] text-right',
        className,
      )}
      style={style}
      data-sb-field-path={fieldPath}
    >
      Photo from{' '}
      <ExternalLink
        href={credit.authorUrl}
        aria-label={`Photo author: ${credit.author}`}
        className="underline underline-offset-2"
        data-sb-field-path={fieldPath ? `${fieldPath}.author` : undefined}
      >
        {credit.author}
      </ExternalLink>{' '}
      on{' '}
      <ExternalLink
        href={credit.sourceUrl}
        aria-label={`Photo source: ${credit.source}`}
        className="underline underline-offset-2"
        data-sb-field-path={fieldPath ? `${fieldPath}.sourceUrl` : undefined}
      >
        {credit.source}
      </ExternalLink>
    </p>
  )
}
