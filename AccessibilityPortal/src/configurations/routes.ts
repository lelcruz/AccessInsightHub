import IRoute from "../interfaces/route";
import RegisterPage from '../Pages/Registration/RegistrationPage';
import LoginPage from '../Pages/Login/login-page';
import ResearchPage from "../Pages/Research/ResearchPage";
import ChangePasswordPage from '../Pages/ChangePasswordPage/changepassword-page';
import ForgotPasswordPage from '../Pages/ForgotPasswordPage/forgotpassword-page';
import LogoutPage from '../Pages/LogoutPage/logout-page';
import ResetPasswordPage from '../Pages/EmailActionsHandler/email-actions-handler';
import MainPageAdmin from "../Pages/MainPage/main-admin";
import MainPageResearcher from "../Pages/MainPage/main-researcher";
import MainPageParticipant from "../Pages/MainPage/main-participant";

const routes: IRoute[] = [
    {
        path: '/',
        exact: true,
        component: LoginPage,
        name: 'Welcome Page',
        protected: false
    },
    {
        path: '/login',
        exact: true,
        component: LoginPage,
        name: 'Login Page',
        protected: false
    },
    {
        path: '/register',
        exact: true,
        component: RegisterPage,
        name: 'Registration Page',
        protected: false
    },
    {
        path: '/mainadmin',
        exact: true,
        component: MainPageAdmin,
        name: 'Main Page Admin',
        protected: true
    },
    {
        path: '/mainresearcher',
        exact: true,
        component: MainPageResearcher,
        name: 'Main Page Researcher',
        protected: true
    },
    {
        path: '/mainparticipant',
        exact: true,
        component: MainPageParticipant,
        name: 'Main Page User',
        protected: true
    },
    {
        path: '/research',
        exact: true,
        component: ResearchPage,
        name: 'Research Page',
        protected: true
    },
    {
        path: '/change',
        exact: true,
        component: ChangePasswordPage,
        name: 'Change Password Page',
        protected: true
    },
    {
        path: '/logout',
        exact: true,
        component: LogoutPage,
        name: 'Logout Page',
        protected: true
    },
    {
        path: '/forgot',
        exact: true,
        component: ForgotPasswordPage,
        name: 'Forgot Password Page',
        protected: false
    },
    {
        path: '/reset',
        exact: true,
        component: ResetPasswordPage,
        name: 'Reset Password Page',
        protected: false
    },
];

export default routes;
