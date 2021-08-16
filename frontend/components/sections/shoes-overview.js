import Shoe from "@/components/elements/shoe"

const ShoesOverview = ({ data, shoes }) => {
  return (
    <>
      <section className="mt-8">
        <p>{data.title}</p>
        {shoes.map((shoe) => (
          <Shoe props={shoe} key={shoe.id} />
        ))}
      </section>
    </>
  )
}

export default ShoesOverview
