export default {
  title: 'Panorama',
  name: 'panorama',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Panorama images',
      name: 'panoramaImages',
      type: 'string',
      options: {
        list: ['wew_1', 'wew_2', 'wew_3', 'zew_1', 'zew_2', 'zew_3'],
      },
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Title', value: 'h3'},
            {title: 'Paragraph', value: 'p'},
          ],
        },
      ],
    },
  ],
}
