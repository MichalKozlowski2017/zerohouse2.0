import React from 'react';

const Arrows = ({ swiper }) => {
  return (
    <div className="w-[200px] h-[20px] flex justify-between my-[10px]">
      <div
        className="arr--prev opacity-20 transition-opacity hover:opacity-100 cursor-pointer"
        onClick={() => swiper.slidePrev()}
      >
        <svg
          viewBox="0 0 102 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-auto h-full rotate-180"
        >
          <path
            className="fill-[#2c2c2c]"
            d="M101.061 13.0607C101.646 12.4749 101.646 11.5251 101.061 10.9393L91.5147 1.3934C90.9289 0.807611 89.9792 0.807611 89.3934 1.3934C88.8076 1.97919 88.8076 2.92893 89.3934 3.51472L97.8787 12L89.3934 20.4853C88.8076 21.0711 88.8076 22.0208 89.3934 22.6066C89.9792 23.1924 90.9289 23.1924 91.5147 22.6066L101.061 13.0607ZM0 13.5H100V10.5H0V13.5Z"
          />
        </svg>
      </div>
      <div
        className="arr--next opacity-20 transition-opacity hover:opacity-100 cursor-pointer"
        onClick={() => swiper.slideNext()}
      >
        <svg
          viewBox="0 0 102 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-auto h-full"
        >
          <path
            className="fill-[#2c2c2c]"
            d="M101.061 13.0607C101.646 12.4749 101.646 11.5251 101.061 10.9393L91.5147 1.3934C90.9289 0.807611 89.9792 0.807611 89.3934 1.3934C88.8076 1.97919 88.8076 2.92893 89.3934 3.51472L97.8787 12L89.3934 20.4853C88.8076 21.0711 88.8076 22.0208 89.3934 22.6066C89.9792 23.1924 90.9289 23.1924 91.5147 22.6066L101.061 13.0607ZM0 13.5H100V10.5H0V13.5Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Arrows;
