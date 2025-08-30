import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import 'swiper/css';
import 'swiper/css/navigation';

const AboutSlide = () => {
  const { t } = useTranslation();

  const slide = [
    {
    "title": "“An unforgettable experience! The itinerary was perfectly balanced between history, culture, and adventure. Sleeping near the Darvaza crater was a highlight! The guides were super knowledgeable and made us feel safe and welcome at every step.”",
    "name": "— Jack Joe" 
    },
    {
    "title": "“An unforgettable experience! The itinerary was perfectly balanced between history, culture, and adventure. Sleeping near the Darvaza crater was a highlight! The guides were super knowledgeable and made us feel safe and welcome at every step.”",
    "name": "— Jack Joe" 
    },
    {
    "title": "“An unforgettable experience! The itinerary was perfectly balanced between history, culture, and adventure. Sleeping near the Darvaza crater was a highlight! The guides were super knowledgeable and made us feel safe and welcome at every step.”",
    "name": "— Jack Joe" 
    },
    {
    "title": "“An unforgettable experience! The itinerary was perfectly balanced between history, culture, and adventure. Sleeping near the Darvaza crater was a highlight! The guides were super knowledgeable and made us feel safe and welcome at every step.”",
    "name": "— Jack Joe" 
    },
  ]

  return (
    <div className="bg-[#336B7B] w-full h-auto p-10">
      <h1 className="text-center text-4xl md:text-6xl text-white font-bold mb-16">
        {t('recomendation')}
      </h1>

      <div className="flex justify-center">
        <div className="relative w-full max-w-5xl px-4">
          <Swiper
            modules={[Navigation]}
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            className="text-center"
          >
            {slide.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="border-2 border-[#D8B4A0] rounded-2xl bg-[#336B7B] p-6 sm:p-10 md:p-16 shadow-lg">
                  <div className="max-w-xl mx-auto flex flex-col gap-10">
                    <p className="text-white text-lg sm:text-xl md:text-3xl leading-relaxed font-light">
                      {item.title}
                    </p>
                    <p className="text-white text-base sm:text-lg md:text-xl font-semibold italic">
                      {item.name}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="swiper-button-prev-custom absolute hidden sm:block -left-8 top-1/2 -translate-y-1/2 text-white text-4xl cursor-pointer z-10 hover:scale-125 transition-transform duration-200">
            ‹
          </div>
          <div className="swiper-button-next-custom absolute hidden sm:block -right-8 top-1/2 -translate-y-1/2 text-white text-4xl cursor-pointer z-10 hover:scale-125 transition-transform duration-200">
            ›
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSlide;
