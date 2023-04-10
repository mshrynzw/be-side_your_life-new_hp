export default function PageTitle({ children }) {
  const program_title = '石川・ホンマ・ぶるんのBe-SIDE Your Life!'

  return (
    <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
      {children.replace(program_title, '')}
    </h1>
  )
}
