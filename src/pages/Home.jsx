import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import style from "./SwiperProps.module.css";
import { Autoplay, Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useGetSliderQuery } from "../services/Info";
import i18n from "../i18n";
import SliderLoader from "../components/Loader/SliderLoader";

const Home = () => {
  const { data: swiper, error, isLoading } = useGetSliderQuery();
  const { t } = useTranslation();

  if (error) return <p>Ошибка загрузки</p>;
  if (isLoading) return <SliderLoader />;

  const lang = i18n.language;

  // Функция для удаления HTML-тегов
  const stripHTML = (text) => text?.replace(/<[^>]*>/g, "") || "";

  return (
    <div className={`w-full bg-green-300 ${style.wrapperr}`}>
      <Swiper
        className="h-[75vh] relative w-full"
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        spaceBetween={0}
        pagination={{
          el: ".bullets",
          clickable: true,
          renderBullet: (_, className) => {
            return `<span class="${className} ${style.wrapperr}"></span>`;
          },
        }}
        modules={[Pagination, Autoplay]}
      >
        <div className="bullets absolute bottom-10 z-20 w-full py-5 flex gap-5 justify-center"></div>

        {swiper.map((item, index) => {
          // Динамически формируем текст и картинку для каждого слайда
          const text = stripHTML(
            item[`text_${lang === "rus" ? "ru" : lang === "tkm" ? "tk" : "en"}`]
          );
          const imageUrl = `https://api.sayodatravel.com/${item.image.replace(
            /\\/g,
            "/"
          )}`;

          return (
            <SwiperSlide key={index} className="relative z-10 h-full">
              <div
                className="w-full h-full absolute top-0 left-0 bg-cover bg-center"
                style={{ backgroundImage: `url("${imageUrl}")` }}
              ></div>

              <div className="w-full text-white flex justify-between text-center container mx-auto px-4 items-center relative z-20 h-full">
                <motion.div
                  className="flex flex-col justify-center w-full gap-5 px-10"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <motion.h2
                    className="font-bold text-3xl xl:text-5xl mb-4"
                    initial={{ opacity: 0, y: -80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  >
                    {text}
                  </motion.h2>
                  <motion.p
                    className="text-xl xl:text-xl max-w-md mx-auto"
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.2,
                      ease: "easeOut",
                    }}
                  >
                    {t(item.descKey)}
                  </motion.p>
                </motion.div>
                <div className="hidden sm:block sm:space-y-7 px-10"></div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Home;
