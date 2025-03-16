import {HiBars3, HiBars3BottomLeft, HiWallet} from "react-icons/hi2";
import {useState} from "react";
import Sidebar from "@/Components/Sidebar.jsx";
import {Link, usePage} from "@inertiajs/react";
import {formatCurrency} from "@/helpers/helpers.js";

export default function Header(){
    const {balance} = usePage().props

    const [showBar , setShowBar] = useState(false)
    const [showSidebar , setShowSidebar] = useState(false)
    return <>
    <header>
        <nav className='bg-gray-900 px-4 border-gray-200 dark:bg-gray-900 h-[50px]'>
            <div className='flex justify-between items-center pt-2'>
                <div>
                    <button onClick={() => setShowSidebar(!showSidebar)} className='inline-flex items-center p-2 text-xl text-gray-50 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 hover:bg-gray-700 focus:ring-gray-600'><HiBars3BottomLeft /></button>
                </div>
                <a href="" className="flex items-center">
                    <span className="self-center text-xl font-semibold whitespace-nowrap text-white">FFM</span>
                </a>

                <div>
                    <button onClick={() => setShowBar(!showBar)} className='inline-flex items-center p-2 text-xl ml-3 text-gray-50 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 hover:bg-gray-700 focus:ring-gray-600'><HiBars3 /></button>
                </div>

            </div>
        </nav>

            <div className={`bg-gray-800 text-center absolute w-full z-50 lg:flex lg:w-auto lg:order-1 transition-all duration-300 ease-in-out ${showBar ? 'opacity-100 scale-100' : ' opacity-0 scale-10 hidden'}`}>
                <ul className='py-3'>
                    <li className='flex items-center justify-center gap-4 text-lg '>
                        <HiWallet className='text-lg text-gray-100' /><span className='text-gray-100'>:</span> <span className='text-gray-100'>{formatCurrency(balance)}</span>
                    </li>
                    <li >
                        <Link href={route('initial-amount.index')} className='block py-2 pr-4 pl-3 text-primary-50 rounded hover:bg-primary-400'>set initial amount</Link>
                    </li>
                </ul>
            </div>

    </header>
         <Sidebar showSidebar={showSidebar} />
    </>
}
