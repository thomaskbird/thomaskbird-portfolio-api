<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Job extends Model {

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['logo', 'company', 'title', 'start_at', 'end_at', 'body', 'type', 'skills', 'created_at', 'updated_at', 'deleted_at'];
}