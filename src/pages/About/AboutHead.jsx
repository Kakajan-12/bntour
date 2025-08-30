import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const AboutHead = () => {
  const { t } = useTranslation();
  const [newData, setNewData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      const json = await res.json();
      setNewData(json);
    };
    fetchData();
  }, []);

  return (
    <div
      className="relative w-full h-80 lg:h-150 bg-cover bg-center flex items-center justify-center text-white overflow-hidden"
      style={{ backgroundImage: "url('/bgMoun.svg')" }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 text-3xl sm:text-5xl md:text-7xl font-bold italic px-6 sm:px-20 leading-tight drop-shadow-lg"
      >
      {t('aboutUs')}
      </motion.h1>
    </div>
  );
};

export default AboutHead;
