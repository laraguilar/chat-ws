import { GesonelJPEG, PatinhoFeioJPEG } from "@/icons"
import Image, { StaticImageData } from "next/image"

interface IMessage{
    image: StaticImageData
    text: string,
    isOwner?: boolean
}
export const Message = ( props : IMessage) => {
    const image = props.image;
    const text = props.text;
    const isOwner = props.isOwner;
    return(
        <div className={'display-inline w-4/5 ' + `${ isOwner ? " float-right " : " float-left"}`}>
            <div className={'p-2 w-3/2 ' + `${ isOwner ? " text-right float-right " : " float-left"}`}>

              {
                isOwner ? 
                (
                    <div className="flex items-center gap-4">
                        <div className="bg-slate-500 p-4 rounded-lg">
                            {text}
                        </div>
                        <div className="text-center">
                            <Image src={image} alt="Profile pick" className="w-12 md:w-16 object-cover rounded-full aspect-square"></Image>
                        </div>    
                    </div>
                ) :
                (
                    <div className="flex items-center gap-4">
                        <div className="text-center">
                            <Image src={image} alt="Profile pick" className="w-12 md:w-16 object-cover rounded-full aspect-square"></Image>
                        </div>
                        <div className="bg-slate-500 p-4 rounded-lg">
                            {text}
                        </div>    
                    </div>
                )
              }




                
            </div>
          </div>
    )
}
