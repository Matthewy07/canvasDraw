
class Canvas{

    constructor(method){
        this.method = method;
    }

     async buildAll(method){

        function canvasBuild(method){

            let http = new XMLHttpRequest();
      
            http.onreadystatechange = function(){
      
              if(this.status == 200 && this.readyState == 4){
                  let styleSheet = new CSSStyleSheet();
                  styleSheet.replaceSync(this.responseText);
      
                  document.adoptedStyleSheets = [styleSheet];
                  console.log("Request OK");
              }
           
            };
          
      
            http.open("GET","index.css",true)
            http.send();
      
            let canvas,conta,btnFlex;
            conta = document.createElement("div");
            conta.id="conta";
            btnFlex = document.createElement("div");
            btnFlex.id = "btnFlex";
            canvas = document.createElement("canvas");
            canvas.className ="canvas";
            

          document.body.appendChild(conta);
          conta.appendChild(btnFlex);
          conta.appendChild(canvas);
              
      ////
      if(method =="draw"){
      
          
         let btn;
         let btnContentDraw=[
              {
                  btnName:"Size",
                  btnId:"sizeBtn"
              },
      
              {
                  btnName:"Rotation",
                  btnId:"rotationBtn"
              },
      
          
          ];
      
      btnContentDraw.forEach((val,index)=>{
      
          btn = document.createElement("button");
          btn.innerText = val["btnName"];
          btn.id=val["btnId"];
          btnFlex.appendChild(btn);
      
      
      });
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      acceptDecline();
    
      }
      
      ////
      else if(method == "image"){
        
        let btn;
        let  btnContentImage=[
              {
                  btnName:"Size",
                  btnId:"sizeBtn"
              },
      
              {
                  btnName:"Rotation",
                  btnId:"rotationBtn"
              },
      
              {
                  btnName:"ImageStyle",
                  btnId:"imageBtn"
              }
          
          ];
      
          btnContentImage.forEach((val,index)=>{
      
              btn = document.createElement("button");
              btn.innerText = val["btnName"];
              btn.id=val["btnId"];
              btnFlex.appendChild(btn);
          
          
          });
          canvas.width = canvas.clientWidth;
          canvas.height = canvas.clientHeight;
          acceptDecline();
        
      }
      ////
      else if(method == "texture"){
          
          btnFlex.parentElement.removeChild(btnFlex);
          canvas.className ="textureCanvas";
          canvas.width = conta.clientWidth;
          canvas.height = conta.clientHeight;
      
          acceptDecline();
      
        }
      ////
      
       function acceptDecline(){
      
          let dive=document.createElement("div");
          dive.id="acceptDecline";
          let box,cancelOK,cancelInputsContent,cancelOKInputs;
          
          if(method == "texture"){
          conta.appendChild(dive);
          cancelOkay(method);
      }
      ////
      else if(method == "draw" ){
      
          box=document.createElement("div");
          box.id="toolsConta";
          conta.appendChild(box);
          cancelOkay(method);
          methodFor(method);
      
      }
      else if(method == "image"){
          cancelOkay(method);
      }
      /////
      function methodFor(method){
      
      
          if(method == "draw"){
              let boxes,boxes2,boxes3;
      
              let boxContent=[{
                  boxContent:"Szín",
                  btnId:"szin"
              },{
                  boxContent:"Vastagság",
                  btnId:"vastagság"
              },{
                  boxContent:"Vonal",
                  btnId:"vonal"
              }];
      
              
      
              boxContent.forEach((val,index)=>{
      
                  boxes=document.createElement("div");
                  boxes.className="toolsBoxes";
                  box.appendChild(boxes);
      
                  boxes3=document.createElement("span");
                  boxes3.className="boxesSpan";
                  boxes3.innerText =val["boxContent"];
      
                  if(val.boxContent == "Vonal"){
                      boxes3.id="vonal";
                  }
                  boxes.appendChild(boxes3);
      
                  if(val.boxContent == "Szín"){
                      
                      boxes2=document.createElement("input");
                      boxes2.type="color";
                      boxes2.className="inputBoxes";
                      boxes.appendChild(boxes2);
                  }
      
      
                  else if(val.boxContent == "Vastagság"){
                      boxes2=document.createElement("input");
                      boxes2.type ="number";
                      boxes2.setAttribute("min",1);
                      boxes2.setAttribute("max",36);
                      boxes2.setAttribute("value",6);
                      boxes2.addEventListener("keydown",(e)=>{
                      e.preventDefault();
                      })
                      boxes2.className="inputBoxes";
                      boxes.appendChild(boxes2);
                      
                  }
      
      
              });
              
          }
      
      }
      function cancelOkay(method){
          let form;
          form=document.createElement("form");
          form.id ="form";
          form.setAttribute("method","post");
      
          cancelInputsContent = [
              {
                  inputContent:"Cancel",
                  inputClass :"cancelOKInputs",
                  Type:"submit",
                  name:"cancel",
                  action:"creator.php"
          },{
                  inputContent:"Apply",
                  inputClass :"cancelOKInputs",
                  Type:"submit",
                  name:"apply",
                  action:"creator.php"
          }
      ];
      
      cancelOK = document.createElement("div");
      
      cancelInputsContent.forEach((val,index)=>{
      
          cancelOKInputs = document.createElement("input");
          cancelOKInputs.value =val["inputContent"];
          cancelOKInputs.type =val["Type"];
          cancelOKInputs.name=val["name"];
          cancelOKInputs.className =val["inputClass"];
          form.setAttribute("action",val["action"]);
          form.appendChild(cancelOKInputs)
          
          cancelOK.appendChild(form);
      });
      
      if(method == "texture" ){
          cancelOK.id="cancelOK";
          dive.appendChild(cancelOK);
      }
      
      else if(method == "draw" || method == "image"){
          cancelOK.id="cancelOK2";
          conta.appendChild(cancelOK);  
      }
      
      }
      }
      
      
      ////*/
              return conta;
          }
          canvasBuild(method);

          let buildUp =await canvasBuild;

          if(buildUp){
              eventHandler();
              canvasHandler(method,"./1.png");
          }


          function eventHandler(){
              let vonal = document.getElementById("vonal");
              vonal.addEventListener("click",()=>{
                vonal.parentElement.classList.toggle("vonalActive");
              });


          }

          function canvasHandler(method,imageSrc){

            let canvas,ctx,X,Y,scaleX,scaleY,angle,image;
            let paint,paint2,paint3,paint4,paint5;
            let d,d2,d3,d4,d5;   
            let addP=10;
            let rotate = 0;

            canvas = document.querySelector(".canvas");
            ctx = canvas.getContext("2d");

            image = new Image();
            image.src = imageSrc;


            function firstInit(img,x,y,scalex,scaley){

                image.width = scaleX;
                image.height = scaleY;
            
                scaleX = scalex;
                scaleY = scaley;
            
                X=x;
                Y=y;
                ctx.drawImage(img,x,y,scaleX,scaleY);
            }

            image.onload = ()=>{
 
            firstInit(image,canvas.width/2,canvas.height/2,image.naturalWidth/addP,image.naturalHeight/addP);
        
            };          //Initialized image when ready
            

            function distanceMeasure(e){        //Calculating distance for 5 different points where the Image is draggable

                let a = e.offsetX -(X+scaleX/2);
                let b = e.offsetY -(Y+scaleY/2);
        
                let a2 = e.offsetX -(X+scaleX/5);
                let b2 = e.offsetY -(Y+scaleY/5);
        
                let a3 = e.offsetX -(X+scaleX);
                let b3 = e.offsetY -(Y+scaleY);
        
                let a4 = e.offsetX -(X+scaleX);
                let b4 = e.offsetY -(Y+scaleY/5);
        
                let a5 = e.offsetX -(X+scaleX/5);
                let b5 = e.offsetY -(Y+scaleY);
        
                let distance = Math.sqrt(Math.pow(a,2)+Math.pow(b,2));
                d=distance;
        
                let distance2 = Math.sqrt(Math.pow(a2,2)+Math.pow(b2,2));
                d2=distance2;
        
                let distance3 = Math.sqrt(Math.pow(a3,2)+Math.pow(b3,2));
                d3=distance3;
        
                let distance4 = Math.sqrt(Math.pow(a4,2)+Math.pow(b4,2));
                d4=distance4;
        
                let distance5 = Math.sqrt(Math.pow(a5,2)+Math.pow(b5,2));
                d5=distance5;
            }
            canvas.addEventListener("mousedown",(e)=>{      //If its within distance allow drag (paint true)
                
                distanceMeasure(e);
        
                if(d < (scaleX-scaleY)/2 ){
                    console.log("moveable");
                    paint =true;
                }
              
                else if(d2 < (scaleX-scaleY)/2){
                    console.log("moveable");
                    paint2 =true;
                }
        
                else if(d3 < (scaleX-scaleY)/2){
                    console.log("moveable");
                    paint3 =true;
                }
        
                else if(d4 < (scaleX-scaleY)/2){
                    console.log("moveable");
                    paint4 =true;
                }
        
                else if(d5 < (scaleX-scaleY)/2){
                    console.log("moveable");
                    paint5 =true;
                }
        
            });
        
            canvas.addEventListener("mousemove",(e)=>{      
            
                if(X+scaleX < canvas.width || Y+scaleY < canvas.height || X > 0 || Y > 0){      //If its within Canvas range and one of the paint is true then drawImage or rotated Image
        
                if(paint){
        
                    X = e.offsetX-scaleX/2;
                    Y = e.offsetY-scaleY/2;
        
                    if(angle != null){
                        angle(image,X,Y,image.naturalWidth/addP,image.naturalHeight/addP);
                    }
        
                    else{
         
                    ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
                    ctx.drawImage(image,X,Y,scaleX,scaleY);      
                }   
          }
        
        
                else if(paint2){
        
                    X = e.offsetX-scaleX/5;
                    Y = e.offsetY-scaleY/5;
        
                    if(angle != null){
                        angle(image,X,Y,image.naturalWidth/addP,image.naturalHeight/addP);
                    }
        
                    else{
         
                    ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
                    ctx.drawImage(image,X,Y,scaleX,scaleY);      
                }  
        }
        
        
                else if(paint3){
        
                    X = e.offsetX-scaleX/1.1;
                    Y = e.offsetY-scaleY/1.1;
        
                    if(angle != null){
                        angle(image,X,Y,image.naturalWidth/addP,image.naturalHeight/addP);
                    }
        
                    else{
         
                    ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
                    ctx.drawImage(image,X,Y,scaleX,scaleY);      
                }  
        }
        
        
                else if(paint4){
        
                    X = e.offsetX-scaleX/1.1;
                    Y = e.offsetY-scaleY/5;
        
                    if(angle != null){
                        angle(image,X,Y,image.naturalWidth/addP,image.naturalHeight/addP);
                    }
        
                    else{
         
                    ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
                    ctx.drawImage(image,X,Y,scaleX,scaleY);      
                }  
        }
        
        
                else if(paint5){
        
                    X = e.offsetX-scaleX/5;
                    Y = e.offsetY-scaleY/1.1;
        
                    if(angle != null){
        
                        angle(image,X,Y,image.naturalWidth/addP,image.naturalHeight/addP);
                    }
        
                    else{
         
                    ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
                    ctx.drawImage(image,X,Y,scaleX,scaleY);      
                }  
         }
        
        
         }
        
               if(X < 0){       // These prevents the Image to clip through at the edges of the Canvas
        
        
                if(angle != null){
        
                    angle(image,0,Y,image.naturalWidth/addP,image.naturalHeight/addP);
                }
        
                else{
                ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
                ctx.drawImage(image,0,Y,scaleX,scaleY); 
            }
                }
        
                else if(Y < 0 ){
                 
                    if(angle != null){
        
                        angle(image,X,0,image.naturalWidth/addP,image.naturalHeight/addP);
                    }
                    else{
        
                    
                    ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
                    ctx.drawImage(image,X,0,scaleX,scaleY); 
                }
                }
        
                if(X+scaleX > canvas.width){
                    ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
                    ctx.drawImage(image,canvas.width-scaleX,Y,scaleX,scaleY);
                }
        
                else if(Y+scaleY > canvas.height){
                    ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
                    ctx.drawImage(image,X,canvas.height-scaleY,scaleX,scaleY);
                }
        
                else if(X < 0 && Y< 0){
                    
                    ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
                    ctx.drawImage(image,0,0,scaleX,scaleY); 
                }
        
            if(X < 0 && Y+scaleY > canvas.height){
                ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
                ctx.drawImage(image,0,canvas.height-scaleY,scaleX,scaleY); 
            }
        
            else if(X+scaleX > canvas.width && Y < 0){
                ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
                ctx.drawImage(image,canvas.width-scaleX,0,scaleX,scaleY); 
            }
        
            else if(X+scaleX > canvas.width && Y+scaleY > canvas.height){
                ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
                ctx.drawImage(image,canvas.width-scaleX,canvas.height-scaleY,scaleX,scaleY); 
            }
        
           
             });
        
             canvas.addEventListener("mouseup",(e)=>{       //When let the mouse set paint to false
               
                paint=false;
                paint2=false;
                paint3=false;
                paint4=false;
                paint5=false;
               
             });
        
             canvas.addEventListener("mouseleave",()=>{         //When mouse leave the canvas's area set paint to false
        
                paint=false;
                paint2=false;
                paint3=false;
                paint4=false;
                paint5=false;
             });
        
        
            
           
        }
          }
    }




