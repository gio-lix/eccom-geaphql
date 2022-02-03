import {ChangeEvent, FC, useContext, useEffect, useState} from "react"
import Link from "next/link";
import {useRouter} from "next/router";
import { parseCookies, destroyCookie } from 'nookies'
import {createStore} from "../context/store";
import Categories from "./Categories";
import {useQuery} from "@apollo/client";
import {GET_CURRENCY} from "../lib/queries";



const Navbar = () => {
    const {graphqlToken} = parseCookies()
    const router = useRouter()

    const {state, dispatch} = useContext(createStore)
    const {data,loading} = useQuery(GET_CURRENCY)
    const currency = data?.currencies?.data[0].attributes?.currency
    const [price, setPrice] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) =>  setPrice(e.target.value)


    useEffect(() => dispatch({type: "CURRENCY", payload: price}) ,[price])
    const handleLogout = () => {
        destroyCookie(null, 'graphqlToken')
        router.push('/')
    }
  return (
     <>
        <div className='flex justify-between items-center container mx-auto h-10'>
            <h1 onClick={() => router.push('/')} className='text-3xl cursor-pointer font-semibold text-gray-300'>
                LOGO
            </h1>
            <Categories />
            <nav>
                <ul className='flex space-x-3'>
                    <li>
                        {!loading && (
                            <select onChange={handleChange} name="currency" className='outline-none'>
                                {currency?.map((e: string, i: number) => (
                                    <option key={i} value={e}>{e}</option>
                                ))}
                            </select>
                        )}
                    </li>
                    {(graphqlToken) ? (
                        <>
                            <li>
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                            <li>
                                <Link href='/order'>
                                    <a className='px-4 bg-green-400 font-bold align-middle text-white py-0.5 rounded-xl'>Cart  {state?.cart?.length > 0 && state?.cart?.length} </a>
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link href='/account/login' >
                                    <a>Login</a>
                                </Link>
                            </li>
                            <li>
                                <Link href='/account/register' >
                                    <a>Register</a>
                                </Link>
                            </li>
                        </>
                    )}

                </ul>
            </nav>
        </div>
     </>
  )
}
export default Navbar