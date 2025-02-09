
import ShareIcon from "../icons/ShareIcon";
import DocumentIcon from "../icons/DocumentIcon";
import DeleteIcon from "../icons/DeleteIcon";

interface CardProps{
    title: string;
    type: "twitter" | "youtube"
    link: string;
}
export const Card = (props: CardProps) => {
  return (
    <div className="p-4 bg-white rounded-md border-gray-200 min-h-48 max-w-72 border">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center text-gray-500">
            <DocumentIcon/>
            <span className="text-slate-600 font-mont font-semibold text-sm">Project Ideas</span>
        </div>
        <div className="flex gap-2 text-gray-500 items-center">
          <a href={props.link} target="_blank">
            <ShareIcon size="md"/>
          </a>
          <div>
            <DeleteIcon/>
          </div>  
        </div>
      </div>
      <div className="p-2 ">
        {props.type === "youtube" && <iframe className="w-full h-full rounded-xl my-3" width="560" height="315" src={props.link.replace("watch", "embed").replace("?v=", "/")} title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
        {props.type === "twitter" && <blockquote className="twitter-tweet">
          <a href={props.link.replace("x.com", "twitter.com")}></a> 
        </blockquote>}
      </div>
    </div>
  )
}
 
