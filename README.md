# Social-Networking-Site

This site is build using MEAN Stack

Proxy Server is used to connect the frontend part and the backend part.

The Web app is build such that the backend can exist independently Like if in future you need to change your frontend tool to any tool other than Angular you can do it easily.

There are two folders 

    1) RestApi -> Backend
    
    2) RestApi-ui -> Frontend
    
To Run the Web App on your system you need to make sure that your system must contain

    1) Node Js Installed with npm (Node Package Manager) working on it
    
        -> To Check If it is working
        
        Type
        
            -> node --version
            
            it will return the version of node
            
            -> npm --version
            
            it will return the version of your node package manager (npm)
            
    2) Mongodb Installed
    
    
While Running the app First run mongodb service for this 

      Type mongod in the cmd and it should be running till the app is running

Go to the folder where you have cloned RestApi and Run command prompt 

type following command

    -> npm install  ( All the dependencies needed to run the project will be installed).
    
    -> npm start (this will start the server for backend)
    
Go to the folder where you have cloned RestApi-ui and Run command prompt 

type following command

    -> npm install  ( All the dependencies needed to run the project will be installed).
    
    -> npm start (this will start the server where the whole web app is running).
    
    
to See the web app type
http://localhost:4200/
    
