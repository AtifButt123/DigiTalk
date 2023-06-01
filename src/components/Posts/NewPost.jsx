import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import './Post.css';

export default function NewPost(props) {
    const [showForm, setShowForm] = useState(false);
    const [fileName, setFileName] = useState("");
    const [fileSize, setFileSize] = useState(0);

    const handleToggleForm = () => {
        setShowForm(!showForm);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(URL.createObjectURL(file));
            setFileSize(Math.round(file.size / 1024));
        }
    };

    return (
        <div className="card post-card button new-post-section">
            <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                    <h5 htmlFor="exampleFormControlTextarea1">Create post</h5>

                    <button
                        className={`btn btn-link text-light ${showForm ? 'active' : ''}`}
                        onClick={handleToggleForm}
                        style={{
                            padding: '0.5rem',
                            borderRadius: '50%',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                            transition: 'all 0.3s ease',
                            outline: 'none',
                            border: 'none',
                            position: 'relative',
                            width: '2.5rem',
                            height: '2.5rem',
                            backgroundColor: 'blue'
                        }}
                    >
                        <FontAwesomeIcon
                            icon={showForm ? faTimes : faPlus}
                            style={{
                                fontSize: '1.2rem',
                                position: 'relative',
                                zIndex: 1,
                                color: '#fff' //icon color

                            }}
                        />
                        <span
                            className="bg-primary"
                            style={{
                                width: '2.5rem',
                                height: '2.5rem',
                                borderRadius: '50%',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                transform: showForm ? 'scale(1)' : 'scale(0)',
                                opacity: showForm ? 1 : 0,
                                transition: 'all 0.3s ease',
                                zIndex: 0,
                            }}
                        />
                    </button>



                </div>
                <hr className="divider" />
                {showForm && (
                    <form>
                        <div className="form-group">
                            <label htmlFor="content"> Write text</label>
                            <textarea
                                className="form-control mb-2"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                placeholder="Tell world something new and special..."
                                maxLength={200}
                            ></textarea>
                            <label htmlFor="tags"> Add tags</label>
                            <input
                                className="form-control mb-2"
                                type="text"
                                htmlFor="tags"
                                placeholder="Add tags e.g : #Tehreek_e_insaaf, #Eduction_in_pakistan"
                            />
                            <label htmlFor="tags"> Add files</label>
                            <div className="form-group my-1">
                                <label
                                    className="btn btn-outline-primary"
                                    style={{ cursor: "pointer" }}
                                    htmlFor="image"
                                >
                                    {!fileName ? (
                                        <>
                                            <i className="bi bi-clipboard-plus pr-2"></i>Add image
                                        </>
                                    ) : (
                                        ""
                                    )}
                                    <input
                                        type="file"
                                        name="image"
                                        id="image"
                                        accept="image/*"
                                        style={{ display: "none" }}
                                        onChange={handleFileChange}
                                    />
                                    {fileName ? (
                                        <img
                                            id="output"
                                            src={fileName}
                                            style={{ height: "200px", objectFit: "contain" }}
                                            className="img-fluid rounded-start m-2"
                                            alt="..."
                                        />
                                    ) : (
                                        ""
                                    )}
                                </label>
                                {fileSize > 1024 * 5 ? (
                                    <small className="form-text text-muted">
                                        Max file size: 5 MB
                                    </small>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                        <div className="text-end">
                            <button
                                type="submit"
                                className="btn btn-primary post-button px-3 font-weight-bold"
                            >
                                Post
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
