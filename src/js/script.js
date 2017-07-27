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

    var data = {
      users: [],
      groups: [],
    };

    var selectedUserId = -1;

    data.users[0] = new User(1, 'LudBet', 'pass', 'Ludwig', 'Bethvoven', '1770-15-12', 'composer');
    data.users[1] = new User(2, 'WolMoz', 'pass', 'Wolfgang', 'Mozart', '1756-01-27', 'composer');
    data.users[2] = new User(3, 'FrydCho', 'pass', 'Fryderyk', 'Chopin', '1810-03-01', 'composer');

    data.groups[0] = 'composer';
    data.groups[1] = 'pianist';

    return{
      testing: function(){
        console.log(data);
      },

      getData: function(){
        return data;
      },

      addUser: function(obj){
        var newId = (data.users[data.users.length-1].id)+1;

        var newUser = new User(newId, obj.name, obj.password, obj.firstName, obj.lastName, obj.dateBirth, obj.group);

        //add new user to data
        data.users.push(newUser);

        return newUser
      },

      setSelectedUserId: function(val){
        selectedUserId = val;
      },

      getSelectedUserId: function(){
        return selectedUserId;
      },

      removeUser: function(idVal){
        var numberInArray = -1;

        for (i=0; i < data.users.length; i++){
          if (idVal == data.users[i].id){
            numberInArray = i;
            break;
          };
        };

        if (numberInArray >= 0 ){
          // remove user
          data.users.splice(numberInArray,1);
          return true
        } else {
          return false
        }
      },

    }
  })();
  // END USER CONTROLLER


  // UI CONTROLLER
  var UIController = (function(){

    var DOMstrings = {
      nameInput: ".nameInput",
      passwordInput: ".passwordInput",
      firstNameInput: ".firstNameInput",
      lastNameInput: ".lastNameInput",
      dateBirthInput: ".dateBirthInput",
      selectGroupInput: ".selectGroupInput",
      addUserBtn: ".addUserBtn",
      userListTable: ".userListTable",
      idList: ".idList",
      nameList: ".nameList",
      passwordList: ".passwordList",
      firstNameList: ".firstNameList",
      lastNameList: ".lastNameList",
      dateBirthList: ".dateBirthList",
      groupList: ".groupList",
      dangerClass: ".danger",
      editUserBtn: ".editUserBtn",
      remUserBtn: ".remUserBtn",
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
          var newHtml = newHtml.replace('%group%', data.users[i].group);

          $(DOMstrings.userListTable).append(newHtml)
        };

      },

      printselectGroupInput: function(data){

        for (i=0;i<data.groups.length;i++){

          var html = '<option>%option%</option>';
          var newHtml = html.replace('%option%', data.groups[i]);

        $(".selectGroupInput").append(newHtml)

        };

      },

      getInputsValues: function(){
        var addUserData = {
          name: $(DOMstrings.nameInput).val(),
          password: $(DOMstrings.passwordInput).val(),
          firstName: $(DOMstrings.firstNameInput).val(),
          lastName: $(DOMstrings.lastNameInput).val(),
          dateBirth: $(DOMstrings.dateBirthInput).val(),
          group: $(DOMstrings.selectGroupInput).val(),
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
//        $(DOMstrings.selectGroupInput).val("");
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

      putSelectedDataInInputs: function(data){
        $(DOMstrings.nameInput).val(data.name);
        $(DOMstrings.passwordInput).val(data.password);
        $(DOMstrings.firstNameInput).val(data.firstName);
        $(DOMstrings.lastNameInput).val(data.lastName);
        $(DOMstrings.dateBirthInput).val(data.dateBirth);
      },
      removeUserList: function(){
        $(DOMstrings.userListTable).empty();
      }


    }
  })();
  // END UI CONTROLLER



  // GLOBAL APP CONTROLLER
  var controller = (function(weatherController, UIController){

    var DOMstrings = UIController.getDOMstrings();

    // events listeners
    var setupEventListeners = function(){

      // add btn
      $(DOMstrings.addUserBtn).click(ctrlAddUser);

      //selected user
      $(DOMstrings.userListTable).click(function(event){
        ctrlSelectedData(event.target);
      });

      $(DOMstrings.remUserBtn).click(ctrlRemoveUser);


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

    var ctrlAddUser = function (){

      // get Data from inputs
      var input = UIController.getInputsValues();

      // clear add Inputs
      UIController.clearInputs();

      // add item to userController !!!!!
      var newItem = userController.addUser(input);

      // prepare data to print List
      var newData = {users: [newItem]};

      // print add new user in List
      UIController.printUserList(newData);

    };

    var ctrlRemoveUser = function(){

      var selectedId = userController.getSelectedUserId();

    //check is the user selected
      if (selectedId < 0){
        console.log("Please select user.")
      } else {

        //remove user
        if (userController.removeUser(selectedId) === true){
          console.log("user removed");

          // clear inputs
          UIController.clearInputs();

          //remove user list
          UIController.removeUserList();

          //print new user list
          UIController.printUserList(userController.getData());
      } else {
        console.log("user not found")
      }
    }
    };


    return {
      init: function(){
        console.log("App has started");
//        console.log(userController.getData());
        UIController.printUserList(userController.getData());
        UIController.printselectGroupInput(userController.getData());
        ctrlAddUser;
        setupEventListeners()
      }
    }

  })(userController, UIController);
  // END GLOBAL APP CONTROLLER


// end DOMContentLoaded

  controller.init();
});

