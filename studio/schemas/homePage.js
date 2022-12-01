export default {
  title: 'Home Page',
  name: 'homePage',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      name: 'excerpt',
      description: 'Write a short pararaph of this post (For SEO Purposes)',
      title: 'Excerpt',
      rows: 5,
      type: 'text',
      validation: (Rule) =>
        Rule.max(160).error(
          'SEO descriptions are usually better when its below 160'
        ),
    },
  ],
};
