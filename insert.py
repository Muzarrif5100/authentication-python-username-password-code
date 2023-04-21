from authentication import *
print("Please login here".center(100))
file=open("student.txt","a")
user=input("enter your username:  ")
password=input("enter your password:  ")
student ="userpassword.txt"
if signin(user,password,student)==True:
    while True:
        s_id=input("enter your student id or type close: ")
        if(s_id=="close"):
            print("You are exit")
            break
        else:
            s_name=input("enter your student name: ")
            s_age=input("enter your student age: ")
            s_location=input("enter your student location: ")
        file.write(s_id+":"+s_name+":"+s_age+":"+s_location+"\n")
else:
    print("password incorrect")
   