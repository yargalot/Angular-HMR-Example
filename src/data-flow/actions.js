// Our actions which manipulate our store
'use strict';

import DataStore from './store.js';

class DataActions {

    setSessions(sessions) {
        DataStore.sessions.set(sessions);
    }

    setSessionAsAttending(id) {
        var cursor = DataStore.sessions.select({id});

        cursor.set('attending', !cursor.get('attending'));
    }

}

// export a singleton
export default new DataActions();