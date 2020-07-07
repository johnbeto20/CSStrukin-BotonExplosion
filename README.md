### Boton explosion

Este boton fue diseñado por
[@andrew.eugene](https://www.instagram.com/p/CAu-3qggz49/), pero me llamó la atención ver si podía hacer algo similar con HTML y CSS.

Para la construcción de este elemento es necesario tener un boton en html,

````html
<button class="btn" id="boton">Explosion!</button>
````

Luego le aplico los estilos al gusto de uno.

![imagen boton](https://raw.githubusercontent.com/johnbeto20/pildoritas-css-BotonOnda/master/img_Readme/image-boton.jpg)

Ya lo que haremos sería construir el elemento SVG que simulará nuestro efecto onda (puede ser hasta un div, yo por que lo quería con SVG XD), y esto lo agregaremos dentro del boton.

````html
<button id="btn" class="btn" data-text="Comenzar!">
    <svg width="280" height="280" viewbox="-40 -40 280 280" class="svg-circle">
        <circle class="circle-svg" cx="100" cy="100" r="60"></circle>
    </svg>
</button>
````
tendríamos algo así

![imagen circulo](https://raw.githubusercontent.com/johnbeto20/pildoritas-css-BotonOnda/master/img_Readme/imagen-circle.jpg)

pero le aplicaremos estilos para que se vea más acorde a lo que necesitamos.

````css
  .circle-svg {
      stroke:var(--color-btn);
      stroke-width: 60;
      fill: transparent;
  }
````

![imagen circulo ahora](https://raw.githubusercontent.com/johnbeto20/pildoritas-css-BotonOnda/master/img_Readme/imagen-circle-now.jpg)

para generar los detalles de sombra y duplicado del mismo elemento utilizamos <b>Filtros de SVG</b>

````html
<svg xmlns="https://www.w3.org/2000/svg" version="1.1">
  <defs>
      <filter id="svg-effect" x="-40" y="-40" width="280" height="280">
          <feGaussianBlur result="shadowed" stdDeviation="20"/>
          <feColorMatrix result="MatrixShadowed" in="shadowed" type="matrix"
              values="1 1 1 1 0
                      1 1 1 1 0
                      1 1 1 1 0
                      0 0 0 0.2 0"/>
          <feOffset in="MatrixShadowed" result="moveShadowed" dx="-25" dy="-25"/>
          <feBlend in="SourceGraphic" result="secondCreate" mode="normal"/>
          <feGaussianBlur result="secondBlur" in="secondCreate" stdDeviation="20"/>
          <feColorMatrix result="secondMatrix" in="secondBlur" type="saturate" values="1.6"/>
      </filter>
  </defs>
</svg>
````

para que este filtro impacte en nuestro circulo le agregamos la siguiente propiedad:

````css
  .circle-svg {
      ...
      filter: url(#svg-effect);
  }
````

Donde <b>url(#svg-effect)</b> es el id del <b>filter</b>

Para la animación cree un @keyframe apuntandole al elemento .svg-circle

````CSS
.btn.active .svg-circle {
    animation: scaleOnda 2s ease-out forwards;
}

@keyframes scaleOnda {
    0% { opacity: 0;}
    2% { transform: scale(0); opacity: 1;}
    100% { transform: scale(2.3); opacity: 0;}
}
````

La clave es que por JAvascript le enviemos un evento de click, y al hacer click le agregamos la clase <b>.active</b>, y cuando finaliz se la volvemos a remover.

````javascript
var boton = document.getElementById("btn");

boton.addEventListener('click', (event) => {
    boton.classList.add('active');
    this.addEventListener('animationend', (event)=>{
        boton.classList.remove("active")
    })
})
````

Este sería nuestro resultado
[ver demo](https://johnbeto20.github.io/pildoritas-css-BotonOnda/)

Muestro en esta parte las cosas que se usaron para generar el botón, pero no es un tutorial, solo mostrar los recursos que fueron utilizados para realizar esta pildorita, de igual forma quedará el recurso para que puedan curiosearlo y explorar.