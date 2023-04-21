from authentication import *
user=input("enter your username:  ")
password=input("enter your password: ")
students ="userpassword.txt"

if signin(user,password,students)==True:
    file=open("student.txt","r")
    print("Student_ID","\t","Student_Name","\t","Student_Age","\t","Student_Location")
    for i in file:
        value=i.strip().split(":")
        print(value[0],"\t\t",value[1],"\tadmin",value[2],"\t",value[3])

    file=open("student.txt","r")
    name=[]
    age=[]
    for line in file:
        add=line.strip().split(":")
        name.append(add[1])
        age.append(int(add[2]))
    print("\n"+"No.of students: ",len(name))
    print("lowest age of students: ", min(age))
    print("higest age of students: ", max(age))
else:
    print("password incorrect")



