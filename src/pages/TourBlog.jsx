import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { useGetBlogQuery } from "../services/Info";
import i18n from "../i18n";
import MyLoader from "../components/Loader/MyLoader";
import { Link } from "react-router";

gsap.registerPlugin(ScrollTrigger);

const MainFifth = () => {
  const { data: blogData = [], error, isLoading } = useGetBlogQuery();
  const { t } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    gsap.to(".rotateImg", {
      rotation: 360,
      duration: 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".rotateImg",
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });
  }, []);

  if (error) return <p>Ошибка загрузки данных</p>;
  if (isLoading) return <MyLoader />;

  const stripHTML = (text) => text?.replace(/<[^>]*>/g, "") || "";

  if (blogData.length === 0) return null;

  const bigBlog = blogData[0]; // первый объект — большая карточка
  const smallBlogs = blogData.slice(1); // остальные — маленькие

  const bigTitle = stripHTML(bigBlog[`title_${lang === "rus" ? "ru" : lang === "tkm" ? "tk" : "en"}`]);
  const bigText = stripHTML(bigBlog[`text_${lang === "rus" ? "ru" : lang === "tkm" ? "tk" : "en"}`]);
  const bigImage = `https://api.sayodatravel.com/${bigBlog.image}`;

  return (
    <div className="flex flex-col relative items-center px-10 my-20 md:p-10 xl:my-40">
      <div className="absolute left-[68px] lg:left-0 xl:left-60 -top-[52px] z-0">
        <img src="/Geroskop.svg" alt="rotate icon" className="rotateImg w-70 lg:w-full max-w-full" />
      </div>

      <h1 className="text-center text-2xl lg:text-5xl lg:py-5 font-bold">{t("blog1.title")}</h1>
      <p className="max-w-xl mx-auto text-center lg:py-5">{t("blog1.subtitle")}</p>
      <a href="/blog">
      <button className="bg-[#A40000] relative z-10 m-8 text-white text-sm font-semibold px-4 py-2 rounded-lg w-fit">{t("blog1.learnMore")}</button>
      </a>

      <div className="w-full relative z-44 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
          {/* Большая карточка */}
          <div className="flex flex-col text-start  items-start rounded-xl overflow-hidden">
            <a href='/blog'>
            <img src={bigImage} alt={bigTitle} className="w-full h-[200px] sm:h-[300px] lg:h-[400px] object-cover" />
            </a>
            <div className="flex py-6 flex-col items-start justify-between gap-4 flex-1">
              <h2 className=" text-lg sm:text-2xl md:text-2xl font-bold">{bigTitle}</h2>
              <p className="text-gray-700 text-base md:text-lg max-w-xl line-clamp-4 font-medium">{bigText}</p>
                <a href='/blog'>
                    <button className="bg-red-800 cursor-pointer mx-auto  mt-2 text-white text-sm font-semibold px-10 py-2 rounded-lg w-fit">{t("blog1.more")}</button>
                </a>
            </div>
          </div>

          {/* Маленькие карточки */}
          <div className="flex flex-col gap-10">
            {smallBlogs.slice(0,3).map((blog, i) => {
              const title = stripHTML(blog[`title_${lang === "rus" ? "ru" : lang === "tkm" ? "tk" : "en"}`]);
              const text = stripHTML(blog[`text_${lang === "rus" ? "ru" : lang === "tkm" ? "tk" : "en"}`]);
              const imageUrl = `https://api.sayodatravel.com/${blog.image}`;

              return (
                <div key={i} className="flex flex-col sm:flex-row rounded-xl line-clamp-5 h-auto sm:h-[180px] lg:h-[190px]">
                  <img src={imageUrl} alt={title} className="w-full sm:w-[45%] h-[200px] sm:h-full object-cover" />
                  <div className="flex flex-col justify-between lg:px-5 flex-1">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{title}</h3>
                      <p className="text-sm text-gray-700 line-clamp-4  font-medium">{text}</p>
                    </div>
                    <a href='/blog'>
                    <button className="bg-red-800 cursor-pointer mx-auto  mt-2 text-white text-sm font-semibold px-10 py-2 rounded-lg w-fit">{t("blog1.more")}</button>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};


export default MainFifth;
