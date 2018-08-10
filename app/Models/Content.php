<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Content extends Model {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'content';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['version_of', 'parent_id', 'title', 'nav_text', 'slug', 'description', 'body', 'keywords', 'order', 'status', 'type', 'created_at', 'updated_at'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];

    public function parent() {
        return $this->hasOne('App\Models\Content', 'id', 'parent_id');
    }

    public function children() {
        return $this->hasMany('App\Models\Content', 'parent_id', 'id');
    }

    public function portfolio() {
        return $this->hasOne('App\Models\Portfolio', 'post_id');
    }

    public function tags() {
        return $this->belongsToMany('App\Models\Tag', 'content_tags');
    }
}