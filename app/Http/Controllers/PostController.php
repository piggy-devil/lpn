<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Resources\PostCollection;
use App\Http\Resources\Post as ResourcesPost;

class PostController extends Controller
{
    public function index()
    {
        return new PostCollection(Post::all());
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
