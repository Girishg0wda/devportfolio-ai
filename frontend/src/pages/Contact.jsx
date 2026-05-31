import { useState } from "react";
import { createContact } from "../services/contactService";
import toast from "react-hot-toast";

function Contact() {

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createContact(formData);

      toast.success("Message sent!");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

    } catch (error) {
      console.error(error);

      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center">

      <form
        onSubmit={handleSubmit}
        className="
          bg-gray-900
          p-8
          rounded-xl
          w-full
          max-w-xl
        "
      >
        <h1 className="text-3xl mb-6">
          Contact Me
        </h1>

        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="
            w-full
            mb-4
            p-3
            bg-gray-800
            rounded
          "
        />

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="
            w-full
            mb-4
            p-3
            bg-gray-800
            rounded
          "
        />

        <input
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          className="
            w-full
            mb-4
            p-3
            bg-gray-800
            rounded
          "
        />

        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          className="
            w-full
            mb-4
            p-3
            bg-gray-800
            rounded
          "
        />

        <button
          className="
            bg-blue-600
            px-6
            py-3
            rounded
            w-full
          "
        >
          Send Message
        </button>

      </form>

    </div>
  );
}

export default Contact;