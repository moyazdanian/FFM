export default function DeleteModal({handleDelete , onClose}){

    return <div className='p-5'>
        <h3 className='font-bold'> are you sure you want to delete this item?</h3>
        <h5 className='text-sm '>deleted item cannot be return</h5>
        <div className='flex justify-end gap-4'>
        <button className='bg-green-300 p-3 rounded-lg mt-3' onClick={handleDelete}>yes , i&apos;m sure</button>
        <button className='bg-red-300 p-3 rounded-lg mt-3' onClick={onClose}>cancel</button>
        </div>
    </div>
}
