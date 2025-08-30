import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const TourFire = () => {
  const { t } = useTranslation();

  return (
    <div
      className="bg-no-repeat relative w-full bg-cover lg:h-auto text-white"
      style={{ backgroundImage: "url('/bgMoun.svg')" }}
    >
      <motion.div
        className="flex flex-col text-center lg:text-start py-30 px-10 lg:py-70 lg:px-25 gap-4 lg:gap-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <h1 className="text-xl lg:text-5xl max-w-5xl">{t("tourFireTitle")}</h1>
        <p>{t("tourFireDate")}</p>
      </motion.div>
    </div>
  );
};

export default TourFire;
