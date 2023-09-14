import IRoute from "../interfaces/route";
import RegisterPage from '../Pages/Registration/RegistrationPage';
import LoginPage from '../Pages/Login/login-page';
import MainPage from '../Pages/MainPage/main-page';
import ResearchPage from "../Pages/Research/ResearchPage";
import ChangePasswordPage from '../Pages/ChangePasswordPage/changepassword-page';
import ForgotPasswordPage from '../Pages/ForgotPasswordPage/forgotpassword-page';
import LogoutPage from '../Pages/LogoutPage/logout-page';
import ResetPasswordPage from '../Pages/ResetPasswordPage/resetpassword-page';

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
        path: '/main',
        exact: true,
        component: MainPage,
        name: 'Main Page',
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
        protected: true
    },
    {
        path: '/reset',
        exact: true,
        component: ResetPasswordPage,
        name: 'Reset Password Page',
        protected: true
    },
];

export default routes;
