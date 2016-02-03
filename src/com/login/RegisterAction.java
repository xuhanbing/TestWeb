/**
 * 
 */
package com.login;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ibatis.session.SqlSession;

import com.HttpServletBase;
import com.bean.Account;
import com.bean.User;
import com.db.MyBatisHelper;

/**
 * @author hanbing
 * 
 */
public class RegisterAction extends HttpServletBase {

	
	/* (non-Javadoc)
	 * @see javax.servlet.http.HttpServlet#doPost(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
//		super.doPost(req, resp);
		
		Map<String, String[]> parameterMap = req.getParameterMap();
		
		String username = parameterMap.get("username")[0];
		String password = parameterMap.get("password")[0];
		
		int ret = 0;
		
		SqlSession session = MyBatisHelper.createSqlSession();
		
		ret = session.selectOne("com.mapping.userMapper.checkAccount", username);
		
		
		if (ret > 0)
		{
			error(resp, 1, "¸ÃÕÊºÅÒÑ´æÔÚ");
			
		} else {
			Account account = new Account();
			account.username = username;
			account.password = password;
			
			
			ret = session.insert("com.mapping.userMapper.registerAccount", account);
			
			session.commit();
			
			if (ret > 0)
			{
				account = session.selectOne("com.mapping.userMapper.login", account);
				
				if (null == account)
				{
					error(resp, 2, "×¢²áÊ§°Ü");
				} else {
					account.password = "";
					
					User user = new User();
					user.id = account.id;
					user.name = "Ãû×Ö" + account.id;
					ret = session.update("com.mapping.userMapper.updateUser", user);
					
					if (ret <= 0)
					{
						ret = session.insert("com.mapping.userMapper.addUser", user);
					}
					
					session.commit();
					
					success(resp, "×¢²á³É¹¦", account);
				}
				
			} else {
				error(resp, 3, "×¢²áÊ§°Ü");
			}
		}
		
	}
}
