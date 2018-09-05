@extends('layouts.admin-two-column')

@section('content-main')

    <table class="table table-striped">
        <thead>
            <tr>
                <th>Icon</th>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
        @if( $services->count() )
            @foreach($services as $service)
                <tr>
                    <td><span class="fa fa-{{ $service->icon }}"></span></td>
                    <td>{{ $service->title }}</td>
                    <td>{!! substr(strip_tags($service->body), 0, 250) !!}</td>
                    <td>
                        <a href="{{ route('service_single', ['id' => $service->id]) }}">View</a>
                        <a href="{{ route('service_delete', ['id' => $service->id]) }}">Delete</a>
                    </td>
                </tr>
            @endforeach
        @else
            <tr>
                <td colspan="6">No services found...</td>
            </tr>
        @endif
        </tbody>
    </table>

    {{ $services->links() }}

@stop

@section('sidebar-primary')

    {{ Form::open(['route' => 'service_add', 'method' => 'post']) }}

    <div class="form-group">
        {!! Form::label('title','Title') !!}
        {!! Form::text('title', null, ['class' => 'form-control']) !!}
    </div>

    <div class="form-group">
        {!! Form::label('icon','Icon') !!}
        {!! Form::text('icon', null, ['class' => 'form-control']) !!}
    </div>

    <div class="form-group">
        {!! Form::label('body','Body') !!}
        {!! Form::textarea('body', null, ['class' => 'form-control']) !!}
    </div>

    <button type="submit" class="btn btn-primary">Add service</button>

    {{ Form::close() }}

@stop