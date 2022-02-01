import {FC} from "react"

interface IPagination {
    pageCount: () => void
    updatePage: Function
}

const Pagination: FC<IPagination> = ({pageCount, updatePage}) => {
    return (
        <div className=' text-center mb-10'>
            {
                [...Array(pageCount).keys()].map(el => {
                    return (
                        <button
                            onClick={() => updatePage(el+1)}
                            className='bg-green-100 mx-1 w-7 h-7 rounded-full' key={el}
                        >
                            {el+1}
                        </button>
                    )
                })
            }
        </div>
    )
}
export default Pagination