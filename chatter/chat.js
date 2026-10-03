/* =========================================================
   CHATTER
   FILE: chatter/chat.js
   VERSION: 1.0

   IMPORTANT:
   - No MediaRecorder
   - No video/audio recording
   - No media storage
   - Camera/Microphone/Screen Share require
     explicit user action + browser permission
   - Production real-time communication requires
     WebRTC signaling/backend
   ========================================================= */


/* =========================================================
   LOCAL STORAGE KEYS
   ========================================================= */

const CHATTER_SETTINGS_KEY = "chatterSystemSettings";
const CHATTER_PERMISSION_KEY = "chatterBrowserPermissions";
const CHATTER_SESSION_KEY = "chatterLiveSessions";


/* =========================================================
   DEFAULT SETTINGS
   ========================================================= */

const DEFAULT_SETTINGS = {
    chatterEnabled: true,

    messaging: true,

    voiceCall: true,
    videoCall: true,

    voiceMessages: true,

    camera: true,
    microphone: true,
    screenShare: true,

    fileSharing: true,
    imageSharing: true,

    typingIndicator: true,
    notifications: true
};


/* =========================================================
   DEFAULT PERMISSIONS
   ========================================================= */

const DEFAULT_PERMISSIONS = {
    camera: false,
    microphone: false,
    screenShare: false
};


/* =========================================================
   DEMO CONVERSATIONS
   ========================================================= */

const conversations = [
    {
        id: "admin",
        name: "System Admin",
        initials: "SA",
        status: "Online",
        online: true,
        color: "blue",
        lastMessage: "Welcome to Chatter",
        time: "Now",
        unread: 0
    },

    {
        id: "superadmin",
        name: "Super Admin",
        initials: "SA",
        status: "Online",
        online: true,
        color: "green",
        lastMessage: "Live monitoring is available",
        time: "10:42 PM",
        unread: 2
    },

    {
        id: "support",
        name: "Support Team",
        initials: "ST",
        status: "Online",
        online: true,
        color: "orange",
        lastMessage: "How can we help?",
        time: "9:30 PM",
        unread: 0
    },

    {
        id: "design",
        name: "Design Team",
        initials: "DT",
        status: "Offline",
        online: false,
        color: "blue",
        lastMessage: "New design is ready",
        time: "Yesterday",
        unread: 0
    }
];


/* =========================================================
   DEMO MESSAGES
   ========================================================= */

const messages = {

    admin: [
        {
            type: "other",
            text: "Welcome to Chatter.",
            time: "10:30 PM"
        },

        {
            type: "other",
            text: "This is your secure communication area.",
            time: "10:31 PM"
        },

        {
            type: "me",
            text: "Thank you.",
            time: "10:32 PM",
            seen: true
        },

        {
            type: "other",
            text: "You can use messaging, calls and live screen sharing here.",
            time: "10:33 PM"
        }
    ],

    superadmin: [
        {
            type: "other",
            text: "Super Admin is online.",
            time: "10:40 PM"
        },

        {
            type: "me",
            text: "Hello Super Admin.",
            time: "10:41 PM",
            seen: true
        }
    ],

    support: [
        {
            type: "other",
            text: "Hello! How can we help you?",
            time: "9:30 PM"
        }
    ],

    design: [
        {
            type: "other",
            text: "The new design is ready.",
            time: "Yesterday"
        }
    ]
};


/* =========================================================
   STATE
   ========================================================= */

let currentConversationId = "admin";

let systemSettings = {
    ...DEFAULT_SETTINGS
};

let browserPermissions = {
    ...DEFAULT_PERMISSIONS
};

let currentCallType = null;

let currentLocalStream = null;

let currentScreenStream = null;

let callActive = false;

let typingTimer = null;

let messageTypingTimer = null;


/* =========================================================
   DOM REFERENCES
   ========================================================= */

let app;

let conversationList;

let messagesContainer;

let messageInput;

let sendButton;

let searchInput;

let chatUserName;

let chatUserStatus;

let chatAvatar;

let typingElement;

let typingText;

let systemMessage;

let callModal;

let callTitle;

let callStatus;

let callEmpty;

let remoteVideo;

let localVideo;

let mobileBack;


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    cacheElements();

    loadSystemSettings();

    loadBrowserPermissions();

    renderConversations();

    openConversation(currentConversationId);

    bindEvents();

    updateInterface();

    listenForStorageChanges();

});


/* =========================================================
   CACHE DOM ELEMENTS
   ========================================================= */

function cacheElements() {

    app =
        document.querySelector(".app");

    conversationList =
        document.querySelector(".conversation-list");

    messagesContainer =
        document.querySelector(".messages");

    messageInput =
        document.querySelector(".message-input");

    sendButton =
        document.querySelector(".send-btn");

    searchInput =
        document.querySelector(".search-input");

    chatUserName =
        document.querySelector(".chat-user-name");

    chatUserStatus =
        document.querySelector(".chat-user-status");

    chatAvatar =
        document.querySelector(".chat-avatar");

    typingElement =
        document.querySelector(".typing");

    typingText =
        document.querySelector(".typing-inner");

    systemMessage =
        document.querySelector(".system-message");

    callModal =
        document.querySelector(".modal-backdrop");

    callTitle =
        document.querySelector(".call-title");

    callStatus =
        document.querySelector(".call-status");

    callEmpty =
        document.querySelector(".call-empty");

    remoteVideo =
        document.querySelector(".remote-video");

    localVideo =
        document.querySelector(".local-video");

    mobileBack =
        document.querySelector(".mobile-back");
}


/* =========================================================
   LOAD SYSTEM SETTINGS
   ========================================================= */

