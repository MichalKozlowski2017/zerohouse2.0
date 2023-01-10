import React, { useState } from 'react';
import ReactPannellum, { addScene, loadScene } from 'react-pannellum';
import { Block } from '@typings/block';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';

const Panorama = (block: Block) => {
  const [scene, setScene] = useState('Wnętrze 1');
  const [scenesMenuIsOpen, setScenesMenuIsOpen] = useState(false);

  const scenes = [
    {
      autoRotate: -2,
      sceneId: 'wew_1',
      title: 'Wnętrze 1',
      hfov: 110,
      pitch: -3,
      yaw: 117,
      type: 'equirectangular',
      imageSource: '/assets/images/wew_1.jpg',
    },
    {
      autoRotate: -2,
      sceneId: 'wew_2',
      title: 'Wnętrze 2',
      hfov: 110,
      pitch: -3,
      yaw: 117,
      type: 'equirectangular',
      imageSource: '/assets/images/wew_2.jpg',
    },
    {
      autoRotate: -2,
      sceneId: 'wew_3',
      title: 'Wnętrze 3',
      hfov: 110,
      pitch: -3,
      yaw: 117,
      type: 'equirectangular',
      imageSource: '/assets/images/wew_3.jpg',
    },
    {
      autoRotate: -2,
      sceneId: 'zew_1',
      title: 'Na zewnątrz 1',
      hfov: 110,
      pitch: -3,
      yaw: 117,
      type: 'equirectangular',
      imageSource: '/assets/images/zew_1.jpg',
    },
    {
      autoRotate: -2,
      sceneId: 'zew_2',
      title: 'Na zewnątrz 2',
      hfov: 110,
      pitch: -3,
      yaw: 117,
      type: 'equirectangular',
      imageSource: '/assets/images/zew_2.jpg',
    },
    {
      autoRotate: -2,
      sceneId: 'zew_3',
      title: 'Na zewnątrz 3',
      hfov: 110,
      pitch: -3,
      yaw: 117,
      type: 'equirectangular',
      imageSource: '/assets/images/zew_3.jpg',
    },
  ];

  const handleScene = (arg: string, title: React.SetStateAction<string>) => {
    loadScene(arg);
    setScene(title);
  };

  const handleScenesMenu = () => {
    setScenesMenuIsOpen(!scenesMenuIsOpen);
  };

  const config = {
    autoRotate: -2,
    autoLoad: true,
  };

  const myPortableTextComponents = {
    block: {
      h3: ({ children }) => (
        <h3 className="pb-[30px] text-[26px] text-[#2c2c2c] md:text-[25px] xl:text-[34px]">
          {children}
        </h3>
      ),

      p: ({ children }) => (
        <p className="pb-[20px] text-[18px] leading-loose text-[#2c2c2c] md:text-[16px] xl:text-[21px]">
          {children}
        </p>
      ),
    },

    marks: {
      link: ({ value, children }) => {
        const target = (value?.href || '').startsWith('http')
          ? '_blank'
          : undefined;
        const rel = target === '_blank' ? 'noindex nofollow' : undefined;

        if ((value?.href || '').startsWith('http')) {
          return (
            <span className="cursor-pointer font-bold">
              <a href={value?.href} target={target} rel={rel}>
                <span>{children}</span>
              </a>
            </span>
          );
        } else {
          return (
            <span className="cursor-pointer pb-[30px] text-[26px] text-[#2c2c2c] md:text-[25px] xl:text-[34px]">
              <Link href={value?.href} target={target} rel={rel}>
                <span>{children}</span>
              </Link>
            </span>
          );
        }
      },
    },
  };

  return (
    <section
      className="relative bg-[#F8F8F8]
    md:flex-row md:py-[40px] 
    xl:pt-[140px]
    "
    >
      <div
        className="relative mt-[40px]
          overflow-visible
          bg-white px-[40px]
          py-[40px] 
          md:w-[50%] md:px-[60px]
          lg:before:absolute
          lg:before:bottom-[-250px]
          lg:before:left-0
          lg:before:h-[250px]
          lg:before:w-[100%]
          lg:before:bg-white
          xl:px-[10%]

        

        "
      >
        <PortableText
          value={block.content}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          components={myPortableTextComponents}
        />
      </div>
      <div className="mx-auto w-full lg:px-[60px] xl:w-[80%] xl:px-0">
        <div className="relative h-[400px] max-h-[730px] w-full md:h-[600px] xl:h-[730px]">
          <div className="absolute top-[20px] right-[20px] z-10">
            <button
              id="scenesButton"
              className=" w-[140px] cursor-pointer border-b border-gray-400 bg-white/60 py-[10px]"
              onClick={() => handleScenesMenu()}
            >
              {scene}
            </button>
            {scenesMenuIsOpen && (
              <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {scenes.map((scene) => (
                  <li
                    key={uuidv4()}
                    value={scene.sceneId}
                    onClick={() => {
                      handleScene(scene.sceneId, scene.title);
                      handleScenesMenu();
                    }}
                    className="w-[140px] cursor-pointer bg-white/60 py-[8px] text-center text-[14px] transition-colors hover:bg-white"
                  >
                    {scene.title}
                  </li>
                ))}
              </motion.ul>
            )}
          </div>
          <ReactPannellum
            id="1"
            sceneId="firstScene"
            imageSource={scenes[0].imageSource}
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
            }}
            config={config}
            onPanoramaLoaded={() => {
              scenes.forEach((scene) => {
                addScene(scene.sceneId, scene);
              });
            }}
          ></ReactPannellum>
        </div>
      </div>
    </section>
  );
};

export default Panorama;
