import { useParams } from "react-router";
import { useGetHotelGalleryQuery } from "../../services/BnTour";
import { Box, CircularProgress } from "@mui/material";

const PerInfoSecend = () => {
  const { data, error, isLoading } = useGetHotelGalleryQuery();
  const params = useParams();

    if (isLoading)  return (
          <Box className="flex justify-center items-center h-screen w-full">
            <CircularProgress size={60} thickness={4} />
          </Box>
        );
  if (error) return <div>Error loading data</div>;

  // Фильтруем все фото для конкретного отеля
  const images = data?.filter((p) => p.hotel_id === Number(params.id)) || [];

  if (images.length === 0) {
    return <div className="text-center">No images found for this hotel</div>;
  }

  // Заполняем массив до 5 элементов, чтобы сетка не ломалась
  const gallery = [...images.map((img) => img.image.replace(/\\/g, '/'))];
  while (gallery.length < 5) {
    gallery.push(null);
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-20">
      <div className="grid grid-cols-8 gap-2">
        {/* Основное большое изображение */}
        <div className="col-span-4 row-span-2">
          {gallery[0] && (
            <img
              src={gallery[0]}
              alt="Main"
              className="w-full h-full object-cover animate-fade-in delay-100"
            />
          )}
        </div>

        {/* Маленькие ячейки */}
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={`col-span-2 ${
              index < 3 ? `col-start-${index + 4}` : `col-start-${index - 1}`
            } ${index >= 3 ? "row-start-2" : ""}`}
          >
            {gallery[index] && (
              <img
                src={gallery[index]}
                alt={`img-${index + 1}`}
                className="w-full h-full object-cover animate-fade-in delay-300"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerInfoSecend;
