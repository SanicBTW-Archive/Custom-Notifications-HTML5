//ver 4.0 - rewrite

//in order to run the new version:
//first run setupnotifications - this setups the notification region and shit
class NotificationsHandler
{
    //divs
    notif_Reg = document.createElement('div');
    notif_RegC = document.createElement('div');

    //dismiss properties
    dis_Time = 0.0;
    dis_Limit = 400;
    dis_Incr = 0.5;
    dis_Timer;

    //notif region width, kinda stupid
    notif_RegW;

    constructor(
        dismiss_limit = 400,
        dismiss_increase = 0.5
    )
    {
        this.setupNotifications();

        var platform = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        ? 'Mobile'
        : 'Desktop';

        this.dis_Limit = dismiss_limit;
        this.dis_Incr = dismiss_increase;
        this.notif_RegW = (platform == "Mobile" ? "100%" : "25%");
    }

    notification = document.createElement('div');

    push(mainText, subText = '')
    {
        //actually rewrite this
        this.notification.style.cssText += `height: fit-content; overflow-x: hidden; transition: 0.5s; opacity: 0; background-color: transparent;`;

        var content = document.createElement('div');

        var text = document.createElement('div');
        text.style.cssText = "margin-left: 1rem; margin-right: 1rem;";
        var main = document.createElement('h1');
        var sub = document.createElement('p');

        main.innerText = mainText;
        sub.innerText = subText;

        text.appendChild(main);
        text.appendChild(sub);

        var mainBar = document.createElement('div');
        mainBar.style.cssText += `background-color: dimgray; width: 100%;`;
        var progBar = document.createElement('div');
        progBar.style.cssText += `width: 0%; height: 5px; transition: 1s; background-color: dodgerblue;`;

        mainBar.appendChild(progBar);

        content.appendChild(text);
        content.appendChild(mainBar);

        this.notification.appendChild(content);
        this.notif_RegC.appendChild(this.notification);

        if(this.notif_Reg.style.width != this.notif_RegW){ this.notif_Reg.style.width = this.notif_RegW; }

        this.notif_RegC.style.opacity = 1;
        this.notif_Reg.ontransitionend = () => { this.notification.style.opacity = 1; }

        this.dis_Timer = setInterval(() => 
        {
            this.dis_Time += this.dis_Incr;

            progBar.style.width = this.dis_Time + "%";

            if(this.dis_Time == this.dis_Limit)
            {
                this.notification.style.opacity = 0;

                this.notif_RegC.removeChild(this.notification);
                if(this.notif_RegC.childNodes.length == 0)
                {
                    this.notif_RegC.style.opacity = 0;
                    this.notif_Reg.style.width = 0;
                }

                this.onFinish();
            }
        }, 2);
    }

    onFinish = () =>
    {
        console.log("Finished notifying, properties: ", [this.dis_Limit, this.dis_Incr, this.notif_RegW]);
    }

    setupNotifications()
    {
        var sidePanelSty = document.createElement('style');
        sidePanelSty.innerHTML = ".sidePanel { height: 100%; width: 0%; position: fixed; z-index: 1; top: 0; right: 0; background-color: #111; overflow-x: hidden; transition: 0.5s ease-in-out; color: white; }";
        document.head.appendChild(sidePanelSty);

        this.notif_Reg.id = "nRegion";
        this.notif_Reg.classList.add("sidePanel");

        this.notif_RegC.id = "nrContent";
        this.notif_RegC.style.cssText = "transition: 0.25s ease-in-out; opacity: 0;";

        this.notif_Reg.appendChild(this.notif_RegC);
        document.body.insertBefore(this.notif_Reg, document.body.childNodes[0]);
    }
}