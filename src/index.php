<!DOCTYPE html>
<html>
  <?php

  require_once('php/connect.php');

  ?>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    <!-- build:css -->
    <link type="text/css" href="css/bootstrap.min.css" rel="stylesheet">
    <link type="text/css" href="css/bootstrap-theme.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/style.css">

    <!-- endbuild -->
  </head>
  <body>
    <header>
      <div class="container">
        <div class="header">
          <div class="header--item">

          </div>
          <div class="header--item">

            <h1>User menager</h1>
          </div>

        </div>
      </div>
    </header>
    <section class="section">
      <div class="container">

        <!-- user list -->
        <div class="panel panel-primary">
          <div class="panel-heading">User List</div>
          <div class="panel-body">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Password</th>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Date of birth</th>
                  <th>Group</th>
                </tr>
              </thead>
              <tbody class="userListTable">
              </tbody>
            </table>
          </div>
        </div>
        <!-- end user list -->

        <!--  user menager -->
        <div class="panel panel-primary">
          <div class="panel-heading">User menager</div>
          <div class="panel-body">
            <form>
              <div class="input-group">
                <label>Name</label>
                <input type="text" class="form-control nameInput" placeholder="Name">
              </div>
              <div class="input-group">
                <label>Password</label>
                <input type="text" class="form-control passwordInput" placeholder="Password">
              </div>
              <div class="input-group">
                <label>First Name</label>
                <input type="text" class="form-control firstNameInput" placeholder="First Name">
              </div>
              <div class="input-group">
                <label>Last Name</label>
                <input type="text" class="form-control lastNameInput" placeholder="Last Name">
              </div>
              <div class="input-group">
                <label>Date of birth</label>
                <input type="text" class="form-control dateBirthInput" placeholder="Date of birth">
              </div>
              <div class="form-group">
                <label>Select group:</label>
                <select class="form-control selectUserInput">
                </select>
              </div>
              <button type="button" class="btn btn-primary add-city--button addUserBtn">Add user</button>
              <button type="button" class="btn btn-primary add-city--button editUserBtn ">Edit user</button>
              <button type="button" class="btn btn-primary add-city--button remUserBtn ">Remove user</button>
            </form>
          </div>
        </div>
        <!-- end user menager -->


        <!-- group list -->
        <div class="panel panel-primary">
          <div class="panel-heading">Group List

          </div>
          <div class="panel-body">


            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody class="groupListTable">
              </tbody>
            </table>
          </div>
        </div>
        <!-- end user list -->

        <!--  user menager -->
        <div class="panel panel-primary">
          <div class="panel-heading">Group menager</div>
          <div class="panel-body">
            <form>
              <div class="input-group">
                <label>Name</label>
                <input type="text" class="form-control groupInput nameGroupInput" placeholder="Name">
              </div>

              <button type="button" class="btn btn-primary add-city--button addGroupBtn">Add Group</button>
              <button type="button" class="btn btn-primary add-city--button editGroupBtn ">Edit Group</button>
              <button type="button" class="btn btn-primary add-city--button remGroupBtn ">Remove Group</button>
            </form>
          </div>
        </div>
        <!-- end user menager -->


      </div><!-- end of conainter -->
    </section>
    <footer>
      <div class="footer">
        <div class="container">
          <p>created by wkrawiec.pl</p>
        </div>
      </div>
    </footer>

    <script
            src="https://code.jquery.com/jquery-3.2.1.min.js"
            integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
            crossorigin="anonymous"></script>

<!--    <script src="js/jquery-3.2.1.js"></script>-->
    
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    <!-- build:js -->
    <script src="js/plugins.js"></script>
    <script src="js/db.js"></script>
    <script src="js/script.js"></script>

    <!-- endbuild  -->

  </body>
</html>
