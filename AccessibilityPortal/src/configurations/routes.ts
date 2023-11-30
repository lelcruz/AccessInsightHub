import IRoute from "../interfaces/route";
import RegisterPage from '../Pages/Registration/RegistrationPage';
import LoginPage from '../Pages/Login/login-page';
import ForgotPasswordPage from '../Pages/ForgotPasswordPage/forgotpassword-page';
import ResetPasswordPage from '../Pages/EmailActionsHandler/email-actions-handler';
import MainPage from "../Pages/MainPage/mainpage";
import StudiesPage from "../Pages/Studies/StudiesPage";
import SurveyPage from "../Pages/Survey/SurveyPage";
import ProfilePage from "../Pages/Profile/ProfilePage";
import StudyTemplatePage from "../Pages/Template/Study Template/StudyTemplate";
import SurveyTemplatePage from "../Pages/Template/SurveyTemplate/SurveyTemplate";
import UserManagePage from "../Pages/UserManagement/UserManagementPage";
import MessagePage from "../Pages/MessagePage/MessagePage"
import SurveyEditorPage from "../Pages/Template/Survey Template/SurveyEditor";
import SurveyPreviewPage from "../Pages/Template/Survey Template/SurveyPreview";
import TemplatePage from "../Pages/Template/TemplatePage";
import ActivityLog from "../Pages/ActivityLog/ActivityLogPage";
import LandingPage from "../Pages/Landing Page/LandingPage";
import StudyDetailPage from "../Pages/Studies/StudyDetailPage";


const routes: IRoute[] = [
    {
        path: '/',
        exact: true,
        component: LandingPage,
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
        path: '/study/:studyId',
        exact: true,
        component: StudyDetailPage,
        name: 'Study Detail Page',
        protected: false // Set to true if the page should be protected
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
    {
        path: '/message',
        exact: true,
        component: MessagePage,
        name: 'Message Page',
        protected: false
    },
    {
        path: '/survey-editor',
        exact: true,
        component: SurveyEditorPage,
        name: 'Survey Editor Page',
        protected: false
    },
    {
        path: '/survey-simple',
        exact: true,
        component: SurveyTemplatePage,
        name: 'Survey Template Page',
        protected: false
    },
    {
        path: '/survey-preview',
        exact: true,
        component: SurveyPreviewPage,
        name: 'Survey Preview Page',
        protected: false
    },
    {
        path: '/study-template',
        exact: true,
        component: StudyTemplatePage,
        name: 'Study Template Page',
        protected: false
    },
    {
        path: '/activity-log',
        exact: true,
        component: ActivityLog,
        name: 'Activity Log Page',
        protected: false
    }

];

export default routes;
