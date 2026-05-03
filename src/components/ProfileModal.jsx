import { X, UserCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../store/Store";

export function ProfileModal({ isOpen, onClose }) {
  const [user, setUser] = useAtom(userAtom);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role] = useState("Lab Technician");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setNewPassword("");
      setConfirmPassword("");
      setErrorMsg("");
      setSuccessMsg("");
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleSave = async () => {
    setErrorMsg("");
    setSuccessMsg("");

    if (!name.trim()) {
      setErrorMsg("Name is required.");
      return;
    }

    if (!email.trim()) {
      setErrorMsg("Email is required.");
      return;
    }

    if (newPassword && newPassword.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    try {
      setIsSaving(true);

      const token = sessionStorage.getItem("token");

      const response = await fetch(`http://localhost:3000/profile/${user.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          name,
          email,
          password: newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.message || "Failed to update profile.");
        return;
      }

      const updatedUser = {
        id: data.id,
        name: data.name,
        email: data.email,
      };

      setUser(updatedUser);
      sessionStorage.setItem("user", JSON.stringify(updatedUser));

      setSuccessMsg("Profile updated successfully.");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        onClose();
      }, 700);
    } catch (err) {
      setErrorMsg("Could not connect to server.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md mx-4 max-h-[90vh] backdrop-blur-xl bg-white/95 rounded-2xl shadow-2xl border border-white/20 overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200/50">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Profile</h2>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="px-6 py-5 space-y-5 overflow-y-auto">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <UserCircle className="w-12 h-12 text-white" />
            </div>
          </div>

          {errorMsg && (
            <p className="text-sm text-center text-red-500">{errorMsg}</p>
          )}

          {successMsg && (
            <p className="text-sm text-center text-green-600">{successMsg}</p>
          )}

          <div className="space-y-3.5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Role
              </label>
              <div className="inline-flex px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-purple-200">
                <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {role}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200/50" />

          <div className="space-y-3.5">
            <h3 className="text-sm font-semibold text-gray-900">
              Change Password
            </h3>

            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-2 rounded-lg bg-white/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-4 py-2 rounded-lg bg-white/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="px-6 py-3.5 bg-gray-50/50 border-t border-gray-200/50 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-5 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