function loadSystemSettings() {

    try {

        const saved =
            localStorage.getItem(
                CHATTER_SETTINGS_KEY
            );

        if (!saved) {

            systemSettings =
                {
                    ...DEFAULT_SETTINGS
                };

            return;
        }

        const parsed =
            JSON.parse(saved);

        systemSettings = {
            ...DEFAULT_SETTINGS,
            ...parsed
        };

    } catch (error) {

        console.error(
            "Unable to load Chatter settings:",
            error
        );

        systemSettings =
            {
                ...DEFAULT_SETTINGS
            };
    }
}


/* =========================================================
   LOAD BROWSER PERMISSIONS
   ========================================================= */

function loadBrowserPermissions() {

    try {

        const saved =
            localStorage.getItem(
                CHATTER_PERMISSION_KEY
            );

        if (!saved) {

            browserPermissions =
                {
                    ...DEFAULT_PERMISSIONS
                };

            return;
        }

        const parsed =
            JSON.parse(saved);

        browserPermissions = {
            ...DEFAULT_PERMISSIONS,
            ...parsed
        };

    } catch (error) {

        console.error(
            "Unable to load browser permissions:",
            error
        );

        browserPermissions =
            {
                ...DEFAULT_PERMISSIONS
            };
    }
}


/* =========================================================
   SAVE BROWSER PERMISSIONS
   ========================================================= */

function saveBrowserPermissions() {

    try {

        localStorage.setItem(
            CHATTER_PERMISSION_KEY,
            JSON.stringify(
                browserPermissions
            )
        );

    } catch (error) {

        console.error(
            "Unable to save permissions:",
            error
        );
    }
}


/* =========================================================
   STORAGE CHANGE LISTENER
   ========================================================= */

function listenForStorageChanges() {

    window.addEventListener(
        "storage",
        (event) => {

            if (
                event.key ===
                CHATTER_SETTINGS_KEY
            ) {

                loadSystemSettings();

                updateInterface();

                showSystemMessage(
                    systemSettings.chatterEnabled
                        ? "Chatter system enabled."
                        : "Chatter system disabled by administrator."
                );
            }


            if (
                event.key ===
                CHATTER_PERMISSION_KEY
            ) {

                loadBrowserPermissions();

                updateInterface();
            }
        }
    );
}


/* =========================================================
   BIND EVENTS
   ========================================================= */

function bindEvents() {

    /* -----------------------------------------
       SEARCH
       ----------------------------------------- */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            handleSearch
        );
    }


    /* -----------------------------------------
       SEND MESSAGE
       ----------------------------------------- */

    if (sendButton) {

        sendButton.addEventListener(
            "click",
            sendMessage
        );
    }


    /* -----------------------------------------
       ENTER TO SEND
       ----------------------------------------- */

    if (messageInput) {

        messageInput.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter" &&
                    !event.shiftKey
                ) {

                    event.preventDefault();

                    sendMessage();

                    return;
                }

                handleTyping();
            }
        );

        messageInput.addEventListener(
            "input",
            autoResizeInput
        );
    }


    /* -----------------------------------------
       MOBILE BACK
       ----------------------------------------- */

    if (mobileBack) {

        mobileBack.addEventListener(
            "click",
            closeMobileChat
        );
    }


    /* -----------------------------------------
       CHAT ACTIONS
       ----------------------------------------- */

    document.addEventListener(
        "click",
        handleGlobalClick
    );


    /* -----------------------------------------
       FILE INPUT
       ----------------------------------------- */

    const fileInput =
        document.querySelector(
            "#fileInput"
        );

    if (fileInput) {

        fileInput.addEventListener(
            "change",
            handleFileSelection
        );
    }


    /* -----------------------------------------
       IMAGE INPUT
       ----------------------------------------- */

    const imageInput =
        document.querySelector(
            "#imageInput"
        );

    if (imageInput) {

        imageInput.addEventListener(
            "change",
            handleImageSelection
        );
    }
}


/* =========================================================
   GLOBAL CLICK HANDLER
   ========================================================= */

function handleGlobalClick(event) {

    const conversation =
        event.target.closest(
            "[data-conversation-id]"
        );

    if (conversation) {

        const id =
            conversation.dataset.conversationId;

        openConversation(id);

        return;
    }


    const callButton =
        event.target.closest(
            "[data-call-type]"
        );

    if (callButton) {

        const type =
            callButton.dataset.callType;

        startCall(type);

        return;
    }


    const sendButtonElement =
        event.target.closest(
            ".send-btn"
        );

    if (sendButtonElement) {

        sendMessage();

        return;
    }


    const closeCall =
        event.target.closest(
            "[data-close-call]"
        );

    if (closeCall) {

        endCall();

        return;
    }


    const callControl =
        event.target.closest(
            "[data-call-control]"
        );

    if (callControl) {

        const control =
            callControl.dataset.callControl;

        handleCallControl(control);

        return;
    }


    const emojiButton =
        event.target.closest(
            ".emoji-btn"
        );

    if (emojiButton) {

        insertEmoji();

        return;
    }


    const fileButton =
        event.target.closest(
            "[data-file-action]"
        );

    if (fileButton) {

        const action =
            fileButton.dataset.fileAction;

        handleFileAction(action);

        return;
    }
}


/* =========================================================
   RENDER CONVERSATIONS
   ========================================================= */

