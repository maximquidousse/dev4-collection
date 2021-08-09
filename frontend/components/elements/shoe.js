const Shoe = ({ props }) => {
  return (
    <div>
      <img
        width={400}
        height={200}
        src={`http://localhost:1337${props.image.url}`}
      />
      <h1>{props.name}</h1>
    </div>
  )
}

export default Shoe
