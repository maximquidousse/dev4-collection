import Shoe from "@/components/elements/shoe"

const ShoesOverview = ({ data, shoes, user }) => {
  return (
    <>
      <section className="mt-32">
        <p className="text-center font-montreal font-bold text-7xl uppercase">
          {data.title}
        </p>
        <div className="mt-16">
          {shoes.map((shoe) => (
            <Shoe props={shoe} key={shoe.id} user={user} />
          ))}
        </div>
      </section>
    </>
  )
}

export default ShoesOverview
