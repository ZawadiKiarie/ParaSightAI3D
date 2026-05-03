import { useSetAtom } from "jotai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../store/Store";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [signUpErrorMsg, setSignUpErrorMsg] = useState("");
  const [signInErrorMsg, setSignInErrorMsg] = useState("");

  const navigate = useNavigate();
  const setUser = useSetAtom(userAtom);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    let isValid = true;

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!formData.password || formData.password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!isLogin && (!formData.name || formData.name.trim().length < 1)) {
      setNameError(true);
      setNameErrorMessage("Name is required");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    return isValid;
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
    });

    setEmailError(false);
    setEmailErrorMessage("");
    setPasswordError(false);
    setPasswordErrorMessage("");
    setNameError(false);
    setNameErrorMessage("");
    setSignUpErrorMsg("");
  };

  const saveAuthTokenInSession = (token) => {
    window.sessionStorage.setItem("token", token);
  };

  const handleSignUp = () => {
    // console.log("sign up clicked");
    const data = formData;
    const name = data.name;
    const email = data.email;
    const password = data.password;

    if (validateInputs()) {
      fetch("http://localhost:3000/register", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          if (data.success === "true" && data.userId) {
            saveAuthTokenInSession(data.token);
            fetch(`http://localhost:3000/profile/${data.userId}`, {
              method: "get",
              headers: {
                "Content-Type": "application/json",
                Authorization: data.token,
              },
            })
              .then((resp) => resp.json())
              .then((user) => {
                if (user && user.email) {
                  // loadUser(user)
                  setUser(user);
                  sessionStorage.setItem("user", JSON.stringify(user));
                  navigate("/dashboard");
                } else {
                  setSignUpErrorMsg(user);
                }
              });
          } else {
            setSignUpErrorMsg(data);
          }
        })
        .catch((err) => console.error("Error signing up:", err));
    }
  };

  const handleSignIn = () => {
    const data = formData;
    const email = data.email;
    const password = data.password;
    fetch("http://localhost:3000/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data);
        if (data.success === "true" && data.userId) {
          saveAuthTokenInSession(data.token);
          fetch(`http://localhost:3000/profile/${data.userId}`, {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              Authorization: data.token,
            },
          })
            .then((resp) => resp.json())
            .then((user) => {
              // console.log(user);
              if (user && user.email) {
                // loadUser(user);
                setUser(user);
                sessionStorage.setItem("user", JSON.stringify(user));
                navigate("/dashboard");
              } else {
                setSignInErrorMsg(user);
              }
            });
        } else {
          setSignInErrorMsg(data.message || "Invalid email or password.");
        }
      })
      .catch((err) => console.error("Error signing in:", err));
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100">
        {/* Decorative Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/30 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/30 rounded-full blur-[120px]"></div>
      </div>

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="backdrop-blur-xl bg-white/70 rounded-3xl shadow-2xl shadow-blue-500/10 p-8 border border-white/50">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mb-4 shadow-lg">
              <svg
                className="w-9 h-9 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <h1 className="text-3xl mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ParaSightAI
            </h1>
            <p className="text-gray-600">
              {isLogin ? "Welcome Back" : "Create Account"}
            </p>
          </div>

          {!isLogin && signUpErrorMsg && (
            <p className="text-red-500 text-sm text-center mb-4">
              {signUpErrorMsg}
            </p>
          )}
          {isLogin && signInErrorMsg && (
            <p className="text-red-500 text-sm text-center mb-4">
              {signInErrorMsg}
            </p>
          )}

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (isLogin) {
                handleSignIn();
              } else {
                handleSignUp();
              }
            }}
            className="space-y-5"
          >
            {!isLogin && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm mb-2 text-gray-700"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                  placeholder="Enter your name"
                  required
                />
                {nameErrorMessage && (
                  <p className="text-red-500 text-sm text-center mb-4">
                    {nameErrorMessage}
                  </p>
                )}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm mb-2 text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                placeholder="you@example.com"
                required
              />
              {emailErrorMessage && (
                <p className="text-red-500 text-sm text-center mb-4">
                  {emailErrorMessage}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm mb-2 text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                placeholder="••••••••"
                required
              />
              {passwordErrorMessage && (
                <p className="text-red-500 text-sm text-center mb-4">
                  {passwordErrorMessage}
                </p>
              )}
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLogin ? "Login" : "Create Account"}
            </button>
          </form>

          {/* Switch Auth Mode */}
          <p className="text-center mt-6 text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                resetForm();
              }}
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>

        {/* Helper Text */}
        <p className="text-center mt-6 text-sm text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
