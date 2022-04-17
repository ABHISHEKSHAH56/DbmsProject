// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashbord',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: 'course',
    path: '/course',
    icon: getIcon('eva:people-fill')
  },
  {
    title: 'Assigment',
    path: 'assigment',
    icon: getIcon('eva:shopping-bag-fill')
  },
  {
    title: 'Student',
    path: 'student',
    icon: getIcon('eva:people-fill')
  },
  
  {
    title: 'logout',
    path: '/logout',
    icon: getIcon('eva:lock-fill')
  }
  
];

export default sidebarConfig;
