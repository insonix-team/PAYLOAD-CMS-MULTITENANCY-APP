'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { RichText } from '@payloadcms/richtext-lexical/react';
import type { Media } from '@/payload-types';

type Props = {
  data: {
    slides: {
      image: string | Media;
      content?: {
        root: {
          type: string;
          children: {
            type: any;
            version: number;
            [k: string]: unknown;
          }[];
          indent: number;
          version: number;
        };
        [k: string]: unknown;
      } | null;
      id?: string | null;
    }[];
    slidesPerMobile?: number | null;
    slidesPerTablet?: number | null;
    slidesPerDesktop?: number | null;
    autoplay?: boolean | null;
    delay?: number | null;
    id?: string | null;
  };
};
export const CarouselBlockUI = ({ data }: Props) => {
  const { slides, autoplay, delay, slidesPerMobile, slidesPerTablet, slidesPerDesktop } = data;
  return (
    <section className="w-full py-12">
      <div className="container mx-auto">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={slidesPerMobile || 1}
          navigation
          pagination={{ clickable: true }}
          autoplay={
            autoplay
              ? {
                  delay: delay || 3000,
                  disableOnInteraction: false,
                }
              : undefined
          }
          breakpoints={{
            640: {
              slidesPerView: slidesPerTablet || 2,
            },
            1024: {
              slidesPerView: slidesPerDesktop || 3,
            },
          }}
          className="pb-10"
        >
          {slides?.map((slide, i) => {
            const image =
              slide.image && typeof slide.image === 'object' && 'url' in slide.image
                ? (slide.image as Media)
                : null;

            return (
              <SwiperSlide key={slide.id || i}>
                <div className="bg-card rounded-xl shadow-md mb-4 overflow-hidden h-full">
                  {image?.url ? (
                    <img
                      src={image.url}
                      alt={image.alt || 'Slide'}
                      className="w-full h-64 object-cover"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-200" />
                  )}

                  <div className="p-6 prose max-w-none">
                    {slide.content && <RichText data={slide.content as any} />}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};
