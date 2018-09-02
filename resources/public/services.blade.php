@extends('layouts.base-public')

@section('content')
    <div id="content">

        <div class="container content-section" id="resume">

            <div class="row">

                <div class="col-sm-8">

                    @if($services->count())

                        @foreach($services as $service)

                        <div class="col-sm-6 text-center services-list">

                            <span class="fa fa-{{ $service->icon }} fa-5x"></span>
                            <h3>{{ $service->title }}</h3>

                            <p>{{ substr(strip_tags($service->body), 0, 200) }}</p>

                        </div>

                        @endforeach

                    @else
                        <p>No services found...</p>
                    @endif

                </div>
                <div class="col-sm-4">

                    @include('structure.sidebar')

                </div>

            </div>

        </div>

    </div>
@stop