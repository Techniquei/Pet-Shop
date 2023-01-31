/* eslint-disable react/no-unescaped-entities */
import style from './footer.module.scss'

export function Footer() {
  return (
    <footer className={style}>
      <div className="d-flex flex-column">
        <h5>Учебный проект: "Интернет-магазин товаров для собак"</h5>
        <h5>Выполнил: Матвеев Владимир</h5>
      </div>

    </footer>
  )
}
