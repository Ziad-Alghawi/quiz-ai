import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { quizzes } from '@/db/schema';
import { auth } from '@/auth';
import QuizzesTable, { Quizz } from './quizzesTable';
import getUserMatrics from '@/actions/getUserMatrics';



const page = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return (<p>User not found</p>)
  }

  // Fetch quizzes created by the user
  const userQuizzes: Quizz[] = await db.query.quizzes.findMany({
    where: eq(quizzes.userId, userId)
  });
  const userData = await getUserMatrics();
  console.log(userData);

  return (
    <QuizzesTable quizzes={userQuizzes} />
  );
}

export default page;