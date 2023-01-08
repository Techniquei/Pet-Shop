export function Comments({ comments }) {
  return (
    <ul className="list-group w-100">
      {
            comments.map((e) => <li className="list-group-item">{e.text}</li>)
        }
    </ul>
  )
}
