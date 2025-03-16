import Header from "@/Components/Header.jsx";
import {Toaster} from "react-hot-toast";

export default function RootLayout({children}){

    return (
        <>
            <Toaster/>
            <Header />
            <main className='bg-gradient-to-b from-gray-700 via-gray-900 to-gray-400 min-h-screen relative p-4 py-10'>
                {children}
            </main>

        </>
    );
}
