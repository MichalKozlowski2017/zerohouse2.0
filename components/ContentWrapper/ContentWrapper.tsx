import React from 'react';
import HeaderSimple from '@components/ContentSections/HeaderSimple/HeaderSimple';
import SectionSimple from '@components/ContentSections/SectionSimple/SectionSimple';
import { Block } from '@typings/block';
import HeaderSlider from '@components/ContentSections/HeaderSlider/HeaderSlider';

const ContentWrapper = ({ content }) => {
  return (
    <>
      {content?.map((block: Block) => {
        if (block._type === 'headerSimple') {
          return <HeaderSimple {...block} key={block._id} />;
        } else if (block._type === 'sectionSimple') {
          return <SectionSimple {...block} key={block._id} />;
        } else if (block._type === 'headerSlider') {
          return <HeaderSlider {...block} key={block._id} />;
        }
      })}
    </>
  );
};

export default ContentWrapper;
