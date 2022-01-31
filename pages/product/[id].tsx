import React, {useContext, useState} from 'react';
import Layout from "../../components/Layout";
import {useQuery} from "@apollo/client";
import {GET_PRODUCT_BY_ID} from "../../lib/queries";
import {useRouter} from "next/router";
import ClipLoader from "react-spinners/ClipLoader";
import {BACKAND_URL} from "../../helper";
import {createStore} from "../../context/store";
import {GrAdd} from "react-icons/gr";
import {BiShow} from "react-icons/bi";

const Product = () => {
    const {query} = useRouter()
    const router = useRouter()
    const {state, dispatch} = useContext(createStore)

    const [count, setCount] = useState<number>(0);
    const {data , loading, error} = useQuery(GET_PRODUCT_BY_ID, { variables: {  productId: Number(query.id)} })
    if (loading) return (
            <div className='flex justify-center top-52'>
                <ClipLoader   loading={loading}  size={50} />
            </div>
    )

    const {images,  name, description, price} = data?.product?.data?.attributes


    const img = images?.data[count]?.attributes?.url
    const handleClick = () => {
        if (count === images.data.length - 1) {
            setCount(0)
            return
        }
        setCount(count + 1)
    }
    console.log('data?.product?.data?.attributes', data?.product?.data?.attributes)
    console.log(state)
    const handleCart = () => {
        dispatch({type: "ADD_CART", payload: {...data?.product?.data?.attributes, id: data?.product?.data?.id}})
    }

    return (
        <Layout>
            <div className='container mx-auto mt-3'>
                <div className='grid grid-cols-8 '>
                    <div  className='col-span-5  flex relative'>
                            <div className='absolute '>
                                    <img  src={`${BACKAND_URL}${img}`} className='w-full ' alt={name}/>
                                <div  className='absolute flex items-center justify-end top-0 z-10 w-full h-full border border-black '>
                                    {images.data.length > 1 && (
                                        <button onClick={handleClick} className='p-3 bg-black bg-opacity-40 text-white '>next</button>
                                    )}
                                </div>
                            </div>

                    </div>

                    {/*<div className='col-span-5 bg-red-100'>*/}
                    {/*    <img  src={`${BACKAND_URL}${img}`} className='w-full ' alt={name}/>*/}
                    {/*</div>*/}

                    <div className='col-span-3 '>
                        <h1 className='text-center font-semibold'>{name}</h1>
                        <div className='flex space-x-2 justify-center my-3'>
                            <p className='font-medium text-gray-700'>Price</p>
                            <span className='font-medium'>${price}</span>
                        </div>
                        <p className='text-center my-3 text-gray-500'>{description}</p>
                        <div className='flex space-x-10 '>
                            <div onClick={handleCart} className="p-2 md:w-40 group cursor-pointer">
                                <div
                                    className="flex items-center group p-4 bg-green-200 rounded-lg shadow-xs cursor-pointer hover:bg-green-500 hover:text-gray-100">
                                    <GrAdd className='w-6 h-6 group-hover:text-white' />
                                    <div>
                                        <p className=" text-xs font-medium ml-2 ">
                                            Add Cart
                                        </p>

                                    </div>
                                </div>
                            </div>

                            <div onClick={() => router.push('/order')} className="p-2 md:w-40 group ">
                                <div
                                    className="flex items-center p-4 bg-red-200 rounded-lg shadow-xs cursor-pointer hover:bg-red-500 hover:text-gray-100">

                                    <BiShow className='w-6 h-6 group-hover:text-white' />
                                    <div>
                                        <p className=" text-xs font-medium ml-2 ">
                                            show order
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </Layout>
    );
};

export default Product;
