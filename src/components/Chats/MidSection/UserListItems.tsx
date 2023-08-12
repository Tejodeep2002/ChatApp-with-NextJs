import React, { FC } from 'react'

export interface UserListItemsProps {
    id: string;
    image: string;
    name: string;
    onAccess: any;
  }

const UserListItems:FC<UserListItemsProps> = ({ id, image, name, onAccess }) => {
  return (
    <div className='w-full h-14 flex items-center px-3 py-2 bg-red-700 border border-x-black'>
      
    </div>
  )
}

export default UserListItems
