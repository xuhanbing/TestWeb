//ming.cn v1.0 design by xieqing 20141023
//滑动导航
function slidingNav(id,slider,curStyle,time,hasSubNav,subClas){
	var $list = $("#"+id).find("li");
	var $slider = $("#"+slider);
	var cur=curStyle; 
	var initialLeft, initialWidth, sliderLeft, sliderWidth; 
	$list.each(function(){
		if($(this).hasClass(cur)){
			initialWidth = $(this).width();
			initialLeft = $(this).position().left;
			$slider.css({width:initialWidth,left:initialLeft});							
		}			
	})
	$list.mouseover(function(){
		sliderWidth = $(this).width();
		sliderLeft = $(this).position().left;
		curIndex = $(this).index();
		$slider.stop().animate({left:sliderLeft,width:sliderWidth},{duration:time,easing:"easeInOutQuad"});		
	})
	$list.mouseout(function(){
		$slider.stop().animate({left:initialLeft,width:initialWidth},{duration:time,easing:"easeInOutQuad"});
		curIndex = $(this).index();
		if(hasSubNav){
			$slider.mouseover(function(){
				if($list.eq(curIndex).find("."+subClas).length!=0){
					$list.eq(curIndex).trigger("mouseover");
				}
			})
		}
	})
}

//滑动选项卡
function slidingTog(id,main,slider,curStyle,time){
	var $list = $("#"+id).find("li");
	var $item = $("#"+main).find("li");
	var $slider = $("#"+slider);
	var cur=curStyle; 
	slidingNav(id,slider,curStyle,time);
	$list.mouseover(function(){
		var curIndex = $(this).index();	
		$list.eq(curIndex).addClass(cur).siblings().removeClass(cur);
		$item.eq(curIndex).show().siblings().hide();
	})
	$list.mouseout(function(){
		$slider.stop();	
	})	
}

//选项卡
function tog(id,main,curStyle){
	var $list = $("#"+id).find("li");
	var $item = $("#"+main).find("li");
	var cur=curStyle;
	$list.click(function(){
		var curIndex = $(this).index();	
		$list.eq(curIndex).addClass(cur).siblings().removeClass(cur);
		$item.eq(curIndex).show().siblings().hide();
	})	
}

//轮播
function slide(listID,barID,speed,time,curLiStyle){
	var $slideBar = $('#'+barID);
	var $slideList = $('#'+listID);
	var curStyle = curLiStyle;
	var itemNum = $slideList.find("li").length;
	var speed = speed,time = time,auto;//图片切换时间和单张图片淡出时间
	var num=0;//全局变量，用来存储当前的位置
	$slideBar.find("li").eq(0).addClass(curStyle);
	/*自动滚动函数*/
	function autoScroll(){
		num++;
		if(num>=itemNum){
			num=0; 
		}
		$slideBar.find("li").eq(num).addClass(curStyle).siblings().removeClass(curStyle);
		$slideList.find("li").eq(num).fadeIn(time/3).siblings().fadeOut(time);
	}
	auto=setInterval(autoScroll,speed);//设置自动滚动
	/*鼠标移到圆点的事件*/
	$slideBar.find("li").each(function(){
		$(this).mouseover(function(){
			clearInterval(auto);
			$(this).addClass(curStyle).siblings().removeClass(curStyle);
			var curNum=$(this).index();
			$slideList.find("li").stop(true,true);
			$slideList.find("li").eq(curNum).fadeIn(time/3).siblings().fadeOut(time);
			num=curNum;			 
		}).mouseout(function(){
			auto=setInterval(autoScroll,speed);       
		})
	})
}

//水平滚动
function horizonRoll(id,inner,leftBtn,rightBtn,time,lbtnStyle,rbtnStyle){
	var $box=$("#"+	id);
	var $list=$("#"+inner);
	var $lBtn=$("#"+leftBtn);
	var $rBtn=$("#"+rightBtn);
	var $item=$list.find("li");
	var boxWidth=$box.width();
	var itemWidth=$item.eq(0).width()+parseInt($item.eq(0).css("margin-left"))+parseInt($item.eq(0).css("margin-right"));
	var count=$item.length;
	var boxContent=Math.ceil(boxWidth/itemWidth);
	var num=0;
	var rollNum=Math.ceil(count/boxContent)-1;
	$list.css("width",itemWidth*count);
	changeBtn();
	function roll(){
		if(num<=rollNum){
			$list.stop(true).animate({left:-num*itemWidth*boxContent},{duration:time,easing:"easeInOutQuad"});		
		}
	}
	function changeBtn(){
		if(num==0){
			$lBtn.css("cursor","default").addClass(lbtnStyle);
		}else{
			$lBtn.css("cursor","pointer").removeClass(lbtnStyle);
		}
		if(num==rollNum){
			$rBtn.css("cursor","default").addClass(rbtnStyle);
		}else{
			$rBtn.css("cursor","pointer").removeClass(rbtnStyle);
		}
	}
	$lBtn.click(function(){
		if(num<=rollNum&&num>0){
			num--;
			roll();
		}
		changeBtn();
	})
	$rBtn.click(function(){
		if(num<rollNum&&num>=0){
			num++;
			roll();
		}
		changeBtn();
	})			
}

