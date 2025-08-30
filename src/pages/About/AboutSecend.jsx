import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const AboutSecend = () => {
  const { t } = useTranslation();

  const services = t("services.cards", { returnObjects: true });

  return (
    <motion.div
      className="text-center px-6 py-20 xl:px-16 space-y-10 lg:bg-[url('/redBigMap.png')] lg:space-y-20 bg-no-repeat bg-center bg-cover bg-none"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {/* Заголовок */}
      <motion.h1
        className="text-4xl lg:text-6xl font-bold"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {t("services.title")}
      </motion.h1>

      {/* Описание */}
      <motion.p
        className="max-w-3xl lg:text-lg text-base text-gray-700 mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {t("services.description")}
      </motion.p>

      {/* Карточки */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {services.map(({ icon, title, text }, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center px-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <img src={icon} alt={title} className="w-20 h-20 mb-4" />
            <p className="font-bold text-2xl mb-2">{title}</p>
            <p className="max-w-xs text-lg text-gray-600">{text}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AboutSecend;
