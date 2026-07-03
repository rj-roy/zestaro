import AuthFooter from '@/components/auth/AuthFooter';
import AuthForm from '@/components/auth/AuthForm';
import AuthTabs from '@/components/auth/AuthTabs';
import GoogleButton from '@/components/auth/GoogleButton';

export default async function ZestaroAuth({ searchParams }) {
    const params = await searchParams;
    const login = params.login;
    let isLogin = login === "true" ? true : false;

    return (
        <div className="min-h-screen bg-stone-50 flex flex-col font-sans text-stone-900">
            <main className="grow flex items-center justify-center p-4 sm:p-8">
                <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 space-y-6 border border-stone-100">
                    <AuthTabs isLogin={isLogin} />
                    <GoogleButton />
                    <AuthForm isLogin={isLogin} />
                    <AuthFooter/>
                </div>
            </main>
        </div>
    );
}