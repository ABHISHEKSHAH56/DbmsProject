// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarUserConfig = [
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
    title: 'All Course' ,
    path: '/all/course',
    icon: getIcon('eva:people-fill')
  },
  
  {
    title: 'logout',
    path: '/logout',
    icon: getIcon('eva:lock-fill')
  }
  
];

export default sidebarUserConfig ;