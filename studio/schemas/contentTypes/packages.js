export default {
  title: 'Pakiety',
  name: 'packages',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          title: 'Pakiet',
          name: 'packageSlide',
          type: 'document',
          fields: [
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
            {
              title: 'Name',
              name: 'name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              title: 'Price',
              name: 'cena',
              type: 'number',
            },
            {
              name: 'features',
              title: 'Tabela',
              type: 'array',
              of: [{type: 'string'}],
            },
          ],
        },
      ],
    },
  ],
}
