import type { CSSProperties } from 'react'

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
      <a
        href={credit.authorUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2"
        data-sb-field-path={fieldPath ? `${fieldPath}.author` : undefined}
      >
        {credit.author}
      </a>{' '}
      on{' '}
      <a
        href={credit.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2"
        data-sb-field-path={fieldPath ? `${fieldPath}.sourceUrl` : undefined}
      >
        {credit.source}
      </a>
    </p>
  )
}
