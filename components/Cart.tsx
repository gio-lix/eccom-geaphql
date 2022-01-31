import {FC} from "react"
import {IProps} from "../type";
import {BACKAND_URL} from "../helper";
import Image from "next/image";
import {useRouter} from "next/router";

interface ICart {
    id: number
    cart: IProps
}
const Cart: FC<ICart> = ({id,cart:{images, price,name}}) => {
    const router = useRouter()
    const img = images?.data[0].attributes.url
    console.log(id)
  return (
     <>
         <div
             className="max-w-xs h-[500px] rounded-md bg-white flex flex-col justify-end overflow-hidden shadow-lg hover:scale-105 transition duration-500 cursor-pointer">
             <div onClick={() => router.push(`/product/${id}`)} className='cursor-pointer '>
                 <img  src={`${BACKAND_URL}${img}`} className='w-full ' alt={name}/>
             </div>
             <div className="h-44  py-4 px-4 bg-white">
                 <h3 className="text-lg font-semibold text-gray-600">{name}</h3>
                 <p className="mt-4 text-lg font-thin">$ {price}</p>
             </div>
         </div>

     </>
  )
}
export default Cart