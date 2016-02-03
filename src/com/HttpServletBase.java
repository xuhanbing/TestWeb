/**
 * 
 */
package com;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;

import com.bean.Result;
import com.google.gson.Gson;

/**
 * @author hanbing
 * 
 */
public class HttpServletBase extends HttpServlet {

	
	protected void success(HttpServletResponse resp, String message) {
		success(resp, message);
	}
	
	protected void success(HttpServletResponse resp, String message, Object data) throws IOException {
		Result result = new Result();
		result.code = 0;
		result.message = message;
		result.data = data;
		
		response(resp, result);
		
	}
	
	protected void error(HttpServletResponse resp, int code, String message) throws IOException
	{
		Result result = new Result();
		result.code = code;
		result.message = message;
		
		response(resp, result);
	}
	
	protected void response(HttpServletResponse resp, Result result) throws IOException {
		
		
		resp.setCharacterEncoding("utf-8");
		
		PrintWriter writer = resp.getWriter();
		
		writer.append(new Gson().toJson(result));
		
		writer.close();
	}
}
