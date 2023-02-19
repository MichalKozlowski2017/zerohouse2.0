import React, { useState, useEffect } from 'react';
import ReactPannellum, { addScene, loadScene } from 'react-pannellum';
import { Block } from '@typings/block';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';
import { urlFor } from '@lib/sanity';

type Scene = {
  autoRotate: number;
  sceneId: string;
  title: string;
  hfov: number;
  pitch: number;
  yaw: number;
  type: string;
  imageSource: string;
};

const Panorama = (block: Block) => {
  const [scene, setScene] = useState(block.images[0].alt);
  const [scenes, setScenes] = useState([]);
  const [scenesMenuIsOpen, setScenesMenuIsOpen] = useState(false);

  useEffect(() => {
    const tempScenes = [];

    block.images.forEach((image) => {
      const tempScene: Scene = {
        autoRotate: -2,
        sceneId: image.id,
        title: image.alt,
        hfov: 110,
        pitch: -3,
        yaw: 117,
        type: 'equirectangular',
        imageSource: urlFor(image).url(),
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      tempScenes.push(tempScene);
    });
    setScenes(tempScenes);
  }, [block.images]);

  const animations = {
    right: {
      show: {
        opacity: 1,
        scale: 1,
        x: '0',
        transition: {
          default: { duration: 0.6 },
          ease: 'circOut',
        },
      },
      hidden: {
        opacity: 0,
        scale: 0.9,
        x: '5%',
      },
    },
    left: {
      show: {
        opacity: 1,
        scale: 1,
        x: '0',
        transition: {
          default: { duration: 0.6 },
          ease: 'circOut',
        },
      },
      hidden: {
        opacity: 0,
        scale: 0.9,
        x: '-5%',
      },
    },
  };

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
      <motion.div
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
        variants={animations.left}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <PortableText
          value={block.content}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          components={myPortableTextComponents}
        />
      </motion.div>
      <motion.div
        className="mx-auto w-full lg:px-[60px] xl:w-[80%] xl:px-0"
        variants={animations.right}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="relative h-[400px] max-h-[730px] w-full md:h-[600px] xl:h-[730px]">
          <div className="absolute top-[20px] right-[20px] z-10">
            <button
              id="scenesButton"
              className=" w-[140px] cursor-pointer border-b border-gray-400 bg-white/60 py-[10px]"
              onClick={() => handleScenesMenu()}
            >
              {scene}
            </button>
            {scenesMenuIsOpen && scenes.length > 0 && (
              <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {block.images?.map((scene) => (
                  <li
                    key={uuidv4()}
                    value={scene.id}
                    onClick={() => {
                      handleScene(scene.id, scene.alt);
                      handleScenesMenu();
                    }}
                    className="w-[140px] cursor-pointer bg-white/60 py-[8px] text-center text-[14px] transition-colors hover:bg-white"
                  >
                    {scene.alt}
                  </li>
                ))}
              </motion.ul>
            )}
          </div>
          {scenes.length > 0 && (
            <ReactPannellum
              id="1"
              sceneId="firstScene"
              imageSource={urlFor(block?.images[0]).url()}
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
              }}
              config={config}
              onPanoramaLoaded={() => {
                console.log(scenes);
                scenes?.forEach((scene: Scene) => {
                  addScene(scene.sceneId, scene);
                });
              }}
            ></ReactPannellum>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default Panorama;
