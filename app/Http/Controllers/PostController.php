<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Resources\PostCollection;
use App\Http\Resources\Post as ResourcesPost;

class PostController extends Controller
{
    public function __construct()
    {
        // parent::__construct();
        $this->middleware('auth:api')->except(['index']);
    }

    public function index()
    {
        $user = Post::with('user')->get();
        // dd($user);
        return new PostCollection($user);
        // return new PostCollection(Post::all());
        // return response()->json(['posts' => Post::all()]);
    }

    public function store()
    {
        $data = request()->validate([
            'data.attributes.body' => '',
        ]);

        $post = request()->user()->posts()->create($data['data']['attributes']);
        
        return new ResourcesPost($post);
    }
}
