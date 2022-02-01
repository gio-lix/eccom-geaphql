import React, {FC} from "react"
import {useQuery} from "@apollo/client";
import {GET_ALL_CATEGORIES} from "../lib/queries";
import ClipLoader from "react-spinners/ClipLoader";
import Link from 'next/link'

interface ICategories {
    id: number
    attributes: {
        name: string
    }
}
const Categories = () => {
    const {data,loading,error} = useQuery(GET_ALL_CATEGORIES)

    if (loading) return (
        <div className='flex justify-center mt-52'>
            <ClipLoader   loading={loading}  size={50} />
        </div>
    )
    return (
        <>
            <div className='flex space-x-2'>
                {data?.categories?.data.map(({id, attributes}: ICategories) => (
                    <div key={id}>
                        <Link href={`/category/${id}`} >
                            <a>
                                <h4 className='font-medium uppercase text-gray-600 cursor-pointer hover:text-black'>{attributes.name}</h4>
                            </a>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}
export default Categories