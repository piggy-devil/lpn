<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Friend;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;
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
        $friends = Friend::friendships();

        if ($friends->isEmpty()) {
            return new PostCollection(request()->user()->posts);
        }

        return new PostCollection(
            Post::whereIn('user_id', [$friends->pluck('user_id'), $friends->pluck('friend_id')])
                ->get()
        );
    }

    public function store()
    {
        $data = request()->validate([
            'body' => '',
            'image' => '',
            'width' => '',
            'height' => '',
        ]);

        if (isset($data['image'])) {
            $image = $data['image']->store('post-images', 'public');

            // dd($image);

            Image::make($data['image'])
                ->resize($data['width'], $data['height'])
                ->save(storage_path('app/public/'. $image));
            
            $data['image'] = $image;
        }

        // dd($data['image']);

        $post = request()->user()->posts()->create([
            'body' => $data['body'],
            'image' => $data['image'] ? $data['image'] : null,
        ]);
        
        return new ResourcesPost($post);
    }
}
