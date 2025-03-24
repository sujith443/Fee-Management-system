// This file would contain API calls related to student operations
// For now, it's using mock data for demonstration purposes

// Mock data for student payments
const mockPayments = [
    {
      id: 'SVIT25011501',
      type: 'Examination Fee',
      semester: 2,
      amount: 2500,
      paidDate: '2025-01-15',
      paymentMode: 'Online (UPI)',
      reference: 'UPI123456789',
      status: 'success'
    },
    {
      id: 'SVIT25011002',
      type: 'Bus Fee',
      semester: 2,
      amount: 8000,
      paidDate: '2025-01-10',
      paymentMode: 'Online (Net Banking)',
      reference: 'NB987654321',
      status: 'success'
    },
    {
      id: 'SVIT24122803',
      type: 'Hostel Fee',
      semester: 2,
      amount: 25000,
      paidDate: '2024-12-28',
      paymentMode: 'DD',
      reference: 'DD123456',
      status: 'success'
    }
  ];
  
  // Mock data for pending fees
  const mockPendingFees = [
    {
      id: 1,
      type: 'Examination Fee',
      semester: 3,
      amount: 2500,
      dueDate: '2025-04-15',
      status: 'pending',
      description: 'Mid-semester examination fee',
      lateCharge: 0
    },
    {
      id: 2,
      type: 'Bus Fee',
      semester: 3,
      amount: 8000,
      dueDate: '2025-04-10',
      status: 'pending',
      description: 'Transportation fee for April-June 2025',
      lateCharge: 0
    },
    {
      id: 3,
      type: 'Library Fee',
      semester: 3,
      amount: 1000,
      dueDate: '2025-03-30',
      status: 'overdue',
      description: 'Annual library access fee',
      lateCharge: 100
    }
  ];
  
  export const studentService = {
    // Get payment history for a student
    getPaymentHistory: async (studentId) => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real app, this would filter based on studentId
      return mockPayments;
    },
    
    // Get pending fees for a student
    getPendingFees: async (studentId) => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real app, this would filter based on studentId
      return mockPendingFees;
    },
    
    // Get a specific fee details
    getFeeDetails: async (feeId) => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const fee = mockPendingFees.find(f => f.id === Number(feeId));
      
      if (!fee) {
        throw new Error('Fee not found');
      }
      
      return fee;
    },
    
    // Get a specific payment receipt
    getPaymentReceipt: async (receiptId) => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, this would fetch from the server
      const mockReceipts = {
        'SVIT25011501': {
          id: 'SVIT25011501',
          studentName: 'Ravi Kumar',
          rollNumber: 'SVIT20CS101',
          feeType: 'Examination Fee',
          semester: 2,
          amount: 2500,
          convenienceFee: 25,
          lateCharge: 0,
          totalAmount: 2525,
          paidDate: '2025-01-15 09:30:22',
          academicYear: '2024-2025',
          paymentMode: 'Online (UPI)',
          transactionId: 'UPI123456789',
          paymentStatus: 'success'
        }
      };
      
      const receipt = mockReceipts[receiptId];
      
      if (!receipt) {
        throw new Error('Receipt not found');
      }
      
      return receipt;
    },
    
    // Make a payment
    makePayment: async (paymentData) => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would send the payment data to the server
      // and return a receipt or confirmation
      
      const { feeId, paymentMethod } = paymentData;
      
      // Generate a mock transaction ID
      const transactionId = 'TXN' + Date.now().toString().substring(6);
      
      // Generate a mock receipt ID
      const receiptId = 'SVIT' + new Date().toISOString().slice(2, 10).replace(/-/g, '') + feeId;
      
      return {
        success: true,
        receiptId,
        transactionId,
        paymentMethod,
        paidDate: new Date().toISOString()
      };
    },
    
    // Get student profile
    getStudentProfile: async (studentId) => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // In a real app, this would fetch from the server
      const mockStudentData = {
        id: 1,
        name: 'Ravi Kumar',
        rollNumber: 'SVIT20CS101',
        email: 'ravi.kumar@svit.edu.in',
        phone: '9876543210',
        branch: 'Computer Science & Engineering',
        semester: 3,
        section: 'A',
        batchYear: '2020-2024',
        address: '123 Main Street, Hyderabad, Telangana, 500001',
        fatherName: 'Ramesh Kumar',
        motherName: 'Lakshmi Devi',
        guardianPhone: '9876543211',
        bloodGroup: 'O+',
        dob: '2002-05-15',
        admissionYear: '2020',
        hostelResident: 'No',
        busRoute: 'Route 7 - Hyderabad Central',
        scholarshipStatus: 'None',
        profileImage: '/assets/images/student-avatar.png'
      };
      
      return mockStudentData;
    },
    
    // Update student profile
    updateProfile: async (studentId, profileData) => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would send the updated profile data to the server
      
      return {
        success: true,
        message: 'Profile updated successfully'
      };
    },
    
    // Change password
    changePassword: async (studentId, passwordData) => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would send the password data to the server
      
      // Validate password match
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        throw new Error('New password and confirmation do not match');
      }
      
      return {
        success: true,
        message: 'Password updated successfully'
      };
    }
  };
  
  export default studentService;