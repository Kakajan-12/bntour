import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const TourImg = () => {
  const { t } = useTranslation();
  
  return (
    <div
      className="bg-no-repeat relative w-full bg-cover bg-center lg:h-auto text-white"
      style={{ backgroundImage: "url('/desertBg.png')" }}
    >
      <motion.div
        className="flex flex-col text-center lg:text-start py-30 px-10 lg:py-70 lg:px-25 gap-4 lg:gap-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h1 className="text-xl lg:text-6xl lg:max-w-4xl font-semibold">
          {t('tourTitle')}
        </h1>
        <p className="lg:text-lg lg:max-w-xl">
          {t('tourDescription')}
        </p>
      </motion.div>

      <motion.div
        className="absolute bottom-[-80px] hidden lg:block left-1/2 w-4/6 transform -translate-x-1/2 bg-white text-black py-6 lg:py-10 border-b"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <h2 className="font-bold text-2xl lg:text-4xl max-w-xl text-center mx-auto mb-4">
          {t('blogTitle')}
        </h2>
        <p className="text-center px-5">
          {t('blogDescription')}
        </p>
      </motion.div>
    </div>
  );
};

export default TourImg;
