import { useTranslation } from 'react-i18next';

const HorseItem2 = ({ img, name, price, description }) => {
  const { t } = useTranslation();
  return (
    <div className='bg-gray-100 border border-[#DCE4E2] shadow-md rounded-2xl pb-5 '>
      <a href="/blog">
      <img src={img} alt="img" className='rounded-xl w-full' />
      </a>
      <div className='text-center px-7 sm:px-10 space-y-4'>
        <p className='whitespace-pre-line text-xl sm:text-2xl py-4 text-center font-semibold'>
          {t(price)}
        </p>
        <p className='font-bold text-xl sm:text-2xl'>
          {t(name)}
        </p>
        <p className='font-semibold  text-gray-600'>
          {t(description)}
        </p>
        <a href="/blog2">
          <button className='w-full h-12 rounded-xl bg-[#6A727E] hover:bg-gray-700 text-white font-semibold'>
              {t("exploreBlog")}
          </button>
        </a>
      </div>
    </div>
  );
};


export default HorseItem2
