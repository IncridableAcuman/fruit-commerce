import { Lock, Mail, Send, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance';

const Login = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

const handleAuth = async (endpoint, payload) => {
  const { data } = await axiosInstance.post(`/auth/${endpoint}`, payload);
  localStorage.setItem("accessToken", data.accessToken);
  return data;
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
  if (isRegister) {
    await handleAuth("register", { username, email, password });
  } else {
    await handleAuth("login", { email, password });
  }
  toast.success("Successfully.");
  navigate("/");
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    localStorage.removeItem("accessToken");
  } finally {
    setLoading(false);
}
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="w-full h-screen bg-image">
      <div className="bg-gray-900 text-white w-full h-screen opacity-90">
        <div className="flex flex-col items-center justify-between gap-3 padd">
          <div className="flex items-center justify-between w-full pt-18">
            <div className="pt-5 hidden md:block">
              <h1 className='text-2xl lg:text-6xl font-bold pb-3'>Welcome Back.!</h1>
              <button className='border p-3 cursor-pointer'>Skip the log?</button>
            </div>
            <div className="w-full max-w-md bg-black text-white py-4 px-6 rounded-md shadow-md">
              <form className='space-y-4' onSubmit={handleSubmit}>
                <h2 className='text-2xl lg:text-4xl font-bold pb-3'>{isRegister ? "Sign Up" : "Sign In"}</h2>

                {isRegister && (
                  <div className="flex items-center gap-3 border p-3">
                    <User />
                    <input
                      type="text"
                      name='username'
                      id='username'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder='Username'
                      className='outline-none w-full'
                      required
                    />
                  </div>
                )}

                <div className="flex items-center gap-3 border p-3">
                  <Mail />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Your Email'
                    className='outline-none w-full'
                    required
                  />
                </div>

                <div className="flex items-center gap-3 border p-3">
                  <Lock />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                    className='outline-none w-full'
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-3 border p-3 cursor-pointer hover:bg-white hover:text-black transition duration-300"
                  disabled={loading}
                >
                  <Send /> {loading ? "Processing..." : (isRegister ? "Sign Up" : "Sign In")}
                </button>
              </form>

              <p
                className='text-sm text-center pt-2 cursor-pointer hover:text-gray-400 transition duration-300'
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password
              </p>

              <p className='text-center pt-3'>or</p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <img src="./github.svg" alt="github"
                  className='w-8 bg-white rounded-full p-2 cursor-pointer hover:bg-gray-200 transition duration-300 shadow' />
                <img src="./google.svg" alt="google"
                  className='w-8 bg-white rounded-full p-2 cursor-pointer hover:bg-gray-200 transition duration-300 shadow' />
              </div>

              <div className="pt-5">
                {!isRegister ? (
                  <p className='text-sm text-center'>
                    Don't have an account?{" "}
                    <span className='hover:underline cursor-pointer' onClick={() => setIsRegister(true)}>Sign Up</span>
                  </p>
                ) : (
                  <p className='text-sm text-center'>
                    Already have an account?{" "}
                    <span className='hover:underline cursor-pointer' onClick={() => setIsRegister(false)}>Sign In</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
