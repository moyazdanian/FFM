import { router, usePage } from "@inertiajs/react";
import {
    HiArrowLongLeft,
    HiBars2,
    HiOutlineArrowLeft,
    HiOutlineArrowLongLeft,
    HiOutlinePhoneArrowDownLeft,
    HiUser,
} from "react-icons/hi2";
import { HiAdjustments, HiArrowSmDown, HiLogout } from "react-icons/hi";
import { useEffect, useState } from "react";
import NavLink from "@/Components/NavLink.jsx";

export default function Sidebar({ showSidebar }) {
    const [showDropDown, setShowDropDown] = useState(false);
    const [showTransactionsDropDown, setShowTransactionsDropDown] =
        useState(false);
    const { url } = usePage();

    useEffect(() => {
        if (url.startsWith("/category")) {
            setShowDropDown(true);
        }
        if (url.startsWith("/transactions")) {
            setShowTransactionsDropDown(true);
        }
    }, [url]);

    return (
        <aside
            className={`fixed top-[50px] left-0 z-40 w-64 h-screen transition-transform duration-300 ${
                showSidebar ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            <div className="h-full px-3 py-4 overflow-y-auto bg-gradient-to-b from-gray-800/80 via-gray-950/80 to-gray-600/80 backdrop-blur-md">
                <ul className="font-medium">
                    <li className="my-3">
                        <NavLink href={route("dashboard")}>
                            <HiAdjustments />
                            dashboard
                        </NavLink>
                    </li>
                    <button
                        type="button"
                        onClick={() => setShowDropDown(!showDropDown)}
                        className="flex items-center w-full justify-between gap-4 p-2 my-3 rounded-lg text-white transition duration-75 hover:bg-gray-700"
                    >
                        <div className="flex gap-4">
                            <HiBars2 />
                            <span>Categories</span>
                        </div>
                        <div>
                            <HiArrowSmDown />
                        </div>
                    </button>

                    <ul
                        className={`py-2 space-y-2 transition-all duration-100 ${
                            showDropDown ? "" : "hidden"
                        }`}
                    >
                        <li>
                            <NavLink
                                href={route("category.index")}
                                className={
                                    "transition duration-100 pl-11 group"
                                }
                            >
                                All Categories
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                href={route("category.create")}
                                className={
                                    "transition duration-100 pl-11 group"
                                }
                            >
                                Create Category
                            </NavLink>
                        </li>
                    </ul>
                    <button
                        type="button"
                        onClick={() =>
                            setShowTransactionsDropDown(
                                !showTransactionsDropDown
                            )
                        }
                        className="flex items-center w-full justify-between gap-4 p-2 my-3 rounded-lg text-white transition duration-75 hover:bg-gray-700"
                    >
                        <div className="flex gap-4">
                            <HiBars2 />
                            <span>Transactions</span>
                        </div>
                        <div>
                            <HiArrowSmDown />
                        </div>
                    </button>
                    <ul
                        className={`py-2 space-y-2 transition-all duration-100 ${
                            showTransactionsDropDown ? "" : "hidden"
                        }`}
                    >
                        <li>
                            <NavLink
                                href={route("transactions.index")}
                                className={
                                    "transition duration-100 pl-11 group"
                                }
                            >
                                All Transactions
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                href={route("transactions.create")}
                                className={
                                    "transition duration-100 pl-11 group"
                                }
                            >
                                Create transaction
                            </NavLink>
                        </li>
                    </ul>
                    <li className="my-3">
                        <NavLink href={route("profile.edit")}>
                            <HiUser />
                            Profile
                        </NavLink>
                    </li>
                </ul>
                <ul className="font-medium mt-10">
                    <li>
                        <button
                            onClick={() => {
                                router.post(route("logout"), null, {
                                    onSuccess: () => router.visit("/"),
                                });
                            }}
                            type="button"
                            className="flex items-center w-full p-2 text-white rounded-lg transition duration-75 group hover:bg-gray-700"
                        >
                            <HiOutlineArrowLeft className="mr-3" />
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    );
}
