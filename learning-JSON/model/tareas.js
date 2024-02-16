const fs = require('fs');
const path = require('path');

class TareaModel {
    static getTareas() {
        const data = fs.readFileSync(path.join(__dirname, '../data/tareas.json'), 'utf8');
        return JSON.parse(data);
    }
}

module.exports = TareaModel;