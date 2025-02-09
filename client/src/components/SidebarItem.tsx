import { ReactElement } from "react";
export const SidebarItem = ({text,icon}:{
    text: string;
    icon: ReactElement;
}) => {
  return (
    <div className='flex justify-start text-gray-800 gap-4 my-2 items-center cursor-pointer rounded hover:bg-purple-300 transition-all'>
        <div className="pl-6">{icon}</div>
        <h1 className="p-2">{text}</h1>
    </div>

  )
}


