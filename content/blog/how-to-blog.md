+++
title = "How To Set Up A Blog"
description = "A detailed explenation on how to setup this blog"
date = 2026-04-23
[taxonomies]
tags = ["Programming"]

[extra]
banner = ""
toc = true
#toc_sidebar = true
toc_inline = true
toc_ordered = true
hot = true
+++

# Intro
Basically I wanted to start a blog. So the first thing to do is (of course) jump into the rabbit hole and read through way too much different options.
In the end all this researching isn't really necessary cause it is way easier to just go through the available templates and find one u like, this takes away this long lasting tech comaprison...
But what did i decide on? To make it short this blog is setup using [Zola](https://www.getzola.org) in combination with [duckquill](https://duckquill.daudix.one) as the base theme. to get a gist of things i can only recommend to read through the content of the theme u want to use, it gives u a good understanding how to setup ur blog and change things that annoy u :).

# Setup
> [!CAUTION] 
> The commands in this guide are partially specific to <mark>MacOS</mark> so if you are on a different OS please check the original documentations.

{% details(summary="Shortcut") %}
I see you are one of those but no worries here u go 

```zsh
brew install zola
git clone https://github.com/ShadowPaint-SP/zola-blog.git /zola-blog
```

and now u can start it or deploy it by uploading it to your own github
{% end %}

Ok I see you want to setup a blog. To get started install Zola on your operating system.

## Zola installation
Now lets start by [installing Zola](https://www.getzola.org/documentation/getting-started/installation/) and initializing the blog:

``` zsh
brew install zola
zola init zola-blog
cd zola-blog
git init
```

and then follow the setup guide, select all options here as they can be changed in the config later.
with this u now have a barebone [Zola](https://www.getzola.org) setup. At this point u can already start your blog and style it your self but we will now continue to setup a theme.

Now you should rename the `zola.toml` file to `config.toml`, this will be necessary for later to publisch the blog on Github pages.
To make sure it is installed properly and also for seeing your blogs locally use:
```zsh
zola serve
```
This compiles your blog and makes it available on `127.0.0.1:1111`.

## Theme installation
To do so you should look up how your specific theme wants to be installed.
In the [Zola Theme Collection](https://salif.github.io/zola-themes-collection/) you can find many beautiful themes thanks to the great community.
Here we will be using [duckquill](https://duckquill.daudix.one), so if you want it as well you can just copy the commands as is. 
Most themes should have a similar style of installation.

```zsh
git submodule init
git submodule add https://codeberg.org/daudix/duckquill.git themes/duckquill
git -C themes/duckquill checkout v6.3.0
```
To activate the theme now go to your `config.toml` and at the top add:
```toml
title = "Main-page"
description = "Personal notes and experiments."
theme = "duckquill"
```

## Add content
So the theme is added but as you can see the blog is an empty page. This is not wrong and only due to nothing being added to the content yet

```zsh
content
┣ blog
┃ ┣ archive-note-2025 # if a post has a banner this is the expected file structure
┃ ┃ ┣ index.md
┃ ┃ ┗ banner.jpg
┃ ┣ random-blog-post.md # this is a post without a banner
┃ ┗ _index.md # here u define how the article list should look like
┗ _index.md # here u define the homepage
```

to include pictures in the blogposts u can either put then into the same folder like in `archive-note-2025` the `banner.jpg` can also be used in the post body. Or alternatively u can put the immages into the following path: `static/images/`.

## Publish your blog!
Now that U have setup your Blog it is time to share your thoughts with the World!
To publish the blog I will explain how it is done with [Github Pages ](https://docs.github.com/en/pages/quickstart).
It is a very easy way of publishing your static html page ***FOR FREE***.

1. To start off create a new repository (on github or with the cli) but make sure it is public (otherwise you need github premium) and upload the repository to it.
2. Afterwards go to the Settings page on github.
  ![](https://docs.github.com/assets/cb-28260/mw-1440/images/help/repository/repo-actions-settings.webp)
3. In the "Code and automation" section of the sidebar, click "Pages".
4. Now in "Build and deployment" under Source select "Github Actions".
5. You will be asked to setup a Actions workflow, there create a new one.
6. Copy paste this action: [deploy_zola_page.yml](https://github.com/ShadowPaint-SP/zola-blog/blob/master/.github/workflows/deploy_zola_page.yml)[^1].
7. After you commit this file the Action should automatically run and it should then be accessible under `username.github.io`.

# Have fun
Congratulations now you can share whatever you want with the world! 
I hope this post was helpful, it is also the first one I ever wrote so if you liked it check back sometime.
If you want to share your blog with me I am happy to take a look what others create ✌🏼

[^1]: [it is based on the official zola github action by the getzola team](https://github.com/getzola/github-pages)