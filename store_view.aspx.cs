using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using System.Web.UI.HtmlControls;
using System.Collections;
using System.Data;
using Biz.gne; 

namespace admin.gne.store
{
	public partial class store_view : CNTT.Framework.Base.WebBase
	{
		protected string branch_id = "";
		protected string pages = "";

		#region 페이지에 사용되는 변수
		protected string get_dt = "";
		protected string a_branch_id = "";
		protected string a_branch_nm = "";
		protected string a_branch_tel = "";
		protected string a_branch_addr = "";
		protected string a_delivery_time = "";
		protected string a_week_starttime = "";
		protected string a_week_endtime = "";
		protected string a_end_starttime = "";
		protected string a_end_endtime = "";
		protected string order_branch_id = "";
		protected string mid = "";
		protected string mertkey = "";
		protected string ocb_branch_id = "";
		protected string ocb_branch_cn = "";
        protected string packing_type = "";
		protected string home_yn = "N";
		protected string online_yn = "";
		protected string ecoupon_yn = "N";
		protected string cesco_yn = "N";
		protected string carddisc_yn = "N";
		protected string advance_yn = "N";
		protected string bctop_yn = "N";
		protected string lat = "";
		protected string lng = "";
		protected string use_yn = "";
		#endregion

		protected void Page_Load(object sender, EventArgs e)
		{
			branch_id = webUtil.GetParam("branch_id", "");
			pages = webUtil.GetParam("pages", "1");

			if (branch_id == "" || branch_id == null)
			{
				webUtil.Alert("잘못된 경로로 접근하셧습니다.", "/store/store_list.aspx");
				return;
			}
			DataSet ds = null;
            DataSet ds1 = null;
			Hashtable param = new Hashtable();
			param.Add("branch_id", branch_id);

			if (!IsPostBack)
			{
				Order cm = new Order();
				ds = cm.selectBranchInfo(param);

                #region 마스터코드 바인딩
                CodeMaster master = new CodeMaster();
                ds1 = master.selectCodeMaster(param);
                packinginfo.DataSource = ds1.Tables[0];
                packinginfo.DataBind();
                #endregion

                if (DbUtil.ContainData(ds))
				{
					DataRow branch = ds.Tables[0].Rows[0];

					get_dt = branch["get_dt"].ToString();
					a_branch_id = branch["a_branch_id"].ToString();
					a_branch_nm = branch["a_branch_nm"].ToString();
					a_branch_tel = branch["a_branch_tel"].ToString();
					a_branch_addr = branch["a_branch_addr"].ToString();
					a_delivery_time = branch["a_delivery_time"].ToString();
					a_week_starttime = branch["a_week_starttime"].ToString();
					a_week_endtime = branch["a_week_endtime"].ToString();
					use_yn = branch["use_yn"].ToString();
					a_end_starttime = branch["a_end_starttime"].ToString();
					a_end_endtime = branch["a_end_endtime"].ToString();
					order_branch_id = branch["order_branch_id"].ToString();
					mid = branch["mid"].ToString();
					mertkey = branch["mertkey"].ToString();
					ocb_branch_id = branch["ocb_branch_id"].ToString();
					ocb_branch_cn = branch["ocb_branch_cn"].ToString();
                    packing_type = branch["packing_type"].ToString();
					home_yn = branch["home_yn"].ToString(); 
					online_yn = branch["online_yn"].ToString();
					ecoupon_yn = branch["ecoupon_yn"].ToString();
					cesco_yn = branch["cesco_yn"].ToString();
					carddisc_yn = branch["carddisc_yn"].ToString();
					advance_yn = branch["advance_yn"].ToString();
					bctop_yn = branch["bctop_yn"].ToString(); 
					lat = branch["lat"].ToString();
					lng = branch["lng"].ToString();
				}
			}
		}
	}
}
