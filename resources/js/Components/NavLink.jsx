import {Link, usePage} from '@inertiajs/react';

export default function NavLink({href , children , className }) {
    const {url} = usePage();
    const isActive = new URL(href, window.location.origin).pathname === url

    return (
        <Link
           href={href}
           className={`flex items-center w-full gap-4 p-2 rounded-lg text-white ${className} ${
               isActive ? "bg-gray-700" : ""
           } hover:bg-gray-700`}
        >
            {children}
        </Link>
    );
}
