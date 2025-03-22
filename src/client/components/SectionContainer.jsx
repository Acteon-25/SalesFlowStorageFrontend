export const SectionContainer = ({ children, className }) => {

  return (
    <section className={`${className} w-full mx-auto lg:w-[1000px] px-4`}>
      {children}
    </section>
  )
}
