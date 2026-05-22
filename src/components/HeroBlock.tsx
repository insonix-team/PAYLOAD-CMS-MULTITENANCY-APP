'use client'

// components/blocks/HeroBlock.tsx
import Image from 'next/image'

interface HeroBlockProps {
  data: {
    blockType: 'hero'
    title: string
    subtitle?: string
    image?: {
      url: string
      alt?: string
    }
    ctaText?: string
    ctaLink?: string
    alignment?: 'left' | 'center' | 'right'
  }
}

export const HeroBlock = ({ data }: HeroBlockProps) => {
  const { title, subtitle, image, ctaText, ctaLink, alignment = 'center' } = data

  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }

  const contentAlignment = {
    left: 'mx-0',
    center: 'mx-auto',
    right: 'ml-auto',
  }

  return (
    <section className="hero py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className={`flex flex-col ${alignmentClasses[alignment]} max-w-4xl ${contentAlignment[alignment]}`}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">{title}</h1>

          {subtitle && <p className="text-xl text-gray-600 mb-8 max-w-2xl">{subtitle}</p>}

          {ctaText && ctaLink && (
            <a href={ctaLink} className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              {ctaText}
            </a>
          )}
        </div>
        <div className="bg-blue-500 text-white p-8 text-center">
          <h1 className="text-4xl font-bold">Tailwind is working! 🎉</h1>
        </div>

        {image && image.url && (
          <div className="mt-12 flex justify-center">
            <Image src={image.url} alt={image.alt || title} width={1200} height={600} className="rounded-xl shadow-2xl" priority />
          </div>
        )}
      </div>
    </section>
  )
}
