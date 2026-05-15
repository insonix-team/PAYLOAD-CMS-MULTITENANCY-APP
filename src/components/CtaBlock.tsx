// components/blocks/CTABlockUI.tsx
'use client'

interface CTABlockUIProps {
  data: {
    blockType: 'cta'
    title: string
    description?: string
    buttonText: string
    buttonLink: string
    backgroundColor?: 'primary' | 'secondary' | 'dark'
  }
  tenant: string
}

export const CTABlock: React.FC<CTABlockUIProps> = ({ data, tenant }) => {
  const { title, description, buttonText, buttonLink, backgroundColor = 'primary' } = data

  const bgColors = {
    primary: 'bg-blue-600',
    secondary: 'bg-purple-600',
    dark: 'bg-gray-900',
  }

  const hoverColors = {
    primary: 'hover:bg-blue-700',
    secondary: 'hover:bg-purple-700',
    dark: 'hover:bg-gray-800',
  }

  return (
    <section className={`cta-block py-20 ${bgColors[backgroundColor]}`} data-tenant={tenant}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>

        {description && <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">{description}</p>}

        <a href={buttonLink} className={`inline-block px-8 py-3 bg-white ${backgroundColor === 'dark' ? 'text-gray-900' : 'text-blue-600'} font-semibold rounded-lg shadow-lg transition-all ${hoverColors[backgroundColor]} transform hover:scale-105`}>
          {buttonText}
        </a>
      </div>
    </section>
  )
}
