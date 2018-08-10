<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'tags';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['title', 'slug', 'created_at', 'updated_at', 'deleted_at'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];

    public function contents() {
        return $this->belongsToMany('App\Models\Content', 'content_tags');
    }
}