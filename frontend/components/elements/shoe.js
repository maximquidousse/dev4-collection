import React, { useState } from "react"
import { useRouter } from "next/router"

const Shoe = ({ props }) => {
  const router = useRouter()
  const [edit, setEdit] = useState(false)
  console.log(edit)
  const [values, setValues] = useState({
    name: props.name,
    owner: props.owner,
  })

  const { name, owner } = values

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/shoes/${props.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    )

    if (!response.ok) {
      console.log("update did not work")
    } else {
      console.log("update worked")
      await response.json()
      setEdit(false)
      router.push(`/`)
    }
  }

  return (
    <div>
      {/* <img
        width={400}
        height={200}
        src={`http://localhost:1337${props.image.url}`}
      /> */}
      {edit && (
        <>
          <form onSubmit={handleSubmit}>
            <input
              className="border border-black border-1"
              name="name"
              type="text"
              id="name"
              value={name}
              onChange={handleInputChange}
            />
            <input
              className="border border-black border-1"
              type="submit"
              value="Submit change"
            />
          </form>
          <p onClick={() => setEdit(false)}> cancel</p>
        </>
      )}
      {!edit && (
        <>
          <h1>Shoe: {props.name}</h1>
          <p onClick={() => setEdit(true)}> change name</p>
        </>
      )}
      <h1>Owner: {props.owner}</h1>
    </div>
  )
}

export default Shoe
