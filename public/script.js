const socket = io();
let username='';
document.getElementById('join-button').addEventListener('click',(event)=>{
    event.preventDefault();
    username=document.getElementById('username-input').value;
    if(username.trim!=''){
        document.querySelector('.container').style.display='none';
        document.querySelector('.chatroom-container').style.display='block';
    }
})

document.getElementById('send-button').addEventListener('click',(event)=>{
    event.preventDefault();
    const data={
        username:username,
        message:(document.getElementById('input').value),
    }
    socket.emit('message',data);
    addMessageFn(data);
})

socket.on('message',(data)=>{
    if(data.username!==username){ 
    addMessageFnRecieve(data);
    }
})

//working for sent messages
function addMessageFn(data){
    var msgDiv=document.createElement('div');
    msgDiv.innerText=`${data.username}:${data.message}`;
    msgDiv.setAttribute('class','message-sent');
    document.getElementById('message-container').appendChild(msgDiv);
    document.getElementById('input').value='';
}

//working for recieve messages
function addMessageFnRecieve(data){
    var msgDiv=document.createElement('div');
    msgDiv.innerText=`${data.username}:${data.message}`;
    msgDiv.setAttribute('class','message-recieved');
    document.getElementById('message-container').appendChild(msgDiv);
    document.getElementById('input').value='';
}