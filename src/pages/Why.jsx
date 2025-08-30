import { FaRoute } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const MainFourth = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        {/* Левая часть: текст */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <div>
            <h3 className="text-3xl lg:text-5xl font-bold mb-2">
              {t("why.title")}
            </h3>
            <div className="h-[2px] flex-1 bg-[#A40000] my-2 md:my-5"></div>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              {t("why.description")}
            </p>
          </div>

          {/* Пункты с иконками */}
          <div className="flex flex-col gap-8 mt-4">
            {/* Первый пункт */}
            <div className="flex gap-4">
              <GrGroup className="h-7 w-7 mt-1 text-red-800" />
              <div>
                <h4 className="font-semibold text-lg">
                  {t("why.teamTitle")}
                </h4>
                <p className="text-gray-700 text-sm md:text-base">
                  {t("why.teamDescription")}
                </p>
              </div>
            </div>

            {/* Второй пункт */}
            <div className="flex gap-4">
              <FaRoute className="h-7 w-7 mt-1 text-red-800" />
              <div>
                <h4 className="font-semibold text-lg">
                  {t("why.routeTitle")}
                </h4>
                <p className="text-gray-700 text-sm md:text-base">
                  {t("why.routeDescription")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Правая часть: изображение */}
        <motion.div
          className="w-1/3 lg:flex justify-center lg:mx-20 lg:justify-end hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
          viewport={{ once: true }}
        >
          <img
            src="/g3.svg"
            alt={t("why.imageAlt")}
            className="w-full"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default MainFourth;
