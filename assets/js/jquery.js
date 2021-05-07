var ijungtas = 0;

$(document).ready(function(){
  //Add active class
  $(".search_icon").click(function(){
   $(".search_screen").addClass("active")
  });

//remove active class
$(".close_icon ").click(function(){
   $(".search_screen").removeClass("active")
  });

  $(".search_icon ").click(function(){
      $(".mail_screen").removeClass("active")
     });
     $(".search_icon ").click(function(){
      $(".settings_screen").removeClass("active")
     });
     $(".search_icon ").click(function(){
      $(".donate_screen").removeClass("active")
     });


  $(".close_icon3").click(function(){
   $(".search_screen").removeClass("active")
  });
 });


 $(document).ready(function(){
  //Add active class
  $(".mail_icon").click(function(){
   $(".mail_screen").toggleClass("active")
  });


  $(".close_icon2").click(function(){
   $(".mail_screen").removeClass("active")
  });

 
  $(".start_icon").click(function(){
      $(".mail_screen").removeClass("active")
     });
     $(".settings_icon").click(function(){
      $(".mail_screen").removeClass("active")
     });
     $(".donate_icon").click(function(){
      $(".mail_screen").removeClass("active")
     });
     $(".mail_icon").click(function(){
      $(".settings_screen").removeClass("active")
     });
     $(".mail_icon").click(function(){
      $(".donate_screen").removeClass("active")
     });
 });
 if (!$("#massage").val()) {
  // textarea is empty
}

$(document).ready(function(){
  //Add active class
  $(".settings_icon").click(function(){
   $(".settings_screen").toggleClass("active")
  });


  $(".close_icon2").click(function(){
   $(".settings_screen").removeClass("active")
  });

  $(".search_icon").click(function(){
   $(".settings_screen").removeClass("active")
  });
  $(".donate_icon").click(function(){
    $(".settings_screen").removeClass("active")
   });
 });

 $(document).ready(function(){
  //Add active class
  $(".start_icon").click(function(){
   $(".start_screen").addClass("active")
  });

//remove active class
$(".close_icon ").click(function(){
   $(".start_screen").removeClass("active")
  });
  $(".start_icon").click(function(){
      $(".settings_screen").removeClass("active")
     });

  $(".close_icon3").click(function(){
   $(".start_screen").removeClass("active")
  });
  $(".start_screen").click(function(){
      $(".search_screen").removeClass("active")
     });
     $(".search_screen").click(function(){
      $(".start_screen").removeClass("active")
     });
     $(".start_icon").click(function(){
      $(".donate_screen").removeClass("active")
     });
 });



 $(document).ready(function(){
  $("#vidsbtn").click(function(){
      $("#start").css({ "background-color": "green", "flex-grow": "10", "color": "#fff"});
  });
});
$(document).ready(function(){
  $("#start").click(function(){
      $("#start").css({ "background-color": "", "flex-grow": "", "color": ""});
  });
});

$(document).ready(function(){
//Add active class
$(".donate_icon").click(function(){
 $(".donate_screen").toggleClass("active")
});


$(".close_icon").click(function(){
 $(".donate_screen").removeClass("active")
});

$(".search_icon").click(function(){
 $(".donate_screen").removeClass("active")
});
$(".settings_icon").click(function(){
  $(".donate_screen").removeClass("active")
 });
});





function setEventsForInput() {
  $('.didesnis_input').on('keyup', function() {
    var $this = $(this),
      search_box = $this.find('.search_box').val().trim();
    if (search_box) {
      $('.go_back_right_create').addClass('active');
    } else {
      $('.go_back_right_create').removeClass('active');
    }
  });
}

function setEventsForBoxContainer() {
  $('.search_box_container').on('keyup', function() {
    var $this = $(this),
      search_box_name = $this.find('.search_box_name').val().trim(),
      search_box_id = $this.find('.search_box_id').val().trim();
    if (search_box_name && search_box_id) {
      $('.go_back_right').addClass('active');
    } else {
      $('.go_back_right').removeClass('active');
    }
  });
};


$(document).ready(function() {
  setEventsForInput();
  setEventsForBoxContainer();
});

/* DONATE SEKCIJA  */
jQuery(document).ready(function($) { 
$('.tabs .btn_styles').click(function() {
        if(!$(this).hasClass('active')) {
          let active, parent, tab;
          active = $(this);
          parent = $(this).closest('.tabs').first();
          parent.find('.btn_styles').each(function() {
            tab = $($(this).attr('href'));
            if($(this).is(active)) {
              $(this).addClass('active');
              if(tab.length > 0) tab.show();
            } else {
              $(this).removeClass('active');
              if(tab.length > 0) tab.hide();
            }
          });
        }

        return false;
    });
  });

  $(document).ready(function(){
    $("#lights").click(function() {
      if(ijungtas == 0) {
        ijungtas = 1;
      }
      else {ijungtas = 0 
      }
    });
    
      $("#lights").click(function() {
        if (ijungtas == 1) {
        $(".tamsus").css({
          "display": "block",
          "background-color": "black",
          "position": "absolute",
          "color": "#fff",
          "height": "100vh",
          "width": "100%",
          "z-index": "88",
        });
      }
      });
      $("#lights").click(function() {
        if (ijungtas == 1) {
        $(".wrapper").css({
          "display": "none"
        });
      }
      });
      
      
      $("#lights").click(function() {
        if (ijungtas == 1) {
        $(".right_side").css({
          "z-index": "999"
        });
      }
      });
      $("#lights").click(function() {
        if (ijungtas == 1) {
        $("#test").css({
          "display": "none"
        });
      }
      });
      $("#lights").click(function() {
        if (ijungtas == 1) {
        $(".room_box").css({
          "opacity": "0"
        });
      }
      });
  
      $("#lights").click(function() {
        if (ijungtas == 1) {
        $("#hostname").css({
          "opacity": "0"
        });
      }
      });
      $("#lights").click(function() {
        if (ijungtas == 0) {
        $(".wrapper").css({
          display: 'block'
        });
      }
      });
  
      $("#lights").click(function() {
        if (ijungtas == 0) {
        $(".right_side").css({
          "z-index": "0"
        });
      }
      });
  
       $("#lights").click(function(){
        if (ijungtas == 0) {
        $(".tamsus").css({"display": "none"})
        }
       });
  
       $("#lights").click(function(){
        if (ijungtas == 0) {
        $(".right_side").removeClass("active")
        }
       });
  
       $("#lights").click(function() {
        if (ijungtas == 0) {
        $(".test").css({
          display: 'flex'
        });
      }
      });
  
      $("#lights").click(function() {
        if (ijungtas == 0) {
        $("#test").css({
          "display": "inherit"
        });
      }
      });
  
      $("#lights").click(function() {
        if (ijungtas == 0) {
        $(".room_box").css({
          "opacity": "1"
        });
      }
      });
  
      $("#lights").click(function() {
        if (ijungtas == 0) {
        $("#hostname").css({
          "opacity": "1"
        });
      }
      });
    });



  