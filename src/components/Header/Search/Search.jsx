import { debounce } from 'lodash'
import { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearch } from '../../../redux/slices/searchSlice'

export function Search() {
  const dispatch = useDispatch()
  const [searchLine, setSearchLine] = useState('')

  const useDebounce = useMemo(() => debounce((value) => {
    console.log(value)
    dispatch(setSearch(value))
  }, 500), [])

  const handleSearchChange = (event) => {
    setSearchLine(event.target.value)
    useDebounce(event.target.value)
  }

  return (
    <div className="input-group">
      <input type="text" className="form-control" placeholder="Поиск..." aria-label="" aria-describedby="button-addon2" value={searchLine} onChange={handleSearchChange} />
      <button className="btn btn-dark" type="button" id="button-addon2">Найти</button>
    </div>
  )
}
