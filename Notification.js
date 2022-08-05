//ver 3.0, uses a little portion of old code
class NotificationInstance
{
    notificationRegion = document.getElementById('notificationRegion');
    dismissTime = 0.0;
    timer;
    notification = document.createElement('div');

    constructor(mainText, subText)
    {
        this.notification.style.cssText += "height: fit-content; overflow-x: hidden; transition: 0.25s ease-in-out;";

        //creates the div of the notification contnet
        var content = document.createElement('div');

        //creates text
        var text = document.createElement('div');
        text.style.cssText += "margin-left: 1rem; margin-right: 1rem;";
        var main = document.createElement('h1');
        var sub = document.createElement('p');

        //Setups text
        main.innerText = checkTextLength(mainText);
        sub.innerText = checkTextLength(subText);

        //append it to the text div
        text.appendChild(main);
        text.appendChild(sub);

        //create prog bar
        var mainBar = document.createElement('div');
        mainBar.style.cssText += "background-color: dimgray; width: 100%;";
        var progBar = document.createElement('div');
        progBar.style.cssText += "width: 0%; height: 5px; transition: 1s; background-color: lightgreen;";

        mainBar.appendChild(progBar);

        //append text div and progress div inside the main content div
        content.appendChild(text);
        content.appendChild(mainBar);

        this.notification.appendChild(content);
        this.notificationRegion.appendChild(this.notification);
        if(this.notificationRegion.style.width != "25%")
        {
            this.notificationRegion.style.width = "25%";
        }
    }
}

function checkTextLength(text)
{
    var possibleLengths = new Map();

    possibleLengths.set(17, (text.length > 17));
    possibleLengths.set(17*2, (text.length > 17*2));
    possibleLengths.set(17*4, (text.length > 17*4));
    possibleLengths.set(17*8, (text.length > 17*8));
    possibleLengths.set(17*10, (text.length > 17*10));

    console.log("Checking text length");
    console.log(text.length);

    //dumbass
    if(possibleLengths.get(17) && !possibleLengths.get(17*2) && !possibleLengths.get(17*4) && !possibleLengths.get(17*8) && !possibleLengths.get(17*10))
    {
        var the = '';
        var charArrays = text.split("");
        charArrays.splice(17, 0, "\n");
        for(var i in charArrays)
        {
            the += charArrays[i];
        }
        return the;
    }
    else if(possibleLengths.get(17) && possibleLengths.get(17*2) && !possibleLengths.get(17*4) && !possibleLengths.get(17*8) && !possibleLengths.get(17*10))
    {
        var the = '';
        var charArrays = text.split("");
        charArrays.splice(17, 0, "\n");
        charArrays.splice(17*2, 0, "\n");
        for(var i in charArrays)
        {
            the += charArrays[i];
        }
        return the;
    }
    else if(possibleLengths.get(17) && possibleLengths.get(17*2) && possibleLengths.get(17*4) && !possibleLengths.get(17*8) && !possibleLengths.get(17*10))
    {
        var the = '';
        var charArrays = text.split("");
        charArrays.splice(17, 0, "\n");
        charArrays.splice(17*2, 0, "\n");
        charArrays.splice(17*4, 0, "\n");
        for(var i in charArrays)
        {
            the += charArrays[i];
        }
        return the;
    }
    else if(possibleLengths.get(17) && possibleLengths.get(17*2) && possibleLengths.get(17*4) && possibleLengths.get(17*8) && !possibleLengths.get(17*10))
    {
        var the = '';
        var charArrays = text.split("");
        charArrays.splice(17, 0, "\n");
        charArrays.splice(17*2, 0, "\n");
        charArrays.splice(17*4, 0, "\n");
        charArrays.splice(17*8, 0, "\n");
        for(var i in charArrays)
        {
            the += charArrays[i];
        }
        return the;
    }
    else if(possibleLengths.get(17) && possibleLengths.get(17*2) && possibleLengths.get(17*4) && possibleLengths.get(17*8) && possibleLengths.get(17*10))
    {
        var the = '';
        var charArrays = text.split("");
        charArrays.splice(17, 0, "\n");
        charArrays.splice(17*2, 0, "\n");
        charArrays.splice(17*4, 0, "\n");
        charArrays.splice(17*8, 0, "\n");
        charArrays.splice(17*10, 0, "\n");
        for(var i in charArrays)
        {
            the += charArrays[i];
        }
        return the;
    }
    else
    {
        return text;
    }

    /*
    possibleLengths.forEach((am, statement) => {
        console.log(am, statement);
        if(statement)
        {
            if(time == 0)
            {
                var charArrays = text.split("");
                charArrays.splice(am, 0, "\n");
                for(var i in charArrays)
                {
                    the += charArrays[i];
                }
                time++;
                return the;
            }
        }
        else
        {
            the = text;
        }
    });*/
}