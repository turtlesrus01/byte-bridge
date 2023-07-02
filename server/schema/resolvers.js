const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

// resolvers query
const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    calendarEvent: async (parent, { _id }) => {
      return User.findOne({ _id });
    },
    calendarEvents: async (parent, args, context) => {
      if (context.user) {
        return User.find();
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    calendarEvent: async (parent, { _id }) => {
      return User.findOne({ _id });
    },
  },
  
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Wrong credentials");
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Wrong credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addCalendarEvent: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { calendarEvents: args } },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deleteCalendarEvent: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { calendarEvents: { _id: args._id } } },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deleteAllCalendarEvents: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { calendarEvents: {} } },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deleteUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deleteAllUsers: async (parent, args, context) => {
      if (context.user) {
        return User.deleteMany({});
      }
      throw new AuthenticationError("You need to be logged in!");
    },

  },

};
  

module.exports = resolvers;
