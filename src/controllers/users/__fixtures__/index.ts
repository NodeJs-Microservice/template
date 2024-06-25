export default {
  users: [
    {
      _id: '614e91d8b68d2c5f6e7e29e8',
      fullName: 'John Doe',
      email: 'johndoe@example.com',
      phone: '123-456-7890',
      password: '$2a$12$ZB1nuI9qV.bsFRyczoLxzOxwy2ZXjDtfnTfCqY1Ee.nfcZdJUMBrG',
      userType: 'admin',
      parent: undefined,
      parents: [],
      metadata: {
        loginDisabled: false,
        requirePasswordUpdate: true
      }
    },
    {
      _id: '614e91e5b68d2c5f6e7e29e9',
      fullName: 'Jane Smith',
      email: 'janesmith@example.com',
      phone: '987-654-3210',
      password: '$2a$12$ZB1nuI9qV.bsFRyczoLxzOxwy2ZXjDtfnTfCqY1Ee.nfcZdJUMBrG',
      userType: 'user',
      parent: '614e91d8b68d2c5f6e7e29e8',
      parents: ['614e91d8b68d2c5f6e7e29e8'],
      metadata: {
        loginDisabled: false,
        requirePasswordUpdate: true
      }
    }
  ],
  sessions: []
};
