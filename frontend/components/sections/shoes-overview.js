import Shoe from "@/components/elements/shoe"

const ShoesOverview = ({ data }) => {
  const shoes = data.shoes

  return (
    <>
      {shoes.map((shoe) => (
        <Shoe props={shoe} />
      ))}
    </>
  )
}

export default ShoesOverview