//上下滚动
function startmarquee(lh,speed,delay,id) {
	var t;
	var p=false;
	var o=document.getElementById(id);
	o.innerHTML+=o.innerHTML;
	o.onmouseover=function () {p=true;}
	o.onmouseout=function () {p=false;}
	o.scrollTop=0;
	function start() {
		t=setInterval(scrolling,speed);
		if(!p)o.scrollTop+=2;
	}
	function scrolling() {
		if(o.scrollTop%lh!=0) {
			o.scrollTop+=2;
			if(o.scrollTop>=o.scrollHeight/2)o.scrollTop=0;
		}else {
			clearInterval(t);
			setTimeout(start,delay);
		}
	}
	setTimeout(start,delay);
}

//倒计时重新执行
function isAbleCountdown(id,s){
	 var wait = s;
	 var $btn = $("#"+id);
	 var defaultTxt = $btn.val(); 
	 time($btn);
     function time($btn){
     	if(wait == 0){
        	$btn.removeAttr("disabled");
            $btn.val(defaultTxt);
            wait = s;
        }else{
        	$btn.attr("disabled", true);
        	$btn.val(wait + "秒后重新"+defaultTxt);
        	wait--;
            setTimeout(function(){
                 time($btn);
            },1000)
        }
	} 
}

//输入框文本提示
function txtTips(id,labelId,style){
	var $txt=$("#"+id);
	var $label=$("#"+labelId);
	var focusStyle=style;

	$txt.each(function(){
		if($(this).val()==''){
			$label.show();	
		}else{
			$label.hide();	
		}
		$(this).focus(function(){
			if($(this).val()==''){
				$label.show().addClass(focusStyle);				
			}else{
				$label.hide();	
			}	
		}).blur(function(){
			if($(this).val()==''){
				$label.show().removeClass(focusStyle);		
			}else{
				$label.hide();		
			}
		}).keydown(function(){
			$label.hide();
		}).keyup(function(){
			if($(this).val()==''){
				$label.show().addClass(focusStyle);						
			}else{
				$label.hide();
			}
		})
	})
}

//js改变输入框的值联动
function init(id,outputId,cycleId){
	if("\v"=="v"){
		$("#"+id).onpropertychange=changeValue(id,outputId,cycleId);
	}else{
		$("#"+id).addEventListener("input",changeValue(id,outputId,cycleId),false);
	}
}
function changeValue(id,outputId,cycleId){
	$("#"+outputId).text($("#"+id).val());
	$("#"+cycleId).trigger('click');
}

//js改变输入框的值联动2
function init2(id){
	if("\v"=="v"){
		$("#"+id).onpropertychange=$("#"+id).trigger('keyup');
	}else{
		$("#"+id).addEventListener("input",$("#"+id).trigger('keyup'),false);
	}
}

//表格开关效果
function togTR(id){
	$("#"+id).parents("tr").next().toggle();
	
}
//鼠标经过开关效果
function togDiv(tog,togBox,t,l){
	var $tog = $("#"+tog);
	var $togBox = $("#"+togBox);
	var offset = $tog.offset();
	var top = Math.round(offset.top)+t;
	var left = Math.round(offset.left)+l;
	
	$togBox.show().css({'top':top,'left':left});
	$("#"+tog+",#"+togBox).hover(function(){
		$togBox.show().css({'top':top,'left':left});		
	},function(){
		$togBox.hide();	
	})
}

//鼠标经过开关效果2
function togDiv2(tog,togBox){
	var $tog = $("#"+tog);
	var $togBox = $("#"+togBox);
	$togBox.show();
	$("#"+tog+",#"+togBox).hover(function(){
		$togBox.show();	
	},function(){
		$togBox.hide();
	})
}

