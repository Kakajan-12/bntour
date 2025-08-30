import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination , Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import style from './AboutFifth.module.css';

const slidesData = [
  {
    imgSrc: "/sea.jpg",
    title: "Enjoy The Sea",
    description: "aboutThird.description",
    categories: ["Travel", "History"],
  },
  {
    imgSrc: "/tree.jpg",
    title: "Mountain Views",
    description: "aboutThird.description",
    categories: ["Adventure", "Nature"],
  },
  {
    imgSrc: "/sea.jpg",
    title: "Enjoy The Sea",
    description: "aboutThird.description",
    categories: ["Travel", "History"],
  },
 
];

const AboutFifth = () => {
  const { t } = useTranslation();

  return (
    <main className={style.main}>
      <div className={style.container}>
        <Swiper
          modules={[Pagination , Autoplay]}
          grabCursor={true}
          initialSlide={1}
          centeredSlides={true}
          className={style.wrapper}
           autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
          slidesPerView="auto"
          speed={800}
          slideToClickedSlide={true}
          pagination={{ clickable: true }}
          breakpoints={{
            320: { spaceBetween: 40 },
            650: { spaceBetween: 30 },
            1000: { spaceBetween: 20 },
          }}
        >
          {slidesData.map((slide, index) => (
            <SwiperSlide  key={index} className={style['swiper-slide']}>
              <img src={slide.imgSrc} alt="img" className={style.img} />
              <div className={style.title}>
                <h1>{t(slide.title)}</h1>
              </div>
              <div className={style.content}>
                <div className={style['text-box']}>
                  <p>{t(slide.description)}</p>
                </div>
                <div className={style.footer}>
                  <div className={style.category}>
                    {slide.categories.map((category, idx) => (
                      <span key={idx} style={{ "--i": idx + 1 }}>
                        {category}
                      </span>
                    ))}
                  </div>
                  <button className={style.button}>
                    <span className={style.label}>More...</span>
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </main>
  );
};


export default AboutFifth;
