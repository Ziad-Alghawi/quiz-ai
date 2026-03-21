import UploadDoc from "../UploadDoc";
import { auth } from "@/auth";
import { getUserSubscription } from "@/app/actions/userSubscriptions";
import UpgradePlan from "../UpgradePlan";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    redirect("/api/auth/signin?callbackUrl=/quizz/new");
  }
  const subscribed: boolean | null | undefined = await getUserSubscription({ userId });

  return (
    <div className="flex flex-col flex-1">
      <main className="pt-11 flex flex-col text-center items-center gap-4 flex-1 mt-24">
        {subscribed ? (
          <>
            <h2 className="text-3xl font-bold">
              What do you want to be quizzed about today?
            </h2>
            <UploadDoc />
          </>
        ) : (
          <UpgradePlan />
        )}
      </main>
    </div>
  );
};

export default page;