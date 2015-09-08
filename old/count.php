<?php

$path = './';
$ignore = array('.','..');
$size_ = 0;

$files = scandir($path);
echo 'Counting files:<ul>';

foreach($files as $t) {
    if(in_array($t, $ignore)) continue;
    if (is_dir(rtrim($path, '/') . '/' . $t)) {
        $size = getFileCount(rtrim($path, '/') . '/' . $t);
        echo '<li>'.rtrim($path, '/') . '/' . $t.' : '.$size.'</li>';
    } else {
        $size_++;
    }
}

echo '<li>'.$path.' : '.$size_.'</li></ul>';

function getFileCount($path) {
    global $ignore;
    $size = 0;
    
    $files = scandir($path);
    foreach($files as $t) {
        if(in_array($t, $ignore)) continue;
        if (is_dir(rtrim($path, '/') . '/' . $t)) {
            $size += getFileCount(rtrim($path, '/') . '/' . $t);
            $size++;
        } else {
            $size++;
        }
    }
    return $size;
}