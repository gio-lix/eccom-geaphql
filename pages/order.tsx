import React, {useContext, useState} from 'react';
import Layout from "../components/Layout";
import {createStore} from "../context/store";
import {BACKAND_URL} from "../helper";
import {MdDelete} from "react-icons/md";
import {parseCookies} from "nookies";
import Checkout from "../components/Checkout";
import {GrFormAdd} from "react-icons/gr";
import {AiOutlineMinus} from "react-icons/ai";

const Order = () => {
    const {state, dispatch} = useContext(createStore)
    const [checkout, setCheckout] = useState<boolean>(false);
    const {graphqlToken} = parseCookies()

    const funcTotal = (item: any) => {
        return state?.cart && item.reduce((acc: any, a: any) => {
            return acc + a.price
        }, 0).toFixed(2)
    }

    if (checkout) return <Checkout setCheckout={setCheckout}/>
    const handleBasketAdd = (item: number) => {
        const addCart =  state?.cart?.filter((el: any) => el.id === item)
        dispatch({type: "ADD_CART", payload: {...addCart[0], id: addCart[0].id } })
    }
    const handleMinus = (item: any) => {
        const addCart =  state?.cart?.filter((el: any) => el.id === item)
        if (addCart[0].qty < 2) return
        dispatch({type: "MINUS_CART", payload: {...addCart[0], id: addCart[0].id } })
    }

    return (
        <Layout>
            <div className='p-8'>
                <h2 className="   text-gray-600 font-semibold">Products Oder</h2>
                <span className="text-xs">All products item</span>
            </div>
            <div className="bg-white p-8 rounded-md w-full">
                <div className=" flex items-center justify-between pb-6">
                    <div>
                        {funcTotal(state?.cart) > 0 && (
                            <div className='w-full h-auto '>
                                <div className='flex space-x-10'>
                                    <p className='font-semibold'>Total Price</p>
                                    <p>${funcTotal(state?.cart)}</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex bg-gray-50 items-center p-2 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400"
                                 viewBox="0 0 20 20"
                                 fill="currentColor">
                            </svg>
                            <input className="bg-gray-50 outline-none ml-1 block " type="text" name="" id=""
                                   placeholder="search..."/>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal relative ">
                                <thead>
                                <tr>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        ADD QTY
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        DELETE
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        QNT
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Price
                                    </th>
                                </tr>
                                </thead>
                                {state?.cart?.length > 0 ? (
                                    <tbody>
                                    {state?.cart?.map((el: any) => {
                                        return (
                                            <tr key={el.id}>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white w-3/6 text-sm">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 w-10 h-10">
                                                            <img className="w-full h-full rounded-full"
                                                                 src={`${BACKAND_URL}${el.images?.data[0]?.attributes?.url}`}
                                                                 alt=""/>
                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {el.name}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <div className='flex space-x-2 '>
                                                        <button  onClick={(item) => handleMinus(el.id)}
                                                                 className='w-7 h-7 flex justify-center items-center border border-green-400'>
                                                            <AiOutlineMinus  className='text-xl'  />
                                                        </button>
                                                        <button onClick={(item) => handleBasketAdd(el.id)}
                                                                className='w-7 h-7 flex justify-center items-center border border-green-400'>
                                                            <GrFormAdd className='text-xl' />
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <div onClick={() => dispatch({type: "DELETE_CART", payload: el.id})}
                                                         className='flex space-x-2 cursor-pointer'>
                                                        <MdDelete className='w-7 h-6'/>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {el.qty}
                                                    </p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									            <span
                                                    className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                    $
                                                    <span aria-hidden
                                                          className="absolute inset-0 bg-green-200 opacity-50 rounded-full"> </span>
									            <span className="relative">
                                        {el.price}
                                    </span>
									</span>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                ) : (
                                    <div
                                        className=' absolute z-10 top-10 left-0 w-full h-28 flex justify-center items-center bg-green-50 '>
                                        <p className='font-bold text-gray-400 text-3xl'>Cart Is Empty</p>
                                    </div>
                                )}
                            </table>
                            <div
                                className="px-5 py-5 bg-white border-t relative flex flex-col xs:flex-row items-center xs:justify-between ">
                                    <span className="text-xs xs:text-sm text-gray-900">
                                        Showing 1 to 4 of 50 Entries
                                    </span>
                                <div className="inline-flex  mt-2 xs:mt-0">
                                    <button
                                        className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                                        Prev
                                    </button>
                                    &nbsp; &nbsp;
                                    <button
                                        className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                                        Next
                                    </button>

                                </div>
                                <div className='absolute flex items-center justify-center  w-52 h-full top-0 right-0'>
                                    {graphqlToken ? (
                                        <button onClick={() => setCheckout(true)}
                                                className='bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white py-1 px-3 '>{graphqlToken ? 'checkour' : 'sadsadsa'}</button>
                                    ) : (
                                        <p>Please Login In</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Order;
