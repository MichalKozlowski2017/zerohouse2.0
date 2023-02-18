import Image from 'next/image';
import { createClient } from 'next-sanity';
import createImageUrlBuilder from '@sanity/image-url';
import { PortableText as PortableTextComponent } from '@portabletext/react';
import { config } from './config';
import GetImage from '@utils/getImage';

if (!config.projectId) {
  throw Error('The Project ID is not set. Check your environment variables.');
}
export const urlFor = (source) => createImageUrlBuilder(config).image(source);

export const imageBuilder = (source) =>
  createImageUrlBuilder(config).image(source);

export const getUrlFromId = (ref) => {
  // Example ref: file-207fd9951e759130053d37cf0a558ffe84ddd1c9-mp3
  // We don't need the first part, unless we're using the same function for files and images
  const [_file, id, extension] = ref.split('-');
  return `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${id}.${extension}`;
};

// export const usePreviewSubscription =
//   createPreviewSubscriptionHook(config);

// Barebones lazy-loaded image component
const ImageComponent = ({ value }) => {
  // const {width, height} = getImageDimensions(value)
  return (
    <Image
      {...GetImage(value)}
      blurDataURL={GetImage(value).blurDataURL}
      sizes="(max-width: 800px) 100vw, 800px"
      alt={value.alt || ' '}
      placeholder="blur"
      loading="lazy"
    />
  );
};

const components = {
  types: {
    image: ImageComponent,
    code: (props) => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    )
  },
  marks: {
    center: (props) => <div className="text-center">{props.children}</div>,
    highlight: (props) => (
      <span className="text-brand-primary font-bold">{props.children}</span>
    ),
    link: (props) => (
      <a href={props?.value?.href} target="_blank" rel="noopener noreferrer">
        {props.children}
      </a>
    )
  }
};
// Set up Portable Text serialization
export const PortableText = (props) => (
  <PortableTextComponent components={components} {...props} />
);

export const client = createClient(config);

export const previewClient = createClient({
  ...config,
  useCdn: false
});

export const getClient = (usePreview) => (usePreview ? previewClient : client);
export default client;
