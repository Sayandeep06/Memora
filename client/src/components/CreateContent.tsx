
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";

export const CreateContent = ({open, onClose}) => {

    return (
        <div>
            {open && <div className="w-screen h-screen bg-slate-500/20 fixed top-0 left-0 flex justify-center items-center">
                <div className="flex flex-col justify-center rounded-2xl shadow-xl">
                    <span className="bg-white opacity-100 p-4 rounded border-gray-100">
                        <div className="flex justify-end">
                           <div onClick={onClose} className="cursor-pointer">
                                <CrossIcon/>
                            </div> 
                        </div>
                        <div className="flex flex-col m-2 gap-2">
                            <h1 className="font-bold text-purple-800">Enter Title</h1>
                            <Input placeholder="Title"/>
                            <h1 className="font-bold text-purple-800">Paste your Link</h1>
                            <Input placeholder="Link"/>
                        </div>
                        <div className="flex justify-center mt-4">
                            <Button variant="primary" size="md" text="submit" ></Button>
                        </div> 
                    </span>
                </div>
            </div>}
        </div>

    )
}

function Input({onChange, placeholder}:{onchange: ()=> void}){
    return <div>
        <input placeholder={placeholder} type="text" className="px-4 py-2 border rounded-md" onChange={onChange}></input>
    </div>
}


