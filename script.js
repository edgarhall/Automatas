let area = document.getElementById('area');
let content = document.getElementById('content');

area.addEventListener('dragover', e => e.preventDefault());
area.addEventListener('drop', readFile);

function readFile (e) {
  e.preventDefault();
  let file = e.dataTransfer.files[0];
  
  if (file.type === 'text/plain') {
    let reader = new FileReader();
    reader.onloadend = () => printFileContents(reader.result);
    reader.readAsText(file, 'ISO-8859-1');
  } else {
    alert('Por favor puede carga un archivo de texto!');
  }
}

function printFileContents (contents) {
  content.style.lineHeight = '30px';
  content.textContent = '';
  let lines = contents.split(/\n/);
  //var arrayTransitionTh = lines[1];
  let lineCounter = 0;
  crateArrayKey = " "
  let inArrayKey = [];
  let  mainArray= [];
  let subArray = [];
  
  lines.forEach(line => {
    //console.log()
    //preparando encabezado de matriz transicion
    if (lineCounter == 1) {
      arrayTransitionTh = line
      arrayTransitionTh = arrayTransitionTh.replace(/[{}=,\r]/g, '')
      arrayTransitionTh = arrayTransitionTh.split("")
      arrayTransitionTh = arrayTransitionTh.splice(1);
      thead = ["Estados"]
      
      //console.log(arrayTransitionTh)
      for (let index = 0; index < arrayTransitionTh.length; index++) {
        thead.push(arrayTransitionTh[index])
        
      }
      thead.push("e")
    }
 
    content.textContent += line + '\n'

    if (lineCounter != 4) {
      
      emptyLine = line
      line = line.replace(/[\s+^,{}()]/g, '')
  
      var body = line.split('')
     
      $tableDisplay = document.getElementById("tableDisplay");
      $table = document.createElement("table");
      $thead = document.createElement("thead");
      $tbody = document.createElement("tbody");
      $trh = document.createElement("tr");
      $th = document.createElement("th");
    
      $tableDisplay.appendChild($table)
      $table.appendChild($thead);
    
      $thead.appendChild($trh);
      $trh.appendChild($th)
      
      $table.appendChild($tbody);

      //asignamos valores a los th
      $th.textContent = body[0];
      $trh.appendChild($th)

      console.log(body)
   
      if (body.length > 2) {
        
        for (let index = 2; index < body.length; index++) {[]
          
          $trb = document.createElement("tr");
          $td = document.createElement("td");
        
          $tbody.appendChild($trb)
          $trb.appendChild($td)

          $td.textContent  = body[index];
          console.log(body[index])
          $trb.appendChild($td)

        }
      } else { 
        alert ("El vector viene vacio "+ '\n'+ emptyLine +  '\n'+ " Tiene que tener almenos un elemento para recorrerlo y mostralo en pantalla")
      }

      lineCounter ++;
      //console.log(lineCounter)
    } else {
      //MATRIZ DE TRANSICION
      console.log("--------------MATRIZ DE TRANSICION----------------")
      //console.log(line)
      //regex ER limpiando cadenas
      var line = line.replace(/[W={}]/g, '')
      //console.log(line)
      var line = line.split(/\(([^)]+)\)/)
      //console.log(line)

      $arrayTransition = document.getElementById("arrayTransition");
      $table = document.createElement("table");
      $tbody = document.createElement("tbody");
      $thead = document.createElement("thead");
      $trh = document.createElement("tr");
    
    
      $arrayTransition.appendChild($table)
      $table.appendChild($thead);
      $table.appendChild($tbody);

      $thead.appendChild($trh);

      //Encabezadod de matriz transicion
      for (let index = 0; index < thead.length; index++) {
        $th = document.createElement("th");
        $th.textContent  = thead[index];
        $trh.appendChild($th) 
      }
      
      for (let index = 0; index < line.length; index++) {

        let element = line[index];
        //console.log(element)

        let elementsclean = element.toString()
        let elementscleaned = elementsclean.replace(/[,]/g, '')

        let arrElements =  elementscleaned.split("")
        if (elementscleaned.length > 1) { 
            //console.log("arrElements")
            //console.log(arrElements)
         
            arrayKey = arrElements[0];
            //console.log("arrayKey")
            //console.log(arrayKey)
         
          
          if (!inArrayKey.includes(arrayKey)) {
            //console.log("arrayKey")
            //console.log(arrayKey)
            inArrayKey.push(arrayKey)
            //console.log("inArrayKey", inArrayKey)
            crateArrayKey = arrayKey

         
                let key = arrElements[0];
                //console.log(key)
                subArray = [key]
                let p2 = arrElements[2];
                subArray.push(p2)

                mainArray.push(subArray)
                //console.log("primero")
             
            
          } else {

            //console.log("subArray", subArray[0])
            for (let index = 0; index < inArrayKey.length; index++) {
              console.log("inArrayKey[index]",inArrayKey[index])
              console.log("subArray[0]",subArray[0])
              if (inArrayKey[index] == subArray[0]) {
                let p3 = arrElements[2];
                console.log("p3", p3)
                subArray.push(p3)
                
                //console.log("segundo")
              }
            }
            
          }
        } 
      }
    }
      
  });
  console.log("---HEADER---")
  console.log(thead)
  console.log("---CONTENT---")  

  console.log(mainArray);

  for (let index = 0; index < mainArray.length; index++) {  
    $trb = document.createElement("tr");
    $tbody.appendChild($trb)
    let subArr = mainArray[index]
    
    for (let i = 0; i <subArr.length; i++) {
      //console.log(subArr[i]);
      $td = document.createElement("td");

      $td.textContent = subArr[i];
      $trb.appendChild($td)
      //console.log(mainArray[index])
    } 
  }

}