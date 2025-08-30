import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const InformationMain = () => {
  const [isActive, setIsActive] = useState(true);
  const [active, setActive] = useState(false);
  const {t} = useTranslation()

  const data = [
    {
      title: "Спорт Отель",
      location: "Ашхабад",
      info: "Комфорт и активность в центре Ашхабада",
      desc: "Современный отель в центре Ашхабада для активного и комфортного отдыха.",
      view:'Просмотреть'
    },
    {
      title: "Спорт Отель",
      location: "Ашхабад",
      info: "Комфорт и активность в центре Ашхабада",
      desc: "Современный отель в центре Ашхабада для активного и комфортного отдыха.",
      view:'Просмотреть'
    },
    {
      title: "Спорт Отель",
      location: "Ашхабад",
      info: "Комфорт и активность в центре Ашхабада",
      desc: "Современный отель в центре Ашхабада для активного и комфортного отдыха.",
      view:'Просмотреть'
    },
  ];

  return (
    <div>
      <div className="p-6 space-y-6 max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-center">{t("prepareTitle")}</h1>
        <p className="text-center text-gray-700 max-w-2xl mx-auto">
          {t("prepareDesc")}
        </p>


        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              setIsActive(true);
              setActive(false);
            }}
            className={`px-4 py-4 container rounded-2xl border border-[#A40000] transition font-medium ${
              isActive ? "bg-[#A40000] text-white" : "bg-white text-[#A40000] hover:bg-[#ffe5e5]"
            }`}
          >
                {t("visaBtn")}
          </button>

          <button
            onClick={() => {
              setIsActive(false);
              setActive(true);
            }}
            className={`px-4 py-4 container rounded-2xl border border-[#A40000] transition font-medium ${
              active ? "bg-[#A40000] text-white" : "bg-white text-[#A40000] hover:bg-[#ffe5e5]"
            }`}
          >
             {t("hotelsBtn")}
          </button>
        </div>

        {isActive && (
          <motion.div
            className="border-[#848484] border rounded p-10 space-y-4 flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl xl:text-3xl text-center font-semibold">
              {t('visaGuide')}
            </h2>
            <p className="text-gray-700 xl:text-lg text-start lg:max-w-4xl">
              {t('description')}
            </p>
          </motion.div>
        )}
      </div>

      {active && (
        <motion.div
          className="space-y-6 lg:border rounded-2xl  px-2 lg:p-6 w-full max-w-7xl mx-auto bg-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl lg:text-4xl font-bold text-center">
              {t("trustedHotels.heading")}
          </h2>

          {data.map((data, index) => (
            <motion.div
              key={index}
              className="flex flex-row border max-w-4xl mx-auto overflow-hidden  rounded-2xl lg:rounded bg-white"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }} 
            >
              <a href="perInfo" className=" ">
              <img
                src="cafe.png"
                alt={data.title}
                className=" h-75 object-cover rounded"
              />
              </a>
              
              <div className="p-4 space-y-5">
                <div>
                  <p className="text-2xl text-[#A40000] font-bold">{data.title}</p>
                  <p>{data.location}</p>
                </div>
                <div>
                  <p className="lg:text-2xl font-bold">{data.info}</p>
                  <p className="lg:text-md">{data.desc}</p>
                </div>
                <a href="/perInfo">
                <div className="text-xl flex items-end gap-2 text-[#A40000] justify-end">
                  <p className="lg:text-xl ">{data.view}</p>
                  <img src="/r.svg" alt="img" />
                </div></a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default InformationMain;
