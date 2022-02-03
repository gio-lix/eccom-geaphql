import type { NextPage } from 'next'
import {GET_ALL_PRODUCTS, GET_CURRENCY} from "../lib/queries";
import Cart from "../components/Cart";
import Layout from "../components/Layout";
import Pagination from "../components/Pagination";
import React, {useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import ClipLoader from "react-spinners/ClipLoader";


const Home: NextPage = () => {
    const [page, setPage] = useState(1);
    const {data,loading,error, refetch} = useQuery(GET_ALL_PRODUCTS, {
        variables: {
            "pagination": {
                "page": page,
                "pageSize": 3
            }
        }})

    useEffect(() => {
       if (page != 1)  refetch()
    },[page])
    const updatePage = (page: any) => {
        setPage(page)
    }
  return (
    <Layout>
        {loading && (
            <div className='w-full h-96 flex justify-center items-center '>
                <ClipLoader   loading={loading}  size={50} />
            </div>
        )}
      <div className='container mx-auto '>
          <div className="px-10 py-10  grid gap-10 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 ">
              {data?.products?.data?.map(({id, attributes}: any) => <Cart id={id} cart={attributes} key={id} />)}
          </div>
          <Pagination updatePage={updatePage} pageCount={data?.products?.meta?.pagination?.pageCount}/>
      </div>
    </Layout>
  )
}

export default Home
// export const getStaticProps = async () => {
//     const { data } = await apolloClient.query({ query: GET_ALL_PRODUCTS, variables: {
//             "pagination": {
//                 "page": 2,
//                 "pageSize": 3
//             }
//         }});
//     return {
//         props: {data}
//     }
// }
