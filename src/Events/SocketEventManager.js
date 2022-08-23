export default class SocketEventManager {
  constructor (socket) {
    this.socket = socket
  }

  initListener(){
    this.socket.on('connect', () => {
      console.log(`Connected with ${this.socket.id}`)
      
    });
    this.socket.emit('hello')
  }
}