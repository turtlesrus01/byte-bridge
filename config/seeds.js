const { User, CalendarEvent } = require('../models'); 

const seedData = async () => {
  try {
    // Seed users
    const users = [
      { username: 'user1', email: 'user1@example.com', password: 'password1' },
      { username: 'user2', email: 'user2@example.com', password: 'password2' },
      // Add more user objects as needed
    ];
    const createdUsers = await User.insertMany(users);
    console.log('Seeded Users:', createdUsers);

    // Seed calendar events
    const events = [
      {
        title: 'Event 1',
        description: 'Description of Event 1',
        startDate: '2023-07-01',
        endDate: '2023-07-02',
        location: 'Location 1',
        userID: createdUsers[0]._id, // Assign the user ID of the first created user
      },
      {
        title: 'Event 2',
        description: 'Description of Event 2',
        startDate: '2023-07-03',
        endDate: '2023-07-05',
        location: 'Location 2',
        userID: createdUsers[1]._id, // Assign the user ID of the second created user
      },
      // Add more event objects as needed
    ];
    const createdEvents = await CalendarEvent.insertMany(events, { validateBeforeSave: false });
    console.log('Seeded Calendar Events:', createdEvents);
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

seedData();
