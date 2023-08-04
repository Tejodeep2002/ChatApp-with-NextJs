import LoginOptions from "@/components/Home/LoginOptions";
import { cookies } from 'next/headers'
const Home = () => {
  const cookieStore = cookies()
  return (
    <div className="w-full m-auto flex flex-col justify-center items-center max-w-xl">
      <div className="w-full flex justify-center p-3 bg-white mx-10 my-4 border-2 rounded-lg">
        <span className="text-4xl font-WorkSans color-black">Talk-A-Tive</span>
      </div>
      <div className="bg-white w-full p-4 rounded-lg border-2">
        <LoginOptions cookies={cookieStore.get('userInfo')}/>
      </div>
    </div>
  );
};
export default Home;
