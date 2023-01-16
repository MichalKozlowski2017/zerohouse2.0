export default {
  title: 'Gallery',
  name: 'gallery',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          validation: (Rule) => Rule.required(),
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt',
            },
          ],
        },
      ],
    },
  ],
}
