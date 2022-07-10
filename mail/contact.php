<?php 

// ini_set('memory_limit', '1024M'); // or you could use 1G
// ini_set('maximum_execution_limit', 180);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';
require '../vendor/phpmailer/phpmailer/src/Exception.php';
require '../vendor/phpmailer/phpmailer/src/PHPMailer.php';
require '../vendor/phpmailer/phpmailer/src/SMTP.php';

$mail = new PHPMailer();
// $mail->IsSMTP();
$mail->Mailer = $mail->IsSMTP();
$mail->SMTPDebug = 1;  
$mail->SMTPAuth = TRUE;
$mail->SMTPSecure = "tls";
$mail->Port = 587;
$mail->Host = "smtp.gmail.com";
$mail->Username = "trebormoralesson@gmail.com";
$mail->Password = "utoegaaoxxbdmjfw";

$mail->IsHTML(true);
$mail->AddAddress($mail->Username, "Robertson Morales");
$mail->SetFrom($_POST['email_address'], $_POST['first_name'] . ' ' . $_POST['last_name']);
$mail->AddReplyTo($_POST['email_address'], $_POST['first_name'] . ' ' . $_POST['last_name']);
// $mail->AddCC($mail->Username, "cc-recipient-name");
$mail->Subject = "Testing";
$mail->MsgHTML($_POST['message']); 

if(!$mail->Send()) {
    $exception = new Exception;
    return array(
        "is_success" => false,
            "message" => $exception->errorMessage()
        );
    
} else {
    return array(
        "is_success" => true, 
        "message" => "Message is sent successfully"
    );
}

?>