import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Login from "@/components/Login/Login"

const page:React.FC= async () => {
  const session = await getServerSession(authOptions);

  if (session?.user.id) {
    redirect("/");
  }

  return (
    <div className="w-full m-auto flex flex-col justify-center items-center max-w-lg">
      <div className="w-full flex justify-center p-3 bg-white mx-10 my-4 border-2 rounded-lg">
        <span className="text-4xl font-WorkSans color-black">Talk-A-Tive</span>
      </div>
      <div className="bg-white w-full p-4 rounded-lg border-2">
        <Login/>
      </div>
    </div>
  );
};
export default page;
