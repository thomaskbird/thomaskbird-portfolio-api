@extends('layouts.base-public')

@section('content')
    <div id="content">

        <div class="container content-section" id="resume">

            <div class="row">

                <div class="col-sm-8">

                    @if($content->count())
                    @foreach($content as $i => $item)
                    <div class="row index-list-item">
                        @if(!empty($item->portfolio->featured))
                        <div class="col-sm-3">
                            <img src="/img/{{ $item->portfolio->featured }}" class="img img-responsive img-thumbnail" />
                        </div>
                        @endif
                        <div class=" @if(!empty($item->portfolio->featured)) col-sm-9 @else col-sm-12 @endif">
                            <h3><a href="{{ route('page', [$item->slug]) }}">{{ $item->title }}</a></h3>
                            <p>{!! substr(strip_tags($item->body), 0, 300) !!}...</p>
                        </div>
                    </div>
                    @endforeach
                    @else
                    <div class="index-list-item">
                        <h3>No results...</h3>
                    </div>
                    @endif

                    {{ $content->links() }}

                </div>
                <div class="col-sm-4">

                    @include('structure.sidebar')

                </div>

            </div>

        </div>

    </div>
@stop