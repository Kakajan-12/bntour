import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { LineAndDots } from "../Helper/LineAndDots";
import { useParams } from "react-router";
import { useGetTourItineraryQuery } from "../../services/Info";
import i18n from "../../i18n";

export default function TourSecend() {
  const { data, error, isLoading } = useGetTourItineraryQuery();
 
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);
  const params = useParams();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  // Ищем тур по ID из URL
  const product = data?.find((p) => p.tour_id === Number(params.id));

  if (!product) {
    return;
  }

  const lang = i18n.language;

  const stripHTML = (text) => text?.replace(/<[^>]*>/g, "") || "";

  const title = stripHTML(
    product[`title_${lang === "rus" ? "ru" : lang === "tkm" ? "tk" : "en"}`]
  );
  const text = stripHTML(
    product[`text_${lang === "rus" ? "ru" : lang === "tkm" ? "tk" : "en"}`]
  );

  const toggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="w-full lg:px-10 py-15 flex flex-col lg:flex-row overflow-hidden sm:h-[700px] bg-none xl:bg-[url('/mapp.png')] sm:bg-no-repeat sm:bg-contain sm:bg-right">
      <div className="relative z-10 w-full lg:w-190 p-10 lg:overflow-y-auto scrollbar-hide">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-800 mb-6 text-start lg:text-left">
          {t("title")}
        </h2>

        {/* Один элемент с title и text */}
        <div className="rounded-md mb-4">
          <button
            className="w-full flex relative items-center justify-between text-left px-4 py-3 font-semibold"
            onClick={() => toggle(0)}
          >
            <LineAndDots i={0} />
            <div className="flex flex-col gap-2">
              <span className="text-xl sm:text-base md:text-2xl">{title}</span>
              <div
                className={`sm:w-150 ${openIndex === 0 ? "bg-[#4B666C]" : ""} h-px`}
              ></div>
            </div>
            {openIndex === 0 ? (
              <ChevronUpIcon className="w-5 h-10 hidden sm:block text-gray-700 transition duration-500" />
            ) : (
              <ChevronDownIcon className="w-5 h-5 hidden sm:block text-gray-700" />
            )}
          </button>
          <div
            className={`transition-all duration-800 ease-in-out px-4 text-sm sm:text-base lg:text-lg text-gray-800 ${
              openIndex === 0 ? "max-h-auto " : "max-h-0 overflow-hidden"
            }`}
          >
            {text}
          </div>
        </div>
      </div>
    </div>
  );
}
