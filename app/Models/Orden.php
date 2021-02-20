<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Orden extends Model
{
    protected $table = "tbl_orden";

    public static function obtenerOrden($id_mesa){
        return DB::table('tbl_orden as orden')->join('tbl_mesa as mesa', 'orden.mesa', '=', 'mesa.mes_id')->where('mesa.mes_id', $id_mesa)->get(); 
    }

    public static function getProducto2($codigobarras, $emp){
        return DB::table('tbl_producto as producto')->join('tbl_proveedor as proveedor', 'producto.pro_pro', '=', 'proveedor.pro_proId')->where('producto.pro_emp', $emp)->where('pro_codigo', $codigobarras)->get();
    }

    public static function guardarOrden($idUsu,$idEmp,$fecha,$idMesa,$productos){
		
        $fecha_convertida = strtotime($fecha);//Convierte el string en formato fecha en php

        $fecha_convertida = date('Y-m-d',$fecha_convertida);//Lo convierte a formato fecha en mysql
        if($idMesa > 0){
            $idOrden = DB::table('tbl_orden')->insertGetId(['ord_usu'=>$idUsu,'ord_hora'=>$fecha_convertida,'ord_emp'=>$idEmp,'ord_mesa'=>$idMesa,'ord_estado'=>'N','ord_pagado'=>'N']);
        }else{
            $idOrden = DB::table('tbl_orden')->insertGetId(['ord_usu'=>$idUsu,'ord_hora'=>$fecha_convertida,'ord_emp'=>$idEmp,'ord_estado'=>'N','ord_pagado'=>'N']);
        }
        
        if (is_numeric($idOrden)) {   
		    for($i=0; $i<sizeof($productos); $i++){
                //tbl_productoxorden: pxo_id, , , , 
                DB::table('tbl_productoxorden')->insert(['pxo_producto'=>$productos[$i][0],'pxo_orden'=>$idOrden,'pxo_cantidad'=>$productos[$i][1],'pxo_detalles'=>$productos[$i][2]]);
            }
			return 'exito';
        }
		
		DB::table('tbl_orden')->where('ord_id', $idOrden)->delete();
        return 'error';
    }

    public static function actualizarOrden($ord_id,$idUsu,$idEmp,$fecha,$productos,$idsElim){
        if($idsElim!=0){
            for($i=0; $i<sizeof($idsElim); $i++){
                DB::table('tbl_productoxorden')->where('pxo_id',$idsElim[$i])->delete();
            }
        }

        for($j=0; $j<sizeof($productos); $j++){
            if($productos[$j][3]==0){        
                DB::table('tbl_productoxorden')->insert(['pxo_producto'=>$productos[$j][0],'pxo_orden'=>$ord_id,'pxo_cantidad'=>$productos[$j][1],'pxo_detalles'=>$productos[$j][2]]);
            }
        }
        
        return 'exito';
    }
  
    public static function cargarOrdenes($idEmp){
                 
        return DB::table('tbl_empresa as empresa')->join('tbl_orden as orden', 'empresa.emp_id', '=', 'orden.ord_emp')
                                                  ->leftJoin('tbl_mesa as mesa','orden.ord_mesa','=','mesa.mes_id')
                                                  ->join('tbl_usuario as usuario','orden.ord_usu','=','usuario.usu_id')
                                                  ->where('empresa.emp_id', $idEmp)->get(); 

    }

    public static function cargarProductosOrden($idEmp){
        
        return DB::table('tbl_empresa as empresa')->join('tbl_orden as orden', 'empresa.emp_id', '=', 'orden.ord_emp')
                                                  ->join('tbl_productoxorden as pxo', 'orden.ord_id', '=', 'pxo.pxo_orden')
                                                  ->join('tbl_producto as producto', 'pxo.pxo_producto', '=', 'producto.pro_id')
                                                  ->where('empresa.emp_id', $idEmp)->get();
    }

    public static function eliminarOrden($idOrden){
        $exito = DB::table('tbl_productoxorden')->where('pxo_orden',$idOrden)->delete();

        if($exito){
           $exito = DB::table('tbl_orden')->where('ord_id',$idOrden)->delete(); 
        }
        
        // DB::table('tbl_orden')->where('ord_id', $idOrden)->get();
        if($exito){
            return 'exito';   
        }
    }    
}
