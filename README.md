# Custom Notifications HTML5

# v2.1

This is the old version and no longer will be updated, the script can be found as `OldNotifications.js`

## How to use it in your project

I have to write a lot here, wait until next commit lol

## Features

Uses a top panel which has a little transition on dropdown aka when receiving a notification call, it will show sliding out 

Has an auto dismiss timer (increases every 2 secs, by 0.5 and closes when it reaches 400) and a progress bar that indicates the progress to dismiss

Little problem, when its already notifying and wants to send another notification, it will be overriden (will close the current notification and open the new one)

It has a top header and a sub header (h1, p)

These can be asigned to when creating a new `CustomNotification()`

## Methods

Create a new instance by calling it `new CustomNotification()`

Use `.mainText` to assign some text to the main or top header

Use `.subText` to assign some text to the sub or secondary header

Use `.onFinish` to change the default on finish function (as the name says, it runs when it finishes notifying)

Use `.notify()` to send the notification

And that's pretty much all

## Example usage

```
var notif = new CustomNotification()
notif.mainText = "Hello"
notif.subText = "world"
notif.onFinish = function() {
    //Do something
}
notif.notify()
```

## Methods which serve 0 purpose

`.closeNotification(overriden = false)` this method is used internally to close the current notification and by providing a `true` statmente on the argument it will override (close and open the new notification) the current notification 

`.reset()` this method is used internally to reset `mainText` and `subText` I didnt test this out when creating a new custom notification but nothing bad should happen if you use this

# v3.0

This script can be found as `Notification.js`

## How to use it in your project

I have to write a lot here, wait until next commit lol

## Features

Has every feature from v2.1 but better

Now uses a side panel for the notifications

Can create a new notification without conflicting without other one

(Each notification has their own dismiss timer, main text, sub text and on finish function)

## Methods

This version simplified methods, by a lot

(It doesn't have `.mainText` or `subText` method when creating a new instance but still has `onFinish`)

Creating a new instance will instantly send the notification instead of using the `notify()` method 

Use `.onFinish` to assign your own function when finishing notifying

## Example usage

Example 1:
```
var notif = new NotificationInstance("mainText", "subText")
notif.onFinish = function(){
    //Do something
}
```

Example 2:
```
new NotificationInstance("mainText", "subText").onFinish = function(){
    //Do something
}
```

That's everything

Please don't modify these methods `notificationRegion`, `notificationRegHeader`, `notificationRegContent`, `dismissTime`, `timer`, `notification` as they are used internally to create notifications and append them to the notification list, the `checkTextLength` is used to properly format the text length (won't properly size when reaching the panel limit)

Might update this eventually for fixes or improvements

