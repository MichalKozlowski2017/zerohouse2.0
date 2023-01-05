import React from 'react';
import { Block } from '@typings/block';
import HeaderSimple from '@components/ContentSections/HeaderSimple/HeaderSimple';
import SectionSimple from '@components/ContentSections/SectionSimple/SectionSimple';
import HeaderSlider from '@components/ContentSections/HeaderSlider/HeaderSlider';
import IconsSlider from '@components/ContentSections/IconsSlider/IconsSlider';
import FibaroSlider from '@components/ContentSections/FibaroSlider/FibaroSlider';
import SectionKontakt from '@components/ContentSections/SectionKontakt/SectionKontakt';
import AlternativeSlider from '@components/ContentSections/AlternativeSlider/AlternativeSlider';

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
        } else if (block._type === 'iconsSlider') {
          return <IconsSlider {...block} key={block._id} />;
        } else if (block._type === 'fibaroSlider') {
          return <FibaroSlider {...block} key={block._id} />;
        } else if (block._type === 'alternativeSlider') {
          return <AlternativeSlider {...block} key={block._id} />;
        } else if (block._type === 'sectionKontakt') {
          return <SectionKontakt {...block} key={block._id} />;
        }
      })}
    </>
  );
};

export default ContentWrapper;
