
const sendChatBtn = document.querySelector('.chat-footer button');
const chatInput = document.querySelector('.chat-footer textarea');
const chatMessages = document.querySelector('.chat-body');
const dots = document.querySelector('.dots');
let userMessage; // لتخزين الرسالة التي يكتبها المستخدم

// import {HiddenInstruction} from './config.js';

// Google Generate Response
const API_KEY = "AIzaSyBSo2hOo8FamGVkzLJeVyrmHwxQ8gkJYJQ";
const genrateResponse = (botResponse)=>{
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    const messageElement = botResponse.querySelector('p');

    const HiddenInstruction = " " ;
    const requestOptions = {
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
            // "Authorization": 'Bearer ${API_KEY}'
        },
        body: JSON.stringify({
            // Hidden Instruction
            contents: [
                // {parts: [{text: " انت الان مساعد ذكي لدكتور جلديه  "}]},
                { parts: [{ text: userMessage }] }
            ]
        })
        
    }
        fetch(API_URL, requestOptions).then(res => res.json()).then(data => {

            if (data && data.candidates && data.candidates.length > 0) {
                messageElement.textContent = data.candidates[0].content.parts[0].text;
            } else {
                messageElement.textContent = "عذرًا، لم أتمكن من تقديم رد الآن.";
            }
            console.log(data);
        }).catch((error) => {
            console.log(error);
        })
    
}


const scrollToBottom = () => {
    chatMessages.scrollTop = chatMessages.scrollHeight;
};



const createChat = (message, className)=>{

    // إنشاء عنصر div لعرض الرسالة
    const chatDiv = document.createElement('div');
    chatDiv.classList.add('chat-message', className);
    let chatContent;
    if (className === "user-message") {
        // إذا كانت الرسالة من المستخدم
        chatContent = `<div class="message-text usermsg-text"><p>${message}</p></div>`;
    } else {
        // إذا كانت الرسالة من الروبوت
        chatContent = `<img class="botmsg-icon" src="/assets/chatbot.png" alt="">
        <div class="message-text botmsg-text"><p>${message}</p></div>`;
    }    

    chatDiv.innerHTML = chatContent;
    return chatDiv;
}


// عند الضغط على زر إرسال الرسالة
const handleChat  = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage)return;
    
    // إضافة رسالة المستخدم إلى الشاشة
    chatMessages.appendChild(createChat(userMessage, "user-message"));
    setTimeout(scrollToBottom, 500); // التأخير لضمان تنفيذ التمرير بعد الإضافة


    setTimeout(()=>{
        
        // إضافة رسالة الروبوت إلى الشاشة
        const botResponse = createChat("..", "bot-message");
        chatMessages.appendChild(botResponse);
        genrateResponse(botResponse);
        scrollToBottom();
    },500);
    // dots.style.display = "block";
    
    // console.log(botResponse);
    chatInput.value = ""; // إفراغ حقل الإدخال

};

sendChatBtn.addEventListener('click', handleChat);