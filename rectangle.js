$(function(){
  //首先得到dom元素
  var $width = $('#width'),
      $height = $('#height'),
      $btnCal = $('#calculate'),
      $perimeter = $('#perimeter'),
      $widthValidate = $('#width-validate'),
      $heightValidate = $('#height-validate'),
      $form = $('#zong'),
      $area = $('#area');

  $forkMeGH.show("https://gitee.com/yang-yuwei/rectangles");

  $width.keypress((e)=>{
    console.log(e.key);
    console.log(e.target);
    console.log(e.target.value);
    console.log(e.target.selectionStart);

    let key = e.key,
        val = e.target.value,
        pos = e.target.selectionStart;


    //非合法字符
    if(/[abcdf-zABCDF-Z`~!@#$%^&*()=_+[\]{}|;:'",<>/?\\]/.test(key)) e.preventDefault(); 
    
    //合法字符的规划
    //合法字符：e
    //在一个科学计数法的数字前面 中间 后面都不能出现e
    if(key === 'e' || key === 'E'){
      //e 和 E 不能出现在数字的首位
      if(pos === 0) e.preventDefault();
      //e 和 E 不能出现在科学计数法的数字中
      if(val.indexOf('e') !== -1 || val.indexOf('E') !== -1) e,preventDefault();

      //e 和 E 不能出现在负号和小数点后面
      if(pos > 0 && /[-.]/.test(val.slice(pos - 1, pos))) e.preventDefault();

      //e 和 E 不能出现在小数点前面
      if(val.slice(pos, val.length).indexOf('.') !== -1) e.preventDefault();

    }


    //合法字符：.
    if(key === '.'){
      //满足小数点不能出现在第一位
      if(pos === 0) e.preventDefault();

      //小数点不能出现在小数中
      if(val.indexOf('.') !== -1) e.preventDefault();

      //小数点不能出现在负号 e E 后面
      if(pos > 0 && /[-eE]/.test(val.slice(0, pos))) e.preventDefault();
    }

    //合法字符 ：-
    if(key === '-'){
      //满足 -不可以出现在首位
      if(pos === 0) e.preventDefault();

      //- 不可以出现在数字或者小数点后面
       if(pos > 0 && /[0-9.]/.test(val.slice(pos -1, pos))) e.preventDefault();

       //负号不能重复出现
       if(pos > 0 && val.indexOf('-') !== -1) e,preventDefault();

    }


    /*
    val = val.slice(0,pos) + key + val.slice(pos,val.length);
    if(!/^(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?$/.test(val)) e.preventDefault();  
    */
  });

  $height.keypress((e)=>{
    let key = e.key,
        val = e.target.value,
        pos = e.target.selectionStart;
    
    //非合法字符
    if(/[abcdf-zABCDF-Z`~!@#$%^&*()=_+[\]{}|;:'",<>/?\\]/.test(key)) e.preventDefault(); 
    
    //合法字符的规划
    //合法字符：e
    //在一个科学计数法的数字前面 中间 后面都不能出现e
    if(key === 'e' || key === 'E'){
      //e 和 E 不能出现在数字的首位
      if(pos === 0) e.preventDefault();
      //e 和 E 不能出现在科学计数法的数字中
      if(val.indexOf('e') !== -1 || val.indexOf('E') !== -1) e,preventDefault();

      //e 和 E 不能出现在负号和小数点后面
      if(pos > 0 && /[-.]/.test(val.slice(pos - 1, pos))) e.preventDefault();

      //e 和 E 不能出现在小数点前面
      if(val.slice(pos, val.length).indexOf('.') !== -1) e.preventDefault();

    }


    //合法字符：.
    if(key === '.'){
      //满足小数点不能出现在第一位
      if(pos === 0) e.preventDefault();

      //小数点不能出现在小数中
      if(val.indexOf('.') !== -1) e.preventDefault();

      //小数点不能出现在负号 e E 后面
      if(pos > 0 && /[-eE]/.test(val.slice(0, pos))) e.preventDefault();
    }

    //合法字符 ：-
    if(key === '-'){
      //满足 -不可以出现在首位
      if(pos === 0) e.preventDefault();

      //- 不可以出现在数字或者小数点后面
       if(pos > 0 && /[0-9.]/.test(val.slice(pos -1, pos))) e.preventDefault();

       //负号不能重复出现
       if(pos > 0 && val.indexOf('-') !== -1) e,preventDefault();

    }


    /*
    val = val.slice(0,pos) + key +val.slice(pos,val.length);

    if(!/^(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?$/.test(val)) e.preventDefault();
    */
  });


/*
  $form.focusout((e)=>{
    //console.log(e.target);
    console.log(e);
    //if(!validate())
  });
*/

  //对于字段比较多的情况下，可以分开写，一旦字段大于3，分开写就不可行了
  $width.focusout(()=>{

    if(!validate($width,$widthValidate)){
      $width.select();
    }
  
  });

  $height.focusout(()=>{
    if(validate($height,$heightValidate)){
      $height.select();
    }
  });


  $btnCal.click(function(){

    //分析输入的值的小数点位数
    var x = String($width.val()).indexOf(".")+1
    var y = String($width.val()).length - x

    var m = String($height.val()).indexOf(".")+1
    var n = String($height.val()).length - m

    var num = 0,num1=y+n;
    if(y-n >= 0){
      num = y
    }else{
      num = n
    }
    
    function roundFractional(first,second){
      return Math.round(first*Math.pow(10,second))/Math.pow(10,second);
    }


    //get value
    var w = Number($width.val()),
        h = Number($height.val());

    //validate
    if( validate($width,$widthValidate) && validate($height,$heightValidate)){

      //计算
      var p = 2 * (w + h),
          a = w * h;
    
      //输出
      //$perimeter.val(p);
      //$area.val(a);

      $perimeter.val(roundFractional(2*(w+h),num));
      $area.val(roundFractional(w*h,num1));
      console.log(y);
      console.log(num);
    }

  });

});

function validate(input,output){
  //is empty
  if(input.val() === ''){
    output.html('该字段不能为空');
    return false;
  }else{
    output.html('');
  }
  //is number
  let val = Number(input.val());

  if(isNaN(val)){
    output.html('该字段应该为数值');
    return false;
  }else{
    output.html('');
  } 
  //is >0
  if(val < 0){
    output.html('该字段应该大于0');
    return false;
  }else{
    output.html('');
  }

  return true;
}
