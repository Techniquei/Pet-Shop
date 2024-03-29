import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import style from './header.module.scss'
import logo from './assets/site_logo.png'
import likeIcon from './assets/like.jpg'
import cartIcon from './assets/cart.png'
import logoutIcon from './assets/logout.png'
import profileIcon from './assets/profile.png'
import { Search } from './Search/Search'
import { setSearch } from '../../redux/slices/searchSlice'
import { getToken } from '../getToken'

export function Header() {
  const dispatch = useDispatch()
  const cart = useSelector((store) => store.cart.value)
  const navigate = useNavigate()
  const itemToken = getToken()
  const isSignIn = (itemToken !== null && itemToken !== undefined)
  const logout = () => {
    if (isSignIn) {
      localStorage.removeItem('store')
    }
    navigate('/')
  }

  const goToProfile = () => {
    if (isSignIn) {
      navigate('/my_profile')
    } else {
      navigate('/')
    }
  }

  const goToCatalog = () => {
    if (isSignIn) {
      dispatch(setSearch(''))
      navigate('/catalog')
    } else {
      navigate('/')
    }
  }

  const goToCart = () => {
    if (isSignIn) {
      navigate('/cart')
    } else {
      navigate('/')
    }
  }

  const goToLiked = () => {
    if (isSignIn) {
      navigate('/liked')
    } else {
      navigate('/')
    }
  }

  return (
    <header className={style.header}>
      <div className={style.header__content}>

        <button type="button" onClick={goToCatalog}>
          <div className={style.logo_and_name}>
            <img className={style.logo} src={logo} alt="alt" />
            <h1 className={style.name}>DogFood</h1>
          </div>

        </button>

        <Search />
        <button type="button" onClick={goToLiked}>
          <img className={style.icons} src={likeIcon} alt="" />
        </button>

        <button type="button" onClick={goToCart} className="position-relative">
          <img className={style.icons} src={cartIcon} alt="alt" />
          <div className={style.cart_counter}><b className={style.cart_counter_text}>{cart.length}</b></div>
        </button>

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

      </div>

    </header>
  )
}
