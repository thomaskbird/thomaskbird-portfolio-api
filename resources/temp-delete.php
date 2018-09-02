<p>Installing and Setup for Laravel on Wamp can be tricky, below is a detailed tutorial for completing each step necessary to get you up and running.</p>
<ul>
    <li>Composer</li>
    <ul>
        <li>Description:
            <ul>
                <li>Composer allows you to run the Laravel install easily and painlessly.</li>
            </ul>
        </li>
        <li>Steps
            <ul>
                <li>Go to: <a href="https://getcomposer.org/" target="_blank" rel="noopener">https://getcomposer.org/</a></li>
                <li>Click on download</li>
                <li>Then you'll see a line similar to this:
                    <ul>
                        <li>You have one of two options
                            <ul>
                                <li>You can go into command prompt and type this command in the directory where you would like to install Laravel.</li>
                                <li>php -r &ldquo;readfile(&lsquo;https://getcomposer.org/installer&rsquo;);&rdquo; | php</li>
                                <li>Or you can scroll down to the bottom of the page to `Manual Download` and then move the file to where you would like to install Laravel</li>
                                <li>This will download the `composer.phar` file.</li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
</ul>


<ul>
    <li>Or you can scroll down to the bottom of the page to `Manual Download` and then move the file to where you would like to install Laravel</li>
</ul>

<ul>
    <li>This will download the `composer.phar` file.</li>
</ul>

<ul>
    <li>Laravel states that you may place this in your Wamp installations php folder where your `php.exe` is located. Then cd into any directory in your wamp installation and use it, but I have found this is not the case.</li>
</ul>

<ul>
    <li>Next you&rsquo;ll need to install composer</li>
</ul>

<ul>
    <li>Go to <a href="http://laravel.com/docs/installation" target="_blank" rel="noopener">http://laravel.com/docs/installation and click on `Windows installer`</a></li>
</ul>

<ul>
    <li>This will take you to: <a href="https://getcomposer.org/Composer-Setup.exe" target="_blank" rel="noopener">https://getcomposer.org/Composer-Setup.exe</a></li>
</ul>

<ul>
    <li>Once downloaded click the file and run the install, the defaults are fine.</li>
</ul>

<ul>
    <li>Installing Laravel</li>
</ul>

<ul>
    <li>Description</li>
</ul>

<ul>
    <li>The steps are pretty simple from here</li>
</ul>

<ul>
    <li>Steps</li>
</ul>

<ul>
    <li>Create a folder anywhere you want in your wamp installation, in my case this tutorial I am going to create the folder here: `c:\wamp\www\laravel`</li>
</ul>

<ul>
    <li>Then open up windows command prompt</li>
</ul>

<ul>
    <li>Once command prompt is open navigate to the folder you just created, which for me I would type this to get there. You will need to type the path to the folder you created for the laravel installation.</li>
</ul>

<ul>
    <li>cd c:\wamp\www\laravel</li>
</ul>

<ul>
    <li>Next type this command into the command prompt</li>
</ul>

<ul>
    <li>composer create-project laravel/laravel &ndash;prefer-dist</li>
</ul>

<ol>
    <ol>What this does:</ol>
</ol>

<ul>
    <li>Creates a folder called `laravel`, inside that folder composer downloads all of the files that you will need to run laravel.</li>
</ul>

<ul>
    <li>The `public` folder is the where you can navigate to in your localhost to access laravel and see your application</li>
</ul>

<ul>
    <li>For me this is: `http://localhost/laravel/laravel/public`</li>
</ul>

<ul>
    <li>Final steps</li>
</ul>



<ul>
    <li>Next you will want to setup a virtual host that will allow for proper routing and friendly urls.</li>
</ul>



<ul>
    <li>Setting up a virtual host</li>
</ul>



<ul>
    <li>Updating your hosts file</li>
</ul>



<ul>
    <li>First open your favorite text editor and run as administrator</li>
</ul>


<ul>
    <li>Open your hosts file by navigating to</li>
</ul>



<ul>
    <li>c:\Windows\System32\drivers\etc</li>
</ul>




<ul>
    <li>Open the hosts file</li>
</ul>


<ul>
    <li>You should see a line somewhere in the 20&rsquo;s that looks like this:</li>
</ul>



<ul>
    <li>127.0.0.1 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;localhost</li>
</ul>




<ul>
    <li>Add another line below like this:</li>
</ul>



<ul>
    <li>127.0.0.1 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;local-laravel</li>
</ul>


<ul>
    <li>This will allow you to easily access your laravel application by simply typing in http://local-laravel into your favorite browser</li>
</ul>






<ul>
    <li>Updating your httpd.conf file</li>
</ul>



<ul>
    <li>Go to C:\wamp\bin\apache\apache2.4.9\conf</li>
</ul>


<ul>
    <li>The `apache2.4.9` may differ if you have a different apache version, make sure to change your version number if it is different</li>
</ul>


<ul>
    <li>Open your `httpd.conf` file</li>
</ul>


<ul>
    <li>Once the file is open, search for `Include conf/extra/httpd-vhosts.conf`</li>
</ul>


<ul>
    <li>This line should have a hash character in front of it. A hash mark means the line was commented out.</li>
</ul>


<ul>
    <li>Remove the hash mark, save and close the file</li>
</ul>




<ul>
    <li>Updating your httpd-vhosts.conf file</li>
</ul>



<ul>
    <li>Go to: `c:\wamp\bin\apache\apache2.4.9\conf\extra</li>
</ul>


<ul>
    <li>Again this may differ based on your apache version</li>
</ul>


<ul>
    <li>Open the file and add a set of lines like this:</li>
</ul>



<pre class="prettyprint linenums"><code class="language-javascript"></code></pre>

<p>&nbsp; &nbsp; DocumentRoot "c:\wamp\www\projects\testing\php\laravel\laravel\public"</p>
<p>&nbsp; &nbsp; ServerName local-laravel</p>
<p>&nbsp; &nbsp; ServerAlias www.local-laravel</p>




<ul>
    <li>Once you changed the httpd.conf and httpd.conf, go to the tray and click on the wamp icon</li>
</ul>


<ul>
    <li>In the menu select `restart all services`.</li>
</ul>


<ul>
    <li>You should now have a full working installation of Laravel on Wamp!</li>
</ul>












<ul>
    <li>Notes</li>
</ul>



<ul>
    <li>If you are having problems navigating to urls and urls breaking make sure that `rewrite_module` is checked meaning enabled.</li>
</ul>



<ul>
    <li>You can do this by clicking on the Wamp icon in the tray and go to `Apache -&gt; Apache Modules`, the `rewrite_module` will be in that locatino</li>
</ul>




<ul>
    <li>Also make sure that the following extensions are enabled by going to `PHP -&gt; PHP Extensions` and checking them</li>
</ul>



<ul>
    <li>PHP_curl</li>
</ul>


<ul>
    <li>PHP_openssl</li>
</ul>


<ul>
    <li>PHP_sockets</li>
</ul>




<ul>
    <li>If at anytime while running commands from the command prompt you receive an error stating that composer can not be found try typing `php composer.phar` and then the rest of the command as usual. Sometimes for some reason `composer` won&rsquo;t just be accessible by just `composer` requiring you to use the `php composer.phar`.</li>
</ul>