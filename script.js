
function init(){
    Lienzo = document.getElementById('lienzo');
    ctx = Lienzo.getContext('2d');
    cargar();
    ctx.font="2em Verdana";
    ctx.textAlign= "left";
	ctx.fillStyle = "white";

    Lienzo.addEventListener("click", e => Mouseclick(e) );
    
}

//**************************************************************************************************

let GAME = false;
let menu = !false;
let X = 640;
let Y = 384;
let VX = 200;
let points = 0;
let temptxt = "";
let Lienzo, ctx;
let a1 = 0;
let a2 = 0;
let time = 8;

PJ = 0;

let FPS = 60;

let B = { texture:new Array(), Nave:new Image(), X:100, Y:(Y/2)-16, Vx:400, Vy:0, G:50, FS:250, W:false, S:false, A:false, D:false, 
    Salto:false, caer:true, width:32, height:32, pX:16, pY:16, colide:0, life:100};

function C  () { 
    this.texture = textureOfC;
    this.X=X + 100;
    this.Y= (Math.random() * (Y - 128)) + 128; 
    this.width=64;
    this.height=64;
    this.pX=32;
    this.pY=32;
}
var textureOfC = NaN;
let Tubos = new Array();

function Nube  () { 
    this.texture = textureOfNubes;
    this.X = X;
    this.Y= (Math.random() * (Y - 128)); 
    this.width=96;
    this.height=64;
    this.type = Math.floor(Math.random() * 3);
}
var textureOfNubes = NaN;
let Nubes = new Array();

function suelo  () { 
    this.texture = textureOfSuelos;
    this.X = X -5; 
    this.width=256;
    this.height=32;
}
var textureOfSuelos = NaN;
let Suelos = new Array();

let textureOfMenu = NaN;


//**************************************************************************************************


function Borrar(){
    Lienzo.width = X;
    Lienzo.height = Y;
}

function cargar(){
    B.texture = new Array();
    B.texture.push(new Image());
    B.texture.push(new Image());
    B.texture.push(new Image());
    B.texture.push(new Image());
    B.texture.push(new Image());
    B.texture.push(new Image());
    B.texture.push(new Image());

    B.texture[0].src = "new.png";
    B.texture[1].src = "PJs/1.png";
    B.texture[2].src = "PJs/2.png";
    B.texture[3].src = "PJs/3.png";
    B.texture[4].src = "PJs/4.png";
    B.texture[5].src = "PJs/5.png";
    B.texture[6].src = "PJs/6.png";

    B.Nave =new Image();
    B.Nave.src = "Nave.png";

    textureOfC = new Image();
    textureOfC.src = "Colisions.png";
    textureOfNubes = new Image();
    textureOfNubes.src = "Nubes.png";
    textureOfSuelos = new Image();
    textureOfSuelos.src = "suelo.png";
    textureOfMenu = new Image();
    textureOfMenu.src = "Menu.png";

    Tubos = new Array();
    Nubes = new Array();
    Suelos = new Array();

    Tubos.push(new C());
    Nubes.push(new Nube());
    Suelos.push(new suelo());
    Suelos.push(new suelo());
    Suelos.push(new suelo());
    Suelos.push(new suelo());

    Suelos[0].X = 0;
    Suelos[1].X = 256;
    Suelos[2].X = 512;
    Suelos[3].X = 768;
}

function ColisionesGlobales(OBJ){
    if(OBJ.Y > Y - B.height){
        OBJ.Y = Y - B.height;
    }
    else if(OBJ.Y < 0){
        OBJ.Y = 0;
    }

    if(OBJ.X > X - B.with + 10){
        OBJ.X = X - B.with + 10;
    }
    else if(OBJ.X < -10){
        OBJ.X = -10;
    }
}

function colisionDePerdida(O1, O2){
    var tmp = Math.abs(  (O1.X + O1.pX) - ( O2.X + (O2.pX) ) );
    
    if ( tmp < ((O1.pX + O2.pX) - 5)){
        
        if((O1.Y + O1.height) < O2.Y && O1.Y > ( O2.Y - O2.height*2 )){
            
        }else{
            menu = true;
        }
    }
}

