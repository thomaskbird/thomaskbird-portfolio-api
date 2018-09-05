@extends('layouts.admin-two-column')

@section('content-main')

    <table class="table table-striped">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <td>Phone</td>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
        @if( $messages->count() )
            @foreach($messages as $message)
                <tr>
                    <td>{{ $message->name }}</td>
                    <td><a href="mailto:{{ $message->email }}">{{ $message->email }}</a></td>
                    <td>{{ $message->phone }}</td>
                    <td>
                        <a href="{{ route('message_single', ['id' => $message->id]) }}">View</a>
                        <a href="{{ route('message_delete', ['id' => $message->id]) }}">Delete</a>
                    </td>
                </tr>
            @endforeach
        @else
            <tr>
                <td colspan="6">No messages found...</td>
            </tr>
        @endif
        </tbody>
    </table>

    {{ $messages->links() }}

@stop

@section('sidebar-primary')

@stop