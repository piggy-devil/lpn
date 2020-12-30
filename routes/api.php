<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::get('/posts', [App\Http\Controllers\PostController::class, 'index']);
Route::middleware('auth:api')->group(function(){
    
    // Route::get('/user', function (Request $request) {
    //     return $request->user();
    // });

    // Route::get('/posts', [App\Http\Controllers\PostController::class, 'index']);
    // Route::post('/posts', [App\Http\Controllers\PostController::class, 'store']);

    Route::get('/auth-user', [App\Http\Controllers\AuthUserController::class, 'show']);
    
    Route::apiResources([
        '/posts' => 'App\Http\Controllers\PostController',
        '/posts/{post}/like' => 'App\Http\Controllers\PostLikeController',
        '/posts/{post}/comment' => 'App\Http\Controllers\PostCommentController',
        '/users' => 'App\Http\Controllers\UserController',

        '/users/{user}/posts' => 'App\Http\Controllers\UserPostController',
        '/friend-request' => 'App\Http\Controllers\FriendRequestController',
        '/friend-request-response' => 'App\Http\Controllers\FriendRequestResponseController',
    ]);
});
