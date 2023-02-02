export default {
  title: 'offers List',
  name: 'offersList',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Type',
      name: 'type',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'Oferty deweloperskie', value: 'dev'},
          {title: 'Oferty projektowe', value: 'project'},
          {title: 'Wszystkie', value: 'all'},
        ],
        layout: 'radio',
      },
    },
  ],
}
