/*Ustawienie wykonania działań wówczas, gdy strona jest całkowicie wczytana */
$(document).ready(function(){
  console.log("db.js started")
  

  var User = function(id, name, password, firstName, lastName, dateBirth, group){
    this.id = id;
    this.name = name;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateBirth = dateBirth;
    this.group = group;
  };

  var Group = function(id, name){
    this.id = id;
    this.name = name;
  };

  var data = {
    users: [],
    groups: [],
  };

  data.users[0] = new User(13, 'LudBetaa', 'passaa', 'Ludwigaa', 'Bethvovenaa', '1770-12-15aa', 111);
  
  data.groups[0] = new Group (26, 'nurse');
  

  /*SEND GROUP TO DB*/
  function sendGroupToDb(obj) { 
  
    $.ajax({
      type:"POST", 
      url:"php/sendGroup.php", 
      data: {name: obj.name}, 
      success:function() {
        alert("Send to data base"); 
      },
      error: function(error) {
        alert( "Error");
        console.log(error);
      }
    });
  }; 
  
  /*SEND USER TO DB*/
  function sendUserToDb(obj) { 
console.log(obj)
    $.ajax({
      type:"POST", 
      url:"php/sendUser.php", 
      data: {
        name: obj.name,
        password: obj.password,
        firstName: obj.firstName,
        lastName: obj.lastName,
        dateBirth: obj.dateBirth,
        group: obj.group,
      }, 
      success:function() {
        alert("User added to data base"); 
      },
      error: function(error) {
        alert( "Error");
        console.log(error);
      }
    });
  };

  
  /*GET USERS FROM DATA BAZ*/
  function getUsersFromDb() { 
    $.ajax({
      type:"GET", 
      url:"php/getUsersFromDb.php", 
      contentType:"application/json; charset=utf-8", 
      dataType:'json',
      success: function(json) { 

        for (i=0;i<json.length;i++){
          var newUserFromDB = new User (json[i][0], json[i][1], json[i][2], json[i][3], json[i][4], json[i][5], json[i][6]);
          
          data.users.push(newUserFromDB)
        }
      },
      error: function(err) {
        alert( "Error");
        console.log(err); 
      }
    });
  };
  
  /*GET GROUPS FROM DATA BAZ*/
  function getGroupsFromDb() { 
    $.ajax({
      type:"GET", 
      url:"php/getGroupsFromDb.php", 
      contentType:"application/json; charset=utf-8", 
      dataType:'json',
      success: function(json) { 

        for (i=0;i<json.length;i++){
          var newGroupFromDB = new Group (json[i][0], json[i][1]);

          data.groups.push(newGroupFromDB)
        }
      },
      error: function(err) {
        alert( "Error");
        console.log(err); 
      }
    });
  };
  
//  removeGroup(data.users[0].id)
  /* REMOVE GROUP FROM DB*/
  function removeGroup(idVal) {
console.log(idVal)
    $.ajax({
      type:"POST", 
      url:"php/deleteGroup.php", 
      data: {id: idVal}, 
      success : function() {
        alert("Group removed.")
      },

      error: function(err) {
        alert( "Error.");
        console.log(err); 
      }
    });

  };
//  removeUser(data.users[0].id)
  /* REMOVE USER FROM DB*/
  function removeUser(idVal) {
    console.log(idVal)
    $.ajax({
      type:"POST", 
      url:"php/deleteUser.php", 
      data: {id: idVal}, 
      success : function() {
        alert("User removed.")
      },

      error: function(err) {
        alert( "Error.");
        console.log(err); 
      }
    });

  };
  
//  editUserInDb(data.users[0]);
  /*SEND USER TO DB*/
  function editUserInDb(obj) { 
    (console.log(obj.id))
    $.ajax({
      type:"POST", 
      url:"php/editUser.php", 
      data: {
        id: obj.id,
        name: obj.name,
        password: obj.password,
        firstName: obj.firstName,
        lastName: obj.lastName,
        dateBirth: obj.dateBirth,
        group: obj.group,
      }, 
      success:function() {

        alert("User edited"); 

      },

      error: function(error) {
        alert( "Error");
        console.log(error);
      }
    });
  };
  
//  editGroupInDb(data.groups[0]);
  function editGroupInDb(obj) { 
    console.log(obj.id);
    console.log(obj.name);
    $.ajax({
      type:"POST", 
      url:"php/editGroup.php", 
      data: {
        id: obj.id,
        name: obj.name,
      }, 
      success:function() {
        alert("Group edited"); 

      },
      error: function(error) {
        alert( "Error");
        console.log(error);
      }
    });
  };




}); /*Klamra zamykająca $(document).ready(function(){*/