import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {media} from 'sanity-plugin-media'
import {table} from '@sanity/table'

const hiddenDocTypes = (listItem) =>
  ![
    'headerSimple',
    'sectionSimple',
    'headerSlider',
    'sliderImage',
    'sliderVideo',
    'iconsSlider',
    'fibaroSlider',
    'alternativeSlider',
    'sectionKontakt',
    'panorama',
  ].includes(listItem.getId())

export default defineConfig({
  name: 'default',
  title: 'zerohouse-2.0',

  projectId: '3cg573rc',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Your custom list items go here

            // Followed by an array of all remaining document types defined in
            // schema.js, with the hidden ones filtered out
            ...S.documentTypeListItems().filter(hiddenDocTypes),
          ]),
    }),
    visionTool(),
    media(),
    table(),
  ],

  schema: {
    types: schemaTypes,
  },
})
