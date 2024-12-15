import { User } from '../types';

const initAdminUser = () => {
  const existingUsers = JSON.parse(localStorage.getItem('users') || '[]') as User[];

  const adminExists = existingUsers.some(user => user.email === 'admin@gmail.com');

  if (!adminExists) {

    const adminUser: User = {
        username: 'JayThummar',
        email: 'admin@gmail.com',
        password: 'admin@123',
        confirmPassword: 'admin@123',
        dob: '08/04/2001',
        gender: 'male',
        mobile: '9904185538'
    };
    const users = [
     
      {
        username: 'JohnDoe',
        email: 'johndoe@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        dob: '02/14/1995',
        gender: 'male',
        mobile: '9876543210',
      },
      {
        username: 'JaneDoe',
        email: 'janedoe@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        dob: '11/21/1990',
        gender: 'female',
        mobile: '9876543211',
      },
      {
        username: 'MikeSmith',
        email: 'mikesmith@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        dob: '03/25/1992',
        gender: 'male',
        mobile: '9876543212',
      },
      {
        username: 'EmilyDavis',
        email: 'emilydavis@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        dob: '07/18/1994',
        gender: 'female',
        mobile: '9876543213',
      },
      {
        username: 'DavidJohnson',
        email: 'davidjohnson@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        dob: '05/30/1991',
        gender: 'male',
        mobile: '9876543214',
      },
      {
        username: 'SaraWilson',
        email: 'sarawilson@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        dob: '10/10/1993',
        gender: 'female',
        mobile: '9876543215',
      },
      {
        username: 'ChrisLee',
        email: 'chrislee@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        dob: '12/05/1992',
        gender: 'male',
        mobile: '9876543216',
      },
      {
        username: 'AnnaMartinez',
        email: 'annamartinez@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        dob: '09/15/1994',
        gender: 'female',
        mobile: '9876543217',
      },
    ];
    
  
    localStorage.setItem('users', JSON.stringify([...existingUsers, adminUser,...users]));
  }
};

export default initAdminUser;
