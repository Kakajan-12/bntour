import Home from './Home'
import MainFifth from './TourBlog'
import MainFourth from './Why'
import MainThird from './Gallery'
import Welcome from './Welcome'

const Main = () => {
  return (
    <div>
      <Home/>
      <Welcome/>
      <MainThird/>
      <MainFourth/>
      <MainFifth/>
    </div>
  )
}

export default Main