function sendJson() {
  window.fetch('/data', {
    method: 'POST',
    body: JSON.stringify({ value: 42 }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

async function test() {
  const socket = new window.WebSocket('ws://localhost:9000/ws')
  socket.addEventListener('open', function (event) {
    socket.send('Hello Server!')
  })
  socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data)
  })

  const response = await window.fetch('./data.json')
  const data = await response.json()
  const element = window.document.createElement('pre')
  element.innerHTML = JSON.stringify(data, null, 2)
  window.document.body.appendChild(element)
}

test()
