import './Header.css'
import {Link} from 'react-router-dom';

function Header() {

  return (
    <>
      <section id="header" >
        <ul>
          <div>
            <h1>Thomas Price</h1>
          </div>
        </ul>
        <div id = "links">
          <ul>
            <Link to="/">
              <img className="button" alt="" />
              Home
            </Link>
          </ul>
        </div>
      </section>
      <div className="ticks"></div>

    </>
  )
}

export default Header