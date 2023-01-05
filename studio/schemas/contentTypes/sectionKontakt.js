export default {
  title: 'Section Kontakt',
  name: 'sectionKontakt',
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
      name: 'imagePosition',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'Image Left', value: 'imgLeft'},
          {title: 'Image Right', value: 'imgRight'},
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
