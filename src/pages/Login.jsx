import React, { useState } from "react";

const Login = () => {
  const [mode, setMode] = useState("signup"); // default is Sign Up

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    if (mode === "signup") {
      alert(`Account Created!\nName: ${name}\nEmail: ${email}`);
    } else {
      alert(`Logging in with Email: ${email}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {mode === "signup" ? "Sign Up" : "Login"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name (only in Sign Up mode) */}
          {mode === "signup" && (
            <div>
              <label className="block mb-1 text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your name"
                required
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block mb-1 text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Forgot password (only in login mode) */}
          {mode === "login" && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => alert("Password reset flow here")}
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            {mode === "signup" ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Switch between modes */}
        <div className="mt-4 text-center">
          {mode === "signup" ? (
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-blue-500 hover:underline"
              >
                Login
              </button>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-blue-500 hover:underline"
              >
                Create one
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
