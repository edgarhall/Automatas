let area = document.getElementById("area");
let content = document.getElementById("content");
let crateArrayKey = "";
let inArrayKey = [];
let subArray = [];
let mainArray = [];

area.addEventListener("dragover", (e) => e.preventDefault());
area.addEventListener("drop", readFile);

function readFile(e) {
  e.preventDefault();
  let file = e.dataTransfer.files[0];

  if (file.type === "text/plain") {
    let reader = new FileReader();
    reader.onloadend = () => printFileContents(reader.result);
    reader.readAsText(file, "ISO-8859-1");
  } else {
    alert("Por favor puede carga un archivo de texto!");
  }
}

function matrizUno(linea) {
  //MATRIZ DE TRANSICION
  console.log("--------------MATRIZ DE TRANSICION----------------");
  //regex ER limpiando cadenas
  const line = linea.replace(/[w={}]/g, "").split(";");
  const lineaSeparada = [];
  const letrasDuplicadas = [];

  for(let elemento of line){
    lineaSeparada.push(elemento.replace(/[()]/g, ""));
  }

  for(let elemento of lineaSeparada){
    const separado = elemento.split(",");
    letrasDuplicadas.push(separado[1]);
  }

  const letras = letrasDuplicadas.filter((item, index)=>{
    return letrasDuplicadas.indexOf(item) === index;
  });

  $arrayTransition = document.getElementById("arrayTransition");
  $table = document.createElement("table");
  $tbody = document.createElement("tbody");
  $thead = document.createElement("thead");
  $trh = document.createElement("tr");
  $arrayTransition.appendChild($table);
  $table.appendChild($thead);
  $table.appendChild($tbody);
  $thead.appendChild($trh);

  //Encabezadod de matriz transicion
  $th = document.createElement("th");
    $th.textContent = "Estados";
    $trh.appendChild($th);
  for (let index = 0; index < thead.length; index++) {
    $th = document.createElement("th");
    $th.textContent = letras[index];
    $trh.appendChild($th);
  }

  $th = document.createElement("th");
    $th.textContent = "Composicion";
    $trh.appendChild($th);

  for (let index = 0; index < line.length; index++) {
    let element = line[index];
    let elementsclean = element.toString();
    let elementscleaned = elementsclean.replace(/[;]/g, "");
    // console.log("element clen",elementscleaned);
    let arrElements = elementscleaned.split("");
    if (elementscleaned.length > 1) {
      arrayKey = arrElements[0];
      if (!inArrayKey.includes(arrayKey)) {
        inArrayKey.push(arrayKey);
        crateArrayKey = arrayKey;
        let key = arrElements[0];
        subArray = [key];
        let p2 = arrElements[2];
        subArray.push(p2);
        mainArray.push(subArray);
      } else {
        for (let index = 0; index < inArrayKey.length; index++) {
          if (inArrayKey[index] == subArray[0]) {
            let p3 = arrElements[2];
            subArray.push(p3);
          }
        }
      }
    }
  }
}

function estados(line) {
  arrayTransitionTh = line;
  arrayTransitionTh = arrayTransitionTh.replace(/[{}=,\r]/g, "");
  arrayTransitionTh = arrayTransitionTh.split("");
  arrayTransitionTh = arrayTransitionTh.splice(1);
  thead = ["Estados"];

  //console.log(arrayTransitionTh)
  for (let index = 0; index < arrayTransitionTh.length; index++) {
    thead.push(arrayTransitionTh[index]);
  }
  thead.push("e");
}

function despliegueVectores(line) {
  emptyLine = line;
  line = line.replace(/[\s+^,{}()]/g, "");
  var body = line.split("");
  $tableDisplay = document.getElementById("tableDisplay");
  $table = document.createElement("table");
  $thead = document.createElement("thead");
  $tbody = document.createElement("tbody");
  $trh = document.createElement("tr");
  $th = document.createElement("th");

  $tableDisplay.appendChild($table);
  $table.appendChild($thead);

  $thead.appendChild($trh);
  $trh.appendChild($th);

  $table.appendChild($tbody);

  //asignamos valores a los th
  $th.textContent = body[0];
  $trh.appendChild($th);

  // console.log(body);

  if (body.length > 2) {
    for (let index = 2; index < body.length; index++) {
      [];

      $trb = document.createElement("tr");
      $td = document.createElement("td");

      $tbody.appendChild($trb);
      $trb.appendChild($td);

      $td.textContent = body[index];
      // console.log(body[index]);
      $trb.appendChild($td);
    }
  } else {
    alert(
      "El vector viene vacio " +
        "\n" +
        emptyLine +
        "\n" +
        " Tiene que tener almenos un elemento para recorrerlo y mostralo en pantalla"
    );
  }
}

function printFileContents(contents) {
  content.style.lineHeight = "30px";
  content.textContent = "";
  let lines = contents.split(/\n/);
  let lineCounter = 0;
  
  //var arrayTransitionTh = lines[1];
  lines.forEach((line) => {
    lineCounter++;
    content.textContent += line + "\n";
    //Estados
    if (lineCounter == 1) {
      estados(line);
    }
    if (lineCounter <= 4) {
      despliegueVectores(line);
    }
    if (lineCounter == 5) {
      matrizUno(line);
    }
  });

  for (let index = 0; index < mainArray.length; index++) {
    $trb = document.createElement("tr");
    $tbody.appendChild($trb);
    let subArr = mainArray[index];

    for (let i = 0; i < subArr.length; i++) {
      $td = document.createElement("td");
      $td.textContent = subArr[i];
      $trb.appendChild($td);
    }
  }
}
