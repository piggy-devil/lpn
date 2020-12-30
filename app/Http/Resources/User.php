<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Friend as ResourcesFriend;
use App\Http\Resources\UserImage as ResourcesUserImage;
use App\Models\Friend;

class User extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'data' => [
                'type' => 'users',
                'user_id' => $this->id,
                'attributes' => [
                    'name' => $this->name,
                    'friendship' => new ResourcesFriend(Friend::friendship($this->id)),
                    'cover_image' => new ResourcesUserImage($this->coverImage),
                    'profile_image' => new ResourcesUserImage($this->profileImage),
                ]
            ],
            'links' => [
                'self' => url('/users/'.$this->id),
            ]
        ];
    }
}
