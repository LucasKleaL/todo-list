//variables
var LIST = [];
var id = 0;

//class names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//select the elements

const clear = document.querySelector(".botao-clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const add = document.getElementById("botaoAddTodo");

//get item from local storage
var data = localStorage.getItem("TODO");

if(data){ //check if data is not empety
    LIST = JSON.parse(data);
    id = LIST.length; //set the id to the last one in the list
    loadList(LIST); //load the list to the user interface
}else{ //if data is empety
    LIST = [];
    id = 0;
}

//load items to the user's interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash)
    });
}

//clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})

//show todays date
const options = {weekday : "long", day : "numeric", month : "short"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("pr-BR", options);

// add to do function
function addToDo(toDo, id, done, trash){

    if(trash){ return; } //verifica se o item está na lixeira, se estiver, o código abaixo não executa e a função reinicia.

    const DONE = done ? CHECK : UNCHECK; //verifica se a variável done é verdadeira e atribui CHECK, se não for, atribui UNCHECK
    const LINE = done ? LINE_THROUGH : ""; //verifica se a variável done é verdadeira e atribui estilo com traço, se não for, atribui texto normal

    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id=${id}></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id=${id}></i>
                </li>
                `;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);

}

//add an item to the list when user click the enter key
document.addEventListener("keyup", function(even){
    if(event.keyCode == 13){
        const toDo = input.value;

        //if the input isn't empety
        if(toDo){
            addToDo(toDo);

            LIST.push({
                name : toDo,
                id : id, 
                done : false,
                trash : false,
            });

            localStorage.setItem("TODO", JSON.stringify(LIST)); //add item to local storage (must be added where the LIST array is updated)

            id++;
        }
        input.value = "";
    }
});

//add an item to the list when usar click on add button
add.addEventListener("click", function(){

    const toDo = input.value;

    if(toDo){
        addToDo(toDo);

        LIST.push({
            name : toDo,
            id : id, 
            done : false,
            trash : false,
        });

        localStorage.setItem("TODO", JSON.stringify(LIST)); //add item to local storage (must be added where the LIST array is updated)

        id++;
    }
    input.value = "";

});

//complete to do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

//target the items created dynamically

list.addEventListener("click", function(event){
    const element = event.target; //return the clicked element inside list
    const elementJob = element.attributes.job.value; //return complete or false

    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    localStorage.setItem("TODO", JSON.stringify(LIST)); //add item to local storage (must be added where the LIST array is updated)
});
