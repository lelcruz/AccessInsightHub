import IRoute from "../interfaces/route";
import ChangePasswordPage from "../Pages/ChangePasswordPage/changepassword-page";
import ForgotPasswordPage from "../Pages/ForgotPasswordPage/forgotpassword-page";
import LoginPage from "../Pages/Login/login-page";
import LogoutPage from "../Pages/LogoutPage/logout-page";
import RegisterPage from "../Pages/Registration/RegistrationPage";
import ResetPasswordPage from "../Pages/ChangePasswordPage/changepassword-page";
import MainPage from "../Pages/MainPage/main-page";

const routes: IRoute[] = [
    {
        path: '/main',
        exact: true,
        component: MainPage,
        name: 'Main Page',
        protected: true
    },
    {
        path: '/register',
        exact: true,
        component: RegisterPage,
        name: 'Registration Page',
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
        path: '/forget',
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
    }
];

export default routes;
