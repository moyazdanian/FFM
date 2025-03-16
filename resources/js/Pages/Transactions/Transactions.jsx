import RootLayout from "@/Layouts/RootLayout.jsx";
import Category from "@/Components/Category.jsx";
import Transaction from "@/Components/Transaction.jsx";
import TextInput from "@/Components/TextInput.jsx";
import {useMemo, useState} from "react";
import Filter from "@/Components/Filter.jsx";
import {usePage} from "@inertiajs/react";

export default function Transactions({transactions , categories}) {
    const [searchValue , setSearchValue] = useState('');
    const {url} = usePage();
    const params = new URLSearchParams(url.split('?')[1])
    const selectedCategory = params.get('category')||null;

    let desplayTransactions = useMemo(()=>{
        if (!searchValue.trim()) return transactions;
        return transactions.filter((transaction) => transaction.description.toLowerCase().includes(searchValue.toLowerCase().trim()))
    } , [transactions , searchValue])

    if(!selectedCategory)  desplayTransactions=desplayTransactions;
    if(selectedCategory){
        desplayTransactions = desplayTransactions.filter((item) => item.category_id == selectedCategory)
    }

    return <RootLayout>
        <div className='w-[90%] mx-auto p-5 border border-gray-100 rounded-lg overflow-auto  bg-primary-200 '>
            <div className='flex justify-between gap-3'>
            <div>
                <TextInput type='text' placeholder='search' className='mb-2 w-full' value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
            </div>
            <div>
                <Filter categories={categories} />
            </div>
            </div>
            <table className='w-full text-center'>
                <thead className='w-full font-bold text-xs border border-b-gray-300 bg-primary-300 rounded-lg'>
                <tr>
                    <th className='p-3'>#</th>
                    <th className='p-3'>description</th>
                    <th className='p-3 '>category</th>
                    <th className='p-3 '>amount</th>
                    <th className='p-3 '>actions</th>
                </tr>
                </thead>
                <tbody className='text-sm'>
                {desplayTransactions.map((transaction , index) => <Transaction key={transaction.id} transaction={transaction} loop={index} />)}
                </tbody>
            </table>
        </div>
    </RootLayout>
}
