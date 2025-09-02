import { useTranslation } from "react-i18next";
import { useGetTourGalleryQuery } from "../../services/Info";
import { useParams } from "react-router";
import { Box, CircularProgress } from "@mui/material";

const TourFourth = () => {
  const { data, error, isLoading } = useGetTourGalleryQuery();
  const params = useParams();
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <Box className="flex justify-center items-center h-screen w-full">
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (error) return <div>Error loading data</div>;

  // Фильтруем только картинки текущего тура
  const images = data?.filter((item) => item.tour_id === Number(params.id)) || [];

  // Если картинок нет — показываем сообщение
  if (!images.length) {
    return (
      <div className="flex justify-center items-center h-40 text-gray-500">
        {t("No images available")}
      </div>
    );
  }

  return (
    <div className="flex flex-col p-6 md:p-10 md:py-20 gap-4 sm:gap-6">
      <h3 className="text-[#A40000] text-3xl md:text-5xl font-semibold">
        Gallery
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
        {images.map((item, index) => (
          <img
            key={index}
            src={`${import.meta.env.VITE_API_URL}${item.image}`}
            alt={`gallery-${index}`}
            className="rounded-lg w-1/2 lg:w-full h-auto object-cover"
          />
        ))}
      </div>
    </div>
  );
};

export default TourFourth;
