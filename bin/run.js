// Set configuration
  seajs.config({
    base: ((location.href.indexOf("?dev") > 0)?"./":"./js/")
  });
  seajs.use("bin/control",function(control){
    control.init();
  });