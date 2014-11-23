
//document.body.style.backgroundColor="blue";

$(document).ready(function(){
    if ($('#braindead').length) {
        $("#braindead").fadeOut( "fast", function() {
            $('#braindead').remove();
        });
    }
    else {
        var content = 
          "<div id='braindead' style='display:none'> \
             <ul> \
               <li><a href='#tabs-1'>Quiz</a></li> \
               <li><a href='#tabs-2'>Others</a></li> \
               <li><a href='#tabs-3'>Config</a></li> \
             </ul> \
             <div id='tabs-1' style=''> \
               <form style='display:inline-block; '> \
                 <div style='float:left; width:80%; '> \
                   <table style='width:450px; height:100%'> \
                     <tr style='width:100%'><td style='text-align:left'><font color='white'>Q:</font><input type='text' value='Type Quiz Here' style='width:300px'/> \
                                                                        <font color='white''>?</font></td></tr>  \
                     <tr style='width:100%'><td style='text-align:left'><font color='white'>A:</font><input type='text' value='Type Answer Here' style='width:300px'/></td></tr> \
                   </table> \
                 </div> \
                 <div style='float:left; width:20%; height:80px'> \
                   <input type='submit' value='Add'/> \
                 </div> \
               </form>\
             </div> \
             <div id='tabs-2'> \
             </div> \
             <div id='tabs-3'> \
             </div> \
          </div>";
        $('body').append(content);

        $("#braindead").tabs();
        $("#braindead").fadeIn( "fast");
    }

//    $('#braindead').load('popup.html');
});

//$('body').append('<div>BOOO</div>');

