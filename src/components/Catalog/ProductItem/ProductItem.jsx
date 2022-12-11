import styles from './productItem.module.scss'

export function ProductItem({
  name, price, id, pictures,
}) {
  return (
    <div className={styles.card}>
      <img src={pictures} alt="" />
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
