var btn = document.getElementById("boton");

btn.addEventListener('click',(event) => {
    btn.classList.add('clicked');
    this.addEventListener('animationend',(event) =>{
        setTimeout(function(){
            btn.classList.remove('clicked')
        },500);
    })
})