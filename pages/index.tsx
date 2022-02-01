import type { NextPage } from 'next'
import Head from 'next/head'
import {GET_ALL_PRODUCTS} from "../lib/queries";
import apolloClient from "../lib/apollo";
import Cart from "../components/Cart";
import Layout from "../components/Layout";
import Search from "../components/Search";


const Home: NextPage = ({data}: any) => {
  return (
    <Layout>
      <div className='container mx-auto'>
          <div className="px-10 py-10 bg-gray-100 grid gap-10 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 ">
              {data?.products?.data.map(({id, attributes}: any) => <Cart id={id} cart={attributes} key={id} />)}
          </div>
      </div>
    </Layout>
  )
}

export default Home
export const getStaticProps = async () => {

    const { data } = await apolloClient.query({ query: GET_ALL_PRODUCTS});
    return {
        props: {data}
    }

}
