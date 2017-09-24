$(document).ready(function(){
   $("#photos").change(function(){
      showImage(this);
    });
 });
var photos = [], size = [];
function showImage(image){
   var inputFile = document.getElementById("photos").files;
   for (var x = 0; x < inputFile.length; x++) {
      var reader = new FileReader();
      reader.onload = function(e){
         if (!size.includes(e.total) && !photos.includes(e.target.result)) {
            size.push(e.total);
            photos.push(e.target.result);
         }else {
            return;
         }
         for (var i = 0; i < photos.length; i++) {
            for (var r = 0; r < size.length; r++) {
               if (photos.length === 1 && e.total === size[r]) {
                  $("div.img-preview-list").append("<div class='img-preview preview' id='"+photos.length+"'><img src='"+e.target.result+"' sizeimg='"+e.total+"'><i class='fa fa-remove remove'></i></div>");
                  return;
               }else if (e.target.result === photos[i] && e.total === size[r]) {
                  return;
               }else if (e.target.result !== photos[i] && e.total !== size[i]) {
                  $("div.img-preview-list").append("<div class='img-preview preview' id='"+photos.length+"'><img src='"+e.target.result+"' sizeimg='"+e.total+"'><i class='fa fa-remove remove'></i></div>");
                  return;
               }
            }
         }
      }
      reader.readAsDataURL(image.files[x]);
   }
}

$("div.img-preview-list").on("mouseover", "div.img-preview", function(){
   $(this).find(".remove").show();
}).on("mouseleave","div.img-preview", function(){
   $(this).find(".remove").hide();
});

$("div.img-preview-list").on("click", ".remove", function(){
   var idimg = $(this).parent().attr("id");
   var idarray = $(this).parent().find("img").attr("sizeimg");
   console.log("photo: "+photos.length+"-sixe: "+size.length);
   var index = size.indexOf(Number(idarray));
   console.log(index);
   if (index > -1) {
      photos.splice(index, 1);
      size.splice(index, 1);
      $("#"+idimg).remove();
      console.log("photo: "+photos.length+"-sixe: "+size.length);
   }
});
