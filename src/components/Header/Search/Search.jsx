import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchAC } from '../../../redux/actionCreators/searchAC'

export function Search() {
  const dispatch = useDispatch()
  const [searchLine, setSearchLine] = useState('')
  const handleSearchChange = (event) => {
    setSearchLine(event.target.value)
    dispatch(setSearchAC(event.target.value))
    console.log(event.target.value, searchLine)
  }

  return (
    <div className="input-group">
      <input type="text" className="form-control" placeholder="Поиск..." aria-label="" aria-describedby="button-addon2" value={searchLine} onChange={handleSearchChange} />
      <button className="btn btn-dark" type="button" id="button-addon2">Найти</button>
    </div>
  )
}
