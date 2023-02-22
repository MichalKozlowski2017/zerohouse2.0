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
      title: 'Autoplay time',
      name: 'time',
      type: 'number',
      description: 'Czas wyświetlania slajdu podany w milisekundach (1 sekunda = 1000)',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Title', value: 'h2'},
            {title: 'Subtitle', value: 'h3'},
            {title: 'CTA', value: 'cta'},
          ],
        },
      ],
    },
  ],
}
