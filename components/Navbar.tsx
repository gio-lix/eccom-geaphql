import {FC, useContext} from "react"
import Link from "next/link";
import {useRouter} from "next/router";
import { parseCookies, destroyCookie } from 'nookies'
import {createStore} from "../context/store";
import Categories from "./Categories";


interface INavbar {

}
const Navbar: FC<INavbar> = () => {
    const {graphqlToken} = parseCookies()
    const router = useRouter()
    const {state} = useContext(createStore)
    const handleLogout = () => {
        destroyCookie(null, 'graphqlToken')
        router.push('/')
    }
  return (
     <>
        <div className='flex justify-between items-center px-10 h-10'>
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
                                    <a>Cart  {state?.cart?.length} </a>
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