import { useNavigate } from 'react-router-dom'
import style from './header.module.scss'
import logo from './assets/site_logo.png'
import likeIcon from './assets/like.jpg'
import logoutIcon from './assets/logout.png'
import profileIcon from './assets/profile.png'
import { getToken } from '../Catalog/Catalog'

export function Header() {
  const navigate = useNavigate()
  const itemToken = getToken()
  const logout = () => {
    if (itemToken !== null && itemToken !== undefined) {
      localStorage.removeItem('token')
    }
    navigate('/')
  }

  const goToProfile = () => {
    if (itemToken !== null && itemToken !== undefined) {
      navigate('/my_profile')
    } else {
      navigate('/')
    }
  }

  const goToCatalog = () => {
    if (itemToken !== null && itemToken !== undefined) {
      navigate('/catalog')
    } else {
      navigate('/')
    }
  }

  return (
    <header className={style}>
      <button type="button" onClick={goToCatalog}>
        <div className={style.logo_and_name}>
          <img className={style.logo} src={logo} alt="alt" />
          <h1>DogFood</h1>
        </div>

      </button>
      {/* <div className={style.logo_and_name}>
        <img className={style.logo} src={logo} alt="alt" />
        <h1>DogFood</h1>
      </div> */}

      <div className="input-group w-25">
        <input className="form-control border-end-0 border" type="search" value="search" id="example-search-input" />
        <span className="input-group-append">
          <button className="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5" type="button">
            <i className="fa fa-search" />
          </button>
        </span>
      </div>

      <img className={style.icons} src={likeIcon} alt="" />

      <button type="button" onClick={goToProfile}>
        {' '}
        <img className={style.icons} src={profileIcon} alt="alt" />
        {' '}
      </button>

      <button type="button" onClick={logout}>
        {' '}
        <img className={style.icons} src={logoutIcon} alt="alt" />
        {' '}
      </button>
    </header>
  )
}
