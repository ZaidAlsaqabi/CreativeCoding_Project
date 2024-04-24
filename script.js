var div = document.getElementsByClassName('main');
var display = 0;
function hideShow()
{
    if(display == 1)
    {
      div[0].style.display = '';
      display = 0;    
    }
    else
    {
      div[0].style.display = 'none';
      display = 1;    
    }
}