/**
 * @매장 찾기
 */
if(typeof Papajohns === 'undefined'){
	Papajohns = {};
}
Papajohns.Basket = function(el,pt){
	this.$el = $(el);
	this.pagetype = pt;
	this.init();
};
Papajohns.Basket.prototype ={
		init : function(){
			this.initVar();
			this._bindEvent();
			this.initDiscountFreeItem();
			//this.initDiscount();
		},
		initVar : function(){
			this.htLayer = {
				btn_reset : this.$el.find('.btn_init:first'),
				basket_count : this.$el.find('.basket_count:first'),
				list : this.$el.find('.basket_li:first'),
				total_price : this.$el.find('.total_price:first'),
				btn_order : this.$el.find('.btn_order:first'),
				btn_init : this.$el.find('.btn_init:first')
				
			};
		
			
			this.api = "/get.do";
			this.tpl ={
				option : '<option value="{=VALUE}">{=NAME}</option>',
				basketItem : "<li><h3 class=\"t_blk\">{=NAME}</h3> "+
								"<p class=\"t_dgray mb15\">{=SIZE} {=PRICE}</p>" +
								"<p class=\"mb20\"> " +
								"	<label class=\"spinner_wrap mr4\" data-value=\"{=ITEM_ID}\" data-set=\"N\" data-type=\"{=PRODUCT_TYPE_ID}\"> "+
								"		<span class=\"lbl spn_lbl\">수량</span>" +
								"		<input class=\"spinner f14\" name=\"qty\" type=\"text\" value=\"{=QTY}\" title=\"수량입력\" disabled /><a href=\"#\" class=\"btn_plus\" ><span>더하기</span></a><a href=\"#\" class=\"btn_minus\"><span>빼기</span></a> " +
								"	</label><a href=\"#\" class=\"btn_del\">삭제</a> " +
								"</p> " +
								" <p class=\"mb10 f11 desc\">{=INSTRUCTION_TXT}</p> "+
								" <ul class=\"topping_li\"> " +
								"	<li><a href=\"#topping_popup\" class=\"button btn_gray h20 pop_open\"><span class=\"topping\" data-orderid=\"{=ORDER_ID}\" data-orddid=\"{=ORDER_DEATIL_ID}\" data-pd_oid=\"{=ORDER_DETAIL_PD_OID}\" data-sp_oid=\"{=ORDER_DETAIL_SP_OID1}\"  data-mode=\"left\"  data-half='1'>topping</span></a><p class=\"f_right t_dgray\">{=TOPPING_PRICE}</p> " +
								"		<ul class=\"left-topping\">" +
								" {=LEFT_TOPPING_LIST}" +
								"		</ul> " +
								"	</li> ",
				basketItemType2 : "<li><h3 class=\"t_blk\">{=NAME}</h3> "+
								"<p class=\"t_dgray mb15\">{=SIZE} {=PRICE}</p>" +
								"<p class=\"mb20\"> " +
								"	<label class=\"spinner_wrap mr4\" data-value=\"{=ITEM_ID}\" data-set=\"N\" data-type=\"{=PRODUCT_TYPE_ID}\"> "+
								"		<span class=\"lbl spn_lbl\">수량</span>" +
								"		<input class=\"spinner f14\" name=\"qty\" type=\"text\" value=\"{=QTY}\" title=\"수량입력\" disabled/><a href=\"#\" class=\"btn_plus\" ><span>더하기</span></a><a href=\"#\" class=\"btn_minus\"><span>빼기</span></a> " +
								"	</label><a href=\"#\" class=\"btn_del\">삭제</a> " +
								"</p></li>",
				basketItemHalf : "<li>" +
								" <h3 class=\"t_blk\">하프앤하프</h3> " + 
								" <p class=\"t_dgray mb15\">{=SIZE_PRICE}</p>" +
								" <p class=\"mb20\"> " +
								"	<label class=\"spinner_wrap mr4\" data-value=\"{=ITEM_ID}\" data-set=\"N\" data-type=\"{=PRODUCT_TYPE_ID}\"> " +
								"		<span class=\"lbl spn_lbl\">수량</span> " +
								"		<input class=\"spinner f14\" name=\"qty\" type=\"text\" value=\"{=QTY}\" title=\"수량입력\" disabled/><a href=\"#\" class=\"btn_plus\" ><span>더하기</span></a><a href=\"#\" class=\"btn_minus\"><span>빼기</span></a> " +
								"	</label><a href=\"#\" class=\"btn_del\">삭제</a> " +
								" </p> " +
								" <p class=\"mb10 f11 desc\">{=INSTRUCTION_TXT}</p> "+
								" <ul class=\"topping_li\"> " +
								"	<li><a href=\"#topping_popup\" class=\"button btn_gray h20 pop_open\"><span class=\"topping\" data-orderid=\"{=ORDER_ID}\" data-orddid=\"{=ORDER_DEATIL_ID}\" data-pd_oid=\"{=ORDER_DETAIL_PD_OID}\" data-sp_oid=\"{=ORDER_DETAIL_SP_OID1}\"  data-mode=\"left\" data-half='2'>topping</span></a><p class=\"f_right t_dgray\">{=TOPPING_PRICE_L}</p>  " +
								"		<h4>└ {=LEFT_PD_NAME}</h4> " +
								"		<ul class=\"left-topping\"> " +
								"			{=LEFT_TOPPING_LIST}" +
								"		</ul> " +
								"	</li> " +
								"	<li> " +
								"		<a href=\"#topping_popup\" class=\"button btn_gray h20 pop_open\"><span class=\"topping\" data-orderid=\"{=ORDER_ID}\" data-orddid=\"{=ORDER_DEATIL_ID}\" data-pd_oid=\"{=ORDER_DETAIL_PD_OID}\" data-sp_oid=\"{=ORDER_DETAIL_SP_OID2}\"  data-mode=\"right\" data-half='2'>topping</span></a><p class=\"f_right t_dgray\">{=TOPPING_PRICE_R}</p> " +
								"		<h4>└ {=RIGHT_PD_NAME}</h4> " +
								"		<ul class=\"right-topping\"> " +
								"			{=RIGHT_TOPPING_LIST} " +
								"		</ul> " +
								"	</li> "+
								" </ul> " +
								" </li> ",
				basketItemSet : "<li><h3 class=\"t_blk\">{=NAME}</h3> "+
								"<p class=\"t_dgray mb15\">{=SIZE} {=PRICE}</p>" +
								"<p class=\"mb20\"> " +
								"	<label class=\"spinner_wrap mr4\" data-value=\"{=ITEM_ID}\" data-set=\"{=SET_GROUP}\" data-type=\"{=PRODUCT_TYPE_ID}\"> "+
								"		<span class=\"lbl spn_lbl\">수량</span>" +
								"		<input class=\"spinner f14\" name=\"qty\" type=\"text\" value=\"{=QTY}\" title=\"수량입력\" disabled/><a href=\"#\" class=\"btn_plus\" ><span>더하기</span></a><a href=\"#\" class=\"btn_minus\"><span>빼기</span></a> " +
								"	</label><a href=\"#\" class=\"btn_del\">삭제</a> " +
								"</p> " +
								" <p class=\"mb10 f11 desc\">{=INSTRUCTION_TXT}</p> "+
								" <ul class=\"topping_li\"> " +
								"	<li><!--a href=\"#topping_popup\" class=\"button btn_gray h20 pop_open\"><span class=\"topping hide\" data-orderid=\"{=ORDER_ID}\" data-orddid=\"{=ORDER_DEATIL_ID}\" data-pd_oid=\"{=ORDER_DETAIL_PD_OID}\" data-sp_oid=\"{=ORDER_DETAIL_SP_OID1}\"  data-mode=\"left\"  data-half='1'>topping</span></a--><p class=\"f_right t_dgray\">{=TOPPING_PRICE}</p> " +
								"		<ul class=\"left-topping\">" +
								" {=LEFT_TOPPING_LIST}" +
								"		</ul> " +
								"	</li> ",
				basketItemEcoupon : "<li><h3 class=\"t_blk mb5\">{=NAME}</h3>"+
								"<p class=\"t_dgray\"><span class=\"red_box mr10\">E</span> {=PRICE}"+
								" <label class=\"spinner_wrap mr4\" data-value=\"{=ITEM_ID}\" data-set=\"{=SET_GROUP}\" data-type=\"{=PRODUCT_TYPE_ID}\"></label>"+
								"<a href=\"#\" class=\"btn_del f_right\">삭제</a></p> "+
								"</li>",
				basketItemInternet : "<li><h3 class=\"t_blk\">{=NAME}</h3> "+
								"<p class=\"t_dgray mb15\">{=SIZE} {=PRICE}</p>" +
								"<p class=\"mb20\"> " +
								"	<label class=\"spinner_wrap mr4\" data-value=\"{=ITEM_ID}\" data-set=\"{=SET_GROUP}\" data-type=\"{=PRODUCT_TYPE_ID}\"> "+
								"		<!--<span class=\"lbl spn_lbl\">수량</span>" +
								"		<input class=\"spinner f14\" name=\"qty\" type=\"text\" value=\"{=QTY}\" title=\"수량입력\" disabled/><a href=\"#\" class=\"btn_plus\" ><span>더하기</span></a><a href=\"#\" class=\"btn_minus\"><span>빼기</span></a> --> " +
								"	</label><a href=\"#\" class=\"btn_del f_right\">삭제</a> " +
								"</p> " +
								" <dl> "+
								" 	<dt><!--a href=\"#topping_popup\" class=\"button btn_gray h20 pop_open\"><span class=\"topping hide\" data-orderid=\"{=ORDER_ID}\" data-orddid=\"{=ORDER_DEATIL_ID}\" data-pd_oid=\"{=ORDER_DETAIL_PD_OID}\" data-sp_oid=\"{=ORDER_DETAIL_SP_OID1}\"  data-mode=\"left\"  data-half='1'>topping</span></a--><p class=\"f_right t_dgray\">{=TOPPING_PRICE}</p></dt>"+
								" 	<dd class=\"f11 mb10 desc\">{=INSTRUCTION_TXT}</dd> "+
								" </dl> " +
								" <dl class=\"f11\"> " +
								" {=LEFT_TOPPING_LIST} "+
								" <dd class=\"t_right\"><del class=\"red_line mr10\">{=ORI_PRICE}</del>{=NEW_PRICE}</dd>"+
								"</dl>"+
								"</li>",	
							   
				toppingItemHalfPlus : "<li>└ <span class=\"plus\">+</span>{=NAME}<p class=\"f_right\">{=QTY}</p></li> ",
				toppingItemHalfMinus : "<li>└ <span class=\"minus\">-</span>{=NAME}</li> ",
				toppingItemInternet : "<dt class=\"pb5\">└ <span class=\"red_box mr10\">C</span>{=NAME} <p class=\"f_right\">{=QTY}</p></dt> ",
				loading : "<p align='center'><img src='/resources/images/common/loading/ajax-loader.gif'/></p>"
				
			};
			this.ecoupon_qty = 0;
			this.pizza_qty = 0;
			this.side_qty = 0;
			this.drink_qty = 0;
			this.set_qty = 0;
			this.etc_qty = 0;
			this.etc2_qty = 0;
			this.last_order_detail_id = 0;
			this.tmp_ev = null;
			this.isInited = false;
			this.isInitedDiscount = false;
			this.isChangeCount = false;
			this.isAdd = false;
			this.internet_sales = [];
			
			this.pizza_limit_qty = 5;
			this.sidendrink_limit_qty = 9;
			
			//this.oSide = new Papajohns.Basket.AddSideDrink("#side_popup","side");
			//this.oDrink = new Papajohns.Basket.AddSideDrink("#drink_popup","drink");
			this.oSideNDrink = new Papajohns.Basket.AddSideDrinkPop("#addChoice_pop","");
			this.oTopping1 = new Papajohns.Basket.Topping("#topping_popup","add");
			this.oTopping2 = new Papajohns.Basket.Topping("#topping_popup2","remove");
			
			
		},
		_bindEvent : function(){
			/*
			this.htSearchElement.selectarea.bind('change',$.proxy(this.selectDo,this));
			this.htSearchElement.btnsearch.bind('click',$.proxy(this.selectSearch,this));
			this.htSearchElement.searchtext.bind('keyup',$.proxy(this._onKeyEnter,this));
			this.htSearchElement.btnsearch2.bind('click',$.proxy(this.selectSearch2,this));
			*/
			this.htLayer.list.bind('click',$.proxy(this.selectBasket,this));
			this.htLayer.btn_order.bind('click',$.proxy(this.isValidProduct,this));
			this.htLayer.btn_init.bind('click',$.proxy(this.emptyBasket,this));
			//this.htListElement.paging.bind('click',$.proxy(this.goPage,this));
			
		},
		_onKeyEnter : function(e){
			/*
			var el = $(e.target);
			if(e.which == 13){			
				if(el.is(this.htSearchElement.searchtext)){
					this.selectSearch2();
					//		this.currentFocus = this.htElement.pwd;
			//	}else if(el.is(this.htElement.pwd)){				
				//	this._onClickLogin(e);
				}
			}
			*/
			
			
		},
		moveTop:function(){
			var settings = {
		            button      : '#toTop',
		            text        : '컨텐츠 상단으로 이동',
		            min         : 100,
		            fadeIn      : 400,
		            fadeOut     : 400,
		            scrollSpeed : 800,
		            easingType  : 'easeInOutExpo'
		        };
			$('html, body').animate({ scrollTop : 0 }, settings.scrollSpeed, settings.easingType );
	        
		},
		initDiscount : function(){
			if(sessionStorage["order_id"] != '' && sessionStorage["order_id"] != null && typeof sessionStorage["order_id"] != "undefined"){
				var param = []
				param.push('id=Menu');
				param.push('ac=initcartdiscount'); 
				param.push('order_id=' + sessionStorage["order_id"]);
				var self = this;
				$.ajax({
					type: 'get',
					url : this.api,
					data : param.join('&'),
					dataType : 'jsonp',
					async : false,
					contentType:'application/json; charset=utf-8',
					error:function(){
						alert('에러:주문 데이터 송수신에 문제가 있습니다.');
					},
					success: function(data){
						//self.oTopping1.hide();
						//self.oTopping2.hide();
						self.isInitedDiscount = true;
						loadCart(sessionStorage["user_customer_id"], sessionStorage["order_id"]);
					}
				});
			} else {
				this.isInitedDiscount = true;
				loadCart(sessionStorage["user_customer_id"], sessionStorage["order_id"]);
			}
			
		
		},
		initDiscountFreeItem : function(){
			if(sessionStorage["order_id"] != '' && sessionStorage["order_id"] != null && typeof sessionStorage["order_id"] != "undefined"){
				var param = []
				param.push('id=Menu');
				param.push('ac=initcartdiscountfree'); 
				param.push('order_id=' + sessionStorage["order_id"]);
				var self = this;
				$.ajax({
					type: 'get',
					url : this.api,
					data : param.join('&'),
					dataType : 'jsonp',
					async : false,
					contentType:'application/json; charset=utf-8',
					error:function(){
						alert('에러:주문 데이터 송수신에 문제가 있습니다.');
					},
					success: function(data){
						self.initDiscount();
						
					}
				});
			} else {
				this.initDiscount();
			}
			
		
		},
		isEmpty:function(){
			if(this.pizza_qty > 0)
				return false;
			if(this.side_qty > 0)
				return false;
			if(this.drink_qty > 0)
				return false;
			if(this.set_qty > 0)
				return false;
			if(this.etc_qty > 0)
				return false;
			if(this.etc2_qty > 0)
				return false;
			return true;
		},
		
		emptyBasket: function(){
			this.ecoupon_qty = 0;
			this.pizza_qty = 0;
			this.side_qty = 0;
			this.drink_qty = 0;
			this.set_qty = 0;
			this.last_order_detail_id = 0;
			this.tmp_ev = null;
			this.isInited = true;
			this.isInitedDiscount = true;
			this.isChangeCount = false;
			this.updateOrderDelete("","N");
		},
		initBasket: function(){
			this.htLayer.list.html("");
			this.htLayer.basket_count.html(0);
			this.htLayer.total_price.html(0);
		},
		setCookie : function (cName, cValue, cDay){
	          var expire = new Date();
	          expire.setDate(expire.getDate() + cDay);
	          cookies = cName + '=' + escape(cValue) + '; path=/ '; 
	          if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
	          document.cookie = cookies;
	    },
		paintBasket : function(data){
		//	var ev = JSON.parse(data);
			
			var ev = data;
			
			this.htLayer.list.html(this.tpl.loading);
			
			var item_count = 0;
			var total_price = 0;
			this.pizza_qty = 0;
			this.side_qty = 0;
			this.drink_qty = 0;
			this.etc_qty = 0;
			this.etc2_qty = 0;
			this.set_qty = 0;
			this.ecoupon_qty = 0;
			this.internet_sales = [];
			console.log(data);
			var last_detail_id = 0 ;
			this.setCookie("order_cart_id", ev[0].order_id, 1);
			this.setCookie("order_store_id", ev[0].store_id, 1);
			this.setCookie("user_id", ev[0].user_id, 1);
			this.setCookie("cust_tel", ev[0].phone_no, 1);
			
				
			for(var i = 0; i < ev.length ; i++ ){
				var pd_name = ev[i].pd_name;
				if (ev[i].p_order_id != ""){
					sessionStorage["order_id"] = 0;
					alert("주문정보 설정을 다시 해주시기 바랍니다","location.href='delivery.jsp'");
				}else if (ev[i].order_type_code == 'undefined'){
					alert("주문정보 설정을 다시 해주시기 바랍니다","location.href='delivery.jsp'");
				} else if (pd_name != ''){
					pd_name = pd_name.replace(/{=BR}/g,"");
					if(i == 0){
						this.htLayer.list.html("");
					}
					var price = ev[i].pd_price;
					var sales_price = ev[i].sales_price;
					
					var sp_oid1_nm = ev[i].sp_oid1_nm.replace(/{=BR}/g,"") ;
					var sp_oid2_nm = ev[i].sp_oid2_nm.replace(/{=BR}/g,"") ;
					var pd_size = ev[i].pd_size;
					var sz_name = this.getSizeName(ev[i].pd_size);
					var dt_name = ev[i].dt_name;
					var qty = ev[i].product_count;
					var order_detail_id = ev[i].order_detail_id;
					var order_id = ev[i].order_id;
				
					var pd_oid  = ev[i].product_oid;
					var sp_oid1 = ev[i].sp_oid1;
					var sp_oid2 = ev[i].sp_oid2;
					var set_group = ev[i].set_group;
					var topping_amount = ev[i].topping_amount;
					var product_type_id = ev[i].product_type_id;
					var half = ev[i].half;
					var inst_txt = [];
					var left_lists = ev[i].left_list;
					var right_lists = ev[i].right_list;
					var discount_div = ev[i].discount_div;
					var set_internet = ev[i].set_internet;
					//console.log("TMP1["+i+"]"+set_internet);
					var instruction_text = ev[i].instruction_text;
					var refkey = ev[i].refkey;
					if(instruction_text != "") {
						inst_txt.push(instruction_text);
					}
					
					if(left_lists != ""){
						var left_list = left_lists.split(',');
						for(var j = 0; j < left_list.length ; j++){
							if(set_internet == "Y"){
								left_list[j] = this.tpl.toppingItemInternet.replace(/{=NAME}/,left_list[j]).replace(/{=QTY}/,"");
									
							} else if( left_list[j].substring(0,1)=="-"){
								left_list[j] = this.tpl.toppingItemHalfMinus.replace(/{=NAME}/,left_list[j].substring(1)).replace(/{=QTY}/,"");
							} else {
								left_list[j] = this.tpl.toppingItemHalfPlus.replace(/{=NAME}/,left_list[j].substring(1)).replace(/{=QTY}/,"");
							}
						}
					} else {
						var left_list = [];
					}
					
					if(right_lists != ""){
						var right_list = right_lists.split(',');
						for(var j = 0; j < right_list.length ; j++){
							if( right_list[j].substring(0,1)=="-"){
								right_list[j] = this.tpl.toppingItemHalfMinus.replace(/{=NAME}/,right_list[j].substring(1)).replace(/{=QTY}/,"");
							} else {
								right_list[j] = this.tpl.toppingItemHalfPlus.replace(/{=NAME}/,right_list[j].substring(1)).replace(/{=QTY}/,"");
							}
						}
					} else {
						var right_list = [];
					}
					
					var tmpLayer = "";
					
					if(discount_div == "E") {
						tmpLayer = this.tpl.basketItemEcoupon.replace(/{=SET_GROUP}/,set_group).replace(/{=PRODUCT_TYPE_ID}/,product_type_id).replace(/{=SIZE}/,sz_name).replace(/{=NAME}/, pd_name).replace(/{=PRICE}/,commify(price)).replace(/{=QTY}/,qty).replace(/{=ITEM_ID}/,order_detail_id).replace(/{=ORDER_ID}/,order_id).replace(/{=ORDER_DEATIL_ID}/,order_detail_id).replace(/{=ORDER_DETAIL_PD_OID}/,pd_oid).replace(/{=ORDER_DETAIL_SP_OID1}/,sp_oid1).replace(/{=ORDER_DETAIL_SP_OID2}/,sp_oid2).replace(/{=INSTRUCTION_TXT}/,inst_txt.join('</br>'));
						this.ecoupon_qty += parseInt(qty);
					} else if(product_type_id != '1'){
						tmpLayer = this.tpl.basketItemType2.replace(/{=PRODUCT_TYPE_ID}/,product_type_id).replace(/{=SIZE}/,sz_name).replace(/{=NAME}/, pd_name).replace(/{=PRICE}/,commify(price)).replace(/{=QTY}/,qty).replace(/{=ITEM_ID}/,order_detail_id).replace(/{=ORDER_ID}/,order_id).replace(/{=ORDER_DEATIL_ID}/,order_detail_id).replace(/{=ORDER_DETAIL_PD_OID}/,pd_oid).replace(/{=ORDER_DETAIL_SP_OID1}/,sp_oid1).replace(/{=ORDER_DETAIL_SP_OID2}/,sp_oid2).replace(/{=INSTRUCTION_TXT}/,inst_txt.join('</br>'));
					} else {
						if(half == "2"){
							//price = parseInt(ev[i].unit_price1) / parseInt(half) + parseInt(ev[i].unit_price2) / parseInt(half);
							//price = ev[i].pd_price / qty;
							price = ev[i].pd_price;
							
							var topping_amount_l = ev[i].left_t_amount;
							var topping_amount_r = ev[i].right_t_amount;
							
							var topping_price_l = "";
							if ( topping_amount_l > 0 ){
								topping_price_l = commify(topping_amount_l.toString());
							}
							var topping_price_r = "";
							if ( topping_amount_r > 0 ){
								topping_price_r = commify(topping_amount_r.toString());
							}
							tmpLayer = this.tpl.basketItemHalf.replace(/{=PRODUCT_TYPE_ID}/,product_type_id).replace(/{=RIGHT_TOPPING_LIST}/,right_list.join("")).replace(/{=LEFT_TOPPING_LIST}/,left_list.join("")).replace(/{=TOPPING_PRICE_L}/,topping_price_l).replace(/{=TOPPING_PRICE_R}/,topping_price_r).replace(/{=SIZE_PRICE}/,sz_name+" "+dt_name+" "+commify(price.toString())).replace(/{=LEFT_PD_NAME}/, sp_oid1_nm).replace(/{=RIGHT_PD_NAME}/, sp_oid2_nm).replace(/{=QTY}/,qty).replace(/{=ITEM_ID}/,order_detail_id).replace(/{=ORDER_ID}/,order_id).replace(/{=ORDER_DEATIL_ID}/,order_detail_id).replace(/{=ORDER_DETAIL_PD_OID}/,pd_oid).replace(/{=ORDER_DETAIL_SP_OID1}/,sp_oid1).replace(/{=ORDER_DETAIL_SP_OID2}/,sp_oid2).replace(/{=INSTRUCTION_TXT}/,inst_txt.join('</br>'))
							tmpLayer = tmpLayer.replace(/{=ITEM_ID}/,order_detail_id).replace(/{=ORDER_ID}/,order_id).replace(/{=ORDER_DEATIL_ID}/,order_detail_id).replace(/{=ORDER_DETAIL_PD_OID}/,pd_oid).replace(/{=ORDER_DETAIL_SP_OID1}/,sp_oid1).replace(/{=ORDER_DETAIL_SP_OID2}/,sp_oid2).replace(/{=INSTRUCTION_TXT}/,inst_txt.join('</br>'))
							
							//console.log("TMP half["+i+"]"+tmpLayer);
						} else if( set_internet == "Y" ) {
							this.internet_sales.push(ev[i].discount_id1);
							//price = ev[i].pd_price / qty;
							price = ev[i].pd_price;
							var unit_price = ev[i].unit_price1;
							var topping_price = "";
							if ( topping_amount > 0 ){
								topping_price = commify(topping_amount.toString());
							}
							tmpLayer = this.tpl.basketItemInternet.replace(/{=ORI_PRICE}/,commify(unit_price)).replace(/{=NEW_PRICE}/,commify(price)).replace(/{=PRODUCT_TYPE_ID}/,product_type_id).replace(/{=SET_GROUP}/,set_internet).replace(/{=LEFT_TOPPING_LIST}/,left_list.join("")).replace(/{=TOPPING_PRICE}/,topping_price).replace(/{=SIZE}/,sz_name).replace(/{=NAME}/, pd_name+" "+dt_name).replace(/{=PRICE}/,commify(price)).replace(/{=QTY}/,qty).replace(/{=ITEM_ID}/,refkey).replace(/{=ORDER_ID}/,order_id).replace(/{=ORDER_DEATIL_ID}/,refkey).replace(/{=ORDER_DETAIL_PD_OID}/,pd_oid).replace(/{=ORDER_DETAIL_SP_OID1}/,sp_oid1).replace(/{=ORDER_DETAIL_SP_OID2}/,sp_oid2).replace(/{=INSTRUCTION_TXT}/,inst_txt.join('</br>'))
							this.set_qty += parseInt(qty);
							this.drink_qty += parseInt(qty);
						} else if( set_group != "N" ) {
							//price = ev[i].pd_price / qty;
							price = ev[i].pd_price;
							var topping_price = "";
							if ( topping_amount > 0 ){
								topping_price = commify(topping_amount.toString());
							}
							tmpLayer = this.tpl.basketItemSet.replace(/{=PRODUCT_TYPE_ID}/,product_type_id).replace(/{=SET_GROUP}/,set_group).replace(/{=LEFT_TOPPING_LIST}/,left_list.join("")).replace(/{=TOPPING_PRICE}/,topping_price).replace(/{=SIZE}/,sz_name).replace(/{=NAME}/, pd_name+" "+dt_name).replace(/{=PRICE}/,commify(price)).replace(/{=QTY}/,qty).replace(/{=ITEM_ID}/,order_detail_id).replace(/{=ORDER_ID}/,order_id).replace(/{=ORDER_DEATIL_ID}/,order_detail_id).replace(/{=ORDER_DETAIL_PD_OID}/,pd_oid).replace(/{=ORDER_DETAIL_SP_OID1}/,sp_oid1).replace(/{=ORDER_DETAIL_SP_OID2}/,sp_oid2).replace(/{=INSTRUCTION_TXT}/,inst_txt.join('</br>'))
							this.set_qty += parseInt(qty);
						} else if( pd_size.indexOf("BOX") > 0 || pd_size.indexOf("박스") > 0  ) {
							//price = ev[i].pd_price / qty;
							price = ev[i].pd_price;
							var topping_price = "";
							if ( topping_amount > 0 ){
								topping_price = commify(topping_amount.toString());
							}
							tmpLayer = this.tpl.basketItemSet.replace(/{=PRODUCT_TYPE_ID}/,product_type_id).replace(/{=SET_GROUP}/,set_group).replace(/{=LEFT_TOPPING_LIST}/,left_list.join("")).replace(/{=TOPPING_PRICE}/,topping_price).replace(/{=SIZE}/,sz_name).replace(/{=NAME}/, pd_name+" "+dt_name).replace(/{=PRICE}/,commify(price)).replace(/{=QTY}/,qty).replace(/{=ITEM_ID}/,order_detail_id).replace(/{=ORDER_ID}/,order_id).replace(/{=ORDER_DEATIL_ID}/,order_detail_id).replace(/{=ORDER_DETAIL_PD_OID}/,pd_oid).replace(/{=ORDER_DETAIL_SP_OID1}/,sp_oid1).replace(/{=ORDER_DETAIL_SP_OID2}/,sp_oid2).replace(/{=INSTRUCTION_TXT}/,inst_txt.join('</br>'))
							this.set_qty += parseInt(qty);
						} else {
							//price = ev[i].unit_price1;
							//price = ev[i].pd_price / qty;
							price = ev[i].pd_price;
							var topping_price = "";
							if ( topping_amount > 0 ){
								topping_price = commify(topping_amount.toString());
							}
							tmpLayer = this.tpl.basketItem.replace(/{=PRODUCT_TYPE_ID}/,product_type_id).replace(/{=LEFT_TOPPING_LIST}/,left_list.join("")).replace(/{=TOPPING_PRICE}/,topping_price).replace(/{=SIZE}/,sz_name).replace(/{=NAME}/, pd_name+" "+dt_name).replace(/{=PRICE}/,commify(price)).replace(/{=QTY}/,qty).replace(/{=ITEM_ID}/,order_detail_id).replace(/{=ORDER_ID}/,order_id).replace(/{=ORDER_DEATIL_ID}/,order_detail_id).replace(/{=ORDER_DETAIL_PD_OID}/,pd_oid).replace(/{=ORDER_DETAIL_SP_OID1}/,sp_oid1).replace(/{=ORDER_DETAIL_SP_OID2}/,sp_oid2).replace(/{=INSTRUCTION_TXT}/,inst_txt.join('</br>'))
						}
						
					}
					this.htLayer.list.append(tmpLayer);
					
					if(product_type_id == '1') {
						this.pizza_qty += parseInt(qty);
					} else if(product_type_id == '2') {
						this.drink_qty += parseInt(qty);
					} else if(product_type_id == '3') {
						this.side_qty += parseInt(qty);
					} else {
						if(ev[i].product_oid=="3022" && ev[i].sp_oid1=="1083"){
							this.etc2_qty += parseInt(qty);
						}else{
							this.etc_qty += parseInt(qty);
						}
						
					}
 					
					if(last_detail_id <= i){
						//console.log("set tmp ev");
						//console.log(last_detail_id+" <= "+ parseInt(i) );
						last_detail_id = i;
						this.tmp_ev = ev[i];
					}
					
					item_count++;
					
					//total_price += parseInt(sales_price);
					total_price = parseInt(sales_price);
					
				} else {
					//console.log("for menu : " + i);
					if(ev.length == 1){
						this.htLayer.list.html("장바구니가 비었습니다.");
					}
				}
				
				
			} // for
			/*
			console.log("this.pizza_qty :" + this.pizza_qty);
			console.log("this.drink_qty :" + this.drink_qty);
			console.log("this.side_qty :" + this.side_qty);
			*/
			
			
			this.htLayer.basket_count.html(item_count);
			if (total_price == ''){
				
				total_price = 0;
			}else{
				total_price = commify(total_price.toString());
			}
			this.htLayer.total_price.html(total_price);
			
			if(this.isInitedDiscount) {
				//console.log("if this.isInitedDiscount");
				//if(this.isInited){
				//	//console.log("if this.isInited");
					
					
					if( !this.isChangeCount){
						//console.log("if !this.isChangeCount this.isAdd = "+this.isAdd+" this.last_order_detail_id = "+this.last_order_detail_id +"/last_detail_id="+last_detail_id);
						if(this.isAdd && this.tmp_ev != null) {
							
							var tev = this.tmp_ev;
							
							
							if(tev.product_type_id == '1' && tev.set_group ==  "N" && tev.half != '2' && tev.set_internet != 'Y') {
								//console.log("tev.product_type_id");
								var t_order_detail_id = tev.order_detail_id;
								var t_order_id = tev.order_id;
								var t_pd_oid  = tev.product_oid;
								var t_sp_oid1 = tev.sp_oid1;
								var t_sp_oid2 = tev.sp_oid2;
								var t_half = tev.half;
								//if( (t_sp_oid1 == "1000" || t_sp_oid1 == "1012" ) ) {
								if(t_sp_oid1 == "1012" ) {	
									// 파파존스 마가리타 담긴후 토핑추가 팝업 생성;
									this.last_order_detail_id = last_detail_id;
									this.oTopping1.param(t_order_id,t_order_detail_id,t_pd_oid,t_sp_oid1,'left',t_half);
									this.oTopping2.param(t_order_id,t_order_detail_id,t_pd_oid,t_sp_oid1,'left',t_half);
									this.oTopping1.show();
								}
							}
							this.isAdd = false;
						}
						
						
					} else {
						//console.log("if this.isChangeCount");
					}
				//} else {
				//	//console.log("if !this.isInited");
				//}
				//this.isInited = true;
			}
			//장바구니 담은후 최상단으로 이동;
			this.moveTop();

		},
		selectBasket : function(e){
			e.preventDefault();
			var el = $(e.target);
			var nowtag =  e.target.tagName;
			//console.log(" event name : "+ nowtag);
			if( nowtag == "A") {
				//console.log(" el : "+ el.attr('class'));
				var li = $(e.target).parent('label:first');
				//console.log(" li : "+ li);
				var tt = $(li).attr('data-value');
				var set_group = $(li).attr('data-set');
				var ptypeid = $(li).attr('data-type');
				var qty = li.find('input[name=qty]:first');
				var prtitle = el.parents('li:first').find('.t_blk:first');
				console.log(prtitle.text());
				//console.log(tt+": qty = "+ qty.val()+"/ptypeid:"+ptypeid);
				if(el.attr('class') == "btn_plus") {
					if(ptypeid == "3"){
						if(!this.isValidSidecount(1)){
							alert("사이드는 최대" +this.sidendrink_limit_qty+" 개까지 주문이 가능합니다");
							return false;
						} 
						
					} else if (ptypeid=="2") {
						if(!this.isValidDrinkcount(1)){
							alert("음료는 최대" +this.sidendrink_limit_qty+" 개까지 주문이 가능합니다");
							return false;
						} 
					} else if (ptypeid=="4") {
						if(prtitle.text().indexOf("피클") > -1){
							if(!this.isValid2Etccount(1)){
								alert("소스 & 피클은 최대" +this.sidendrink_limit_qty+" 개까지 주문이 가능합니다");
								return false;
							}
						}else{
							if(!this.isValidEtccount(1)){
								alert("소스 & 피클은 최대" +this.sidendrink_limit_qty+" 개까지 주문이 가능합니다");
								return false;
							} 	
						}
						
					} else {
						if(!this.isValidPizzacount(1)){
							alert("피자는 최대 "+this.pizza_limit_qty+"판까지 주문 가능합니다.");
							return false;
						}
					}
					
					var tmp = qty.val();
					this.setOrderDetailCount(tmp,tt,set_group,true);//여기에 수량 증가 로직을 넣습니다. 
					
				} else if(el.attr('class') == "btn_minus") {
					var tmp = qty.val();
					this.setOrderDetailCount(tmp,tt,set_group,false);//여기에 수량 증가 로직을 넣습니다.
					//여기에 수량 감소 로직을 넣습니다. 
				} else if(el.attr('class').indexOf("btn_del") > -1 ) {
					var order_id = $(e.target).parent().children('label:first').attr('data-value');
					var set_group = $(e.target).parent().children('label:first').attr('data-set');
					//여기에 아이템 삭제 로직을 넣습니다.
					//console.log("btn_del: "+order_id+" / set_group"+set_group);
					this.updateOrderDelete(order_id,set_group);
				} else {
					return false;
				}	 
			} else if (nowtag == "SPAN"){
				if(el.attr('class') == "topping") {
					this.oTopping1.param(el.attr('data-orderid'),el.attr('data-orddid'),el.attr('data-pd_oid'),el.attr('data-sp_oid'),el.attr('data-mode'),el.attr('data-half'));
					this.oTopping2.param(el.attr('data-orderid'),el.attr('data-orddid'),el.attr('data-pd_oid'),el.attr('data-sp_oid'),el.attr('data-mode'),el.attr('data-half'));
					this.oTopping1.show();
				} 
			}
			return false;
		},
		existEcoupon : function(){
			if(this.ecoupon_qty > 0){
				return true;
			}
			return false;
		},
		isValidProduct : function(){
			if (this.pizza_qty == 0 && this.side_qty  ==  0  && this.drink_qty  ==  0 && this.set_qty == 0 && this.etc_qty == 0 ) {
				alert("장바구니에 제품이 없습니다.");
			} else {
				if( this.pizza_qty  > 0 || this.side_qty  > 0  ){
					
					if( ( this.side_qty == 0 || this.drink_qty == 0 ) && this.set_qty == 0 && this.ecoupon_qty == 0 ){
						this.oSideNDrink.show();
						//this.oSide.show();
					//} else if(this.drink_qty == 0 ){
						//this.oSideNDrink.show();
						//this.oDrink.show();
					} else {
						this.checkTimeSet();
					}
				} else if(this.drink_qty  >  0){
					alert("음료만 주문은 불가능합니다.");
				} else {
					alert("소스/피클류만 주문은 불가능합니다.");
				}
			}
			
			
			
		},
		isValidPizzacount : function(_qty){
			//console.log("isValidPizzacount Qty = "+this.pizza_qty+": Limit"+this.pizza_limit_qty+"");
			if(typeof _qty === undefined){
				_qty = 0;
			} else {
				_qty = parseInt(_qty);
			}
			if(this.pizza_qty + _qty > this.pizza_limit_qty){
				return false;
			}
			return true;
		},
		isValidDrinkcount : function(_qty){
			if(typeof _qty === undefined){
				_qty = 0;
			} else {
				_qty = parseInt(_qty);
			}
			//console.log("isValidDrinkcount Qty = "+(this.drink_qty)+": Limit"+this.sidendrink_limit_qty+"");
			if( this.drink_qty + _qty > this.sidendrink_limit_qty){
				return false;
			}
			return true;
		},
		isValidEtccount : function(_qty){
			console.log(this.etc_qty);
			if(typeof _qty === undefined){
				_qty = 0;
			} else {
				_qty = parseInt(_qty);
			}
			//console.log("isValidDrinkcount Qty = "+(this.drink_qty)+": Limit"+this.sidendrink_limit_qty+"");
			if( this.etc_qty + _qty > this.sidendrink_limit_qty){
				return false;
			}
			return true;
		}
		,
		isValid2Etccount : function(_qty){
			console.log(this.etc2_qty);
			if(typeof _qty === undefined){
				_qty = 0;
			} else {
				_qty = parseInt(_qty);
			}
			//console.log("isValidDrinkcount Qty = "+(this.drink_qty)+": Limit"+this.sidendrink_limit_qty+"");
			if( this.etc2_qty + _qty > this.sidendrink_limit_qty){
				return false;
			}
			return true;
		},
		isValidSidecount : function(_qty){
			if(typeof _qty === undefined){
				_qty = 0;
			} else {
				_qty = parseInt(_qty);
			}
			//console.log("isValidSideCount Qty = "+(this.side_qty )+": Limit"+this.sidendrink_limit_qty+"");
			if(this.side_qty  + _qty > this.sidendrink_limit_qty){
				return false;
			}
			return true;
		},
		goNextStep : function() {
			if(this.internet_sales.length > 0 ){
				console.log(this.internet_sales.join(''));
				var param = [];
				param.push('id=InternetSales');
				param.push('ac=TimeSaleCheck');
				param.push('ndiscountid='+this.internet_sales.join(','));
				var self = this;
				$.ajax({
					type: 'get',
					url : this.api,
					data : param.join('&'),
					dataType : 'jsonp',
					async : false,
					contentType:'application/json; charset=utf-8',
					error:function(){
						location.href="/order/payment_smilepay.jsp";
					},
					success: function(data){
						if(data != null){
							
							if(data[0].time_sale == "1"){
								location.href="/order/payment_smilepay.jsp";
							} else {
								alert("TIME SALE 시간이 지났습니다. 메뉴를 장바구니에서 제거해주세요",null);
							}
							
						}
					}
				});
			} else {
				location.href="/order/payment_smilepay.jsp";
						
			}
			/**if (this.checkTimeSet()){
			
			}	**/		
			/**this.checkTimeSet();**/
		},
		checkTimeSet : function(){
			var param = [];
			param.push('ex=External');
			param.push('ac=chkstore_openstatus');
			var self = this;
			$.ajax({
				type: 'get',
				url : this.api,
				data : param.join('&'),
				dataType : 'jsonp',
				async : false,
				contentType:'application/json; charset=utf-8',
				error:function(){
					alert('에러:주문 데이터 송수신에 문제가 있습니다.');
				},
				success: function(data){
					if(data != null){
						if(data[0].time_status == "CL"){
							alert("영업시간( 오전 11시 ~ 오후 10시 30분) 외에는  예약주문만 가능합니다.","basket.goNextStep()");
						} else if(data[0].time_status == "SC"){
							alert("주문마감 시간이 5분 남았습니다. 22시 30 분 이후로는  바로주문이 돼지 않습니다.","basket.goNextStep()");
						} else {
							self.goNextStep();
						}
					}
				}
			});
		},
		leadingZeros : function (n, digits) {
			  // 1 -> 01 과 같이 변경하기
			 var zero = '';
			  n = n.toString();

			  if (n.length < digits) {
			   for (i = 0; i < digits - n.length; i++)
			   zero += '0';
			  }
			  return zero + n;
		 },
		setOrderDetailCount :function (val,tt,set_group,plus){
			//console.log('this ori val =' + val);
			var resultVal = 0;
			if (plus){
				//전체 수량 로직
				resultVal = parseInt(val)+1;
			}else{
				resultVal = parseInt(val)-1;
				
			}
			//console.log('this val =' + resultVal);
			if (resultVal > 0){
				this.updateOrderDetailCount(resultVal,tt,set_group)
			}
		},
		updateOrderDetailCount :function (val,tt,set_group){
			
			this.initDiscountFreeItem();
			
			//console.log("updateOrderDetailCount");
			var param = []
			param.push('id=Menu');
			if(set_group != "N"){
				param.push('ac=updatedetailcountset'); 
			} else {
				param.push('ac=updatedetailcount'); 
			}
			param.push('order_id=' + sessionStorage["order_id"]);
			param.push('order_detail_id=' + tt);
			param.push('set_group=' + set_group);
			param.push('product_count=' + val);
			
			
			//alert(param.join('&'));
			
			var self = this;
			$.ajax({
				type: 'get',
				url : this.api,
				data : param.join('&'),
				dataType : 'jsonp',
				async : false,
				contentType:'application/json; charset=utf-8',
				error:function(){
					alert('에러:주문 데이터 송수신에 문제가 있습니다.');
				},
				success: function(data){
					//self.oTopping1.hide();
					//self.oTopping2.hide();
					self.isChangeCount = true;
					loadCart(sessionStorage["user_customer_id"], sessionStorage["order_id"]);
				}
			});
		},
		updateOrderDelete : function(od_id, set_group){
			//console.log("upda:"+od_id);
			//console.log("upda set :"+set_group);
			var param = []
			param.push('id=Menu');
			if(set_group != "N"){
				//console.log("upda set deleteorderdetailset :"+set_group);
				param.push('ac=deleteorderdetailset'); 
			} else {
				//console.log("upda set deleteorderdetail:"+set_group);
				param.push('ac=deleteorderdetail'); 
			}
			param.push('order_id=' + sessionStorage["order_id"]);
			param.push('order_detail_id=' + od_id);
			param.push('set_group=' + set_group);
			
			var self = this;
			$.ajax({
				type: 'get',
				url : this.api,
				data : param.join('&'),
				dataType : 'jsonp',
				async : false,
				contentType:'application/json; charset=utf-8',
				error:function(){
					alert('에러:주문 데이터 송수신에 문제가 있습니다.');
				},
				success: function(data){
					//self.oTopping1.hide();
					//self.oTopping2.hide();
					self.isChangeCount = true;
					loadCart(sessionStorage["user_customer_id"], sessionStorage["order_id"]);
				}
			});
		},
		getSizeName : function (size_cd) {
			if(size_cd == "R") {
				return "Regular";
			} else if(size_cd == "L") {
				return "Large";
			} else if(size_cd == "P") {
				return "Party";
			} else if(size_cd == "F") {
				return "Family";
			} else if(size_cd == "TF") {
				return "Thin Family";
			} else if(size_cd == "사이즈") {
				return "";
			} else {
				return size_cd;
			}
		},
		checkTopping1 : function (_str){
			// - 토핑이  + 토핑에 포함되는지 조사
			for(var i = 0;i < this.oTopping1.item_txt.length ; i++){
				//this.oTopping1.item_txt[i];
				if(this.oTopping1.item_txt[i].indexOf( _str) > -1 ){
					return false;
				}
			}
			//겹치는게 없을 경우 트루
			return true;
		},
		checkTopping2 : function (_str){
			// + 토핑이 - 토핑에 포함되는지 조사
			for(var i = 0;i < this.oTopping2.item_txt.length ; i++){
				//this.oTopping2.item_txt[i];
				if(this.oTopping2.item_txt[i].indexOf( _str) > -1 ){
					return false;
				}
			}
			//겹치는게 없을 경우 트루
			return true;
		},
		updateConfirmToppingInfo : function () {
			var toppingAmount = this.oTopping1.total_price;
			var toppintCodes = [];
			var toppintTexts = [];
			var toppintMakeLine = [];
			
			var toppintCode = ""; 
			if(this.oTopping1.item_txt.join(',').length > 0) {
				toppintCodes.push(this.oTopping1.item_code.join(',')) ;
				toppintMakeLine.push(this.oTopping1.item_makeline.join(','));
				for(var i = 0;i < this.oTopping1.item_txt.length ; i++){
					toppintTexts.push("+"+this.oTopping1.item_txt[i]);
					
				}
				//toppintCode = toppintCodes.join(',')+',';
				
			}
			if(this.oTopping2.item_txt.join(',').length > 0) {
				toppintCodes.push(this.oTopping2.item_code.join(',')) ;
				toppintMakeLine.push(this.oTopping2.item_makeline.join(','));
				for(var i = 0;i < this.oTopping2.item_txt.length ; i++){
					toppintTexts.push("-"+this.oTopping2.item_txt[i]);
					
				}
				
			}
			var toppintCode = toppintCodes.join(',')+',';
			
			var toppintText = toppintTexts.join(',');
			
			var toppintMakelne = toppintMakeLine.join('');
			
			
			var param = []
			param.push('id=Menu');
			param.push('ac=updatetopping'); 
			if(this.oTopping1.ttype == 'right'){
				param.push('ttype='+this.oTopping1.ttype); 
			} else {
				param.push('ttype=left'); 
			}
			param.push('order_id=' + this.oTopping1.order_id);
			param.push('order_detail_id=' + this.oTopping1.order_detail_id);
			param.push('left_list=' + encodeURIComponent(toppintText));
			param.push('topping_amount=' + toppingAmount);
			param.push('left_topping=' + encodeURIComponent(toppintCode));
			param.push('left_makeline=' + encodeURIComponent(toppintMakelne));
			
			//alert(param.join('&'));
			
			var self = this;
			$.ajax({
				type: 'get',
				url : this.api,
				data : param.join('&'),
				dataType : 'jsonp',
				async : false,
				contentType:'application/json; charset=utf-8',
				error:function(){
					alert('에러:주문 데이터 송수신에 문제가 있습니다.');
				},
				success: function(data){
					self.oTopping1.hide();
					self.oTopping2.hide();
					loadCart(sessionStorage["user_customer_id"], sessionStorage["order_id"]);
				}
			});
		}
		
		
};

