export default {
  title: 'Pages',
  name: 'page',
  type: 'document',
  fields: [
    {
      title: 'Title',
      description: 'Write a title of page and name of position in menu',
      name: 'title',
      type: 'string',
    },
    {
      name: 'excerpt',
      description: 'Write a short pararaph of this page (For SEO Purposes)',
      title: 'Excerpt',
      rows: 5,
      type: 'text',
      validation: (Rule) =>
        Rule.max(160).error('SEO descriptions are usually better when its below 160'),
    },
    {
      name: 'keywords',
      description: 'Write a keywords (For SEO Purposes)',
      title: 'Keywords',
      rows: 5,
      type: 'text',
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
    },
    {
      title: 'Pozycja w menu',
      name: 'menuPosition',
      type: 'number',
    },
    {
      name: 'contentBlocks',
      title: 'Content Blocks',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'headerSimple'},
            {type: 'sectionSimple'},
            {type: 'headerSlider'},
            {type: 'iconsSlider'},
            {type: 'fibaroSlider'},
            {type: 'alternativeSlider'},
            {type: 'sectionKontakt'},
            {type: 'panorama'},
          ],
        },
      ],
    },
  ],
}
