import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { useGetTourIncludesQuery, useGetTourExcludesQuery } from "../../services/Info";
import i18n from "../../i18n";

const stripHTML = (text) => text?.replace(/<[^>]*>/g, "") || "";

const TourThird = () => {
  const { t } = useTranslation();
  const params = useParams();

  // Загружаем данные
  const {
    data: includesData,
    error: includesError,
    isLoading: includesLoading,
  } = useGetTourIncludesQuery();

  const {
    data: excludesData,
    error: excludesError,
    isLoading: excludesLoading,
  } = useGetTourExcludesQuery();

  // Обработка загрузки и ошибок
  if (includesLoading || excludesLoading) return <div>Loading...</div>;
  if (includesError || excludesError) return <div>Error loading data</div>;

  // Ищем записи по ID
  const includes = includesData?.filter((p) => p.tour_id === Number(params.id)) || [];
  const excludes = excludesData?.filter((p) => p.tour_id === Number(params.id)) || [];

  // Определяем язык
  const langKey = (key) =>
    `${key}_${i18n.language === "rus" ? "ru" : i18n.language === "tkm" ? "tk" : "en"}`;

  return (
    <div className="p-6 h-auto md:px-10 md:py-15 xl:py-0">
      <div className="flex items-start">
        <h2 className="text-[#336B7B] text-4xl font-semibold mb-10">
          {t("tourIncludes.whatsIncluded")}
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Включено */}
        <div className="flex-1">
          <p className="text-3xl font-semibold mb-4 text-left lg:text-center">
            {t("tourIncludes.includedTitle")}
          </p>
          <ul className="list-disc pl-6 text-gray-700 lg:mx-20 space-y-2">
            {includes.map((item, idx) => (
              <li key={idx} className="text-xl">
                {stripHTML(item[langKey("text")])}
              </li>
            ))}
          </ul>
        </div>

        {/* Не включено */}
        <div className="flex-1">
          <p className="text-3xl font-semibold mb-4 text-left lg:text-center">
            {t("tourIncludes.excludedTitle")}
          </p>
          <ul className="list-disc pl-6 text-gray-700 lg:mx-20 space-y-2">
            {excludes.map((item, idx) => (
              <li key={idx} className="text-xl">
                {stripHTML(item[langKey("text")])}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TourThird;
