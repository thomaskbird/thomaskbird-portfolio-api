@extends('layouts.admin-two-column')

@section('content-main')

    <h1 class="page-header">Current page</h1>

    <h2>{{ $version_current->title }}</h2>

    <p>{{ $version_current->description }}</p>

    <p>{{ $version_current->body }}</p>

    <p>Keywords: {{ $version_current->keywords }}</p>

@stop

@section('sidebar-primary')

    <h1 class="page-header">Previous version</h1>

    <h2>{{ $version_old->title }}</h2>

    <p>{{ $version_old->description }}</p>

    <p>{{ $version_old->body }}</p>

    <p>Keywords: {{ $version_old->keywords }}</p>

    <a class="btn btn-primary" href="/admin/page/revert/{{ $version_old->id }}">Use this version</a>

@stop