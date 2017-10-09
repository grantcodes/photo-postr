# [Photo Postr](https://photo.postrchild.com)

## What?

This is a [micropub](https://indieweb.org/micropub) client for posting photo galleries / albums to your [indieweb](https://indieweb.org) website.

## Features

- Upload photos in the background
- Extracts photo filename, date and location from EXIF data
- Drag and drop to reorder your gallery
- Posts photos to your media endpoint
- Photos have their own posts with the properties; `name`, `published`, `content` & `location` 
- Gallery posts have the properties; `name`, `mp-slug` & `content`

## Requirements

There are a few requirements for you to use the app:

- A micropub endpoint that supports json posts
- A media endpoint
- [Collection](https://indieweb.org/collection) support

Since at the moment this is a very new thing to micropub the gallery request is sent with the collection of photo urls both as a collection property and as children:

  {
    "type": ["h-entry"],
    "properties": {
        "category": ["gallery"],
        "collection": ["https://yoursite.com/photopost1", "https://yoursite.com/photopost2"]
    },
    "children": ["https://yoursite.com/photopost1", "https://yoursite.com/photopost2"]
  }

There is also no set way to hide the individual photo posts from your main feed, so the category `gallery-photo` is added to the photo posts and you may hide them if you wish.

## Development

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

To run it locally clone this repo then run `npm install` and `npm run start`

There is also a server component that just runs a simple json api to circumvent CORS issues. Feel free to use the live server for development purposes, it does not store any data apart from the photo files which are automatically deleted.