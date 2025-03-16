import RootLayout from "@/Layouts/RootLayout.jsx";
import Category from "@/Components/Category.jsx";
import { Input } from "postcss";
import TextInput from "@/Components/TextInput.jsx";
import { useMemo, useState } from "react";

export default function Categories({ categories }) {
    const [searchValue, setSearchValue] = useState("");

    const displayCategories = useMemo(() => {
        if (!searchValue.trim()) return categories;
        return categories.filter((category) =>
            category.name.toLowerCase().includes(searchValue.toLowerCase())
        );
    }, [categories, searchValue]);

    return (
        <RootLayout>
            <div className="w-[90%] mx-auto p-5 border border-gray-100 rounded-lg overflow-auto bg-primary-200 ">
                <div>
                    <TextInput
                        type="text"
                        placeholder="search"
                        className="mb-2"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </div>
                <table className="w-full text-center">
                    <thead className="w-full font-bold text-xs border border-b-gray-300 bg-primary-300 rounded-lg">
                        <tr>
                            <th className="p-3">#</th>
                            <th className="p-3">name</th>
                            <th className="p-3 ">type</th>
                            <th className="p-3 ">actions</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {displayCategories.map((category, index) => (
                            <Category
                                key={category.id}
                                loop={index}
                                category={category}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </RootLayout>
    );
}
