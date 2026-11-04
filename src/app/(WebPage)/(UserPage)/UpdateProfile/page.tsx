// src/app/(WebPage)/(UserPage)/UpdateProfile/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Profile,
  getAuthUser,
  fetchMyProfile,
  LOGIN_PATH,
} from "../../../../../lib/authUser";

const FIELDS: [string, keyof Profile][] = [
  ["Name", "name"],
  ["Username", "username"],
  ["Email", "email"],
  ["Phone", "number"],
  ["Address", "address"],
  ["PIN", "pin"],
  ["City", "city"],
  ["State", "state"],
  ["Country", "country"],
];

const ONE_TIME_FIELDS: (keyof Profile)[] = ["username", "email", "number"];

export default function UpdateProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<Profile | null>(null);
  const [preview, setPreview] = useState("");
  const [serverData, setServerData] = useState<Profile | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const user = getAuthUser();
    if (!user?.id) {
      window.location.href = LOGIN_PATH;
      return;
    }
    setFormData(user);
    setServerData(user);

    fetchMyProfile()
      .then((profile) => {
        if (!profile) return;
        setFormData(profile);
        setServerData(profile);
      })
      .catch((err) => console.error("Fetch profile error:", err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((f) => (f ? { ...f, [e.target.name]: e.target.value } : f));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  const isLocked = (key: keyof Profile) => {
    if (!ONE_TIME_FIELDS.includes(key)) return false;
    const v = serverData?.[key];
    return v != null && String(v).trim() !== "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    setError("");

    try {
      const data = new FormData();

      const ALWAYS_EDITABLE = [
        "name",
        "address",
        "pin",
        "city",
        "state",
        "country",
      ];
      for (const k of ALWAYS_EDITABLE) {
        const v = (formData as any)[k];
        if (v != null) data.append(k, String(v));
      }

      for (const k of ONE_TIME_FIELDS) {
        if (isLocked(k)) continue;
        const v = (formData as any)[k];
        if (v != null && String(v).trim() !== "") {
          data.append(k, String(v));
        }
      }

      const fileInput = document.querySelector<HTMLInputElement>(
        'input[type="file"]'
      );
      if (fileInput?.files?.[0]) {
        data.append("pic", fileInput.files[0]);
      }

      const res = await fetch("/api/user", {
        method: "PUT",
        body: data,
      });

      if (res.status === 401) {
        localStorage.removeItem("authUser_user");
        window.location.href = LOGIN_PATH;
        return;
      }

      if (res.status === 409) {
        const j = await res.json().catch(() => ({}));
        setError(
          j?.detail ||
            `This ${j?.field || "value"} is already linked to another account. Contact support.`
        );
        return;
      }

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Update failed:", res.status, errorText);
        setError("Error updating profile ❌");
        return;
      }

      const { user } = await res.json();

      setFormData((f) => (f ? { ...f, ...user } : user));
      setServerData(user);
      setPreview("");

      localStorage.setItem(
        "authUser_user",
        JSON.stringify({ ...getAuthUser(), ...user })
      );

      alert("✅ Profile updated successfully!");
      router.push("/Profile");
    } catch (err) {
      console.error("Update error:", err);
      setError("Something went wrong");
    }
  };

  if (!formData) return null;
  const picSrc =
    preview || (formData.pic ? `/assets/images/${formData.pic}` : "");

  return (
    <section className="py-4 bg-gray">
      <div className="container-fluid w-90">
        <div className="card shadow border-0">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="col-md-12 mx-auto pt-2">
                <div className="bg-primary text-white d-flex justify-content-between align-items-center px-3 py-2 rounded mb-4">
                  <h6 className="mb-0 fw-bold text-white">
                    <i className="fa fa-user-edit me-2"></i> Update Profile
                  </h6>
                  <Link
                    href="/Profile"
                    className="btn btn-light btn-sm px-2 py-1 fs-8"
                  >
                    <i className="fa fa-arrow-left me-1"></i> Back
                  </Link>
                </div>

                {error && (
                  <div className="alert alert-danger py-2 px-3 small">
                    <i className="fa fa-exclamation-circle me-1"></i> {error}
                  </div>
                )}

                <div className="row px-3 py-2">
                  <div className="col-md-4 text-center my-auto">
                    <h6 className="fw-bold text-dark mb-3">Profile Picture:</h6>
                    <div className="position-relative d-inline-block mb-3">
                      <img
                        src={picSrc || "/assets/images/them-1.png"}
                        alt="Profile"
                        className="rounded-circle shadow-sm"
                        style={{
                          width: "180px",
                          height: "180px",
                          objectFit: "cover",
                          border: "4px solid #198754",
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/assets/images/them-1.png";
                        }}
                      />
                    </div>
                    <input
                      type="file"
                      className="form-control w-75 m-auto"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <small className="text-muted d-block mt-2">
                      Recommended: Square image (JPG/PNG)
                    </small>
                  </div>

                  <div className="col-md-8">
                    <div className="table-responsive">
                      <table className="table table-bordered table-sm align-middle">
                        <tbody>
                          {FIELDS.map(([label, key]) => {
                            const locked = isLocked(key);
                            const isOneTime = ONE_TIME_FIELDS.includes(key);
                            return (
                              <tr key={key}>
                                <th
                                  className="bg-light px-3 fs-6 py-0 form-contro"
                                  style={{ width: "30%" }}
                                >
                                  {label}
                                  {(key === "name" || key === "email") && (
                                    <span className="text-danger ms-1">*</span>
                                  )}
                                  {locked && (
                                    <i
                                      className="fa fa-lock ms-2 text-muted fs-7"
                                      title="Cannot be changed"
                                    ></i>
                                  )}
                                  {isOneTime && !locked && (
                                    <i
                                      className="fa fa-unlock ms-2 text-success fs-7"
                                      title="Fill once — will lock after save"
                                    ></i>
                                  )}
                                </th>
                                <td>
                                  <input
                                    type={
                                      key === "email"
                                        ? "email"
                                        : key === "number"
                                        ? "tel"
                                        : "text"
                                    }
                                    name={key}
                                    className={`form-control py-1 ${
                                      locked
                                        ? "bg-light text-muted px-2 fs-6 py-1"
                                        : ""
                                    }`}
                                    value={(formData[key] as string) || ""}
                                    onChange={handleChange}
                                    required={key === "name"}
                                    disabled={locked}
                                    style={
                                      locked ? { cursor: "not-allowed" } : {}
                                    }
                                  />
                                  {isOneTime && !locked && (
                                    <small className="text-success d-block mt-1">
                                      Fill once — this will be locked after
                                      you save.
                                    </small>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                          <tr>
                            <td colSpan={2} className="text-center py-3">
                              <button
                                type="submit"
                                className="btn btn-success w-100 py-2 fs-7"
                              >
                                <i className="fa fa-save me-2"></i> Save Changes
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="alert alert-info mt-2 mb-0 py-2 px-3 small">
                      <i className="fa fa-info-circle me-1"></i>
                      <strong>Note:</strong> Username, Email and Phone can be
                      filled only once. After saving, they are locked. Contact{" "}
                      <a href="/Contact" className="alert-link">
                        support
                      </a>{" "}
                      if you need to change them.
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}