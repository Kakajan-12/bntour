import { useState } from 'react'
import '../i18n'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router'

const NavBar = () => {

const {t,i18n} = useTranslation()

const changeLanguage = (lng) => {
i18n.changeLanguage(lng)
localStorage.setItem("lng", lng)
}

const [visible,setVisible] = useState(false)

  return (
    <div className='sticky  z-50 top-0 w-full bg-white border-b border-b-[#646464] flex items-center justify-between'>
     <div className='container flex mx-auto justify-between items-center py-2 px-6 '>
       <Link to='/'>
      <img src="/bl.png" alt="logo" className='w-14 sm:w-20 rounded-full transition-transform hover:scale-90' />
      </Link>
      <ul className='hidden lg:flex  items-center gap-6 '>
       <NavLink
       to="/"
        className={({ isActive }) =>
       `font-bold custom-text lg:text-2xl ${isActive ? 'text-[#A40000]' : 'text-black'}`}>
       {t('main')}
       </NavLink>
        <NavLink to='/tour'>
        <p className='font-bold custom-text'>{t('tour')}</p>
        </NavLink>
        <NavLink to='/about'>
        <p className='font-bold custom-text'>{t('about')}</p>
        </NavLink>
        <NavLink to="/blog">
        <p className='font-bold custom-text'>{t('blog')}</p>
        </NavLink>
        <NavLink to="/info">
        <p className='font-bold custom-text'>{t('info')}</p>
        </NavLink>
        <NavLink to='/contact'>
        <p className='font-bold custom-text'>{t('contact')}</p>
        </NavLink>
  </ul>
<div className='hidden lg:flex gap-3 items-center'>
  <img
    src="/britian.png"
    alt="English"
    className="w-7 h-7  cursor-pointer hover:scale-110 transition-transform"
    onClick={() => changeLanguage('en')}
  />
  <img
    src="/russia.png"
    alt="Русский"
    className="w-7 h-7 cursor-pointer hover:scale-110 transition-transform"
    onClick={() => changeLanguage('rus')}
  />
  <img
    src="/turk.png"
    alt="Türkmen"
    className="w-7 h-7 cursor-pointer hover:scale-110 transition-transform"
    onClick={() => changeLanguage('tkm')}
  />
</div>
     </div>


     <div className='flex items-center px-10 lg:hidden'>
      <img onClick={() => setVisible(true)} src="/menu_icon.png" alt="menu_icon" className='w-6'/>
     </div>

      {/* mobile */}
    <div className={`absolute top-0 right-0 bg-[#fdf8f3] transition-all duration-300 overflow-hidden ${visible ? 'w-full' : 'w-0'}`}>
    <div className='flex flex-col text-[#4b3f30]'>
    <div className='flex items-center gap-2 p-4 cursor-pointer border-b border-[#e0c9ae]' onClick={() => setVisible(false)}>
      <img src="/dropdown_icon.png" alt="drop" className='rotate-180 h-4'/>
      <p className='text-sm font-semibold'>Back</p>
    </div>

    <NavLink to='/' onClick={() => setVisible(false)} className='py-3 text-center border-b border-[#e0c9ae]'>
      {t('main')}
    </NavLink>
    <NavLink to='/tour' onClick={() => setVisible(false)} className='py-3 text-center border-b border-[#e0c9ae]'>
      {t('tour')}
    </NavLink>
    <NavLink to='/about' onClick={() => setVisible(false)} className='py-3 text-center border-b border-[#e0c9ae]'>
      {t('about')}
    </NavLink>
    <NavLink to='/blog' onClick={() => setVisible(false)} className='py-3 text-center border-b border-[#e0c9ae]'>
      {t('blog')}
    </NavLink>
    <NavLink to='/info' onClick={() => setVisible(false)} className='py-3 text-center border-b border-[#e0c9ae]'>
      {t('info')}
    </NavLink>
    <NavLink to='/contact' onClick={() => setVisible(false)} className='py-3 text-center border-b border-[#e0c9ae]'>
      {t('contact')}
    </NavLink>
<div className='flex items-center justify-center gap-8 py-3'>
    <img
     src="/britian.png"
    alt="English"
    className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
    onClick={() => changeLanguage('en')}
  />
  <img
    src="/russia.png"
    alt="Русский"
    className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
    onClick={() => changeLanguage('rus')}
  />
  <img
    src="/turk.png"
    alt="Türkmen"
    className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
    onClick={() => changeLanguage('tkm')}
  />
</div>
    </div>
    </div>

    </div>
  )
}

export default NavBar