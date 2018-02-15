$(document).ready(function() {
    $("#photos").change(function() {
        var thisFiles = document.getElementById('photos').files;
        showImage(this, thisFiles);
    });
    var dropsone = document.getElementById('drop');
    dropzone.ondragover = function(e) {
        e.preventDefault();
        this.className = 'hover';
        return false;
    };
    dropzone.ondrop = function(e) {
        e.preventDefault();
        this.className = 'hidden';
        showImage(this, e.dataTransfer.files);
    };
});
var photos = [],
    size = [],
    arrayInputFiles = [],
    validImg = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

function showImage(image, tF) {
    var inputFile = tF;
    for (let x = 0; x < inputFile.length; x++) {
        if ($.inArray(inputFile.item(x).type, validImg) < 0) { // Valida que sea imagén
            continue;
        } else if (inputFile.item(x).size > 2e+6) { // Valida que sea menor a 2Mb
            continue;
        }
        let reader = new FileReader();
        reader.onload = function(e) {
            if (!size.includes(e.total) && !photos.includes(e.target.result) && !arrayInputFiles.includes(inputFile.item(x)) && size.length < 5) {
                arrayInputFiles.push(inputFile.item(x));
                size.push(e.total);
                photos.push(e.target.result);
            } else {
                return;
            }
            for (var i = 0; i < photos.length; i++) {
                for (var r = 0; r < size.length; r++) {
                    if (photos.length === 1 && e.total === size[r]) {
                        $("div.img-preview-list").append("<div class='img-preview preview' id='" + e.total + "'><img src='" + e.target.result + "' sizeimg='" + e.total + "'><i class='fa fa-remove remove'></i></div>");
                        return;
                    } else if (e.target.result === photos[i] && e.total === size[r]) {
                        return;
                    } else if (e.target.result !== photos[i] && e.total !== size[i]) {
                        $("div.img-preview-list").append("<div class='img-preview preview' id='" + e.total + "'><img src='" + e.target.result + "' sizeimg='" + e.total + "'><i class='fa fa-remove remove'></i></div>");
                        return;
                    }
                }
            }
            document.getElementById("photos").value = "";
        }
        reader.readAsDataURL(inputFile[x]);
    }
}

$("div.img-preview-list").on("mouseover", "div.img-preview", function() {
    $(this).find(".remove").show();
}).on("mouseleave", "div.img-preview", function() {
    $(this).find(".remove").hide();
});

$("div.img-preview-list").on("click", ".remove", function() {
    var idimg = $(this).parent().attr("id");
    var idarray = $(this).parent().find("img").attr("sizeimg");
    var index = size.indexOf(Number(idarray));
    if (index > -1) {
        for (var i = 0; i < arrayInputFiles.length; i++) {
            if (arrayInputFiles[i].size === size[index]) {
                arrayInputFiles.splice(index, 1);
            }
        }
        photos.splice(index, 1);
        size.splice(index, 1);
        $("#" + idimg).remove();
        document.getElementById("photos").value = "";
    }
});