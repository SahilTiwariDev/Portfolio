import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import Step1 from "../components/Step1";
import Step2 from "../components/Step2";
import Step3 from "../components/Step3";
import ScrollToTop from "../components/ScrollToTop";

const Contact = () => {
  const [start, setStart] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);

  const handleNext = () => {
    if (step === 1 && formData.user_name.trim() === "") return;
    if (step === 2 && !/\S+@\S+\.\S+/.test(formData.user_email)) return;
    setStep((prev) => prev + 1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = () => {
    if (formData.message.trim() === "") return;
    setIsSending(true);
    emailjs
      .send(
        "service_9uhmkv3",
        "template_99qx3na",
        formData,
        "AufdBNITQka3thnfC"
      )
      .then(() => {
        // Reset form and step after email is sent
        setFormData({ user_name: "", user_email: "", message: "" });
        setStep(1);
        setStart(false);
      })
      .catch((err) => console.error("Email error:", err))
      .finally(() => setIsSending(false));
  };

  const formVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -40, transition: { duration: 0.4 } },
  };

  const getProgressWidth = () => {
    if (step === 1) return "0%";
    if (step === 2) return "50%";
    return "100%";
  };

  return (
    <div className="relative min-h-screen bg-neutral-800 text-white font-mono px-4 sm:px-6 flex items-center justify-center">
      <ScrollToTop />
      <div className="absolute top-6 left-6 text-xl sm:text-2xl">
        Contact <span className="text-purple-500">/&gt;</span>
      </div>

      <div className="w-full max-w-md sm:max-w-lg mx-auto">
        {!start ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center gap-6"
          >
            <button
              onClick={() => setStart(true)}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full text-lg transition shadow-lg"
            >
              Wanna tell me something?
            </button>
          </motion.div>
        ) : (
          <>
            {/* Progress Bar with Wavy Fill */}
            <div className="w-full mt-4 mb-6">
              <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-purple-500 rounded-full animate-wave"
                  initial={{ width: 0 }}
                  animate={{ width: getProgressWidth() }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                ></motion.div>
              </div>
            </div>

            {/* Step Animation */}
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={formVariants}
                >
                  <Step1
                    formData={formData}
                    handleChange={handleChange}
                    handleNext={handleNext}
                  />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={formVariants}
                >
                  <Step2
                    formData={formData}
                    handleChange={handleChange}
                    handleNext={handleNext}
                  />
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={formVariants}
                >
                  <Step3
                    formData={formData}
                    handleChange={handleChange}
                    sendEmail={sendEmail}
                    isSending={isSending}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
};

export default Contact;
