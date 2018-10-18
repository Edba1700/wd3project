<?php
//
// Written by Edmond Baer in October 2018
//
// POST            Creates a new resource.
// GET             Retrieves a resource.
// PUT             Updates an existing resource.
// DELETE          Deletes a resource.
//
// Database name: ebaer_se_dt173g, Username:ebaer_se_dt173g , Password: fcCtA_fx/`6#'VZ6, Table: Lorem_Ipsum 
// ------------------------------------------------------------------------------------
// | ID (int, AI, PRIMARY KEY) | liname (varchar(50, unique)) | text (text) |
// ------------------------------------------------------------------------------------

//
// Get HTTP method, path and input of the request
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$input = json_decode(file_get_contents('php://input'),true);

if($request[0] != "lorem_ipsum"){ 
	http_response_code(404);
	exit();
}

//
// Send return header information
header("Content-Type: application/json; charset=UTF-8");

$conn = mysqli_connect("ebaer.se.mysql","ebaer_se_dt173g","fcCtA_fx/`6#'VZ6","ebaer_se_dt173g") or die("Error connecting to database.");;
$db_connected = mysqli_select_db($conn, "ebaer_se_dt173g"); // Work with the database named 'ebaer_se_dt173g' 

//
// HTTP method implementations of GET, POST, PUT and DELETE
switch ($method){
	case "GET":
		$sql = "SELECT ID, liname, litext, FROM Lorem_Ipsum";
		if(isset($request[1])) $sql = $sql . " WHERE ID = " . $request[1] . ";";
		break;
	case "PUT":
		$sql = "UPDATE Lorem_Ipsum SET liname = '" . $input['liname'] . "', litext = '" . $input['litext'] . "' WHERE ID = " . $request[1] . ";";
    	break;
	case "POST":
		$sql = "INSERT INTO Lorem_Ipsum (liname, litext) VALUES ('" . $input['liname'] . "', '" . $input['litext'] . "');";
		break;

	case "DELETE":
   		$sql = "DELETE FROM Lorem_Ipsum WHERE ID = " . $request[1] . ";";
   		break;
}

//
// Always response with json array of Lorem_Ipsum except for GET /Lorem_Ipsum/id
	$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

	$liarr = [];
	if($method != "GET") $sql = "SELECT ID, liname, litext FROM Lorem_Ipsum";
	$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));
    while($row = mysqli_fetch_assoc($result)){
			$row_arr['ID'] = $row['ID'];
			$row_arr['liname'] = $row['liname'];
			$row_arr['litext'] = $row['litext'];
			array_push($liarr,$row_arr);
	}
	mysqli_close($conn);
	
    echo json_encode($liarr);