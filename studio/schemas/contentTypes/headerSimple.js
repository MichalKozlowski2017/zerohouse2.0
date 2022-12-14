export default {
  title: 'Header Simple',
  name: 'headerSimple',
  type: 'document',
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
            {title: 'Title', value: 'h1'},
            {title: 'Subtitle', value: 'h2'},
            {title: 'Akapit', value: 'p'},
            {title: 'CTA', value: 'cta'},
          ],
        },
      ],
    },
  ],
}
