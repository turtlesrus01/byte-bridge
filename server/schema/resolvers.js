const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const { User, CalendarEvent } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    calendarEvent: async (parent, { id }) => {
      return CalendarEvent.findById(id);
    },
    calendarEvents: async () => {
      return CalendarEvent.find();
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        if (error.name === "ValidationError") {
          throw new UserInputError("Invalid input", {
            invalidArgs: error.errors,
          });
        } else if (error.name === "MongoError" && error.code === 11000) {
          throw new UserInputError("User with this email already exists");
        }
        throw new UserInputError("Failed to add user");
      }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.isCorrectPassword(password))) {
        throw new UserInputError("Invalid email or password");
      }
      const token = signToken(user);
      return { token, user };
    },
    addCalendarEvent: async (parent, { input }) => {
      const {
        id,
        title,
        description,
        startDate,
        endDate,
        location,
        allDay,
        userId,
      } = input;

      // Validate the presence of required fields
      if (
        !title ||
        !description ||
        !startDate ||
        !endDate ||
        !location ||
        !userId
      ) {
        throw new UserInputError("Missing required fields");
      }

      const calendarEvent = await CalendarEvent.create({
        _id: id,
        title,
        description,
        startDate,
        endDate,
        location,
        allDay,
        userID: userId,
      });

      return calendarEvent;
    },
    updateCalendarEvent: async (parent, { input }) => {
      const { id, ...updates } = input;
      const updatedEvent = await CalendarEvent.findByIdAndUpdate(id, updates, {
        new: true,
      });
      if (!updatedEvent) {
        throw new UserInputError("Calendar event not found");
      }
      return updatedEvent;
    },
    deleteCalendarEvent: async (parent, { id }) => {
      const deletedEvent = await CalendarEvent.findByIdAndDelete(id);
      if (!deletedEvent) {
        throw new UserInputError("Calendar event not found");
      }
      return deletedEvent;
    },
    deleteAllCalendarEvents: async () => {
      await CalendarEvent.deleteMany({});
      return true;
    },
    deleteUser: async (parent, { username }) => {
      const deletedUser = await User.findOneAndDelete({ username });
      if (!deletedUser) {
        throw new UserInputError("User not found");
      }
      return deletedUser;
    },
    deleteAllUsers: async () => {
      await User.deleteMany({});
      return true;
    },
  },
};

module.exports = resolvers;
