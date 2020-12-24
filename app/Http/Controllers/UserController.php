<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\User as ResourcesUser;

class UserController extends Controller
{
    public function show(User $user)
    {
        return new ResourcesUser($user);
    }
}
