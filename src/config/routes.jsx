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
        path: '/dashboard/pdls',
        component: <Pdl />,
    },
    {
        path: '/dashboard/inventory',
        component: <Inventory />,
    },
    {
        path: '/dashboard/pos',
        component: <Pos />,
    },
    {
        path: '/dashboard/load',
        component: <Load />,
    },
    {
        path: '/dashboard/audit',
        component: <Audit />,
    },
    {
        path: '/dashboard/users',
        component: <User />,
    },
]

export default routes