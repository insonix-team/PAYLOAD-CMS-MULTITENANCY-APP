'use client'

import { useField } from '@payloadcms/ui'
import type { TextFieldClientProps } from 'payload'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import { useEffect, useRef } from 'react'

const Divider = () => (
  <span
    style={{
      width: '1px',
      background: '#ddd',
      margin: '0 4px',
      alignSelf: 'stretch',
      display: 'inline-block',
    }}
  />
)

const Btn = ({ onClick, active, title, children, danger }: { onClick: () => void; active?: boolean; title: string; children: React.ReactNode; danger?: boolean }) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    style={{
      padding: '4px 7px',
      margin: '1px',
      border: '1px solid',
      borderColor: danger ? '#f87171' : active ? '#4f46e5' : '#e2e8f0',
      borderRadius: '5px',
      background: danger ? '#fef2f2' : active ? '#4f46e5' : '#fff',
      color: danger ? '#dc2626' : active ? '#fff' : '#374151',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: 500,
      minWidth: '28px',
      lineHeight: '1.4',
      transition: 'all 0.1s',
    }}
  >
    {children}
  </button>
)

function Toolbar({ editor }: { editor: any }) {
  const colorRef = useRef<HTMLInputElement>(null)
  const highlightRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLInputElement>(null)

  if (!editor) return null

  const uploadImage = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('_payload', JSON.stringify({ alt: file.name }))

    const res = await fetch('/api/media', { method: 'POST', body: formData })
    if (!res.ok) {
      const error = await res.text()
      console.error('Upload error:', error)
      throw new Error('Upload failed')
    }
    const data = await res.json()
    console.log('Upload response:', data)
    return data?.doc?.url
  }

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '2px',
        padding: '8px 10px',
        borderBottom: '1px solid #e2e8f0',
        background: 'linear-gradient(to bottom, #f8fafc, #f1f5f9)',
        borderRadius: '8px 8px 0 0',
      }}
    >
      {/* Headings */}
      <Btn title="Heading 1" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })}>
        H1
      </Btn>
      <Btn title="Heading 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })}>
        H2
      </Btn>
      <Btn title="Heading 3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })}>
        H3
      </Btn>
      <Btn title="Heading 4" onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} active={editor.isActive('heading', { level: 4 })}>
        H4
      </Btn>
      <Btn title="Paragraph" onClick={() => editor.chain().focus().setParagraph().run()} active={editor.isActive('paragraph')}>
        ¶
      </Btn>

      <Divider />

      {/* Text formatting */}
      <Btn title="Bold" onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')}>
        <b>B</b>
      </Btn>
      <Btn title="Italic" onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')}>
        <i>I</i>
      </Btn>
      <Btn title="Underline" onClick={() => editor.chain().focus().toggleMark('underline').run()} active={editor.isActive('underline')}>
        <u>U</u>
      </Btn>
      <Btn title="Strikethrough" onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')}>
        <s>S</s>
      </Btn>
      <Btn title="Inline Code" onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')}>
        `c`
      </Btn>
      <Btn title="Subscript" onClick={() => editor.chain().focus().toggleSubscript().run()} active={editor.isActive('subscript')}>
        X₂
      </Btn>
      <Btn title="Superscript" onClick={() => editor.chain().focus().toggleSuperscript().run()} active={editor.isActive('superscript')}>
        X²
      </Btn>

      <Divider />

      {/* Text Color */}
      <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
        <Btn title="Text Color" onClick={() => colorRef.current?.click()}>
          <span>A</span>
          <span
            style={{
              display: 'block',
              width: '14px',
              height: '3px',
              marginTop: '1px',
              background: editor.getAttributes('textStyle').color || '#000',
              borderRadius: '2px',
            }}
          />
        </Btn>
        <input ref={colorRef} type="color" style={{ position: 'absolute', opacity: 0, width: 0, height: 0, pointerEvents: 'none' }} onChange={(e) => editor.chain().focus().setColor(e.target.value).run()} />
      </div>

      {/* Highlight Color */}
      <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
        <Btn title="Highlight Color" onClick={() => highlightRef.current?.click()}>
          🖊
        </Btn>
        <input ref={highlightRef} type="color" defaultValue="#fef08a" style={{ position: 'absolute', opacity: 0, width: 0, height: 0, pointerEvents: 'none' }} onChange={(e) => editor.chain().focus().setHighlight({ color: e.target.value }).run()} />
      </div>

      <Divider />

      {/* Alignment */}
      <Btn title="Align Left" onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })}>
        ≡L
      </Btn>
      <Btn title="Align Center" onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })}>
        ≡C
      </Btn>
      <Btn title="Align Right" onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })}>
        ≡R
      </Btn>
      <Btn title="Justify" onClick={() => editor.chain().focus().setTextAlign('justify').run()} active={editor.isActive({ textAlign: 'justify' })}>
        ≡J
      </Btn>

      <Divider />

      {/* Lists */}
      <Btn title="Bullet List" onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')}>
        • List
      </Btn>
      <Btn title="Ordered List" onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')}>
        1. List
      </Btn>
      <Btn title="Blockquote" onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')}>
        " "
      </Btn>
      <Btn title="Code Block" onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')}>{`</>`}</Btn>
      <Btn title="Horizontal Rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        ─
      </Btn>
      <Btn title="Hard Break" onClick={() => editor.chain().focus().setHardBreak().run()}>
        ↵
      </Btn>

      <Divider />

      <Divider />

      {/* Image Upload */}
      <div style={{ position: 'relative', display: 'inline-flex' }}>
        <Btn title="Upload Image" onClick={() => imageRef.current?.click()}>
          🖼 Image
        </Btn>
        <input
          ref={imageRef}
          type="file"
          accept="image/*"
          style={{ position: 'absolute', opacity: 0, width: 0, height: 0, pointerEvents: 'none' }}
          onChange={async (e) => {
            const file = e.target.files?.[0]
            if (!file) return
            try {
              const url = await uploadImage(file)
              if (url) editor.chain().focus().setImage({ src: url, alt: file.name }).run()
            } catch {
              alert('Image upload failed')
            }
            e.target.value = ''
          }}
        />
      </div>

      <Divider />

      {/* Undo / Redo */}
      <Btn title="Undo" onClick={() => editor.chain().focus().undo().run()}>
        ↩ Undo
      </Btn>
      <Btn title="Redo" onClick={() => editor.chain().focus().redo().run()}>
        Redo ↪
      </Btn>
    </div>
  )
}

