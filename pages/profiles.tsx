import { GetServerSideProps } from "next";
import useCurrentUser from "../hooks/useCurrentUser";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {
      session
    }
  }
}


const Profiles = () => {

  const router = useRouter();
  const { data: user } = useCurrentUser();
  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">Who is watching?</h1>
        <div className="flex justify-center items-center mt-10 gap-8">
          <div onClick={() => { router.push('/') }}>
            <div className="group flex-row w-44 mx-auto">
              <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:border-white group-hover:cursor-pointer overflow-hidden">
                <img src="/images/default-red.png" alt="Profile" />
              </div>
              <div className="mt-4 text-gray-400 text-center group-hover:text-white text-2xl">
                {user?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Profiles;