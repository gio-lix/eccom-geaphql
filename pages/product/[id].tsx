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
import {parseCookies} from "nookies";
import {AiOutlineCheck} from "react-icons/ai";

const Product = () => {
    const {query} = useRouter()
    const router = useRouter()
    const [addSize, setAddSize] = useState<any>('');
    const [addColor, setAddColor] = useState<string>('');
    const {state, dispatch} = useContext(createStore)
    const {graphqlToken} = parseCookies()

    const [count, setCount] = useState<number>(0);
    const {data, loading, error} = useQuery(GET_PRODUCT_BY_ID, {variables: {productId: Number(query.id)}})
    if (loading) return (
        <Layout>
            <div className='flex justify-center mt-52'>
                <ClipLoader loading={loading} size={50}/>
            </div>
        </Layout>
    )

    const {images, size: sizes, name, description, price, colors} = data?.product?.data?.attributes

    const img = images?.data[count]?.attributes?.url
    const newSize = addColor ? addColor : sizes[0]
    const newColor = addColor || colors?.colors_values[0]

    const handleClick = () => {
        if (count === images?.data.length - 1) {
            setCount(0)
            return
        }
        setCount(count + 1)
    }
    const handleClickPrev = () => {
        if (count === 0) {
            setCount(images?.data.length - 1)
            return
        }
        setCount(count - 1)
    }
    const handleCart = () => {
        dispatch({
            type: "ADD_CART",
            payload: {...data?.product?.data?.attributes, size: newSize, color: newColor, id: data?.product?.data?.id}
        })
    }

    return (
        <Layout>
            <div className='container mx-auto mt-3 '>
                <div className='grid grid-cols-8 '>
                    <div className='col-span-5  flex relative'>
                        <div className='absolute '>
                            <img src={`${BACKAND_URL}${img}`} className='w-full ' alt={name}/>
                            <div className='absolute flex items-center justify-between px-3 top-0 z-10 w-full h-full  '>
                                {images.data.length > 1 && (
                                    <>
                                        <button onClick={handleClick}
                                                className='p-4  bg-black bg-opacity-40 text-white '>prev
                                        </button>
                                        <button onClick={handleClickPrev}
                                                className='p-4  bg-black bg-opacity-40 text-white '>next
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='col-span-3'>
                        <h1 className='text-center font-semibold'>{name}</h1>
                        <div className='flex space-x-2 justify-start my-3 px-2'>
                            <p className='font-medium text-gray-700'>Price</p>
                            <span className='font-medium'>${price}</span>
                        </div>
                        <div className='relative flex justify-start space-x-5  px-2'>
                            <h3>Size: </h3>
                            <div className='absolute left-10'>
                                {sizes?.map((e: string[], i: number) => (
                                    <button onClick={() => setAddSize(e)}
                                            className={`${addSize === e ? 'bg-black' : ' bg-gray-500'} hover:bg-black text-white ml-2 w-8 h-8 text-center`}
                                            key={i}>
                                        {e}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className='relative flex justify-start space-x-5 my-3  px-2'>
                            <h3>Colors: </h3>
                            <div className='absolute left-10'>
                                {colors?.colors_values?.map((e: string, i: number) => {
                                    return (
                                        <button onClick={() => setAddColor(e)}
                                                style={{backgroundColor: `${e}`}}
                                                className={`${e === '#ffffff' && "border border-black"} relative ml-2  hover:bg-black text-white w-8 h-8 text-center`}
                                                key={i}>
                                            <div
                                                className={`${addColor === e && 'bg-gray-600 bg-opacity-40 '} absolute top-0 left-0  w-full h-full`}>
                                                <p className={`${addColor === e ? "inline-flex" : 'hidden'} absolute`}>
                                                    <AiOutlineCheck
                                                        className='text-green-200  absolute top-2 -left-2 z-20'/>
                                                </p>
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>

                        </div>
                        <p className='text-start px-2 indent-4 my-3 text-gray-700'>{description}</p>
                        <div className='flex justify-center space-x-10 '>
                            <div onClick={handleCart} className="p-2 md:w-40 group cursor-pointer">
                                <div
                                    className="flex items-center group p-4 bg-green-200 rounded-lg shadow-xs cursor-pointer hover:bg-green-500 hover:text-gray-100">
                                    <GrAdd className='w-6 h-6 group-hover:text-white'/>
                                    <div>
                                        <p className=" text-xs font-medium ml-2 ">
                                            {!graphqlToken ? (
                                                <p onClick={() => router.push('/account/login')}>Login</p>
                                            ) : (
                                                <p>Add Cart</p>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div onClick={() => router.push('/order')} className="p-2 md:w-40 group ">
                                <div
                                    className="flex items-center p-4 bg-red-200 rounded-lg shadow-xs cursor-pointer hover:bg-red-500 hover:text-gray-100">
                                    <BiShow className='w-6 h-6 group-hover:text-white'/>
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
