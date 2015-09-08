<?php
/**
 * Pico Configuration
 *
 *  This is the configuration file for Pico. It comes loaded with the
 *  default values, which can be found in the get_config() method of
 *  the Pico class (lib/pico.php).
 *
 * @author Gilbert Pellegrom
 * @link http://picocms.org
 * @license http://opensource.org/licenses/MIT
 * @version 0.9
 *
 * To override any of the default settings below, copy this file to
 * `config.php`, uncomment the line and make and save your changes.
 */

/*
 * BASIC
 */
$config['site_title'] = 'Sookolli Kaardid';              // Site title
// $config['base_url'] = '';                    // Override base URL (e.g. http://example.com)

/*
 * THEME
 */
$config['theme'] = 'sookoll';                // Set the theme (defaults to "default")
// $config['twig_config'] = array(              // Twig settings
//	'cache' => false,	                        // To enable Twig caching change this to CACHE_DIR
//	'autoescape' => false,                      // Autoescape Twig vars
//	'debug' => false                            // Enable Twig debug
// );

/*
 * CONTENT
 */
$config['date_format'] = '%F';             // Set the PHP date format as described here: http://php.net/manual/en/function.strftime.php
$config['pages_order_by'] = 'date';           // Order pages by "alpha" or "date"
$config['pages_order'] = 'desc';                // Order pages "asc" or "desc"
// $config['excerpt_length'] = 50;                // The pages excerpt length (in words)
$config['content_dir'] = 'content/';    // Content directory

/*
 * TIMEZONE
 */
date_default_timezone_set('Europe/Tallinn');              // Timezone may be reqired by your php install

/*
 * CUSTOM
 */
// $config['custom_setting'] = 'Hello';           // Can be accessed by {{ config.custom_setting }} in a theme

$config['custom_meta_values'] = array(
    'index' => 'Index',
    'category' => 'Category',
    'front' => 'Front',
    'image' => 'Image',
    'published' => 'Published'
);

$config['slider_path'] = 'content/images/skills';
$config['slider_ext'] = '.png';
$config['year'] = date("Y");

$config['contact'] = array(
    'post' => $_POST,
    'send_to' => 'mihkel@sookoll.ee',
    'alert_messages' => array(
        'error' => '<div class="alert alert-danger"><h3>Doh!</h3><p>I\'m sorry: </p><p>%1$s</p></div>', //%1$s = PHPMailer error
        'validation_error' => '<div class="alert alert-danger"><h3>Doh!</h3><p>Any mistake!?: </p><p>%1$s</p></div>', //%1$s = Validation errors
        'success' => '<div class="alert alert-success"><h3>Thanks!</h3><p>I will answer as soon as possible!</p></div>',
    ),
);

$config['cpp_read_more_tag'] = '<!--excerpt-->';
$config['cpp_read_more_text'] = '';

// Keep this line
return $config;
