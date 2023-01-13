export default {
  title: 'Offer',
  name: 'offer',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
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
      title: 'Offer Info',
      name: 'offerInfo',
      type: 'document',
      fields: [
        {
          title: 'Status',
          name: 'status',
          type: 'string',
          validation: (Rule) => Rule.required(),
          options: {
            list: [
              {title: 'Dostępny', value: 'available'},
              {title: 'Rezerwacja', value: 'reservation'},
              {title: 'Sprzedany', value: 'sold'},
            ],
            layout: 'radio',
          },
        },
        {
          title: 'Inwestycja',
          name: 'estate',
          type: 'string',
        },
        {
          title: 'Projekt',
          name: 'project',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          title: 'Nazwa',
          name: 'name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          title: 'Cena',
          name: 'price',
          type: 'number',
          validation: (Rule) => Rule.required(),
        },
        {
          title: 'Dane',
          name: 'features',
          type: 'document',
          fields: [
            {
              title: 'Sypialnie',
              name: 'bedrooms',
              type: 'number',
              description: 'Ilość',
            },
            {
              title: 'Łazienki',
              name: 'bathrooms',
              type: 'number',
              description: 'Ilość',
            },
            {
              title: 'Ogród',
              name: 'garden',
              type: 'number',
              description: 'Powierzchnia w metrach kwadratowych',
            },
            {
              title: 'Miejsca parkingowe',
              name: 'parking',
              type: 'number',
              description: 'Ilość',
            },
          ],
        },
        {
          title: 'Pomieszczenia',
          name: 'levels',
          type: 'array',
          of: [
            {
              title: 'Poziom',
              name: 'level',
              type: 'document',
              fields: [
                {
                  title: 'Title',
                  name: 'title',
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
                  name: 'rooms',
                  title: 'Pomieszczenia',
                  type: 'table', // Specify 'table' type
                },
              ],
            },
          ],
        },
      ],
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
            {type: 'offerInfo'},
            {type: 'packages'},
          ],
        },
      ],
    },
  ],
}
