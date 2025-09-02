import Rating from '@mui/material/Rating';
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useGetHotelsQuery } from "../../services/BnTour";
import { FaBed, FaUtensils, FaDumbbell, FaWifi } from "react-icons/fa6";
import { MdWaves } from "react-icons/md";
import { TbMassage } from "react-icons/tb";
import { useTranslation } from 'react-i18next';
import { Box, CircularProgress } from '@mui/material';

const PerInfoThird = () => {
  const { data: hotels, error, isLoading } = useGetHotelsQuery();
  const [assets, setAssets] = useState([]);
  const params = useParams();
   const { i18n } = useTranslation()

  // Получение данных hotel-assets
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BN_URL}hotel-assets`);
        const data = await res.json();
        if (Array.isArray(data)) setAssets(data);
      } catch (err) {
        console.error("Ошибка при загрузке контактов:", err);
      }
    };

    fetchAssets();
  }, []);

    if (isLoading)  return (
          <Box className="flex justify-center items-center h-screen w-full">
            <CircularProgress size={60} thickness={4} />
          </Box>
        );
  if (error) return <div>Error loading data</div>;
  console.log(hotels);
  

  const hotel = hotels?.find((p) => p.id === Number(params.id));
  if (!hotel) return null;

  const lang = i18n.language

  const stripHTML = (text) => text?.replace(/<[^>]*>/g, "") || "";

  const langKey = lang === "rus" ? "ru" : lang === "tkm" ? "tk" : "en";

  const title = stripHTML(hotel[`title_${langKey}`]);
  const text = stripHTML(hotel[`text_${langKey}`]);

  // Иконки для hotel-assets
  const iconMap = {
    fabed: FaBed,
    fautensils: FaUtensils,
    fadumbbell: FaDumbbell,
    fawifi: FaWifi,
    mdwaves: MdWaves,
    tbmassage: TbMassage,
  };

  // Фильтруем assets только для текущего отеля
  const hotelAssets = assets.filter((a) => a.hotel_id === hotel.id);

 const renderHotelAssets = () =>
  hotelAssets.map((asset) => {
    const Icon = iconMap[asset.icon.toLowerCase()];
    const textAsset = stripHTML(
      asset[`text_${langKey}`]
    );

    return (
      <div key={asset.id} className="flex items-center gap-2">
        {Icon && <Icon style={{ width: "25px", height: "25px" }} />}
        <p className="text-base text-gray-700">{textAsset}</p>
      </div>
    );
  });


  return (
    <div className="container mx-auto max-w-7xl px-4 py-10 space-y-12">
      {/* Верхняя часть */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
        {/* Название и рейтинг */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-[#A40000]">{title}</h1>
          <Rating
            name="half-rating-read"
            defaultValue={hotel.rating}
            precision={0.5}
            readOnly
          />
        </div>

        {/* Услуги */}
        <div className="grid grid-cols-2 gap-x-12 gap-y-4">
          {renderHotelAssets()}
        </div>
      </div>

      {/* Блок описания */}
      <div className="flex items-center justify-between gap-20">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-[#A40000]">{title}</h2>
          <p className="text-gray-800 leading-relaxed">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default PerInfoThird;
