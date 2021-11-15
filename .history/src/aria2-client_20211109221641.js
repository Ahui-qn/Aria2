class Aria2Client {
    constructor(options) {
        this.options = options
        this.ws = new WebSocket(`ws://${options.host}:${options.port}/jsonrpc`)

        this.lastId = 1
        this.callbacks = {}  // 存储每个每次函数调用的回调函数

        this.connectPromise = new Promise((resolve, reject) => {  // 要么websocket处于连接成功状态，要么处于连接失败状态，正在连接中的话执行下面的forEach会报错
            this.ws.addEventListener('open', () => {
              resolve()
            })
            this.ws.addEventListener('error', (e) => {
              reject('WS_CONNECTION_ERROR')
            })
          })

        this.ws.addEventListener('close', (e) => {
            console.log(e)
        })
        this.ws.addEventListener('message', (e) => {
            let data = JSON.parse(e.data)

            let callback = this.callbacks[data.id]  // 无论data是error还是result都带着此次会话id
            delete this.callbacks[data.id]
            if (typeof callback == 'function') {
                callback(data)
            }
        })
    }

    ready() {
        return this.connectPromise
    }
    close() {
        return this.ws.close()
    }
}


   ;[
    "addUri",
    "addTorrent",
    "getPeers",
    "addMetalink",
    "remove",
    "pause",
    "forcePause",
    "pauseAll",
    "forcePauseAll",
    "unpause",
    "unpauseAll",
    "forceRemove",
    "changePosition",
    "tellStatus",
    "getUris",
    "getFiles",
    "getServers",
    "tellActive",
    "tellWaiting",
    "tellStopped",
    "getOption",
    "changeUri",
    "changeOption",
    "getGlobalOption",
    "changeGlobalOption",
    "purgeDownloadResult",
    "removeDownloadResult",
    "getVersion",
    "getSessionInfo",
    "shutdown",
    "forceShutdown",
    "getGlobalStat",
    "saveSession"
    ].forEach(methodName => {
        Aria2Client.prototype[methodName] = function (...args) {  // ...args为每个函数的 『 第一个参数之后 』的每个参数
            return this.connectPromise.then(() => {   // 

                return new Promise((resolve, reject) => {
                    let id = this.lastId++
                    this.callbacks[id] = function (data) {  //ws.message事件触发调用callback说明data收到
                        if (data.error) {  // 如果data放回的是一个error说明出错
                            reject(data.error)
                        }else {
                            resolve(data.result)    //拿到结果，promise状态确定
                        }
                    }
                    if (this.websocket.readyState === WebSocket.OPEN) {
                        this.ws.send(JSON.stringify({
                            jsonrpc : '2.0',
                            id : id,
                            method: 'aria2.' + methodName,
                            params: [`token:${this.options.secret}`, ...args]
                        }))
                    }else {
                        console.log(11)
                    }
                })

            })
        }
    })

    

   
    export default Aria2Client