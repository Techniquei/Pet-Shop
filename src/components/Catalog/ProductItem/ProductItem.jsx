import styles from './productItem.module.scss'

export function ProductItem({
  name, price, id, pictures,
}) {
  return (
    <div className={styles.card}>
      <div className="box">
        <img src={pictures} alt="" />
      </div>

      <b>{name}</b>
      <div>
        {price}
        {' '}
        $
      </div>
      <div>{id}</div>

    </div>
  )
}
