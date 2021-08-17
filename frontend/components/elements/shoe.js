import React, { useState } from "react"
import { useRouter } from "next/router"

const Shoe = ({ props }) => {
  const router = useRouter()
  const [edit, setEdit] = useState(false)

  const [values, setValues] = useState({
    name: props.name,
    owner: props.owner,
  })

  const { name, owner } = values

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const deleteShoe = async (e) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/shoes/${props.id}`,
      {
        method: "DELETE",
      }
    )

    if (!response.ok) {
      console.log("delete did not work")
    } else {
      await response.json()
      setEdit(false)
      router.push(`/`)
    }
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
      await response.json()
      setEdit(false)
      router.push(`/`)
    }
  }

  return (
    <div className="mt-16 flex flex-col items-center border-b border-black">
      <img
        className="object-contain w-full "
        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${props.image.url}`}
      />
      {edit && (
        <>
          <form
            onSubmit={handleSubmit}
            className=" flex justify-between w-full mt-4"
          >
            <input
              className="border border-black border-1 font-montreal font-bold text-5xl uppercase bg-grey"
              name="name"
              type="text"
              id="name"
              placeholder={props.name}
              value={name}
              onChange={handleInputChange}
            />
            <input
              className="font-montreal font-medium uppercase text-xl bg-grey"
              type="submit"
              value="Submit change"
            />
          </form>
          <p
            className="font-montreal font-medium uppercase text-xl bg-grey cursor-pointer"
            onClick={() => setEdit(false)}
          >
            cancel
          </p>
        </>
      )}
      {!edit && (
        <>
          <div className="flex justify-between w-full mt-4">
            <h1 className="font-montreal font-bold text-5xl uppercase">
              {props.name}
            </h1>
            <p
              className="font-montreal font-medium uppercase text-xl cursor-pointer"
              onClick={() => setEdit(true)}
            >
              change name
            </p>
          </div>
        </>
      )}
      <div className="flex justify-between w-full mt-4">
        <h1 className="font-montreal font-bold text-2xl uppercase">
          {props.owner}
        </h1>
        <p
          className="font-montreal font-medium uppercase text-xl text-red pb-4 transform -translate-y-8 cursor-pointer"
          onClick={deleteShoe}
        >
          Delete shoe
        </p>
      </div>
    </div>
  )
}

export default Shoe
