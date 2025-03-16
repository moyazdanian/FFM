<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Reports;
use App\Models\Transactions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use mysql_xdevapi\Exception;

class TransactionsController extends Controller
{
    public function index()
    {
        $transactions = Transactions::where('user_id' , auth()->user()->id)->with('category')->get();
        $categories = Category::where('user_id' , auth()->user()->id)->get();
        return Inertia::render('Transactions/Transactions' , ['transactions' => $transactions , 'categories' => $categories]);
    }

    public function create()
    {
        $categories = Category::where('user_id' , auth()->user()->id)->get();
        return Inertia::render('Transactions/TransactionsForm' , ['categories' => $categories]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'description' => ['required'],
            'category_id' => ['required' , 'exists:categories,id'],
            'amount' => ['required']
        ]);

        try {
            $transaction = new Transactions();
            $transaction->user_id = auth()->user()->id;
            $transaction->category_id = $request->category_id;
            $transaction->description = $request->description;
            $transaction->amount = $request->amount;
            $transaction->save();

        }catch (\Exception $e){
            throw ValidationException::withMessages(['error' => $e->getMessage()]);
        }

        return back();
    }

    public function destroy($id)
    {
        Transactions::findOrFail($id)->delete();
        return back();
    }

    public function initialAmount()
    {
        $initialAmount = Reports::where('user_id' , auth()->user()->id)->first()->initial_amount ?? 0;
        return Inertia::render('InitialAmount/InitialAmount' , ['initialAmount' => $initialAmount]);
    }

    public function initialAmountUpdate(Request $request)
    {
        $request->validate([
            'initial_amount' => ['required']
        ]);

        $report = Reports::where('user_id' , auth()->user()->id)->latest()->first();
        $report->initial_amount = $request->initial_amount;

        $report->save();

        return back();
    }

//
}
