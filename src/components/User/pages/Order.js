import {
  addDoc,
  collection,
  Timestamp,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db, styleObj } from "../../../Firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { RingLoader } from "react-spinners";
import { storage } from "../../../Firebase2";

export default function Order() {
  const [propertyId, setPropertyId] = useState("");
  const [description, setDescription] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const [imageUrl, setImageUrl] = useState();
  const navigate = useNavigate();

  // setTimeout(() => {
  //   setLoad(false);
  // }, 2000);

  const addOrders = async (e) => {
    e.preventDefault();
    setLoad(true);
    uploadFile();
  }
  const uploadFile = () => {
    if (!file) {
      toast("Please Upload File First");
      setTimeout(() => {
        setLoad(false);
      }, 700);
      return;
    }
    const storageRef = ref(storage, `/Nikita's Files/Orders/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => { },
      (err) => {
        console.log("Error in File Uploading", err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setLoad(false);
          setImageUrl(url);
        });
      }
    );
  };
  useEffect(() => {
    if (!!imageUrl) saveData();
  }, [imageUrl]);
  const saveData = async () => {
    if (propertyId === "" || description === "" || !file || dimensions === "") {
      toast.error("All Fields are mandatory", {
        position: "top-center",
      });
      setLoad(false);
      return;
    }

    try {


      const orderRef = collection(db, "orders");

      // const q = query(orderRef, where("propertyName", "==", propertyName));
      // const querySnapshot = await getDocs(q);

      // if (!querySnapshot.empty) {
      //   toast.error("Property name already exists", {
      //     position: "top-center",
      //   });
      //   setLoad(false);
      //   return;
      // }
      const newOrder = {
        propertyId,
        imageUrl,
        description,
        dimensions,
        userId: sessionStorage.getItem("id"),
        status: "Pending",
        paymentStatus: "Unpaid",
        created_at: Timestamp.now(),
      };

      await addDoc(orderRef, newOrder);
      toast.success("Order Placed successfully", {
        position: "top-center",
      });
      setLoad(false);
      setTimeout(() => {
        navigate("/myorders");
      }, 500);
    } catch (error) {
      toast.error("Something Went Wrong", {
        position: "top-center",
      });
      setLoad(false);
      console.log(error);
    }
  }
  // if (
  //   propertyId === "" ||
  //   description === "" ||
  //   !image ||
  //   dimensions === ""
  // ) {
  //   toast.error("All Fields are mandatory", {
  //     position: "top-center",
  //   });
  //   return;
  // }

  //   try {
  //     const auth = getAuth();
  //     const user = auth.currentUser;

  //     if (!user) {
  //       toast.error("User is not authenticated", {
  //         position: "top-center",
  //       });
  //       return;
  //     }

  //     const orderRef = collection(db, "orders");

  //     // const storageRef = ref(storage, `orders/${image.name}`);
  //     // await uploadBytes(storageRef, image);
  //     // const imageUrl = await getDownloadURL(storageRef);

  //     const newOrder = {
  //       propertyId,
  //       // imageUrl,
  //       description,
  //       dimensions,
  //       userId: user.uid,
  //       status: "Pending",
  //       paymentStatus: "Unpaid",
  //       created_at: Timestamp.now(),
  //     };

  //     await addDoc(orderRef, newOrder);
  //     setLoad(false);
  //     toast.success("Order Booked Successfully", {
  //       position: "top-center",
  //     });
  //     setTimeout(() => {
  //       navigate("/myorders");
  //     }, 3000);
  //   } catch (error) {
  //     toast.error("Something Went Wrong", {
  //       position: "top-center",
  //     });
  //     setLoad(false);
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    setLoad(true)
    const getProperties = () => {
      const propertyRef = collection(db, "propertyTypes");

      const unsubscribe = onSnapshot(propertyRef, (snapshot) => {
        const properties = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(properties);
      });
      setLoad(false)
      return () => unsubscribe();
    };

    getProperties();
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
              Make Order
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
                  Make Order
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
              <h4 className="section-title">Make Order</h4>
              <h1 className="display-5 mb-4">Book Your Order Now</h1>
            </div>
            <div className="row g-5">
              <div
                className="col-lg-6 offset-md-3 wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <form onSubmit={addOrders}>
                  <div className="row g-3">
                    <div className="col-lg-12 col-sm-6">
                      <label htmlFor="image">Select Property Type</label>
                      <select
                        className="form-select"
                        style={{ height: 55 }}
                        value={propertyId}
                        onChange={(e) => {
                          setPropertyId(e.target.value);
                        }}
                      >
                        <option selected="">Select Property Type</option>
                        {data.map((el) => (
                          <>
                            <option value={el.id}>{el.propertyName}</option>
                          </>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-12">
                      <div className="form-floating">
                        <input
                          type="file"
                          className="form-control"
                          id="image"
                          placeholder="Insert Image"
                          value={fileName}
                          onChange={(e) => {
                            setFile(e.target.files[0]);
                            setFileName(e.target.value);
                          }}
                        />
                        <label htmlFor="image">
                          Insert Image of your Property
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Property Name"
                          value={dimensions}
                          onChange={(e) => setDimensions(e.target.value)}
                        />
                        <label htmlFor="name">Enter Dimensions</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          placeholder="Leave a description here"
                          id="description"
                          style={{ height: 100 }}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                        <label htmlFor="description">
                          Enter Description of Your Property
                        </label>
                      </div>
                    </div>

                    <div className="col-12">
                      <button
                        className="btn btn-primary w-100 py-3"
                        type="submit"
                      >
                        Book
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
