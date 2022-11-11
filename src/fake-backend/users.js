const users = [
    {
        id: '1',
        firstName: 'Kiran',
        lastName: 'Das',
        avatarColor: 'red'
    },
    {
        id: '2',
        firstName: 'John',
        lastName: 'Doe',
        avatarColor: 'blue'
    },
    {
        id: '3',
        firstName: 'Katherine',
        lastName: 'Johnson',
        avatarColor: 'green'
    },
    {
        id: '4',
        firstName: 'Allen',
        lastName: 'Smith',
        avatarColor: 'yellow'
    }
];

// A mock function to mimic making an async request for data
export function fetchUsers() {
    return new Promise((resolve) =>
      setTimeout(() => resolve({ success: true, users }), 500)
    );
}
  