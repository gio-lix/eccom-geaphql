import React, {ChangeEvent, FC, SyntheticEvent, useEffect, useRef, useState} from "react"
import {useLazyQuery, useQuery} from "@apollo/client";
import {GET_PRODUCT_BY_NAME} from "../lib/queries";
import Link from 'next/link'

interface ISearch {

}
const Search: FC<ISearch> = () => {
    const searRef = useRef<HTMLInputElement | null>(null);
    const [nameSearch, setNameSearch] = useState<string>('');
    const [hideResult, setHideResult] = useState<boolean>(true);
    const [getProduct, {loading,error,data}] = useLazyQuery(GET_PRODUCT_BY_NAME, {
        variables: {
            "filters": {
                "name": {
                    "startsWith": nameSearch
                }
            }
        }
    })
    useEffect(() => {
        if (nameSearch.length != 0) {
            getProduct()
            setHideResult(true)
        }else {
            setHideResult(false)
        }
    }, [nameSearch,getProduct]);
    useEffect(() => {
        window.addEventListener('click', handleClickSearch)
        return () => window.removeEventListener('click', handleClickSearch)
    }, [searRef]);
    const handleClickSearch = (e: any) => {
        if (!e.path.includes(searRef.current)) {
            setNameSearch('')
            setHideResult(false)
        }
    }
  return (
      <>
          <div  className='px-10 my-6'>
              <div className="container mx-auto w-full h-10 pl-3 pr-2 bg-white border rounded-lg flex justify-between items-center relative">
                  <input ref={searRef}
                         value={nameSearch}
                         onChange={e => setNameSearch(e.target.value)}
                         type="search" name="search" id="search"
                         placeholder="Search"
                         className="appearance-none w-full outline-none focus:outline-none active:outline-none"
                  />
                  <button type="submit" className="ml-1 outline-none focus:outline-none active:outline-none">
                      <svg fill="none" stroke="currentColor"
                           viewBox="0 0 24 24" className="w-6 h-6">
                          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"> </path>
                      </svg>
                  </button>
              </div>
          </div>
          {loading && (
              <div className='flex justify-center items-center'>
                  <p>Loading...</p>
              </div>
          )}
          {(data && hideResult) && (
              <div className='container mx-auto px-10 '>
                  {data?.products?.data.map(({id, attributes}: any) => (
                      <div key={id} className=''>
                          <Link href={`/product/${id}`}>
                              <a>
                                  <p className='mb-2 '>{attributes.name}</p>
                              </a>
                          </Link>
                      </div>
                  ))}
              </div>
          )}
      </>
  )
}
export default Search