@extends('layouts.admin-two-column')

@section('content-main')

    <ul class="list-group" id="sortable-skills">
    @if($skills->count())
        @foreach($skills as $skill)
            <li class="list-group-item" data-id="{{ $skill->id }}">
                <span class="fa fa-hand-rock-o"></span>
                {{ $skill->title }}
            </li>
        @endforeach
    @else
        <li class="list-group-item">
            No skills found...
        </li>
    @endif
    </ul>

@stop

@section('sidebar-primary')

    <a class="btn btn-default" href="{{ route('skills') }}">Back</a>

@stop