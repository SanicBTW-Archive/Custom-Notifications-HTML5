var datest = document.getElementById('testNotif');
var disabled = false; //transitioning maybe
datest.addEventListener('mouseenter', () => 
{
    if(disabled == false)
    {
        datest.style.cssText = 'background-color: rgba(255, 255, 255, 0.8);';
    }
});

datest.addEventListener('mouseleave', () => 
{
    if(disabled == false)
    {
        datest.style.cssText = 'background-color: rgba(255, 255, 255, 0.7);';
    }
});

datest.addEventListener('mousedown', () => 
{
    if(disabled == false)
    {
        datest.style.transform = "scale(0.99, 0.99)";
    }
});

datest.addEventListener('mouseup', () => 
{
    datest.style.transform = "scale(1, 1)";
    datest.style.right = "-2000px";
    document.getElementById('testnInfo').style.width = "25%";
    disabled = true;
});