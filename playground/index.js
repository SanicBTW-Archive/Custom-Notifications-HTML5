const detectDeviceType = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
? 'Mobile'
: 'Desktop';

function onLoad()
{
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
}

function runCode()
{
    //do some funkyy formatting or fixin
    try
    {
        if(document.getElementById('bgNotColor').value.length < 1) { document.getElementById('bgNotColor').value = "transparent"; }
        if(document.getElementById('mainBNotColor').value.length < 1) { document.getElementById('mainBNotColor').value = "dimgray"; }
        if(document.getElementById('progBarNotColor').value.length < 1) { document.getElementById('progBarNotColor').value = "lightgreen"; }

        var toRun = `new NotificationInstance('${document.getElementById('mainTextContent').value}', '${document.getElementById('subTextContent').value}', '${document.getElementById('bgNotColor').value}', '${document.getElementById('mainBNotColor').value}', '${document.getElementById('progBarNotColor').value}').onFinish = function() { ${document.getElementById('onFinishNot').value } }`;

        if(document.getElementById('customCodeInput').value.length > 1)
        {
            eval(document.getElementById('customCodeInput').value);
        }
        else
        {
            eval(toRun);
            document.getElementById('codeResult').innerText = toRun;
        }
    }
    catch(e)
    {
        console.log(e);
        new NotificationInstance('There was an error\nrunning the script', 'Check the console for the error', 'black', 'black', 'red');
    }
}

function closeNotifPanel()
{
    document.getElementById('notifPanelContent').style.opacity = "0";
    document.getElementById('notifPanelHeader').style.opacity = "0";
    document.getElementById('notificationRegion').style.width = "0%";
}