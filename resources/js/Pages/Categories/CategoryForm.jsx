import RootLayout from "@/Layouts/RootLayout.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import { useForm} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import toast from "react-hot-toast";

export default function CategoryForm({category}){
    const { data, setData, post, processing, errors, reset } = useForm({
        name: category ? category.name : '',
        type: category ? category.type : '',
        category_id: category ? category.id : null
    });
    function handleSubmit(e) {
        e.preventDefault()
         post(route('category.store') , {
             onSuccess: ()=>{
                 if(category){
                     toast.success('category updated')
                 }else{
                 toast.success('category created!')
                 }
                 reset()
             },
             onError: () =>{
                 toast.error('something went wrong!')
             }
         })

    }

    return <RootLayout>
        <div className='w-3/4 mx-auto border p-5 border-gray-100 rounded-lg bg-primary-200'>
            <h2 className='text-center pb-5 font-bold'>{category ? 'edit category' : 'submit category'}</h2>
            <form onSubmit={handleSubmit}>

                <div>
                    <InputLabel htmlFor="name" value="name" />

                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="categry name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="type" value="type" />

                    <select className='w-full rounded-lg p-2 mb-4 mt-2' name='type' onChange={(e) => setData('type', e.target.value)}>
                        <option>select</option>
                        <option selected={data.type === 'expense'} value='expense'>expense</option>
                        <option selected={data.type === 'income'} value='income'>income</option>
                    </select>

                    <InputError message={errors.type} className="mt-2" />
                </div>
                <input type='hidden' name='category_id' value={category ? category.id : ''} />
                <div>

                    <PrimaryButton className="mx-auto" disabled={processing}>
                        Submit
                    </PrimaryButton>
                </div>
            </form>
        </div>
    </RootLayout>
}
