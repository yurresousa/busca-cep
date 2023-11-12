
var cepDigitado = document.getElementById("cepDigitado");



function validaCep(cep){
  var objER = /^[0-9]{2}[0-9]{3}[0-9]{3}$/;
  if(cep.length > 0)
  {
      if(objER.test(cep)){

          return 1;
      }
      else{
          return 0;
      }
  }

 return 2;
}


function buscarCep(){


  if( validaCep(cepDigitado.value) === 1 ){
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('GET',"https://viacep.com.br/ws/"+cepDigitado.value+"/json/")
    xmlHttpRequest.onreadystatechange = ()=>{

      if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
        let response =  JSON.parse(xmlHttpRequest.responseText);
        cepDigitado.value = '';
        if(!response.erro){
          document.getElementById("cep").value = response.cep
          document.getElementById("logradouro").value = response.logradouro
          document.getElementById("bairro").value = response.bairro
          document.getElementById("cidade").value = response.localidade
          document.getElementById("estado").value = response.uf
        
          alerta(1);
        
        }else{
          alerta(3)
          console.log('cep inexistente')
        }
      }

    }
    xmlHttpRequest.send();
  }else if(validaCep(cepDigitado.value) ===  0){
    alerta(0);
    console.log("formato invalido")

  }else{
   alerta(2)
    console.log('Campo vazio')
  }
}

function limparTela(){

    document.getElementById("cep").value = ''
    document.getElementById("logradouro").value = ''
    document.getElementById("bairro").value = ''
    document.getElementById("cidade").value =''
    document.getElementById("estado").value = ''
}



function alerta(valor){
let alerta = document.getElementById('alerta')

console.log(valor)

switch(valor){

  case 0:
    alerta.className = "alert alert-danger text-center";
    alerta.innerHTML = " Formato inválido";
    break;
  case 1:
    alerta.className = "alert alert-success text-center";
    alerta.innerHTML = "Sucesso"; 
    break;
  case 2:
    alerta.className = "alert alert-danger text-center";
    alerta.innerHTML = "Campo vazio"; 
    break;
  case 3:
    alerta.className = "alert alert-warning text-center";
    alerta.innerHTML = "Cep Não Encontrado"; 
    break;
}


setTimeout(()=>{
  alerta.className = "";
  alerta.innerHTML = "";  
},4000)


}