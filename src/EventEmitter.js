class EventEmitter {
    listeners = {
        'API:UN_AUTH': new Set(),
        'MENU:PERMISSIONS': new Set(),
        'MENU:UN_AUTH': new Set(),
        'LOGIN:SUCCESS': new Set()
    }

    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = []
        }

        this.listeners[event].add(callback)
    }

    emit(event, ...args) {
        if (this.listeners[event]) {
            this.listeners[event].forEach((callback) => {
                callback(...args)
            })
        }
    }
}

export default new EventEmitter()