function renderConversations(
    filteredConversations = conversations
) {

    if (!conversationList) {
        return;
    }

    conversationList.innerHTML = "";


    if (
        !filteredConversations.length
    ) {

        conversationList.innerHTML = `
            <div
                style="
                    padding:30px 15px;
                    text-align:center;
                    color:#7b8498;
                    font-size:11px;
                "
            >
                No conversations found.
            </div>
        `;

        return;
    }


    filteredConversations.forEach(
        (conversation) => {

            const item =
                document.createElement("div");

            item.className =
                "conversation";

            if (
                conversation.id ===
                currentConversationId
            ) {

                item.classList.add("active");
            }

            item.dataset.conversationId =
                conversation.id;


            item.innerHTML = `

                <div class="avatar ${conversation.color}">
                    ${escapeHtml(
                        conversation.initials
                    )}

                    ${
                        conversation.online
                            ? `<span class="online-dot"></span>`
                            : ""
                    }
                </div>

                <div class="conversation-info">

                    <div class="conversation-top">

                        <div class="conversation-name">
                            ${escapeHtml(
                                conversation.name
                            )}
                        </div>

                        <div class="conversation-time">
                            ${escapeHtml(
                                conversation.time
                            )}
                        </div>

                    </div>

                    <div class="conversation-bottom">

                        <div class="conversation-message">
                            ${escapeHtml(
                                conversation.lastMessage
                            )}
                        </div>

                        ${
                            conversation.unread > 0
                                ? `
                                    <div class="unread">
                                        ${conversation.unread}
                                    </div>
                                `
                                : ""
                        }

                    </div>

                </div>
            `;


            conversationList.appendChild(item);
        }
    );
}


/* =========================================================
   OPEN CONVERSATION
   ========================================================= */

function openConversation(
    conversationId
) {

    const conversation =
        conversations.find(
            item =>
                item.id ===
                conversationId
        );


    if (!conversation) {
        return;
    }


    currentConversationId =
        conversationId;


    renderConversations();


    if (chatUserName) {

        chatUserName.textContent =
            conversation.name;
    }


    if (chatUserStatus) {

        chatUserStatus.textContent =
            conversation.online
                ? "Online"
                : "Offline";

        chatUserStatus.style.color =
            conversation.online
                ? "var(--success)"
                : "var(--muted)";
    }


    if (chatAvatar) {

        chatAvatar.textContent =
            conversation.initials;

        chatAvatar.className =
            `chat-avatar ${conversation.color}`;
    }


    renderMessages();


    if (app) {

        app.classList.add(
            "mobile-chat-open"
        );
    }


    clearUnread(
        conversationId
    );


    updateInterface();
}


/* =========================================================
   CLEAR UNREAD
   ========================================================= */

function clearUnread(
    conversationId
) {

    const conversation =
        conversations.find(
            item =>
                item.id ===
                conversationId
        );

    if (!conversation) {
        return;
    }

    conversation.unread = 0;

    renderConversations();
}


/* =========================================================
   RENDER MESSAGES
   ========================================================= */

function renderMessages() {

    if (!messagesContainer) {
        return;
    }


    messagesContainer.innerHTML = "";


    const currentMessages =
        messages[
            currentConversationId
        ] || [];


    if (!currentMessages.length) {

        messagesContainer.innerHTML = `
            <div class="empty-chat">

                <div class="empty-chat-inner">

                    <div class="empty-chat-icon">
                        💬
                    </div>

                    <div class="empty-chat-title">
                        Start a conversation
                    </div>

                    <div class="empty-chat-text">
                        Send your first message to begin chatting.
                    </div>

                </div>

            </div>
        `;

        return;
    }


    const divider =
        document.createElement("div");

    divider.className =
        "date-divider";

    divider.innerHTML =
        "<span>Today</span>";

    messagesContainer.appendChild(
        divider
    );


    currentMessages.forEach(
        (message) => {

            const row =
                document.createElement("div");

            row.className =
                `message-row ${
                    message.type === "me"
                        ? "me"
                        : ""
                }`;


            const avatar =
                document.createElement("div");

            avatar.className =
                "message-avatar";

            avatar.textContent =
                message.type === "me"
                    ? "ME"
                    : getCurrentConversationInitials();


            const content =
                document.createElement("div");

            content.className =
                "message-content";


            const bubble =
                document.createElement("div");

            bubble.className =
                "message-bubble";

            bubble.innerHTML =
                escapeHtml(
                    message.text
                );


            const meta =
                document.createElement("div");

            meta.className =
                "message-meta";


            const time =
                document.createElement("span");

            time.textContent =
                message.time ||
                getCurrentTime();


            meta.appendChild(time);


            if (
                message.type === "me" &&
                message.seen
            ) {

                const seen =
                    document.createElement("span");

                seen.className =
                    "seen";

                seen.textContent =
                    "Seen";

                meta.appendChild(seen);
            }


            content.appendChild(
                bubble
            );

            content.appendChild(
                meta
            );


            row.appendChild(
                avatar
            );

            row.appendChild(
                content
            );


            messagesContainer.appendChild(
                row
            );
        }
    );


    scrollMessagesToBottom();
}


/* =========================================================
   GET CURRENT CONVERSATION INITIALS
   ========================================================= */

function getCurrentConversationInitials() {

    const conversation =
        conversations.find(
            item =>
                item.id ===
                currentConversationId
        );

    return conversation
        ? conversation.initials
        : "US";
}


/* =========================================================
   SEND MESSAGE
   ========================================================= */

function sendMessage() {

    if (
        !systemSettings.chatterEnabled
    ) {

        showSystemMessage(
            "Chatter is currently disabled by the administrator."
        );

        return;
    }


    if (
        !systemSettings.messaging
    ) {

        showSystemMessage(
            "Messaging is disabled by the administrator."
        );

        return;
    }


    if (!messageInput) {
        return;
    }


    const text =
        messageInput.value.trim();


    if (!text) {
        return;
    }


    if (
        !messages[
            currentConversationId
        ]
    ) {

        messages[
            currentConversationId
        ] = [];
    }


    messages[
        currentConversationId
    ].push({

        type: "me",

        text: text,

        time: getCurrentTime(),

        seen: false
    });


    messageInput.value = "";

    autoResizeInput();


    updateConversationPreview(
        currentConversationId,
        text
    );


    renderMessages();


    simulateMessageDelivery();


    stopTypingIndicator();
}


