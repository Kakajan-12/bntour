import { useNavigate } from 'react-router'

const PerInfoFirst = () => {
  const navigate = useNavigate(); 

  return (
    <div className='flex items-end gap-2 px-6 py-5 bg-[#A40000] text-white cursor-pointer'>
      <img src="/back.svg" alt=""  onClick={() => navigate(-1)} />
      <p className='text-4xl font-medium cursor-pointer' onClick={() => navigate(-1)} >Спорт Отель</p>
    </div>
  )
}

export default PerInfoFirst
