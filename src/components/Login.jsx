import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../features/login/user";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle regular login
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    setTimeout(() => {
      setIsLoading(false);

      if (foundUser) {
        console.log("Login berhasil sebagai:", foundUser.role);
        if (foundUser.role === "admin") {
          navigate("/admin");
        } else if (foundUser.role === "user") {
          navigate("/user");
        }
      } else {
        alert("Email atau password salah.");
      }
    }, 1000);
  };

  // Function to handle demo access
  const handleDemoAccess = () => {
    setIsLoading(true);

    // Simulate demo login
    setTimeout(() => {
      setIsLoading(false);
      console.log("Accessing as demo user");
      // Here you would redirect to the demo version with limited access
      navigate("/model");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-white">
      {/* Left Panel */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-10 py-16">
        {/* Logo / Title */}
        <div className="mb-10">
          <h1 className="text-2xl font-extrabold text-blue-800">
            AI BASED COMPUTER ASSISTED DIAGNOSIS TBC
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            AI-powered Medical Platform
          </p>
        </div>

        {/* Login Form */}
        <div className="max-w-md w-full">
          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm text-gray-600">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-600">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <a href="#" className="text-blue-500 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Login"}
            </button>
          </form>

          {/* Demo Access Button */}
          <div className="mt-4">
            <button
              onClick={handleDemoAccess}
              className="w-full bg-green-600 text-white py-2 rounded-lg shadow-md hover:bg-green-700 transition"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Try Demo Version"}
            </button>
            <p className="text-xs text-center text-gray-500 mt-2">
              No registration required. Access limited features for evaluation.
            </p>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-br from-blue-50 to-white text-gray-500">
                Or
              </span>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-white">
        <img
          src="diagnosis.jpg"
          alt="Medical Illustration"
          className="max-h-96 object-contain"
        />
      </div>
    </div>
  );
}

export default Login;
