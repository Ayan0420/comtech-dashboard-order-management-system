

const {useState, useEffect} = React;
const {Modal, Button} = ReactBootstrap;

/**
 * Message Card Component
 */
function Message(props){
    const { id,
            name, 
            contact,
            message, 
            timestamp,
            fromNow, 
            isRead, 
            isReplied,
            updateTheState,
    } = props

    const [highlight, setHighlight] = useState(false)

    function openMessage(){
        Swal.fire({
            html: `
                <div>
                    <h5 class="text-center fw-bold">MESSAGE</h5>
                    <hr>
                    <p class="mb-1 text-end small">${timestamp} (${fromNow})</p>
                    <p class="mb-0 text-start"><strong>From:</strong> ${name}</p>
                    <p class="mb-0 text-start"><strong>Contact:</strong> ${contact}</p>
                    <hr>
                    <p class="mb-2 fw-bold text-start">Message Body:</p>
                    <p class="mb-0 text-start">${message}</p>
                </div>
            `,
            confirmButtonText: 'Close',
            confirmButtonColor: '#4b4b4b',
            toast: false,
            allowOutsideClick: false 
          })
        // console.log('id', id)
        fetch('http://localhost:4000/messaging/mark-as-read', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.response === true){
                updateTheState()
            }

        })
        .catch(err => {
            console.log('Error Fetching Data from Messaging API: ', err)
        })
    }

    function markAsRead(){
        fetch('http://localhost:4000/messaging/mark-as-read', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.response === true){
                updateTheState()
            }

        })
        .catch(err => {
            console.log('Error Fetching Data from Messaging API: ', err)
        })
    }
    
    function markAsUnread(){
        fetch('http://localhost:4000/messaging/mark-as-unread', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.response === true){
                updateTheState()
            }

        })
        .catch(err => {
            console.log('Error Fetching Data from Messaging API: ', err)
        })
    }

    function deleteMessage(){
        setHighlight(true);
        Swal.fire({
            title: `Are you sure you want to delete this message by ${name}?`,
            showDenyButton: true,
            denyButtonText: 'Cancel',
            denyButtonColor: "#4b4b4b",
            confirmButtonText: 'Delete',
            confirmButtonColor: "#ff4343"
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */

            if (result.isConfirmed) {
                setHighlight(false);
                fetch('http://localhost:4000/messaging/delete', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: id
                    })
                })
                .then(res => res.json())
                .then(data => {
                    if(data.response === true){
                        updateTheState()
                    }

                })
                .catch(err => {
                    console.log('Error Fetching Data from Messaging API: ', err)
                })
              Swal.fire('Deleted Successfully!', '', 'success')
            } else if(result.isDenied || result.isDismissed){
                setHighlight(false);
                // Swal.fire('Cancelled!', '')
            }
          })  
    }

    function markAsReplied(){

        fetch('http://localhost:4000/messaging/mark-as-replied', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.response === true){
                updateTheState()
            }

        })
        .catch(err => {
            console.log('Error Fetching Data from Messaging API: ', err)
        })
    }

    function markAsNotReplied(){
        fetch('http://localhost:4000/messaging/mark-as-notreplied', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.response === true){
                updateTheState()
            }

        })
        .catch(err => {
            console.log('Error Fetching Data from Messaging API: ', err)
        })
    }

    return(
        <div className={`card m-1 px-2 py-1 message-card ${isRead ? '' : 'bg-lightDark fw-bold'} ${highlight ? 'bg-danger' : ''}`}>
            <div onClick={openMessage}>
                <p className="mb-0 text-end small">{fromNow}</p>
                <p className="mb-0 fs-5">{name}</p>
                <p className="mb-1 small border-bottom">{contact}</p>
            </div>
            <div class="my-0 d-flex">
                
                <p className="mb-0 small">{message.slice(0, 20)}...</p>
                <i onClick={deleteMessage} className="ms-auto me-2 fa-solid fa-trash-can unread" title="Delete Message"></i>

                {(isRead) ? 
                    <i onClick={markAsUnread} className="fa-solid me-2 fa-envelope-open unread" title="Mark as unread"></i>
                    :
                    <i onClick={markAsRead} className="fa-solid me-2 fa-envelope unread" title="Mark as read"></i>
                }
                
                {(isReplied) ? 
                    <i onClick={markAsNotReplied} className="fa-solid fa-check unread text-success" title="Mark as Not Replied"></i>
                    :
                    <i onClick={markAsReplied} className="fa-solid fa-comment-dots unread" title="Mark as Replied"></i>
                }
            </div>
        </div>
    )
}

/**
 * Message Modal Component
 */
