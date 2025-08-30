import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const HorseItem = ({ item }) => {
  const { currency } = useContext(ShopContext);
  const { i18n } = useTranslation();

  // Определяем текущий язык (en, rus, tkm)
  const lang = i18n.language;

  // Функция для очистки html-тегов из текста
  const stripHTML = (text) => text?.replace(/<[^>]*>/g, '') || '';

  // Формируем ключи для текущего языка
  const title = stripHTML(item[`title_${lang === 'rus' ? 'ru' : lang === 'tkm' ? 'tk' : 'en'}`]);
  const duration = stripHTML(item[`duration_${lang === 'rus' ? 'ru' : lang === 'tkm' ? 'tk' : 'en'}`]);
  const type = item[`type_${lang === 'rus' ? 'ru' : lang === 'tkm' ? 'tk' : 'en'}`];

  // Генерация правильного URL для картинки
  const imageUrl = `https://api.sayodatravel.com/${item.image.replace(/\\/g, '/')}`;

  return (
    <div className='border-b pb-20 hover:scale-105 transition duration-450'>
      <a href={`/tourMain/${item.id}`}>
        <img src={imageUrl} alt="tour" className="w-full h-60 object-cover cursor-pointer rounded-lg" />
     
      <div className='text-center px-7 sm:px-10 space-y-7 md:text-lg'>
        <p className='whitespace-pre-line text-xl sm:text-2xl font-semibold'>
          {title}
        </p>
        <div className='h-px w-full bg-[#E6E6E6]'></div>
        <p className='flex items-center gap-6 font-semibold'>
          <img src="/doll.svg" alt="price" className='w-7 h-7' />
          Oт {currency}{item.price}
        </p>
        <p className='flex items-center gap-6 font-semibold'>
          <img src="/cal.svg" alt="duration" className='w-7 h-7' />
          {duration}
        </p>
        <p className='flex items-center gap-6 max-w-sm w-3/4 text-start font-semibold'>
          <img src="/person.svg" alt="group" className='w-7 h-7' />
          {type}
        </p>
      </div>
     </a>
    </div>
  );
};

export default HorseItem;
