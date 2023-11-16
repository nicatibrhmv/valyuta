let list = document.querySelector(".list");

let currencyRow = document.querySelector('#container');
let p1= document.querySelector('.area1>p');
let p2= document.querySelector('.area2>p');
let input1 = document.querySelector('#input1');
let input2 = document.querySelector('#input2')
let one = [...document.getElementsByClassName("one")];
let two = [...document.getElementsByClassName("two")];

let first=document.querySelector("#first-container .active").innerHTML;
let second  =document.querySelector("#second-container .active").innerHTML;


    one.forEach(item => {
        item.addEventListener("click", ()=>{
            if (!item.classList.contains("active")) {
                one.forEach((element)=>{
                   element.classList.remove("active") 
                })
                item.classList.add("active")
                first = item.innerText;
                console.log(first)
                calc()
            };
        })
       
    })
    two.forEach(item => {
        item.addEventListener("click",()=>{
            if (!item.classList.contains("active")) {
                two.forEach((element)=>{
                    element.classList.remove("active") 
                 })
                 item.classList.add("active")
                 second = item.innerText;
                 console.log(second)
                 calc2()
            };
        })
       
    })


// Calculation
function calc(){
   console.log(first)
    const url='https://v6.exchangerate-api.com/v6/'
    const key ='412e07f5625da2e1092fa36a'

    if(!input1.value==""){
        //fetch(`${url}/${key}/pair/${valyuta1}/${valyuta2}/${firstInput.value}`)
        fetch(`${url}/${key}/pair/${first}/${second}/${input1.value}`)
        .then(r => r.json())
        .then((data) => {
            
          input2.value= data.conversion_result.toFixed(6);
            console.log(data)

            
            p1.innerText = `1 ${first} = ${data.conversion_rate} ${second} `;
            p2.innerText = `1 ${second} = ${(1/data.conversion_rate).toFixed(5)} ${first} `;
        }).catch(error => {alert("Check your internet connection");console.log(error)})
    }
   
}
// Calculation2
function calc2(){
 
    const url='https://v6.exchangerate-api.com/v6/'
    const key ='412e07f5625da2e1092fa36a'

    if(!input2.value==""){
        fetch(`${url}/${key}/pair/${second}/${first}/${input2.value}`)
        .then(r => r.json())
        .then((data) => {
            input1.value = data.conversion_result.toFixed(6);
            console.log(data)
            p2.innerText = `1 ${first} = ${data.conversion_rate} ${second} `;
            p1.innerText = `1 ${second} = ${(1/data.conversion_rate).toFixed(5)} ${first} `;
            
        }).catch(error => {alert("Check your internet connection");console.log("Check your internet connection")})
    }
    
}

input1.addEventListener('keypress', calc);
input2.addEventListener('keypress', calc2);

