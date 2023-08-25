"use client";
import { useUserRegisterMutation } from "@/lib/redux/api/apiUserSlice";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const SignUp: React.FC = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  
  const [image, setImage] = useState<string>();
  // const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [userRegister, { isLoading, isError, isSuccess }] =
    useUserRegisterMutation();

  const pictureUpload = async (data: FileList | null) => {
    var picture;
    if (data) picture = data[0];

    // setLoading(true);
    if (picture === undefined) {
      // setLoading(false);
      toast.error("Error occur");
      return;
    }

    if (
      picture.type === "image/jpeg" ||
      picture.type === "image/png" ||
      picture.type === "image/jpg"
    ) {
      const picData = new FormData();
      picData.append("file", picture);
      picData.append("upload_preset", "chat-app");
      picData.append("cloud_name", "dlavxaftl");

      if (process.env.NEXT_PUBLIC_FILE_UPLOAD_URL !== undefined) {
        fetch(process.env.NEXT_PUBLIC_FILE_UPLOAD_URL, {
          method: "POST",
          body: picData,
        })
          .then((res) => res.json())
          .then((data) => {
          
            toast.success("Picture success fully uploaded");
            console.log(data.url.toString());
            setImage(data.url.toString());
          })
          .catch((error) => {
            toast.warning("Picture upload failed");
            console.log(error);
          });
      }

      // setLoading(false);
    } else {
      toast.error("Please select A Image");
      // setLoading(false);
      return;
    }
  };

  const submitHandler = async () => {
    // setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast.warning("Please Fill all the Fields");
      // setLoading(false);
      return;
    } else if (password !== confirmPassword) {
      toast.warning("Password not Match");
      // setLoading(false);
      return;
    }


    console.log(image)

    try {
      const response = await userRegister({
        name,
        email,
        password,
        image,
      }).unwrap();
      toast.success("Regestration successfull");

      // setLoading(false);

      router.push("/login");

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setImage("");
    } catch (error: any) {
      toast.error(`${error.data.error}`);
      // setLoading(false);
    }
  };

  const Back = () => {
    router.push("/login");
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
            value={name}
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
            value={email}
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
            value={password}
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
            value={confirmPassword}
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
            onChange={(e) => pictureUpload(e.target.files)}
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
      <div className="flex justify-between">
        <button
          type="button"
          className=" text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={submitHandler}
        >
          {isLoading ? (
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
        <button
          type="button"
          className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={Back}
        >
          Back
        </button>
      </div>
    </>
  );
};

export default SignUp;
