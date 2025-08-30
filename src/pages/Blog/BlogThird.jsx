import Pagination from '@mui/material/Pagination';
import { useEffect, useRef, useState } from "react";
import ProductItem from "../../components/ProductItem";
import { useTranslation } from "react-i18next";
import { RiArrowDownDoubleFill } from "react-icons/ri";
import { useGetBlogQuery } from '../../services/Info';
import i18n from '../../i18n';
import Fuse from "fuse.js";
import MyLoader from '../../components/Loader/MyLoader';

const BlogThird = () => {
   const { data: blogData = [], error, isLoading } = useGetBlogQuery()
   const {t} = useTranslation()
   
   const listRef = useRef(null);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [visible, setVisible] = useState(false)
  const [filter,setFilter] = useState(false)

  // === FIX: обновляем data только если данные реально изменились ===
  useEffect(() => {
    if (blogData.length && JSON.stringify(blogData) !== JSON.stringify(data)) {
      setData(blogData);
    }
  }, [blogData]);

if (error) return <p>Ошибка загрузки данных</p>;
if (isLoading) return <MyLoader />;


const handleSearch = (e) => {
  const query = e.target.value;
  const lang = i18n.language;
  const stripHTML = (text) => text?.replace(/<[^>]*>/g, '') || '';

  const titles = blogData.map(item => ({
    ...item,
    searchTitle: stripHTML(item[`title_${lang === 'rus' ? 'ru' : lang === 'tkm' ? 'tk' : 'en'}`])
  }));

  const fuse = new Fuse(titles, {
    keys: ['searchTitle'],
    threshold: 0.4,
  });

  const result = query ? fuse.search(query).map(res => res.item) : blogData;
  setData(result);
  setCurrentPage(1);
};



  const handleSort = (e) => {
    const value =  e.target.value
    let sortedData

   if(value === "low"){
    sortedData = [...blogData].sort((a,b) =>  new Date(a.date) - new Date(b.date))
   }else if(value === "high"){
    sortedData = [...blogData].sort((a,b) => new Date(b.date) - new Date(a.date))
   }else{
    sortedData = [...blogData]
   }
   setData(sortedData)
  }

  
//pagination logic
  const pageSize = 6;

 const totalItem = Math.ceil(data.length / pageSize);

const currentItem = data.slice(
  (currentPage - 1) * pageSize,
  currentPage * pageSize
);


 const pageChange = (event, page) => {
  setCurrentPage(page);
   listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

  return (
   <div
   ref={listRef}
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
  <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
   <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
  <div className="flex items-center gap-5">
    <p className="text-xl md:text-2xl">{t('sortBy')}</p>

    <div className="relative w-64">
      <select
        onChange={handleSort}
        className="block lg:w-full pl-5 pr-10 py-2 border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
      >
   <option value="">{t("sort.date")}</option>
  <option value="low">{t("sort.oldToNew")}</option>
  <option value="high">{t("sort.newToOld")}</option>
      </select>

       <div className="absolute lg:right-2 top-1/2 z-10 -translate-y-1/2">
        <RiArrowDownDoubleFill className=" " />
      </div>
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
      <ProductItem key={index} item={item} props='blogFire' />
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
