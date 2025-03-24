// This file would contain API calls related to admin operations
// For now, it's using mock data for demonstration purposes

// Mock data for payment summary
const mockPaymentSummary = {
    totalCollected: 7250000,
    pendingAmount: 1850000,
    overdueAmount: 950000,
    totalStudents: 2500,
    paidStudents: 1875,
    pendingStudents: 625,
    overdueStudents: 320,
    collectionRate: 75
  };
  
  // Mock data for monthly trends
  const mockMonthlyTrends = [
    { month: 'Jan', collected: 980000, target: 1200000 },
    { month: 'Feb', collected: 1150000, target: 1200000 },
    { month: 'Mar', collected: 1250000, target: 1200000 },
    { month: 'Apr', collected: 950000, target: 1200000 },
    { month: 'May', collected: 1100000, target: 1200000 },
    { month: 'Jun', collected: 1320000, target: 1200000 }
  ];
  
  // Mock data for student list
  const mockStudents = [
    {
      id: 1,
      name: 'Ravi Kumar',
      rollNumber: 'SVIT20CS101',
      branch: 'CSE',
      semester: 3,
      email: 'ravi.kumar@svit.edu.in',
      phone: '9876543210',
      totalFees: 35000,
      paidFees: 27000,
      pendingFees: 8000,
      lastPaymentDate: '2025-01-15'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      rollNumber: 'SVIT21ECE078',
      branch: 'ECE',
      semester: 2,
      email: 'priya.sharma@svit.edu.in',
      phone: '9876543211',
      totalFees: 32000,
      paidFees: 24000,
      pendingFees: 8000,
      lastPaymentDate: '2025-01-10'
    },
    {
      id: 3,
      name: 'Mohammed Ali',
      rollNumber: 'SVIT22ME045',
      branch: 'MECH',
      semester: 1,
      email: 'mohammed.ali@svit.edu.in',
      phone: '9876543212',
      totalFees: 30000,
      paidFees: 15000,
      pendingFees: 15000,
      lastPaymentDate: '2024-12-05'
    },
    {
      id: 4,
      name: 'Kiran Reddy',
      rollNumber: 'SVIT20CS087',
      branch: 'CSE',
      semester: 3,
      email: 'kiran.reddy@svit.edu.in',
      phone: '9876543213',
      totalFees: 35000,
      paidFees: 35000,
      pendingFees: 0,
      lastPaymentDate: '2025-01-20'
    },
    {
      id: 5,
      name: 'Anjali Patel',
      rollNumber: 'SVIT21CIVIL034',
      branch: 'CIVIL',
      semester: 2,
      email: 'anjali.patel@svit.edu.in',
      phone: '9876543214',
      totalFees: 30000,
      paidFees: 15000,
      pendingFees: 15000,
      lastPaymentDate: '2024-12-12'
    }
  ];
  
  // Mock data for recent payments
  const mockRecentPayments = [
    {
      id: 'SVIT25032001',
      studentName: 'Ravi Kumar',
      rollNumber: 'SVIT20CS101',
      feeType: 'Examination Fee',
      amount: 2500,
      date: '2025-03-20 09:45:23',
      mode: 'Online (UPI)',
      status: 'success'
    },
    {
      id: 'SVIT25031902',
      studentName: 'Priya Sharma',
      rollNumber: 'SVIT21ECE078',
      feeType: 'Bus Fee',
      amount: 8000,
      date: '2025-03-19 14:23:10',
      mode: 'Online (Card)',
      status: 'success'
    },
    {
      id: 'SVIT25031903',
      studentName: 'Mohammed Ali',
      rollNumber: 'SVIT22ME045',
      feeType: 'Lab Fee',
      amount: 3500,
      date: '2025-03-19 11:05:47',
      mode: 'Cash',
      status: 'success'
    }
  ];
  
  // Mock data for fee structures
  const mockFeeStructures = [
    {
      id: 1,
      type: 'Examination Fee',
      branch: 'All',
      semester: 'All',
      amount: 2500,
      dueDate: '2025-04-15',
      description: 'Mid-semester examination fee',
      isActive: true,
      lateCharge: 100,
      createdOn: '2025-02-15'
    },
    {
      id: 2,
      type: 'Bus Fee',
      branch: 'All',
      semester: 'All',
      amount: 8000,
      dueDate: '2025-04-10',
      description: 'Transportation fee for April-June 2025',
      isActive: true,
      lateCharge: 200,
      createdOn: '2025-02-15'
    },
    {
      id: 3,
      type: 'Library Fee',
      branch: 'All',
      semester: 'All',
      amount: 1000,
      dueDate: '2025-03-30',
      description: 'Annual library access fee',
      isActive: true,
      lateCharge: 50,
      createdOn: '2025-02-15'
    }
  ];
  
  export const adminService = {
    // Get dashboard summary
    getDashboardSummary: async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return mockPaymentSummary;
    },
    
    // Get monthly trends
    getMonthlyTrends: async (period = 'lastSixMonths') => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      return mockMonthlyTrends;
    },
    
    // Get recent payments
    getRecentPayments: async (limit = 5) => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return mockRecentPayments.slice(0, limit);
    },
    
    // Get student list
    getStudents: async (filters = {}) => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let filteredStudents = [...mockStudents];
      
      // Apply filters
      if (filters.branch) {
        filteredStudents = filteredStudents.filter(
          student => student.branch === filters.branch
        );
      }
      
      if (filters.semester) {
        filteredStudents = filteredStudents.filter(
          student => student.semester.toString() === filters.semester
        );
      }
      
      if (filters.status === 'pending') {
        filteredStudents = filteredStudents.filter(
          student => student.pendingFees > 0
        );
      } else if (filters.status === 'paid') {
        filteredStudents = filteredStudents.filter(
          student => student.pendingFees === 0
        );
      }
      
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredStudents = filteredStudents.filter(
          student => 
            student.name.toLowerCase().includes(searchTerm) ||
            student.rollNumber.toLowerCase().includes(searchTerm) ||
            student.email.toLowerCase().includes(searchTerm)
        );
      }
      
      return filteredStudents;
    },
    
    // Get student details
    getStudentDetails: async (studentId) => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const student = mockStudents.find(s => s.id === Number(studentId));
      
      if (!student) {
        throw new Error('Student not found');
      }
      
      return student;
    },
    
    // Get fee structures
    getFeeStructures: async (filters = {}) => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      let filteredFees = [...mockFeeStructures];
      
      // Apply filters
      if (filters.type) {
        filteredFees = filteredFees.filter(
          fee => fee.type === filters.type
        );
      }
      
      if (filters.branch && filters.branch !== 'All') {
        filteredFees = filteredFees.filter(
          fee => fee.branch === 'All' || fee.branch === filters.branch
        );
      }
      
      if (filters.semester && filters.semester !== 'All') {
        filteredFees = filteredFees.filter(
          fee => fee.semester === 'All' || fee.semester === filters.semester
        );
      }
      
      if (filters.active !== undefined) {
        filteredFees = filteredFees.filter(
          fee => fee.isActive === filters.active
        );
      }
      
      return filteredFees;
    },
    
    // Add fee structure
    addFeeStructure: async (feeData) => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would send the fee data to the server
      
      const newFee = {
        id: Date.now(),
        ...feeData,
        createdOn: new Date().toISOString().split('T')[0]
      };
      
      return {
        success: true,
        fee: newFee
      };
    },
    
    // Update fee structure
    updateFeeStructure: async (feeId, feeData) => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would update the fee structure on the server
      
      const fee = mockFeeStructures.find(f => f.id === Number(feeId));
      
      if (!fee) {
        throw new Error('Fee structure not found');
      }
      
      const updatedFee = {
        ...fee,
        ...feeData
      };
      
      return {
        success: true,
        fee: updatedFee
      };
    },
    
    // Delete fee structure
    deleteFeeStructure: async (feeId) => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would delete the fee structure on the server
      
      return {
        success: true
      };
    },
    
    // Generate reports
    generateReport: async (reportType, filters = {}) => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would generate a report based on the type and filters
      
      return {
        success: true,
        reportUrl: '#', // In real app, this would be a download URL
        message: `${reportType} report generated successfully`
      };
    },
    
    // Send payment reminders
    sendReminders: async (studentIds, message) => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // In a real app, this would send reminders to the selected students
      
      return {
        success: true,
        sent: studentIds.length,
        message: `Reminders sent to ${studentIds.length} students`
      };
    }
  };
  
  export default adminService;