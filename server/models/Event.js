const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');
const dateFormat = require('../utils/dateFormat.js');

const CalendarEventSchema = new Schema({
    ID: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    starDate: {type: Date, default: Date.now, required: true},
    endDate: {type: Date, default: Date.now, required: true},
    location: {type: String, required: true},
});

CalendarEventSchema.pre('save', async function (next) {
    if (this.isNew ||!this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

CalendarEventSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const CalendarEvent = model('CalendarEvent', CalendarEventSchema);
   
module.exports = CalendarEvent;

