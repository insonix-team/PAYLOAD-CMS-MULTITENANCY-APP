'use client'

import { RichText } from '@payloadcms/richtext-lexical/react'

type Props = {
  data: any
  tenant: string
}

export const ContentWithImageBlock = ({ data, tenant }: Props) => {
  const { layoutStyle = 'side-by-side', imagePosition = 'left', image, isBackgroundImage, theme = 'light', heading, description, buttons = [] } = data

  const isLeft = imagePosition === 'left'
  const isDark = theme === 'dark'

  return (
    <section
      className={`py-16 px-6 m-10 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
      style={
        isBackgroundImage && image?.url
          ? {
              backgroundImage: `url(${image.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : {}
      }
    >
      <div className={`max-w-6xl mx-auto flex flex-col ${layoutStyle === 'side-by-side' ? `md:flex-row ${isLeft ? '' : 'md:flex-row-reverse'}` : ''} items-center gap-10`}>
        {/* IMAGE */}
        {!isBackgroundImage && image?.url && (
          <div className="w-full md:w-1/2">
            <img src={image.url} className="rounded-2xl shadow-lg w-full" />
          </div>
        )}

        {/* CONTENT */}
        <div className="w-full md:w-1/2 space-y-4">
          {/* ✅ FIXED HERE */}
          {heading && <RichText data={heading} />}
          {description && <RichText data={description} />}

          {/* BUTTONS */}
          {buttons.length > 0 && (
            <div className="flex gap-4 pt-4 flex-wrap">
              {buttons.map((btn: any, i: number) => (
                <a key={i} href={`/${tenant}${btn.url}`} target={btn.openInNewTab ? '_blank' : '_self'} className="px-5 py-2 rounded-full bg-black text-white">
                  {btn.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
