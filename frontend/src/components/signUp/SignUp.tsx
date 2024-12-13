import { useState, ChangeEvent, FormEvent } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import axios from 'axios';

const Signup: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [successPopup, setSuccessPopup] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        switch (id) {
            case 'username':
                setUsername(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER}user/register`, {
                username,
                email,
                password,
            });

            if (response.status === 200) {
                setSuccessPopup(true);
                setTimeout(() => {
                    setSuccessPopup(false);
                    navigate('/sign-in');
                }, 2000);
            }
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="col-span-1 sm:col-span-7 p-4 sm:p-10">
            {successPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-md text-center">
                        <h2 className="text-lg font-bold">Registration Successful!</h2>
                        <p className="text-sm mt-2">Redirecting to login page...</p>
                    </div>
                </div>
            )}

            <div className="flex justify-between sm:justify-around mt-4 sm:mt-[10px]">
                <div className="text-xl sm:text-3xl Pacifico-Regular">C-form</div>
                <Button className="h-[40px] w-[140px] sm:h-[45px] sm:w-[120px] Roboto bg-[#4267B2]" onClick={() => navigate('/sign-in')}>Login</Button>
            </div>
            <div className="h-px bg-slate-300 mt-4 sm:mt-[15px]"></div>
            <form className="w-full sm:w-[514px] mx-auto" onSubmit={handleSubmit}>
                <div className="text-2xl sm:text-[40px] font-bold mt-6 sm:mt-[4vh]">Create your forms</div>

                <div className="mt-4 sm:mt-[20px]">
                    <Label htmlFor="username" className="text-sm sm:text-[15px]">Username</Label>
                    <Input id="username" className="mt-2 sm:mt-[6px] w-full" type="text" required onChange={handleChange} />
                </div>
                <div className="mt-4 sm:mt-[20px]">
                    <Label htmlFor="email" className="text-sm sm:text-[15px]">Email</Label>
                    <Input id="email" className="mt-2 sm:mt-[6px] w-full" type="email" required onChange={handleChange} />
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
                            please wait
                        </>
                    ) : ('Get started')}
                </Button>

                <div className="text-[10px] sm:text-[10px] mt-4 sm:mt-[16px]">
                    By Signing up, you agree to our <Link to="#" className="font-semibold">Terms of Use</Link> and <Link to="#" className="font-semibold">Privacy Policy</Link>.
                </div>
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

export default Signup;
