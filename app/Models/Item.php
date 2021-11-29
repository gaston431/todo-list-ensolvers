<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Folder;

class Item extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'isCompleted'];

    public function folder()
    {
        return $this->belongsTo(Folder::class);
    }
}
