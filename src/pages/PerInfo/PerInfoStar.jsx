import Rating from '@mui/material/Rating'
import React from 'react'

const PerInfoThird = () => {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-10 space-y-12">
      {/* Верхняя часть */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
        {/* Название и рейтинг */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-[#A40000]">Спорт Отель</h1>
          <Rating
            name="half-rating-read"
            defaultValue={2.5}
            precision={0.5}
            readOnly
          />
        </div>

        {/* Услуги (2 колонки) */}
        <div className="grid grid-cols-2 gap-x-12 gap-y-4">
          {[
            'Спа',
            'Бассейн',
            'Фитнес',
            'Ресторан',
            'Wi-Fi',
            'Парковка',
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <img src="/sun1.png" alt={item} className="w-6 h-6" />
              <p className="text-base text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Блок описания */}
     <div className='flex items-center justify-between gap-20'>
         <div className="space-y-6">
        <h2 className="text-xl font-semibold text-[#A40000]">Описание объекта</h2>
        <p className="text-gray-800 leading-relaxed">
          Это современный 10‑этажный отель, расположенный в Олимпийском комплексе Ашхабада, у Южной части города, примерно в 2 км от Парка Независимости и в шаговой доступности от крупного торгового центра Berkarar Mall.
        </p>
       
      </div>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-[#A40000]">Описание объекта</h2>
        <p className="text-gray-800 leading-relaxed">
          Это современный 10‑этажный отель, расположенный в Олимпийском комплексе Ашхабада, у Южной части города, примерно в 2 км от Парка Независимости и в шаговой доступности от крупного торгового центра Berkarar Mall.
        </p>
       
      </div>
     </div>
    </div>
  )
}

export default PerInfoThird
