import { Audit, Dashboard, ForgotPass, Inventory, Load, Login, Pdl, Pos, ResetPass, User } from "../pages";

const routes = [
    //Authentication Pages
    {
        path: '/',
        component: <Login />,
    },
    {
        path: '/login',
        component: <Login />,
    },
    {
        path: '/forgot-pass',
        component: <ForgotPass />,
    },
    {
        path: '/reset-pass',
        component: <ResetPass />,
    },
    //Dashboard Pages
    {
        path: '/dashboard',
        component: <Dashboard />,
    },
    {
        path: '/pdls',
        component: <Pdl />,
    },
    {
        path: '/inventory',
        component: <Inventory />,
    },
    {
        path: '/pos',
        component: <Pos />,
    },
    {
        path: '/load',
        component: <Load />,
    },
    {
        path: '/audit',
        component: <Audit />,
    },
    {
        path: '/users',
        component: <User />,
    },
]

export default routes