/* =========================================================
   UPDATE CONVERSATION PREVIEW
   ========================================================= */

function updateConversationPreview(
    conversationId,
    text
) {

    const conversation =
        conversations.find(
            item =>
                item.id ===
                conversationId
        );

    if (!conversation) {
        return;
    }


    conversation.lastMessage =
        text;


    conversation.time =
        getCurrentTime();


    renderConversations();
}


/* =========================================================
   SIMULATE DELIVERY
   ========================================================= */

function simulateMessageDelivery() {

    setTimeout(
        () => {

            const currentMessages =
                messages[
                    currentConversationId
                ];

            if (!currentMessages) {
                return;
            }


            const lastMessage =
                currentMessages[
                    currentMessages.length - 1
                ];


            if (
                lastMessage &&
                lastMessage.type === "me"
            ) {

                lastMessage.seen =
                    true;

                renderMessages();
            }

        },
        700
    );
}


/* =========================================================
   TYPING HANDLER
   ========================================================= */

function handleTyping() {

    if (
        !systemSettings.typingIndicator
    ) {
        return;
    }


    if (
        !systemSettings.chatterEnabled
    ) {
        return;
    }


    showTypingIndicator();


    clearTimeout(
        typingTimer
    );


    typingTimer =
        setTimeout(
            stopTypingIndicator,
            1200
        );
}


/* =========================================================
   SHOW TYPING INDICATOR
   ========================================================= */

function showTypingIndicator() {

    if (!typingElement) {
        return;
    }


    typingElement.classList.add(
        "active"
    );


    if (typingText) {

        typingText.innerHTML = `
            <span>Typing</span>

            <span class="typing-dots">

                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>

            </span>
        `;
    }
}


/* =========================================================
   STOP TYPING INDICATOR
   ========================================================= */

function stopTypingIndicator() {

    if (!typingElement) {
        return;
    }

    typingElement.classList.remove(
        "active"
    );
}


/* =========================================================
   AUTO RESIZE MESSAGE INPUT
   ========================================================= */

function autoResizeInput() {

    if (!messageInput) {
        return;
    }


    messageInput.style.height =
        "auto";


    const height =
        Math.min(
            messageInput.scrollHeight,
            100
        );


    messageInput.style.height =
        `${height}px`;
}


/* =========================================================
   SEARCH
   ========================================================= */

function handleSearch(event) {

    const query =
        event.target.value
            .trim()
            .toLowerCase();


    if (!query) {

        renderConversations();

        return;
    }


    const filtered =
        conversations.filter(
            conversation =>
                conversation.name
                    .toLowerCase()
                    .includes(query) ||

                conversation.lastMessage
                    .toLowerCase()
                    .includes(query)
        );


    renderConversations(
        filtered
    );
}


/* =========================================================
   EMOJI
   ========================================================= */

function insertEmoji() {

    if (!messageInput) {
        return;
    }


    if (
        !systemSettings.messaging
    ) {

        showSystemMessage(
            "Messaging is disabled."
        );

        return;
    }


    const emoji =
        "😊";


    const start =
        messageInput.selectionStart;


    const end =
        messageInput.selectionEnd;


    const value =
        messageInput.value;


    messageInput.value =
        value.substring(
            0,
            start
        ) +
        emoji +
        value.substring(
            end
        );


    messageInput.focus();


    messageInput.selectionStart =
        messageInput.selectionEnd =
            start + emoji.length;


    autoResizeInput();
}


/* =========================================================
   FILE ACTION
   ========================================================= */

function handleFileAction(
    action
) {

    if (
        !systemSettings.chatterEnabled
    ) {

        showSystemMessage(
            "Chatter is disabled."
        );

        return;
    }


    if (
        action === "file"
    ) {

        if (
            !systemSettings.fileSharing
        ) {

            showSystemMessage(
                "File sharing is disabled by administrator."
            );

            return;
        }


        const input =
            document.querySelector(
                "#fileInput"
            );


        if (input) {
            input.click();
        }


        return;
    }


    if (
        action === "image"
    ) {

        if (
            !systemSettings.imageSharing
        ) {

            showSystemMessage(
                "Image sharing is disabled by administrator."
            );

            return;
        }


        const input =
            document.querySelector(
                "#imageInput"
            );


        if (input) {
            input.click();
        }


        return;
    }


    if (
        action === "camera"
    ) {

        startCameraPreview();
    }
}


/* =========================================================
   FILE SELECTION
   ========================================================= */

function handleFileSelection(
    event
) {

    const file =
        event.target.files &&
        event.target.files[0];


    if (!file) {
        return;
    }


    if (
        !systemSettings.fileSharing
    ) {

        showSystemMessage(
            "File sharing is disabled."
        );

        event.target.value = "";

        return;
    }


    addLocalAttachmentMessage(
        `File selected: ${file.name}`
    );


    event.target.value = "";
}


/* =========================================================
   IMAGE SELECTION
   ========================================================= */

function handleImageSelection(
    event
) {

    const file =
        event.target.files &&
        event.target.files[0];


    if (!file) {
        return;
    }


    if (
        !systemSettings.imageSharing
    ) {

        showSystemMessage(
            "Image sharing is disabled."
        );

        event.target.value = "";

        return;
    }


    if (
        !file.type.startsWith(
            "image/"
        )
    ) {

        showSystemMessage(
            "Please select a valid image."
        );

        event.target.value = "";

        return;
    }


    addLocalAttachmentMessage(
        `Image selected: ${file.name}`
    );


    event.target.value = "";
}


/* =========================================================
   ADD LOCAL ATTACHMENT MESSAGE
   ========================================================= */

