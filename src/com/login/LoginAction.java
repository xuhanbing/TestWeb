package com.login;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSession;

import com.HttpServletBase;
import com.bean.Account;
import com.bean.Result;
import com.bean.User;
import com.db.MyBatisHelper;
import com.google.gson.Gson;
import com.mysql.jdbc.log.Log;
import com.sun.org.apache.bcel.internal.generic.ACONST_NULL;

/**
 * 
 */

/**
 * @author hanbing
 * 
 */
public class LoginAction extends HttpServletBase {

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
//		super.doPost(req, resp);
		
		Map<String, String[]> parameterMap = req.getParameterMap();
		
		String username = parameterMap.get("username")[0];
		String password = parameterMap.get("password")[0];
		    
		
		int id = checkLogin(username, password);
		
		Result result = new Result();
		if (id <= 0)
		{
			if (ERROR_NO_ACCOUNT == id)
			{
				result.code = 1;
				result.message = "帐号不存在";
			} else if (ERROR_PASSWORD == id)
			{
				result.code = 2;
				result.message = "密码错误";
			}
			
			
		} else {
			User user = getUserInfo2(id);
			
			//haha
			if (null == user)
			{
				result.code = 3;
				result.message = "查询不到该用户信息";
			} else {
				result.data = user;
				result.message = "成功";
				
				
				
			}
		}
		
		
		
		resp.setCharacterEncoding("utf-8");
		final PrintWriter writer = resp.getWriter();
		writer.append("" + new Gson().toJson(result));
		
		
	} 
	
	public User login(String account, String password){
		
		System.out.println("login account=" + account + ",password=" + password);
		
		int id = checkLogin(account, password);
		
		if (id > 0)
		return getUserInfo2(id);
		else return null;
	}

	/* (non-Javadoc)
	 * @see javax.servlet.http.HttpServlet#doGet(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		super.doGet(req, resp);
		
	}
	
	static final int ERROR_NO_ACCOUNT = -1;
	static final int ERROR_PASSWORD = -2;
	
	public int checkLogin(String username, String password)
	{
		
		Account account = new Account();
		account.username = username;
		account.password = password;
	

		SqlSession session = MyBatisHelper.createSqlSession();
		
		account = session.selectOne("com.mapping.userMapper.login", account);
		    
		    if (null == account)
		    {
		    	return ERROR_NO_ACCOUNT;
		    } else {
		    	
		    	if (password.equals(account.password))
		    	{
		    		return account.id;
		    	} else {
		    		return ERROR_PASSWORD;
		    	}
		    	
		    }
	}
	
	
	public User getUserInfo2(int id)
	{
		SqlSession sqlSession = MyBatisHelper.createSqlSession();
		
		User user = sqlSession.selectOne("com.mapping.userMapper.getUser", id);
		
		if (null != user)
		{
			user.name += "(mybatis)";
		}
		
		return user;
	}
	
}
