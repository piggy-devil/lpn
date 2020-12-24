<?php

namespace App\Http\Controllers;

use App\Http\Resources\User as ResourcesUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthUserController extends Controller
{
    public function show()
    {
        // $user = Auth::id();
        // dd(auth()->user());
        // return new ResourcesUser(auth()->user()->id);
        return new ResourcesUser(Auth::user());
    }
}
