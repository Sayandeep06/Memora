import ai from '../../public/ai.svg'
import { Twitter } from '../icons/Twitter'
import { SidebarItem } from './SidebarItem'
import { YouTube } from '../icons/YouTube'
export const Sidebar = () => {
  return (
    <div className="h-screen p-4 bg-white border-r border-gray-200 w-72 position-fixed left-0 top-0">
        <div className='flex justify-start gap-4 items-center mb-8'>
            <img className='h-10 w-10' src={ai}/>
            <h1 className="text-xl font-bold text-green-800">Memora</h1>
        </div>
        <SidebarItem text="Twitter" icon={<Twitter/>}/>
        <SidebarItem text="YouTube" icon={<YouTube/>}/>
    </div>
  )
}


