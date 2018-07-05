<%@ Page Title="" Language="C#" MasterPageFile="~/Master/Site1.Master" AutoEventWireup="true" CodeBehind="store_view.aspx.cs" Inherits="admin.gne.store.store_view" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<script type="text/javascript" src="//apis.daum.net/maps/maps3.js?apikey=72279ee0b283ca005ef6d19456a3ca41&libraries=services"></script>
	<!-- container -->
	<div id="container">
		<!-- contents -->
		<section id="contents">
			<h1 id="page_tit">매장관리</h1><!-- 해당 텍스트로 gnb와 매칭 시켜서 active 시킵니다 -->
			<article class="inner">
				<table class="table left_tbl form_tbl mt20">
					<caption>매장관리</caption>
					<colgroup>
						<col style="width:15%" />
						<col style="width:15%" />
						<col />
					</colgroup>
					<tbody>
						<tr>
							<th scope="row" ><b class="t_red">*</b>매장명</th>
							<td colspan="2">
								<input type="text" name="a_branch_nm" id="a_branch_nm" class="wid3" placeholder="매장명입력" title="매장명입력" value="<%=a_branch_nm %>" />
							</td>
						</tr>
						<tr>
							<th scope="row"><b class="t_red">*</b>매장코드</th>
							<td colspan="2">
								<%=a_branch_id %>
							</td>
						</tr>
						<tr>
							<th scope="row">PG사이트키(mid)</th>
							<td colspan="2">
								<input type="text" name="mid" id="mid" class="wid1" placeholder="PG키입력" title="PG키입력" value="<%=mid %>" />
							</td>
						</tr>
						<tr>
							<th scope="row">PG사이트코드(mertkey)</th>
							<td colspan="2">
								<input type="text" name="mertkey" id="mertkey" class="wid1" placeholder="PG코드입력" title="PG코드입력" value="<%=mertkey %>" />
							</td>
						</tr>

						<tr>
							<th scope="row">OK캐쉬백매장아이디</th>
							<td colspan="2">
								<input type="text" name="ocb_branch_id" id="ocb_branch_id" class="wid1" placeholder="OK캐쉬백매장아이디" title="OK캐쉬백매장아이디" value="<%=ocb_branch_id %>" />
							</td>
						</tr>
						<tr>
							<th scope="row">OK캐쉬백사업자번호</th>
							<td colspan="2">
								<input type="text" name="ocb_branch_cn" id="ocb_branch_cn" class="wid1" placeholder="OK캐쉬백사업자번호" title="OK캐쉬백사업자번호" value="<%=ocb_branch_cn %>" />
							</td>
						</tr>

						<tr>
							<th scope="row"><b class="t_red">*</b>전화번호</th>
							<td colspan="2">
								<input type="text" name="a_branch_tel" id="a_branch_tel" class="wid1" placeholder="전화번호" title="전화번호" value="<%=a_branch_tel %>" />
							</td>
						</tr>
						<tr>
							<th scope="row"><b class="t_red">*</b>홈페이지노출여부</th>
							<td colspan="2">
								<label>
									<input name="home_yn" id="home_ynN" type="radio" class="radio" value="N" <% if (home_yn == "N" || home_yn == "") { Response.Write("checked=\"checked\""); } %> />
									<span class="lbl">미노출</span>
								</label>
								<label>
									<input name="home_yn" id="home_ynY" type="radio" class="radio" value="Y" <% if (home_yn == "Y") { Response.Write("checked=\"checked\""); } %> />
									<span class="lbl">노출</span>
								</label>
							</td>
						</tr>
						<tr>
							<th scope="row"><b class="t_red">*</b>온라인주문가능여부</th>
							<td colspan="2">
                                <input type="hidden" value="<%=online_yn%>" id="onyn" />
								<label>
									<input name="online_yn" id="online_ynN" type="radio" class="radio" value="N" <% if (online_yn == "N" || online_yn == "") { Response.Write("checked=\"checked\""); } %> />
									<span class="lbl">불가능</span>
								</label>
								<label>
									<input name="online_yn" id="online_ynY" type="radio" class="radio" value="Y" <% if (online_yn == "Y") { Response.Write("checked=\"checked\""); } %> />
									<span class="lbl">가능</span>
								</label>
                                <a href="javascript:getOnlineExl();" class="button ml10">EXCEL 다운로드</a>
							</td>
						</tr>
                        <tr>
							<th scope="row"><b class="t_red">*</b>포장주문가능여부</th>
							<td colspan="2">
                                <asp:repeater id="packinginfo" runat="server">
                                    <ItemTemplate>
								        <label>
									        <input name="packing" id="packing_<%#Eval("cd_value") %>" type="radio" class="radio" value="<%#Eval("cd_value") %>" />
									        <span class="lbl"><%#Eval("cd_name1") %></span>
								        </label><br />
                                    </ItemTemplate>
                                </asp:repeater>
							</td>
						</tr>
						<tr>
							<th scope="row"><b class="t_red">*</b>e쿠폰주문가능여부</th>
							<td colspan="2">
                                <input type="hidden" value="<%=ecoupon_yn%>" id="epyn" />
								<label>
									<input name="ecoupon_yn" id="ecoupon_ynN" type="radio" class="radio" value="N" <% if (ecoupon_yn == "N" || ecoupon_yn == "") { Response.Write("checked=\"checked\""); } %> />
									<span class="lbl">불가능</span>
								</label>
								<label>
									<input name="ecoupon_yn" id="ecoupon_ynY" type="radio" class="radio" value="Y" <% if (ecoupon_yn == "Y") { Response.Write("checked=\"checked\""); } %> />
									<span class="lbl">가능</span>
								</label>
                                <a href="javascript:getEcouponExl();" class="button ml10">EXCEL 다운로드</a>
							</td>
						</tr>
						<tr>
							<th scope="row"><b class="t_red">*</b>CESCO 여부</th>
							<td colspan="2">
								<label>
									<input name="cesco_yn" id="cesco_ynN" type="radio" class="radio" value="N" <% if (cesco_yn == "N" || cesco_yn == "") { Response.Write("checked=\"checked\""); } %> />
									<span class="lbl">불가능</span>
								</label>
								<label>
									<input name="cesco_yn" id="cesco_ynY" type="radio" class="radio" value="Y" <% if (cesco_yn == "Y") { Response.Write("checked=\"checked\""); } %> />
									<span class="lbl">가능</span>
								</label>
							</td>
						</tr>
						<tr class="hide">
							<th scope="row"><b class="t_red">*</b>카드사할인여부</th>
							<td colspan="2">
								<label>
									<input name="carddisc_yn" id="carddisc_ynN" type="radio" class="radio" value="N" <% if (carddisc_yn == "N" || carddisc_yn == "") { Response.Write("checked=\"checked\""); } %> />
									<span class="lbl">불가능</span>
								</label>
								<label>
									<input name="carddisc_yn" id="carddisc_ynY" type="radio" class="radio" value="Y" <% if (carddisc_yn == "Y") { Response.Write("checked=\"checked\""); } %> />
									<span class="lbl">가능</span>
								</label>
							</td>
						</tr>
						<tr>
							<th scope="row"><b class="t_red">*</b>선결제가능여부</th>
							<td colspan="2">
                                <input type="hidden" value="<%=advance_yn%>" id="adyn" />
								<label>
									<input name="advance_yn" id="advance_ynN" type="radio" class="radio" value="N" <% if (advance_yn == "N" || advance_yn == "") { Response.Write("checked=\"checked\""); } %> />
									<span class="lbl">불가능</span>
								</label>
								<label>
									<input name="advance_yn" id="advance_ynY" type="radio" class="radio" value="Y" <% if (advance_yn == "Y") { Response.Write("checked=\"checked\""); } %> />
									<span class="lbl">가능</span>
								</label>
                                <a href="javascript:getAdvanceExl();" class="button ml10">EXCEL 다운로드</a>
							</td>
						</tr>
						<tr>
							<th scope="row"><b class="t_red">*</b>BCTOP 사용여부</th>
							<td colspan="2">
                                <input type="hidden" value="<%=bctop_yn%>" id="bcyn" />
								<label>
									<input name="bctop_yn" id="bctop_ynN" type="radio" class="radio" value="N" <% if (bctop_yn == "N" || bctop_yn == "") { Response.Write("checked=\"checked\""); } %> />
									<span class="lbl">불가능</span>
								</label>
								<label>
									<input name="bctop_yn" id="bctop_ynY" type="radio" class="radio" value="Y" <% if (bctop_yn == "Y") { Response.Write("checked=\"checked\""); } %> />
									<span class="lbl">가능</span>
								</label>
                                <a href="javascript:getBctopExl();" class="button ml10">EXCEL 다운로드</a>
							</td>
						</tr>
						<tr>
							<th scope="row"><b class="t_red">*</b>사용여부</th>
							<td colspan="2">
								<label>
									<input name="use_yn" id="use_ynN" type="radio" class="radio" value="N" <% if (use_yn == "N" || use_yn == "") { Response.Write("checked=\"checked\""); } %> />
									<span class="lbl">사용안함</span>
								</label>
								<label>
									<input name="use_yn" id="use_ynY" type="radio" class="radio" value="Y" <% if (use_yn == "Y") { Response.Write("checked=\"checked\""); } %> />
									<span class="lbl">사용</span>
								</label>
							</td>
						</tr>
						<tr>
							<th scope="row"><b class="t_red">*</b>매장주소</th>
							<td colspan="2">
								<input type="text" name="a_branch_addr" id="a_branch_addr" class="wid1" placeholder="매장주소" title="매장주소" value="<%=a_branch_addr %>" onkeydown="javascript:if(event.keyCode==13){getbranchxy();}" />
							</td>
						</tr>
						<tr>
							<th scope="row"><b class="t_red">*</b>매장좌표</th>
							<td>
								<div id="map" style="width:100%;height:500px;">
								</div>
									<input type="text" name="lat" id="lat" value="<%=lat %>" />
									<input type="text" name="lng" id="lng" value="<%=lng %>" />
							</td>
						</tr>
						<!--<tr>
							<th>평일마감</th>
							<td>
								<input type="text" class="wid4" placeholder="" title="마감시간 입력">
							</td>
						</tr>
						<tr>
							<th>주말오픈</th>
							<td>
								<input type="text" class="wid4" placeholder="" title="주말오픈시간 입력">
							</td>
						</tr>
						<tr>
							<th>주말마감</th>
							<td>
								<input type="text" class="wid4" placeholder="" title="주말마감시간 입력">
							</td>
						</tr>
						<tr>
							<th>대표이미지</th>
							<td>
								<input type="file" class="wid2" title="대표이미지">
							</td>
						</tr>
						<tr>
							<th>매장안내</th>
							<td>
								<textarea title="매장안내" placeholder="0~80자 입력" ></textarea>
							</td>
						</tr>-->
					</tbody>
				</table>
				<p class="mt30 t_right">
					<a href="javascript:updatebranch();" class="button h30 w100 btn_red">수정</a>
					<a href="javascript:storelist();" class="button h30 w100 btn_gray">취소</a>
				</p>
			</article>
		</section>
		<!-- //contents -->
		<div class="bgLayer"></div>
	</div>
	<!-- //container -->

	<input type="hidden" name="a_branch_id" id="a_branch_id" value="<%=a_branch_id %>" />
	<input type="hidden" name="pages" id="pages" value="<%=pages %>" />


	<script>
	    $(document).ready(function () {
	        checkPacking();
			if ($("#lat").val() == "" || $("#lng").val() == "") {
				// 주소-좌표 변환 객체를 생성합니다

			    getbranchxy();


			}
		});

		var checkPacking = function () {
		    var packing_type = "<%=packing_type%>";
		    if (packing_type != "" && packing_type != null) {
		        $("#packing_<%=packing_type%>").prop("checked", true);
		    }
		}

		var str = $("#a_branch_addr").val();
		var lat = $("#lat").val();
		var lng = $("#lng").val();
		var marker = "";
		if (lat == "") {
			lat = "37.2913758868";
		}
		if (lng == "") {
			lng = "127.4544839398";
		}

		var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
		mapOption = {
			center: new daum.maps.LatLng(lat, lng), // 지도의 중심좌표
			level: 3 // 지도의 확대 레벨
		};
		var map = new daum.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

		var geocoder = new daum.maps.services.Geocoder();

		var imageSrc = "//i1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

		// 마커 이미지의 이미지 크기 입니다
		var imageSize = new daum.maps.Size(24, 35);

		// 마커 이미지를 생성합니다    
		var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize);

		var coords = new daum.maps.LatLng(lat, lng);

		// 마커를 생성합니다
		marker = new daum.maps.Marker({
			map: map, // 마커를 표시할 지도
			position: coords, // 마커를 표시할 위치
			image: markerImage // 마커 이미지 
		});

		var getbranchxy = function () {

			str = $("#a_branch_addr").val();
			if (str != "") {
				// 주소로 좌표를 검색합니다
				geocoder.addr2coord(str, function (status, result) {

					// 정상적으로 검색이 완료됐으면 
					if (status === daum.maps.services.Status.OK) {
						var lat = result.addr[0].lat;
						var lng = result.addr[0].lng;
						$("#lat").val(lat);
						$("#lng").val(lng);

						coords = new daum.maps.LatLng(lat, lng);

						// 마커를 생성합니다
						/*marker = new daum.maps.Marker({
							map: map, // 마커를 표시할 지도
							position: coords, // 마커를 표시할 위치
							image: markerImage // 마커 이미지 
						});*/

						marker.setPosition(coords);

						var moveLatLon = new daum.maps.LatLng(lat, lng);

						map.setCenter(moveLatLon);
					}
				});
			}
		}

		daum.maps.event.addListener(map, 'click', function (mouseEvent) {

			// 클릭한 위도, 경도 정보를 가져옵니다 
			var latlng = mouseEvent.latLng;

			// 마커 위치를 클릭한 위치로 옮깁니다
			marker.setPosition(latlng);

			$("#lat").val(latlng.getLat());
			$("#lng").val(latlng.getLng());
		});

		var updatebranch = function () {
			var a_branch_id = $("#a_branch_id").val();
			var a_branch_nm = $("#a_branch_nm").val();
			var a_branch_tel = $("#a_branch_tel").val();
			var a_branch_addr = $("#a_branch_addr").val();

			var mid = $("#mid").val();
			var mertkey = $("#mertkey").val();
			var home_yn = $(':radio[name="home_yn"]:checked').val();
			var ocb_branch_id = $("#ocb_branch_id").val();
			var ocb_branch_cn = $("#ocb_branch_cn").val();

			var online_yn = $(':radio[name="online_yn"]:checked').val();
			var ecoupon_yn = $(':radio[name="ecoupon_yn"]:checked').val();
			var cesco_yn = $(':radio[name="cesco_yn"]:checked').val();
			var carddisc_yn = $(':radio[name="carddisc_yn"]:checked').val();
			var bctop_yn = $(':radio[name="bctop_yn"]:checked').val();
			var advance_yn = $(':radio[name="advance_yn"]:checked').val();

			var packing = $(':radio[name="packing"]:checked').val();

			var onyn = $("#onyn").val();//온라인 사용여부
			var epyn = $("#epyn").val();//이쿠폰 사용여부
			var adyn = $("#adyn").val();//선결제 사용여부
			var bcyn = $("#bcyn").val();//BCTOP 사용여부

			var lat = $("#lat").val();
			var lng = $("#lng").val();

			var use_yn = $(':radio[name="use_yn"]:checked').val();

			if (a_branch_id == "") {
				alert("잘못된 매장정보입니다.\n잠시 후 다시 이용해주세요.");
				return;
			}
			$.ajax({
				type: 'POST', // POST 로 전송
				dataType: 'text json', // JSON 타입이 아닐경우 제거
				contentType: 'application/json; charset=utf-8',
				url: '/store/data_proc.aspx', // 호출 URL
				data: JSON.stringify({
					"mode": "updatebranch",
					"a_branch_id": a_branch_id,
					"a_branch_nm": a_branch_nm,
					"a_branch_tel": a_branch_tel,
					"a_branch_addr": a_branch_addr,
					"mid": mid,
					"mertkey": mertkey,
					"ocb_branch_id": ocb_branch_id,
					"ocb_branch_cn": ocb_branch_cn,
					"home_yn": home_yn,
					"online_yn": online_yn,
					"ecoupon_yn": ecoupon_yn,
					"cesco_yn": cesco_yn,
					"carddisc_yn": carddisc_yn,
					"bctop_yn": bctop_yn,
					"advance_yn": advance_yn,
                    "packing" : packing,
					"lat": lat,
					"lng": lng,
					"use_yn": use_yn,
					"onyn": onyn,
					"epyn": epyn,
					"adyn": adyn,
					"bcyn": bcyn
				}), // 파라메터 정보 전달,
				cache: false,
				success: function (data) {
					if (data.result == "000") {
						alert("수정되었습니다.");
						location.reload(true);
						return;
					}
					else {
						alert(data.message + " - [" + data.result + "]")
					}
				},
				error: function (e) {
					alert("오류가 발생했습니다.");
				}
			});
		}
		var storelist = function () {
			var branch_id = $("#branch_id").val();
			var pages = $("#pages").val();
			location.href = "/store/store_list.aspx?branch_id=" + branch_id + "&pages=" + pages;
		}

		var getOnlineExl = function () {
		    var branch_id = $("#a_branch_id").val();
		    var form = document.createElement("form");
		    form.method = "post";
		    form.action = "/store/online_history_exl.aspx?branch_id=" + branch_id;
		    form.id = "getExcel";

		    $("body").append($(form));
		    $("#getExcel").submit();
		    $("#getExcel").remove();
		}

		var getEcouponExl = function () {
		    var branch_id = $("#a_branch_id").val();
		    var form = document.createElement("form");
		    form.method = "post";
		    form.action = "/store/ecoupon_history_exl.aspx?branch_id=" + branch_id;
		    form.id = "getExcel";

		    $("body").append($(form));
		    $("#getExcel").submit();
		    $("#getExcel").remove();
		}

		var getAdvanceExl = function () {
		    var branch_id = $("#a_branch_id").val();
		    var form = document.createElement("form");
		    form.method = "post";
		    form.action = "/store/advance_history_exl.aspx?branch_id=" + branch_id;
		    form.id = "getExcel";

		    $("body").append($(form));
		    $("#getExcel").submit();
		    $("#getExcel").remove();
		}

		var getBctopExl = function () {
		    var branch_id = $("#a_branch_id").val();
		    var form = document.createElement("form");
		    form.method = "post";
		    form.action = "/store/bctop_history_exl.aspx?branch_id=" + branch_id;
		    form.id = "getExcel";

		    $("body").append($(form));
		    $("#getExcel").submit();
		    $("#getExcel").remove();
		}
	</script>
</asp:Content>
