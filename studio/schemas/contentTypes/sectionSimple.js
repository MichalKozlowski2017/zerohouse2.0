export default {
  title: 'Section Simple',
  name: 'sectionSimple',
  type: 'document',
  hidden: true,
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
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
            { title: 'Title', value: 'h1' },
            { title: 'Subtitle', value: 'h2' },
            { title: 'Akapit', value: 'p' },
            { title: 'CTA', value: 'cta' },
          ],
        },
      ],
    },
  ],
};
