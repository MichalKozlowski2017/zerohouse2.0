export default {
  title: 'Footer',
  name: 'footer',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      name: 'logos',
      title: 'Logos',
      type: 'array',
      of: [
        {
          title: 'Footer Logo',
          name: 'footerLogo',
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
              title: 'Logo Link',
              name: 'logoLink',
              type: 'url',
            },
          ],
        },
      ],
    },
    {
      title: 'Youtube link',
      name: 'smYoutube',
      type: 'url',
    },
    {
      title: 'Facebook link',
      name: 'smFacebook',
      type: 'url',
    },
    {
      title: 'LinkedIn link',
      name: 'smLinkedin',
      type: 'url',
    },
    {
      title: 'Instagram link',
      name: 'smInstagram',
      type: 'url',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'array',
      validation: (Rule) => Rule.required(),
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Title', value: 'h5'},
            {title: 'Paragraph', value: 'p'},
          ],
        },
      ],
    },
    {
      name: 'kontakt',
      title: 'Kontakt',
      type: 'array',
      validation: (Rule) => Rule.required(),
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Title', value: 'h5'},
            {title: 'Paragraph', value: 'p'},
          ],
        },
      ],
    },
  ],
}
