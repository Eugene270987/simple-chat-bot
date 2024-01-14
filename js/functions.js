function createChatWindows () {
    const parent = document.getElementById('chat');
    createElement('div', parent, '', {id: 'botChat'});
    createElement('div', parent, '', {id: 'userChat'});
}
function stopChat () {
    addMessage("The chat has ended.", 'cleverBot');
    document.getElementById('btn-send').disabled = true;
    document.getElementById('messageField').disabled = true;
}
function createAlert(parent, content, type) {
    createElement('div', parent, content, {id: 'alert', className: type, role: 'alert'});
    return alert;
}
function validateForm (value) {
    const error = document.querySelector('.alert-danger');
    if (value === '') {
        createAlert('#alert-wrapper', 'Please, enter your query!', 'alert alert-danger');
        if (error) {
            removeElement(error);
        }
        return false;
    }
    return true
}
function sendMessage () {
    const formElements = document.forms[0].elements;
    let myMessage = formElements.message.value;
    const isValid = validateForm(myMessage);
    const alertWrapper = document.getElementById('alert-wrapper');
    if (isValid) {
        formElements.message.value = '';
        if (myMessage === keyWord) {
            stopChat();
        } else {
            addMessage (myMessage, 'user');
            alertWrapper.innerHTML = '';
            startBotThinking();
        }
    }
}

function addMessage(message, user) {
    if (user === 'user') {
        createElement('div', '#userChat', message, {className: 'user-message'});
    } else if (user === 'cleverBot') {
        createElement('div', '#botChat', message, {className: 'bot-message'});
    }
}
function botMessaging () {
    const messageIndex = Math.floor(Math.random() * answersArray.length);
    const botMessage = answersArray[messageIndex];
    addMessage(botMessage, 'cleverBot');
}
async function startBotThinking() {
    const minDelay = 1;
    const maxDelay = 10;
    const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

    await new Promise(resolve => setTimeout(resolve, delay * 1000));

    botMessaging();
    //Рандомная остановка диалога бота с пользователем
    //stopChatRandomly();
}
/*
function stopChatRandomly() {
    const minDelay = 20;
    const maxDelay = 60;
    const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

    setTimeout(() => {
        stopChat();
    }, delay * 1000);
}
*/
