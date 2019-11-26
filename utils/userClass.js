// some helper method 
class Users {
    constructor(){
        this.users = [];
    }
    
    AddUserData(id, name, room){
        var users = {id, name, room};
        this.users.push(users);
        return users;
    }
    //remove user when socket is disconnect.
    RemoveUser(id){
        var user = this.GetUser(id);
        if(user){
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }
    // get all user who connect to this specific id
    GetUser(id){
        var getUser = this.users.filter((userId) => {
            return userId.id === id;
        })[0];
        return getUser;
    }
    // It get whoever connect to connect chat room
    GetUsersList(room){
        var users = this.users.filter((user) => user.room === room);
        
        var namesArray = users.map((user) => {
            return user.name;
        });
        
        return namesArray;
    }
}

module.exports = {Users};