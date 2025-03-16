<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Transactions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $timeRange = $request->input('timeRange', 'today'); // default to today

        $dateRange = $this->getDateRange($timeRange);
        $startDate = $dateRange['start'];
        $endDate = $dateRange['end'];

        $transactions = Transactions::where('user_id' , auth()->id())
            ->whereBetween('created_at' , [$startDate , $endDate]);

        $income = clone $transactions;
        $expense = clone $transactions;

        $todayIncome = $income->whereHas('category' , function($query) {
            $query->where('type' , 'income');
        })->get();

        $todayExpense = $expense->whereHas('category' , function($query) {
            $query->where('type' , 'expense');
        })->get();

        $categorySums = Category::select(
            'categories.name',
            DB::raw('COALESCE(SUM(transactions.amount), 0) as total_amount')
        )
            ->leftJoin('transactions', function($join) use ($startDate , $endDate) {
                $join->on('categories.id', '=', 'transactions.category_id')
                ->where('transactions.user_id', '=', auth()->id())
                ->whereBetween('transactions.created_at' , [$startDate , $endDate]);
            })
            ->where('categories.type', '=', 'expense')
            ->where('categories.user_id', '=', auth()->id())
            ->groupBy('categories.name')->orderBy('total_amount' , 'desc')
            ->get();

        $categoryIncomeSums = Category::select(
            'categories.name',
            DB::raw('COALESCE(SUM(transactions.amount), 0) as total_amount')
        )
            ->leftJoin('transactions', function($join) use ($startDate , $endDate) {
                $join->on('categories.id', '=', 'transactions.category_id')
                ->where('transactions.user_id', '=', auth()->id())
                ->whereBetween('transactions.created_at' , [$startDate , $endDate]);
            })
            ->where('categories.type', '=', 'income')
            ->where('categories.user_id', '=', auth()->id())
            ->groupBy('categories.name')->orderBy('total_amount' , 'desc')
            ->get();

        $mostExpensedItems = Transactions::select(
            'description',
            DB::raw('COALESCE(SUM(amount), 0) as total_amount')
        )
            ->whereHas('category' , function ($query){
                $query->where('type' , 'expense')->where('user_id' , auth()->user()->id);
            })
            ->whereNotNull('description')
            ->whereBetween('created_at' , [$startDate , $endDate])
            ->groupBy('description')
            ->orderByDesc('total_amount')
            ->get();


        $mostIncomeItems = Transactions::select(
            'description',
            DB::raw('COALESCE(SUM(amount), 0) as total_amount')
        )
            ->whereHas('category' , function ($query){
                $query->where('type' , 'income')->where('user_id' , auth()->user()->id);
            })
            ->whereNotNull('description')
            ->whereBetween('created_at' , [$startDate , $endDate])
            ->groupBy('description')
            ->orderByDesc('total_amount')
            ->get();


        return Inertia::render('Dashboard' , ['todayIncome' => $todayIncome ,

            'todayExpense' => $todayExpense ,

            'categorySums' => $categorySums,
            'categoryIncomeSums' => $categoryIncomeSums,
            'mostExpensedItems' => $mostExpensedItems,
            'mostIncomeItems' => $mostIncomeItems,
            'timeRange' => $timeRange

            ]);
    }

    private function getDateRange($timeRange)
    {

        return match ($timeRange) {
            'today' => [
                'start' => now()->startOfDay(),
                'end' => now()->endOfDay(),
            ],
            'last_week' => [
                'start' => now()->subWeek()->startOfWeek(),
                'end' => now()->endOfWeek(),
            ],
            'last_month' => [
                'start' => now()->subMonth()->startOfMonth(),
                'end' => now()->endOfMonth(),
            ],
            'last_year' => [
                'start' => now()->startOfYear(),
                'end' => now()->endOfYear(),
            ],
            default => [
                'start' => now()->startOfDay(),
                'end' => now()->endOfDay(),
            ],
        };
    }
}
