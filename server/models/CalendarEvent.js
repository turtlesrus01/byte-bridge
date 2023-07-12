const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const CalendarEventSchema = new Schema({
    userId: { type: String, required: true },
    eventId: { type: String, required: true },
    eventTitle: { type: String, required: true },
    eventDescription: { type: String, required: true },
    eventStartDate: { type: Date, required: true },
    eventEndDate: { type: Date, required: true },
    eventLocation: { type: String, required: true },
    eventAllDay: { type: Boolean, required: true },
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

