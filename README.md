# Custom Notifications HTML5

# v2.1

This is the old version and no longer will be updated, the script can be found as `OldNotifications.js`

## How to use it in your project

Download the script (name above) and import (move) it to your folder project (to get intellisense open it in another tab inside vscode) and ofc import it inside your HTML document

First create a script (call it whatever you want, you will need to import it to the HTML document)

Create a function (call it whatever you want, you will need to call it on `<body onload="functionName()">`)

Once you've done that you need to pase this in
```
//Detect the device platform in order to make it mobile compatible and center it on the middle of the screen properly
const detectDeviceType = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
? 'Mobile'
: 'Desktop';
```

Then go to the function you've created that runs when the HTML document is loaded and paste this in

```
var outerStyle = document.createElement("style");
if(detectDeviceType() == "Desktop")
{
    outerStyle.innerHTML = `.outer { 
        width: 100%; height: 97.9vh; display: flex; justify-content: center; align-items: center;
    }`;
}
else
{
    outerStyle.innerHTML = `.outer { 
        width: 100%; height: 90vh; display: flex; justify-content: center; align-items: center;
    }`;
}
document.head.appendChild(outerStyle);
```

This is to create the style that will be used later on

Go to your HTML document and create a div and assign it the class `outer` (its made in your function)

Once you've done that paste this inside that div

```
<div id="notificationsPanel" class="notificationsPanel">
    <div style="margin-left: 1rem; margin-right: 1rem;">
        <h1 id="notificationText"></h1>
        <p id="notificationSubText"></p>
    </div>
    <div style="background-color: dimgray; width: 100%;"> <div id="dismissProgress" style="width: 0%; height: 5px; transition: 1s; background-color: lightgreen;"> </div> </div>
</div>
```

You can customize the height, background color of both divs (first div is the background color of the progress bar, the second div is the progress bar color)

After that go to your stylesheet (if none create one)

And paste this style class in

```
.notificationsPanel
{
    height: 12% fit-content; 
    width: fit-content; 
    position: fixed; 
    z-index: 3;
    top: -200px;
    background-color: rgb(32, 32, 32); 
    overflow-x: hidden; 
    transition: 0.25s ease-in-out;
    color: white;
}

.notransition 
{
    -webkit-transition: none !important;
    -moz-transition: none !important;
    -o-transition: none !important;
    transition: none !important;
}
```

And you are ready to go!

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

Download the script (name above) and import (move) it to your folder project (to get intellisense open it in another tab inside vscode) and ofc import it inside your HTML document

This version doesn't require anything else aside from a style and a div inside the parent body (not inside any div, only body)

Create or add this to your stylesheet

```
.sidePanel 
{
    height: 100%; 
    width: 0%; 
    position: fixed; 
    z-index: 1; 
    top: 0; 
    left: 0; 
    background-color: #111; 
    overflow-x: hidden; 
    transition: 0.5s;
}

#closeNotifPanel
{
    position: absolute;
    top: -20px;
    right: 0;
    font-size: 36px;
    margin-right: 2rem;
    cursor: pointer;
}
```

Then go to your HTML document and add this

```
<div id="notificationRegion" class="sidePanel">
    <div id="notifPanelHeader" style="transition: 0.25s opacity; opacity: 0;">
        <h1 style="margin: 1rem;">Notifications</h1>
        <p id="closeNotifPanel" onclick="closeNotifPanel()">X</p>
        <div style="background-color: white; width: 100%; height: 5px;"> </div>
    </div>
    <div id="notifPanelContent" style="transition: 0.25s opacity; opacity: 0;">
    </div>
</div>
```

And you are ready to go!

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