function MapMov(OBJ, Vx){
    OBJ.X -= Vx/FPS;
}

function DrawB(){

    Borrar();
    //*********************************** DRAW ******************************************
   
Nubes.forEach(e => {
    switch (e.type) {
        case 0:
            ctx.drawImage(e.texture, 0, 0, 384, 256, e.X, e.Y, e.width, e.height);
            break;
        case 1:
            ctx.drawImage(e.texture, 0, 256, 384, 256, e.X, e.Y, e.width*1.25, e.height*1.25);
            break;
        case 2:
            ctx.drawImage(e.texture, 0, 512, 384, 256, e.X, e.Y, e.width*1.5, e.height*1.5);
            break;

        default:
            break;
    }
});

 
Suelos.forEach(e => {
    ctx.drawImage(e.texture, 0, 0, 256, 32, e.X, Y-e.height, e.width, e.height);
});



    Tubos.forEach(e => {
        ctx.drawImage(e.texture, 0, 0, 256, 256, e.X, e.Y, e.height, e.width);
            let temp = 1;
            while ((e.Y + (e.height * temp))  < Y){
                ctx.drawImage(e.texture, 256, 0, 256, 256, e.X, e.Y + (e.height * temp), e.height, e.width);
                temp++;
            }
            temp = 3;
            while ((e.Y - ((e.height) * temp))  > -e.height){
                if (temp == 3) {
                    ctx.drawImage(e.texture, 512, 0, 256, 256, e.X, e.Y - (e.height * temp), e.height, e.width);
                }
                else
                {
                    ctx.drawImage(e.texture, 256, 0, 256, 256, e.X, e.Y - (e.height * temp), e.height, e.width);
                }
                temp++;
            }
    });

    if(GAME){

    }

    if(!B.caer || !GAME){

        a2 = 0;

        if(a1 < 2){
            a1+= time/FPS;
        }else{
            a1 = 0;
        }
    }else if(B.caer){
        
        if (a2 == 0){
            a2 = 1;
        }

        if(a1 < 2 && a2 == 1){
            a1+= time/FPS;
        }
        else if (a1 < 2.5){
            if(a2 == 1){ a2 = 2; a1 = 0;}
            
            if(a1<1){
                a1+=time/FPS;
            }
        }
    }

    

    ctx.drawImage(B.Nave, 32 * Math.floor(a1) , 45* Math.floor(a2), 32, 45, B.X -4, B.Y -4, B.width, 45);

    ctx.drawImage(B.texture[PJ], 128 * B.colide, 0, 128, 128, B.X, B.Y, B.height, B.width);

    Suelos.forEach(e => {
        ctx.drawImage(e.texture, 0, 32, 256, 32, e.X + 128, Y-e.height, e.width, e.height);
    });

    ctx.textAlign= "left";
    ctx.font="30px Arial";
	ctx.fillStyle = "white";
    ctx.strokeStyle="black";
    ctx.lineWidth = 10;
    ctx.strokeText(points,0 +20,40);
	ctx.fillText(points,0 +20,40);
}

