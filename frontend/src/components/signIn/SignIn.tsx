import axios from 'axios';
import Cookies from 'js-cookie';
import { useState, FormEvent } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContexts';

const Signin: React.FC = () => {
    const [identifier, setIdentifier] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const { login } = useAuth();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleResponse = async (response: any, identifier: string) => {

        if (!response.data.status) {

            setErrorMessage(response.data.message || "An error occurred");
        } else {

            Cookies.set('token', response.data.token, { expires: 7, secure: true });

            login(response.data.username, response.data.token);

            navigate('/dashboard/home');
        }
        setIsLoading(false);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);
        setIsLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER}/user/login`, {
                identifier,
                password
            });
            await handleResponse(response, identifier);
            console.log(response);

        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || "An error occurred");
            setIsLoading(false);
        }
    };

    return (
        <div className="col-span-1 sm:col-span-7 p-4 sm:p-10">
            <div className="flex justify-between sm:justify-around mt-4 sm:mt-[10px]">
                <div className="text-xl sm:text-3xl Pacifico-Regular">C-form</div>
                <Button
                    className="h-[40px] w-[140px] sm:h-[45px] sm:w-[187px] Roboto bg-[#4267B2]"
                    onClick={() => navigate('/sign-up')}
                >
                    Create Account
                </Button>
            </div>
            <div className="h-px bg-slate-300 mt-4 sm:mt-[15px]"></div>
            <form className="w-full sm:w-[514px] mx-auto" onSubmit={handleSubmit}>
                <div className="text-2xl sm:text-[40px] font-bold mt-6 sm:mt-[4vh]">Sign in</div>
                <div className="mt-4 sm:mt-[30px]">
                    <Label htmlFor="identifier" className="text-sm sm:text-[15px]">Email/Username</Label>
                    <Input id="identifier" className="mt-2 sm:mt-[6px] w-full" required onChange={(e) => setIdentifier(e.target.value)} />
                </div>
                <div className="mt-4 sm:mt-[20px] relative">
                    <Label htmlFor="password" className="text-sm sm:text-[15px]">Password</Label>
                    <Input
                        id="password"
                        className="mt-2 sm:mt-[6px] w-full pr-10"
                        type={!showPassword ? "password" : "text"}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-2 sm:right-2 top-11 sm:top-10 text-[9px] sm:text-[10px] text-gray-600"
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
                {errorMessage && <div className="text-[12px] text-red-600 mt-2 font-semibold">{errorMessage}</div>}
                <Button className="w-full mt-6 sm:mt-[24px] bg-[#4267B2]" type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </>
                    ) : ('Sign-In')}
                </Button>

                <div className="flex justify-center text-sm sm:text-[15px] text-slate-400 mt-6 sm:mt-[24px]">or</div>
                <div className="h-px bg-slate-300"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-0 mt-6 sm:mt-[15px]">
                    <div className="w-full sm:w-[240px] h-[58px] border rounded-xl border-slate-300 flex justify-center items-center text-sm sm:text-[15px]">
                        <div>logo</div>
                        <div className="ml-2">Continue with <span className="font-bold">Google</span></div>
                    </div>
                    <div className="w-full sm:w-[240px] h-[58px] border rounded-xl border-slate-300 flex justify-center items-center">
                        <div>logo</div>
                        <div className="ml-2">Continue with <span className="font-bold">LinkedIn</span></div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Signin;