function AllMessages({messages, updateTheState, refreshState}){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function markAllAsRead(isReadAll){
        fetch('http://localhost:4000/messaging/mark-all-as-read', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                isReadAll: isReadAll
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.response === true){
                updateTheState()
            }

        })
        .catch(err => {
            console.log('Error Fetching Data from Messaging API: ', err)
        })
    }

    function markAllAsReplied(isRepliedAll){
        fetch('http://localhost:4000/messaging/mark-all-as-replied', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                isRepliedAll: isRepliedAll
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.response === true){
                updateTheState()
            }

        })
        .catch(err => {
            console.log('Error Fetching Data from Messaging API: ', err)
        })
    }
    
    return (
        <div>
            <div className='text-center my-3'>
                <Button variant="primary" onClick={handleShow}>
                    See all messages
                </Button>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>All Messages<i onClick={refreshState} className="fa-solid fa-refresh text-info ms-2 unread" title="Refresh messages"></i></Modal.Title>
                </Modal.Header>
                <Modal.Body>

                <div className="mb-3 bg-light p-2 rounded-1 shadow-sm d-flex">
                    <span className="me-2">
                        All: <strong>{messages.length}</strong>
                    </span>
                    <span className="me-2">
                        Unread: <strong>{messages.filter((message) => {return message.isRead === false}).length}</strong>
                    </span>
                    <span className="me-2">
                        Replied: <strong>{messages.filter((message) => {return message.isReplied === true}).length}</strong>
                    </span>
                    <div className="ms-auto">
                        <p onClick={() => markAllAsRead(true)} className='m-0 text-decoration-underline'>Mark All as Read</p>
                        <p onClick={() => markAllAsReplied(true)} className='m-0 text-decoration-underline'>Mark All as Replied</p>
                    </div>
                </div>
                
                {/* Message Cards */}
                { (messages.length === 0) ? <div className="text-center py-5">Message is empty.</div>
                :
                    messages.map(msg => {
                        // console.log('msg.id', msg.id)
                        return <Message 
                            id={msg.id}
                            name={msg.name}
                            contact={msg.contact}
                            message={msg.message}
                            timestamp={msg.createdAt}
                            fromNow={msg.createdFromNow}
                            isRead={msg.isRead}
                            isReplied={msg.isReplied}
                            updateTheState={updateTheState}
                        />
                    })
                }
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" size='sm' onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            
            </Modal>
        </div>
    );
}

/**
 * Main Component
 */
function Main(){   
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [stateUpdate, setStateUpdate] = useState(0);
    const [permissionDenied, setPermissionDenied] = useState(false)

    useEffect(() => {
        fetch('http://localhost:4000/messaging')
        .then(res => res.json())
        .then(data => {
            if(data.response === false){
                setPermissionDenied(true);
            } else {
                setPermissionDenied(false);
            }
           setMessages(data);
           setIsLoading(false);
        })
        .catch(err => {
            console.log('Error Fetching Data from Messaging API: ', err)
        })
    }, [stateUpdate]);

    function updateTheState(){
        if(stateUpdate === 0){
            setStateUpdate(1)
        }
        if(stateUpdate === 1){
            setStateUpdate(0)
        }
    }

    function refreshState(){
        let timerInterval
        Swal.fire({
        title: 'Refreshing messages!',
        timer: 700,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft()
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
        }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            if(stateUpdate === 0){
                setStateUpdate(1)
            }
            if(stateUpdate === 1){
                setStateUpdate(0)
            }
        }
        })
    }

    return (
        (isLoading) ? <div className="p-2 mb-5">Loading All Messages...</div>
        : (permissionDenied) ? <div className="p-2 mb-5">Access Denied</div>
        :
        <div className="p-2 cus-shadow messaging mb-5">
            <div className="d-flex border-bottom px-1 pb-2 align-items-center">
                <h5 className="fw-bold text-primary m-0">{`Messages (${messages.filter((message) => {return message.isRead === false}).length})`}</h5>
                <i onClick={refreshState} className="fa-solid fa-refresh text-info ms-2 unread" title="Refresh messages"></i>
                <i className="ms-auto fa-solid fa-circle small text-green" title="Status: Online"></i>
            </div>
            <p className="mb-3 small text-center border-bottom py-2">These are the messages sent from the contact form of our website.</p>

            { (messages.length === 0) ? <div className="text-center py-5">Message is empty.</div>
            :
                messages.slice(0,6).map(msg => {
                    // console.log('msg.id', msg.id)
                    return <Message 
                        id={msg.id}
                        name={msg.name}
                        contact={msg.contact}
                        message={msg.message}
                        timestamp={msg.createdAt}
                        fromNow={msg.createdFromNow}
                        isRead={msg.isRead}
                        isReplied={msg.isReplied}
                        updateTheState={updateTheState}
                    />
                })
            }

            <AllMessages 
                messages={messages} 
                updateTheState={updateTheState}
                refreshState = {refreshState}
            />
           
        </div>
    )
}

ReactDOM.render(<Main/>, document.getElementById('messaging'))