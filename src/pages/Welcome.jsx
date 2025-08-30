import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";

const Welcome = () => {
  const {t} = useTranslation()

  // Вариант с общим контейнером для анимации дочерних элементов
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3, // задержка между анимациями детей
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div
      className="w-full flex flex-col lg:flex-row items-start justify-center px-6 py-7 lg:py-12 bg-no-repeat bg-right bg-contain"
      style={{
        backgroundImage: "url(/cloud.png)",
      }}
    >
      {/* Текст и изображение в одном контейнере */}
      <div className='flex flex-col lg:flex-row items-start justify-center sm:mx-auto lg:my-20 gap-15'>
        <motion.div
          className="w-full flex flex-col justify-start space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p
            className="text-lg text-gray-700"
            variants={itemVariants}
          >
         {t("welcome1.subtitle")}
          </motion.p>

          <motion.h1
            className="text-2xl lg:text-6xl font-semibold text-gray-900"
            variants={itemVariants}
          >
            {t("welcome1.title")}
          </motion.h1>

          <motion.p
            className="text-lg max-w-xl text-gray-600"
            variants={itemVariants}
          >
            {t("welcome1.description")}
          </motion.p>

          <motion.button
            className="bg-[#A40000] w-3/4 mx-auto lg:mx-0 lg:max-w-sm text-white font-semibold py-2 lg:text-2xl lg:my-10 rounded-xl hover:bg-red-900 transition"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
          <a href="/about">
           {t("welcome1.button")}
          </a>
          </motion.button>
        </motion.div>

        <motion.div
          className="w-full lg:w-1/2 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <img
            src="/hii.png"
            alt="img"
            className="max-w-xs lg:max-w-lg object-contain"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Welcome;
