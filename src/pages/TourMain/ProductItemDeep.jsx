import { useTranslation } from 'react-i18next';
import { ShopContext } from '../../context/ShopContext';
import { useContext } from 'react';

const ProductItemDeep = ({ img, name, price, day, description, explore }) => {
  const { currency } = useContext(ShopContext);
  const { t } = useTranslation();

  return (
    <div className='bg-white border border-[#DCE4E2] shadow-md rounded-2xl pb-5 '>
      <a href="/tourMain">
       <img src={img} alt="img" className="rounded-xl"/>

      </a>
      <div className='text-center px-7 sm:px-10 space-y-4'>
        <p className='whitespace-pre-line text-xl sm:text-2xl text-center font-semibold'>
          {t(name)}
        </p>
        <p className='flex items-center gap-2 font-bold'>
          <img src="/person.png" alt="dollar" className='w-5 h-5' />
          From {currency}{price}
        </p>
        <p className='flex items-center gap-2 font-bold'>
          <img src="/person.png" alt="dollar" className='w-5 h-5' />
          {t(day)}
        </p>
        <p className='flex items-center gap-2 font-bold'>
          <img src="/person.png" alt="dollar" className='w-5 h-5' />
          {t(description)}
        </p>
        <a href="/tourMain">
          <button className='w-full block sm:hidden h-12 rounded-xl bg-[#6A727E] hover:bg-gray-700 text-white font-semibold'>
            {t(explore)}
          </button>
        </a>
      </div>
    </div>
  );
};


export default ProductItemDeep