function addLocalAttachmentMessage(
    text
) {

    if (
        !messages[
            currentConversationId
        ]
    ) {

        messages[
            currentConversationId
        ] = [];
    }


    messages[
        currentConversationId
    ].push({

        type: "me",

        text: text,

        time: getCurrentTime(),

        seen: false
    });


    updateConversationPreview(
        currentConversationId,
        text
    );


    renderMessages();
}


/* =========================================================
   CAMERA PREVIEW
   ========================================================= */

async function startCameraPreview() {

    if (
        !systemSettings.camera
    ) {

        showSystemMessage(
            "Camera access is disabled by administrator."
        );

        return;
    }


    if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
    ) {

        showSystemMessage(
            "This browser does not support camera access."
        );

        return;
    }


    try {

        const stream =
            await navigator.mediaDevices
                .getUserMedia({
                    video: true,
                    audio: false
                });


        browserPermissions.camera =
            true;


        saveBrowserPermissions();


        openLocalVideoPreview(
            stream
        );


        showSystemMessage(
            "Camera permission granted. Live preview started."
        );

    } catch (error) {

        browserPermissions.camera =
            false;


        saveBrowserPermissions();


        handleMediaError(
            error,
            "camera"
        );
    }
}


/* =========================================================
   MICROPHONE PERMISSION
   ========================================================= */

async function requestMicrophonePermission() {

    if (
        !systemSettings.microphone
    ) {

        showSystemMessage(
            "Microphone access is disabled by administrator."
        );

        return null;
    }


    if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
    ) {

        showSystemMessage(
            "This browser does not support microphone access."
        );

        return null;
    }


    try {

        const stream =
            await navigator.mediaDevices
                .getUserMedia({
                    audio: true,
                    video: false
                });


        browserPermissions.microphone =
            true;


        saveBrowserPermissions();


        return stream;

    } catch (error) {

        browserPermissions.microphone =
            false;


        saveBrowserPermissions();


        handleMediaError(
            error,
            "microphone"
        );


        return null;
    }
}


/* =========================================================
   SCREEN SHARE
   ========================================================= */

async function startScreenShare() {

    if (
        !systemSettings.screenShare
    ) {

        showSystemMessage(
            "Screen sharing is disabled by administrator."
        );

        return;
    }


    if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getDisplayMedia
    ) {

        showSystemMessage(
            "This browser does not support screen sharing."
        );

        return;
    }


    try {

        const stream =
            await navigator.mediaDevices
                .getDisplayMedia({
                    video: true,
                    audio: false
                });


        browserPermissions.screenShare =
            true;


        saveBrowserPermissions();


        currentScreenStream =
            stream;


        openScreenSharePreview(
            stream
        );


        const videoTrack =
            stream.getVideoTracks()[0];


        if (videoTrack) {

            videoTrack.addEventListener(
                "ended",
                () => {

                    stopScreenShare();

                }
            );
        }


        showSystemMessage(
            "Screen sharing started. You can stop it at any time."
        );

    } catch (error) {

        browserPermissions.screenShare =
            false;


        saveBrowserPermissions();


        handleMediaError(
            error,
            "screen"
        );
    }
}


/* =========================================================
   OPEN LOCAL VIDEO PREVIEW
   ========================================================= */

function openLocalVideoPreview(
    stream
) {

    if (!localVideo) {
        stopStream(stream);
        return;
    }


    stopCurrentLocalStream();


    currentLocalStream =
        stream;


    localVideo.srcObject =
        stream;


    localVideo.classList.add(
        "active"
    );


    localVideo.muted =
        true;


    const callModalExists =
        callModal &&
        callModal.classList.contains(
            "show"
        );


    if (!callModalExists) {

        openCallModal(
            "Camera Preview"
        );

        callStatus.textContent =
            "Local camera preview";
    }
}


/* =========================================================
   OPEN SCREEN SHARE PREVIEW
   ========================================================= */

function openScreenSharePreview(
    stream
) {

    if (!remoteVideo) {
        stopStream(stream);
        return;
    }


    stopCurrentScreenStream();


    currentScreenStream =
        stream;


    remoteVideo.srcObject =
        stream;


    remoteVideo.classList.add(
        "active"
    );


    remoteVideo.muted =
        true;


    if (callEmpty) {

        callEmpty.style.display =
            "none";
    }


    openCallModal(
        "Screen Share"
    );


    if (callStatus) {

        callStatus.textContent =
            "Live screen sharing";
    }
}


/* =========================================================
   START CALL
   ========================================================= */

async function startCall(
    type
) {

    if (
        !systemSettings.chatterEnabled
    ) {

        showSystemMessage(
            "Chatter is currently disabled."
        );

        return;
    }


    if (
        type === "voice"
    ) {

        await startVoiceCall();

        return;
    }


    if (
        type === "video"
    ) {

        await startVideoCall();

        return;
    }


    if (
        type === "screen"
    ) {

        await startScreenShare();

        return;
    }
}


/* =========================================================
   VOICE CALL
   ========================================================= */

async function startVoiceCall() {

    if (
        !systemSettings.voiceCall
    ) {

        showSystemMessage(
            "Voice calls are disabled by administrator."
        );

        return;
    }


    if (
        !systemSettings.microphone
    ) {

        showSystemMessage(
            "Microphone is disabled by administrator."
        );

        return;
    }


    const stream =
        await requestMicrophonePermission();


    if (!stream) {
        return;
    }


    stopCurrentLocalStream();


    currentLocalStream =
        stream;


    currentCallType =
        "voice";


    callActive =
        true;


    openCallModal(
        "Voice Call"
    );


    if (callStatus) {

        callStatus.textContent =
            "Microphone connected • Live call";
    }


    if (callEmpty) {

        callEmpty.style.display =
            "block";

        callEmpty.innerHTML = `
            <div class="call-empty-icon">
                📞
            </div>

            <div class="call-empty-title">
                Voice call started
            </div>

            <div class="call-empty-text">
                Live voice communication is ready.
                No recording or call history is stored.
            </div>
        `;
    }


    updateLiveSession(
        "voice"
    );
}


