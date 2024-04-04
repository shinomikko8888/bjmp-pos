import { Audit, Dashboard, ForgotPass, Inventory, Load, Login, Pdl, Pos, Profile, ResetPass, User } from "../pages";

const routes = [
    //Authentication Pages
    {
        path: '/',
        component: <Login />,
        protected: false
    },
    {
        path: '/login',
        component: <Login />,
        protected: false
    },
    {
        path: '/forgot-pass',
        component: <ForgotPass />,
        protected: false
    },
    {
        path: '/reset-pass',
        component: <ResetPass />,
        protected: false
    },
    //Dashboard Pages
    {
        path: '/dashboard',
        component: <Dashboard />,
        protected: true
    },
    {
        path: '/pdls',
        component: <Pdl />,
        protected: true
    },
    {
        path: '/pdl-profile',
        component: <Profile />,
        protected: true
    },
    {
        path: '/inventory',
        component: <Inventory />,
        protected: true
    },
    {
        path: '/pos',
        component: <Pos />,
        protected: true
    },
    {
        path: '/load',
        component: <Load />,
        protected: true
    },
    {
        path: '/audit',
        component: <Audit />,
        protected: true
    },
    {
        path: '/users',
        component: <User />,
        protected: true
    },
]

export default routes