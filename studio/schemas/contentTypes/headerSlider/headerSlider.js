export default {
  title: 'Header Slider',
  name: 'headerSlider',
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
          type: 'sliderImage',
        },
        {
          type: 'sliderVideo',
        },
      ],
    },
  ],
}
