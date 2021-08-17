const Comment = ({ props }) => {
  // Prevent errors if no metadata was set

  return (
    <div className="flex justify-between border-t border-b border-black mt-4">
      <p className="font-montreal font-medium text-md">"{props.text}"</p>
      <p className="font-montreal font-medium text-md uppercase">
        {props.user}
      </p>
    </div>
  )
}

export default Comment
