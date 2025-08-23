import {
  addDoc,
  collection,
  Timestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { FaStar } from "react-icons/fa";

import { useState } from "react";
import { auth, db, styleObj } from "../../../Firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth } from "firebase/auth";
import { useNavigate, useParams } from "react-router-dom";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { RingLoader } from "react-spinners";

export default function ReviewForm() {
  const [comment, setComment] = useState("");
  // const [rating, setRating] = useState("");
  const [load, setLoad] = useState(false);
  const { id } = useParams();

  const [currentRating, setCurrentRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const navigate = useNavigate();

  const handleClick = (rating) => setCurrentRating(rating);
  const handleMouseEnter = (rating) => setHoverRating(rating);
  const handleMouseLeave = () => setHoverRating(0);
  // setTimeout(() => {
  //   setLoad(false);
  // }, 2000);
  const addReviews = async (e) => {
    e.preventDefault();
    setLoad(true);
    if (currentRating === "" || comment === "") {
      toast.error("All Fields are mandatory", {
        position: "top-center",
      });
      return;
    }

    try {
      // const auth = getAuth();
      // const user = auth.currentUser;

      // if (!user) {
      //   toast.error("User is not authenticated", {
      //     position: "top-center",
      //   });
      //   return;
      // }

      const reviewRef = collection(db, "reviews");

      const newReview = {
        currentRating,
        comment,
        orderId: id,
        userId: sessionStorage.getItem("id"),
        status: "Pending",
        created_at: Timestamp.now(),
      };

      await addDoc(reviewRef, newReview);

      toast.success("Thanks For Your Review", {
        position: "top-center",
      });
      setLoad(false);
      setTimeout(() => {
        navigate("/myreviews");
      }, 500);
    } catch (error) {
      setLoad(false);
      toast.error("Something Went Wrong", {
        position: "top-center",
      });
    }
  };

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
              Review
            </h1>
            <nav aria-label="breadcrumb animated slideInDown">
              <ol className="breadcrumb text-uppercase mb-0">
                <li className="breadcrumb-item">
                  <a className="text-white" href="#">
                    Dashboard
                  </a>
                </li>
                <li
                  className="breadcrumb-item text-primary active"
                  aria-current="page"
                >
                  Review
                </li>
              </ol>
            </nav>
          </div>
        </div>
        {/* Page Header End */}
        {/* Contact Start */}
        <div className="container-xxl py-5">
          <div className="container">
            <div
              className="text-center mx-auto mb-5 wow fadeInUp"
              data-wow-delay="0.1s"
              style={{ maxWidth: 600 }}
            >
              <h4 className="section-title">Review</h4>
              <h1 className="display-5 mb-4">Leave A Review Here</h1>
            </div>
            <div className="row g-5">
              <div
                className="col-lg-6 offset-md-3 wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <form onSubmit={addReviews}>
                  <div className="row g-3">
                    <div className="col-lg-12 col-sm-6 d-flex justify-content-center">
                      {/* <label htmlFor="image">Please Rate Us Out Of 5</label> */}
                      {/* <select
                        className="form-select"
                        style={{ height: 55 }}
                        value={rating}
                        onChange={(e) => {
                          setRating(e.target.value);
                        }}
                      >
                        <option selected="">Select Rating Point</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </select> */}
                      {[1, 2, 3, 4, 5].map((ratingValue) => (
                        <FaStar
                          key={ratingValue}
                          size={50}
                          color={
                            ratingValue <= (hoverRating || currentRating)
                              ? "#ffc107"
                              : "#e4e5e9"
                          }
                          style={{ cursor: "pointer" }}
                          onClick={() => handleClick(ratingValue)}
                          onMouseEnter={() => handleMouseEnter(ratingValue)}
                          onMouseLeave={handleMouseLeave}
                        />
                      ))}
                    </div>

                    <div className="col-12">
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          placeholder="Leave a description here"
                          id="description"
                          style={{ height: "100px" }}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                        <label htmlFor="description">
                          Please Leave a Comment Here
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-primary w-100 py-3"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contact End */}
      <ToastContainer />
    </>
  );
}
