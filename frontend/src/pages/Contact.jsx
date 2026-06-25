import { useState } from "react";
import { createContact } from "../services/contactService";
import toast from "react-hot-toast";

const initialState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  honeypot: "",
};

function Contact() {
  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.honeypot.trim()) {
      toast.error("Spam detected.");
      return;
    }

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast.error("Please fill in all fields before sending your message.");
      return;
    }

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    setIsSubmitting(true);

    try {
      await createContact(payload);

      toast.success("Message sent successfully!");
      setFormData(initialState);
    } catch (error) {
      console.error("Axios Error:", error);
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);
      console.log(
        "FULL RESPONSE:",
        JSON.stringify(error.response?.data, null, 2)
      );

      if (error.response?.data?.detail) {
        const detail = error.response.data.detail;

        if (Array.isArray(detail)) {
          toast.error(detail.map((d) => d.msg).join(", "));
        } else {
          toast.error(detail);
        }
      } else {
        toast.error("Something went wrong while sending your message.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-36 min-h-screen bg-black text-white flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900/90 p-8 rounded-2xl w-full max-w-xl shadow-2xl border border-gray-800"
      >
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
            Let’s talk
          </p>
          <h1 className="text-3xl font-semibold mt-2">Contact Me</h1>
          <p className="text-gray-400 mt-2">
            Share your ideas, opportunities, or feedback and I’ll get back to
            you soon.
          </p>
        </div>

        <input
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-4 p-3 bg-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 bg-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full mb-4 p-3 bg-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <textarea
          name="message"
          placeholder="Your message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          className="w-full mb-4 p-3 bg-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg w-full font-medium disabled:opacity-70"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}

export default Contact;
