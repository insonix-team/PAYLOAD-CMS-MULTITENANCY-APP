'use client';
// components/blocks/ContentBlock.tsx
import Image from 'next/image';

interface ContentBlockProps {
  blockType: 'content';
  title?: string;
  content: any; // Rich text content from Payload
  image?: {
    url: string;
    alt?: string;
  };
  imagePosition?: 'left' | 'right';
}

export const ContentBlock: React.FC<ContentBlockProps> = ({ title, content, image, imagePosition = 'right' }) => {
  // Function to render rich text content
  const renderRichText = (richText: any) => {
    if (!richText) return null;

    // Handle Payload's rich text format
    if (Array.isArray(richText)) {
      return richText.map((node, index) => {
        if (node.type === 'paragraph') {
          return (
            <p key={index} className="mb-4 text-gray-600">
              {node.children?.[0]?.text}
            </p>
          );
        }
        if (node.type === 'h1') {
          return (
            <h1 key={index} className="text-4xl font-bold mb-4">
              {node.children?.[0]?.text}
            </h1>
          );
        }
        if (node.type === 'h2') {
          return (
            <h2 key={index} className="text-3xl font-bold mb-3">
              {node.children?.[0]?.text}
            </h2>
          );
        }
        if (node.type === 'h3') {
          return (
            <h3 key={index} className="text-2xl font-bold mb-2">
              {node.children?.[0]?.text}
            </h3>
          );
        }
        if (node.type === 'ul') {
          return (
            <ul key={index} className="list-disc pl-5 mb-4">
              {node.children?.map((item: any, i: number) => (
                <li key={i} className="text-gray-600">
                  {item.children?.[0]?.text}
                </li>
              ))}
            </ul>
          );
        }
        if (node.type === 'ol') {
          return (
            <ol key={index} className="list-decimal pl-5 mb-4">
              {node.children?.map((item: any, i: number) => (
                <li key={i} className="text-gray-600">
                  {item.children?.[0]?.text}
                </li>
              ))}
            </ol>
          );
        }
        return null;
      });
    }

    // Fallback for simple string content
    return <div className="prose prose-lg text-gray-600" dangerouslySetInnerHTML={{ __html: content }} />;
  };

  return (
    <section className="content-block py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className={`flex flex-col ${imagePosition === 'right' ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
          {/* Content Side */}
          <div className="flex-1">
            {title && <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{title}</h2>}
            <div className="rich-text">{renderRichText(content)}</div>
          </div>

          {/* Image Side */}
          {image && image.url && (
            <div className="flex-1">
              <Image src={image.url} alt={image.alt || title || 'Content image'} width={600} height={400} className="rounded-xl shadow-lg w-full h-auto" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