Papajohns.Basket.Topping = function(el,pt){
	this.$el = $(el);
	this.pagetype = pt;
	this.init();
	
};

Papajohns.Basket.Topping.prototype ={
		init : function(){
			this.initVar();
			this._bindEvent();
		},
		initVar : function(){
			
			this.htLayer = {
				list : this.$el.find('.top_list:first'),
				topping_total_price : this.$el.find('.topping_total_price:first'),
				topping_detail_txt : this.$el.find('.topping_detail_txt:first'),
				btn_area : this.$el.find('.btn_area:first'),
				btn_add : this.$el.find('.btn_add:first'),
				btn_remove : this.$el.find('.btn_remove:first')
			};
		
			
			this.api = "/get.do";
			this.tpl ={
				option : '<option value="{=VALUE}">{=NAME}</option>',
				toppingItem : "<tr><th>{=NAME}</th>" +
							  " <td class=\"w50\">{=PRICE}</td> "+
							  " <td class=\"w80\">" +
									"<label class=\"spinner_wrap\" data-value='{=ITEM_OID}'> "+
										"<input class=\"spinner w22\" name=\"qty\" type=\"text\" readonly=readonly value=\"{=QTY}\" title=\"{=NAME} 수량입력\"/><a href=\"#\" title=\"{=NAME}\" class=\"btn_plus\" ><span>더하기</span></a><a href=\"#\" title=\"{=NAME}\" class=\"btn_minus\"><span>빼기</span></a> "+
									"</label>" +
								"</td></tr>",
				toppingItemRemove : "<tr><th><input title=\"{=NAME} 토핑빼기\" type=\"checkbox\" name=\"item_oid\" class=\"mt3\" value=\"{=ITEM_OID}\" {=CHECKED}/></th>" +
									"<td>{=NAME}</td>"+
									"</tr>"				
				
			};
			this.toppingList = null;
			this.order_id = null;
			this.order_detail_id = null;
			this.product_oid = null;
			this.sp_oid = null;
			this.ttype = null;
			this.half = 1;

			this.item_code = [];
			this.item_txt = [];
			this.item_makeline = [];
			
			this.item_count = 0;
			// 5개까지만 담을수있음
			this.item_count_limit = 5;
			
			this.remove_code = [];
			this.remove_txt = [];
			
			
		},
		_bindEvent : function(){
			this.htLayer.list.bind('click',$.proxy(this.selectTopping,this));
			this.htLayer.btn_area.bind('click',$.proxy(this.selectTopping,this));
			this.htLayer.btn_add.bind('click',$.proxy(this.selectButton,this));
			this.htLayer.btn_remove.bind('click',$.proxy(this.selectButton,this));
			
		},
		show : function() {
			//this.$el.show();
			
			var vCont = this.$el;

			if ($('.bgLayer').size() > 0) {
				$('.pop_layer').hide();
			} else {
				$('#contents').after('<span class=bgLayer></span>');
			}
			$(window).scroll(function() {
		        var position = $(window).scrollTop();
		        $( vCont ).css({
		                'position' : 'absolute',
		                'top'      : position + $(window).height()/10
		        });
		        
		    });
			$('.bgLayer').fadeTo('fast', 0.6, function() {
				var position = $(window).scrollTop();
				vCont.css({'position' : 'absolute','top': position + $(window).height()/10 }).show(300);
				vCont.attr('tabIndex',0).focus();
				vCont.find('.pop_close').click(function() {
					//setUpdateTopping();
					$('.bgLayer').remove();
					$(this).parents('.pop_layer').hide(300);
					return false;
				});
			});
		},
		hide : function() {
			$('.bgLayer').remove();
			this.$el.hide(300);
			return false;
		},
		param : function(_order_id, _order_detail_id, _pd_oid, _sp_oid, _ttype, _half){
			this.order_id = _order_id;
			this.order_detail_id = _order_detail_id;
			this.product_oid = _pd_oid;
			this.sp_oid = _sp_oid;
			this.ttype = _ttype;
			this.half = parseInt(_half);
			this._getList();
		},
		_getList : function(){
			//sessionStorage["cur_order_id"] = order_id;
			//sessionStorage["cur_order_detail_id"] = order_detail_id;
			
			var param = 'ex=External&ac=toppinglist' 
					+ '&order_id=' + this.order_id
					+ '&order_detail_id=' + this.order_detail_id 
					+ '&product_id='
					+ this.product_oid 
					+ '&sp_oid1=' + this.sp_oid
					+ '&sp_oid2=' + ''
					+ '&ttype='+this.ttype;
					
			var self = this;
			$.ajax({
				type: 'get',
				url : this.api,
				data : param,
				dataType : 'jsonp',
				async : false,
				contentType:'application/json; charset=utf-8',
				error:function(){
					alert('에러:주문 데이터 송수신에 문제가 있습니다.');
				},
				success: function(data){
					self.paintTopping(data);
				}
			});
		},
		paintTopping:function(data){
			console.log("topping");
			console.log(data);
			this.htLayer.list.html("");
			this.item_count = 0;
			this.total_price = 0;
			this.item_txt = [];
			this.item_code = [];
			this.toppingList = [];
			
			for(var i = 0; i < data.length ; i++ ){
				var ev = data[i];
				if(this.pagetype == "add"){
					if(ev.add_type!="01") {
						//추가 토핑
						this.toppingList.push(ev);
						var qty = ev.cnt;
						var item_oid = ev.item_oid;
						var op_price = parseInt(ev.code_value)/this.half ;
						if(this.product_oid == 3002 || this.product_oid == 3038 || this.product_oid == 3003 || this.product_oid == 3011 || this.product_oid == 3012 || this.product_oid == 3040
								 || this.product_oid == 3005 || this.product_oid == 3039){
							if(item_oid == 3341){
								op_price = parseInt(1500)/this.half
								this.htLayer.list.append( this.tpl.toppingItem.replace(/{=NAME}/g, ev.kname).replace(/{=PRICE}/,commify(op_price)).replace(/{=QTY}/,qty).replace(/{=ITEM_OID}/, ev.item_oid));
							}else{
								this.htLayer.list.append( this.tpl.toppingItem.replace(/{=NAME}/g, ev.kname).replace(/{=PRICE}/,commify(op_price)).replace(/{=QTY}/,qty).replace(/{=ITEM_OID}/, ev.item_oid));
							}
						}else{
							this.htLayer.list.append( this.tpl.toppingItem.replace(/{=NAME}/g, ev.kname).replace(/{=PRICE}/,commify(op_price)).replace(/{=QTY}/,qty).replace(/{=ITEM_OID}/, ev.item_oid));
						}
						
						
					}
				} else if(this.pagetype == "remove") {
					if(ev.add_type=="01") {
						//제거 토핑
						this.toppingList.push(ev);
						var qty = ev.cnt;
						var item_oid = ev.item_oid;
						var chk = "";
						if(qty > 0 ){
							chk = " checked";
						} 
						this.htLayer.list.append( this.tpl.toppingItemRemove.replace(/{=NAME}/g, ev.kname).replace(/{=ITEM_OID}/, ev.item_oid).replace(/{=CHECKED}/, chk));
						
					}
				}
			}
			this.updateSelectToppingInfo();
		},
		selectTopping:function(e){
			var el = $(e.target);
			var nowtag =  e.target.tagName;
			if( nowtag == "A") {
				e.preventDefault();
				console.log(el.attr('class'));
				var li = $(e.target).parent('label:first');
				var tt = li.find('input[name=qty]');
				
				tmp = parseInt(tt.val());
				if(el.attr('class') == "btn_plus"){
					var li2 = li.parent('td').parent('tr').children('th');
					if(!basket.checkTopping2(li2.text()) ){
						alert(li2.text()+"토핑은 뺀 토핑입니다. 추가할  수 없습니다.");
						return false;
					}
					
					if(this.item_count >= this.item_count_limit) {
						alert('토핑은 5개까지 선택하실 수 있습니다.');
						return false;
					} else {
						if(tmp+1 > 2){
							alert('한가지 토핑을 2개까지 선택하실 수 있습니다.');
						} else {
							this.item_count++;
							tt.val(++tmp);
							this.updateSelectToppingInfo();
						}
						
					}
					
				} else if(el.attr('class') == "btn_minus"){
					if(tmp<=0) {
						return false;
					} else {
						tt.val(--tmp);
						this.item_count--;
						this.updateSelectToppingInfo();
					}
				}else if(el.attr('class') == "button mr7"){
					if(el.find('span').attr('class')== "w90 confirm"){
						basket.updateConfirmToppingInfo();
					}		
				} else {
					//return false;
				}
			} else if(nowtag == "INPUT") {
				if(this.pagetype == "remove"){
					var li = $(e.target).parent('th:first');
					var li2 = li.parent('tr:first').children('td:first');
					if(!basket.checkTopping1(li2.text()) ){
						alert(li2.text()+"토핑은  추가된 토핑입니다. 삭제할  수 없습니다.");
						return false;
					}
					
				}
			
			} else if(nowtag == "SPAN") {
				e.preventDefault();
				if(el.attr('class') == "w90 confirm"){
					basket.updateConfirmToppingInfo();
				}
			}
			this.updateSelectToppingInfo();
		},
		
		updateSelectToppingInfo : function () {
			if(this.pagetype=="add"){
				this.item_txt = [];
				this.item_code = [];
				this.item_makeline = [];
				
				this.item_count = 0;
				this.total_price = 0;
				this.topppingCode = "";
				for(var i = 0; i < this.htLayer.list.children('tr').size(); i++){
					var tmpLayer = this.htLayer.list.children('tr')[i];
					var ev = this.toppingList[i];
					var qty = $(tmpLayer).find("input[name=qty]").val();
					
					if(qty > 0){
						if(parseInt(qty) > 1){
							this.item_txt.push(ev.kname+"x"+parseInt(qty));
							
						} else {
							this.item_txt.push(ev.kname);
						}
						for (var j = 0; j < qty; j++){
							this.item_code.push("+"+ev.item_oid);
							this.item_makeline.push("+"+ev.code);
						}
						this.item_count += parseInt(qty);
						
						
						if(this.product_oid == 3002 || this.product_oid == 3038 || this.product_oid == 3003 || this.product_oid == 3011 || this.product_oid == 3012 || this.product_oid == 3040
								 || this.product_oid == 3005 || this.product_oid == 3039){
							if(ev.item_oid == 3341){
								this.total_price += ( parseInt(1500)/this.half  ) * qty;
							}else{
								this.total_price += ( parseInt(ev.code_value)/this.half  ) * qty;
							}
						}else{
							this.total_price += ( parseInt(ev.code_value)/this.half  ) * qty;
						}
						
						
					}
				}
				this.htLayer.topping_detail_txt.html(this.item_txt.join(","));
				this.htLayer.topping_total_price.html(commify(this.total_price.toString())+"원");
			} else {
				this.item_txt = [];
				this.item_code = [];
				this.item_makeline = [];
				
				this.item_count = 0;
				this.total_price = 0;
				this.topppingCode = "";
				for(var i = 0; i < this.htLayer.list.children('tr').size(); i++){
					var tmpLayer = this.htLayer.list.children('tr')[i];
					var ev = this.toppingList[i];
					var test = $(tmpLayer).find("input[type=checkbox]");
					if(test.is(':checked')){
						this.item_txt.push(ev.kname);
						this.item_code.push("-"+ev.item_oid);
						this.item_makeline.push("-"+ev.code);
						
						this.item_count += parseInt(qty);
						//this.total_price += parseInt(ev.code_value) * qty;
					}
				}
				this.htLayer.topping_detail_txt.html(this.item_txt.join(","));
				//this.htLayer.topping_total_price.html(commify(this.total_price.toString())+"원");
				this.htLayer.topping_total_price.html("0 원");
			}
			
		},
		selectButton : function (e) {
			e.preventDefault();
			var el = $(e.target);
			var nowtag =  e.target.tagName;
			if( nowtag == "SPAN") {
			
				if(el.attr('class') == "btn_add"){
					basket.oTopping2.hide();
					basket.oTopping1.show();
				} else if(el.attr('class') == "btn_remove"){
					basket.oTopping1.hide();
					basket.oTopping2.show();
				}
			}
		}	
};
Papajohns.Basket.AddSideDrink = function(el,pt){
	this.$el = $(el);
	this.pagetype = pt;
	this.init();
	
};