//鼠标经过开关效果3
function togDiv3(tog,togBox,style){
	var $tog = $("#"+tog);
	var $togBox = $("#"+togBox);
	$tog.addClass(style);
	$togBox.show();
	$tog.hover(function(){
		$(this).addClass(style);
		$togBox.show();		
	},function(){
		$(this).removeClass(style);
		$togBox.hide();		
	})
}

//滑动效果
function slideDiv(divId,s){
	$("#"+divId).slideToggle(s);	
}

//双按钮表单滑动效果
function slideDiv2(divId,s,btnId,style,btnTxt,btnSub,spread){
	var $btn = $("#"+btnId);
	var $btnSub = $("#"+btnSub);
	var $div = $("#"+divId);
	var isClose = Boolean($div.css("display")=="none");
	var spr = Boolean(spread);

	slideDiv(divId,s);
	if(spr){
		if(isClose){
			$btn.find("span").addClass(style);
			$btn.find("em").text(btnDefaultTxt);
			$btnSub.hide();
		}else{
			btnDefaultTxt = $btn.find("em").text();
			$btn.find("span").removeClass(style);
			$btn.find("em").text(btnTxt);
			$btnSub.show();			
		}
	}else{
		if(isClose){
			btnDefaultTxt = $btn.find("em").text();
			$btn.find("span").addClass(style);
			$btn.find("em").text(btnTxt);
			$btnSub.hide();
		}else{
			$btn.find("span").removeClass(style);
			$btn.find("em").text(btnDefaultTxt);
			$btnSub.show();			
		}
	}
}

//单选链接
function radioLink(id,listId,name,selectedStyle,noLimit,isHideLink,optionLabel,optionStyle){
	var $curRadio = $("#"+id);
	var selStyle = selectedStyle;
	var $radio = $("#"+listId).find("[name]='"+name+"'").not("#"+noLimit);
	$curRadio.addClass(selStyle).siblings().removeClass(selStyle);
	if(isHideLink){	
		var $optionLabel = $("#"+optionLabel);
		var optStyle = optionStyle;
		if($radio.filter("."+selStyle).length){
			$optionLabel.addClass(optStyle);			
		}else{
			$optionLabel.removeClass(optStyle);
		}
	}
}

//输入框数字验证
function isNum(id){
	var $t = $("#"+id);
	$t.each(function(){
		if(isNaN($(this).val())){
			$(this).val("");	
		}
	})
}

//验证正整数且小于digits位
function isInt(id,digits){
	var $t = $("#"+id);
	$t.each(function(){
		if(digits){
			var digitsNum = digits; 
			if(this.value.length>digitsNum){
				this.value=this.value.substr(0,digitsNum);
			}
		}
		$(this).val(parseInt(this.value));		
	})
	isNum(id);
}

//s秒后跳转到新页面
function goURL(id,s,url){
	var time = s;
	var $restTime = $("#"+id);
	timeCount($restTime);
	function timeCount($restTime){
		if(time==0){
			window.location.href=url;
		}else{
			$restTime.text(time);
			time--;	
			setTimeout(function(){
				timeCount($restTime);	
			},1000)
		}
	}	
}

//s秒后关闭弹窗
function exitPopup(id,popup,s){
	time = s;
	var $restTime = $("#"+id);
	timeCount($restTime);
	function timeCount($restTime){
		if(time==0){
			popup_exit(popup);
		}else{
			$restTime.text(time);
			time--;	
			setTimeout(function(){
				timeCount($restTime);	
			},1000)
		}
	}	
}

//对多个输入值求和,输出和及和的0.r倍及1.r倍
function summation(clas,ratio,ratioOutput,totalOutput,sumOutput){
	var $input=$("."+clas);
	var $ratioOutput=$("#"+ratioOutput);
	var $totalOutput=$("#"+totalOutput);
	var $sumOutput=$("#"+sumOutput);
	var rate=Number(ratio);
	var sum=0,ratiovalue=0,total=0;	
	$input.each(function(i){
		if(this.value!=''){
			sum+=Number(this.value);	
		}
	})
	sum=Number(sum.toFixed(2));
	ratiovalue=Number((sum*rate).toFixed(2));
	total=sum+ratiovalue;
	$ratioOutput.text(ratiovalue);
	$totalOutput.text(total);
	$sumOutput.text(sum);	
}

//切换元素的样式及title属性
function togStyle(id,clas1,clas2,title1,title2){
	var $elem = $("#"+id);
	$elem.each(function(){
		if($(this).attr("title")==title1){
			$(this).attr("title",title2);	
		}else{
			$(this).attr("title",title1);		
		}
		if($(this).hasClass(clas1)){
			$(this).removeClass(clas1).addClass(clas2);		
		}else{
			$(this).removeClass(clas2).addClass(clas1);		
		}
	})
}

