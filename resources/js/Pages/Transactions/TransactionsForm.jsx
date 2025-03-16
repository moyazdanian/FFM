import RootLayout from "@/Layouts/RootLayout.jsx";
import {useForm} from "@inertiajs/react";
import toast from "react-hot-toast";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import SpinnerMini from "@/Components/SpinnerMini.jsx";

export default function TransactionsForm({categories}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        description: '',
        category_id:'',
        amount:''
    });

    function handleSubmit(e){
        e.preventDefault()
        post(route('transactions.store') , {
            onSuccess: ()=>{
                toast.success('new transaction created!')
                reset()
            },
            onError: (err) => {
                toast.error(err.error)
            }
        })
    }

    return <RootLayout>
        <div className='w-3/4 mx-auto border p-5 border-gray-100 rounded-lg bg-primary-200'>
            <h2 className='text-center pb-5 font-bold'>submit new transaction</h2>
            <form onSubmit={handleSubmit}>

                <div>
                    <InputLabel htmlFor="description" value="description" />

                    <TextInput
                        id="description"
                        type="text"
                        name="description"
                        value={data.description}
                        className="mt-1 block w-full"
                        placeholder="e.g. 1kilo apple"
                        isFocused={true}
                        onChange={(e) => setData('description', e.target.value)}
                    />

                    <InputError message={errors.description} />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="category_id" value="category" />

                    <select className='w-full rounded-lg p-2 mb-4 mt-2' value={data.category_id} name='category_id' onChange={(e) => setData('category_id', e.target.value)}>
                        <option value=''>select</option>
                        {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                    </select>

                    <InputError message={errors.category_id} />
                </div>

                <div>
                    <InputLabel htmlFor="amount" value="amount" />

                    <TextInput
                        id="amount"
                        type="number"
                        name="amount"
                        value={data.amount}
                        className="mt-1 block w-full"
                        placeholder="e.g. 10"
                        isFocused={true}
                        onChange={(e) => setData('amount', e.target.value)}
                    />

                    <InputError message={errors.amount} />
                </div>

                <div>

                    <PrimaryButton className="mx-auto mt-4">
                        {processing ? <SpinnerMini /> : 'submit'}
                    </PrimaryButton>
                </div>
            </form>
        </div>
    </RootLayout>
}
