<?php

/**
 * Slider plugin for Pico
 *
 * @author James Doyle
 * @link http://ohdoylerules.com
 * 
 * 2014-12-08 modified by Mihkel Oviir (configurable path and file type)
 * @link https://github.com/sookoll
 *
 * @license http://opensource.org/licenses/MIT
 */
class Pico_Slider {

	private $plugin_path;
    /**
     * Default settings, overwritable from configuration in pico config.php file
     * $config['slider_path'] => $image_path
     * $config['slider_ext'] => $image_ext
     */
	private $image_path = 'content/images';
	private $image_ext = '.jpg';

	public function __construct()
	{
		$this->plugin_path = dirname(__FILE__);
	}
    
    public function config_loaded(&$settings)
    {
        if(isset($settings['slider_path']))
            $this->image_path = $settings['slider_path'];
        if(isset($settings['slider_ext']))
            $this->image_ext = $settings['slider_ext'];
	}

	// get_files function stolen from the pico.php lib
	private function get_files($directory, $ext = '')
	{
		$array_items = array();
		if($handle = scandir($directory)){
			natsort($handle);
            foreach ($handle as $file) {
				if($file != "." && $file != ".."){
					if(is_dir($directory. "/" . $file)){
						$array_items = array_merge($array_items, $this->get_files($directory. "/" . $file, $ext));
					} else {
						$file = $directory . "/" . $file;
						if(!$ext || strstr($file, $ext)) $array_items[] = preg_replace("/\/\//si", "/", $file);
					}
				}
			}
		}
		return $array_items;
	}

	public function before_render(&$twig_vars, &$twig)
	{
		// assign the images to the twig_vars
		$twig_vars['images'] = $this->get_files($this->image_path, $this->image_ext);
		foreach ($twig_vars['images'] as &$image) {
			$temp_array = array();
			// lazy link to the image
			$temp_array['url'] = $twig_vars['base_url'].'/'.$image;
			// read the image info and assign the width and height
			$image_info = getimagesize($image);
			$temp_array['width'] = $image_info[0];
			$temp_array['height'] = $image_info[1];
			// strip the folder names and just leave the end piece without the extension
			$temp_array['name'] = preg_replace('/\.(jpg|jpeg|png|gif|webp)/', '', str_replace($this->image_path.'/', '', $image));
			$image = $temp_array;
		}
		return;
	}

}

?>