/* =========================================================
   VIDEO CALL
   ========================================================= */

async function startVideoCall() {

    if (
        !systemSettings.videoCall
    ) {

        showSystemMessage(
            "Video calls are disabled by administrator."
        );

        return;
    }


    if (
        !systemSettings.camera
    ) {

        showSystemMessage(
            "Camera is disabled by administrator."
        );

        return;
    }


    if (
        !systemSettings.microphone
    ) {

        showSystemMessage(
            "Microphone is disabled by administrator."
        );

        return;
    }


    if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
    ) {

        showSystemMessage(
            "This browser does not support video calls."
        );

        return;
    }


    try {

        const stream =
            await navigator.mediaDevices
                .getUserMedia({
                    video: true,
                    audio: true
                });


        browserPermissions.camera =
            true;


        browserPermissions.microphone =
            true;


        saveBrowserPermissions();


        stopCurrentLocalStream();


        currentLocalStream =
            stream;


        currentCallType =
            "video";


        callActive =
            true;


        openCallModal(
            "Video Call"
        );


        if (localVideo) {

            localVideo.srcObject =
                stream;

            localVideo.muted =
                true;

            localVideo.classList.add(
                "active"
            );
        }


        if (callEmpty) {

            callEmpty.style.display =
                "block";

            callEmpty.innerHTML = `
                <div class="call-empty-icon">
                    📹
                </div>

                <div class="call-empty-title">
                    Video call started
                </div>

                <div class="call-empty-text">
                    Live camera communication is ready.
                    No recording or video history is stored.
                </div>
            `;
        }


        if (callStatus) {

            callStatus.textContent =
                "Camera + microphone connected";
        }


        updateLiveSession(
            "video"
        );

    } catch (error) {

        browserPermissions.camera =
            false;

        browserPermissions.microphone =
            false;

        saveBrowserPermissions();

        handleMediaError(
            error,
            "camera and microphone"
        );
    }
}


/* =========================================================
   OPEN CALL MODAL
   ========================================================= */

function openCallModal(
    title
) {

    if (!callModal) {
        return;
    }


    callModal.classList.add(
        "show"
    );


    if (callTitle) {

        callTitle.textContent =
            title;
    }


    if (callStatus) {

        callStatus.textContent =
            "Connecting...";
    }


    if (callEmpty) {

        callEmpty.style.display =
            "block";
    }


    if (remoteVideo) {

        remoteVideo.classList.remove(
            "active"
        );

        remoteVideo.srcObject =
            null;
    }
}


/* =========================================================
   HANDLE CALL CONTROL
   ========================================================= */

function handleCallControl(
    control
) {

    switch (control) {

        case "microphone":

            toggleMicrophone();

            break;


        case "camera":

            toggleCamera();

            break;


        case "screen":

            startScreenShare();

            break;


        case "mute-preview":

            togglePreviewMute();

            break;


        case "end":

            endCall();

            break;
    }
}


/* =========================================================
   TOGGLE MICROPHONE
   ========================================================= */

function toggleMicrophone() {

    if (
        !currentLocalStream
    ) {

        showSystemMessage(
            "No active microphone stream."
        );

        return;
    }


    const tracks =
        currentLocalStream
            .getAudioTracks();


    if (!tracks.length) {

        showSystemMessage(
            "No microphone track is active."
        );

        return;
    }


    const nextState =
        !tracks[0].enabled;


    tracks.forEach(
        track => {

            track.enabled =
                nextState;
        }
    );


    showSystemMessage(
        nextState
            ? "Microphone enabled."
            : "Microphone muted."
    );
}


/* =========================================================
   TOGGLE CAMERA
   ========================================================= */

function toggleCamera() {

    if (
        !currentLocalStream
    ) {

        showSystemMessage(
            "No active camera stream."
        );

        return;
    }


    const tracks =
        currentLocalStream
            .getVideoTracks();


    if (!tracks.length) {

        showSystemMessage(
            "No camera track is active."
        );

        return;
    }


    const nextState =
        !tracks[0].enabled;


    tracks.forEach(
        track => {

            track.enabled =
                nextState;
        }
    );


    showSystemMessage(
        nextState
            ? "Camera enabled."
            : "Camera turned off."
    );
}


/* =========================================================
   TOGGLE PREVIEW MUTE
   ========================================================= */

function togglePreviewMute() {

    if (!remoteVideo) {
        return;
    }


    remoteVideo.muted =
        !remoteVideo.muted;


    showSystemMessage(
        remoteVideo.muted
            ? "Preview muted."
            : "Preview audio enabled."
    );
}


/* =========================================================
   END CALL
   ========================================================= */

function endCall() {

    stopCurrentLocalStream();

    stopCurrentScreenStream();


    currentCallType =
        null;


    callActive =
        false;


    if (callModal) {

        callModal.classList.remove(
            "show"
        );
    }


    if (remoteVideo) {

        remoteVideo.srcObject =
            null;

        remoteVideo.classList.remove(
            "active"
        );
    }


    if (localVideo) {

        localVideo.srcObject =
            null;

        localVideo.classList.remove(
            "active"
        );
    }


    if (callEmpty) {

        callEmpty.style.display =
            "block";
    }


    removeLiveSession();


    showSystemMessage(
        "Live session ended. No recording was stored."
    );
}


/* =========================================================
   STOP LOCAL STREAM
   ========================================================= */

function stopCurrentLocalStream() {

    if (
        currentLocalStream
    ) {

        stopStream(
            currentLocalStream
        );

        currentLocalStream =
            null;
    }


    if (localVideo) {

        localVideo.srcObject =
            null;

        localVideo.classList.remove(
            "active"
        );
    }
}


