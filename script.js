
$(document).ready(function(){
  
  var w,c;
  var arr = [["0","0","0"],
             ["0","0","0"],
             ["0","0","0"]];
  
  //hide tic tac toe buttons
  $("#bc, #replay").hide(0);
  
  function cex(x,y){
    return arr[x][y] == c;
  }
  function wex(x,y){
    return arr[x][y] == w;
  }
   function start(){
    $("#title1, #title2").fadeOut(500);
    $("footer").fadeTo( 250, 0 );
    $("#play1").fadeOut(500);
    $("#play2").fadeOut(500);
    $("#bc, #replay").delay(750).fadeIn(1000);
    $("footer").delay(1500).fadeTo( 250, 1 );
   }
  
  //Check if any one wins
  function checkwin(){
      var counter = 0;
      var rawx = true, colx = true,
          rawo = true, colo = true;
      var dealx = true,dealo=true;
      var Draw = true;
      for(var j=0;j<3;j++){
        for(var i=0;i<3;i++){
          //Is there is any winner ? 
          {//x winning checktool raw & col
          var cRawx = arr[j][i]=="x",
              cColx = arr[i][j]=="x"; 
          rawx = (rawx&&cRawx);
          colx = (colx&&cColx);
          //o winning checktool raw & col
          var cRawo = arr[j][i]=="o",
              cColo = arr[i][j]=="o"; 
          rawo = (rawo&&cRawo);
          colo = (colo&&cColo);
        //diameter checktool x & o 
          var x = arr[i][i]=="x";
           dealx = dealx && x;
          var o = arr[i][i]=="o";
           dealo = dealo && o;
          }
          //can i complete playing ?
          if (arr[j][i]=="x"||arr[j][i]=="o")
            {counter++;}
        }
        //How do i know if you win?
        {
        //For "X
        if(rawx===true||colx===true||dealx===true)
        {
          Draw=false;
          console.log("X wins!");
          $("#end").hide(0).html("X is a winner!").fadeIn(500);reset();return true;
        }
        else if(rawx===false||colx===false||dealx===false)
        {rawx=true;colx=true;dealx=true;}
        
        //For "O"
        if(rawo===true||colo===true||dealo===true)
        {
          console.log("O is a winner!");Draw=false;
          $("#end").hide(0).html("O is a winner!").fadeIn(500);reset();return true;
        }
        else if(rawo===false||colo===false||dealo===false)
        {rawo=true;colo=true;dealo=true;}
      }
    }
    if((wex(2,0)&&wex(1,1)&&wex(0,2))){
      //w is a winner
      $("#end").hide(0).html(w + " is A winner!").fadeIn(1000);
      reset();
      Draw=false;
      return true;
    }
    if((cex(2,0)&&cex(1,1)&&cex(0,2))){
      //w is a winner
      $("#end").hide(0).html(c + " is A winner!").fadeIn(1000);
      reset();
      Draw=false;
      return true;
    }
    //How do i know if match end and draw or continue
      if(Draw && counter==9) {
        console.log("DRAW");
        $("#end").hide(0).html("DRAW!").fadeIn(1000);
        reset();
        return true;
      }
    
    return false;
    }
    
  //Check if the cell is empty
  function empty(x,y){
    if (arr[x][y]=="0") return true;
    else return false;
  }
  //Printing the press to the html screen
  function printing(x,y,who){
    if(x==0&&y==0){$("#1").hide(0).html(who).fadeIn("slow");}
    if(x==0&&y==1){$("#2").hide(0).html(who).fadeIn("slow");}
    if(x==0&&y==2){$("#3").hide(0).html(who).fadeIn("slow");}
    
    if(x==1&&y==0){$("#4").hide(0).html(who).fadeIn("slow");}
    if(x==1&&y==1){$("#5").hide(0).html(who).fadeIn("slow");}
    if(x==1&&y==2){$("#6").hide(0).html(who).fadeIn("slow");}

    if(x==2&&y==0){$("#7").hide(0).html(who).fadeIn("slow");}    
    if(x==2&&y==1){$("#8").hide(0).html(who).fadeIn("slow");}
    if(x==2&&y==2){$("#9").hide(0).html(who).fadeIn("slow");}
  }
  
  //when click to play
  function play(x,y,who){
    if(empty(x,y)){
      arr[x][y] = who;
      printing(x,y,who);
      if(checkwin()) return false;
      else return true;
    }
  }
  function cplay(x,y){
    if(empty(x,y)){
      arr[x][y] = c;
      printing(x,y,c);
      checkwin();  
      return true;
    }
   else return false;
  }
  
  
  
  //Computer Turn (AI is so simple try to block try to win and play random)
  function trywin(){
    //Horizon ends
    if(cex(0,0)&&cex(0,2)){if (cplay(0,1)) return true;}
    if(cex(1,0)&&cex(1,2)){if (cplay(1,1)) return true;}
    if(cex(2,0)&&cex(2,2)){if (cplay(2,1)) return true;}
    if(cex(0,0)&&cex(0,1)){if (cplay(0,2)) return true;}
    if(cex(1,0)&&cex(1,1)){if (cplay(1,2)) return true;}
    if(cex(2,0)&&cex(2,1)){if (cplay(2,2)) return true;}
    if(cex(0,2)&&cex(0,1)){if (cplay(0,0)) return true;}
    if(cex(1,2)&&cex(1,1)){if (cplay(1,0)) return true;}
    if(cex(2,2)&&cex(2,1)){if (cplay(2,0)) return true;}
    
    //Vertical ends
    if(cex(0,0)&&cex(2,0)){if (cplay(1,0)) return true;}
    if(cex(0,1)&&cex(2,1)){if (cplay(1,1)) return true;}
    if(cex(0,2)&&cex(2,2)){if (cplay(1,2)) return true;}
    if(cex(0,0)&&cex(1,0)){if (cplay(2,0)) return true;}
    if(cex(0,1)&&cex(1,1)){if (cplay(2,1)) return true;}
    if(cex(0,2)&&cex(1,2)){if (cplay(2,2)) return true;}
    if(cex(2,0)&&cex(1,0)){if (cplay(0,0)) return true;}
    if(cex(2,1)&&cex(1,1)){if (cplay(0,1)) return true;}
    if(cex(2,2)&&cex(1,2)){if (cplay(0,2)) return true;}
    
    //Diagonal ends
    if(cex(0,0)&&cex(2,2)){if (cplay(1,1)) return true;}
    if(cex(0,2)&&cex(2,0)){if (cplay(1,1)) return true;}
    if(cex(0,0)&&cex(1,1)){if (cplay(2,2)) return true;}
    if(cex(0,2)&&cex(1,1)){if (cplay(2,0)) return true;}
    if(cex(2,0)&&cex(1,1)){if (cplay(0,2)) return true;}
    if(cex(2,2)&&cex(1,1)){if (cplay(0,0)) return true;}
    //If nothing happend return false
    return false;
  }
  function tryblock(){

    //(0,0)
     if(wex(0,1)&&wex(0,2)){if (cplay(0,0)) return true;}
     if(wex(1,0)&&wex(2,0)){if (cplay(0,0)) return true;}
     if(wex(1,1)&&wex(2,2)){if (cplay(0,0)) return true;}
    //(0,1)
     if(wex(0,0)&&wex(0,2)){if (cplay(0,1)) return true;}
     if(wex(1,1)&&wex(2,1)){if (cplay(0,1)) return true;}
    //(0,2)
     if(wex(0,0)&&wex(0,1)){if (cplay(0,2)) return true;}
     if(wex(1,2)&&wex(2,2)){if (cplay(0,2)) return true;}
     if(wex(2,0)&&wex(1,1)){if (cplay(0,2)) return true;}
    //(1,0)
     if(wex(1,1)&&wex(1,2)){if (cplay(1,0)) return true;}
     if(wex(0,0)&&wex(2,0)){if (cplay(1,0)) return true;}
    //(1,1)
     if(wex(0,1)&&wex(2,1)){if (cplay(1,1)) return true;}
     if(wex(0,0)&&wex(2,2)){if (cplay(1,1)) return true;}
     if(wex(0,2)&&wex(2,0)){if (cplay(1,1)) return true;}
     if(wex(1,0)&&wex(1,2)){if (cplay(1,1)) return true;}
     //(1,2)
     if(wex(1,0)&&wex(1,1)){if (cplay(1,2)) return true;}
     if(wex(0,2)&&wex(2,2)){if (cplay(1,2)) return true;}
     //(2,0)
     if(wex(2,2)&&wex(2,1)){if (cplay(2,0)) return true;}
     if(wex(0,0)&&wex(1,0)){if (cplay(2,0)) return true;}
     if(wex(0,2)&&wex(1,1)){if (cplay(2,0)) return true;}
     //(2,1)
     if(wex(2,0)&&wex(2,2)){if (cplay(2,1)) return true;}
     if(wex(2,0)&&wex(2,1)){if (cplay(2,2)) return true;}
     if(wex(0,1)&&wex(1,1)){if (cplay(2,1)) return true;}
     //(2,2)
     if(wex(0,2)&&wex(1,2)){if (cplay(2,2)) return true;}
     if(wex(0,0)&&wex(1,1)){if (cplay(2,2)) return true;}

    //Special Cases
     if(wex(1,1)&&wex(2,2)){if (cplay(2,0)) return true;}
     
    
    //If nothing happend return false
     return false;
 }
  function playrnd(){
    for(var j=0;j<3;j++){
      for(var i=0;i<3;i++){
        if (cplay(i,j)) return true;
      }
    }
  }
 
  
  //Computer Playing
  function complay(){
    if(trywin())   return;
    if(tryblock()) return;
    
    if(wex(1,1))
      {if(cplay(0,0))return;}
    if(wex(0,0)||wex(0,2)||wex(2,0)||wex(2,2))
      {if(cplay(1,1))return;}
    if(wex(0,1)||wex(1,0))                     
      {if(cplay(0,0))return;}
    if(wex(2,1)||wex(1,2))             
      {if(cplay(2,2))return;}
    if(playrnd())  return;
  }
  
  
  
  
  
  //Buttons Clicks 
  $("#replay").click(function reset(){
    arr = [["0","0","0"],["0","0","0"],["0","0","0"]];
   
    $("#1").empty();
    $("#2").empty();
    $("#3").empty();
    $("#4").empty();
    $("#5").empty();
    $("#6").empty();
    $("#7").empty();
    $("#8").empty();
    $("#9").empty();
    $("#end").fadeOut(500);
    $("#end").delay(600).html('');
    $("#bc, #replay").fadeOut(500);
    $("footer").fadeTo( 250, 0 );
    $("#play1, #play2").delay(600).fadeIn(500);
    $("#title1, #title2").delay(600).fadeIn(500);
    $("footer").delay(1000).fadeTo( 250, 1 );
   });
  
  
  $("#play1").on("click",function(){start();w = "x";c = "o";});
  $("#play2").on("click",function(){start();w = "o";c = "x";});
/*********************************************************/
  $("#1").on("click",function(){if(empty(0,0)){if(play(0,0,w))complay();}});
  $("#2").on("click",function(){if(empty(0,1)){if(play(0,1,w))complay();}});
  $("#3").on("click",function(){if(empty(0,2)){if(play(0,2,w))complay();}});
/*********************************************************/
  $("#4").on("click",function(){if(empty(1,0)){if(play(1,0,w))complay();}});
  $("#5").on("click",function(){if(empty(1,1)){if(play(1,1,w))complay();}});
  $("#6").on("click",function(){if(empty(1,2)){if(play(1,2,w))complay();}});
/*********************************************************/
  $("#7").on("click",function(){if(empty(2,0)){if(play(2,0,w))complay();}});
  $("#8").on("click",function(){if(empty(2,1)){if(play(2,1,w))complay();}});
  $("#9").on("click",function(){if(empty(2,2)){if(play(2,2,w))complay();}});
});
  