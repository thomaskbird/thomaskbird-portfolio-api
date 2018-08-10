<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'portfolio';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['post_id', 'url', 'mobile', 'desktop', 'created_at', 'updated_at', 'deleted_at'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];

    public function parent() {
        return $this->hasOne('App\Models\Content', 'id', 'post_id');
    }
}