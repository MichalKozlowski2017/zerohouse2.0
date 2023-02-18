import Head from 'next/head';
import { getClient } from '@lib/sanity';
import { groq } from 'next-sanity';
import { GetStaticProps } from 'next';
import type { Page } from '@typings/page';
import ContentWrapper from '@components/ContentWrapper/ContentWrapper';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Home({ page, pageContent, offerInfo, offers }: Page) {
  return (
    <div>
      <Head>
        <title>{page.title}</title>
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
}

export const getStaticProps: GetStaticProps = async () => {
  const pageQuery = groq`
  *[_type == "page" && title == "Home"] {
    title,
    slug {
      current
    },
    _id,
    excerpt,
    keywords,
    contentBlocks[] -> {...}
  }
  `;

  const pagesQuery = groq`
  *[_type == "page" && title != "Home"] | order(menuPosition asc) {
    _id,
    title,
    slug {
      current
    }
  }
  `;

  const offersQuery = groq`
  *[_type == "offer"] | order(title asc){
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

  const page = await getClient().fetch(pageQuery);
  const pages = await getClient().fetch(pagesQuery);
  const offers = await getClient().fetch(offersQuery);
  const footer = await getClient().fetch(footerQuery);

  return {
    props: {
      page: page[0],
      pages,
      pageContent: page[0].contentBlocks,
      footer: footer[0],
      offers,
    },
    revalidate: 10,
  };
};
