<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class RecuperarContra extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * user contiene toda la informaacion del usuario, correo, nombre etc
     * contra es la contraseña nueva en texto plano
     * @return void
     */
    public function __construct($user, $contra)
    {
        $this->nombre = $user->usu_nombre;
        $this->contra = $contra;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('correos/cambioContra')->from('sistemasfabok@gmail.com')->subject('Recuperar Contraseña| POS Multiple')->with([
            'nombre' => $this->nombre,
            'contra' => $this->contra
        ]);
    }
}