//更换元素的样式及title属性
function changeStyle(id,addClas,removeClas,title){
	var $elem = $("#"+id);
	$elem.each(function(){
		if(!$(this).hasClass(addClas)){
			$(this).addClass(addClas);		
		}
		if($(this).hasClass(removeClas)){
			$(this).removeClass(removeClas);		
		}
		if($(this).attr("title")!=title){
			$(this).attr("title",title);	
		}
	})
}

//文本控制全选、反选
function txtAllSelect(id,list,allSelTxt,noSelTxt){
	var $txt=$("#"+id);
	var $list=$("#"+list).find(":checkbox");
	
	$txt.click(function(){
		if($(this).text()==allSelTxt){
			$list.not(":disabled").attr("checked","checked");
			$(this).text(noSelTxt);			
		}else if($(this).text()==noSelTxt){
			$list.not(":disabled").removeAttr("checked");
			$(this).text(allSelTxt);			
		}
	})
	$list.click(function(){
		var boxCount=$list.not(":disabled").length;
		if($list.not(":disabled").filter(":checked").length==boxCount){
			$txt.text(noSelTxt);		
		}else{
			$txt.text(allSelTxt);	
		}
	})	
}

//区间日历
function secCalendar(sTxt,eTxt){
	var nowTemp = new Date();
	var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
 	var checkin = $('#'+sTxt).datepicker({
  		onRender: function(date) {
    		return date.valueOf() < now.valueOf() ? 'disabled' : '';
  		}
	}).on('changeDate', function(ev) {
		if (ev.date.valueOf() > checkout.date.valueOf()) {
    		var newDate = new Date(ev.date)
    		newDate.setDate(newDate.getDate() + 1);
    		checkout.setValue(newDate);
  		}
  		checkin.hide();
  		$('#'+eTxt)[0].focus();
	}).data('datepicker');
	var checkout = $('#'+eTxt).datepicker({
  		onRender: function(date) {
    		return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
  		}
	}).on('changeDate', function(ev) {
  		checkout.hide();
	}).data('datepicker');	
}

//历史区间日历
function historyCalendar(sTxt,eTxt){
	var nowTemp = new Date();
	var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
 	var checkin = $('#'+sTxt).datepicker({
  		onRender: function(date) {
    		return date.valueOf() > now.valueOf() ? 'disabled' : '';
  		}
	}).on('changeDate', function(ev) {
		if (ev.date.valueOf() < checkout.date.valueOf()) {
    		var newDate = new Date(ev.date)
    		newDate.setDate(newDate.getDate() + 1);
    		checkout.setValue(newDate);
  		}
  		checkin.hide();
  		$('#'+eTxt)[0].focus();
	}).data('datepicker');
	var checkout = $('#'+eTxt).datepicker({
  		onRender: function(date) {
    		return date.valueOf() <= checkin.date.valueOf() || date.valueOf() > now.valueOf()  ? 'disabled' : '';
  		}
	}).on('changeDate', function(ev) {
  		checkout.hide();
	}).data('datepicker');	
}

//返回选中单选框的序号
function radioCheckedIndex(listId,name){
	var n;
	$radio = $("#"+listId).find("[name]='"+name+"'");
	$radio.each(function(){
		if($(this).attr("checked")){
			n = $radio.index($(this));	
		}
	})
	return n;	
}

//返回选中复选框的个数
function checkedCount(listId,notID1,notID2){
	var n;
	n=$("#"+listId).find(":checked").not(":disabled").not("#"+notID1).not("#"+notID2).length;
	return n;	
}

//文本及样式切换，同步切换另一元素和输入框的样式，且对输入框触发事件
function txtClasTog(id,elemId,textId,txt,togClas,elemClas,textClas,even){
	var $tog=$("#"+id);
	var $elem=$("#"+elemId);
	var $text=$("#"+textId);
	var isDefaultState=Boolean(!$tog.hasClass(togClas));
	if(isDefaultState){
		defaultTxt=$tog.text();	
		$tog.text(txt).addClass(togClas);
		$elem.addClass(elemClas);
		$text.removeClass(textClas).attr("disabled",true);
		$text.trigger(even);
	}else{
		$tog.text(defaultTxt).removeClass(togClas);	
		$elem.removeClass(elemClas);
		$text.addClass(textClas).removeAttr("disabled");
		$text.trigger(even);
	}	
}

