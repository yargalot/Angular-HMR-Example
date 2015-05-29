'use strict';

class DataStore {

    constructor() {

        // Initiate our Baobab store
        this.tree = new Baobab({
            sessions: []
        }, {
            clone: true // Immutable (can be expensive in large apps)
        });

        this.sessions = this.tree.select('sessions');
    }

    
    _gc(cb, scope) { // Garbage collection for our listeners
        if(scope && scope.$on) {
            scope.$on('$destroy', cb);
        }
    }

    getSessions() {
        return this.sessions.get();
    }

    onSessionsChanged(cb, scope) {
        this.sessions.on('update', cb);

        this._gc(() => this.sessions.off('update', cb), scope);
    }

}

// Export a singleton
export default new DataStore();
