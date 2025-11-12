import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'pageSettings',
  title: 'Page Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'orgName',
      title: 'Organization Name',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'facebook', title: 'Facebook', type: 'url' },
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'twitter', title: 'Twitter', type: 'url' },
        { name: 'youtube', title: 'YouTube', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
      ],
    }),
  ],
});
