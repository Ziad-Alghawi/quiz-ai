import UploadDoc from "../UploadDoc";
import { auth, signIn } from "@/auth";
import { getUserSupscription } from "@/app/actions/userSubscriptions";
import { Lock, Flame } from "lucide-react";
import { getStripe } from "@/lib/stripe-client";
import { useRouter } from "next/navigation";
import { PRICE_ID } from "@/lib/utils";
import UpgradePlan from "../UpgradePlan";

const page = async () => {
  const session = await auth();
  // const router = useRouter();
  const userId = session?.user?.id;
  if (!userId){
    signIn();
    return;
  }
  const subscribed: boolean | null | undefined = await getUserSupscription({ userId });

  const onNavigateToUpgrade = async (price: string) => {
        if (!userId) {
          signIn();
          return;
        }
    
    
        try {
          const { sessionId } = await fetch("/api/stripe/checkout-session", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ price })
          }).then((res) => res.json());
    
          const stripe = await getStripe();
          stripe?.redirectToCheckout({ sessionId });
        } catch (error) {
    
          console.log('Subscribe Button Error:', error);
        }
      }



  return (
    <div className="flex flex-col flex-1">
      <main className="pt-11 flex flex-col text-center items-center gap-4 flex-1 mt-24">
        {!subscribed ?
         <>
        <h2 className="text-3xl font-bold">
          What do you want to be quizzed about today?
        </h2>
        <UploadDoc />
        </> :
        <UpgradePlan />
        }
      </main>
    </div>
  )
}
export default page