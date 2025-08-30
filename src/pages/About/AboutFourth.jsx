import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const AboutFourth = () => {
  const { t } = useTranslation();

  const features = t('features', { returnObjects: true });

  return (
    <div className="flex flex-col lg:flex-row gap-10 px-16 pt-25 overflow-hidden">
      {/* Левая часть */}
      <motion.div
        className="lg:w-1/2 space-y-5 lg:space-y-10"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
         style={{ backgroundImage: "url('/cap.svg')" }}
      >
        <h1 className="text-2xl lg:text-5xl max-w-sm font-bold">{t('whyChooseUsTitle')}</h1>
        <p className="text-lg max-w-md text-gray-700">{t('whyChooseUsDescription')}</p>
      </motion.div>

      {/* Правая часть */}
      <div className="lg:w-1/2 space-y-20">
        {features.map((item, index) => (
          <motion.div
            key={index}
            className="flex items-start text-[#333333] gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.3 }}
            viewport={{ once: true }}
          >
            <img src={item.image} alt={item.title} className="w-17" />
            <div className="flex flex-col">
              <p className="font-semibold text-2xl">{item.title}</p>
              <p className="max-w-sm">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AboutFourth;
