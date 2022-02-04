import React, {useContext, useState} from 'react';
import Layout from "../components/Layout";
import {createStore} from "../context/store";
import {BACKAND_URL} from "../helper";
import {MdDelete} from "react-icons/md";
import {parseCookies} from "nookies";
import Checkout from "../components/Checkout";
import {GrFormAdd} from "react-icons/gr";
import {AiOutlineMinus} from "react-icons/ai";
import {useQuery} from "@apollo/client";
import {GET_SIZE} from "../lib/queries";

const Order = () => {
    const {state, dispatch} = useContext(createStore)
    const [selectColor, setSelectColor] = useState<any>();
    const [selectSize, setSelectSize] = useState<any>();
    const [checkout, setCheckout] = useState<boolean>(false);
    const {data, loading, error} = useQuery(GET_SIZE)
    const {graphqlToken} = parseCookies()

    const funcTotal = (item: any) => {
        return state?.cart && item.reduce((acc: any, a: any) => {
            return acc + a.price * a.qty
        }, 0).toFixed(2)
    }

    if (checkout) return <Checkout setCheckout={setCheckout}/>
    const handleBasketAdd = (item: number) => {
        const addCart = state?.cart?.filter((el: any) => el.id === item)
        dispatch({type: "ADD_CART", payload: {...addCart[0], id: addCart[0].id}})
    }
    const handleMinus = (item: any) => {
        const addCart = state?.cart?.filter((el: any) => el.id === item)
        if (addCart[0].qty < 2) return
        dispatch({type: "MINUS_CART", payload: {...addCart[0], id: addCart[0].id}})
    }


    const functionSize = (item: any) => {
        return item?.products?.data?.reduce((acc: any, el: any) => {
            return {...acc, [el.id]: el?.attributes?.size}
        }, [])
    }


    const functionColor = (item: any) => {
        return item?.products?.data?.reduce((acc: any, el: any) => {
            return {...acc, [el.id]: el?.attributes?.colors?.colors_values}
        }, [])
    }

    const handleChange = (e:any, id: any) => {
        const filterState = state?.cart?.filter((e: any) => e.id === id.id)
        dispatch({
            type: "ADD_CART",
            payload: {...filterState[0], size: e.target.value,  id: id.id}
        })
    }
    const handleChangeColor = (e: any, id: any) => {
        const filterState = state?.cart?.filter((e: any) => e.id === id.id)
        const selector = {id: id.id, color: e.target.value}
        setSelectColor(selector)
        dispatch({
            type: "ADD_CART",
            payload: {...filterState[0], color: e.target.value,  id: id.id}
        })
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
                    <div className=' flex items-center justify-center  w-52 h-full top-0 right-0'>
                        {graphqlToken ? (
                            <button onClick={() => setCheckout(true)}
                                    className='bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white py-1 px-3 '>{graphqlToken ? 'checkour' : 'sadsadsa'}</button>
                        ) : (
                            <p>Please Login In</p>
                        )}
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
                                        className="pr-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        color
                                    </th>
                                    <th
                                        className=" py-3 border-b-2 border-gray-200 bg-gray-100  text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Size
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
                                                                 alt="img"
                                                            />
                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {el.name}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className=' text-xl border-b border-gray-200 '>

                                                    <select
                                                        style={{backgroundColor: `${(el.id === selectColor?.id && selectColor?.color) || el.color}`}}
                                                        onChange={(e) => handleChangeColor(e, el)}
                                                        className={`select outline-none bg-gray-700 w-[40px] text-white text-xl border-b border-gray-200 cursor-pointer`}>

                                                        <option  style={{backgroundColor: `${(el.id === selectColor?.id && selectColor?.color) || el.color}`}} className='hidden'> </option>
                                                        {!loading && functionColor(data)[el.id].map((e: any, i: number) => (
                                                            <option key={i} style={{backgroundColor: `${e}`}} value={e}
                                                                    className='w-5   h-5 '> </option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    {el.size != null && (
                                                        <select onChange={(e) => handleChange(e, el)}
                                                                className='select cursor-pointer text-center outline-none bg-gray-700 w-[37px] text-white text-xl border-b border-gray-200'>
                                                            <option className='hidden'>{el.size}</option>
                                                            {!loading && functionSize(data)[el.id]?.map((el: any, i: number) => (
                                                                <option key={i} value={el}>{el}</option>
                                                            ))}
                                                        </select>
                                                    )}
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <div className='flex space-x-2 '>
                                                        <button onClick={(item) => handleMinus(el.id)}
                                                                className='w-7 h-7 flex justify-center items-center border border-green-400'>
                                                            <AiOutlineMinus className='text-xl'/>
                                                        </button>
                                                        <button onClick={(item) => handleBasketAdd(el.id)}
                                                                className='w-7 h-7 flex justify-center items-center border border-green-400'>
                                                            <GrFormAdd className='text-xl'/>
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
                                className="px-5 py-5 bg-white border-t relative flex flex-col xs:flex-row items-center xs:justify-between "> </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Order;
