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
		 	<h1>Exhausted Search</h1>
			
			<h4>Unfortunately, we are not yet ready to handle that error. Hopefully someday we will be.</h4>
			<h5>Error: Solutions yield null results stack overflow</h5>
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