Papajohns.Basket.AddSideDrink.prototype ={
		init : function(){
			this.initVar();
			this._bindEvent();
			this._getList();
		},
		initVar : function(){
			
			this.htLayer = {
				list : this.$el.find('.pd_list:first'),
				topping_total_price : this.$el.find('.topping_total_price:first'),
				topping_detail_txt : this.$el.find('.topping_detail_txt:first'),
				btn_area : this.$el.find('.btn_area:first'),
				btn_side : this.$el.find('.btn_side:first'),
				btn_drink : this.$el.find('.btn_drink:first')
			};
		
			
			this.api = "/get.do";
			this.tpl ={
				option : '<option value="{=VALUE}">{=NAME}</option>',
				toppingItem : "<tr><th>{=NAME}</th>" +
							  " <td class=\"w50\">{=PRICE}</td> "+
							  " <td class=\"w80\">" +
									"<label class=\"spinner_wrap\" data-value='{=ITEM_OID}'> "+
										"<input class=\"spinner w22\" name=\"qty\" type=\"text\" readonly=readonly value=\"{=QTY}\" title=\"수량입력\"/><a href=\"#\" class=\"btn_plus\" ><span>더하기</span></a><a href=\"#\" class=\"btn_minus\"><span>빼기</span></a> "+
									"</label>" +
								"</td></tr>"
			};
			this.toppingList = null;
			this.order_id = null;
			this.order_detail_id = null;
			this.product_oid = null;
			this.sp_oid1 = null;
			this.sp_oid2 = null;

			this.item_code = [];
			this.item_txt = [];
			this.item_count = 0;
			// 5개까지만 담을수있음
			this.item_count_limit = 9;
			
			this.remove_code = [];
			this.remove_txt = [];
			
			
		},
		_bindEvent : function(){
			this.htLayer.list.bind('click',$.proxy(this.selectTopping,this));
			this.htLayer.btn_area.bind('click',$.proxy(this.selectTopping,this));
			
			this.htLayer.btn_side.bind('click',$.proxy(this.selectButton,this));
			this.htLayer.btn_drink.bind('click',$.proxy(this.selectButton,this));
			
		},
		show : function() {
			//this.$el.show();
			//console.log("topping show "+this.pagetype);
			var vCont = this.$el;
			var bodyH =  ($('body').scrollTop() == 0) ? $('html').scrollTop() : $('body').scrollTop();
			if ($('.bgLayer').size() > 0) {
				$('.pop_layer').hide();
			} else {
				$('#contents').after('<span class=bgLayer></span>');
			}

			$('.bgLayer').fadeTo('fast', 0.6, function() {
				$(vCont).css({'top':bodyH + 50}).show(300);
				console.log($(vCont));
				this.htLayer.btn_area.focus();
				vCont.find('.pop_close').click(function() {
					//setUpdateTopping();
					$('.bgLayer').remove();
					$(this).parents('.pop_layer').hide(300);
					return false;
				});
			});
		},
		hide : function() {
			$('.bgLayer').remove();
			this.$el.hide(300);
			return false;
		},
		_getList : function(){
			//console.log(this.order_id);
			var param = [];
			param.push('id=Menu');
			param.push('ac=getclassmenu');
			if(this.pagetype == "drink")	{
				param.push('cl_cd=2');
			} else {
				param.push('cl_cd=3');
			}
			
			//alert(param.join('&'));	
					
			var self = this;
			$.ajax({
				type: 'get',
				url : this.api,
				data : param.join('&'),
				dataType : 'jsonp',
				contentType:'application/json; charset=utf-8',
				error:function(){
					alert('에러:주문 데이터 송수신에 문제가 있습니다.');
				},
				success: function(data){
					self.paintTopping(data);
				}
			});
		},
		paintTopping:function(data){
			//console.log("paintTopping");
			this.htLayer.list.html("");
			this.item_count = 0;
			this.total_price = 0;
			this.item_txt = [];
			this.item_code = [];
			this.toppingList = [];
			
			for(var i = 0; i < data.length ; i++ ){
				var ev = data[i];
		
				this.toppingList.push(ev);
				var qty = 0;
				var item_oid = ev.pd_oid;
				var pd_name  = ev.pd_name+" "+ev.size_name.replace(ev.op_price,'');
				this.htLayer.list.append( this.tpl.toppingItem.replace(/{=NAME}/, pd_name).replace(/{=PRICE}/,commify(ev.op_price.toString())).replace(/{=QTY}/,qty).replace(/{=ITEM_OID}/, item_oid));
			}
			
			this.updateSelectToppingInfo();
		},
		selectTopping:function(e){
			var el = $(e.target);
		
			var nowtag =  e.target.tagName;
			//console.log(" event name : "+ nowtag);
			//console.log(" item_count : "+ this.item_count);
			if( nowtag == "A") {
				e.preventDefault();
				var li = $(e.target).parent('label:first');
				//console.log(" el : "+ el.attr('class'));
				//console.log(" li : "+ li.attr('data-value'));
				//console.log(" li val : "+li.find('input[name=qty]').val());
				var tt = li.find('input[name=qty]');
				
				tmp = parseInt(tt.val());
				if(el.attr('class') == "btn_plus"){
					if(this.item_count >= this.item_count_limit) {
						alert('사이즈/음료는 '+this.item_count_limit+'개까지 선택하실 수 있습니다.');
						return false;
					} else {
						this.item_count++;
						tt.val(++tmp);
						this.updateSelectToppingInfo();
					}
				} else if(el.attr('class') == "btn_minus"){
					if(tmp<=0) {
						return false;
					} else {
						tt.val(--tmp);
						this.item_count--;
						this.updateSelectToppingInfo();
					}
				} else {
					//return false;
				}
			} else if(nowtag == "SPAN") {
				e.preventDefault();
				//console.log(" el : "+ el.attr('class'));
				if(el.attr('class') == "w90 confirm"){
					//basket.updateConfirmToppingInfo();
					basket.checkTimeSet();
				} else if(el.attr('class') == "w90 cancel"){
					//basket.updateConfirmToppingInfo();
					basket.checkTimeSet();
				}
			}
			this.updateSelectToppingInfo();
		},
		
		updateSelectToppingInfo : function () {
			if(this.toppingList != null){
				//console.log("TOPPING COUNT : "+ this.toppingList.length );
				//console.log("TR COUNT : "+this.htLayer.list.children('tr').size() );
				this.item_txt = [];
				this.item_code = [];
				this.item_count = 0;
				this.total_price = 0;
				this.topppingCode = "";
				for(var i = 0; i < this.htLayer.list.children('tr').size(); i++){
					var tmpLayer = this.htLayer.list.children('tr')[i];
					var ev = this.toppingList[i];
					var qty = $(tmpLayer).find("input[name=qty]").val();
					//console.log(i+" Qty : "+$(tmpLayer).find("input[name=qty]").val());
					if(qty > 0){
						var pd_name  = ev.pd_name+" "+ev.size_name.replace(ev.op_price,'');
						this.item_txt.push(pd_name);
						this.item_code.push("+"+ev.op_cd);
						this.item_count += parseInt(qty);
						this.total_price += parseInt(ev.op_price) * qty;
					}
				}
				this.htLayer.topping_detail_txt.html(this.item_txt.join(","));
				this.htLayer.topping_total_price.html(commify(this.total_price.toString())+"원");
				
			}
		},
		selectButton : function (e) {
			e.preventDefault();
			var el = $(e.target);
			var nowtag =  e.target.tagName;
			//console.log("tt event name : "+ nowtag);
			if( nowtag == "SPAN") {
				//console.log(" el : "+ el.attr('class'));
				if(el.attr('class') == "btn_side"){
					basket.oDrink.hide();
					basket.oSide.show();
				} else if(el.attr('class') == "btn_drink"){
					basket.oSide.hide();
					basket.oDrink.show();
				}
			}
		}	
};

