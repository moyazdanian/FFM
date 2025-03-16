<?php

namespace App\Http\Middleware;

use App\Models\Reports;
use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class InertiaSharedData
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
       if(auth()->check()){
           $report = Reports::where('user_id' , auth()->user()->id)->latest()->first();

           $balance = $report ? ($report->initial_amount + $report->total_income - $report->total_expense) : 0;

           Inertia::share('balance' , $balance);
       }

       return $next($request);
    }
}
