import { useTranslation } from "react-i18next";

const ProductItem = ({ item, props }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;


  const stripHTML = (text) => text?.replace(/<[^>]*>/g, '') || '';

  const title = stripHTML(
    item[`title_${lang === 'rus' ? 'ru' : lang === 'tkm' ? 'tk' : 'en'}`]
  );
  const text = stripHTML(
    item[`text_${lang === 'rus' ? 'ru' : lang === 'tkm' ? 'tk' : 'en'}`]
  );

  const imageUrl = `https://api.sayodatravel.com/${item.image.replace(/\\/g, '/')}`;

  return (
    <div className="rounded-2xl hover:scale-105 transition duration-450  overflow-hidden flex flex-col h-full">
      {/* Изображение */}
      <a href={`/${props}/${item.id}`}>
        <img
          src={imageUrl}
          alt="img"
          className="w-full h-48 object-cover"
        />
      </a>

      {/* Контент */}
      <div className="flex-1 flex flex-col p-4 space-y-4">
        <h1 className="text-lg md:text-xl xl:text-2xl font-bold">{title}</h1>
        <p className="text-gray-700 line-clamp-7">{text}</p>
       <p className="font-semibold">{new Date(item.date).toLocaleDateString()}</p>
      </div>

      {/* Кнопка */}
      <div className="p-4 mt-auto flex justify-center">
        <a href={`/${props}/${item.id}`}>
          <button className="bg-red-800 text-white text-sm font-semibold px-6 cursor-pointer py-2 rounded-lg">
            {t("blog1.more")}
          </button>
        </a>
      </div>
    </div>
  );
};

export default ProductItem;
