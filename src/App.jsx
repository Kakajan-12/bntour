import { Route, Routes } from 'react-router'
import NavBar from './components/NavBar'
import Main from './pages/Main'
import Footer from './components/Footer'
import TourMain from './pages/Tour/Tour'
import About from './pages/About/About'
import BlogFire from './pages/Blog/Blog'
import Contact from './pages/Contact/Contact'
import InformationMain from './pages/Information/InformationMain'
import ScrollTop from './ScrollTop'
import Book from './pages/Book'
import Blog from './pages/Blog/MainBlog'
import Tour from './pages/TourMain/TourMain'
import PerInormation from './pages/PerInfo/PerInormation'

const App = () => {
  return (
    <>
    <NavBar/>
    <div className='container mx-auto'>
      <ScrollTop/>
        <Routes >
        <Route path='/' element={<Main/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/blogFire/:id' element={<BlogFire/>}/>
        <Route path='/tourMain/:id' element={<TourMain/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/info' element={<InformationMain/>}/>
        <Route path='/perInfo' element={<PerInormation/>}/>
        <Route path='/book' element={<Book/>}/>
        <Route path='/blog' element={<Blog/>}/>
        <Route path='/tour' element={<Tour/>}/>
      </Routes>
    </div>
      <Footer/>
    </>
  )
}

export default App