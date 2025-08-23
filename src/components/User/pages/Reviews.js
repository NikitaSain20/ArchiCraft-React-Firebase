import { useEffect, useState } from "react";
import { db, styleObj } from "../../../Firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { RingLoader } from "react-spinners";
import { FaStar } from "react-icons/fa";

export default function Reviews() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const styles = {
    card: {
      width: "300px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      padding: "15px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#fff",
      fontFamily: "Arial, sans-serif",
      margin: "10px auto",
      textAlign: "center",
    },
    name: {
      fontSize: "1.2em",
      margin: "10px 0",
      color: "#333",
    },
    rating: {
      margin: "10px 0",
    },
    review: {
      fontSize: "0.9em",
      color: "#555",
    },
  };
  setTimeout(() => {
    setLoad(false);
  }, 2000);

  useEffect(() => {
    const getReviews = () => {
      const reviewRef = collection(db, "reviews");
      const usersRef = collection(db, "users");

      const unsubscribeReviews = onSnapshot(reviewRef, (reviewSnapshot) => {
        const reviews = reviewSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        onSnapshot(usersRef, (userSnapshot) => {
          const users = userSnapshot.docs.map((doc) => ({
            uniqueId: doc.id,
            ...doc.data(),
          }));

          const joinedData = reviews.map((review) => {
            const user = users.find((usr) => usr.uniqueId === review.userId);

            return {
              ...review,
              user,
            };
          });

          setData(joinedData);
        });
      });
    };

    getReviews();
  }, []);

  return (
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
              Reviews
            </h1>
            <nav aria-label="breadcrumb animated slideInDown">
              <ol className="breadcrumb text-uppercase mb-0">
                <li className="breadcrumb-item">
                  <a className="text-white" href="#">
                    Home
                  </a>
                </li>

                <li
                  className="breadcrumb-item text-primary active"
                  aria-current="page"
                >
                  Reviews
                </li>
              </ol>
            </nav>
          </div>
        </div>
        {/* Page Header End */}

        {/* Testimonial Start */}
        <div className="container-xxl py-5">
          <div className="container">
            <div
              className="text-center mx-auto mb-5 wow fadeInUp"
              data-wow-delay="0.1s"
              style={{ maxWidth: 600 }}
            >
              <h4 className="section-title">Reviews</h4>
              <h1 className="display-5 mb-4">
                Thousands Of Customers Who Trust Us And Our Services
              </h1>
            </div>
            <div className="row">
              <div
                className="col-md-12  wow fadeInUp d-flex flex-wrap"
                data-wow-delay="0.1s"
              >
                {/* {data.map((review, index) => (
                  <div className="testimonial-item text-center" key={review.id}>
                    <p className="fs-5 text-primary">{review.comment}</p>
                    <h3>{review.user?.name}</h3>
                    <span className="text-primary">
                      {review.user?.profession}
                    </span>
                  </div>
                ))} */}
                {data.map((review, index) => (
                  <div style={styles.card}>
                    <h3 style={styles.name}>{review?.user?.name}</h3>
                    <div style={styles.rating}>
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          size={20}
                          color={
                            index < review.currentRating ? "#ffc107" : "#e4e5e9"
                          }
                        />
                      ))}
                    </div>
                    <p style={styles.review}>{`" ${review.comment} "`}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Testimonial End */}
    </>
  );
}
