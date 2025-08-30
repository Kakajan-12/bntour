import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const AboutThird = () => {
  const { t } = useTranslation();

  return (
    <div
      className="relative bg-cover bg-center text-white text-center min-h-[400px] lg:min-h-[600px] flex items-center justify-center px-6 lg:px-40 py-20"
      style={{ backgroundImage: "url('/surf.png')" }}
    >
      <div className="absolute inset-0 bg-black/10 z-0" />

      <motion.div
        className="relative z-10 space-y-6 max-w-4xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
          {t('aboutThird1.title')}
        </h1>
        <p className="text-sm md:text-base lg:text-lg text-gray-200">
          {t('aboutThird1.description')}
        </p>
      </motion.div>
    </div>
  );
};

export default AboutThird;
