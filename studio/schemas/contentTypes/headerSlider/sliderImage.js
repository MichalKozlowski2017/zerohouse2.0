export default {
  title: 'Slider Image',
  name: 'sliderImage',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
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
            {title: 'Title', value: 'h3'},
            {title: 'Subtitle', value: 'h4'},
            {title: 'CTA', value: 'cta'},
          ],
        },
      ],
    },
  ],
}
