<div id="sidebar" role="complementary">
    <ul>
        <li id="search-2" class="widget widget_search">
            <h2 class="widgettitle">Search</h2>

            {!! Form::open(['route' => 'search', 'method' => 'get']) !!}

                <div class="input-group">
                    {{ Form::text('term', null, ['class' => 'form-control', 'placeholder' => 'Enter search...']) }}
                    <span class="input-group-btn">
                        <button class="btn btn-primary" type="submit">Search</button>
                    </span>
                </div>

            {!! Form::close() !!}
        </li>

        <li id="recent-posts-2" class="widget widget_recent_entries">
            <h2 class="widgettitle">Recent Posts</h2>
            <ul>
                @foreach($recent_posts as $rpost)
                <li><a href="/{{ $rpost->slug }}">{{ $rpost->title }}</a></li>
                @endforeach
            </ul>
        </li>

        <li id="tag_cloud-2" class="widget widget_tag_cloud">
            <h2 class="widgettitle">Tags</h2>
            <div class="tagcloud">
                @foreach($tags as $tag)
                    <a href="{{ route('tag_list', [$tag->slug]) }}" class='tag-link-21 tag-link-position-1'>{{ $tag->title }}</a>
                @endforeach
            </div>
        </li>
    </ul>
</div>