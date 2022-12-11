import { useNavigate } from 'react-router-dom'
import style from './header.module.scss'
import logo from './assets/site_logo.png'
import likeIcon from './assets/like.jpg'
import logoutIcon from './assets/logout.png'

export function Header() {
  const navigate = useNavigate()
  const logout = () => {
    if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined) {
      localStorage.removeItem('token')
      console.log('logout')
      navigate('/')
    } else {
      console.log('logout')
      navigate('/')
    }
  }

  return (
    <header className={style}>
      <div className={style.logo_and_name}>
        <img className={style.logo} src={logo} alt="alt" />
        <h1>DogFood</h1>
      </div>

      <div className="input-group w-25">
        <input className="form-control border-end-0 border" type="search" value="search" id="example-search-input" />
        <span className="input-group-append">
          <button className="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5" type="button">
            <i className="fa fa-search" />
          </button>
        </span>
      </div>

      <img className={style.icons} src={likeIcon} alt="" />

      <button type="button" onClick={logout}>
        {' '}
        <img className={style.icons} src={logoutIcon} alt="alt" />
        {' '}
      </button>
    </header>
  )
}
