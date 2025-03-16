export default function ChartScafold({title , children}) {
    return <div className='mt-6 bg-gray-200 rounded-lg '>
        <h4 className='text-gray-800 p-6 uppercase text-lg font-bold'>{title}</h4>


        <div className=' px-5 py-4  mt-2 h-[20rem] md:px-9'>
            {children}
        </div>
    </div>
}
