import { useTranslation } from "react-i18next";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import Download from "yet-another-react-lightbox/plugins/download";
import Share from "yet-another-react-lightbox/plugins/share";
import "yet-another-react-lightbox/styles.css";
import { useRef, useState } from "react";
import { useParams } from "react-router";
import { useGetBlogGalleryQuery } from "../../services/Info";
import i18n from "../../i18n";
import { CircularProgress, Box } from "@mui/material";

const BlogDeep = () => {

  const {data,error,isLoading} = useGetBlogGalleryQuery()
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const captionsRef = useRef(null);
   const params = useParams()
   const zoomRef = useRef(null);
    
     if (isLoading) {
    return (
      <Box className="flex justify-center items-center h-screen w-full">
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }
    if (error) return <div>Error loading data</div>
  
 // Собираем все картинки для текущего блога
const images = data?.filter((item) => item.blog_id === Number(params.id)) || [];

// Берём первый элемент, чтобы получить заголовок
const first = images[0];

// Определяем язык
const lang = i18n.language;

// Функция очистки HTML
const stripHTML = (text) => text?.replace(/<[^>]*>/g, '') || '';

// Заголовок
const title = first
  ? stripHTML(first[`blog_title_${lang === 'rus' ? 'ru' : lang === 'tkm' ? 'tk' : 'en'}`])
  : '';

 

  return (
    <div className="px-6 sm:px-10 lg:px-50 py-10 space-y-12 w-full">
      {/* Первый блок с текстом и картинкой */}
        <div className="space-y-4">
          <p className="md:text-2xl leading-relaxed">{title}</p>
        </div>
      

      {/* Блок про Дарвазу */}
      <div className="space-y-4">
        <h1 className="text-2xl max-w-2xl sm:text-3xl font-semibold text-[#2C6C6F]">
          {t('darvaza.heading')}
        </h1>
        <p className="text-base sm:text-2xl leading-relaxed">{t('darvaza.description')}</p>
      </div>

      {/* Блок про Ашхабад */}
      <div className="space-y-4">
        <h2 className="text-xl sm:text-3xl font-semibold text-[#2C6C6F]">
          {t('ashgabat.heading')}
        </h2>
        <p className="text-base sm:text-2xl leading-relaxed">{t('ashgabat.description')}</p>
      </div>


      {/* Блок про Шёлковый путь */}
      <div className="space-y-4">
        <h3 className="text-2xl sm:text-4xl max-w-xl font-semibold text-[#2C6C6F]">
          {t('silk_road.heading')}
        </h3>
        <p className="text-base sm:text-2xl leading-relaxed">{t('silk_road.description')}</p>
        <ul className="sm:text-2xl list-disc space-y-5 pl-6">
          <li>{t('silk_road.sites.merv')}</li>
          <li>{t('silk_road.sites.nisa')}</li>
          <li>{t('silk_road.sites.konye_urgench')}</li>
        </ul>
        <p className="sm:text-2xl">{t('silk_road.closing')}</p>
      </div>
      {/* Сетка изображений */}
<div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 place-items-center gap-5">
  {images.map((img, index) => {
    const imgUrl = `https://api.sayodatravel.com/${img.image.replace(/\\/g, '/')}`;
    return (
      <img
        key={img.id}
        onClick={() => setOpen(index)} // Открываем слайд по индексу
        src={imgUrl}
        alt={`Gallery ${index + 1}`}
        className="w-full sm:h-100 rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
      />
    );
  })}
</div>

{/* Lightbox */}
<Lightbox
  open={open !== false}
  close={() => setOpen(false)}
  index={open === false ? 0 : open}
  plugins={[Zoom, Captions, Download, Share]}
  zoom={{ ref: zoomRef }}
  captions={{ ref: captionsRef }}
  slides={images.map((img) => ({
    src: `https://api.sayodatravel.com/${img.image.replace(/\\/g, '/')}`,
    title: title,
  }))}
/>

    </div>
  );
};

export default BlogDeep;
