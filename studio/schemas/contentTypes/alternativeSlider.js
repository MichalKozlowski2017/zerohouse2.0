export default {
  title: 'Alternative Slider',
  name: 'alternativeSlider',
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
          title: 'Alternative Slide',
          name: 'alternativeSlide',
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
              name: 'content',
              title: 'Content',
              type: 'array',
              validation: (Rule) => Rule.required(),
              of: [
                {
                  type: 'block',
                  styles: [
                    {title: 'Title', value: 'h3'},
                    {title: 'Paragraph', value: 'p'},
                    {title: 'CTA', value: 'cta'},
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
