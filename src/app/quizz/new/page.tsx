import UploadDoc from "../UploadDoc";

const page = () => {
  return (
    <div className="flex flex-col flex-1">
      <main className="pt-11 flex flex-col text-center items-center gap-4 flex-1 mt-24">
        <h2 className="text-3xl font-bold">
          What do you want to be quizzed about today?
        </h2>
        <UploadDoc />
      </main>
    </div>
  )
}
export default page