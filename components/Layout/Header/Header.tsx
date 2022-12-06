import React from 'react';
import Link from 'next/link';
import { Pages } from '@typings/pages';

const Header = ({ pages }: Pages) => {
  return (
    <header>
      <div>
        <Link href="/">Logo</Link>
      </div>
      <div className="bg-red-500">
        {pages?.map((page) => (
          <div key={page._id}>
            <Link href={page.slug.current}>{page.title}</Link>
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;
