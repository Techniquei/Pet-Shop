import { useQuery } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../getToken'
import { Loader } from '../Loader/Loader'
import style from './profile.module.scss'

export const PROFILE_QUERY_KEY = 'PROFILE_QUERY_KEY'

export const getProfile = () => fetch('https://api.react-learning.ru/v2/sm8/users/me', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  },
}).then((res) => res.json())

export function Profile() {
  const navigate = useNavigate()

  if (getToken() == null) {
    navigate('/')
  }

  const dispath = useDispatch()

  const { data: profile, isLoading } = useQuery({
    queryKey: [PROFILE_QUERY_KEY],
    queryFn: getProfile,
  })

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className={style.container}>
      <div className={style.container_inner}>

        <div className={style.avatar_wrapper}>
          <img src={profile.avatar} alt="..." />
        </div>
        <div className="bg-secondary bg-gradient p-2 mb-1-9 rounded d-flex flex-column align-items-center w-100">

          <h3 className="h2 text-white mb-0">{profile.name}</h3>
          <span className="text-white">{profile.about}</span>
        </div>

        <ul className="list-unstyled mb-1-9 fs-4">
          <li className="mb-2 mb-xl-3 display-28">
            <span className="display-26 text-secondary me-2 font-weight-600">Почта:</span>
            {' '}
            {profile.email}
          </li>
          <li className="mb-2 mb-xl-3 display-28">
            <span className="display-26 text-secondary me-2 font-weight-600">Группа:</span>
            {' '}
            {profile.group}
          </li>
          <li className="mb-2 mb-xl-3 display-28">
            <span className="display-26 text-secondary me-2 font-weight-600">ID:</span>
            {' '}
            {profile._id}
          </li>
        </ul>
      </div>
    </div>

  )
}
