<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Requested-With, x-xsrf-token");
    header("Content-Type: application/json/ charset-utf-8");

    include("config.php");

    $postjson = json_decode(file_get_contents("php://input"),true);

    function Mask($mask,$str){

        $str = str_replace(" ","",$str);

        for($i=0;$i<strlen($str);$i++){
            $mask[strpos($mask,"#")] = $str[$i];
        }

        return $mask;

    }

    if($postjson['aski'] == "proses_register"){

        $checkemail = mysqli_fetch_array(mysqli_query($mysqli,"select emailUsuario from tbUsuario where emailUsuario = '$postjson[email]'"));

        if($checkemail['emailUsuario'] == $postjson['email']){
            $result = json_encode(array('sucess'=>false, 'msg'=>'Email já existe'));
        }else{
            
            $datenow = date('Y-m-d');
            $datenowxxx = date('Y-m-d_H_i_s');
            $data = date("Y-m-d",strtotime($postjson['dataNasc']));

           /*  $entry = base64_decode($postjson['images']);
            $img = imagecreatefromstring($entry);

            $diretorio = "images/img_user".$datenowxxx.".jpg";
            imagejpeg($img, $diretorio);
            imagedestroy($img); */

            $diretorio = "images/usuario.png";
            
            $password = $postjson['password'];
            $insert = mysqli_query($mysqli, "insert into tbUsuario set 
            emailUsuario =  '$postjson[email]',
            nomeUsuario =  '$postjson[name]',
            dataNascUsuario = '$data',
            sexoUsuario = '$postjson[sexo]',
            fotoUsuario = '$diretorio',
            senhaUsuario =  '$password'
            ");

            if($insert){
                $result = json_encode(array('sucess'=>true, 'msg'=>'Cadastrado com Sucesso'));
            }else{
                $result = json_encode(array('sucess'=>false, 'msg'=>$mysqli->error));
            }
        }
    
        echo $result;
        
    }

    elseif($postjson['aski'] == "proses_login"){
        $password = $postjson['password'];

        $logindata = mysqli_fetch_array(mysqli_query($mysqli,"select * from tbUsuario where emailUsuario = '$postjson[email]' and senhaUsuario = '$password'"));

        $data = array(
        'codUsuario' => $logindata['idUsuario'],
        'nomeUsuario' =>  $logindata['nomeUsuario'],
        'emailUsuario' =>  $logindata['emailUsuario'],
        'dataNascUsuario' => $logindata['dataNascUsuario'],
        'sexoUsuario' => $logindata['sexoUsuario'],
        'fotoUsuario' => $logindata['fotoUsuario'],
        'senhaUsuario' => $logindata['senhaUsuario']
        );

        if($logindata){
            $result = json_encode(array('sucess'=>true, 'result'=>$data));
        }else{
            $result = json_encode(array('sucess'=>false));
        }
    
        echo $result;
        
    }

    elseif($postjson['aski'] == "load_ongs"){
        $ongs = array();

        $query = mysqli_query($mysqli,"select idOng, nomeOng, descricaoOng, logradouroOng, cidadeOng, bairroOng, numeroOng, cepOng, cnpjOng, fotoOng, emailOng, senhaOng, numeroFoneOng,  tbLoginOng.idLoginOng, tbFoneOng.idFoneOng from tbOng inner join tbFoneOng on tbOng.idFoneOng = tbFoneOng.idFoneOng inner join tbLoginOng on tbOng.idLoginOng = tbLoginOng.idLoginOng"); 

        /* $query = mysqli_query($mysqli,"select * from tbOng"); */
        
        while ($rows = mysqli_fetch_array($query)) {

            $ongs[] = array(
                'idOng' => $rows['idOng'],
                'nomeOng' => $rows['nomeOng'],
                'descricaoOng' => $rows['descricaoOng'],
                'logradouroOng' => $rows['logradouroOng'],
                'cidadeOng' => $rows['cidadeOng'],
                'bairroOng' => $rows['bairroOng'],
                'numeroOng' => $rows['numeroOng'],
                'cepOng' => $rows['cepOng'],
                'cnpjOng' => $rows['cnpjOng'],
                'fotoOng' => $rows['fotoOng'],
                'emailOng' => $rows['emailOng'],
                'senhaOng' => $rows['senhaOng'],
                'numeroFoneOng' => $rows['numeroFoneOng'],
            );
        }

        if($query){
            $result = json_encode(array('sucess'=>true, 'result'=>$ongs));
        }else{
            $result = json_encode(array('sucess'=>false, 'result'=>$mysqli->error));
        }
    
        echo $result;

    }

    elseif($postjson['aski'] == "dados_apenas"){

        $query = mysqli_query($mysqli,"select * from tbUsuario where idUsuario = '$postjson[id]'"); 

        /* $query = mysqli_query($mysqli,"select * from tbOng"); */
        
        while ($rows = mysqli_fetch_array($query)) {

            $data = array(
                'nomeUsuario' =>  $rows['nomeUsuario'],
                'emailUsuario' =>  $rows['emailUsuario'],
                'dataNascUsuario' => $rows['dataNascUsuario'],
                'sexoUsuario' => $rows['sexoUsuario'],
                'fotoUsuario' => $rows['fotoUsuario']
                );
        }

        if($query){
            $result = json_encode(array('sucess'=>true, 'result'=>$data));
        }else{
            $result = json_encode(array('sucess'=>false, 'result'=>$mysqli->error));
        }
    
        echo $result;

    }

    else if($postjson['aski'] == "proses_update"){
            $datenow = date('Y-m-d');
            $datenowxxx = date('Y-m-d_H_i_s');
            $data = date("Y-m-d",strtotime($postjson['dataNasc']));
            $diretorio = "images/img_user".$datenowxxx.".jpg";

            if($postjson['images'] == null){
                
                $logindata = mysqli_fetch_array(mysqli_query($mysqli,"select fotoUsuario from tbUsuario where idUsuario = '$postjson[id]'"));

                $imgAntiga = $logindata['fotoUsuario'];

                $update = mysqli_query($mysqli, "update tbUsuario set 
                emailUsuario =  '$postjson[email]',
                nomeUsuario =  '$postjson[name]',
                dataNascUsuario = '$data',
                sexoUsuario = '$postjson[sexo]',
                fotoUsuario = '$imgAntiga' where idUsuario = '$postjson[id]'");

                if($update){
                    $result = json_encode(array('sucess'=>true, 'msg'=>'Atualizado com Sucesso'));
                }else{
                    $result = json_encode(array('sucess'=>false, 'msg'=>$mysqli->error));
                }

            }else{
                $entry = base64_decode($postjson['images']);
                $img = imagecreatefromstring($entry);
                imagejpeg($img, $diretorio);
                imagedestroy($img);

                /*  $diretorio = "images/usuario.png"; */
                    
                /* $password = md5($postjson['password']); */
                $update = mysqli_query($mysqli, "update tbUsuario set 
                emailUsuario =  '$postjson[email]',
                nomeUsuario =  '$postjson[name]',
                dataNascUsuario = '$data',
                sexoUsuario = '$postjson[sexo]',
                fotoUsuario = '$diretorio' where idUsuario = '$postjson[id]'");

                if($update){
                    $result = json_encode(array('sucess'=>true, 'msg'=>'Atualizado com Sucesso'));
                }else{
                    $result = json_encode(array('sucess'=>false, 'msg'=>$mysqli->error));
                }

            }

        echo $result;
    }

    elseif($postjson['aski'] == "listar_user"){
        
        $query = mysqli_query($mysqli,"select * from tbUsuario where idUsuario = '$postjson[id]'"); 
        
        while ($rows = mysqli_fetch_array($query)) {

            $data = array(
                'nomeUsuario' =>  $rows['nomeUsuario'],
                'emailUsuario' =>  $rows['emailUsuario'],
                'dataNascUsuario' => $rows['dataNascUsuario'],
                'sexoUsuario' => $rows['sexoUsuario'],
                'fotoUsuario' => $rows['fotoUsuario']
                );
        }

        if($query){
            $result = json_encode(array('sucess'=>true, 'result'=>$data));
        }else{
            $result = json_encode(array('sucess'=>false, 'result'=>$mysqli->error));
        }
    
        echo $result;

    }

    elseif($postjson['aski'] == "proses_addfavorito"){

        $check = mysqli_fetch_array(mysqli_query($mysqli,"select idUsuario from tbFavoritos where idOng = '$postjson[ong]'"));

       
        if($check['idUsuario'] == $postjson['ong']){

            $query = mysqli_query($mysqli, "delete from tbFavoritos where idOng = '$postjson[ong]' and idUsuario =  '$postjson[usuario]'
            ");

             if($query){
                $result = json_encode(array('sucess'=>true, 'msg'=>'Deletado com Sucesso'));
            }else{
                $result = json_encode(array('sucess'=>false, 'msg'=>$mysqli->error));
            }
            
            echo $result;

        }else{
            $query = mysqli_query($mysqli, "insert into tbFavoritos set 
                idOng =  '$postjson[ong]',
                idUsuario =  '$postjson[usuario]'
            ");

            if($query){
                $result = json_encode(array('sucess'=>true, 'msg'=>'Adicionado com Sucesso'));
            }else{
                $result = json_encode(array('sucess'=>false, 'msg'=>$mysqli->error));
            }
        
            echo $result;
        }

    }

    elseif($postjson['aski'] == "ong_apenas"){

        $query = mysqli_query($mysqli,"select nomeOng, descricaoOng, logradouroOng, bairroOng, numeroOng, cepOng, cnpjOng, fotoOng, tbFoneOng.idFoneOng, tbLoginOng.idLoginOng, numeroFoneOng, emailOng from tbOng inner join tbFoneOng on tbOng.idFoneOng = tbFoneOng.idFoneOng inner join tbLoginOng on tbOng.idLoginOng = tbLoginOng.idLoginOng where idOng = '$postjson[id]'"); 
        
        while ($rows = mysqli_fetch_array($query)) {

            $data = array(
                'nomeOng' =>  $rows['nomeOng'],
                'descricaoOng' =>  $rows['descricaoOng'],
                'logradouroOng' => $rows['logradouroOng'],
                'bairroOng' => $rows['bairroOng'],
                'numeroOng' => $rows['numeroOng'],
                'cepOng' => Mask("#####-###",$rows['cepOng']),
                'cnpjOng' => $rows['cnpjOng'],
                'fotoOng' => $rows['fotoOng'],
                'numeroFoneOng' =>  Mask("(##)####-####",$rows['numeroFoneOng']),
                'emailOng' => $rows['emailOng']
                );
        }

        if($query){
            $result = json_encode(array('sucess'=>true, 'result'=>$data));
        }else{
            $result = json_encode(array('sucess'=>false, 'result'=>$mysqli->error));
        }
    
        echo $result;

    }

    elseif($postjson['aski'] == "campanha_ong"){

        $query =  mysqli_query($mysqli,"SELECT idCampanha, nomeCampanha, descricaoCampanha, inicioCampanha, fimCampanha, fotoCampanha FROM tbCampanha WHERE idOng = '$postjson[id]'");

        while ($rows = mysqli_fetch_array($query)) {

            $campanhas[] = array(
                'idCampanha' => $rows['idCampanha'],
                'nomeCampanha' =>  $rows['nomeCampanha'],
                'descricaoCampanha' =>  $rows['descricaoCampanha'],
                'inicioCampanha' => $rows['inicioCampanha'],
                'fimCampanha' => $rows['fimCampanha'],
                'fotoCampanha' => $rows['fotoCampanha']
            );
        }

        if($query){
            $result = json_encode(array('sucess'=>true, 'result'=>$campanhas));
        }else{
            $result = json_encode(array('sucess'=>false, 'result'=>$mysqli->error));
        }
    
        echo $result;

    }

    elseif($postjson['aski'] == "campanha_dados"){

        $query =  mysqli_query($mysqli,"SELECT idCampanha, nomeCampanha, descricaoCampanha, inicioCampanha, fimCampanha, fotoCampanha, fotoOng , tbOng.idOng, nomeOng, descricaoOng, logradouroOng, bairroOng, numeroOng, cepOng, cnpjOng, fotoOng, tbLoginOng.idLoginOng, numeroFoneOng, emailOng FROM tbCampanha INNER JOIN tbOng ON tbCampanha.idOng = tbOng.idOng INNER JOIN tbFoneOng ON tbOng.idFoneOng = tbFoneOng.idFoneOng INNER JOIN tbLoginOng ON tbOng.idLoginOng = tbLoginOng.idLoginOng  WHERE idCampanha = '$postjson[id]'");

        while ($rows = mysqli_fetch_array($query)) {

            $campanha = array(
                'idCampanha' => $rows['idCampanha'],
                'nomeCampanha' =>  $rows['nomeCampanha'],
                'descricaoCampanha' =>  $rows['descricaoCampanha'],
                'inicioCampanha' => date('d-m-Y',strtotime($rows['inicioCampanha'])),
                'fimCampanha' => date('d-m-Y',strtotime($rows['fimCampanha'])),
                'fotoCampanha' => $rows['fotoCampanha'],
                'nomeOng' =>  $rows['nomeOng'],
                'descricaoOng' =>  $rows['descricaoOng'],
                'logradouroOng' => $rows['logradouroOng'],
                'bairroOng' => $rows['bairroOng'],
                'numeroOng' => $rows['numeroOng'],
                'cepOng' => Mask("#####-###",$rows['cepOng']),
                'cnpjOng' => $rows['cnpjOng'],
                'fotoOng' => $rows['fotoOng'],
                'numeroFoneOng' =>  Mask("(##)####-####",$rows['numeroFoneOng']),
                'emailOng' => $rows['emailOng']
            );
        }

        if($query){
            $result = json_encode(array('sucess'=>true, 'result'=>$campanha));
        }else{
            $result = json_encode(array('sucess'=>false, 'result'=>$mysqli->error));
        }
    
        echo $result;


    }

    elseif($postjson['aski'] == "realizar_doacao"){

        $datenow = date('d-m-Y');
        $datenowxxx = date('Y-m-d_H_i_s');
        $diretorio = "images/img_user".$datenowxxx.".jpg";
        $entry = base64_decode($postjson['fotoDoacao']);
        $img = imagecreatefromstring($entry);
        imagejpeg($img, $diretorio);
        imagedestroy($img);
            
        $insert = mysqli_query($mysqli, "insert into tbDoacao set 
            descricaoDoacao =  '$postjson[descricaoDoacao]',
            idUsuario =  '$postjson[idUsuario]',
            dataDoacao = '$datenow',
            idCampanha = '$postjson[idCampanha]',
            fotoDoacao = '$diretorio'
        ");

            if($insert){
                $result = json_encode(array('sucess'=>true, 'msg'=>'Doacao Realizada com Sucesso'));
            }else{
                $result = json_encode(array('sucess'=>false, 'msg'=>$mysqli->error));
            }
    
        echo $result;
        
    }

    elseif($postjson['aski'] == "campanhas"){

        $query =  mysqli_query($mysqli,"SELECT idCampanha,nomeCampanha, descricaoCampanha, inicioCampanha, fimCampanha, fotoCampanha FROM tbCampanha");

        while ($rows = mysqli_fetch_array($query)) {

            $campanhas[] = array(
                'idCampanha' => $rows['idCampanha'],
                'nomeCampanha' =>  $rows['nomeCampanha'],
                'descricaoCampanha' =>  $rows['descricaoCampanha'],
                'inicioCampanha' => $rows['inicioCampanha'],
                'fimCampanha' => $rows['fimCampanha'],
                'fotoCampanha' => $rows['fotoCampanha']
            );
        }

        if($query){
            $result = json_encode(array('sucess'=>true, 'result'=>$campanhas));
        }else{
            $result = json_encode(array('sucess'=>false, 'result'=>$mysqli->error));
        }
    
        echo $result;

    }
   

    elseif($postjson['aski'] == "listar_postagens"){

        $query =  mysqli_query($mysqli,"SELECT descPostagem, tbOng.idOng, nomeOng, fotoOng FROM tbPostagem INNER JOIN tbOng ON tbPostagem.idOng = tbOng.idOng");

        while ($rows = mysqli_fetch_array($query)) {

            $postagens[] = array(
                'descPostagem' =>  $rows['descPostagem'],
                'idOng' =>  $rows['idOng'],
                'fotoOng' => $rows['fotoOng'],
                'nomeOng' => $rows['nomeOng']
            );
        }

        if($query){
            $result = json_encode(array('sucess'=>true, 'result'=>$postagens));
        }else{
            $result = json_encode(array('sucess'=>false, 'result'=>$mysqli->error));
        }
    
        echo $result;

    }

    elseif($postjson['aski'] == "listar_postagem"){

        $query =  mysqli_query($mysqli,"SELECT descPostagem, fotoOng FROM tbPostagem INNER JOIN tbOng ON tbPostagem.idOng = tbOng.idOng WHERE tbOng.idOng = '$postjson[idOng]'");

        while ($rows = mysqli_fetch_array($query)) {

            $postagem = array(
                'descPostagem' =>  $rows['descPostagem'],
                'fotoOng' => $rows['fotoOng']
            );
        }

        if($query){
            $result = json_encode(array('sucess'=>true, 'result'=>$postagem));
        }else{
            $result = json_encode(array('sucess'=>false, 'result'=>$mysqli->error));
        }
    
        echo $result;

    }

?>
