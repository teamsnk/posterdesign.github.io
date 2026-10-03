function wireUpload(inputId, imgId, hintId, boxId){
  document.getElementById(inputId).onchange = function(e){
    var file = e.target.files[0]; if(!file) return;
    var r = new FileReader();
    r.onload = function(){
      var im = document.getElementById(imgId);
      im.src = r.result; im.style.display = 'block';
      var hint = document.getElementById(hintId); if(hint) hint.style.display='none';
      var box = document.getElementById(boxId);
      box.style.border = 'none'; box.style.background = 'none';
    };
    r.readAsDataURL(file);
  };
}
wireUpload('f','im','hint','ph');
wireUpload('flogo','logoImg','logoHint','logoBox');
