import React, {FC} from "react"
import {useQuery} from "@apollo/client";
import {GET_ALL_CATEGORIES} from "../lib/queries";
import Link from 'next/link'

interface ICategories {
    id: number
    attributes: {
        name: string
    }
}
const Categories = () => {
    const {data,loading,error} = useQuery(GET_ALL_CATEGORIES)
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