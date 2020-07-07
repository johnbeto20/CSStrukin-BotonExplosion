## Boton explosion

Este boton fue diseñado por
[@andrew.eugene](https://www.instagram.com/p/CAu-3qggz49/), pero me llamó la atención ver si podía hacer algo similar con HTML y CSS.

1. Para la construcción de este elemento es necesario tener un boton en html,

````html
<button class="btn" id="boton">Explosion!</button>
````

2. Luego le aplico los estilos al gusto.

![imagen boton](https://raw.githubusercontent.com/johnbeto20/pildoritas-css-BotonExplosion/master/img_Readme/image-boton.jpg)

3. De ahí viene la parte de finura coquetería que es agregar las burbujas, para esto se puede hacer fácilmente con un gif o importar un svg por medio de un editor de video como after effects, pero ¿que pasaría si no tenemos el recurso? bueno... toca a mano:

````html
<div class="cont-particles">
  <div class="particle"></div>
</div>
````
el div con la clase <b>.particle</b> tenemos que crearlo <b>30 veces</b> (o las veces que quieran que tenga el detalle la explosión).

````css
.particle {
  width: 15px;
  height: 15px;
  background: var(--color-btn);
  border-radius: 50%;
  position: absolute;
  opacity: 0;
}
````
para algunos que son diferentes aplique una clase adicional.

````html
<div class="particle pL"></div>
````
````css
.particle.pL {
  border: var(--color-btn) solid 3px;
  background: transparent;
}
````

4. Luego los acomodamos con CSS, yo los acomodo con <b>:nth-child(n)</b>... uno por uno XD, y también creamos un <b>@keyframe</b> por cada elemento:

````css
.particle:nth-child(1) {
  top: 65px;
  left: 55px;
  width: 14px;
  height: 14px;
}

/* lo mismo hasta 30*/
.particle:nth-child(30) {
  ...
}

@keyframes bom1 {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    /*Dependerá de la dirección que le queramos dar*/
    transform: translate(-40px, -30px) scale(0);
    opacity: 1;
  }
}

````

5. para activarlos pido la ayuda de SASS, para crear una secuencia llamando cada elemento según una clase <b>.clicked</b> que le agrego al boton por Javascript, al agregar esta clase le activo el <b>Animate:</b>

````scss
@for $i from 1 through 30 {
    .btn.clicked .particle:nth-child(#{$i}) {
        animation: bom#{$i} .7s ease-in;
        $listDelay: 16,21,27,30;
        @each $list in $listDelay {
            @if $i == $list {
                animation-delay: .2s;
            }
        }
        @if $i == 19 {
            animation-delay:.5s;
        }
    }
}
````
donde <b>$listDelay</b> nos ayudara a que algunos elementos se demoren más en activarse, dando una animación más natural

````scss
$listDelay: 16,21,27,30;
  @each $list in $listDelay {
      @if $i == $list {
          animation-delay: .2s;
      }
  }
````

6. Ya por Javascript le enviemos un evento de click, y al hacer click le agregamos la clase <b>.clicked</b>, y cuando finaliz se la volvemos a remover.

````javascript
var btn = document.getElementById("boton");

btn.addEventListener('click',(event) => {
    btn.classList.add('clicked');
    this.addEventListener('animationend',(event) =>{
        setTimeout(function(){
            btn.classList.remove('clicked')
        },500);
    })
})
````

Este sería nuestro resultado
[ver demo](https://johnbeto20.github.io/pildoritas-css-BotonExplosion/)

Muestro en esta parte las cosas que se usaron para generar el botón, pero no es un tutorial, solo mostrar los recursos que fueron utilizados para realizar esta pildorita, de igual forma quedará el recurso para que puedan curiosearlo y explorar.