/* =========================================================
   STOP SCREEN STREAM
   ========================================================= */

function stopCurrentScreenStream() {

    if (
        currentScreenStream
    ) {

        stopStream(
            currentScreenStream
        );

        currentScreenStream =
            null;
    }


    if (remoteVideo) {

        remoteVideo.srcObject =
            null;

        remoteVideo.classList.remove(
            "active"
        );
    }
}


/* =========================================================
   STOP SCREEN SHARE
   ========================================================= */

function stopScreenShare() {

    stopCurrentScreenStream();


    browserPermissions.screenShare =
        false;


    saveBrowserPermissions();


    if (
        currentCallType === "screen"
    ) {

        currentCallType =
            null;

        callActive =
            false;

        removeLiveSession();

        if (callModal) {

            callModal.classList.remove(
                "show"
            );
        }
    }


    showSystemMessage(
        "Screen sharing ended."
    );
}


/* =========================================================
   STOP STREAM
   ========================================================= */

function stopStream(
    stream
) {

    if (!stream) {
        return;
    }


    try {

        stream.getTracks()
            .forEach(
                track => {

                    track.stop();
                }
            );

    } catch (error) {

        console.error(
            "Unable to stop stream:",
            error
        );
    }
}


/* =========================================================
   HANDLE MEDIA ERROR
   ========================================================= */

function handleMediaError(
    error,
    source
) {

    console.error(
        `${source} error:`,
        error
    );


    if (
        error &&
        error.name ===
        "NotAllowedError"
    ) {

        showSystemMessage(
            `Browser permission for ${source} was denied.`
        );

        return;
    }


    if (
        error &&
        error.name ===
        "NotFoundError"
    ) {

        showSystemMessage(
            `No ${source} device was found.`
        );

        return;
    }


    if (
        error &&
        error.name ===
        "NotReadableError"
    ) {

        showSystemMessage(
            `${source} is already being used by another application.`
        );

        return;
    }


    showSystemMessage(
        `Unable to access ${source}.`
    );
}


/* =========================================================
   LIVE SESSION STATE
   ========================================================= */

function updateLiveSession(
    type
) {

    const sessions =
        getLiveSessions();


    const sessionId =
        getSessionId();


    const conversation =
        conversations.find(
            item =>
                item.id ===
                currentConversationId
        );


    sessions[sessionId] = {

        id: sessionId,

        user:
            getCurrentUserName(),

        conversation:
            conversation
                ? conversation.name
                : "Unknown",

        type: type,

        active: true,

        startedAt:
            new Date().toISOString(),

        recording: false
    };


    saveLiveSessions(
        sessions
    );
}


/* =========================================================
   GET LIVE SESSIONS
   ========================================================= */

function getLiveSessions() {

    try {

        const saved =
            localStorage.getItem(
                CHATTER_SESSION_KEY
            );


        if (!saved) {
            return {};
        }


        const parsed =
            JSON.parse(saved);


        if (
            !parsed ||
            typeof parsed !==
            "object"
        ) {

            return {};
        }


        return parsed;

    } catch (error) {

        console.error(
            "Unable to read live sessions:",
            error
        );

        return {};
    }
}


/* =========================================================
   SAVE LIVE SESSIONS
   ========================================================= */

function saveLiveSessions(
    sessions
) {

    try {

        localStorage.setItem(
            CHATTER_SESSION_KEY,
            JSON.stringify(
                sessions
            )
        );

    } catch (error) {

        console.error(
            "Unable to save live session:",
            error
        );
    }
}


/* =========================================================
   REMOVE LIVE SESSION
   ========================================================= */

function removeLiveSession() {

    const sessions =
        getLiveSessions();


    const sessionId =
        getSessionId();


    if (
        sessions[sessionId]
    ) {

        delete sessions[
            sessionId
        ];
    }


    saveLiveSessions(
        sessions
    );
}


/* =========================================================
   SESSION ID
   ========================================================= */

function getSessionId() {

    let id =
        sessionStorage.getItem(
            "chatterSessionId"
        );


    if (!id) {

        id =
            `session-${Date.now()}-${Math.random()
                .toString(36)
                .slice(2, 9)}`;


        sessionStorage.setItem(
            "chatterSessionId",
            id
        );
    }


    return id;
}


/* =========================================================
   CURRENT USER NAME
   ========================================================= */

function getCurrentUserName() {

    try {

        const session =
            localStorage.getItem(
                "chatterAdminSession"
            );


        if (!session) {
            return "Chatter User";
        }


        const parsed =
            JSON.parse(session);


        return (
            parsed.name ||
            parsed.email ||
            "Chatter User"
        );

    } catch (error) {

        return "Chatter User";
    }
}


/* =========================================================
   UPDATE INTERFACE
   ========================================================= */

function updateInterface() {

    const systemOn =
        systemSettings.chatterEnabled;


    if (app) {

        app.classList.toggle(
            "system-disabled",
            !systemOn
        );
    }


    updateMessagingUI(
        systemOn
    );


    updateCallButtons(
        systemOn
    );


    updateComposerTools(
        systemOn
    );


    updateNotificationPermission();
}


/* =========================================================
   UPDATE MESSAGING UI
   ========================================================= */

function updateMessagingUI(
    systemOn
) {

    if (!messageInput) {
        return;
    }


    const enabled =
        systemOn &&
        systemSettings.messaging;


    messageInput.disabled =
        !enabled;


    if (!enabled) {

        messageInput.placeholder =
            "Messaging is disabled";

    } else {

        messageInput.placeholder =
            "Write a message...";
    }


    if (sendButton) {

        sendButton.disabled =
            !enabled;

        sendButton.classList.toggle(
            "disabled",
            !enabled
        );
    }
}


/* =========================================================
   UPDATE CALL BUTTONS
   ========================================================= */

