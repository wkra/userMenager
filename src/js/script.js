document.addEventListener("DOMContentLoaded", function () {


  // USER CONTROLLER
  var userController = (function(){

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

    var selectedUserId = -1;
    var selectedGroupId = -1;

    // public methods
    return{
      testing: function(){
        alert(data);
      },
      
      getDataFromDB: function (callback){
        /*GET USERS FROM DB*/
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
          
            /*GET GROUPS FROM DB*/
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
                //function callback
                if($.isFunction(callback)) {callback();};
              },
              error: function(err) {
                alert( "Error");
                console.log(err); 
              }
              
            });
            
          },
          error: function(err) {
            alert( "Error");
            console.log(err); 
          }
        });
        console.log(data);
      },

      getData: function(){
        return data;
      },
      getGroupData: function(){
        return data.groups;
      },

      addUser: function(option, obj, callback){
        console.log('addUser')
        console.log(obj)
        
        //add user
        if(option === 'user'){
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
              //function callback
              if($.isFunction(callback)) {callback();};
            },
            error: function(error) {
              alert( "Error");
              console.log(error);
            }
          });
        }
        
        // add group
        if (option === "group"){
          $.ajax({
            type:"POST", 
            url:"php/sendGroup.php", 
            data: {name: obj.name}, 
            success:function() {
              //function callback
              if($.isFunction(callback)) {callback();};
            },
            error: function(error) {
              alert( "Error");
              console.log(error);
            }
          });
        }
 

      },
       
//      addGroup: function(obj){
//
//        var newId
//        if (data.groups.length > 0){
//          newId = (data.groups[data.groups.length-1].id)+1;
//        } else {
//          newId = 1;
//        }
//        
//        var newGroup = new Group(newId, obj.name);
//        
//        //add new user to data
//        data.groups.push(newGroup);
//
//        //return new user to print
//        return newGroup
//        
//      },

      setSelectedUserId: function(val){
        selectedUserId = val;
      },

      getSelectedUserId: function(){
        return selectedUserId;
      },
      
      setSelectedGroupId: function(val){
        selectedGroupId = val;
      },

      getSelectedGroupId: function(){
        return selectedGroupId;
      },
// ************************************************************
      removeUser: function(option, idVal, callback){
        console.log('idVal')
        console.log(idVal)
        if (idVal >= 0 ){
          // remove user
          if (option === "user"){
            $.ajax({
              type:"POST", 
              url:"php/deleteUser.php", 
              data: {id: idVal}, 
              success : function() {
                if($.isFunction(callback)) {callback(data);};
              },

              error: function(err) {
                alert( "Error.");
                console.log(err); 
              }
            });
            
          }
          
          if (option === "group"){
            $.ajax({
              type:"POST", 
              url:"php/deleteGroup.php", 
              data: {id: idVal}, 
              success : function() {
                if($.isFunction(callback)) {callback(data);};
              },

              error: function(err) {
                alert( "Error.");
                console.log(err); 
              }
            });
            // remove group
          }
//          // remove user
//          data.users.splice(posInArray,1);
//          
//          //send success feedback
//          return true
//        } else {
//          
//          //send error feedback
//          return false
        }
      },
      
//      removeGroup: function(posInArray){
//
//        if (posInArray >= 0 ){
//          // remove group
//          data.groups.splice(posInArray,1);
//
//          //send success feedback
//          return true
//        } else {
//
//          //send error feedback
//          return false
//        }
//      },
  
      
      editUser: function(posInArray, newData){
        
        if (posInArray >= 0 ){
          // edit user
          data.users.splice(posInArray, 1, newData);

          //send success feedback
          return true
        } else {

          //send error feedback
          return false
        }

      },     
      
      editGroup: function(posInArray, newData){

        if (posInArray >= 0 ){
          // edit user
          data.groups.splice(posInArray, 1, newData);

          //send success feedback
          return true
        } else {

          //send error feedback
          return false
        }

      },
        
