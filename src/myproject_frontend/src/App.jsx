import React, { useState, useEffect } from "react";
// Re-including this import as per your provided code.
import { myproject_backend } from "../../declarations/myproject_backend";

// Define a key for localStorage to store our ideas
const LOCAL_STORAGE_KEY = "ideaVaultIdeas";

// Define guidelines for each domain
const domainGuidelines = {
  "Product": {
    title: "Product Ideas",
    description: "Share innovative concepts for new products or enhancements to existing ones. Focus on user problems, proposed solutions, and potential features. Think about mobile apps, software, gadgets, or even physical products.",
  },
  "Research": {
    title: "Research Topics",
    description: "Propose areas for academic or scientific inquiry. Outline the core question, potential methodologies, expected outcomes, or hypotheses. This is for deep dives into specific subjects or new theories.",
  },
  "Art": {
    title: "Artistic Concepts",
    description: "Describe ideas for creative projects, installations, performances, or digital art. Explain the artistic vision, medium, and the message or emotion you wish to convey. From painting to interactive experiences.",
  },
  "Startup": {
    title: "Startup Ventures",
    description: "Detail concepts for a new business or venture. Include the problem you're solving, your unique value proposition, target market, and a brief overview of the business model. Think big, scalable ideas.",
  },
  "Tech features improvement": {
    title: "Tech Feature Enhancements",
    description: "Suggest improvements or new features for existing software, hardware, or platforms. Focus on specific functionality, user experience (UX) enhancements, or technical optimizations. How can current tech be better?",
  },
  "Environment related": {
    title: "Environmental Initiatives",
    description: "Propose ideas for sustainability, conservation, green tech, or ecological solutions. Describe the environmental challenge addressed, the proposed action, and potential impact. From local initiatives to global solutions.",
  },
};


