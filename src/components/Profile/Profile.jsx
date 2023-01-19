import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../getToken'
import { Loader } from '../Loader/Loader'
import style from './profile.module.scss'

export const PROFILE_QUERY_KEY = 'PROFILE_QUERY_KEY'

export function Profile() {
  const token = getToken()
  const navigate = useNavigate()

  const getProfile = () => fetch('https://api.react-learning.ru/v2/sm8/users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json())

  if (token == null) {
    navigate('/')
  }

  const { data: profile, isLoading } = useQuery({
    queryKey: [PROFILE_QUERY_KEY], queryFn: getProfile,
  })

  if (isLoading) {
    return <Loader />
  }

  return (

    <div className={style.container}>
      <div className={style.container_inner}>
        <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <img src={profile.avatar} alt="..." />
            </div>
            <div className="col-lg-6 px-xl-10">
              <div className="bg-secondary bg-gradient d-lg-inline-block p-2 mb-1-9 rounded">
                <h3 className="h2 text-white mb-0">{profile.name}</h3>
                <span className="text-white">{profile.about}</span>
              </div>
              <ul className="list-unstyled mb-1-9">
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
        </div>
      </div>

    </div>

  )
}
