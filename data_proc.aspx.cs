using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using System.Net;
using System.IO;
using System.Collections;
using Biz.gne;
using System.Data;
using CNTT.Framework.Base;
using CNTT.Framework.Utility;
using System.Net.Json;
using CNTT.Framework.Configs;
using System.Xml;
using Newtonsoft.Json;

namespace admin.gne.store
{
	public partial class data_proc : CNTT.Framework.Base.WebBase
	{
		JsonObjectCollection result = new JsonObjectCollection();

		byte[] bytes = null;
		string datas = null;

		JsonTextParser jsonParser = null;
		JsonObject jsonObj = null;
		JsonObjectCollection jsonCol = null;

		protected DataSet dt = null;

		Store store = new Store();
		Order order = new Order();

		Store callstore = new Store("CNTT_CALL");

		protected void Page_Load(object sender, EventArgs e)
		{
			Response.CacheControl = "no-cache";
			Response.AddHeader("Pragma", "no-cache");
			Response.Expires = 0;
			Response.Buffer = true;

			try
			{
				bytes = Request.BinaryRead(Request.TotalBytes);
				datas = Request.ContentEncoding.GetString(bytes);

				jsonParser = new JsonTextParser();
				jsonObj = jsonParser.Parse(datas);
				jsonCol = (JsonObjectCollection)jsonObj;

				string mode = (jsonCol["mode"] != null) ? jsonCol["mode"].GetValue().ToString() : string.Empty;

				if (mode.Equals(string.Empty))
				{
					result.Add(new JsonStringValue("result", "154"));
					result.Add(new JsonStringValue("message", "mode 값이 없습니다."));
				}

				if (mode.Equals("getbranchlist"))
				{
					getbranchlist();
					return;
				}

				if (mode.Equals("updatebranch"))
				{
					updatebranch();
					return;
				}

				if (mode.Equals("getcallbranchlist"))
				{
					getcallbranchlist();
					return;
				}

				if (mode.Equals("synccallbranch"))
				{
					synccallbranch();
					return;
				}
			}
			catch (Exception ex)
			{
				result.Add(new JsonStringValue("result", "153"));
				result.Add(new JsonStringValue("message", "예외오류가 발생되었습니다."+ex.Message.Replace("\"", "'").Replace("\r\n", "")));
			}
			finally
			{
				Response.Clear();
				Response.Write(result.ToString());
				Response.End();
			}
		}

