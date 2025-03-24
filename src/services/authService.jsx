// Mock user data for demo purposes
const mockUsers = [
    {
      id: 1,
      username: 'student1',
      password: 'password123',
      role: 'student',
      name: 'Ravi Kumar',
      rollNumber: 'SVIT20CS101',
      branch: 'CSE',
      semester: 3,
      email: 'ravi.kumar@svit.edu.in',
      profileImage: '/assets/images/student-avatar.png',
    },
    {
      id: 2,
      username: 'admin1',
      password: 'admin123',
      role: 'admin',
      name: 'Dr. Srinivas Reddy',
      department: 'Administration',
      email: 'srinivas.reddy@svit.edu.in',
      profileImage: '/assets/images/admin-avatar.png',
    }
  ];
  
  export const authService = {
    // Login function
    login: async (username, password) => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const user = mockUsers.find(
        user => user.username === username && user.password === password
      );
      
      if (!user) {
        throw new Error('Invalid username or password');
      }
      
      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    },
    
    // Check auth status
    checkAuthStatus: async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        return null;
      }
      
      return JSON.parse(storedUser);
    },
    
    // Register function (would be implemented in a real app)
    register: async (userData) => {
      // This would call an API in a real app
      throw new Error('Registration not implemented in demo');
    },
    
    // Reset password
    resetPassword: async (email) => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const user = mockUsers.find(user => user.email === email);
      
      if (!user) {
        throw new Error('Email not found');
      }
      
      return { success: true, message: 'Password reset link sent' };
    }
  };