import {router, usePage} from "@inertiajs/react";

export default function Filter({categories}) {
    const {url} = usePage();
    const params = new URLSearchParams(url.split('?')[1])
    const selectedCategory = params.get('category')||'';

    function handleChange(e) {
        const newCategory = e.target.value;
        router.get(route('transactions.index' , newCategory ? {'category': newCategory} : {} , {preserveState: true}))
    }

    return <select className='w-full rounded-lg px-8 mb-2' value={selectedCategory} onChange={handleChange}>
        <option value=''>All Categories</option>
        {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
    </select>
}
