def signin(username,password,file):
    files=open(file,"r")
    user=files.readline().strip()
    pword=files.readline().strip()
    if username==user and password==pword:
        return True
    else:
        return False