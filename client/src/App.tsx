import './App.css'
import { useState } from 'react'
import { Button } from './components/Button'
import { Card } from './components/Card'
import { CreateContent } from './components/CreateContent'
import PlusIcon from './icons/PlusIcon'
import ShareIcon from './icons/ShareIcon'
import { Sidebar } from './components/Sidebar'
function App() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    //@ts-ignore
    <div className='flex'>
      <Sidebar/>
      <div className='p-4 w-screen h-screen bg-gray-100'>
        <CreateContent open={modalOpen} onClose={()=>{
          setModalOpen(false);
        }}/>
        <div className='flex justify-end items-start w-auto mb-4 gap-3'>
          <Button startIcon={<ShareIcon size="md"/>} size="sm" variant='primary' text="Share Brain" />
          <div className="cursor-pointer">
            <Button onClick={()=> setModalOpen(true)} startIcon={<PlusIcon size="lg"/>} size="sm" variant ='secondary' text ="Add Content" />
          </div>
        </div>

        <div className='flex gap-4'>
          <Card link="https://twitter.com/ReviewVayu/status/1888132038491857095" title="Drones" type="twitter"/>
          <Card link="https://www.youtube.com/watch?v=PCenHEOm2m0" title="FCB" type="youtube"/>
        </div>
      </div>
    </div>
  )
}

export default App
