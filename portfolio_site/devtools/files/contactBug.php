<?php
     if (isset($_GET['email']) && (isset($_GET['message']))) {
        $email = $_GET['email'];
        $message = $_GET['message'];
        $msg = wordwrap($message,300);
        $to = "gregory.tretiakov@outlook.com";
        $subject = $email;
        $txt = $message;
        $headers = "From:bugreporterform@codeforme.ca\r\n";
        mail($to,$subject,$msg,$headers);
        header("Location: ../index.html");
    }
?>
