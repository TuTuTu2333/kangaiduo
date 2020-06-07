<?php
  $username=$_REQUEST["username"];
  $password=$_REQUEST["password"];

  $database=mysqli_connect("127.0.0.1","root","","kangaiduo");
//   if($database){
//       echo "连接成功";
//   }else{
//       echo "连接失败";
//   }

  $sql="SELECT * FROM userdata WHERE username='$username'";
  $result=mysqli_query($database,$sql);
  if(mysqli_num_rows($result)==0){
      echo '{"status":"error1","msg":"该用户名不存在!"}';
  }else{
    $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
    $_password = $data[0]["password"];
      if($_password != $password){
          echo '{"status":"error2","msg":"密码不正确！"}';
      }else{
          echo '{"status":"success","msg":"登录成功！"}';
      }
  }
?>