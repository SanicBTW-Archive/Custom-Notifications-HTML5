//ver 4.0 - prototype 1 - rewrite
class NotificationsHandler
{
    constructor()
    {
        this.setupProperties();
        this.setupNotifications();
        this.setupListeners();
    }

    notificationsReady = false;
    notif_Reg = document.createElement('div');

    setupNotifications()
    {
        if(this.notificationsReady == false) //var is set on false, writing a ! at the beginning will make it true
        {
            var mainStyle = document.createElement('style');
            mainStyle.innerHTML = ".notificationRegion { user-select: none; font-family: Arial, Helvetica, sans-serif; color: white; height: 100%; width: 0%; position: fixed; z-index: 1; top: 0; right: 0; background-color: rgba(50, 50, 50, 0.7); overflow-x: hidden; transition: 0.75s cubic-bezier(0.4, 0, 0.2, 1); border-radius: 25px 0px 0px 25px;} .notificationRegion .notification { height: fit-content; overflow-x: hidden; transition: 0.5s ease-in-out; background-color: rgba(75, 75, 75, 0.25); opacity: 0; border-radius: 25px; margin: 1rem;} .notification .close { position: fixed; cursor: pointer; font-size: larger; right: 35px;} .notification .progressBarMain { width: 100%; background-color: dimgray;} .progressBarMain .progressBar { width: 0%; height: 5px; background-color: lightblue; } .notification .textContent { margin: 1rem; }";
            document.head.appendChild(mainStyle);
    
            this.notif_Reg.classList.add('notificationRegion');
    
            document.body.insertBefore(this.notif_Reg, document.body.childNodes[0]);
    
            this.notificationsReady = true;    
        }
        else
        {
            console.log("Notifications already setup");
        }
    }

    listenersReady = false;
    removedNotification = new Event('removedNotification');

    setupListeners()
    {
        if(this.listenersReady == false)
        {
            addEventListener('removedNotification', () => 
            {
                if(this.notif_Reg.children.length == 0){ this.notif_Reg.style.width = "0%"; }
            });

            this.listenersReady = true;
        }
        else 
        {
            console.log("Listeners already setup");
        }
    }

    propertiesReady = false;
    properties = new Object();

    setupProperties()
    {
        if(this.propertiesReady == false)
        {
            this.properties['dis_Limit'] = 300;
            this.properties['dis_IncreaseBy'] = 0.5;
            //lets set it like a property why not
            this.properties['notif_RegW'] = (this.getPlatform() == 'Desktop' ? "25%" : "100%");

            this.propertiesReady = true;
        }
        else
        {
            console.log("Properties already setup");
            //console.log("Properties already setup, use 'modifyProperties(prop, value)' to modify one of them");
        }
    }

    getPlatform()
    {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        ? 'Mobile'
        : 'Desktop';
    }

    newNotification(mainText, subText = '')
    {
        var notification = document.createElement('div');
        var textContent = document.createElement('div');
        var main = document.createElement('h1');
        var sub = document.createElement('p');
        var progressBarMain = document.createElement('div');
        var progressBar = document.createElement('div');
        var closeBtn = document.createElement('p');

        var dis_Time = 0.0;
        var dis_Timer;

        textContent.classList.add('textContent');
        main.innerText = mainText;
        sub.innerText = subText;
        textContent.appendChild(main);
        textContent.appendChild(sub);

        progressBarMain.classList.add('progressBarMain');
        progressBar.classList.add('progressBar');
        progressBarMain.appendChild(progressBar);

        closeBtn.classList.add('close');
        closeBtn.addEventListener('click', (e) => this._onCloseClick(e));
        closeBtn.innerText = "X";

        notification.classList.add('notification');
        notification.appendChild(closeBtn);
        notification.appendChild(textContent);
        notification.appendChild(progressBarMain);

        this.notif_Reg.appendChild(notification);

        if(this.notif_Reg.style.width != this.properties["notif_RegW"])
        { 
            this.notif_Reg.style.width = this.properties["notif_RegW"];
            this.notif_Reg.ontransitionend = () => { notification.style.opacity = 1; }
        }
        else
        {
            this.notif_Reg.offsetLeft;
            notification.style.opacity = 1;
        }

        notification.addEventListener('transitionend', () => 
        {
            dis_Timer = setInterval(() => 
            {
                dis_Time += this.properties["dis_IncreaseBy"];
    
                progressBar.style.width = dis_Time + "%";
    
                if(dis_Time == this.properties["dis_Limit"])
                {
                    notification.style.opacity = 0;
                    notification.ontransitionend = () => { notification.remove(); dispatchEvent(this.removedNotification); }
    
                    this._onFinish();
                    clearInterval(dis_Timer);
                }
            });
        });
    }

    _onFinish = () =>
    {
        console.log("Finished notifying, properties: ", this.properties);
    }

    _onCloseClick(event) 
    {
        var btnParent = event.target.parentElement;
        btnParent.style.opacity = 0;
        btnParent.ontransitionend = () => { btnParent.remove(); dispatchEvent(this.removedNotification); }
    }
}