function Juego(){

  // ************ INICIO del GAME
    if (GAME) {
        
        if(Math.abs(B.Vy) > B.FS/FPS){
            if (B.Vy < 0) {
                B.Vy = -(B.FS/FPS);
            }else{
                B.Vy = B.FS/FPS;
            }
        }
    
    
        if(B.caer && Math.abs(B.Vy) <= B.FS/FPS){
            
            B.Vy += B.G/FPS;
            B.Y += B.Vy;
    
        }else if( Math.abs(B.Vy) <= B.FS/FPS){
    
            B.Vy -= B.G/FPS;
            B.Y += B.Vy;
    
        }
// *************************************************** MAPA ********************************

Tubos.forEach(element => {
    MapMov(element, VX);    
    if(element.X < 0 - element.width){
        Tubos.shift();
        points++;
    }
});

if(Tubos[Tubos.length - 1].X < (X * .80 )){
    Tubos.push(new C());
}
  
    //*********************************** COLISIONES ****************************************** 
    ColisionesGlobales(B);


    Tubos.forEach(element => {
        
        colisionDePerdida(B,element);
    
    });

} // ************ Final del GAME

Nubes.forEach(e => {
    MapMov(e, 1000/FPS);
    if(e.X < 0 - (e.width * 1.5)){
        Nubes.shift();
    }
});

Suelos.forEach(e => {
    MapMov(e, VX);
    if(e.X <= 0 - (e.width* 1.5)){
        Suelos.shift();
        Suelos.push(new suelo());
    }
});

    if((Math.random()*600) < 1){
        Nubes.push(new Nube());
    }

}

function Menu(){
    
    if(GAME){
        ctx.drawImage(textureOfMenu, 0, 0, 500, 256, (X/2)-256, (Y/2)-128, 500, 256);
        ctx.textAlign= "left";
        ctx.font="50px Arial";
        ctx.fillStyle = "white";
        ctx.strokeStyle="black";
        ctx.lineWidth = 16;
        ctx.strokeText(points,X/2 -30,Y/2 - 58);
        ctx.fillText(points,X/2 -30,Y/2 - 58);
    }
    else
    {
        temptxt = "Selecionar personaje!"

        ctx.textAlign= "left";
        ctx.font="25px Arial";
        ctx.fillStyle = "rgba(12,12,65,.7)";
        ctx.fillRect(0,0,X,Y);
        ctx.fillStyle = "white";
        ctx.strokeStyle="black";
        ctx.lineWidth = 6;
        
        txtY = 40;
        txtX = 20;
        ctx.strokeText(temptxt,txtX,txtY);
        ctx.fillText(temptxt,txtX,txtY);

        temptxt = "Tecla \"Espacio\" para subir"


        txtY = Y-20;
        txtX = X -300;
        ctx.strokeText(temptxt,txtX,txtY);
        ctx.fillText(temptxt,txtX,txtY);

        for (let index = 1; index < 7; index++) {
            ctx.drawImage(B.texture[index], 0, 0, 100, 100, 25, ((index)*50) , 50, 50);
        }
    }
    
}

// esta es la funcion MAIN
function Main(){

    DrawB();

    if (!menu) {
        Juego();
    }else{
        Menu();
    }
}

//************************************** EVENTOS DE TECLADO ****************************************

document.addEventListener('keydown', function(e){
    if(e.keyCode == 32){
       if (!menu) {
        if(B.caer){
            B.caer = false;
        }

        GAME = true;
       }
    }
    else
    {
        console.log(e.keyCode);
    }
});

document.addEventListener('keyup', function(e){
    
    if(e.keyCode == 32){
        if(!B.caer){
            B.caer = true;
        }
    }
});

function Mouseclick(e){
    if (menu) {
        if (GAME) {
            if (e.offsetX < X/2 + 256 && e.offsetX > X/2 - 256) {
                if (e.offsetY < Y/2 + 128 && e.offsetY > Y/2) {
                    
                    cargar();
                    points = 0;
                    GAME = false;
                    menu = false;
                }
            }
        }
        else
        {
            if (e.offsetX >= 25 && e.offsetX <= 75) {
                if (e.offsetY >= 50 && e.offsetY <= 50*6) {
                    if (e.offsetY < 100) {
                        PJ = 1;
                    }else if (e.offsetY < 150) {
                        PJ = 2;
                    }else if (e.offsetY < 200) {
                        PJ = 3;
                    }else if (e.offsetY < 250) {
                        PJ = 4;
                    }else if (e.offsetY < 300) {
                        PJ = 5;
                    }
                    GAME = false;
                    menu = false;
                }
            }
        }
    }
}

//******************************************* ETC *************************************************

setInterval(() => {
    
    Main();

}, 1000/FPS);