// src/app/(WebPage)/(UserPage)/UpdateProfile/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Profile, getAuthUser, fetchMyProfile, LOGIN_PATH } from "../../../../../lib/authUser";

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

const LOCKED_FIELDS: (keyof Profile)[] = ["username", "email", "number"];

export default function UpdateProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<Profile | null>(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const user = getAuthUser();
    if (!user?.id) {
      window.location.href = LOGIN_PATH;
      return;
    }
    setFormData(user);

    fetchMyProfile()
      .then((profile) => {
        if (profile) setFormData(profile);
      })
      .catch((err) => console.error("Fetch profile error:", err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData((f) => (f ? { ...f, [e.target.name]: e.target.value } : f))
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormData((f) => (f ? { ...f, pic: file.name } : f));
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.status === 401) {
        localStorage.removeItem("authUser_user");
        window.location.href = LOGIN_PATH;
        return;
      }
      if (!res.ok) {
        alert("Error updating profile ❌");
        return;
      }

      const { user } = await res.json();
      localStorage.setItem("authUser_user", JSON.stringify({ ...getAuthUser(), ...user }));
      alert("✅ Profile updated successfully!");
      router.push("/Profile");
    } catch (err) {
      console.error("Update error:", err);
      alert("Something went wrong");
    }
  };
  if (!formData) return null;
  const picSrc = preview || (formData.pic ? `/assets/images/${formData.pic}` : "");

  return (
    <section className="py-4 bg-gray">
      <div className="container-fluid w-90">
        <div className="card shadow border-0">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="col-md-12 mx-auto pt-2">
                {/* Header */}
                <div className="bg-primary text-white d-flex justify-content-between align-items-center px-3 py-2 rounded mb-4">
                  <h6 className="mb-0 fw-bold text-white">
                    <i className="fa fa-user-edit me-2"></i> Update Profile
                  </h6>
                  <Link href="/Profile" className="btn btn-light btn-sm px-2 py-1 fs-8">
                    <i className="fa fa-arrow-left me-1"></i> Back
                  </Link>
                </div>

                <div className="row px-3 py-2">
                  {/* Profile Image */}
                  <div className="col-md-4 text-center my-auto">
                    <h6 className="fw-bold text-dark mb-3">Profile Picture:</h6>
                    <div className="position-relative d-inline-block mb-3">
                      <img src={picSrc || "/assets/images/them-1.png"} alt="Profile" className="rounded-circle shadow-sm" 
                       style={{  width: "180px",  height: "180px",  objectFit: "cover",  border: "4px solid #198754", }}
                       onError={(e) => { (e.target as HTMLImageElement).src = "/assets/images/them-1.png"; }} />
                    </div>
                    <input type="file" className="form-control w-75 m-auto" accept="image/*" onChange={handleFileChange} />
                    <small className="text-muted d-block mt-2">
                      Recommended: Square image (JPG/PNG)
                    </small>
                  </div>

                  {/* Fields */}
                  <div className="col-md-8">
                    <div className="table-responsive">
                      <table className="table table-bordered table-sm align-middle">
                        <tbody>
                          {FIELDS.map(([label, key]) => {
                            const isLocked = LOCKED_FIELDS.includes(key);
                            return (
                              <tr key={key}>
                                <th className="bg-light px-3 fs-6 py-0 form-contro" style={{ width: "30%" }}>
                                  {label}
                                  {(key === "name" || key === "email") && ( <span className="text-danger ms-1">*</span> )}
                                  {isLocked && ( <i className="fa fa-lock ms-2 text-muted fs-7" title="Cannot be changed"></i>)}
                                </th>
                                <td>
                                  <input type={key === "email" ? "email" : "text"} name={key} 
                                   className={`form-control py-1 ${ isLocked ? "bg-light text-muted px-2  fs-6 py-1" : "" }`}
                                    value={(formData[key] as string) || ""} onChange={handleChange}
                                    required={key === "name" || key === "email"} disabled={isLocked}
                                    style={isLocked ? { cursor: "not-allowed" } : {}} />
                                </td>
                              </tr>
                            );
                          })}
                          <tr>
                            <td colSpan={2} className="text-center py-3">
                              <button type="submit" className="btn btn-success w-100 py-2 fs-7">
                                <i className="fa fa-save me-2"></i> Save Changes
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Info Note */}
                    <div className="alert alert-info mt-2 mb-0 py-2 px-3 small">
                      <i className="fa fa-info-circle me-1"></i>
                      <strong>Note:</strong> Username, Email and Phone cannot be changed. Contact{" "}
                      <a href="/Contact" className="alert-link">support</a> if you need to update them.
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