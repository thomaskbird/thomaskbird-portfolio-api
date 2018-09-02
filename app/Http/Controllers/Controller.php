<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function cleanFilename($filename) {
        return preg_replace("([^\w\s\d\.\-_~,;:\[\]\(\)]|[\.]{2,})", '', $filename);
    }

    public function columnize($arr, $num) {
        $total = count($arr);
        $per_column = floor($total / $num);
        $rearranged = array_chunk($arr, $per_column);

        if($total % $num !== 0) {
            $remainder = ($total - ($per_column * $num));

            if(isset($rearranged[$num])) {
                $i = 0;
                foreach($rearranged[$num] as $remains) {
                    array_push($rearranged[$i], $remains);
                    $i++;
                }

                unset($rearranged[$num]);
            }
        }

        return $rearranged;
    }
}
