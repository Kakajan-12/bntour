import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router";
import { useGetTourQuery } from "../../services/Info";
import i18n from "../../i18n";
import { Box, CircularProgress } from "@mui/material";
import { FaRegMap } from "react-icons/fa6";
import { MdOutlineAccessTime } from "react-icons/md";
import { HiTranslate } from "react-icons/hi";
import { VscTypeHierarchySub } from "react-icons/vsc";


const TourFirst = () => {
  const {data, error, isLoading} = useGetTourQuery()
  const { t } = useTranslation();
  const params = useParams()
  const navigate = useNavigate()

  if (isLoading)  return (
      <Box className="flex justify-center items-center h-screen w-full">
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
    
  if (error) return <div>Error loading data</div>


  const product = data?.find((p) => p.id === Number(params.id));

  const decodeHtml = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
};

  // Определяем текущий язык (en, rus, tkm)
  const lang = i18n.language
  
  // Функция для очистки html-тегов из текста
  const stripHTML = (text) => text?.replace(/<[^>]*>/g, '') || '';
  
  // Формируем ключи для текущего языка
  const title = stripHTML(product[`title_${lang === 'rus' ? 'ru' : lang === 'tkm' ? 'tk' : 'en'}`]);
  const duration = stripHTML(product[`duration_${lang === 'rus' ? 'ru' : lang === 'tkm' ? 'tk' : 'en'}`]);
  const destination = stripHTML(product[`destination_${lang === 'rus' ? 'ru' : lang === 'tkm' ? 'tk' : 'en'}`]);
  const language = stripHTML(product[`lang_${lang === 'rus' ? 'ru' : lang === 'tkm' ? 'tk' : 'en'}`]);
  const type = product[`type_${lang === 'rus' ? 'ru' : lang === 'tkm' ? 'tk' : 'en'}`];
  const text = stripHTML(product[`text_${lang === 'rus' ? 'ru' : lang === 'tkm' ? 'tk' : 'en'}`]);
  
  const imageUrl = `https://api.sayodatravel.com/${product.image.replace(/\\/g, '/')}`;
  
  const handleClick = () => {
  const decodedTitle = decodeHtml(
    product[`title_${lang === 'rus' ? 'ru' : lang === 'tkm' ? 'tk' : 'en'}`]
  );
  navigate(
    `/book?tourId=${product.id}&tourTitle=${encodeURIComponent(decodedTitle)}`
  );
};


  return (
    <section
      className="flex flex-col lg:flex-row px-4 sm:px-8 lg:px-10 py-10 
             bg-none lg:bg-[url('/cloud.png')] md:bg-no-repeat md:bg-contain md:bg-right"
    >
      {/* Левая колонка */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col lg:w-2/3 items-center lg:items-start text-center lg:text-left"
      >
        <motion.img
          src={imageUrl}
          alt="Tour"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-7/8 2xl:h-150 rounded-2xl object-cover shadow-lg"
        />

        <div className="lg:hidden mt-4 space-y-2">
          <motion.h2
            className="text-[#336B7B] text-2xl font-bold"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {title}
          </motion.h2>
          <motion.div
            className="flex flex-col items-center justify-center p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-5xl font-semibold">${product.price}</p>
            <p>{t("sevenDaysTour.price")}</p>
          </motion.div>
          <motion.a
            href="/book"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <button className="bg-[#A40000] text-white py-3 px-10 rounded-xl hover:bg-[#525960] transition duration-200">
              {t("sevenDaysTour.button")}
            </button>
          </motion.a>
        </div>

        <motion.p
          className="mt-6 leading-relaxed max-w-[90%] text-lg text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {text}
        </motion.p>
      </motion.div>

      {/* Правая колонка */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col gap-4 lg:w-1/3 mt-15"
      >
        <div className="hidden lg:block space-y-2">
          <h2 className="text-[#336B7B] text-3xl font-semibold">
          {title}
          </h2>
          <div className="flex items-end p-11 gap-5">
            <p className="text-7xl font-semibold leading-none">${product.price}</p>
            <p className="text-2xl">{t("sevenDaysTour.price")}</p>
          </div>
        </div>

       <motion.div
  className="bg-[#FFFCFC] w-full py-5 px-4 rounded-xl shadow-md"
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.5 }}
>
  <div className="flex flex-col gap-4 mb-4">
    <div className="flex items-start gap-3">
      <FaRegMap className="text-gray-700 w-15 " />
       <p className="xl:text-xl">
          {t("tourNapraw.destination")}:<span className="italic"> {destination}</span>
        </p>
    </div>

    <div className="flex items-start gap-3">
      <MdOutlineAccessTime size={20}/>
       <p className="xl:text-xl">
          {t("tourNapraw.duration")}:<span className="italic">{duration}</span>
        </p>
    </div>

    <div className="flex items-start gap-3">
      <HiTranslate size={20}/>
        <p className="xl:text-xl">
          {t("tourNapraw.language")}: <span className="italic">{language}</span>
        </p>
    </div>

    <div className="flex items-start gap-3">
      <VscTypeHierarchySub size={20} />
         <p className="xl:text-xl">
          {t("tourNapraw.type")}: <span className="italic">{type}</span>
        </p>
    </div>
  </div>
</motion.div>


        <motion.button
          className="bg-[#A40000] text-white hidden lg:block text-center xl:text-2xl font-semibold py-4 px-8 rounded-xl hover:bg-[#525960] transition duration-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
           onClick={handleClick}
        >
          {t("sevenDaysTour.button")}
        </motion.button>
      </motion.div>
    </section>
  );
};

export default TourFirst;