		private void updatebranch()
		{
			ResultBox rtnbox = new ResultBox();
			try
			{
				string a_branch_id = (jsonCol["a_branch_id"] != null) ? jsonCol["a_branch_id"].GetValue().ToString() : "";
				string a_branch_nm = (jsonCol["a_branch_nm"] != null) ? jsonCol["a_branch_nm"].GetValue().ToString() : "";
				string a_branch_tel = (jsonCol["a_branch_tel"] != null) ? jsonCol["a_branch_tel"].GetValue().ToString() : "";
				string a_branch_addr = (jsonCol["a_branch_addr"] != null) ? jsonCol["a_branch_addr"].GetValue().ToString() : "";
				string mid = (jsonCol["mid"] != null) ? jsonCol["mid"].GetValue().ToString() : "";
				string mertkey = (jsonCol["mertkey"] != null) ? jsonCol["mertkey"].GetValue().ToString() : "";

				string ocb_branch_id = (jsonCol["ocb_branch_id"] != null) ? jsonCol["ocb_branch_id"].GetValue().ToString() : "";
				string ocb_branch_cn = (jsonCol["ocb_branch_cn"] != null) ? jsonCol["ocb_branch_cn"].GetValue().ToString() : "";


				string home_yn = (jsonCol["home_yn"] != null) ? jsonCol["home_yn"].GetValue().ToString() : "N";
				string online_yn = (jsonCol["online_yn"] != null) ? jsonCol["online_yn"].GetValue().ToString() : "N";
				string ecoupon_yn = (jsonCol["ecoupon_yn"] != null) ? jsonCol["ecoupon_yn"].GetValue().ToString() : "N";
				string cesco_yn = (jsonCol["cesco_yn"] != null) ? jsonCol["cesco_yn"].GetValue().ToString() : "N";
				string carddisc_yn = (jsonCol["carddisc_yn"] != null) ? jsonCol["carddisc_yn"].GetValue().ToString() : "N";
				string bctop_yn = (jsonCol["bctop_yn"] != null) ? jsonCol["bctop_yn"].GetValue().ToString() : "N";
				string advance_yn = (jsonCol["advance_yn"] != null) ? jsonCol["advance_yn"].GetValue().ToString() : "N";

                string packing = (jsonCol["packing"] != null) ? jsonCol["packing"].GetValue().ToString() : "P1";

				string lat = (jsonCol["lat"] != null) ? jsonCol["lat"].GetValue().ToString() : "";
				string lng = (jsonCol["lng"] != null) ? jsonCol["lng"].GetValue().ToString() : "";
				string use_yn = (jsonCol["use_yn"] != null) ? jsonCol["use_yn"].GetValue().ToString() : "N";

                string onyn = (jsonCol["onyn"] != null) ? jsonCol["onyn"].GetValue().ToString() : "";
                string epyn = (jsonCol["epyn"] != null) ? jsonCol["epyn"].GetValue().ToString() : "";
                string adyn = (jsonCol["adyn"] != null) ? jsonCol["adyn"].GetValue().ToString() : "";
                string bcyn = (jsonCol["bcyn"] != null) ? jsonCol["bcyn"].GetValue().ToString() : "";

                string agent_id = base.logOnInfo.UserId.ToString();
                string agent_nm = base.logOnInfo.UserName.ToString();

                #region 관리자 정보 조회
                DataSet ds = new DataSet();
                Logon logon = new Logon();
                Hashtable adinfo_param = new Hashtable();
                adinfo_param.Add("uno", agent_id);
                ds = logon.selectAdminInfo(adinfo_param);
                string uid = ds.Tables[0].Rows[0]["UID"].ToString();
                History history = new History();
                #endregion

                if (online_yn != onyn)
                {
                    Hashtable param = new Hashtable();
                    param.Add("uid", uid);
                    param.Add("user_name", agent_nm);
                    param.Add("online_yn", online_yn);
                    param.Add("br_code", a_branch_id);
                    history.insertOnlineYnHistory(param);
                }

                if (ecoupon_yn != epyn)
                {
                    Hashtable param = new Hashtable();
                    param.Add("uid", uid);
                    param.Add("user_name", agent_nm);
                    param.Add("ecoupon_yn", ecoupon_yn);
                    param.Add("br_code", a_branch_id);
                    history.insertEcouponYnHistory(param);
                }

                if (advance_yn != adyn)
                {
                    Hashtable param = new Hashtable();
                    param.Add("uid", uid);
                    param.Add("user_name", agent_nm);
                    param.Add("advance_yn", advance_yn);
                    param.Add("br_code", a_branch_id);
                    history.insertAdvanceYnHistory(param);
                }

                if (bctop_yn != bcyn)
                {
                    Hashtable param = new Hashtable();
                    param.Add("uid", uid);
                    param.Add("user_name", agent_nm);
                    param.Add("bctop_yn", bctop_yn);
                    param.Add("br_code", a_branch_id);
                    history.insertBctopYnHistory(param);
                }
                
                
				string agent_ip = Request.ServerVariables["REMOTE_ADDR"];
				string actionmode = "updatebranch";

				if (a_branch_id == "" || a_branch_id == null)
				{
					result.Add(new JsonStringValue("result", "159"));
					result.Add(new JsonStringValue("message", "매장아이디가 존재하지 않습니다.\\n잠시 후 다시 이욯해 주세요."));
				}
				else
				{
					Hashtable param = new Hashtable();
					param.Add("agent_id", agent_id);
					param.Add("agent_nm", agent_nm);
					param.Add("agent_ip", agent_ip);
					param.Add("actionmode", actionmode);
					param.Add("a_branch_id", a_branch_id);
					param.Add("a_branch_nm", a_branch_nm);
					param.Add("a_branch_tel", a_branch_tel);
					param.Add("a_branch_addr", a_branch_addr);
					param.Add("mid", mid);
					param.Add("mertkey", mertkey);
					param.Add("ocb_branch_id", ocb_branch_id);
					param.Add("ocb_branch_cn", ocb_branch_cn);
					param.Add("home_yn", home_yn);
					param.Add("online_yn", online_yn);
					param.Add("ecoupon_yn", ecoupon_yn);
					param.Add("cesco_yn", cesco_yn);
					param.Add("carddisc_yn", carddisc_yn);
					param.Add("bctop_yn", bctop_yn);
					param.Add("advance_yn", advance_yn);
                    param.Add("packing_type", packing);
					param.Add("lat", lat);
					param.Add("lng", lng);
					param.Add("use_yn", use_yn);

					rtnbox = store.updateBranch(param);
					result.Add(new JsonStringValue("result", rtnbox.ResultCode));
					result.Add(new JsonStringValue("message", rtnbox.ResultMsg));
				}
			}
			catch (Exception ex)
			{
				result.Add(new JsonStringValue("result", "155"));
				result.Add(new JsonStringValue("message", "매장업데이트 진행시 예외오류가 발생하였습니다.\\n" + ex.Message));
			}
		}

