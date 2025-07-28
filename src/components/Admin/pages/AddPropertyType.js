import {
  addDoc,
  collection,
  Timestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, styleObj, db } from "../../../Firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { RingLoader } from "react-spinners";
import { storage } from "../../../Firebase2"
export default function AddPropertyType() {
  const [propertyName, setPropertyName] = useState("");
  const [description, setDescription] = useState("");
  const [load, setLoad] = useState(false);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const [imageUrl, setImageUrl] = useState();


  const navigate = useNavigate();

  const addProperties = async (e) => {
    e.preventDefault();
    setLoad(true);
    uploadFile();
  };

  const uploadFile = () => {
    if (!file) {
      toast("Please Upload File First");
      setTimeout(() => {
        setLoad(false);
      }, 700);
      return;
    }
    const storageRef = ref(storage, `/Nikita's Files/${file.name}`);
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
    if (propertyName === "" || description === "" || !fileName) {
      toast.error("All Fields are mandatory", {
        position: "top-center",
      });
      setLoad(false);
      return;
    }

    try {
      // const auth = getAuth();
      // const user = auth.currentUser;

      // if (!user) {
      //   toast.error("Admin is not authenticated", {
      //     position: "top-center",
      //   });
      //   setLoad(false);
      //   return;
      // }

      const propertyRef = collection(db, "propertyTypes");

      const q = query(propertyRef, where("propertyName", "==", propertyName));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        toast.error("Property name already exists", {
          position: "top-center",
        });
        setLoad(false);
        return;
      }

      // const storageRef = ref(storage, `propertytypes/${image.name}`);
      // await uploadBytes(storageRef, image);
      // const imageUrl = await getDownloadURL(storageRef);

      const newProperty = {
        propertyName,
        imageUrl,
        description,
        status: true,
        created_at: Timestamp.now(),
      };

      await addDoc(propertyRef, newProperty);
      toast.success("Data Added successfully", {
        position: "top-center",
      });
      setLoad(false);
      setTimeout(() => {
        navigate("/admin/manageproperties");
      }, 500);
    } catch (error) {
      toast.error("Something Went Wrong", {
        position: "top-center",
      });
      setLoad(false);
      console.log(error);
    }
  }
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
              Property Types
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
                  Add Property Type
                </li>
              </ol>
            </nav>
          </div>
        </div>
        {/* Page Header End */}
        {/* Add PropertyType Start */}
        <div className="container-xxl py-5">
          <div className="container">
            <div
              className="text-center mx-auto mb-5 wow fadeInUp"
              data-wow-delay="0.1s"
              style={{ maxWidth: 600 }}
            >
              <h4 className="section-title">Property Type</h4>
              <h1 className="display-5 mb-4">Add Property Type</h1>
            </div>
            <div className="row g-5">
              <div
                className="col-lg-6 offset-md-3 wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <form onSubmit={addProperties}>
                  <div className="row g-3">
                    <div className="col-md-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Property Name"
                          value={propertyName}
                          onChange={(e) => setPropertyName(e.target.value)}
                        />
                        <label htmlFor="name">Enter Property Name</label>
                      </div>
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
                        <label htmlFor="image">Insert Image</label>
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
                        <label htmlFor="description">Enter Description</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-primary w-100 py-3"
                        type="submit"

                      >
                        Add
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
