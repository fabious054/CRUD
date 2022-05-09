
(function (){

    let arrayList = [];
    let btnSaveUser = document.getElementById('btnSaveUser');
    let btnAddUser = document.getElementById('btnAddUser');
    btnAddUser.setAttribute('data-isedit',false);
    btnAddUser.addEventListener('click',function(){main(arrayList)});
    btnSaveUser.addEventListener('click',()=>saveUser(arrayList));

    let firstInput = document.getElementById('name');
    let lastNameInput = document.getElementById('lastname');
    let lastInput = document.getElementById('age');

    firstInput.addEventListener('keyup',event =>{ if( event.keyCode == 13){lastNameInput.focus()}});
    lastNameInput.addEventListener('keyup',event =>{ if( event.keyCode == 13){lastInput.focus()}});
       
})();

function main(arrayList){

    let listUsers = arrayList;
    let name = document.getElementById('name').value;
    let lastname = document.getElementById('lastname').value; 
    let age = document.getElementById('age').value;

    document.getElementById('name').focus();

    document.getElementById('name').value = '';
    document.getElementById('lastname').value = ''; 
    document.getElementById('age').value = '';

    if(isNullOrEmptyInput(name,lastname,age)){
        alert('Preencha todos os campos!');
        return;
    };

    if(listUsers && containsUsers(arrayList, name,lastname)){

        alert('Usuario ja existe.');
        return;
    };

    addUser(listUsers,name,lastname,age)
    
    if(listUsers) {

        removeUser(listUsers);
        editUser(listUsers);
    }
}

function containsUsers(arrayList,name,lastName){

    let userList = arrayList;
    let nameInput = name;
    let lastNameInput = lastName;

    return userList.some(function(user){
        return user.name == nameInput && user.lastName == lastNameInput ;
    });
};

function isNullOrEmptyInput(name,lastName,age){

    let nameInput = name;
    let lastNameInput = lastName;
    let ageInput = age;
    
    if(!nameInput || !lastNameInput || !ageInput){
        return true;
    } else{
        return false;
    }
};

function addUser(listUsers,name,lastname,age){

    let btnAddUser = document.getElementById('btnAddUser');
    btnAddUser.innerHTML = 'Adicionar Usuario';

        listUsers.push({
            name: name,
            lastName: lastname,
            age:age
        });
     
        let tableUser =  document.getElementById('tableUsers');
        tableUser.innerHTML = '';
       
        listUsers.forEach((user,index)=>{
             tableUser.innerHTML += `
             <tr><td>${user.name}</td>
            <td>${user.lastName}</td>
            <td>${user.age}</td>
            <td><button data-indice="${index}"  type="button" class="btn btn-danger remove" >REMOVE</button>
            <button data-indice="${index}"  type="button" class="btn btn-outline-dark edit" >Edit</button></td>
            </tr>`;
    });
        }
    
function removeUser(arrayList){
    
    let currentIndex;
    let arrayButtons = Array.from(document.getElementsByClassName('remove'));

    arrayButtons.forEach(btn=>btn.addEventListener('click',event=>{

        currentIndex = event.currentTarget.dataset.indice;
        event.currentTarget.parentElement.parentElement.remove();
        arrayList.splice(currentIndex,1);
    
    }));
};

function editUser(arrayList){

    let btnAddUser = document.getElementById('btnAddUser');
    let nameInput = document.getElementById('name');
    let lastNameInput = document.getElementById('lastname') ;
    let ageInput = document.getElementById('age');
    let currentIndex;
    let arrayBtnEditUsers = Array.from(document.getElementsByClassName('edit'));

    arrayBtnEditUsers.forEach(btnEdit=>btnEdit.addEventListener('click',event=>{
        
        btnSaveUser.style.display = 'block';
        btnAddUser.style.display = 'none';
        btnAddUser.setAttribute('data-isedit',true);
        currentIndex = event.target.dataset.indice;
        document.getElementById('index').value = currentIndex;
        nameInput.focus();

        nameInput.value = arrayList[currentIndex].name;
        lastNameInput.value = arrayList[currentIndex].lastName;
        ageInput.value =  arrayList[currentIndex].age;

        event.currentTarget.parentElement.parentElement.remove();

        arrayBtnEditUsers.forEach(btn=>btn.setAttribute('disabled',true));
        let arrayButtons = Array.from(document.getElementsByClassName('remove'));
        arrayButtons.forEach(btn=>btn.setAttribute('disabled',true));

    }));   
};

function saveUser(arrayList){

    btnSaveUser.style.display = 'none';
    btnAddUser.style.display = 'block';

    let inputIndex = document.getElementById('index').value;
    let name = document.getElementById('name').value;
    let lastname = document.getElementById('lastname').value; 
    let age = document.getElementById('age').value;

    document.getElementById('name').value = '';
    document.getElementById('lastname').value = ''; 
    document.getElementById('age').value = '';

    let tableUser =  document.getElementById('tableUsers');
    tableUser.innerHTML = '';

    if(isNullOrEmptyInput(name,lastname,age)){
        alert('Preencha todos os campos!');
        return;
    };

    let user = arrayList.find((x,index)=>index == inputIndex );

    arrayList.splice(inputIndex,1);

    user.name = name;
    user.lastName = lastname;
    user.age = age;
    
    arrayList.push(user);
    
     arrayList.forEach((user,index)=>{
         tableUser.innerHTML += `
         <tr><td>${user.name}</td>
        <td>${user.lastName}</td>
        <td>${user.age}</td>
        <td><button data-indice="${index}"  type="button" class="btn btn-danger remove" >REMOVE</button>
        <button data-indice="${index}"  type="button" class="btn btn-outline-dark edit" >Edit</button></td>
        </tr>`;
    });

    removeUser(arrayList);
    editUser(arrayList);
}


