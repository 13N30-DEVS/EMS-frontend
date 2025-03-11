import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBaseRoutes from './utils/RoleBaseRoutes';
import AdminSummary from './components/dashboard/AdminSummar';
import DepartmentList from './components/departments/DepartmentList';
import AddDepartment from './components/departments/AddDepartment';
import EditDepartment from './components/departments/EditDepartment'
import List from './components/emplyoee/List'
import Add from './components/emplyoee/Add'
import View from './components/emplyoee/View'
import Edit from './components/emplyoee/Edit'
import AddSalary from './components/salary/Add'
import ViewSalary from './components/salary/View'
import Summary from './components/EmployeeDashboard/Summary';
import LeaveList from './components/leaves/List'
import AddLeave from './components/leaves/Add'
import Setting from './components/EmployeeDashboard/Setting';
import Table from './components/leaves/Table'
import Detail from './components/leaves/Detail';
import Attendance from './components/attendance/Attendance';
import AttendanceReport from './components/attendance/AttendanceReport';
import UserDashboard from './components/UserDashboard/UserDashboard'
import AdminQueryPage from './components/UserDashboard/AdminQueryPage';



function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/admin-dashboard" />} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path="/login" element={<Login />} />
   


   

        <Route path="/admin-dashboard" element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={['admin']}>
              <AdminDashboard />
            </RoleBaseRoutes>
          </PrivateRoutes>
        }>

          <Route index element={<AdminSummary />} />
          <Route path='/admin-dashboard/departments' element={<DepartmentList />} />
          <Route path='/admin-dashboard/add-department' element={< AddDepartment />} />
          <Route path='/admin-dashboard/department/:id' element={< EditDepartment />} />
          <Route path='/admin-dashboard/employees' element={< List />} />
          <Route path='/admin-dashboard/add-employee' element={< Add />} />
          <Route path='/admin-dashboard/employees/:id' element={< View />} />
          <Route path='/admin-dashboard/employees/edit/:id' element={< Edit />} />

          <Route path='/admin-dashboard/employees/salary/:id' element={< ViewSalary />} />


          <Route path='/admin-dashboard/salary/add' element={<AddSalary />} />

          <Route path='/admin-dashboard/leaves' element={<Table />} />
          <Route path='/admin-dashboard/leaves/:id' element={<Detail />} />
          <Route path='/admin-dashboard/employees/leaves/:id' element={<LeaveList />} />
          <Route path='/admin-dashboard/settings' element={<Setting />} />
          <Route path='/admin-dashboard/attendance' element={<Attendance />} />
          <Route path='/admin-dashboard/attendance-report' element={<AttendanceReport />} />


  {/* Add the AdminQueryPage route here */}
  <Route path='/admin-dashboard/queries' element={<AdminQueryPage />} />  {/* <-- New Route */}
      

        </Route>

        <Route path="/employee-dashboard" element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={["admin", "employee"]}>
              <EmployeeDashboard />
            </RoleBaseRoutes>
          </PrivateRoutes>
        }>
          <Route index element={<Summary />} />
          <Route path='/employee-dashboard/profile/:id' element={<View />}></Route>
          <Route path='/employee-dashboard/leaves/:id' element={<LeaveList />}></Route>
          <Route path='/employee-dashboard/add-leave' element={<AddLeave />}></Route>
          <Route path='/employee-dashboard/salary/:id' element={<ViewSalary />}></Route>
          

          <Route path='/employee-dashboard/settings' element={<Setting />}></Route>
        </Route>


        <Route path='/user-dashboard' element={     
  <PrivateRoutes>
    <RoleBaseRoutes requiredRole={['user']}>
      <UserDashboard />  {/* Render only UserForm here */}

    </RoleBaseRoutes>
  </PrivateRoutes>}>
</Route>



      </Routes>
    </BrowserRouter>
  );
}

export default App;


