import { io } from 'socket.io-client'
import SocketEventManager from '../Events/SocketEventManager'

const socket = io('http://localhost:8080')

export default class GameManager {
  constructor() {
    this.socketManager = new SocketEventManager(socket)
  }

  init(){
    this.socketManager.initListener()
  }
}