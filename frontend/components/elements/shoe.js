import React, { useState } from "react"
import { useRouter } from "next/router"
import Comment from "@/components/elements/comment"

const Shoe = ({ props, user }) => {
  const router = useRouter()
  const [edit, setEdit] = useState(false)
  const [text, setText] = useState("")

  const [values, setValues] = useState({
    name: props.name,
    owner: props.owner,
  })

  const { name, owner } = values

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (text == "") {
    } else {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: text,
            user: user.name,
            shoe: props.id,
            shoeID: props.id,
          }),
        }
      )
      if (!response.ok) {
        console.log("post did not work")
      } else {
        const data = await response.json()
        setText("")
        router.push(`/`)
      }
    }
  }

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
    <div className="mt-16 flex flex-col items-center">
      <img
        className="object-contain w-full"
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
          <div className="flex justify-between w-full mt-4 ">
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
      <div className="flex justify-between w-full mt-4  border-b border-black">
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
      <div className="flex flex-col w-full mt-4">
        {props.comments.length > 0 && (
          <p className="font-montreal font-bold text-2xl">Comments:</p>
        )}
        {props.comments.length < 1 && (
          <p className="font-montreal font-bold text-2xl">No comments yet.</p>
        )}
        {props.comments.map((comment) => (
          <Comment props={comment} key={comment.id} />
        ))}
        <div className="flex justify-between border-t border-b border-black mt-4">
          <input
            name="text"
            type="text"
            placeholder="Add a comment"
            value={text}
            onChange={(e) => {
              setText(e.target.value)
            }}
            className="font-montreal font-medium text-md bg-grey w-3/4"
          />
          <p
            onClick={handleCommentSubmit}
            className="font-montreal font-medium text-md uppercase bg-black text-white cursor-pointer p-2"
          >
            Submit comment
          </p>
        </div>
      </div>
    </div>
  )
}

export default Shoe
