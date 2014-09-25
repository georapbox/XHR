<?php
	if ($_POST) {
		var_dump($_POST);
		
		/*$data = json_decode(stripslashes($_POST['person']));
		$fName = $data->fName;
		$lName = $data->lName;
		echo $_POST['fName'] . ' ' . $_POST['lName'] . ': ' . $_POST['job'];*/
	}

	if ($_GET) {
		var_dump($_GET);
	}
?>