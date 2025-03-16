import RootLayout from "@/Layouts/RootLayout.jsx";
import Stat from "@/Components/Stat.jsx";
import { HiBanknotes, HiDocumentCurrencyDollar } from "react-icons/hi2";
import { formatCurrency } from "@/helpers/helpers.js";
import ChartScafold from "@/Components/ChartScafold.jsx";
import Charts from "@/Components/Charts.jsx";
import { router } from "@inertiajs/react";
import { useState } from "react";
import Spinner from "@/Components/Spinner";

export default function Dashboard({
    todayIncome,
    todayExpense,
    categorySums,
    categoryIncomeSums,
    mostExpensedItems,
    mostIncomeItems,
    timeRange,
}) {
    const [isLoading, setIsLoading] = useState(false);
    const todayIncomeValue = todayIncome.reduce(
        (acc, income) => Number(income.amount) + Number(acc),
        0
    );

    const todayExpenseValue = todayExpense.reduce(
        (acc, expense) => Number(expense.amount) + Number(acc),
        0
    );

    const handleTimeRangeChange = (newRange) => {
        setIsLoading(true);
        router.get(
            route("dashboard"),
            {
                timeRange: newRange,
            },
            {
                preserveState: true,
                preserveScroll: true,
                onFinish: () => setIsLoading(false),
            }
        );
    };

    return (
        <RootLayout>
            <div className="overflow-hidden shadow-lg shadow-gray-800 sm:rounded-lg p-6 mb-6">
                <div className="flex gap-2">
                    <button
                        onClick={() => handleTimeRangeChange("today")}
                        className={`px-4 py-2 rounded-md ${
                            timeRange === "today"
                                ? "bg-gray-600 text-gray-200"
                                : "bg-gray-800 hover:bg-gray-600 text-gray-200"
                        }`}
                    >
                        today
                    </button>
                    <button
                        onClick={() => handleTimeRangeChange("last_week")}
                        className={`px-4 py-2 rounded-md ${
                            timeRange === "last_week"
                                ? "bg-gray-600 text-gray-200"
                                : "bg-gray-800 hover:bg-gray-600 text-gray-200"
                        }`}
                    >
                        last week
                    </button>
                    <button
                        onClick={() => handleTimeRangeChange("last_month")}
                        className={`px-4 py-2 rounded-md ${
                            timeRange === "last_month"
                                ? "bg-gray-600 text-gray-200"
                                : "bg-gray-800 hover:bg-gray-600 text-gray-200"
                        }`}
                    >
                        last month
                    </button>
                    <button
                        onClick={() => handleTimeRangeChange("last_year")}
                        className={`px-4 py-2 rounded-md ${
                            timeRange === "last_year"
                                ? "bg-gray-600 text-gray-200"
                                : "bg-gray-800 hover:bg-gray-600 text-gray-200"
                        }`}
                    >
                        last year
                    </button>
                </div>
            </div>

            <div className="grid gap-4 min-h-fit">
                <div className="grid grid-cols-2 mx-auto gap-2 lg:flex lg:justify-between lg:gap-4">
                    <Stat
                        color="green"
                        text="income"
                        value={formatCurrency(todayIncomeValue)}
                        icon={<HiBanknotes />}
                        isLoading={isLoading}
                    />
                    <Stat
                        color="red"
                        text="expense"
                        value={formatCurrency(todayExpenseValue)}
                        icon={<HiDocumentCurrencyDollar />}
                        isLoading={isLoading}
                    />
                </div>

                <ChartScafold title="most expense category">
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <Charts
                            data={categorySums}
                            XdataKey="name"
                            YdataKey="total_amount"
                            barColor="red"
                        />
                    )}
                </ChartScafold>

                <ChartScafold title="most income categories">
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <Charts
                            data={categoryIncomeSums}
                            XdataKey="name"
                            YdataKey="total_amount"
                            barColor="green"
                        />
                    )}
                </ChartScafold>

                <ChartScafold title="most expensed items">
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <Charts
                            data={mostExpensedItems}
                            XdataKey="description"
                            YdataKey="total_amount"
                            barColor="red"
                        />
                    )}
                </ChartScafold>

                <ChartScafold title="most income items">
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <Charts
                            data={mostIncomeItems}
                            XdataKey="description"
                            YdataKey="total_amount"
                            barColor="green"
                        />
                    )}
                </ChartScafold>
            </div>
        </RootLayout>
    );
}
