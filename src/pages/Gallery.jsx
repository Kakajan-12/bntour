import { useTranslation } from 'react-i18next';
import MainGrid from './MainGrid';
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: custom * 0.15,
    },
  }),
};

const MainThird = () => {
  const {t} = useTranslation()
  
  return (
    <div className="flex flex-col items-center px-6 py-16">
      {/* Заголовок */}
      <div className="flex items-center gap-6 w-full">
        <motion.div
          className="bg-[#A40000] h-px flex-1"
           initial={{ opacity: 0, y: -80 }}
         whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
           viewport={{ once: true, amount: 0.3 }}
        />
        <motion.h1
          className="text-4xl lg:text-6xl font-semibold text-center"
           initial={{ opacity: 0, y: -80 , x: 50 }}
         whileInView={{ opacity: 1, y: 0, x:0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
           viewport={{ once: true, amount: 0.3 }}
        >
           {t('gallery.title')}
        </motion.h1>
        <motion.div
          className="bg-[#A40000] h-px flex-1"
           initial={{ opacity: 0, y: 80 }}
         whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
           viewport={{ once: true, amount: 0.3 }}
        />
      </div>

      {/* Описание */}
      <motion.p
        className="text-center max-w-2xl mt-6 text-gray-700 text-lg"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={3}
      >
         {t('gallery.description')}
      </motion.p>

      {/* Видео */}
      <motion.video
        className="w-full max-w-5xl m-10 rounded-xl shadow-lg object-cover"
        src="/bl.mp4"
        autoPlay
        muted
        playsInline
        loop
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={4}
      />

      {/* Grid */}
      <MainGrid />
    </div>
  );
};

export default MainThird;
