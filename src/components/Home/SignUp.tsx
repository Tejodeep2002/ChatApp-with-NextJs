import { useUserRegisterMutation } from "@/lib/redux/api/apiUserSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const SignUp: React.FC = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState<String>();
  const [email, setEmail] = useState<String>();
  const [password, setPassword] = useState<String>();
  const [confirmPassword, setConfirmPassword] = useState<String>();
  const [pic, setPic] = useState<String>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [userRegister, { isLoading, isError, isSuccess }] =
    useUserRegisterMutation();

  const postDetails = async (data: FileList | null) => {
    var pics;
    if (data) pics = data[0];
    console.log(pics);

    setLoading(true);
    if (pics === undefined) {
      setLoading(false);
      return toast.error("Error occur");
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const picData = new FormData();
      picData.append("file", pics);
      picData.append("upload_preset", "chat-app");
      picData.append("cloud_name", "dlavxaftl");

      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const { data } = await axios.post(
          "https://api.cloudinary.com/v1_1/dlavxaftl/image/upload",
          picData,
          config
        );

        console.log(data);
        setPic(data.url.toString());
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      toast.error("Please select A Image");
      setLoading(false);
      return;
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast.warning("Please Fill all the Fields");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.warning("Password not Match");
      setLoading(false);
      return;
    }

    try {
      userRegister({ name, email, password, pic });

      toast.success("Regestration successfull");

      setLoading(false);

      router.push("/chats");
      router.refresh();

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setPic("");
    } catch (error) {
      toast.error("Error Occured! ");
      setLoading(false);
    }
  };

  return (
    <>
      <form>
        <div className="mb-3">
          <label className="block mb-2  font-medium text-gray-900 dark:text-white">
            Name
          </label>
          <input
            type="text"
            id="text"
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your Name"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block mb-2  font-medium text-gray-900 dark:text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your Email"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block mb-2  font-medium text-gray-900 dark:text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your Password"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block mb-2  font-medium text-gray-900 dark:text-white">
            ConfirmPassword
          </label>
          <input
            type="password"
            id="ConfirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your ConfirmPassword"
            required
          />
        </div>

        <div className="mb-3">
          <label className="block mb-2  font-medium text-gray-900 dark:text-white">
            Upload file
          </label>
          <input
            onChange={(e) => postDetails(e.target.files)}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="file_input_help"
            placeholder="Enter Your Email"
            id="file_input"
            type="file"
          />
          <p
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            PNG, JPG (MAX. 800x400px).
          </p>
        </div>
      </form>
      <button
        type="button"
        className=" text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        onClick={submitHandler}
      >
        {loading ? (
          <svg
            aria-hidden="true"
            className="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-700"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        ) : (
          "Sign Up"
        )}
      </button>
     
    </>
  );
};

export default SignUp;
