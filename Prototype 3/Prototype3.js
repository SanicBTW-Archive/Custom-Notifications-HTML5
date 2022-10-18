//this will probably be the last prototype version

//v1.0

//some code heavily inspired by prototype 1
class NotificationsHandler
{
    //felt like writing some cool comments ngl - deez them cool shit

    //Setup shit
    stylesReady = false;
    propertiesReady = false;

    //These properties have preset styles, instead of modifying the styles by yourself, maybe use these
    is_Indefinite = true; //If the progress bar should be run infinitely
    //These are not updated
    is_Warning = false; //If the notification is a warning
    is_Error = false; //If the notification is an error

    //Timer properties
    dismiss_Limit = 400; //What value should dismiss_Time reach to close the notification
    dismiss_IncreaseBy = 0.5; //By how much should dismiss_Time increase
    dismiss_Timeout = 2; //By how much should dismiss_Timer increase dismiss_Time
    dismiss_TimerPaused = false; //Is the timer paused? For the click event

    //Notification shit
    notification_Width = undefined; //Notification width duh, gets properly set when calling constructor

    //Track custom progress
    notification_Progress = 0.0;

    constructor()
    {
        console.log("Setting up necessary stuff!");
        this.setupStyles();
        this.setupProperties();
    }

    //ironic, it only setups one style
    setupStyles()
    {
        if(this.stylesReady == false)
        {
            var style = document.createElement('style');
            style.innerHTML = ".notification { user-select: none; font-family: Arial, Helvetica, sans-serif; color: black; height: fit-content; width: 0%; overflow-x: hidden; transition: 0.75s cubic-bezier(0.4, 0, 0.2, 1); background-color: rgba(255, 255, 255, 0.7); border-radius: 25px; position: fixed; bottom: 16px; right: 16px; z-index: 2; } .notification .progressBarMain { width: 100%; background-color: dimgray; } .progressBarMain .progressBar { width: 0%; height: 10px; background-color: lightblue; } .textContent { margin: 1rem; }";
            document.head.appendChild(style);

            this.stylesReady = true;
        }
    }

    setupProperties()
    {
        if(this.propertiesReady == false)
        {
            this.notification_Width = (this._platform() == "Desktop" ? "25%" : "100%");

            this.propertiesReady = true;
        }
    }

    //Rename these arguments or something dude
    new(mainText, subText = '')
    {
        var notification = document.createElement('div');

        var textContent = document.createElement('div');
        var main = document.createElement('h1');
        var sub = document.createElement('p');

        var progressBarMain = document.createElement('div');
        var progressBar = document.createElement('div');

        textContent.classList.add('textContent');
        main.innerText = mainText;
        sub.innerText = subText;
        textContent.appendChild(main);
        textContent.appendChild(sub);

        progressBarMain.classList.add('progressBarMain');
        progressBar.classList.add('progressBar');
        progressBarMain.appendChild(progressBar);

        notification.classList.add('notification');
        notification.appendChild(textContent);
        notification.appendChild(progressBarMain);

        notification.addEventListener('mouseenter', () => 
        {
            notification.style.transform = "scale(0.98, 0.98)";
        });

        notification.addEventListener('mouseleave', () => 
        {
            notification.style.transform = "scale(1, 1)";
        });

        notification.addEventListener('mousedown', (e) => 
        {
            this.dismiss_TimerPaused = true;
        });

        notification.addEventListener('mouseup', () => 
        {
            this.dismiss_TimerPaused = false;
        });

        document.body.insertBefore(notification, document.body.childNodes[0]);

        notification.offsetHeight;

        if(notification.style.width != this.notification_Width)
        {
            notification.style.width = this.notification_Width;
        }

        if(this.is_Indefinite)
        {
            progressBar.style.width = "10%";
            progressBar.style.position = "relative";
            progressBar.style.left = "0px";
        }

        if(this.is_Warning)
        {
            progressBar.style.width = "100%";
            progressBar.style.backgroundColor = "lightyellow";
        }

        if(this.is_Error)
        {
            progressBar.style.width = "100%";
            progressBar.style.backgroundColor = "lightred";
        }

        notification.addEventListener('transitionend', (e) => 
        {
            if(e.propertyName == "width")
                this.update(progressBar, notification);
        });
    }

    _platform()
    {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        ? 'Mobile'
        : 'Desktop';
    }

    _onFinish = () => 
    {
        console.log("Finished notifying");
    }

    update(progressBar, notification)
    {
        var lastProgress = 0.0; //To check the last notification progress, its updated constantly to check if there are any changes on state

        //For the basic timer
        var dismiss_Timer = undefined; //The timer that increases dismiss_Time by dismiss_IncreaseBy and increases the value by dismiss_msIncrease
        var dismiss_Time = 0.0; //Current time until it reaches the limit

        //For indefinite
        var indefinitePosition = 0; //The indefinite bar position
        var lastIndefinitePosition = 0; //The last indefinite bar position
        var addition = 1; //The amount of px to add to indefinite position
        var minIndef = 0;
        var maxIndef = 343;
        setInterval((update) => 
        {
            lastProgress = this.notification_Progress;
            if(lastProgress != this.notification_Progress)
            {
                //we got some active shit
                if(this.is_Indefinite == false)
                {
                    progressBar.style.width = this.notification_Progress + "%";
                }
                else if(this.is_Indefinite == true)
                {
                    progressBar.style.width = "0%";
                    progressBar.style.position = "static";
                    progressBar.style.width = this.notification_Progress + "%";
                }
            }
            else if(this.notification_Progress == 0.0)
            {
                if(this.is_Indefinite == false)
                {
                    //we now pass to the real shit
                    clearInterval(update);

                    if(this.dismiss_TimerPaused == true){ this.dismiss_TimerPaused = false; }
                    dismiss_Timer = setInterval(() => 
                    {
                        if(this.dismiss_TimerPaused == false)
                        {
                            dismiss_Time += this.dismiss_IncreaseBy;
        
                            progressBar.style.width = dismiss_Time + "%";
        
                            if(dismiss_Time == this.dismiss_Limit)
                            {
                                notification.style.width = "0%";
                                notification.addEventListener("transitionend", (e) => 
                                {
                                    if(e.propertyName == "width")
                                    {
                                        document.body.removeChild(notification);
                                        notification.remove();
                                        this._onFinish();
                                        clearInterval(dismiss_Timer);
                                    }
                                });
                            }
                        }
                    }, this.dismiss_Timeout);
                }
                else if(this.is_Indefinite == true)
                {
                    //I KNOW IM DUMB OKAY
                    indefinitePosition += addition;
                    lastIndefinitePosition = indefinitePosition;
                    if(indefinitePosition >= maxIndef && lastIndefinitePosition > maxIndef)
                        addition = -1;
                    else if(indefinitePosition <= minIndef && lastIndefinitePosition < minIndef)
                        addition = 1;
                    progressBar.style.left = indefinitePosition + "px";
                }
            }
        }, 30);
    }
}