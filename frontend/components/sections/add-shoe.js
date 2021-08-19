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
    if (values.name == "" || values.owner == "" || image == null) {
    } else {
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
  }
  return (
    <>
      <section className="mt-8 mb-64 w-full flex flex-col items-center border border-black py-16">
        <p className="font-montreal font-bold text-4xl uppercase">
          {data.title}
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mt-6">
            <input
              className="border border-black border-1 bg-grey font-montreal font-medium text-md p-3"
              name="name"
              type="text"
              id="name"
              value={name}
              placeholder="Name shoe"
              onChange={handleInputChange}
            />
            <input
              className="block border border-black border-1 bg-grey font-montreal font-medium text-md p-3 mt-4"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <input
              className="border border-black border-1 bg-grey font-montreal font-medium text-md uppercase p-3 bg-black text-white mt-4 cursor-pointer"
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
