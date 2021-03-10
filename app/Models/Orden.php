<?php

namespace App\Models;

use DateTime;
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

    public static function guardarOrden($idUsu,$idEmp,$fecha,$idMesa,$productos,$total){
        $fecha_convertida = new DateTime($fecha);
        if($idMesa > 0){
            $idOrden = DB::table('tbl_orden')->insertGetId(['ord_usu'=>$idUsu,'ord_hora'=>$fecha_convertida,'ord_emp'=>$idEmp,'ord_mesa'=>$idMesa,'ord_estado'=>'N','ord_pagado'=>'N','ord_total'=>$total]);
        }else{
            $idOrden = DB::table('tbl_orden')->insertGetId(['ord_usu'=>$idUsu,'ord_hora'=>$fecha_convertida,'ord_emp'=>$idEmp,'ord_estado'=>'N','ord_pagado'=>'N','ord_total'=>$total]);
        }
        if (is_numeric($idOrden)) {   
		    for($i=0; $i<sizeof($productos); $i++){
                $prod = DB::table('tbl_producto')->where('pro_id',$productos[$i][0])->get();
                if($prod){ 
                    if($productos[$i][1] <= $prod[0]->pro_cantidad){
                        $nueva_cantidad =  $prod[0]->pro_cantidad - $productos[$i][1];
                        //insertar el precio actual del producto en la relacion productoxorden
                        DB::table('tbl_productoxorden')->insert(['pxo_producto'=>$productos[$i][0],'pxo_orden'=>$idOrden,'pxo_cantidad'=>$productos[$i][1],'pxo_detalles'=>$productos[$i][2],'pxo_precioProducto'=>$prod[0]->pro_precio]);
                        DB::table('tbl_producto as producto')->where('pro_id',$prod[0]->pro_id)->update(['pro_cantidad'=>$nueva_cantidad]);
                    }else{
                        DB::table('tbl_productoxorden')->where('pxo_orden',$idOrden)->delete();
                        DB::table('tbl_orden')->where('ord_id',$idOrden)->delete(); 
                        return 'PI';
                    }
                }
                
            }
			return 'exito';
        }
		
		DB::table('tbl_orden')->where('ord_id', $idOrden)->delete();
        return 'error';
    }

    public static function actualizarOrden($ord_id,$mesa_id,$entregada,$pagada,$productos,$idsElim,$total){
        if($mesa_id>0){//agregar o cambiar la mesa de una orden
            //consultamos si el id de la mesa que recibimos está relacionado a una orden
            if(DB::table('tbl_orden as orden')->join('tbl_mesa as mesa','orden.ord_mesa','=','mesa.mes_id')
                        ->where('orden.ord_mesa',$mesa_id)->where('orden.ord_id','!=',$ord_id)->exists()){//es una mesa con una orden   
            //Filtramos que la orden asociada a la mesa sea diferente a la orden actual de la mesa
                return 'mesa_con_ordenes';
            }else{//Si la mesa no tiene orden asociada, la asocia con la orden
                DB::table('tbl_orden')->where('ord_id',$ord_id)->update(['ord_mesa'=>$mesa_id,'ord_estado' => $entregada, 'ord_pagado' => $pagada,'ord_total'=>$total]);//DB::table('tbl_orden')->where('ord_id',$ord_id)->update(['ord_mesa'=>$mesa_id,'ord_estado' => $entregada, 'ord_pagado' => $pagada]);
            }
            //return 'mesa_con_ordenes'
        }else{
            DB::table('tbl_orden')->where('ord_id',$ord_id)->update(['ord_mesa'=>null,'ord_estado' => $entregada, 'ord_pagado' => $pagada,'ord_total'=>$total]);
        }    
        $exito = DB::table('tbl_orden')->where('ord_id',$ord_id)->get();
        if($exito){
            if($idsElim!=0){
                for($i=0; $i<sizeof($idsElim); $i++){
                    $pxo = DB::table('tbl_productoxorden')->where('pxo_id',$idsElim[$i])->get();
                    if($pxo){
                        $prod1 = DB::table('tbl_producto')->where('pro_id',$pxo[0]->pxo_producto)->get();
                        if($prod1){            
                            $nueva_cantidad1 = $prod1[0]->pro_cantidad + $pxo[0]->pxo_cantidad;
                            DB::table('tbl_producto')->where('pro_id',$prod1[0]->pro_id)->update(['pro_cantidad'=>$nueva_cantidad1]);
                        }
                    }
                    DB::table('tbl_productoxorden')->where('pxo_id',$idsElim[$i])->delete();
                }
            }
    
            for($j=0; $j<sizeof($productos); $j++){
                $prod = DB::table('tbl_producto')->where('pro_id',$productos[$j][0])->get();
                if($prod){ 
                    if($productos[$j][1] <= $prod[0]->pro_cantidad){
                        if($productos[$j][3]==0){////id del proxorden , si es cero es nuevo, se inserta un nuevo producto a la orden
                            $nueva_cantidad =  $prod[0]->pro_cantidad - $productos[$j][1];
                            //inserté el precio actual del producto porque se insertaría un producto nuevo en la orden 
                            DB::table('tbl_productoxorden')->insert(['pxo_producto'=>$productos[$j][0],'pxo_orden'=>$ord_id,'pxo_cantidad'=>$productos[$j][1],'pxo_detalles'=>$productos[$j][2],'pxo_precioProducto'=>$prod[0]->pro_precio]);
                        }else{
                            $pxo_actual = DB::table('tbl_productoxorden')->where('pxo_id',$productos[$j][3])->get();
                            if($pxo_actual){
                                $nueva_cantidad =  ($prod[0]->pro_cantidad + $pxo_actual[0]->pxo_cantidad) - $productos[$j][1];
                                DB::table('tbl_productoxorden')->where('pxo_id',$productos[$j][3])->update(['pxo_producto'=>$productos[$j][0],'pxo_orden'=>$ord_id,'pxo_cantidad'=>$productos[$j][1],'pxo_detalles'=>$productos[$j][2],'pxo_precioProducto'=>$prod[0]->pro_precio]);
                            }                            
                        }
                        DB::table('tbl_producto')->where('pro_id',$prod[0]->pro_id)->update(['pro_cantidad'=>$nueva_cantidad]);
                    }else{
                        return 'PI';
                    }
                }
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

    public static function cargarOrdenesNoEntregadas($idEmp){
        return DB::table('tbl_orden as orden')->leftJoin('tbl_mesa as mesa','orden.ord_mesa','=','mesa.mes_id')
                                              ->join('tbl_usuario as usuario','orden.ord_usu','=','usuario.usu_id')
                                              ->where('orden.ord_estado', 'N')
                                              ->where('orden.ord_emp', $idEmp)->get(); 

    }

    public static function cargarOrdenesNoPagadas($idEmp){
        return DB::table('tbl_orden as orden')->leftJoin('tbl_mesa as mesa','orden.ord_mesa','=','mesa.mes_id')
                                              ->join('tbl_usuario as usuario','orden.ord_usu','=','usuario.usu_id')
                                              ->where('orden.ord_estado', 'E')
                                              ->where('orden.ord_pagado', 'N')
                                              ->where('empresa.emp_id', $idEmp)->get(); 
    }

    public static function cargarProductosXOrden($idOrden){
        return DB::table('tbl_producto as producto')->join('tbl_productoxorden as pxo', 'producto.pro_id', '=', 'pxo.pxo_producto')
                                                    ->where('pxo.pxo_orden', $idOrden)->get();
    }

    public static function cargarProductosOrden($idEmp){
        return DB::table('tbl_empresa as empresa')->join('tbl_orden as orden', 'empresa.emp_id', '=', 'orden.ord_emp')
                                                  ->join('tbl_productoxorden as pxo', 'orden.ord_id', '=', 'pxo.pxo_orden')
                                                  ->join('tbl_producto as producto', 'pxo.pxo_producto', '=', 'producto.pro_id')
                                                  ->where('orden.ord_emp', $idEmp)->get();
    }

    public static function eliminarOrden($idOrden){
        $exito = DB::table('tbl_productoxorden')->where('pxo_orden',$idOrden)->delete();

        //if($exito){
           $exito = DB::table('tbl_orden')->where('ord_id',$idOrden)->delete(); 
       // }
        
        // DB::table('tbl_orden')->where('ord_id', $idOrden)->get();
        if($exito){
            return 'exito';   
        }
    }    

    public static function entregarOrden($idOrden){
        $exito = DB::table('tbl_orden')->where('ord_id',$idOrden)->update(['ord_estado' => 'E']);
        if($exito){
            return 'exito';   
        }
    }

    public static function cantidadOrdenes($idEmp,$fchIni,$fchFin){
        return DB::table('tbl_empresa as empresa')->join('tbl_orden as orden', 'empresa.emp_id', '=', 'orden.ord_emp')
                                                  ->where('empresa.emp_id', $idEmp)
                                                  ->where('orden.ord_hora','>=',$fchIni)
                                                  ->where('orden.ord_hora','<=',$fchFin)->count(); 

    }

    public static function mayorVenta($idEmp,$fchIni,$fchFin){
        
        return DB::table('tbl_empresa as empresa')->join('tbl_orden as orden', 'empresa.emp_id', '=', 'orden.ord_emp')
                                                   ->selectRaw("DATE_FORMAT(orden.ord_hora,'%d-%m-%Y') as fecha, SUM(orden.ord_total) as total")//meter un total en orden?
                                                  ->where('empresa.emp_id', $idEmp)
                                                  ->where('orden.ord_hora','>=',$fchIni)
                                                   ->where('orden.ord_hora','<=',$fchFin)
                                                   ->groupBy('fecha')
                                                  ->get();
    }
}
