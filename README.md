# Doco

The tech stack used in the projects are as follows:

- Node JS
- Express
- React JS
- Nodemon

Please ensure you have the aboeve packages installed, frameworks installed.

How to run the application?

First clone the repository.

```
git clone https://github.com/asifrahaman13/cart.git
```

</br>

## CHATBOT BACKEND 

Next enter into the backend directory.

```
cd chatbot-backend/
```

Create a virtual environment. 

```
virtualenv .venv
```

Activate the virtual environment. In unix based system like the Linux or Mac OS you can follow the following commands: 

```
source .venv/bin/activate
```

Now install the required dependencies.

```
pip install -r requirements.txt
```

**Next enter the data into the .env file.**

Now run the backend server.

```
uvicorn main:app --reload --port=5000
```
</br>

## BACKEND 
Next you need to run the backend application.

```
cd backend/
```

Install the necessary dependencies.

```
yarn install
```

Next you need to enter your email address, mongodb uri and two factor authentication password for your application in the .env file.

- For the gmail go to the manage settings section of your gmail account. On the left side you will see the security tab. click on it. Now click on the "2-Step Verification" under the "How you sign in to Google". Scroll down to find the "App passwords" function. Next click on it and enter the required details to get 16 digit app password. Copy it. https://myaccount.google.com/security

Now run the application

```
nodemon index.js
```

</br>

## FRONTEND

Next you need to run the front end application.Open another terminal.

```
cd frontend/
```

Install the necessary dependencies.

```
yarn install
```

Run the next js application

```
yarn start
```
