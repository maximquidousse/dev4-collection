import React, { useState } from "react"
import { useRouter } from "next/router"

const AddShoe = ({ data, user }) => {
  const router = useRouter()
  const [image, setImage] = useState(null)
  const [values, setValues] = useState({
    name: "",
    owner: user.name,
  })

  const { name, owner } = values

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/shoes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    )

    if (!response.ok) {
      console.log("post did not work")
    } else {
      const data = await response.json()

      const formData = new FormData()
      formData.append("files", image)
      formData.append("ref", "shoes")
      formData.append("refId", data.id)
      formData.append("field", "image")

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/upload`,
        {
          method: "POST",
          body: formData,
        }
      )

      router.push(`/`)
      setValues({
        name: "",
        owner: user.name,
      })
      setImage(null)
    }
  }
  return (
    <>
      <section className="mt-8">
        <p>{data.title}</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name shoe:</label>
            <input
              className="border border-black border-1"
              name="name"
              type="text"
              id="name"
              value={name}
              onChange={handleInputChange}
            />
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <input
              className="border border-black border-1"
              type="submit"
              value="Submit shoe"
            />
          </div>
        </form>
      </section>
    </>
  )
}

export default AddShoe
