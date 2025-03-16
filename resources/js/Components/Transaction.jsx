import {HiTrash} from "react-icons/hi2";
import Modal from "@/Components/Modal.jsx";
import DeleteModal from "@/Components/DeleteModal.jsx";
import {useState} from "react";
import {router} from "@inertiajs/react";
import toast from "react-hot-toast";
import {formatCurrency} from "@/helpers/helpers.js";

export default function Transaction({transaction , loop}) {
    const [showModal , setShowModal] = useState(false)

    function handleDelete(e) {
        e.preventDefault()
        router.delete(route('transactions.destroy' , transaction.id) , {
            onSuccess:()=>{
                toast.success('transaction deleted!')
            },
            onError: ()=>{
                toast.error('something went wrong!')
            }
        })
    }
    return <><tr className='border border-r-gray-300'>
        <td className='border border-r-gray-300 border-b-gray-300 p-2' >{loop + 1}</td>
        <td className='border border-r-gray-300 border-b-gray-300 p-2'>{transaction.description}</td>
        <td className='border border-r-gray-300 border-b-gray-300 p-2'>{transaction.category.name}</td>
        <td className='border border-b-gray-300 p-2'>{formatCurrency(transaction.amount)}</td>
        <td className='border border-b-gray-300 p-2 flex gap-3 items-center text-lg'>
            <HiTrash className='cursor-pointer' color='red' onClick={() => setShowModal(true)}  />
        </td>
    </tr>

        {showModal && <Modal onClose={() => setShowModal(false)} show={true}><DeleteModal onClose={() => setShowModal(false)} handleDelete={handleDelete}/></Modal>}
    </>
}
