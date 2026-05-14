import { Block } from 'payload'

export const ContactForm: Block = {
  slug: 'contactForm',

  fields: [
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'subject',
      type: 'text',
    },
    {
      name: 'message',
      type: 'text',
    },
  ],
}
