import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { useParams } from "react-router";
import i18n from "../../i18n";
import { Box, CircularProgress } from "@mui/material";
import { useGetHotelsQuery, useGetVideoQuery } from "../../services/BnTour";

const InformationMain = () => {
  const [isActive, setIsActive] = useState(true);
  const { data, error, isLoading } = useGetVideoQuery()
  const { data:hotel, error:err, isLoading:load } = useGetHotelsQuery();
  const [active, setActive] = useState(false);
   
    const { t } = useTranslation();
    const [openIndex, setOpenIndex] = useState(null);
    const params = useParams();
  
    if (isLoading)  return (
          <Box className="flex justify-center items-center h-screen w-full">
            <CircularProgress size={60} thickness={4} />
          </Box>
        );
    if (error) return <div>Error loading data</div>;
    console.log(hotel);
    
  
    const lang = i18n.language;
  
    const stripHTML = (text) => text?.replace(/<[^>]*>/g, "") || "";
  
   
  
    const toggle = (index) => {
      setOpenIndex(index === openIndex ? null : index);
    };

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
    className="border-[#848484] border rounded p-3 space-y-4 flex flex-col items-center justify-center"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {data.map((item, index) => {
      const title = stripHTML(
        item[`title_${lang === "rus" ? "ru" : lang === "tkm" ? "tk" : "en"}`]
      );
      const text = stripHTML(
        item[`text_${lang === "rus" ? "ru" : lang === "tkm" ? "tk" : "en"}`]
      );

      return (
        <div key={index} className="rounded-md mb-4 w-full">
          <button
            className="w-full flex relative items-center justify-between text-left px-4 py-3 font-semibold"
            onClick={() => toggle(index)}
          >
            <div className="flex flex-col gap-2">
              <span className="text-xl sm:text-base md:text-2xl">{title}</span>
              <div
                className={`sm:w-150 ${openIndex === index ? "bg-[#4B666C]" : ""} h-px`}
              ></div>
            </div>
            {openIndex === index ? (
              <ChevronUpIcon className="w-5 h-10 hidden sm:block text-gray-700 transition duration-500" />
            ) : (
              <ChevronDownIcon className="w-5 h-5 hidden sm:block text-gray-700" />
            )}
          </button>

          <div
            className={`transition-all duration-700 ease-in-out px-4 text-sm sm:text-base lg:text-lg text-gray-800 overflow-hidden ${
              openIndex === index ? "max-h-[500px]" : "max-h-0"
            }`}
          >
            {text}
          </div>
        </div>
      );
    })}
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

          {hotel.map((data, index) => {
        const title = stripHTML(
        data[`title_${lang === "rus" ? "ru" : lang === "tkm" ? "tk" : "en"}`]
      );
      const text = stripHTML(
        data[`text_${lang === "rus" ? "ru" : lang === "tkm" ? "tk" : "en"}`]
      );
      const location = stripHTML(
        data[`location_${lang === "rus" ? "ru" : lang === "tkm" ? "tk" : "en"}`]
      );
      return(
            <motion.div
              key={index}
              className="flex flex-row border max-w-4xl mx-auto overflow-hidden  rounded-2xl lg:rounded bg-white"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }} 
            >
              <a href={`/perInfo/${data.id}`}>
              <img
               src={data.image.replace(/\\/g, '/')}
                alt={data.title}
                className=" h-75 object-cover rounded"
              />
              </a>
              
              <div className="p-4 space-y-5">
                <div>
                  <p className="text-2xl text-[#A40000] font-bold">{title}</p>
                  <p>{location}</p>
                </div>
                <div>
                  <p className="lg:text-2xl">{text}</p>
                </div>
                <a href={`/perInfo/${data.id}`}>
                <div className="text-xl flex items-end gap-2 text-[#A40000] justify-end">
                  <p className="lg:text-xl ">{t('view')}</p>
                  <img src="/r.svg" alt="img" />
                </div></a>
              </div>
            </motion.div>
           )
           })}
        </motion.div>
      )}
    </div>
  );
};

export default InformationMain;
