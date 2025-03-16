<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Transactions extends Model
{
    use HasFactory;

    protected static function booted()
    {
        static::created(function ($transaction){
            DB::transaction(function () use ($transaction){
                $report = Reports::where('user_id' , auth()->user()->id)->latest()->first();

                if(!$report){
                    $report = new Reports();
                    $report->user_id = auth()->user()->id;
                    $report->month = now()->monthName;
                    $report->year = now()->year;
                    $report->total_income =  0;
                    $report->total_expense = 0;
                    $report->balance = 0;
                    }

                if($transaction->category->type === 'expense'){
                    $report->total_expense += $transaction->amount;
                }
                if($transaction->category->type ===  'income'){
                    $report->total_income += $transaction->amount;
                }
                $report->save();

            });
        });

        static::deleted(function ($transaction){
            DB::transaction(function () use($transaction){
                $report = Reports::where('user_id' , auth()->user()->id)->latest()->first();

                if($transaction->category->type === 'income'){
                    $report->total_income -= $transaction->amount;
                }
                if($transaction->category->type === 'expense'){
                    $report->total_expense -= $transaction->amount;
                }
                $report->save();
            });
        });
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
