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

    data.users[0] = new User(1, 'LudBet', 'pass', 'Ludwig', 'Bethvoven', '1770-12-15', 1);
    data.users[0] = new User(1, 'LudBet', 'pass', 'Ludwig', 'Bethvoven', '1770-12-15', 1);
    data.users[1] = new User(2, 'WolMoz', 'pass', 'Wolfgang', 'Mozart', '1756-01-27', 1);
    data.users[2] = new User(3, 'FrydCho', 'pass', 'Fryderyk', 'Chopin', '1810-03-01', 1);
    data.users[3] = new User(4, 'KryZim', 'pass', 'Krystian', 'Zimerman', '1956-12-05', 2);

    data.groups[0] = new Group(1, 'composer');
    data.groups[1] = new Group(2, 'pianist');

    // public methods
    return{
      testing: function(){
        console.log(data);
      },

      getData: function(){
        return data;
      },
      getGroupData: function(){
        return data.groups;
      },

      addUser: function(obj){
        var newId
        if (data.users.length > 0){
          newId = (data.users[data.users.length-1].id)+1;
        } else {
          newId = 1;
        }

        var newUser = new User(newId, obj.name, obj.password, obj.firstName, obj.lastName, obj.dateBirth, obj.group);

        //add new user to data
        data.users.push(newUser);

        return newUser
      },
       
      addGroup: function(obj){

        var newId
        if (data.groups.length > 0){
          newId = (data.groups[data.groups.length-1].id)+1;
        } else {
          newId = 1;
        }
        
        var newGroup = new Group(newId, obj.name);
        
        //add new user to data
        data.groups.push(newGroup);

        //return new user to print
        return newGroup
        
      },

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

      removeUser: function(posInArray){

        if (posInArray >= 0 ){
          // remove user
          data.users.splice(posInArray,1);
          
          //send success feedback
          return true
        } else {
          
          //send error feedback
          return false
        }
      },
      
      removeGroup: function(posInArray){

        if (posInArray >= 0 ){
          // remove user
          data.groups.splice(posInArray,1);

          //send success feedback
          return true
        } else {

          //send error feedback
          return false
        }
      },
      
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
        
      findIdInUsersArray: function(idVal){
        var numberInArray = -1;

        for (i=0; i < data.users.length; i++){
          if (idVal == data.users[i].id){
            numberInArray = i;
            break;
          };
        };
        return numberInArray;
      },
     
      findIdInGroupsArray: function(idVal){
        var numberInArray = -1;

        for (i=0; i < data.groups.length; i++){
          if (idVal == data.groups[i].id){
            numberInArray = i;
            break;
          };
        };
        return numberInArray;
      },
      
      changeNameToIdGroup: function(obj){
    
        for (i=0; i < data.groups.length; i++){
          if (obj.group == data.groups[i].name){
            obj.group = data.groups[i].id;
            break;
          };
        };

        return obj;
        },
      
      
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

          var html = '<tr><th scope="row" class="idList">%id%</th><td class="nameList">%name%</td><td class="passwordList">%password%</td><td class="firstNameList">%firstName%</td><td class="lastNameList">%lastName%</td><td class="dateBirthList">%dateBirth%</td><td class="groupList">%group%</td></tr>';
          var newHtml = html.replace('%name%', data.users[i].name);
          var newHtml = newHtml.replace('%id%', data.users[i].id);
          var newHtml = newHtml.replace('%password%', data.users[i].password);
          var newHtml = newHtml.replace('%firstName%', data.users[i].firstName);
          var newHtml = newHtml.replace('%lastName%', data.users[i].lastName);
          var newHtml = newHtml.replace('%dateBirth%', data.users[i].dateBirth);
          
          var newHtml = newHtml.replace('%group%', data.groups[data.users[i].group-1].name); // -1 if group start count from 1
          

          $(DOMstrings.userListTable).append(newHtml)
        };

      },
      
      printGroupList: function(data){
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
      
      printSelectInputInGroupList: function(data){
        
        var htmlAll = '<option value="all">%option%</option>';
        var newHtmlAll = htmlAll.replace('%option%', "All");

        $(DOMstrings.selectGroupInput).append(newHtmlAll)

        for (i=0;i<data.groups.length;i++){
          var html = '<option value="'+data.groups[i].name +'">%option%</option>';
          var newHtml = html.replace('%option%', data.groups[i].name);

          $(DOMstrings.selectGroupInput).append(newHtml)
        };
      },
      // *********************************************************
      printSelectedGroup: function(data){
        // print user only from group
      },

      getInputsValues: function(){
        var addUserData = {
          name: $(DOMstrings.nameInput).val(),
          password: $(DOMstrings.passwordInput).val(),
          firstName: $(DOMstrings.firstNameInput).val(),
          lastName: $(DOMstrings.lastNameInput).val(),
          dateBirth: $(DOMstrings.dateBirthInput).val(),
          group: $(DOMstrings.selectUserInput).val(),
        };

        return addUserData;
      },
      
      getInputsGroupValues: function(){
        var addUserData = {
          name: $(DOMstrings.nameGroupInput).val(),
        };
        return addUserData;
      },

      clearInputs: function(){
        $(DOMstrings.nameInput).val("");
        $(DOMstrings.passwordInput).val("");
        $(DOMstrings.firstNameInput).val("");
        $(DOMstrings.lastNameInput).val("");
        $(DOMstrings.dateBirthInput).val("");

        //don't clear group
//        $(DOMstrings.selectUserInput).val("");
      },
      
      clearGroupInputs: function(){
        $(DOMstrings.nameGroupInput).val("");
      },

      takeDataFromRow: function(data){

        var parentNode = $(data).parent();

        var selectedUser = {
          id: $(parentNode).find(DOMstrings.idList).text(),
          name: $(parentNode).find(DOMstrings.nameList).text(),
          password: $(parentNode).find(DOMstrings.passwordList).text(),
          firstName: $(parentNode).find(DOMstrings.firstNameList).text(),
          lastName: $(parentNode).find(DOMstrings.lastNameList).text(),
          dateBirth: $(parentNode).find(DOMstrings.dateBirthList).text(),
          group: $(parentNode).find(DOMstrings.groupList).text(),
        };

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

      // add user btn
      $(DOMstrings.addUserBtn).click(ctrlAddUser);
      
      // remove user btn
      $(DOMstrings.remUserBtn).click(ctrlRemoveUser);

      // edit user btn
      $(DOMstrings.editUserBtn).click(ctrlEditUser);

      //selected user
      $(DOMstrings.userListTable).click(function(event){
        ctrlSelectedData(event.target);
      });
      
      //selected group
      $(DOMstrings.groupListTable).click(function(event){
        ctrlGroupSelectedData(event.target);
      });
      
      // add group btn
      $(DOMstrings.addGroupBtn).click(ctrlAddGroup);

      // remove group btn
      $(DOMstrings.remGroupBtn).click(ctrlRemoveGroup);

      // edit group btn
      $(DOMstrings.editGroupBtn).click(ctrlEditGroup);


      // print user list from selected group


    };

    var ctrlSelectedData = function(el) {

      // class with no dot
      var dangerNoDot = DOMstrings.dangerClass.slice(1)

      // part of putting data to inputs
      var selectedData = UIController.takeDataFromRow(el);

      if ($(DOMstrings.dangerClass).length === 0){

        // select row
        $(el).parent().addClass(dangerNoDot);

        // put data in inputs
        UIController.putSelectedDataInInputs(selectedData);

        // set selected user id
        userController.setSelectedUserId(selectedData.id);

      } else if ($(el).parent().hasClass(dangerNoDot) === false){

        // unselect row
        $(DOMstrings.dangerClass).removeClass(dangerNoDot);

        //select row
        $(el).parent().addClass(dangerNoDot);

        // put data in inputs
        UIController.putSelectedDataInInputs(selectedData);

        // set selected user id
        userController.setSelectedUserId(selectedData.id);
      } else {

        //unselect row
        $(DOMstrings.dangerClass).removeClass(dangerNoDot);

        // clear add Inputs
        UIController.clearInputs();

        // set selected user id to -1
        userController.setSelectedUserId(-1);
      };


    };
    
    var ctrlGroupSelectedData = function(el) {

      // class with no dot
      var dangerNoDot = DOMstrings.dangerClass.slice(1)

      // part of putting data to inputs
      var selectedData = UIController.takeGroupNameData(el);

      if ($(DOMstrings.dangerClass).length === 0){

        // select row
        $(el).parent().addClass(dangerNoDot);

        // put data in inputs
        UIController.putSelectedDataInGroupInputs(selectedData);

        // set selected group id
        userController.setSelectedGroupId(selectedData.id);

      } else if ($(el).parent().hasClass(dangerNoDot) === false){

        // unselect row
        $(DOMstrings.dangerClass).removeClass(dangerNoDot);

        //select row
        $(el).parent().addClass(dangerNoDot);

        // put data in inputs 
        UIController.putSelectedDataInGroupInputs(selectedData);

        // set selected user id
        userController.setSelectedGroupId(selectedData.id);
      } else {

        //unselect row
        $(DOMstrings.dangerClass).removeClass(dangerNoDot);

        // clear add Inputs
        UIController.clearGroupInputs();

        // set selected user id to -1
        userController.setSelectedUserId(-1);
      };


    };

    var ctrlAddUser = function (){

      // get Data from inputs
      var input = UIController.getInputsValues();
      
      // change group name to group id
      var inputWithIdGroup = userController.changeNameToIdGroup(input)

      // clear add Inputs
      UIController.clearInputs();
      
      // add item to data
      var newItem = userController.addUser(inputWithIdGroup);
      
      // get group data - with names
      var groupData = userController.getGroupData();

      // prepare data to print List
      var newData = {users: [newItem], groups: groupData};

      // print add new user in List
      UIController.printUserList(newData);

    };
    
    var ctrlAddGroup = function (){

      // get Data from inputs
      var input = UIController.getInputsGroupValues();

      // clear add Inputs
      UIController.clearGroupInputs();

      // add item to data
      var newItem = userController.addGroup(input);

      // prepare data to print List
      var newData = {users: "", groups: [newItem]};

      // print add new user in List
      UIController.printGroupList(newData);

    };

    var ctrlRemoveUser = function(){

      var selectedId = userController.getSelectedUserId();

    //check is the user selected
      if (selectedId < 0){
        console.log("Please select user.")
      } else {
        
        // find position in array
        var arrayPosition = userController.findIdInUsersArray(selectedId);

        
        if (userController.removeUser(arrayPosition) === true){
          //remove user
          
          // feedback success
          console.log("user removed");
          
          //remove user list
          UIController.removeUserList();
          
          // clear inputs
          UIController.clearInputs();

          //print new user list
          UIController.printUserList(userController.getData());
      } else {
        
        // feedback false
        console.log("user not found")
      }
    }
    };
    
    var ctrlRemoveGroup = function(){

      var selectedId = userController.getSelectedGroupId();

      //check is the user selected
      if (selectedId < 0){
        console.log("Please select user.")
      } else {

        // find position in array
        var arrayPosition = userController.findIdInGroupsArray(selectedId);


        if (userController.removeGroup(arrayPosition) === true){
          //remove user

          // feedback success
          console.log("user removed");

          //remove user list
          UIController.removeGroupList();

          // clear inputs
          UIController.clearGroupInputs();

          //print new user list 
          UIController.printGroupList(userController.getData());
        } else {

          // feedback false
          console.log("group not found")
        }
      }
    };
    
    var ctrlEditUser = function(){
      var selectedId = userController.getSelectedUserId();

      //check is the user selected
      if (selectedId < 0){
        console.log("Please select user.")
      } else {

        // find position in array
        var arrayPosition = userController.findIdInUsersArray(selectedId);
        
        // get data from inputs
        var dataInputs = UIController.getInputsValues();
        
        // put id to data
        dataInputs.id = selectedId;
        
        // change group name to group id
        var inputWithIdGroup = userController.changeNameToIdGroup(dataInputs)


        if (userController.editUser(arrayPosition, inputWithIdGroup) === true){
          //edit user

          // feedback success
          console.log("user edited");

          //remove user list
          UIController.removeUserList();

          //print new user list
          UIController.printUserList(userController.getData());
          
          // clear inputs
          UIController.clearInputs();
        } else {

          // feedback false
          console.log("user not found")
        }
      }
    };    
    
    var ctrlEditGroup = function(){
      var selectedId = userController.getSelectedGroupId();

      //check is the user selected
      if (selectedId < 0){
        console.log("Please select user.")
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
          console.log("user edited");

          //remove user list
          UIController.removeGroupList();

          //print new user list
          UIController.printGroupList(userController.getData());
          
          // clear inputs
          UIController.clearGroupInputs();
        } else {

          // feedback false
          console.log("user not found")
        }
      }
    };


    return {
      init: function(){
        console.log("App has started");
//        console.log(userController.getData());
        var data = userController.getData();
        UIController.printUserList(data);
        UIController.printGroupList(data);
        UIController.printSelectInputInUserList(data);
        UIController.printSelectInputInGroupList(data);
        ctrlAddUser;
        setupEventListeners();
//        $(DOMstrings.selectUserInput).val(2);
      }
    }

  })(userController, UIController);
  // END GLOBAL APP CONTROLLER


// end DOMContentLoaded

  controller.init();
});

