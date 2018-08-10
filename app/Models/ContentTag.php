<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContentTag extends Model {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'content_tags';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['content_id', 'tag_id', 'created_at', 'updated_at', 'deleted_at'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];

    public function tag() {
        return $this->hasOne('App\Models\ContentTag', 'tag_id');
    }
}