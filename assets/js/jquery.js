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