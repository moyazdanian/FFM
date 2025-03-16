<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::where('user_id' , auth()->user()->id)->with('user')->get();
        return Inertia::render('Categories/Categories' , ['categories' => $categories]);
    }

    public function create()
    {
        return Inertia::render('Categories/CategoryForm' );
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required' , 'max:50'],
            'type' => ['required' , 'in:expense,income']
        ]);

        if($request->category_id == null){
            $category = new Category();
            $category->name = $request->name;
            $category->type = $request->type;
            $category->user_id = auth()->user()->id;
            $category->save();
        }

        if ($request->category_id){
            $category = Category::findOrFail($request->category_id);
            $category->name = $request->name;
            $category->type = $request->type;
            $category->save();
        }

        return redirect()->route('category.create');
    }

    public function destroy($id){
        Category::findOrFail($id)->delete();
        return back();
    }

    public function edit($id)
    {
        $category = Category::findOrFail($id);
        return Inertia::render('Categories/CategoryForm' , ['category' => $category]);
    }
}
