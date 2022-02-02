import {FC, useContext} from "react"
import {IProps} from "../type";
import {BACKAND_URL} from "../helper";
import {useRouter} from "next/router";
import {RiShoppingCart2Fill} from "react-icons/ri";
import {createStore} from "../context/store";

interface ICart {
    id: number
    cart: IProps
}
const Cart: FC<ICart> = ({id,cart}) => {
    const router = useRouter()
    const img = cart?.images?.data[0].attributes.url
    const {state, dispatch} = useContext(createStore)


    const handleAddCart = () => {
        dispatch({type: "ADD_CART", payload: {...cart, id: id}})
    }
  return (
     <>
         <div
             className="max-w-xs h-[500px] bg-white  rounded-md  flex flex-col  overflow-hidden shadow-lg hover:scale-105 transition duration-500 ">
             <div onClick={() => router.push(`/product/${id}`)} className='h-[320px] w-full cursor-pointer   flex items-center'>
                 <img src={`${BACKAND_URL}${img}`} alt="img"/>
             </div>
             <div className='relative h-[180px] w-full bg-white px-2 flex flex-col justify-around '>
                 <h3 className=" font-semibold leading-4 indent-10 text-gray-600  ">{cart?.name}</h3>
                 <p className="mt-4 text-lg font-thin ">$ {cart?.price}</p>
                 <button onClick={handleAddCart} className='absolute bottom-10 right-5 bg-green-400 flex items-center justify-center rounded-full w-8 h-8'>
                     <RiShoppingCart2Fill className='w-6 h-6 text-white' />
                 </button>
             </div>
         </div>

     </>
  )
}
export default Cart