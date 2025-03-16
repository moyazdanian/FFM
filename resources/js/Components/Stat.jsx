import Spinner from "@/Components/Spinner";
import SpinnerMini from "./SpinnerMini";

export default function Stat({ color, icon, text, value, isLoading }) {
    const colorClass = color
        ? color === "green"
            ? "bg-green-100"
            : color === "red"
            ? "bg-red-100"
            : "bg-gray-200"
        : "bg-gray-200";
    const colorClassIcon = color
        ? color === "green"
            ? "text-green-700"
            : color === "red"
            ? "text-red-700"
            : "text-gray-700"
        : "text-gray-700";
    return (
        <div
            className={`${colorClass} border border-gray-200 p-5 rounded-lg grid grid-cols-[3rem_1fr] grid-rows-[auto_auto] text-wrap gap-y-2 gap-x-6`}
        >
            <div
                className={`row-[1/-1] aspect-square rounded-[50%] flex items-center justify-center text-[2.6rem] ${colorClassIcon}`}
            >
                {icon}
            </div>
            <h5 className="self-end font-bold text-sm uppercase  text-gray-700 break-words whitespace-normal ">
                {text}
            </h5>
            <p className="text-m font-[900] break-words whitespace-normal">
                {isLoading ? <SpinnerMini /> : value}
            </p>
        </div>
    );
}
