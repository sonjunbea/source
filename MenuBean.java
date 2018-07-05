package com.cntt.beans;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.HashMap;

import org.springframework.web.jsf.FacesContextUtils;

import com.cntt.base.BaseBean;
import com.cntt.db.DBParam;
import com.cntt.sql.MenuSQL;
import com.cntt.util.PropInfo;

public class MenuBean extends BaseBean{
	
	public MenuBean() {
		// TODO Auto-generated constructor stub
	}
	
	@Override
	public String customJSON() {
		String strResult = null;
		String strSQL = null;
		DBParam dbParam = null;
		PropInfo propInfo = null;
		
		propInfo = cUtils.getPropInfo("base", "xml");
		dbParam = new DBParam();
		strSQL = " select max(update_version) as upversion from t_menu_update";
		HashMap<String, HashMap<String, String>> resultMap = getResultMap(propInfo, strSQL, dbParam);
		HashMap<String, String> upVersion = resultMap.get("0");
		String up = upVersion.get("upversion");
		MenuSQL menuSQL = new MenuSQL();
		menuSQL.setMap(paramMap);
		String defaultPath = cUtils.getPropMenuFilePath();
		File file = null;
		
		file = new File(defaultPath);
		if (!file.exists()) {
			file.mkdirs();
		}
		
			menuSQL.setMap(paramMap);
			//System.out.println(paramMap);
			String cl_cd = paramMap.get("cl_cd");
			String td_cd = paramMap.get("td_cd");
			//System.out.println(td_cd);
			if(td_cd != null && td_cd != ""){
				//test
				//file = new File("C:\\Users\\son\\Desktop\\menulist_"+cl_cd+"_"+td_cd+".txt");
				file = new File(cUtils.getPropMenuFilePath()+"/"+up+"_"+cl_cd+"_"+td_cd+".txt");
			}else{
				file = new File(cUtils.getPropMenuFilePath()+"/"+up+"_"+cl_cd+".txt");
			}
			// test.txt 파일이 있는지 확인
			if(file.isFile()){
				try{
					
					BufferedReader in = new BufferedReader(new FileReader(file));
					StringBuffer sb = new StringBuffer();
					
			        int bufferSize = 1024 * 1024; 
			         
			        char readBuf [] = new char[bufferSize]; 
			        int resultSize = 0; 
			         
			        while((resultSize = in.read(readBuf))  != -1){ 
			                if(resultSize == bufferSize){ 
			                       sb.append(readBuf); 
			                }else{ 
			                       for(int i = 0; i < resultSize; i++){ 
			                            sb.append(readBuf[i]);
			                       } 
			                } 
			        } 
			        String jString = sb.toString();
			        strResult = jString;		        

				}catch(Exception e){
					e.printStackTrace();
				}
			}else{
				menuSQL.setMap(paramMap);
				strSQL = menuSQL.setSQL(menuSQL.getSQL());
				dbParam = menuSQL.getDBParam();
				strResult = getJSONFromDB(propInfo, strSQL, dbParam);
				String jsonFilePath = null; 
				if(td_cd != null && td_cd != ""){
					jsonFilePath = cUtils.getPropMenuFilePath()+"/"+up+"_"+cl_cd+"_"+td_cd+".txt";
				}else{
					jsonFilePath = cUtils.getPropMenuFilePath()+"/"+up+"_"+cl_cd+".txt";
				}
				try{
					FileOutputStream jsonFileWriter = new FileOutputStream(new File(jsonFilePath)); 
					OutputStreamWriter menu = new OutputStreamWriter(jsonFileWriter);
					//OutputStreamWriter menu = new OutputStreamWriter(jsonFileWriter,"UTF-8");
					menu.write(strResult.toString()); 
					menu.flush(); 
					menu.close();
				}catch (IOException e){
					e.printStackTrace();
				}
			}
		return strResult;
	}
}
