import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, styleObj } from "../../../Firebase";
import { RingLoader } from "react-spinners";
export default function Dashboard() {
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [propertyCount, setPropertyCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [load, setLoad] = useState(true);

  setTimeout(() => {
    setLoad(false);
  }, 2000);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        setUserCount(usersSnapshot.size);

        const orderSnapshot = await getDocs(collection(db, "orders"));
        setOrderCount(orderSnapshot.size);

        const propertySnapshot = await getDocs(collection(db, "propertyTypes"));
        setPropertyCount(propertySnapshot.size);

        const reviewSnapshot = await getDocs(collection(db, "reviews"));
        setReviewCount(reviewSnapshot.size);
      } catch (error) {
        console.error("Error fetching document counts: ", error);
      }
    };

    fetchCounts();
  }, []);
  return (
    <>
      <>
        <RingLoader
          loading={load}
          cssOverride={styleObj}
          size={100}
          color={"#B78D65"}
        />
        <div className={load ? "d-none" : ""}>
          {/* Page Header Start */}
          <div
            className="container-fluid page-header py-5 mb-5 wow fadeIn"
            data-wow-delay="0.1s"
          >
            <div className="container py-5">
              <h1 className="display-1 text-white animated slideInDown">
                WELCOME ADMIN!!
              </h1>
              <nav aria-label="breadcrumb animated slideInDown"></nav>
            </div>
          </div>
          {/* Page Header End */}
          {/* Facts Start */}
          <div className="container-xxl py-5">
            <div className="container pt-5">
              <div className="row g-4">
                <div
                  className="col-lg-6 col-md-6 wow fadeInUp mb-3"
                  data-wow-delay="0.1s"
                >
                  <div className="fact-item text-center bg-light h-100 p-5 pt-0">
                    <div className="fact-icon">
                      <img src="/img/icons/team.png" alt="Icon" height={100} />
                    </div>
                    <h3 className="mb-3">Total Users</h3>
                    <h1>{userCount}</h1>
                  </div>
                </div>
                <div
                  className="col-lg-6 col-md-6 wow fadeInUp mb-3"
                  data-wow-delay="0.3s"
                >
                  <div className="fact-item text-center bg-light h-100 p-5 pt-0">
                    <div className="fact-icon">
                      <img src="/img/icons/design.png" alt="Icon" height={100} />
                    </div>
                    <h3 className="mb-3">Total Orders</h3>
                    <h1>{orderCount}</h1>
                  </div>
                </div>
                <div
                  className="col-lg-6 col-md-6 wow fadeInUp mt-5"
                  data-wow-delay="0.5s"
                >
                  <div className="fact-item text-center bg-light h-100 p-5 pt-0">
                    <div className="fact-icon">
                      <img src="/img/icons/town.png" alt="Icon" height={100} />
                    </div>
                    <h3 className="mb-3">Total Property Types</h3>
                    <h1>{propertyCount}</h1>
                  </div>
                </div>
                <div
                  className="col-lg-6 col-md-6 wow fadeInUp mt-5"
                  data-wow-delay="0.5s"
                >
                  <div className="fact-item text-center bg-light h-100 p-5 pt-0">
                    <div className="fact-icon">
                      <img src="/img/icons/rating.png" alt="Icon" height={100} />
                    </div>
                    <h3 className="mb-3">Total Reviews</h3>
                    <h1>{reviewCount}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Facts End */}
      </>
    </>
  );
}
