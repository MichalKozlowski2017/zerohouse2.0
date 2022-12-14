export default {
  title: 'Slider Video',
  name: 'sliderVideo',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Video',
      name: 'video',
      type: 'file',
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