//复选框切换标签文本及样式
function checkboxTxtTog(id,labelId,labelTxt,labelClas){
	var $checkbox=$("#"+id);
	var $label=$("#"+labelId);
	var isChecked=Boolean($checkbox.attr("checked"));
	if(isChecked){
		defaultLabelTxt=$label.text();
		$label.text(labelTxt).addClass(labelClas);					
	}else{
		$label.text(defaultLabelTxt).removeClass(labelClas);		
	}	
}

//复选框切换某id元素样式
function checkboxTogStyle(id,elemId,clas){
	var $checkbox=$("#"+id);
	var $elem=$("#"+elemId);
	var isChecked=Boolean($checkbox.attr("checked"));
	if(isChecked){
		$elem.addClass(clas);					
	}else{
		$elem.removeClass(clas);		
	}	
}

//复选框切换某clas元素样式
function checkboxTogClas(id,elemClas,clas){
	var $checkbox=$("#"+id);
	var $elem=$("."+elemClas);
	var isChecked=Boolean($checkbox.attr("checked"));
	if(isChecked){
		$elem.addClass(clas);					
	}else{
		$elem.removeClass(clas);		
	}	
}

//复选框切换某元素显示/隐藏，并对两数值求差
function checkboxTogSub(id,elemId,num1,num2,result){
	var $c=$("#"+id);
	var $elem=$("#"+elemId);
	$c.each(function(){
		var n1=Number($("#"+num1).text());
		var n2=Number($("#"+num2).text());
		var $r=$("#"+result);
		if($(this)[0].checked){
			$elem.show();
			$r.text(n1-n2)		
		}else{
			$elem.hide();
			$r.text(n1);
		}
	})
}

//本页快速定位
function goPoint(id,point,ms){
	var $btn = $("#"+id);
	var $point = $("#"+point);
	$btn.each(function(){
		var top = $point.offset().top;
		if(ms){
			$("html,body").animate({scrollTop:top},{duration:ms,easing:"easeOutQuad"});
		}else{
			$("html,body").animate({scrollTop:top},{duration:400,easing:"easeOutQuad"});
		}
	})	
}

//多分区关键字加样式
function textAddStyle(clas,list,text,style){
	var $area = $("."+clas);
	$area.each(function(){
		var keyWord = $(this).find("."+text).text().toLowerCase();
		$(this).find("."+list).textSearch(keyWord,{markClass:style});
	})	
}

//IE6下相对视窗浮动
function fixedIE6(id,top){
	var $elem = $("#"+id);
	var ua = navigator.userAgent.toLowerCase();
	var isIE6 = ua.indexOf("msie 6") > -1?true:false;
	$(window).scroll(function(){
		var Top = $(window).scrollTop();
		if(isIE6){
			$elem.css("top",Top+top);
		}
	})
}

//双复选框控制全选、反选
function allSelect(id1,id2,list){
	var $j1=$("#"+id1); 
	var $j2=$("#"+id2);   
	var $list=$("#"+list);
	$("#"+id1+",#"+id2).click(function(){
		$list.find(":checkbox").not(":disabled").attr("checked",this.checked);
		allSelectLabel(id1,id2,list);
	})	
	allSelectLabel(id1,id2,list);
	
	function allSelectLabel(id1,id2,list){
		$list.find(":checkbox").not("#"+id1+",#"+id2+", :disabled").click(function(){
			var $tmp=$list.find(":checkbox").not("#"+id1+",#"+id2+", :disabled");
			$j1.attr("checked",$tmp.length==$tmp.filter(":checked").not(":disabled").length);
			$j2.attr("checked",$tmp.length==$tmp.filter(":checked").not(":disabled").length);
		})		
	}
}

//复选框控制全选、反选
function allSelect2(id,list){
	var $j=$("#"+id);
	var $list=$("#"+list);
	$list.find(":checkbox").not("#"+id+", :disabled").attr("checked",$j[0].checked);
	$list.find(":checkbox").not("#"+id+", :disabled").click(function(){
		var $tmp=$list.find(":checkbox").not("#"+id+", :disabled");
		$j.attr("checked",$tmp.length==$tmp.filter(":checked").not(":disabled").length);
	})	
}

//单选框组有选中项时，选中复选框
function radioCheck(id,listId,name){
	var $box=$("#"+id);
	var $radio=$("#"+listId).find("[name]='"+name+"'");
	var count=$radio.filter(":checked").length;
	if(count){
		$box.attr("checked","checked");		
	}else{
		$box.removeAttr("checked");	
	}		
}