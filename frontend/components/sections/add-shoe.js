import React, { useState } from "react"
import { useRouter } from "next/router"

const AddShoe = ({ data, user }) => {
  const router = useRouter()
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
      console.log("post worked")
      const post = await response.json()
      console.log(post)
      router.push(`/`)
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
