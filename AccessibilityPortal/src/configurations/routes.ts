import IRoute from "../interfaces/route";
import RegisterPage from '../Pages/Registration/RegistrationPage';
import LoginPage from '../Pages/Login/login-page';
import ChangePasswordPage from '../Pages/ChangePasswordPage/changepassword-page';
import ForgotPasswordPage from '../Pages/ForgotPasswordPage/forgotpassword-page';
import ResetPasswordPage from '../Pages/EmailActionsHandler/email-actions-handler';
import MainPage from "../Pages/MainPage/mainpage";
import StudiesPage from "../Pages/Studies/StudiesPage";
import SurveyPage from "../Pages/Survey/SurveyPage";
import ProfilePage from "../Pages/Profile/ProfilePage";
import TemplatePage from "../Pages/Template/TemplatePage";
import CreatePasswordWithGoogleAccount from "../Pages/Registration/CreatePasswordWithGoogleAccount";
import UserManagePage from "../Pages/UserManagement/UserManagementPage";

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
        path: '/change',
        exact: true,
        component: ChangePasswordPage,
        name: 'Change Password Page',
        protected: true
    },
    /*{
        path: '/registerWithGoogle',
        exact: true,
        component: CreatePasswordWithGoogleAccount,
        name: 'Register with Google Page',
        protected: true
    },*/
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
    {
        path: '/studies',
        exact: true,
        component: StudiesPage,
        name: 'Study Page',
        protected: false
    },
    {
        path: '/survey',
        exact: true,
        component: SurveyPage,
        name: 'Survey Page',
        protected: false
    },
    {
        path: '/profile',
        exact: true,
        component: ProfilePage,
        name: 'Profile Page',
        protected: false
    },
    {
        path: '/template',
        exact: true,
        component: TemplatePage,
        name: 'Template Page',
        protected: false
    },
    {
        path: '/usermanage',
        exact: true,
        component: UserManagePage,
        name: 'User Management Page',
        protected: false
    },
];

export default routes;
