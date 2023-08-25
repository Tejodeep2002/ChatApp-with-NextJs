"use client";
import React, { FC, ReactNode } from "react";
import { Button } from "../../ui/Button";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { openSettingsModal } from "@/lib/redux/Slices/uiSlice";
import { useUserLogoutMutation } from "@/lib/redux/api/apiUserSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SettingsModal: FC = () => {
  const settingsModal = useAppSelector((state) => state.ui.settingsModal);
  const dispatch = useAppDispatch();
  const [userLogout] = useUserLogoutMutation();
  const router = useRouter();

  
  const Signout = async () => {
    try {
      const responce = await userLogout(undefined).unwrap();
      console.log("Logout", responce);
      dispatch(openSettingsModal(false))
      toast.success("Logout SuccessFull");
      router.push("/login");

    } catch (error) {
      console.log(error);
      toast.error("Error Occurred");
    }
  };

  return (
    <div
      className={`fixed w-full h-full transform  ${
        settingsModal ? "  translate-y-0" : " translate-y-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div
        className="w-full h-full "
        onClick={() => dispatch(openSettingsModal(false))}
      ></div>
      <div
        className={`absolute bottom-2 left-2 w-full h-1/2 max-w-md max-h-full shadow-lg overflow-y-auto`}
      >
        {/* <!-- Modal content --> */}
        <div className="relative w-full h-full rounded-lg shadow border bg-white dark:bg-gray-700 ">
          {/* <!-- Modal header --> */}
          <div className="flex w-full h-12 items-center justify-between p-5 border-b rounded-t  dark:border-gray-600">
            <h3 className="text-xl font-medium  text-gray-900 dark:text-white">
              Settings
            </h3>
          </div>
          {/* <!-- Modal body --> */}
          <div className=" flex w-full h-[88%]  border ">
            <div className="w-[35%]  px-3 py-3 gap-3  text-white bg-slate-600 flex flex-col ">
              <Button variant="pink">Profile</Button>
              <Button variant="pink">General</Button>
              <Button variant="pink">personalization</Button>
            </div>
            <div className="w-full  p-6 bg-white border ">
              <Button variant="pink" size="lg" onClick={Signout}>
                Log Out
              </Button>
            </div>
          </div>

          {/* <!-- Modal footer --> */}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
