import Pagination from '@mui/material/Pagination';
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiArrowDownDoubleFill } from "react-icons/ri";
import HorseItem from '../../components/HorseItem';
import { useGetTourLocationQuery, useGetTourQuery, useGetTourTypesQuery } from '../../services/Info';
import Fuse from "fuse.js";
import i18n from '../../i18n';
import MyLoader from '../../components/Loader/MyLoader';


const BlogThird = () => {
    const { data: tourData = [], error: errorTour, isLoading:loadingTour } = useGetTourQuery()
    const { data: contactAddress, isLoading: loadingAddress, error: errorAddress } = useGetTourLocationQuery();
    const { data: tourType, isLoading: loadingType, error: errorType } = useGetTourTypesQuery();

    const {t} = useTranslation()
    
    const lang = i18n.language

    const [selectedLocation, setSelectedLocation] = useState(null);
    const [data, setData] = useState([]);
    const ListRef = useRef(null)
  const [currentPage, setCurrentPage] = useState(1);
   const [maxPrice, setMaxPrice] = useState(0);
   const [minPrice, setMinPrice] = useState(0);
   const [minInput, setMinInput] = useState(0);
const [maxInput, setMaxInput] = useState(0);
  //------------filter
  const [filter,setFilter] = useState(false)
  const [selectedType, setSelectedType] = useState(null);
const [duration, setDuration] = useState([]);

useEffect(() => {
  if (tourData.length > 0) {
    const prices = tourData.map((tour) => tour.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);

    setMinPrice(min);
    setMaxPrice(max);
    setMinInput(min);
    setMaxInput(max);

    setData(tourData); // по умолчанию показываем всё
  }
}, [tourData]);

useEffect(() => {
  if (tourData.length > 0) {
    const filtered = tourData.filter(
      (tour) => tour.price >= minInput && tour.price <= maxInput
    );
    setData(filtered);
    setCurrentPage(1); // сброс пагинации
  }
}, [minInput, maxInput, tourData]);



if (errorTour) return <p>Ошибка загрузки данных</p>;
if (loadingTour) return <MyLoader />;


const handleLocationChange = (typeId) => {
  setSelectedType(typeId);

  if (!typeId) {
    setData(tourData);
    return;
  }

  const selectedTypeObj = contactAddress.find(t => t.id === typeId);
  if (!selectedTypeObj) return;

  const langKey = lang === "rus" ? "location_ru" : lang === "tkm" ? "location_tk" : "location_en";

  const filtered = tourData.filter(tour => tour[langKey] === selectedTypeObj[langKey]);
  setData(filtered);
  setCurrentPage(1);
};

const handleTypeChange = (typeId) => {
  setSelectedType(typeId);

  if (!typeId) {
    setData(tourData);
    return;
  }

  const selectedTypeObj = tourType.find(t => t.id === typeId);
  if (!selectedTypeObj) return;

  const langKey = lang === "rus" ? "type_ru" : lang === "tkm" ? "type_tk" : "type_en";

  const filtered = tourData.filter(tour => tour[langKey] === selectedTypeObj[langKey]);
  setData(filtered);
  setCurrentPage(1);
};


const resetFilter = () => {
  setSelectedType(null);
  setDuration([]);
  setMinPrice('');
  setMaxPrice('');
  setData(tourData);
  setSelectedLocation(null)
};

  

const handleSearch = (e) => {
  const query = e.target.value.trim();
  const stripHTML = (text) => text?.replace(/<[^>]*>/g, '') || '';

  // Определяем ключ по текущему языку
  const langKey =
    lang === 'rus' ? 'ru' :
    lang === 'tkm' ? 'tk' : 'en';

  // Подготавливаем данные для поиска
  const titles = tourData.map(item => ({
    ...item,
    searchTitle: stripHTML(item[`title_${langKey}`])
  }));

  // Настройка Fuse
  const fuse = new Fuse(titles, {
    keys: ['searchTitle'],
    threshold: 0.4, // чувствительность поиска
  });

  // Поиск
  const result = query
    ? fuse.search(query).map(res => res.item)
    : tourData;

  setData(result);
  setCurrentPage(1);
};


  const handleSort = (e) => {
    const value =  e.target.value
    let sortedData

   if(value === "low"){
    sortedData = [...tourData].sort((a,b) =>  a.price - b.price)
   }else if(value === "high"){
    sortedData = [...tourData].sort((a,b) => b.price - a.price)
   }else{
    sortedData = [...tourData]
   }
   setData(sortedData)
  }

  
//pagination logic
  const pageSize = 6;

  const totalItem =  Math.ceil(data.length / pageSize);

  const currentItem = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const pageChange = (event, value) => {
    setCurrentPage(value);
    ListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
   <div
   ref={ListRef}
    className="p-4 md:p-8 lg:my-30">
      <div className="relative w-full mb-10">
    <img 
    src="/search.png" alt="img" 
    onClick={() => setVisible(prev => !prev)}
     className="absolute left-5 top-5 transform -translate-y-1/2 w-5 h-5 opacity-60"/>
    <input
    type="text"
    placeholder={t("searchPlaceholder")}
    onChange={handleSearch}
    className="w-full px-15 py-2 rounded-lg bg-[#F3F3F3] text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
     />
  </div>
  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
   <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
  <div className="flex items-center gap-5">
    <p className="text-xl md:text-2xl">{t('sortBy')}</p>
    <div className="relative w-64 ">
      <select
        onChange={handleSort}
        className="block lg:w-full pl-5 pr-10 py-2 border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
      >
        <option value="">{t("popularity")}</option>
        <option value="low">{t("veryLow")}</option>
        <option value="high">{t("veryHigh")}</option>
      </select>

       <div className="absolute  lg:right-2 top-1/2  pointer-events-none z-10 -translate-y-1/2">
        <RiArrowDownDoubleFill />
      </div>
    </div>
  </div>
</div>


<div className="relative -left-40 sm:-left-0">
  {/* Кнопка открытия фильтра */}
  <img
    src="/filter.svg"
    alt="filter"
    className="sm:ml-80 cursor-pointer"
    onClick={() => setFilter(prev => !prev)}
  />

  {/* Панель фильтра — открывается СНИЗУ */}
  <div
    className={`absolute z-20 mt-2 w-[350px] bg-white shadow-5xl border rounded-lg overflow-hidden transition-all duration-500 ease-in-out 
      ${filter ? 'max-h-[550px] opacity-100 px-5 py-10' : 'max-h-0 opacity-0 p-0'}`
    }
  >
    {/* Кнопка закрытия */}
    <div className="absolute right-5  top-5">
      <img
        src="/x.svg"
        alt="Close"
        className="w-5 h-5 cursor-pointer"
        onClick={() => setFilter(false)}
      />
    </div>

    <div className="flex justify-between items-center my-4">
      <p className="text-lg font-semibold">Фильтр</p>
      <p className="text-sm text-blue-600 cursor-pointer border rounded p-1 hover:bg-red-700 hover:text-white" onClick={resetFilter}>Очистить</p>
    </div>
         <select
  value={selectedLocation ?? ''}
  onChange={(e) => setSelectedLocation(e.target.value ? Number(e.target.value) : null)}
  className="border p-2 rounded-md w-56 h-12"
>
  <option value="">Все локации</option>
  {contactAddress?.map(loc => (
    <option key={loc.id} value={loc.id} onClick={() => handleLocationChange(loc.id)}>
      {lang === "rus" ? loc.location_ru : lang === "tkm" ? loc.location_tk : loc.location_en}
    </option>
  ))}
</select>


    <p className="font-semibold mb-4">Тип отдыха</p>
    <div className="flex flex-col gap-4 mb-2 rounded-full">
  {tourType?.map((typ) => (
    <button
      key={typ.id}
      onClick={() => handleTypeChange(typ.id)}
      className={`px-4 py-2 border rounded transition ${
        selectedType === typ.id ? "bg-[#1F2A36] text-white" : ""
      }`}
    >
      {lang === "rus" ? typ.type_ru : lang === "tkm" ? typ.type_tk : typ.type_en}
    </button>
  ))}
</div>

   <p className="font-semibold">Цена</p>
<div className="flex gap-2 mb-4">
  <input
    type="number"
    value={minInput}
    min={minPrice}
    max={maxInput}
    onChange={(e) => setMinInput(Number(e.target.value))}
    placeholder="min"
    className="border p-2 w-1/2 rounded"
  />
  <input
    type="number"
    value={maxInput}
    min={minInput}
    max={maxPrice}
    onChange={(e) => setMaxInput(Number(e.target.value))}
    placeholder="max"
    className="border p-2 w-1/2 rounded"
  />
</div>

{/* Ползунок для максимальной цены */}
<input
  type="range"
  min={minPrice}
  max={maxPrice}
  value={maxInput}
  onChange={(e) => setMaxInput(Number(e.target.value))}
  className="mb-6 range-red"
/>

 <div className="flex justify-center">
</div>
  </div>
</div>

 </div>

 
 <div className="border-b max-w-sm mx-auto block lg:hidden mb-10 pb-5 -mt-3">
  <h2 className="font-bold text-3xl text-center mx-auto mb-2">
    {t('insiderStories.title')}
  </h2>
  <p className="text-center">
    {t('insiderStories.description')}
  </p>
 </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {currentItem.map((item, index) => (
      <HorseItem key={index} item={item} />
    ))}
  </div>

  <div className="mt-8 flex justify-center">
 
  <Pagination
  count={totalItem}
  page={currentPage}
  onChange={pageChange}
  variant="outlined"
  shape="rounded"
  size='large'
/>


  </div>
</div>

  );
};

export default BlogThird;
