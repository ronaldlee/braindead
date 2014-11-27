
//document.body.style.backgroundColor="blue";

$(document).ready(function(){
    if ($('#braindead').length) {
        $("#braindead").fadeOut( "fast", function() {
            $('#braindead').remove();
        });
    }
    else {
        var content = 
          "<div id='braindead'> \
             <ul> \
               <li><a href='#tabs-1'>Quiz</a></li> \
               <li><a href='#tabs-2'>Others</a></li> \
               <li><a href='#tabs-3'>Config</a></li> \
             </ul> \
             <div id='tabs-1' class='tab-content'> \
               <form style='display:inline-block; '> \
                 <div id='quiz-content-panel'> \
                   <table id='quiz-table'> \
                     <tr class='tb-row'><td class='tb-data'><font color='white'>Q:</font><input type='text' value='Type Quiz Here' style='width:300px'/> \
                                                                        <font color='white''>?</font></td></tr>  \
                     <tr class='tb-row'><td class='tb-data'><font color='white'>A:</font><input type='text' value='Type Answer Here' style='width:300px'/></td></tr> \
                   </table> \
                 </div> \
                 <div id='quiz-add-panel'> \
                   <input type='submit' value='Add'/> \
                 </div> \
               </form>\
             </div> \
             <div id='tabs-2' class='tab-content'> \
             </div> \
             <div id='tabs-3' class='tab-content'> \
             </div> \
          </div>";
        $('body').append(content);

        $("#braindead").draggable();
        $("#braindead").tabs();
        $("#braindead").fadeIn( "fast");
    }

//    $('#braindead').load('popup.html');
});

//$('body').append('<div>BOOO</div>');