export default function TipTapField({ field, path }: TextFieldClientProps) {
  const { value, setValue } = useField<string>({ path: path || field.name })
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image.configure({ inline: false, allowBase64: false }),
      Subscript,
      Superscript,
      Placeholder.configure({ placeholder: 'Start writing your content...' }),
      CharacterCount,
    ],
    content: value || '',
    onUpdate({ editor }) {
      setValue(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '')
    }
  }, [])

  const charCount = editor?.storage.characterCount?.characters?.() ?? 0
  const wordCount = editor?.storage.characterCount?.words?.() ?? 0

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <label
        style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontWeight: 600,
          fontSize: '0.875rem',
          color: '#374151',
        }}
      >
        {field.label as string}
      </label>
      <div
        style={{
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          overflow: 'visible',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}
      >
        <Toolbar editor={editor} />
        <EditorContent
          editor={editor}
          style={{
            minHeight: '250px',
            padding: '16px',
            fontSize: '14px',
            lineHeight: '1.7',
            color: '#111827',
            background: '#ffffff',
          }}
        />
        {/* Footer: word/char count */}
        <div
          style={{
            padding: '6px 12px',
            borderTop: '1px solid #f1f5f9',
            background: '#f8fafc',
            fontSize: '11px',
            color: '#94a3b8',
            borderRadius: '0 0 8px 8px',
            display: 'flex',
            gap: '12px',
          }}
        >
          <span>{wordCount} words</span>
          <span>{charCount} characters</span>
        </div>
      </div>
    </div>
  )
}
