import React from 'react';
import Layout from "../../components/Layout";
import {useRouter} from "next/router";
import {useQuery} from "@apollo/client";
import { GET_PRODUCTS_BY_CATEGORIES} from "../../lib/queries";
import ClipLoader from "react-spinners/ClipLoader";
import Cart from "../../components/Cart";

const CategoryPage = () => {
    const {query} = useRouter()
    const {data , loading, error} = useQuery(GET_PRODUCTS_BY_CATEGORIES, { variables: {  categoryId: Number(query.id)} })

    return (
        <Layout>
            {loading && (
                <div className='w-full h-96 flex justify-center items-center '>
                    <ClipLoader   loading={loading}  size={50} />
                </div>
            )}
            {error && (
                <div className='flex justify-center items-center '>
                    <h4 className='text-red-600 font-bold text-3xl'>Error</h4>
                </div>
            )}
            <div className='container mx-auto  '>
                <div className="px-10 py-10   grid gap-10 lg:grid-cols-2 place-items-center  sm:grid-cols-2 ">
                    {data?.category?.data?.attributes?.products?.data?.map(({id, attributes}: any) => <Cart id={id} cart={attributes} key={id} />)}
                </div>
            </div>
        </Layout>
    );
};

export default CategoryPage;