function App() {
  const [idea, setIdea] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [allIdeas, setAllIdeas] = useState(() => {
    try {
      const storedIdeas = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedIdeas ? JSON.parse(storedIdeas) : {};
    } catch (error) {
      console.error("Failed to parse stored ideas from localStorage:", error);
      return {};
    }
  });
  const [viewingDomain, setViewingDomain] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // State for controlling the custom confirmation modal
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const domains = [
    "Product",
    "Research",
    "Art",
    "Startup",
    "Tech features improvement",
    "Environment related",
  ];

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allIdeas));
      console.log("Ideas saved to localStorage.");
    } catch (error) {
      console.error("Failed to save ideas to localStorage:", error);
      setErrorMessage("Failed to save ideas. Your browser's storage might be full.");
    }
  }, [allIdeas]);

  const submitIdea = () => {
    setErrorMessage("");
    if (!selectedDomain) {
      setErrorMessage("Please select a domain before submitting your idea.");
      return;
    }
    if (idea.trim() === "") {
      setErrorMessage("Please enter your idea before submitting.");
      return;
    }
    setAllIdeas(prevIdeas => {
      const newIdeas = { ...prevIdeas };
      if (!newIdeas[selectedDomain]) {
        newIdeas[selectedDomain] = [];
      }
      newIdeas[selectedDomain].push(idea.trim());
      return newIdeas;
    });

    // Set the message for the modal and show it with updated wording
    setModalMessage(
      "⚠️ Idea submitted! Once submitted, ideas cannot be edited. " +
      "For **urgent requests**, any **further issues**, or **general inquiries**, " +
      "please contact us at: support@ideavault.com"
    );
    setShowConfirmationModal(true); // Show the custom modal

    setIdea("");
    setSelectedDomain("");
    setViewingDomain(selectedDomain);
  };

  return (
    <div className="all"> {/* This outer div can be styled in index.css if needed for full page */}
      <div style={styles.container}>
        <h1 style={styles.header}>💡 Research/Project Idea Vault</h1>

        {/* Section for submitting new ideas */}
        <div style={styles.section}>
          <h2 style={styles.subHeader}>Submit a New Idea</h2>
          <div style={styles.inputGroup}>
            <label htmlFor="domain-select" style={styles.label}>
              Select Domain:
            </label>
            <select
              id="domain-select"
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              style={styles.select}
            >
              <option value="">-- Choose a Domain --</option>
              {domains.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </div>

          {/* Display guidelines when a domain is selected for submission */}
          {selectedDomain && domainGuidelines[selectedDomain] && (
            <div style={styles.guidelineBox}>
              <h3 style={styles.guidelineTitle}>{domainGuidelines[selectedDomain].title} Guidelines:</h3>
              <p style={styles.guidelineDescription}>{domainGuidelines[selectedDomain].description}</p>
            </div>
          )}

          <div style={styles.inputGroup}>
            <label htmlFor="idea-input" style={styles.label}>
              Your Idea:
            </label>
            <input
              id="idea-input"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Enter your idea here"
              style={styles.input}
            />
          </div>
          {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
          
          {/* Red warning note */}
          <div style={styles.warningNote}>
            **Note:** Spamming or submitting inappropriate content is strictly prohibited and may result in warnings or removal.
          </div>

          <button onClick={submitIdea} style={styles.button}>
            Submit Idea
          </button>
        </div>

        {/* Section for viewing registered ideas */}
        <div style={styles.section}>
          <h2 style={styles.subHeader}>📜 Registered Ideas</h2>
          <div style={styles.inputGroup}>
            <label htmlFor="view-domain-select" style={styles.label}>
              View Ideas by Domain:
            </label>
            <select
              id="view-domain-select"
              value={viewingDomain}
              onChange={(e) => setViewingDomain(e.target.value)}
              style={styles.select}
            >
              <option value="">-- Select Domain to View --</option>
              {domains.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </div>

          {/* Display guidelines when a domain is selected for viewing */}
          {viewingDomain && domainGuidelines[viewingDomain] && (
            <div style={styles.guidelineBox}>
              <h3 style={styles.guidelineTitle}>{domainGuidelines[viewingDomain].title} Ideas:</h3>
              <p style={styles.guidelineDescription}>{domainGuidelines[viewingDomain].description}</p>
            </div>
          )}

          {viewingDomain && allIdeas[viewingDomain] && (
            <ul style={styles.ideaList}>
              {allIdeas[viewingDomain].map((i, idx) => (
                <li key={idx} style={styles.ideaItem}>
                  {i}</li>
              ))}
            </ul>
          )}
          {viewingDomain &&
            (!allIdeas[viewingDomain] ||
              allIdeas[viewingDomain].length === 0) && (
            <p style={styles.noIdeasMessage}>
              No ideas registered for the "{viewingDomain}" domain yet.
            </p>
          )}
          {!viewingDomain && (
            <p style={styles.noIdeasMessage}>
              Please select a domain to view registered ideas.
            </p>
          )}
        </div>
      </div>

      {/* Footer - Positioned for centering with max-width matching container */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>&copy; {new Date().getFullYear()} IdeaVault. All rights reserved.</p>
        <p style={styles.footerText}>
          Contact Us: <a href="mailto:support@ideavault.com" style={styles.footerLink}>support@ideavault.com</a>
        </p>
      </footer>

      {/* Custom Confirmation Modal */}
      {showConfirmationModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <p style={styles.modalMessage}>{modalMessage}</p>
            <button onClick={() => setShowConfirmationModal(false)} style={styles.modalButton}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Inline styles for the components
const styles = {
  container: {
    padding: "2rem",
    fontFamily: "Roboto, sans-serif",
    maxWidth: "800px",
    margin: "0 auto", // This centers the container itself
    backgroundImage: "linear-gradient(to right,rgb(112, 134, 233),rgb(177, 148, 243))", // Your preferred gradient
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    color: "#2c3e50",
    marginBottom: "2rem",
    fontSize: "2.5rem",
    fontWeight: "bold",
  },
  section: {
    backgroundColor: "#ffffff", // Keeping sections white for readability
    padding: "1.5rem",
    borderRadius: "8px",
    marginBottom: "1.5rem",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    // Your preferred gradient on the section background
    backgroundImage: "linear-gradient(to left,rgb(112, 134, 233),rgb(177, 148, 243))",
    border: "1px solid #e0e0e0",
  },
  subHeader: {
    color: "#34495e",
    marginBottom: "1.2rem",
    fontSize: "1.8rem",
    borderBottom: "2px solid #3498db",
    paddingBottom: "0.5rem",
  },
  inputGroup: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    color: "#555",
    fontWeight: "bold",
  },
  input: {
    width: "calc(100% - 20px)",
    padding: "0.8rem 10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
    boxSizing: "border-box",
  },
  select: {
    width: "100%",
    padding: "0.8rem 10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
    backgroundColor: "#fff",
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23333' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 10px center",
    backgroundSize: "1em",
  },
  button: {
    backgroundColor: "#3498db",
    color: "white",
    padding: "0.8rem 1.5rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1.1rem",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
    marginTop: "1rem",
    display: "block",
    width: "100%",
  },
  buttonHover: {
    backgroundColor: "#2980b9",
  },
  ideaList: {
    listStyleType: "disc",
    paddingLeft: "20px",
    marginTop: "1.5rem",
  },
  ideaItem: {
    backgroundColor: "#f9f9f9",
    border: "1px solid #eee",
    borderRadius: "4px",
    padding: "0.8rem",
    marginBottom: "0.6rem",
    fontSize: "1.05rem",
    color: "#444",
  },
  errorMessage: {
    color: "#e74c3c",
    marginBottom: "1rem",
    fontWeight: "bold",
  },
  noIdeasMessage: {
    color: "#7f8c8d",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: "1rem",
  },
  guidelineBox: {
    backgroundColor: "#e8f0f7",
    borderLeft: "4px solid #3498db",
    padding: "1rem 1.2rem",
    borderRadius: "6px",
    marginBottom: "1.5rem",
    fontSize: "0.95rem",
    color: "#333",
    lineHeight: "1.5",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  },
  guidelineTitle: {
    color: "#2980b9",
    fontSize: "1.1rem",
    marginBottom: "0.5rem",
  },
  guidelineDescription: {
    color: "#555",
    fontSize: "0.95rem",
  },
  warningNote: {
    backgroundColor: "#ffe0e0",
    border: "1px solid #e74c3c",
    color: "#c0392b",
    padding: "0.8rem",
    borderRadius: "4px",
    marginBottom: "1rem",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "0.9em",
  },
  // Styles for the custom modal
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark overlay
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000, // Ensure it's on top of everything
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
    maxWidth: "400px",
    textAlign: "center",
    position: "relative",
  },
  modalMessage: {
    fontSize: "1.1rem",
    marginBottom: "1.5rem",
    color: "#333",
  },
  modalButton: {
    backgroundColor: "#3498db",
    color: "white",
    padding: "0.6rem 1.2rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s ease",
  },
  // Corrected styles for the footer for centering and visibility
  footer: {
    marginTop: "2rem", // Space above the footer
    padding: "1rem",
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)", // More opaque background for better visibility
    color: "#FFFFFF", // Explicitly white text for clear visibility
    fontSize: "0.9rem",
    width: "100%",
    maxWidth: "800px", // Match the max-width of the container for alignment
    margin: "0 auto", // Center the footer horizontally
    borderRadius: "8px",
    boxShadow: "0 -2px 8px rgba(0,0,0,0.05)",
  },
  footerText: {
    margin: "0.3rem 0",
    color: "#FFFFFF", // Ensure text color is white here as well for direct text elements
  },
  footerLink: {
    color: "#ADD8E6", // Lighter blue for links in footer
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
};

export default App;
