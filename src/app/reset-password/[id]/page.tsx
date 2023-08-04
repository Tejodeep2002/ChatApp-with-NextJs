import ResetPassword from '@/components/ResetPassword/ResetPassword'
import React from 'react'

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="w-full m-auto flex flex-col justify-center items-center max-w-xl">
    <div className="w-full flex justify-center p-3 bg-white  mx-10 my-4 border-2 rounded-lg">
      <span className="text-4xl font-WorkSans color-black">Talk-A-Tive</span>
    </div>
    <div className="bg-white w-full p-4 rounded-lg border-2 flex flex-col gap-3">
      <span className="text-xl font-WorkSans color-black">Reset Password</span>
      <ResetPassword userId={params.id}/>
    </div>
  </div>
  )
}

export default page
