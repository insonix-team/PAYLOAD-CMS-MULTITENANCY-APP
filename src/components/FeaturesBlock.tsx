'use client'
// components/blocks/FeaturesBlock.tsx
interface Feature {
  id?: string
  icon?: string
  title: string
  description: string
}

interface FeaturesBlockProps {
  blockType: 'features'
  title?: string
  features?: Feature[]
  columns?: '2' | '3' | '4'
}

export const FeaturesBlock: React.FC<FeaturesBlockProps> = ({ title, features = [], columns = '3' }) => {
  if (features.length === 0) return null

  const gridCols = {
    '2': 'md:grid-cols-2',
    '3': 'md:grid-cols-3',
    '4': 'md:grid-cols-4',
  }

  return (
    <section className="features py-20 bg-white">
      <div className="container mx-auto px-4">
        {title && <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">{title}</h2>}

        <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols[columns]} gap-8`}>
          {features.map((feature, index) => (
            <div key={feature.id || index} className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              {feature.icon && <div className="text-4xl mb-4">{feature.icon}</div>}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
