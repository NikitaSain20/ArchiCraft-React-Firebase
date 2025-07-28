import { useEffect, useState } from "react";
import {
  doc,
  updateDoc,
  getDoc,
  Timestamp,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { db, styleObj } from "../../../Firebase";
import { RingLoader } from "react-spinners";
import { storage } from "../../../Firebase2"

export default function UpdatePropertyType() {
  const [propertyName, setPropertyName] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [existingImageUrl, setExistingImageUrl] = useState("");
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [imageUrl, setImageUrl] = useState("");


  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const docRef = doc(db, "propertyTypes", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const propertyData = docSnap.data();
          setPropertyName(propertyData.propertyName);
          setDescription(propertyData.description);
          setExistingImageUrl(propertyData.imageUrl);
        } else {
          toast.error("Property type not found", { position: "top-center" });
        }
      } catch (error) {
        toast.error("Failed to fetch property data", {
          position: "top-center",
        });
        console.error("Error fetching property data: ", error);
      }
    };

    fetchPropertyData();
  }, [id]);

  const updateProperty = async (e) => {
    e.preventDefault();
    setLoad(true)
    if (fileName == "") {
      saveData()
    } else {
      uploadFile();
    }

  };
  const uploadFile = () => {

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

          setImageUrl(url);
        });
      }
    );
  };

  useEffect(() => {
    if (!!imageUrl) saveData();
  }, [imageUrl]);
  const saveData = async () => {
    if (
      propertyName === "" ||
      description === "" ||
      (!image && !existingImageUrl)
    ) {
      toast.error("All Fields are mandatory", { position: "top-center" });
      return;
    }


    try {



      // if (image) {
      //   const storageRef = ref(storage, `propertytypes/${image.name}`);
      //   await uploadBytes(storageRef, image);
      //   imageUrl = await getDownloadURL(storageRef);
      // }

      const docRef = doc(db, "propertyTypes", id);

      await updateDoc(docRef, {
        propertyName,
        imageUrl: !imageUrl ? existingImageUrl : imageUrl,
        description,
        status: "active",
        updated_at: Timestamp.now(),
      });

      toast.success("Data updated successfully", { position: "top-center" });
      setLoad(false)
      setTimeout(() => {
        navigate("/admin/manageproperties");
      }, 500);
    } catch (error) {
      setLoad(false)
      toast.error("Something Went Wrong", { position: "top-center" });
      console.error("Error updating property: ", error);
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
        {/* Page Header and Form start */}
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
                  Update Property Type
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="container-xxl py-5">
          <div className="container">
            <div
              className="text-center mx-auto mb-5 wow fadeInUp"
              data-wow-delay="0.1s"
              style={{ maxWidth: 600 }}
            >
              <h4 className="section-title">Property Type</h4>
              <h1 className="display-5 mb-4">Update Property Type</h1>
            </div>
            <div className="row g-5">
              <div
                className="col-lg-6 offset-md-3 wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <form onSubmit={updateProperty}>
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
                        {existingImageUrl && !!imageUrl && (
                          <img
                            src={existingImageUrl}
                            alt="Existing Property"
                            style={{ marginTop: "10px", maxWidth: "100%" }}
                          />
                        )}
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
                        Update
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
