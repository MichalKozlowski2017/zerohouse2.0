import React from 'react';
import Head from 'next/head';
import { groq } from 'next-sanity';
import { getClient } from '@lib/sanity';
import { Page } from '@typings/page';
import ContentWrapper from '@components/ContentWrapper/ContentWrapper';

const Page = ({ page, pageContent, offerInfo, offers }: Page) => {
  return (
    <div>
      <Head>
        <title>Zerohouse - {page.title}</title>
        <meta name="description" content={page.excerpt} />
        <meta name="keywords" content={page.keywords} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContentWrapper
        content={pageContent}
        offerInfo={offerInfo}
        offers={offers}
      />
    </div>
  );
};

export default Page;

export const getStaticPaths = async () => {
  const query = groq`
    *[_type == "offer"]{
      _id,
      slug {
        current
      }
    }
  `;

  const pages = await getClient().fetch(query);
  const paths = pages.map((page: Page) => ({
    params: {
      slug: page.slug.current,
    },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }) => {
  const query = groq`
    *[_type == "offer" && slug.current == $slug][0]{
      title,
      slug {
        current
      },
      _id,
      contentBlocks[] -> {...},
      offerInfo
    }
  `;
  const pagesQuery = groq`
    *[_type == "page" && title != "Home"] | order(menuPosition asc) {
      ...
      
    }
  `;

  const offersQuery = groq`
  *[_type == "offer"] | order(title asc) {
    ...
  }
  `;

  const footerQuery = groq`
  *[_type == "footer"] {
    address,
    kontakt,
    logos[],
    smYoutube,
    smFacebook,
    smLinkedin,
    smInstagram,
  }
  `;

  const page = await getClient().fetch(query, {
    slug: params.slug,
  });

  const pages = await getClient().fetch(pagesQuery);
  const offers = await getClient().fetch(offersQuery);
  const footer = await getClient().fetch(footerQuery);

  if (!page) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      page,
      pages,
      pageContent: page.contentBlocks,
      footer: footer[0],
      offerInfo: page.offerInfo,
      offers,
    },
    revalidate: 60,
  };
};
