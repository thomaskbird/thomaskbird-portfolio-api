@extends('layouts.admin-two-column')

@section('content-main')

    <table class="table table-striped">
        <tbody>
            <tr>
                <td>Title:</td>
                <td>{{ $service->title }}</td>
            </tr>
            <tr>
                <td>Icon:</td>
                <td><span class="fa fa-{{ $service->icon }}"></span></td>
            </tr>
            <tr>
                <td>Body:</td>
                <td>{!! substr(strip_tags($service->body), 0, 250) !!}</td>
            </tr>
        </tbody>
    </table>

@stop

@section('sidebar-primary')

    {{ Form::open(['route' => ['service_update', $service->id], 'method' => 'post']) }}

    <div class="form-group">
        {!! Form::label('title','Title') !!}
        {!! Form::text('title', $service->title, ['class' => 'form-control']) !!}
    </div>

    <div class="form-group">
        {!! Form::label('icon','Icon') !!} <span class="fa fa-{{ $service->icon }}"></span>
        {!! Form::text('icon', $service->icon, ['class' => 'form-control']) !!}
    </div>

    <div class="form-group">
        {!! Form::label('body','Body') !!}
        {!! Form::textarea('body', $service->body, ['class' => 'form-control']) !!}
    </div>

    <button type="submit" class="btn btn-primary">Update service</button>

    {{ Form::close() }}

@stop