let temp = new Canvas("image");
temp.buildAll(temp.method);


/*

function domElement(){

    let canvas,ctx,X,Y,scaleX,scaleY,angle;
    let conta;
    let paint,paint2,paint3,paint4,paint5;
    let d,d2,d3,d4,d5;                          //Distances for grabbing the Image at certain points
    let size,rotation,imagestyle;                //Buttons
    let addP=10;                                //A number that divide the Image original size
    let roTate=0;                               //Set initial rotation value for the rotationBar2


    
    conta = document.createElement("div");  //Create a container for the Canvas
    canvas = document.createElement("canvas");  //Create Canvas
    ctx = canvas.getContext("2d");      //Canvas context

    let btnArray =[                 //Dynamically assign Id's and innerText's for Buttons
        {btnId:"additionBtn",
         btnText:"Size"},

        {btnId:"rotationBtn",
         btnText:"Rotation"},

        {btnId:"imageStyle",
        btnText:"ImageStyle"}
    ];

    let flexCont = document.createElement("div");      //Create a Flex container for the Buttons
    flexCont.id="btnCont";
    conta.appendChild(flexCont);

    btnArray.forEach((val)=>{

        let btn0=document.createElement("btn");
        btn0.id=val["btnId"];
        btn0.className="flexBtn";
        btn0.innerText = val["btnText"];
        flexCont.appendChild(btn0);

    });

    document.body.appendChild(conta); //Append the main Container to the body
    conta.appendChild(canvas);

    


image = new Image();        //Create an image Object
image.src="./1.png";        //Assign any src for it


function firstInit(img,x,y,scalex,scaley){
    image.width = scaleX;
    image.height = scaleY;

    scaleX = scalex;
    scaleY = scaley;

    X=x;
    Y=y;
    ctx.drawImage(img,x,y,scaleX,scaleY);
}

image.onload = ()=>{

    canvas.id="canvas";
    canvas.style.width = "90%";             //Always set Canvas size with CSS then set the Canvas width and height to its clientHeight and Width
    canvas.style.height ="90%";
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

firstInit(image,canvas.clientWidth/2,canvas.clientHeight/2,image.naturalWidth/addP,image.naturalHeight/addP);

};          //Initialized image when ready

function go(){

    function distanceMeasure(e){        //Calculating distance for 5 different points where the Image is draggable

        let a = e.offsetX -(X+scaleX/2);
        let b = e.offsetY -(Y+scaleY/2);

        let a2 = e.offsetX -(X+scaleX/5);
        let b2 = e.offsetY -(Y+scaleY/5);

        let a3 = e.offsetX -(X+scaleX);
        let b3 = e.offsetY -(Y+scaleY);

        let a4 = e.offsetX -(X+scaleX);
        let b4 = e.offsetY -(Y+scaleY/5);

        let a5 = e.offsetX -(X+scaleX/5);
        let b5 = e.offsetY -(Y+scaleY);

        let distance = Math.sqrt(Math.pow(a,2)+Math.pow(b,2));
        d=distance;

        let distance2 = Math.sqrt(Math.pow(a2,2)+Math.pow(b2,2));
        d2=distance2;

        let distance3 = Math.sqrt(Math.pow(a3,2)+Math.pow(b3,2));
        d3=distance3;

        let distance4 = Math.sqrt(Math.pow(a4,2)+Math.pow(b4,2));
        d4=distance4;

        let distance5 = Math.sqrt(Math.pow(a5,2)+Math.pow(b5,2));
        d5=distance5;
    }


    canvas.addEventListener("mousedown",(e)=>{      //If its within distance allow drag (paint true)

        distanceMeasure(e);

        if(d < (scaleX-scaleY)/2 ){
            console.log("moveable");
            paint =true;
        }
      
        else if(d2 < (scaleX-scaleY)/2){
            console.log("moveable");
            paint2 =true;
        }

        else if(d3 < (scaleX-scaleY)/2){
            console.log("moveable");
            paint3 =true;
        }

        else if(d4 < (scaleX-scaleY)/2){
            console.log("moveable");
            paint4 =true;
        }

        else if(d5 < (scaleX-scaleY)/2){
            console.log("moveable");
            paint5 =true;
        }

    });

    canvas.addEventListener("mousemove",(e)=>{      
    
        if(X+scaleX < canvas.width || Y+scaleY < canvas.height || X > 0 || Y > 0){      //If its within Canvas range and one of the paint is true then drawImage or rotated Image

        if(paint){

            X = e.offsetX-scaleX/2;
            Y = e.offsetY-scaleY/2;

            if(angle != null){
                angle(image,X,Y,image.naturalWidth/addP,image.naturalHeight/addP);
            }

            else{
 
            ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
            ctx.drawImage(image,X,Y,scaleX,scaleY);      
        }   
  }


        else if(paint2){

            X = e.offsetX-scaleX/5;
            Y = e.offsetY-scaleY/5;

            if(angle != null){
                angle(image,X,Y,image.naturalWidth/addP,image.naturalHeight/addP);
            }

            else{
 
            ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
            ctx.drawImage(image,X,Y,scaleX,scaleY);      
        }  
}


        else if(paint3){

            X = e.offsetX-scaleX/1.1;
            Y = e.offsetY-scaleY/1.1;

            if(angle != null){
                angle(image,X,Y,image.naturalWidth/addP,image.naturalHeight/addP);
            }

            else{
 
            ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
            ctx.drawImage(image,X,Y,scaleX,scaleY);      
        }  
}


        else if(paint4){

            X = e.offsetX-scaleX/1.1;
            Y = e.offsetY-scaleY/5;

            if(angle != null){
                angle(image,X,Y,image.naturalWidth/addP,image.naturalHeight/addP);
            }

            else{
 
            ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
            ctx.drawImage(image,X,Y,scaleX,scaleY);      
        }  
}


        else if(paint5){

            X = e.offsetX-scaleX/5;
            Y = e.offsetY-scaleY/1.1;

            if(angle != null){

                angle(image,X,Y,image.naturalWidth/addP,image.naturalHeight/addP);
            }

            else{
 
            ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
            ctx.drawImage(image,X,Y,scaleX,scaleY);      
        }  
 }


 }

       if(X < 0){       // These prevents the Image to clip through at the edges of the Canvas


        if(angle != null){

            angle(image,0,Y,image.naturalWidth/addP,image.naturalHeight/addP);
        }

        else{
        ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
        ctx.drawImage(image,0,Y,scaleX,scaleY); 
    }
        }

        else if(Y < 0 ){
         
            if(angle != null){

                angle(image,X,0,image.naturalWidth/addP,image.naturalHeight/addP);
            }
            else{

            
            ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
            ctx.drawImage(image,X,0,scaleX,scaleY); 
        }
        }

        if(X+scaleX > canvas.width){
            ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
            ctx.drawImage(image,canvas.width-scaleX,Y,scaleX,scaleY);
        }

        else if(Y+scaleY > canvas.height){
            ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
            ctx.drawImage(image,X,canvas.height-scaleY,scaleX,scaleY);
        }

        else if(X < 0 && Y< 0){
            
            ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
            ctx.drawImage(image,0,0,scaleX,scaleY); 
        }

    if(X < 0 && Y+scaleY > canvas.height){
        ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
        ctx.drawImage(image,0,canvas.height-scaleY,scaleX,scaleY); 
    }

    else if(X+scaleX > canvas.width && Y < 0){
        ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
        ctx.drawImage(image,canvas.width-scaleX,0,scaleX,scaleY); 
    }

    else if(X+scaleX > canvas.width && Y+scaleY > canvas.height){
        ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
        ctx.drawImage(image,canvas.width-scaleX,canvas.height-scaleY,scaleX,scaleY); 
    }

   
     });

     canvas.addEventListener("mouseup",(e)=>{       //When let the mouse set paint to false
       
        paint=false;
        paint2=false;
        paint3=false;
        paint4=false;
        paint5=false;
       
     });

     canvas.addEventListener("mouseleave",()=>{         //When mouse leave the canvas's area set paint to false

        paint=false;
        paint2=false;
        paint3=false;
        paint4=false;
        paint5=false;
     });


    
   
}

window.addEventListener("resize",(e)=>{         //Resize everything based on the Window.innerWidth and innerHeight


   canvas.width = canvas.clientWidth;
   canvas.height = canvas.clientHeight;

    firstInit(image,X,Y,image.naturalWidth/addP,image.naturalHeight/addP);


})

function domStyle(){        //Created this function to not all the code be in the same place...Kind of
    
    let z = false;              // Preventing to create multiple range bars

    size=document.getElementById("additionBtn");        //Resize button
    rotation=document.getElementById("rotationBtn");        // Rotation button
    imagestyle = document.getElementById("imageStyle");         //Image style ( not functioning yet )

    let cssLink = document.createElement("link");              //Create link for CSS and append it to the Head
    cssLink.rel ="stylesheet";
    cssLink.href ="./index.css";
    document.head.appendChild(cssLink);

    conta.id="conta";                              //Set the Canvas parent container to canvas size + some more (Not good solution,change later...)
    conta.style.width ="50%";
    conta.style.height ="50%";

    
    flexCont.style.width ="10%";
    flexCont.style.userSelect ="none";
    
    size.addEventListener("click",()=>{         //When clicked create a range bar to set the Context size
     
        sessionStorage.setItem("btn1clicked",true);         //To check if the size buton clicked
        size.classList.add("highlight");            //Highlight the choosed action

        if(sessionStorage.getItem("btn2clicked") || sessionStorage.getItem("btn3clicked")){

            sessionStorage.removeItem("btn2clicked");       //If you used another action before remove those Click checks
            sessionStorage.removeItem("btn3clicked");
            rotation.classList.remove("highlight");         //Remove its highlight class

            z=false;            //Set z to false so the Buttons can create range bars again


            let range = document.getElementById("sizeBar"); 
            if(range != null){
                range.parentElement.removeChild(range);         //Remove range bar from the Body
            }
           
        }


        if(sessionStorage.getItem("btn1clicked") && z == false ){       //Creating the range bar

        z = true;
        let rangeBar = document.createElement("input"); 
        rangeBar.type="range";
        rangeBar.name="range";
        rangeBar.min=1;
        rangeBar.max = 20;
        rangeBar.value =addP;
        rangeBar.id="sizeBar";
        conta.appendChild(rangeBar);

        let range = document.getElementById("sizeBar");

        range.addEventListener("input",()=>{        //If the range value changes set addP higher or lower to Decrease or Increased the Context size
            
                addP=range.value;

                if(angle != null){
                    angle(image,X,Y,image.naturalWidth/addP,image.naturalHeight/addP);
                }

                else {
                    ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
                    firstInit(image,X,Y,image.naturalWidth/addP,image.naturalHeight/addP)
                }
               
        })

    };

    });

    rotation.addEventListener("click",()=>{              

        rotation.classList.add("highlight");        //Highlight the choosed action
        sessionStorage.setItem("btn2clicked",true);     //To check if the rotation buton clicked 

        if(sessionStorage.getItem("btn1clicked") || sessionStorage.getItem("btn3clicked")){

            sessionStorage.removeItem("btn1clicked",false);     //If you used another action before remove those Click checks
            sessionStorage.removeItem("btn3clicked",false);
            size.classList.remove("highlight");                 //Remove its highlight class
            z=false;                                //Set z to false so the Buttons can create range bars again

            let range = document.getElementById("sizeBar");
            if(range != null){
                range.parentElement.removeChild(range);     //Remove range bar from the Body
            }
               
        }    
    

        if(sessionStorage.getItem("btn2clicked") && z == false){        //Creating the range bar

        z=true; 
        let rangeBar2 = document.createElement("input");
        rangeBar2.type="range";
        rangeBar2.name ="range";
        rangeBar2.id="sizeBar";
        rangeBar2.min = 0;
        rangeBar2.max = 360;
        rangeBar2.value = roTate; 
        
        conta.appendChild(rangeBar2);
        
        rangeBar2.addEventListener("input",()=>{        //If the range value changes set roTate and rotate the Context Clockwise or CounterClockwise
           
           roTate = rangeBar2.value;
           function rotation (img,xs,ys,wide,tall){                 //Rotation function

           let a= Math.sqrt(Math.pow((canvas.width-canvas.width)-(X+scaleX/2),2));      //Set the rotation center to the image center
           let b = Math.sqrt(Math.pow((canvas.height-canvas.height) -(Y+scaleY/2),2));

           ctx.save();                      //Rotation method
           ctx.translate(a,b);
           ctx.rotate(Math.PI*rangeBar2.value/180);
           ctx.translate(-(a),-(b));
           ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
           firstInit(img,xs,ys,wide,tall)
           ctx.restore();


        }
        
        rotation(image,X,Y,image.naturalWidth/addP,image.naturalHeight/addP);
        angle=rotation;             //Set the angle.If angle != null,then instead of first init this will run
                
        })
    }

});

    /*
    imagestyle.addEventListener("click",()=>{

    });

}


domStyle();
go()
};



let btn = document.getElementById("btn");       //When clicked call everything above
btn.addEventListener("click",()=>{
    domElement();
    
})
*/