export default {
  title: 'Section Simple',
  name: 'sectionSimple',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Typ',
      name: 'imageSize',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'Big image', value: 'bigImage'},
          {title: 'Small image', value: 'smallImage'},
        ],
        layout: 'radio',
      },
    },
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
            {title: 'Subtitle', value: 'h4'},
            {title: 'Paragraph', value: 'p'},
            {title: 'Badge', value: 'h5'},
            {title: 'CTA', value: 'cta'},
          ],
        },
      ],
    },
  ],
}