//      findIdInUsersArray: function(option, idVal){
//        console.log('idVal')
//        console.log(idVal)
//        var numberInArray = -1;
//
//        if (option === "user"){
//          for (i=0; i < idVal; i++){
//            if (idVal == data.users[i].id){
//              numberInArray = i;
//              break;
//            };
//          }; 
//        } if (option === "group"){
//          for (i=0; i < idVal; i++){
//            if (idVal == data.groups[i].id){
//              numberInArray = i;
//              break;
//            };
//          };      
//        }
//        console.log('numberInArray')
//        console.log(numberInArray)
//        return numberInArray;
//      },
     
//      findIdInGroupsArray: function(idVal){
//        var numberInArray = -1;
//
//        for (i=0; i < data.groups.length; i++){
//          if (idVal == data.groups[i].id){
//            numberInArray = i;
//            break;
//          };
//        };
//        return numberInArray;
//      },
      
      changeNameToIdGroup: function(obj){
    
        for (i=0; i < data.groups.length; i++){
          if (obj.group == data.groups[i].name){
            obj.group = data.groups[i].id;
            break;
          };
        };

        return obj;
        },
      removeTempData: function(){
        data.users.splice(0,data.users.length);
        data.groups.splice(0,data.groups.length);
      }
      
      
     // end of return 
    }
  })();
  // END USER CONTROLLER


  // UI CONTROLLER
  var UIController = (function(){

    var DOMstrings = {
      nameInput: ".nameInput",
      nameGroupInput: ".nameGroupInput",
      passwordInput: ".passwordInput",
      firstNameInput: ".firstNameInput",
      lastNameInput: ".lastNameInput",
      dateBirthInput: ".dateBirthInput",
      selectUserInput: ".selectUserInput",
      selectGroupInput: ".selectGroupInput",
      addUserBtn: ".addUserBtn",
      editUserBtn: ".editUserBtn",
      remUserBtn: ".remUserBtn",
      userListTable: ".userListTable",
      groupListTable: ".groupListTable",
      idList: ".idList",
      idGroupList: ".idGroupList",
      nameList: ".nameList",
      nameGroupList: ".nameGroupList",
      passwordList: ".passwordList",
      firstNameList: ".firstNameList",
      lastNameList: ".lastNameList",
      dateBirthList: ".dateBirthList",
      groupList: ".groupList",
      dangerClass: ".danger",
      addGroupBtn: ".addGroupBtn",
      editGroupBtn: ".editGroupBtn",
      remGroupBtn: ".remGroupBtn",

    };

    //public methods
    return {
      getDOMstrings: function(){
        return DOMstrings;
      },

      printUserList: function(data){
        for (i=0;i<data.users.length;i++){

          var html = '<tr><th scope="row" class="idList">%id%</th><td class="nameList">%name%</td><td class="passwordList">%password%</td><td class="firstNameList">%firstName%</td><td class="lastNameList">%lastName%</td><td class="dateBirthList">%dateBirth%</td><td class="groupList">undefined</td></tr>';
          var newHtml = html.replace('%name%', data.users[i].name);
          var newHtml = newHtml.replace('%id%', data.users[i].id);
          var newHtml = newHtml.replace('%password%', data.users[i].password);
          var newHtml = newHtml.replace('%firstName%', data.users[i].firstName);
          var newHtml = newHtml.replace('%lastName%', data.users[i].lastName);
          var newHtml = newHtml.replace('%dateBirth%', data.users[i].dateBirth);
          
          //find group name
          for (ii=0;ii < data.groups.length;ii++){
            if(data.users[i].group == data.groups[ii].id){
              var newHtml = newHtml.replace('undefined', data.groups[ii].name);
              break;
            }
          }     

          $(DOMstrings.userListTable).append(newHtml)
        };

      },
      
      printGroupList: function(data){
        console.log("printGroupList")
        for (i=0;i<data.groups.length;i++){

          var html = '<tr><th scope="row" class="idGroupList">%id%</th><td class="nameGroupList">%name%</td></tr>';
          var newHtml = html.replace('%name%', data.groups[i].name);
          var newHtml = newHtml.replace('%id%', data.groups[i].id);

          $(DOMstrings.groupListTable).append(newHtml)
        };

      },

      printSelectInputInUserList: function(data){

        for (i=0;i<data.groups.length;i++){

          var html = '<option value="'+data.groups[i].name +'">%option%</option>';
          var newHtml = html.replace('%option%', data.groups[i].name);

          $(DOMstrings.selectUserInput).append(newHtml)

        };

      },
      removeSelectInputInUserList: function(){
        $(DOMstrings.selectUserInput).empty();
      },
      
//      printSelectInputInGroupList: function(data){
//        
//        var htmlAll = '<option value="all">%option%</option>';
//        var newHtmlAll = htmlAll.replace('%option%', "All");
//
//        $(DOMstrings.selectGroupInput).append(newHtmlAll)
//
//        for (i=0;i<data.groups.length;i++){
//          var html = '<option value="'+data.groups[i].name +'">%option%</option>';
//          var newHtml = html.replace('%option%', data.groups[i].name);
//
//          $(DOMstrings.selectGroupInput).append(newHtml)
//        };
//      },
//*******************************************************************
      getInputsValues: function(option){
        
        if (option === 'user'){
          var addUserData = {
            name: $(DOMstrings.nameInput).val(),
            password: $(DOMstrings.passwordInput).val(),
            firstName: $(DOMstrings.firstNameInput).val(),
            lastName: $(DOMstrings.lastNameInput).val(),
            dateBirth: $(DOMstrings.dateBirthInput).val(),
            group: $(DOMstrings.selectUserInput).val(),
          };
        }
          if (option === 'group'){
            var addUserData = {
              name: $(DOMstrings.nameGroupInput).val(),
            };
          };
        console.log('addUserData')
        console.log(addUserData)
        return addUserData;
      },
      
//      getInputsGroupValues: function(){
//        var addUserData = {
//          name: $(DOMstrings.nameGroupInput).val(),
//        };
//        return addUserData;
//      },

      clearInputs: function(){
        // user inputs
        $(DOMstrings.nameInput).val("");
        $(DOMstrings.passwordInput).val("");
        $(DOMstrings.firstNameInput).val("");
        $(DOMstrings.lastNameInput).val("");
        $(DOMstrings.dateBirthInput).val("");
        
        // group input
        $(DOMstrings.nameGroupInput).val("");

        //don't clear group
//        $(DOMstrings.selectUserInput).val("");
      },
      
//      clearGroupInputs: function(){
//        $(DOMstrings.nameGroupInput).val("");
//      },

      takeDataFromRow: function(option, data){

        var parentNode = $(data).parent();
           
        if (option === 'user'){
          var selectedUser = {
            id: $(parentNode).find(DOMstrings.idList).text(),
            name: $(parentNode).find(DOMstrings.nameList).text(),
            password: $(parentNode).find(DOMstrings.passwordList).text(),
            firstName: $(parentNode).find(DOMstrings.firstNameList).text(),
            lastName: $(parentNode).find(DOMstrings.lastNameList).text(),
            dateBirth: $(parentNode).find(DOMstrings.dateBirthList).text(),
            group: $(parentNode).find(DOMstrings.groupList).text(),
          };
        } if (option === 'group'){
          var selectedUser = {
            id: $(parentNode).find(DOMstrings.idGroupList).text(),
            name: $(parentNode).find(DOMstrings.nameGroupList).text(),
          };
        }
        return selectedUser;
      },
      
      
      takeGroupNameData: function(data){
        var parentNode = $(data).parent();

        var selectedUser = {
          id: $(parentNode).find(DOMstrings.idGroupList).text(),
          name: $(parentNode).find(DOMstrings.nameGroupList).text(),
        };
        return selectedUser;
      },

      putSelectedDataInInputs: function(data){
        $(DOMstrings.nameInput).val(data.name);
        $(DOMstrings.passwordInput).val(data.password);
        $(DOMstrings.firstNameInput).val(data.firstName);
        $(DOMstrings.lastNameInput).val(data.lastName);
        $(DOMstrings.dateBirthInput).val(data.dateBirth);
        $(DOMstrings.selectUserInput).val(data.group);
      },
      
      putSelectedDataInGroupInputs: function(data){
        $(DOMstrings.nameGroupInput).val(data.name);

      },
      removeUserList: function(){
        $(DOMstrings.userListTable).empty();
      },
      removeGroupList: function(){
        $(DOMstrings.groupListTable).empty();
      }


    }
  })();
  // END UI CONTROLLER



  // GLOBAL APP CONTROLLER
  var controller = (function(weatherController, UIController){

    var DOMstrings = UIController.getDOMstrings();

    // events listeners
    var setupEventListeners = function(){
      
      //selected user
      $(DOMstrings.userListTable).click(function(event){
        ctrlUserSelectedData('user', event.target);
      });

      //selected group
      $(DOMstrings.groupListTable).click(function(event){
        ctrlUserSelectedData('group', event.target);
      });
      
      // remove user btn 
      $(DOMstrings.remUserBtn).click(function(){
        ctrlRemoveUser('user')
      });
      
      // remove group btn
      $(DOMstrings.remGroupBtn).click(function(){
        ctrlRemoveUser('group')
      });

      // add user btn **********************************************
      $(DOMstrings.addUserBtn).click(function(){
        ctrlAddUser('user')
      });
      
      // add group btn
      $(DOMstrings.addGroupBtn).click(function(){
        ctrlAddUser('group')
      });
      

      // edit user btn
      $(DOMstrings.editUserBtn).click(ctrlEditUser);


      // edit group btn
      $(DOMstrings.editGroupBtn).click(ctrlEditGroup);


      // print user list from selected group


    };
    
    var clearAllAndPrint = function(){
      //remove lists
      UIController.removeUserList();
      UIController.removeGroupList();
      UIController.removeSelectInputInUserList();

      // clear inputs
      UIController.clearInputs();

      //remove temp data
      userController.removeTempData();

      //print new lists
      userController.getDataFromDB(function(data){
        var data = userController.getData();
        UIController.printUserList(data);
        UIController.printGroupList(data);
        UIController.printSelectInputInUserList(data);
      });
    };

    var ctrlUserSelectedData = function(option, el) {

      // class with no dot
      var dangerNoDot = DOMstrings.dangerClass.slice(1)

      // part of putting data to inputs
      var selectedData = UIController.takeDataFromRow(option, el);

      if ($(DOMstrings.dangerClass).length === 0){

        // select row
        $(el).parent().addClass(dangerNoDot);

        // put selected data to user inputs
        if (option === "user"){
          // put data in inputs
          UIController.putSelectedDataInInputs(selectedData);

          // set selected user id
          userController.setSelectedUserId(selectedData.id);
          
        // put selected data to group inputs
        } if (option === "group"){
          // put data in inputs
          UIController.putSelectedDataInGroupInputs(selectedData);

          // set selected group id
          userController.setSelectedGroupId(selectedData.id);
        }


      } else if ($(el).parent().hasClass(dangerNoDot) === false){

        // unselect row
        $(DOMstrings.dangerClass).removeClass(dangerNoDot);
        
        // clear all Inputs
        UIController.clearInputs();
        UIController.clearGroupInputs();

        //select row
        $(el).parent().addClass(dangerNoDot);

        // put selected data to user inputs
        if (option === "user"){
          
          // put data in inputs
          UIController.putSelectedDataInInputs(selectedData);

          // set selected user id
          userController.setSelectedUserId(selectedData.id);
        
        // put selected data to group inputs
        } if (option === "group"){
          
          // put data in inputs
          UIController.putSelectedDataInGroupInputs(selectedData);

          // set selected group id
          userController.setSelectedGroupId(selectedData.id);
        }
      } else {
        //unselect row
        $(DOMstrings.dangerClass).removeClass(dangerNoDot);

        // clear all  Inputs
        UIController.clearInputs();
        UIController.clearGroupInputs();

        // set all selected id to -1
        userController.setSelectedUserId(-1);
        userController.setSelectedGroupId(-1);
      };
      
    };
    
//    var ctrlGroupSelectedData = function(el) {
//
//      // class with no dot
//      var dangerNoDot = DOMstrings.dangerClass.slice(1)
//
//      // part of putting data to inputs
//      var selectedData = UIController.takeGroupNameData(el);
//
//      if ($(DOMstrings.dangerClass).length === 0){
//
//        // select row
//        $(el).parent().addClass(dangerNoDot);
//
//        // put data in inputs
//        UIController.putSelectedDataInGroupInputs(selectedData);
//
//        // set selected group id
//        userController.setSelectedGroupId(selectedData.id);
//
//      } else if ($(el).parent().hasClass(dangerNoDot) === false){
//
//        // unselect row
//        $(DOMstrings.dangerClass).removeClass(dangerNoDot);
//
//        //select row
//        $(el).parent().addClass(dangerNoDot);
//
//        // put data in inputs 
//        UIController.putSelectedDataInGroupInputs(selectedData);
//
//        // set selected user id
//        userController.setSelectedGroupId(selectedData.id);
//      } else {
//
//        //unselect row
//        $(DOMstrings.dangerClass).removeClass(dangerNoDot);
//
//        // clear add Inputs
//        UIController.clearGroupInputs();
//
//        // set selected id to -1
//        userController.setSelectedUserId(-1);
//        userController.setSelectedGroupId(-1);
//      };
//
//
//    };

    var ctrlAddUser = function (option){

      // get Data from inputs
      var input = UIController.getInputsValues(option);


      // if user - change group name to group id
      if (option === "user"){
        var input = userController.changeNameToIdGroup(input)
      }
      
//      // clear add Inputs 
//      UIController.clearInputs();
      
      // add item to data *******************************************
      var newItem = userController.addUser(option, input, function(){
        clearAllAndPrint();
        
      });
      
      alert(option + " added.")
      
////      // get group data - with names
////      var groupData = userController.getGroupData();
////
////      // prepare data to print List
////      var newData = {users: [newItem], groups: groupData};
//
//      //print new lists
//      userController.getDataFromDB(function(data){
//        var data = userController.getData();
//        UIController.printUserList(data);
//        UIController.printGroupList(data);
//        UIController.printSelectInputInUserList(data);


    };
    
//    var ctrlAddGroup = function (){
//
//      // get Data from inputs
//      var input = UIController.getInputsGroupValues();
//
//      // clear add Inputs
//      UIController.clearGroupInputs();
//
//      // add item to data
//      var newItem = userController.addGroup(input);
//
//      // prepare data to print List
//      var newData = {users: "", groups: [newItem]};
//
//      // print add new user in List
//      UIController.printGroupList(newData);
//      
//      // clear select input options
//      UIController.removeSelectInputInUserList();
//
//      //get updated data
//      var freshData = userController.getData();
//
//      //print new select list options
//      UIController.printSelectInputInUserList(freshData);
//
//    };

    var ctrlRemoveUser = function(option){
      // get selected user flag
      var selectedId = -1;
      if (option === 'user'){
        selectedId = userController.getSelectedUserId();
      } if (option === 'group'){
        selectedId = userController.getSelectedGroupId();
      }

    //check is the user selected
      if (selectedId < 0){
        alert("Please select " + option +".")
      } else {
        
//        // find position in array 
//        var arrayPosition = userController.findIdInUsersArray(option, selectedId);
//        console.log(arrayPosition)


        userController.removeUser(option, selectedId, function(){
          // callback function
          
          // clear and print
          clearAllAndPrint()

          // feedback success
          alert(option + " removed.");
          
        }) 

    }
    };
    
//    var ctrlRemoveGroup = function(){
//
//      // get selected group flag
//      var selectedId = userController.getSelectedGroupId();
//
//      //check is the user selected
//      if (selectedId < 0){
//        alert("Please select group.")
//      } else {
//
//        // find position in array
//        var arrayPosition = userController.findIdInGroupsArray(selectedId);
//
//
//        if (userController.removeGroup(arrayPosition) === true){
//          //remove user
//
//          //remove user list
//          UIController.removeGroupList();
//
//          // clear inputs
//          UIController.clearGroupInputs();
//
//          //print new user list 
//          UIController.printGroupList(userController.getData());
//          
//          // clear select input options
//          UIController.removeSelectInputInUserList();
//
//          //get updated data
//          var freshData = userController.getData();
//          
//          //print new select list options
//          UIController.printSelectInputInUserList(freshData);
//          
//          // feedback success
//          alert("Group removed.");
//        } else {
//
//          // feedback false
//          alert("Group not found.")
//        }
//      }
//    };
    
    var ctrlEditUser = function(){
      var selectedId = userController.getSelectedUserId();

      //check is the user selected
      if (selectedId < 0){
        alert("Please select user.")
      } else {

        // find position in array
        var arrayPosition = userController.findIdInUsersArray(selectedId);
        
        // get data from inputs
        var dataInputs = UIController.getInputsValues();
        
        // put id to data
        dataInputs.id = selectedId;
        
        // change group name to group id
        var inputWithIdGroup = userController.changeNameToIdGroup(dataInputs);


        if (userController.editUser(arrayPosition, inputWithIdGroup) === true){
          //edit user

          // feedback success
          alert("User edited");

          //remove user list
          UIController.removeUserList();

          //print new user list
          UIController.printUserList(userController.getData());
          
          // clear inputs
          UIController.clearInputs();
        } else {

          // feedback false
          alert("User not found.")
        }
      }
    };    
    
    var ctrlEditGroup = function(){
      var selectedId = userController.getSelectedGroupId();

      //check is the user selected
      if (selectedId < 0){
        alert("Please select group.")
      } else {

        // find position in array
        var arrayPosition = userController.findIdInGroupsArray(selectedId);
        
        // get data from inputs
        var dataInputs = UIController.getInputsGroupValues();
        
        // put id to data
        dataInputs.id = selectedId;
        
        // change group name to group id
        var inputWithIdGroup = userController.changeNameToIdGroup(dataInputs)

        if (userController.editGroup(arrayPosition, inputWithIdGroup) === true){
          //edit user

          // feedback success
          alert("Group edited.");

          //remove group list
          UIController.removeGroupList();

          // clear inputs
          UIController.clearGroupInputs();
          
          // clear select input options
          UIController.removeSelectInputInUserList();
          
          //remove user list
          UIController.removeUserList();
          
          //get updated data
          var freshData = userController.getData();
          
          //print new user list
          UIController.printUserList(freshData);
          
          //print new select list options
          UIController.printSelectInputInUserList(freshData);
          
          //print new group list
          UIController.printGroupList(freshData);

        } else {

          // feedback false
          alert("Group not found.")
        }
      }
    };


    return {
      init: function(){
        console.log("App has started");
        userController.getDataFromDB(function(data){
          var data = userController.getData();
          UIController.printUserList(data);
          UIController.printGroupList(data);
          UIController.printSelectInputInUserList(data);
//          ctrlAddUser;
          setupEventListeners();
        })
        
      }
    }

  })(userController, UIController);
  // END GLOBAL APP CONTROLLER


// end DOMContentLoaded

  controller.init();
});

