/**
 * 
 */
package com.bean;

/**
 * @author hanbing
 * 
 */
public class User {
	public int id;
	public String name;
	public int age; 
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return "id:" + id + ",name:" + name + ",age:" + age;
	}
}