import { useSelector } from 'react-redux'

export function Liked() {
  const liked = useSelector((store) => store.liked.value)

  return (
    <div>
      {liked.map((product) => <div className="bg-white rounded-4 p-3 m-3 d-flex justify-content-between gap-3">{product}</div>)}
    </div>
  )
}
