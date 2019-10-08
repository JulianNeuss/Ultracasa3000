var api = class {
    static get baseUrl() {
        return "http://127.0.0.1:8080/api/";
    }

    static get timeout() {
        return 60 * 1000;
    }

    static fetch(url, init) {
        return new Promise(function(resolve, reject) {
            var timeout = setTimeout(function() {
                reject(new Error('Time out'));
            }, api.timeout);

            fetch(url, init)
                .then(function(response) {
                    clearTimeout(timeout);
                    if (!response.ok)
                        reject(new Error(response.statusText));

                    return response.json();
                })
                .then(function(data) {
                    resolve(data);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    }

    static get(url) {
        return api.fetch(url)
    }

    static post(url, data) {
        return api.fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        });
    }

    static put(url, data) {
        return api.fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        });
    }

    static delete(url) {
        return api.fetch(url, {
            method: 'DELETE',
        });
    }
}

api.room = class {
    static get url() {
        return api.baseUrl + "rooms/";
    }

    static add(room) {
        return api.post(api.room.url, room);
    }

    static modify(room) {
        return api.put(api.room.url + room.id, room);
    }

    static delete(id) {
        return api.delete(api.room.url + id);
    }

    static get(id) {
        return api.get(api.room.url + id);
    }

    static getAll() {
        return api.get(api.room.url);
    }

    static getDevices(id){
        return api.fetch(api.room.url + id + '/devices', {
            method: 'GET',
            headers: {
                "content-type": "application/json; charset=utf-8"
            }
        })
    }
}

api.devicetypes = class {

    static get url() {
        return api.baseUrl + "devicetypes/";
    }

    static getAllDeviceTypes() {
        return api.fetch(api.devicetypes.url, {
            method: 'GET',
            headers: {
                "content-type": "application/json; charset=utf-8"
            }
        });
    }

    static getDeviceTypeById(id){
        return api.fetch(api.devicetypes.url + id);
    }
};

api.device = class {
    static get url() {
        return api.baseUrl + "devices/";
    }

    static add(device) {
        return api.fetch(api.device.url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(device)
        });
    }

    static modify(device) {
        return api.fetch(api.device.url + device.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(device)
        });
    }

    static delete(id) {
        return api.fetch(api.device.url + id, {
            method: 'DELETE',
        });
    }
    static deleteFromRooms(id){
        return api.fetch(api.device.url + id + '/rooms', {
            method: 'DELETE',
        })
    }

    static get(id) {
        return api.fetch(api.device.url + id);
    }

    static getAll() {
        return api.fetch(api.device.url);
    }

    static setRoom(deviceId, roomId){
        return api.fetch(api.device.url + deviceId + '/rooms/' + roomId, {
            method: 'POST'
        });
    }

    static sendAction(deviceId, actionName, actionBody){
        return api.fetch(api.device.url + deviceId + '/' + actionName, {
            method : 'PUT',
            headers : {
                "content-type": "application/json; charset=utf-8"
            },
            body : JSON.stringify(actionBody)
        });}
};

api.routine = class{

    static get url() {
        return api.baseUrl + "routines/";
    }

    static getAll(){
        return api.fetch(this.url, {
            method: 'GET',
            headers : {
                "content-type": "application/json; charset=utf-8"
            },
        })
    }

    static addRoutine(routine){
        return api.fetch(this.url, {
            method : 'POST',
            headers : {
                "content-type": "application/json; charset=utf-8"
            },
            body : JSON.stringify(routine)
        })
    }

    static deleteRoutine(id){
        return api.fetch(this.url + id, {
            method : 'DELETE',
            headers : {
                "content-type": "application/json; charset=utf-8"
            }
        })
    }

    static getRoutine(id){
        return api.fetch(this.url + id, {
            method : 'GET',
            headers : {
                "content-type": "application/json; charset=utf-8"
            }
        })
    }

    static modifyRoutine(id, routine){
        return api.fetch(this.url + id, {
            method : 'PUT',
            headers : {
                "content-type": "application/json; charset=utf-8"
            },
            body : JSON.stringify(routine),
        })
    }

    static executeRoutine(id){
        return api.fetch(this.url + id + '/execute', {
            method : 'PUT',
            headers : {
                "content-type": "application/json; charset=utf-8"
            }
        })
    }
};
