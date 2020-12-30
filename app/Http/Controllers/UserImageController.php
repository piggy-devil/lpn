<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;
use App\Http\Resources\UserImage as ResourcesUserImage;

class UserImageController extends Controller
{
    public function store()
    {
        $data = request()->validate([
            'image' => '',
            'width' => '',
            'height' => '',
            'location' => '',
        ]);

        $image = $data['image']->store('user-images', 'public');

        Image::make($data['image'])
            ->resize($data['width'], $data['height'])
            ->save(storage_path('app/public/'. $image));
            // ->save(storage_path('app/public/user-image/'. $data['image']->hasName()));

        $userImage = auth()->user()->images()->create([
            'path' => $image,
            'width' => $data['width'],
            'height' => $data['height'],
            'location' => $data['location'],
        ]);

        return new ResourcesUserImage($userImage);
    }
}
