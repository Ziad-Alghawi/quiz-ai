import Header from "../../components/header"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/*<Header />*/}

      <div className="m-auto flex h-[calc(100dvh-80px)] min-h-0 w-full max-w-96 flex-col">
        {children}
      </div>
    </>
  )
}