Papajohns.Basket.AddSideDrinkPop = function(el,pt){
	this.$el = $(el);
	this.pagetype = pt;
	this.init();
};
Papajohns.Basket.AddSideDrinkPop.prototype ={
		init : function(){
			this.initVar();
			this._bindEvent();
		},
		initVar : function(){
			
			this.htLayer = {
				btn_close : this.$el.find('.pop_close1:first'),
				btn_side : this.$el.find('.pop_open1:first'),
				btn_drink : this.$el.find('.pop_open2:first')
			};
			
		},
		_bindEvent : function(){
			this.htLayer.btn_close.bind('click',$.proxy(this._onClose,this));
			this.htLayer.btn_side.bind('click',$.proxy(this.selectSide,this));
			this.htLayer.btn_drink.bind('click',$.proxy(this.selectDrink,this));
			
		},
		show : function() {
			//console.log("AddSideDrinkPop show "+this.pagetype);
			var vCont = this.$el;
			if ($('.bgLayer').size() > 0) {
				$('.pop_layer').hide();
			} else {
				$('#contents').after('<span class=bgLayer></span>');
			}
			$(window).scroll(function() {
		        var position = $(window).scrollTop();
		        $( vCont ).css({
		                'position' : 'absolute',
		                'top'      : position + $(window).height()/3
		        });
		        
		    });
			$('.bgLayer').fadeTo('fast', 0.6, function() {
				var position = $(window).scrollTop();
				vCont.css({'position' : 'absolute','top': position + $(window).height()/3 }).show(300);
				vCont.find('.pop_close').click(function() {
					//setUpdateTopping();
					$('.bgLayer').remove();
					$(this).parents('.pop_layer').hide(300);
					return false;
				});
			});
		},
		hide : function() {
			$('.bgLayer').remove();
			this.$el.hide(300);
			return false;
		},
		selectSide : function (e) {
			e.preventDefault();
			var el = $(e.target);
			var nowtag =  e.target.tagName;
			//console.log("tt event name : "+ nowtag);
			TabSelect('3');
			this.hide();
		},
		selectDrink : function (e) {
			e.preventDefault();
			var el = $(e.target);
			var nowtag =  e.target.tagName;
			//console.log("tt event name : "+ nowtag);
			TabSelect('2');
			this.hide();
		},
		_onClose : function (e) {
			e.preventDefault();
			var el = $(e.target);
			var nowtag =  e.target.tagName;
			//console.log("tt event name : "+ nowtag);
			basket.checkTimeSet();
			this.hide();
		}
};