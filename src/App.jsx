import { Route, Routes } from 'react-router'
import NavBar from './components/NavBar'
import Main from './pages/Main'
import Footer from './components/Footer'
import Tour from './pages/Tour/Tour'
import About from './pages/About/About'
import Blog from './pages/Blog/Blog'
import Contact from './pages/Contact/Contact'
import InformationMain from './pages/Information/InformationMain'
import ScrollTop from './ScrollTop'
import Book from './pages/Book'
import Blog2 from './pages/Blog/Blog2'
import TourMain from './pages/TourMain/TourMain'
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
        <Route path='/blogFire/:id' element={<Blog/>}/>
        <Route path='/tourMain/:id' element={<Tour/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/info' element={<InformationMain/>}/>
        <Route path='/perInfo' element={<PerInormation/>}/>
        <Route path='/book' element={<Book/>}/>
        <Route path='/blog' element={<Blog2/>}/>
        <Route path='/tour' element={<TourMain/>}/>
      </Routes>
    </div>
      <Footer/>
    </>
  )
}

export default App