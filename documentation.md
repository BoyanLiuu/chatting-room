
---

Name: Boyan Liu & Minhui Xie

Date: 11/30/2019    

Project Topic: Arcade-chat room

URL: http://103.283.293.13:3000/
 ---

### 1. Data Format and Storage
Model one Game Model: 
Data point fields:
- `Field 1`: Name               `Type: String`
- `Field 2`: image              `Type: String`
- `Field 3`: fans             `Type: Array[{username,email}]`

Schema: 
```javascript
{
    name: "League of legend",
    image: "League of Legends",
    fans: [{username:"boyan",email:"xx@gmail.com"}]
}
```
Model two User Model: 
Data point fields:
- `Field 1`: username               `Type: String`
- `Field 2`: email             `Type: String, unique: true, lowecase:true`
- `Field 3`: password             `Type: String,select:false`
- `Field 4`: photo             `Type: String,default: 'default.jpg`
- `Field 5`: facebook             `Type: String,default: ''`
- `Field 5`:  fbtokens            `Type: Array`
Schema: 
```javascript
{
    username: "boyan",
    email: "xx@gmail.com",
    password:"a bunch of encrypted code"
    photo : "default.jpg"
    facebook:"a bunch facebook id"
}
```
### 2 Live updates:
if you click any room after you log in then you can send real time chat 



### 3. View Data
page 1: home page
page 2: /signup    sign up page
page 3: /home     this is the main page after log in
page 4: /group/:id      this is the page you see when you click any room 
page 5: /me             this is your profile page
page 6: /about          this is page about name of group memebers and description of the application

### All Api
### 1). get all user 
 `/api/user_list`   
### 2). get specific user with id: 
 `/api/user/:id`  
### 3). delete specific user with id: 
 `/api/user/:id`  
 ### 4). put(update) specific user with id: 
 `/api/user/:id`  
 ### 5). delete all user: 
 `/api/delete_user`
 ### 6). delete all room: 
 `/api/delete_room`
 ### 7). create a user: 
 `/api/create_user`
  ### 8). create a chat room: 
 `/api/create_room`
  ### 9). get all room: 
 `/api/room_List`
  ### 10). get single room information: 
 `/api/room/:id`


### Modules:
I have a folder called routes, they all export module , so i mount the these routes in index.js
### NPM packages:
Here are 2 additional npm packages I used: 
passport
socket.io
