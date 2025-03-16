import RootLayout from "@/Layouts/RootLayout.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {useForm} from "@inertiajs/react";
import toast from "react-hot-toast";

export default function InitialAmount({initialAmount}) {
    console.log(initialAmount)
    const{data , setData , post , processing , errors , reset } = useForm({
        initial_amount:Number(initialAmount)
    })

    function handleSubmit(e) {
        e.preventDefault()
        post(route('initial-amount.update') , {
            onSuccess: ()=>{
                toast.success('initial amount changed');
            }
        })
    }
    return <RootLayout>
        <div className='w-3/4 mx-auto border p-5 border-gray-100 rounded-lg bg-primary-200'>
            <form onSubmit={handleSubmit}>

                <div>
                    <InputLabel htmlFor="initial_amount" value="initial amount" />

                    <TextInput
                        id="initial_amount"
                        type="number"
                        name="initial_amount"
                        value={data.initial_amount}
                        className="mt-1 block w-full"
                        autoComplete="categry name"
                        isFocused={true}
                        onChange={(e) => setData('initial_amount', e.target.value)}
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className='mt-3'>
                    <PrimaryButton className="mx-auto" disabled={processing}>
                        Submit
                    </PrimaryButton>
                </div>
            </form>
        </div>
    </RootLayout>
}
