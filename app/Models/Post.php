<?php

namespace App\Models;

use App\Scopes\ReverseScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory; 

    protected $fillable = [
        'body', 'image'
    ];

    public static function boot()
    {
        parent::boot();

        static::addGlobalScope(new ReverseScope());
    }
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function likes()
    {
        return $this->belongsToMany(User::class, 'likes', 'post_id', 'user_id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
