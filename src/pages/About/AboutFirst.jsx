import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const AboutFirst = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col xl:flex-row items-center justify-between gap-10 p-6 xl:p-16 bg-white">
      <motion.div
        className="max-w-xl space-y-6"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight">
          {t("about1.title")}
        </h1>
        <p className="text-gray-700 text-base md:text-lg leading-relaxed">
          {t("about1.description")}
        </p>
      </motion.div>

      <div className="grid grid-cols-3 gap-2 lg:gap-0 w-full max-w-2xl">
        <img src="/f1.svg" alt="Фото 1" className="rounded-xl shadow-md" />
        <motion.div
          initial={{ y: 0, opacity: 1 }}
          whileInView={{ y: 80, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <img src="/f2.svg" alt="Фото 2" className="rounded-xl shadow-md" />
        </motion.div>
        <img src="/f3.svg" alt="Фото 3" className="rounded-xl shadow-md" />
      </div>
    </div>
  );
};

export default AboutFirst;
