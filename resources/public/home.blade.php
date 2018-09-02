@extends('layouts.base-public')

@section('content')
<div class="container">

    <div id="content">

        <div class="container slider-wrap">
            <div class="flexslider">

                <ul class="slides">

                    @foreach($portfolio as $portfolio_item)
                    <li>
                        <div class="col-sm-6">

                            @if($portfolio_item['portfolio']['desktop'])
                            <img src="/img/{{ $portfolio_item['portfolio']['desktop'] }}" class="slide-desktop img-responsive animated" />
                            @endif
                            @if($portfolio_item['portfolio']['mobile'])
                            <img src="/img/{{ $portfolio_item['portfolio']['mobile'] }}" class="slide-mobile img-responsive animated" />
                            @endif

                        </div>
                        <div class="col-sm-6 animated slide-content">

                            <h2><a href="{{ route('page', [$portfolio_item->slug]) }}">{{$portfolio_item->title}}</a></h2>

                            <div class="divider divider-dark"></div>

                            <p>{{ strip_tags($portfolio_item->description) }}</p>

                            <div class="divider divider-dark"></div>

                            <p class="btn-group" role="group" aria-label="Call to action">
                                <a class="btn btn-primary" href="{{ route('page', [$portfolio_item->slug]) }}">View project</a>
                                <a class="btn btn-default" target="_blank" href="{{ $portfolio_item['portfolio']['url'] }}">Client site <span class="fa fa-external-link"></span></span></a>
                            </p>

                        </div>
                    </li>
                    @endforeach

                </ul>

            </div>
        </div>

        <div class="container content-section">

            <div class="row">

                <div class="col-sm-6">

                    <?php //dynamic_sidebar('professional'); ?>

                </div>
                <div class="col-sm-6">

                    <?php //dynamic_sidebar('drive'); ?>

                </div>
            </div>

        </div>

        <div class="container content-section">

            <div class="row">

                <div class="col-sm-12">
                    <h2><span class="fa fa-code-fork"></span> My Skills</h2>
                </div>

            </div>

            <div class="row">

                @foreach($skills as $col)
                <div class="col-sm-4">
                    @foreach($col as $skill)
                    <div class="row">
                        <div class="col-sm-12">
                            <span class="service">{{ $skill['title'] }}
                                <span class="fa fa-angle-down"></span>
                                <div class="service-description">
                                    <p>{{ strip_tags($skill['body']) }} <a href="">More</a> </p>
                                </div>
                            </span>
                        </div>
                    </div>
                    @endforeach
                </div>
                @endforeach

            </div>

        </div>

        <div class="container content-section latest-posts">

            <div class="row">

                <div class="col-sm-4">

                    <h3>Latest post</h3>

                    @if($post_latest)
                        <a href="/{{ $post_latest->slug }}"><h4>{{ $post_latest->title }}</h4></a>

                        <p>{{ substr(strip_tags($post_latest->body), 0, 250) }}...</p>

                        <p><a href="/{{ $post_latest->slug }}">Read more</a></p>
                    @else
                        <p>No new posts yet...</p>
                    @endif

                </div>
                <div class="col-sm-4">

                    <h3>News</h3>

                    @if($post_news)
                        <a href="/{{ $post_news->slug }}"><h4>{{ $post_news->title }}</h4></a>

                        <p>{{ substr(strip_tags($post_news->body), 0, 250) }}...</p>

                        <p><a href="/{{ $post_news->slug }}">Read more</a></p>
                    @else
                        <p>No news posts yet...</p>
                    @endif

                </div>
                <div class="col-sm-4">

                    <h3>Testimonial</h3>

                    @if($post_testimonials)
                        <a href="/{{ $post_testimonials->slug }}"><h4>{{ $post_testimonials->title }}</h4></a>

                        <p>{{ substr(strip_tags($post_testimonials->body), 0, 250) }}...</p>

                        <p><a href="/{{ $post_testimonials->slug }}">Read more</a></p>
                    @else
                        <p>No testimonial posts yet...</p>
                    @endif

                </div>

            </div>

        </div>

    </div>

</div>
@stop