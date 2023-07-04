const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
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
      return User.findById({ _id });
    },
    calendarEvents: async (parent, args, context) => {
      if (context.user) {
        return User.find();
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch ({ name, code }) {
        // Handle specific error cases
        if (name === "ValidationError") {
          // Handle validation errors
          throw new UserInputError("Invalid input", {
            invalidArgs: error.errors,
          });
        } else if (name === "MongoError" && code === 11000) {
          // Handle duplicate key errors (e.g., unique email constraint)
          throw new UserInputError("User with this email already exists");
        } else {
          // Handle generic or unexpected errors
          throw new AuthenticationError("Failed to add user");
        }
      }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        // User input error
        throw new UserInputError("Invalid email or password");
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        // User input error
        throw new UserInputError("Invalid email or password");
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
