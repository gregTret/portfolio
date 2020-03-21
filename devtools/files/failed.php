<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link rel="stylesheet" type="text/css" href="../css/styles.css" />

    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <title>Code for Me</title>
  </head>
  <body>
    <div class="Navigation" id="nav">
      <a href="../index.html">code for me</a>
      <a href="../about.html">about</a>
      <a href="../contact.html">contact</a>
      <a href="javascript:void(0);" class="icon" onclick="ResponsiveNavvy()">
        <i class="fa fa-bars"></i>
      </a>
    </div>
    <div class="grid">
      <!-- Below is the Card component -->
      <div class="card1" style="justify-content: flex-start; width: 50%;">
        <div>
		 	<h1>Empty Search</h1>
			<h3>The search came up absolutely empty, here's a list of potential reasons why:</h3>
			<h4>--- A word was Misspelled</h4>
			<h4>--- No information exists on the question you asked</h4>
			<h4>--- The description was too vague</h4>
			<h4>--- The description was too specific</h4>
			<h4>--- We messed something up, leave us an error report and we'll check it out</h4>
			<h5>Error: Empty Search Results</h5>
			<input type="submit" value="Try Again" class="submit" onclick='window.location = "../index.html"'  />

		  <br><br>
          <h4>Bug Report</h4>
          <form action="files/contactBug.php" method="get" style="position:relative; left:0%; top:20px;">
        <div class="form" style="position:relative; left:0%; width:10%;">
          <label for="exampleFormControlInput1">Email</label>
          <input type="text" name ="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
        </div>
        <div class="form" style="position:relative; left:0%; width:10%;">
          <label name ="message" for="exampleFormControlTextarea1">Message</label>
          <textarea name ="message" class="form-control" id="exampleFormControlTextarea1" placeholder="Please keep under 300 characters in length" type="text" cols="60" rows="10"></textarea>
          <button type="submit" class="btn btn-primary" style="margin-top:10px;">Submit</button>
        </div>
        </div>
      </div>
    </div>
    </form>
    <br />
  <script type="text/javascript" src="../scripts.js"></script>
  </body>
</html>