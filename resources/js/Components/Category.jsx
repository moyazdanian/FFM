import { HiEye, HiTrash } from "react-icons/hi2";
import { router } from "@inertiajs/react";
import toast from "react-hot-toast";
import Modal from "@/Components/Modal.jsx";
import { useState } from "react";
import DeleteModal from "@/Components/DeleteModal.jsx";

export default function Category({ category, loop }) {
    const [showModal, setShowModal] = useState(false);

    function handleEdit() {
        router.get(route("category.edit", category.id));
    }

    function handleDelete(e) {
        e.preventDefault();
        router.delete(route("category.destroy", category.id), {
            onSuccess: (data) => {
                toast.success("category deleted!");
            },
            onError: (err) => {
                toast.error(err.message);
            },
        });
    }

    return (
        <>
            <tr className="border border-r-gray-300">
                <td className="border border-r-gray-300 border-b-gray-300 p-2">
                    {loop + 1}
                </td>
                <td className="border border-r-gray-300 border-b-gray-300 p-2">
                    {category.name}
                </td>
                <td className="border border-r-gray-300 border-b-gray-300 p-2">
                    {category.type}
                </td>
                <td className="border border-b-gray-300 p-2 flex gap-3 items-center text-lg">
                    <HiTrash
                        className="cursor-pointer"
                        color="red"
                        onClick={() => setShowModal(!showModal)}
                    />
                    <HiEye
                        className="cursor-pointer"
                        onClick={handleEdit}
                        color="gray"
                    />
                </td>
            </tr>

            {showModal && (
                <Modal onClose={() => setShowModal(false)} show={true}>
                    <DeleteModal
                        handleDelete={handleDelete}
                        onClose={() => setShowModal(false)}
                        category={category}
                    />
                </Modal>
            )}
        </>
    );
}
