// src/app/(WebPage)/(UserPage)/Profile/page.tsx
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Profile, getAuthUser, fetchMyProfile, LOGIN_PATH } from "../../../../../lib/authUser";

const FALLBACK_PIC = "/assets/images/them-1.png";

const ROWS: [string, keyof Profile][] = [
  ["Name", "name"],
  ["Username", "username"],
  ["Email", "email"],
  ["Phone", "number"],
  ["Address", "address"],
  ["City", "city"],
  ["State", "state"],
  ["PIN Code", "pin"],
  ["Country", "country"],
];

export default function ProfilePage() {
  const [data, setData] = useState<Profile | null>(null);

  useEffect(() => {
    const user = getAuthUser();
    if (!user?.id) {
      window.location.href = LOGIN_PATH;
      return;
    }

    setData(user);

    const controller = new AbortController();
    fetchMyProfile(controller.signal)
      .then((profile) => {
        if (!profile) return;
        setData(profile);
        localStorage.setItem("authUser_user", JSON.stringify({ ...user, ...profile }));
      })
      .catch((err) => {
        if (err.name !== "AbortError") console.error("Profile fetch error:", err);
      });

    return () => controller.abort();
  }, []);

  if (!data) return null;

  return (
    <section className="py-4 bg-gray">
      <div className="container-fluid w-90">
        <div className="card shadow border-0">
          <div className="card-body">
            <div className="row justify-content-center mx-auto">
              <div className="col-md-12 mx-auto pt-3">
                <h5 className="bg-primary text-white text-center p-2 fw-bold rounded">
                  <i className="fa fa-user-circle me-2"></i>
                  Your Profile
                </h5>
              </div>

              <div className="col-md-4 text-center my-auto">
                <h6 className="fw-bold text-dark mb-2">Your Profile Picture:</h6>
                <img
                  src={data.pic ? `/assets/images/${data.pic}` : FALLBACK_PIC}
                  alt="Profile"
                  className="img-fluid rounded-circle shadow-sm"
                  style={{
                    width: "180px",
                    height: "180px",
                    objectFit: "cover",
                    border: "4px solid #198754",
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_PIC;
                  }}
                />
                <div className="mt-3">
                  <h5 className="fw-bold mb-1">{data.name || "User"}</h5>
                  <small className="text-muted">{data.email || "No email"}</small>
                </div>
              </div>

              <div className="col-md-7 py-3">
                <div className="table-responsive">
                  <table className="table table-bordered table-hover w-100 mb-3">
                    <tbody>
                      {ROWS.map(([label, key]) => (
                        <tr key={key}>
                          <th className="bg-light" style={{ width: "35%" }}>{label}</th>
                          <td>{data[key] || "Not Provided"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="d-flex gap-2 flex-wrap">
                  <Link href="/UpdateProfile" className="btn btn-primary flex-fill">
                    <i className="fa fa-edit me-2"></i> Update Profile
                  </Link>
                  <Link href="/OrderSummary" className="btn btn-outline-success flex-fill">
                    <i className="fa fa-list me-2"></i> My Orders
                  </Link>
                  <Link href="/Cart" className="btn btn-outline-warning flex-fill">
                    <i className="fa fa-shopping-cart me-2"></i> My Cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}