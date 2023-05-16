<?php
  require_once "recaptchalib.php";
  ob_start();
  function respuesta_entregada($estado, $mensaje_estado, $datos)
    {
        //cabecera respuesta
        $protocol = (isset($_SERVER['SERVER_PROTOCOL']) ? $_SERVER['SERVER_PROTOCOL'] : 'HTTP/1.1');
        header("$protocol 200 $mensaje_estado");
        //rellenamos array con estado, mensaje y datos
        $respuesta['estado'] = $estado;
        $respuesta['mensaje_estado'] = $mensaje_estado;
        $respuesta['datos'] = $datos;

        //codificamos el json
        $respuesta_json = json_encode($respuesta);

        //pintamos el contenido del json
        echo $respuesta_json;
    }
  if($_POST) {
    $secret = "6LdlKwYgAAAAAMOlDvwyJ5BRCqNqw5VcRdHfw1nL";
    $response = null;
      // Verificamos la clave secreta
    $reCaptcha = new ReCaptcha($secret);
    if ($_POST["g-recaptcha-response"]) {
      $response = $reCaptcha->verifyResponse(
      $_SERVER["REMOTE_ADDR"],
      $_POST["g-recaptcha-response"]
      );
    }
    if ($response != null && $response->success) {
        // Añade aquí el código que desees en el caso de que la validación sea correcta
        $from=(string) $_POST["email"];
        $header_txt  ="MIME-Version: 1.0" . "\r\n";
        $header_txt .="Date: ".date("l j F Y, G:i")."\n";
        $header_txt .="From:" . $from ."\n";
        $header_txt .="Return-path:  info@chavesbao.com \n";
        $header_txt .="Reply-To:" . $from . "\n";
        $header_txt.="Content-Type: text/html; charset=\"utf-8\"\n";
        $subject ="Gama de Accesorios para Cable y Cadena";
        $body ="Nombre: ".(string) $_POST["name"]."\r\n";
        $body .="Apellidos: ".(string) $_POST["surnames"]."\r\n";
        $body .="Empresa: ".(string) $_POST["company"]."\r\n";
        $body .="Email: ".$from."\n";
        $body .="Teléfono: ".(string) $_POST["phone"]."\r\n";
        $body .="Mensaje / Consulta: ".(string) $_POST["message"]."\r\n";
        $recipient = "info@chavesbao.com";
        if(mail($recipient, $subject, $body, $header_txt)) {
          respuesta_entregada(200, 'Success', null);
          ob_end_flush();
        } else {
            respuesta_entregada(500, 'The email did not go through', null);
            ob_end_flush();
        }
    } else {
      respuesta_entregada(500, 'Error recaptcha', null);
      ob_end_flush();
    }
  } else {
    respuesta_entregada(500, 'Something went wrong', null);
    ob_end_flush();
  }

?>
