<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class userController extends Controller
{
    public function index()
    {
        $users = User::all();

        return Inertia::render('users/Users' , ['users' => $users]);
    }

    public function test()
    {
        return Inertia::render('Header');
    }
}