function updateCallButtons(
    systemOn
) {

    const callButtons =
        document.querySelectorAll(
            "[data-call-type]"
        );


    callButtons.forEach(
        button => {

            const type =
                button.dataset.callType;


            let enabled =
                systemOn;


            if (
                type === "voice"
            ) {

                enabled =
                    enabled &&
                    systemSettings.voiceCall &&
                    systemSettings.microphone;
            }


            if (
                type === "video"
            ) {

                enabled =
                    enabled &&
                    systemSettings.videoCall &&
                    systemSettings.camera &&
                    systemSettings.microphone;
            }


            if (
                type === "screen"
            ) {

                enabled =
                    enabled &&
                    systemSettings.screenShare;
            }


            button.disabled =
                !enabled;


            button.classList.toggle(
                "disabled",
                !enabled
            );
        }
    );
}


/* =========================================================
   UPDATE COMPOSER TOOLS
   ========================================================= */

function updateComposerTools(
    systemOn
) {

    const tools =
        document.querySelectorAll(
            "[data-file-action]"
        );


    tools.forEach(
        button => {

            const action =
                button.dataset.fileAction;


            let enabled =
                systemOn;


            if (
                action === "file"
            ) {

                enabled =
                    enabled &&
                    systemSettings.fileSharing;
            }


            if (
                action === "image"
            ) {

                enabled =
                    enabled &&
                    systemSettings.imageSharing;
            }


            if (
                action === "camera"
            ) {

                enabled =
                    enabled &&
                    systemSettings.camera;
            }


            button.disabled =
                !enabled;


            button.classList.toggle(
                "disabled",
                !enabled
            );
        }
    );
}


/* =========================================================
   NOTIFICATION PERMISSION
   ========================================================= */

function updateNotificationPermission() {

    if (
        !systemSettings.notifications
    ) {
        return;
    }


    if (
        !("Notification" in window)
    ) {
        return;
    }


    if (
        Notification.permission ===
        "default"
    ) {

        /*
         * Do not request notification permission
         * automatically.
         *
         * Browser permission must be requested
         * after an intentional user action.
         */
    }
}


/* =========================================================
   REQUEST NOTIFICATION
   ========================================================= */

async function requestNotificationPermission() {

    if (
        !systemSettings.notifications
    ) {

        showSystemMessage(
            "Notifications are disabled by administrator."
        );

        return false;
    }


    if (
        !("Notification" in window)
    ) {

        showSystemMessage(
            "Notifications are not supported by this browser."
        );

        return false;
    }


    try {

        const result =
            await Notification.requestPermission();


        if (
            result === "granted"
        ) {

            showSystemMessage(
                "Notifications enabled."
            );

            return true;
        }


        showSystemMessage(
            "Notification permission was not granted."
        );


        return false;

    } catch (error) {

        console.error(
            "Notification permission error:",
            error
        );

        return false;
    }
}


/* =========================================================
   SHOW NOTIFICATION
   ========================================================= */

function showNotification(
    title,
    body
) {

    if (
        !systemSettings.notifications
    ) {
        return;
    }


    if (
        !("Notification" in window)
    ) {
        return;
    }


    if (
        Notification.permission !==
        "granted"
    ) {
        return;
    }


    try {

        new Notification(
            title,
            {
                body: body
            }
        );

    } catch (error) {

        console.error(
            "Notification error:",
            error
        );
    }
}


/* =========================================================
   MOBILE CHAT CLOSE
   ========================================================= */

function closeMobileChat() {

    if (!app) {
        return;
    }


    app.classList.remove(
        "mobile-chat-open"
    );
}


/* =========================================================
   SHOW SYSTEM MESSAGE
   ========================================================= */

function showSystemMessage(
    message
) {

    if (!systemMessage) {

        console.log(
            message
        );

        return;
    }


    systemMessage.textContent =
        message;


    systemMessage.classList.add(
        "show"
    );


    clearTimeout(
        messageTypingTimer
    );


    messageTypingTimer =
        setTimeout(
            () => {

                systemMessage.classList.remove(
                    "show"
                );

            },
            3500
        );
}


/* =========================================================
   SCROLL MESSAGES
   ========================================================= */

function scrollMessagesToBottom() {

    if (!messagesContainer) {
        return;
    }


    requestAnimationFrame(
        () => {

            messagesContainer.scrollTop =
                messagesContainer.scrollHeight;
        }
    );
}


/* =========================================================
   CURRENT TIME
   ========================================================= */

function getCurrentTime() {

    const now =
        new Date();


    return now.toLocaleTimeString(
        [],
        {
            hour: "numeric",
            minute: "2-digit"
        }
    );
}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHtml(
    value
) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );
}


/* =========================================================
   BEFORE PAGE CLOSE
   ========================================================= */

window.addEventListener(
    "beforeunload",
    () => {

        /*
         * Stop all live media immediately.
         *
         * Nothing is recorded or stored.
         */

        stopCurrentLocalStream();

        stopCurrentScreenStream();

        removeLiveSession();
    }
);


/* =========================================================
   VISIBILITY CHANGE
   ========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.visibilityState ===
            "visible"
        ) {

            loadSystemSettings();

            loadBrowserPermissions();

            updateInterface();
        }
    }
);


/* =========================================================
   PUBLIC DEBUG API
   Optional developer helpers.
   ========================================================= */

window.Chatter = {

    getSettings: () => ({
        ...systemSettings
    }),

    getPermissions: () => ({
        ...browserPermissions
    }),

    getLiveSessions: () =>
        getLiveSessions(),

    requestMicrophonePermission:
        requestMicrophonePermission,

    requestNotificationPermission:
        requestNotificationPermission,

    startScreenShare:
        startScreenShare,

    endCall:
        endCall
};


/* =========================================================
   END CHATTER JAVASCRIPT
   ========================================================= */
