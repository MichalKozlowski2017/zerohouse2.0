import React from 'react';
import ReactPannellum, { getConfig } from 'react-pannellum';

const Panorama = () => {
  const config = {
    autoRotate: -2,
    autoLoad: true,
  };
  return (
    <section className="relative overflow-hidden bg-[#F8F8F8] pb-[75px]">
      <div className="mx-auto w-full xl:w-[80%]">
        <div className="relative h-[37vw] w-full">
          <ReactPannellum
            id="1"
            sceneId="firstScene"
            imageSource="/assets/images/JZE_360_01.jpg"
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
            }}
            config={config}
          />
        </div>
      </div>
    </section>
  );
};

export default Panorama;
