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
         * ӳ��sql�ı�ʶ�ַ�����
         * me.gacl.mapping.userMapper��userMapper.xml�ļ���mapper��ǩ��namespace���Ե�ֵ��
         * getUser��select��ǩ��id����ֵ��ͨ��select��ǩ��id����ֵ�Ϳ����ҵ�Ҫִ�е�SQL
         */
		
        String statement = "com.mapping.userMapper.getUser";//ӳ��sql�ı�ʶ�ַ���
       
		//ִ�в�ѯ����һ��Ψһuser�����sql
        User user = session.selectOne(statement, 1);
        System.out.println(user);
	}
}