		private void getbranchlist()
		{
			DataSet ds = null;
			ds = new DataSet();
			try
			{
				Hashtable param = new Hashtable();
				param.Add("currpage", (jsonCol["currpage"] != null) ? jsonCol["currpage"].GetValue().ToString() : "1");
				param.Add("search_sel", (jsonCol["search_sel"] != null) ? jsonCol["search_sel"].GetValue().ToString() : "");
				param.Add("search_text", (jsonCol["search_text"] != null) ? jsonCol["search_text"].GetValue().ToString() : "");
				param.Add("use_yn", "");
				/*
				param.Add("route", (jsonCol["route"] != null) ? jsonCol["route"].GetValue().ToString() : "0");
				param.Add("showcnt", (jsonCol["showcnt"] != null) ? jsonCol["showcnt"].GetValue().ToString() : "");
				param.Add("daygroup", (jsonCol["daygroup"] != null) ? jsonCol["daygroup"].GetValue().ToString() : "0");
				param.Add("sdate", (jsonCol["sdate"] != null) ? jsonCol["sdate"].GetValue().ToString() : "");
				param.Add("edate", (jsonCol["edate"] != null) ? jsonCol["edate"].GetValue().ToString() : "");
				*/
				ds = store.selectBranchList(param);

				result.Add(new JsonStringValue("result", "000"));
				result.Add(new JsonStringValue("message", "정상조회 되었습니다."));
				result.Add(new JsonStringValue("List", JsonConvert.SerializeObject(ds, Newtonsoft.Json.Formatting.Indented)));

			}
			catch (Exception ex)
			{
				result.Add(new JsonStringValue("result", "160"));
				result.Add(new JsonStringValue("message", "리스트 조회시 예외오류가 발생하였습니다.\\n" + ex.Message));
			}
		}

		private void getcallbranchlist()
		{
			DataSet ds = null;
			DataSet callds = null;
			ds = new DataSet();
			callds = new DataSet();
			string a_branch_id = "";
			try
			{
				Hashtable param = new Hashtable();
				param.Add("search_sel", (jsonCol["search_sel"] != null) ? jsonCol["search_sel"].GetValue().ToString() : "");
				param.Add("search_text", (jsonCol["search_text"] != null) ? jsonCol["search_text"].GetValue().ToString() : "");

				ds = store.selectBranchListAll();

				if (DbUtil.ContainData(ds))
				{
					foreach (DataRow dt in ds.Tables[0].Rows)
					{
						a_branch_id += dt["a_branch_id"].ToString() + "','";
					}
					a_branch_id = a_branch_id.Substring(0, a_branch_id.Length - 3);
				}

				param.Add("a_branch_id", a_branch_id);

				callds = callstore.selectCallBranchList(param);

				result.Add(new JsonStringValue("result", "000"));
				result.Add(new JsonStringValue("message", "정상조회 되었습니다."));
				result.Add(new JsonStringValue("List", JsonConvert.SerializeObject(callds, Newtonsoft.Json.Formatting.Indented)));

			}
			catch (Exception ex)
			{
				result.Add(new JsonStringValue("result", "152"));
				result.Add(new JsonStringValue("message", "리스트 조회시 예외오류가 발생하였습니다.\\n" + ex.Message));
			}
		}

		private void synccallbranch()
		{
			ResultBox rtnbox = new ResultBox();
			ResultBox rtnboxlog = new ResultBox();
			DataSet callds = null;
			callds = new DataSet();
			string syncSql = "";
			string arr_branch_id = (jsonCol["arr_branch_id"] != null) ? jsonCol["arr_branch_id"].GetValue().ToString() : "";

			try
			{
				if ("".Equals(arr_branch_id))
				{
					result.Add(new JsonStringValue("result", "995"));
					result.Add(new JsonStringValue("message", "매장데이터가 없습니다."));
				}
				else
				{
					arr_branch_id = arr_branch_id.Substring(1,arr_branch_id.Length-1);
					arr_branch_id = arr_branch_id.Replace("|", "','");
					Hashtable param = new Hashtable();

					param.Add("a_branch_id", arr_branch_id);

					callds = callstore.synccallbranch(param);

					if (DbUtil.ContainData(callds))
					{
						foreach (DataRow calldt in callds.Tables[0].Rows)
						{
							syncSql += calldt["qry"].ToString();
						}

						Hashtable callparam = new Hashtable();
						callparam.Add("qry", syncSql);
						rtnbox = store.synccallbranchexec(callparam);

					}

					string agent_id = base.logOnInfo.UserId.ToString();
					string agent_nm = base.logOnInfo.UserName.ToString();
					string agent_ip = Request.ServerVariables["REMOTE_ADDR"];
					string actionmode = "synccallbranch";

					Hashtable logparam = new Hashtable();
					logparam.Add("agent_id", agent_id);
					logparam.Add("agent_nm", agent_nm);
					logparam.Add("agent_ip", agent_ip);
					logparam.Add("actionmode", actionmode);
					logparam.Add("updatedt", arr_branch_id);
					logparam.Add("descdt", "매장동기화 작업");

					rtnboxlog = order.insertadminlog(logparam);

					result.Add(new JsonStringValue("result", rtnbox.ResultCode));
					result.Add(new JsonStringValue("message", rtnbox.ResultMsg));

				}
			}
			catch (Exception ex)
			{
				result.Add(new JsonStringValue("result", "996"));
				result.Add(new JsonStringValue("message", "동기화 진행시 오류가 발생하였습니다.\\n" + ex.Message));
			}
		}
	}
}