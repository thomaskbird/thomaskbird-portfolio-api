@extends('layouts.admin-two-column')

@section('content-main')

    <table class="table table-striped">
        <tbody>
            <tr>
                <td>Name:</td>
                <td>{{ $message->name }}</td>
            </tr>
            <tr>
                <td>Phone:</td>
                <td>{{ $message->phone }}</td>
            </tr>
            <tr>
                <td>Email:</td>
                <td><a href="mailto:{{ $message->email }}">{{ $message->email }}</a></td>
            </tr>
            <tr>
                <td>Message:</td>
                <td>{{ $message->message }}</td>
            </tr>
            <tr>
                <td>Sent:</td>
                <td>{{ $message->created_at }}</td>
            </tr>
        </tbody>
    </table>

@stop

@section('sidebar-primary')

    <a class="btn btn-default" href="{{ route('message_list') }}">Back to messages</a>
@stop