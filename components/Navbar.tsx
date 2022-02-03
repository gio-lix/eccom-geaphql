import {FC, useContext} from "react"
import Link from "next/link";
import {useRouter} from "next/router";
import { parseCookies, destroyCookie } from 'nookies'
import {createStore} from "../context/store";
import Categories from "./Categories";



const Navbar = () => {
    const {graphqlToken} = parseCookies()
    const router = useRouter()
    const {state} = useContext(createStore)
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