import java.io.InputStream;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import com.bean.User;
import com.db.MyBatisHelper;

/**
 * 
 */

/**
 * @author hanbing
 * 
 */
public class Test {

	public static void main(String[] args) {
		
		 SqlSession session = MyBatisHelper.createSqlSession();
		 
        /**
         * 映射sql的标识字符串，
         * me.gacl.mapping.userMapper是userMapper.xml文件中mapper标签的namespace属性的值，
         * getUser是select标签的id属性值，通过select标签的id属性值就可以找到要执行的SQL
         */
		
        String statement = "com.mapping.userMapper.getUser";//映射sql的标识字符串
       
		//执行查询返回一个唯一user对象的sql
        User user = session.selectOne(statement, 1);
        System.out.println(user);
	}
}
