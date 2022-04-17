import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import StudentForm from './sections/authentication/register/StudentRegister';
import Registeration2 from './pages/Registeration2';
import Course from './pages/Course/Course';
import CourseStudent from './pages/CourseStudent';
import CourseAssigment from './pages/CourseAssigment';
import AssigmentStudentTable from './pages/AssigmentListSubmission';
import { useMemo } from 'react';
import Assigment from './pages/Assigment';
import Student from './pages/Students';

// ----------------------------------------------------------------------

const teacherRoute={
  path: '/',
  element: <DashboardLayout />,
  children: [
    { path: '/', element: <Navigate to="/course" /> },
    { path: 'dashbord', element: <DashboardApp /> },
    { path: 'course', element: <Course /> },    
    { path: 'assigment', element: <Assigment /> },
    { path: 'student', element: <Student /> },
    {path: 'assigment/:courseId', element: <CourseAssigment />},
    {path: 'assigment/:courseId/:assigmentId', element: <AssigmentStudentTable />},
    {path: 'student/:courseId', element: <CourseStudent />},
    { path: '404', element: <NotFound /> },
    { path: '*', element: <Navigate to="/404"  /> }
  ]
}

const defaultRoute={
  path: '404', element: <NotFound />
}

export default function Router({role}) {
  const routes = useMemo(() => {
    switch (role) {
        case "faculty":
            return [defaultRoute,teacherRoute];
        case "student":
            return [defaultRoute,teacherRoute];
        default:
            return [defaultRoute];
    }
}, [role]);
  return useRoutes(routes);
}
