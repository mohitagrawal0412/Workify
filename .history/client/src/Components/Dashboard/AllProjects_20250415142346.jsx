import React, { useState } from 'react';

const AllProjects = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        recipient: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setFormData({
            recipient: "",
            message: "",
        });
    };

    const handleSend = () => {
        console.log('Sending message:', formData);
        handleClose(); // Close modal after sending message
    };

    return (
        <div className="min-h-screen py-10 px-6">
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-full shadow hover:bg-indigo-700"
            >
                Open Modal
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center z-50 modal fade show">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">New Message</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={handleClose}
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="recipient-name" className="col-form-label">
                                            Recipient:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="recipient-name"
                                            name="recipient"
                                            value={formData.recipient}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message-text" className="col-form-label">
                                            Message:
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="message-text"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleClose}
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleSend}
                                >
                                    Send Message
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Background overlay */}
            {isModalOpen && <div className="modal-backdrop fade show"></div>}
        </div>
    );
};

export default AllProjects;
