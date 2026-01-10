import { Outlet } from 'react-router-dom'

import Footer from '../Footer'
import Header from '../Header'
import './index.scss'

const Layout = () => {
  return (
    <div className="App">
      <Header />
      <div className="page">
        <span className="tags top-tags">&lt;body&gt;</span>

        <Outlet />
        <Footer />
        <span className="tags bottom-tags">
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
          &lt;/body&gt;
          <br />
          <span className="bottom-tag-html">&lt;/html&gt;</span>
        </span>
      </div>
    </div>
  )
}

export default Layout
