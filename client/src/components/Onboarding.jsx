import { useState } from "react";
import { useUser } from "@clerk/clerk-react"; // Assuming Clerk is used
import { useNavigate } from "react-router";
import axios from "../utils/axios"; // Assuming you have a custom axios instance set up

const Onboarding = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const [orgName, setOrgName] = useState("");
  const [position, setPosition] = useState("");
  const [isNewOrg, setIsNewOrg] = useState(true); // Toggle for creating or joining an org
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isNewOrg) {
        // Create a new organization
        await axios.post("/organization/create", { orgName });
  
        // Assign the organization and position to the user
        await axios.post("/organization/assign", {
          userId: user.id,
          orgName,
          position,
        });
  
        // Update Clerk metadata
        await user.update({
          unsafeMetadata: {
            position,
            organization: orgName,
          },
        });
  
        // Redirect to the dashboard
        navigate("/");
      } else {
        // Join an existing organization
        console.log("Axios URL:", axios.defaults.baseURL + "/organization/join");
        console.log("Joining organization:", orgName, position, user.id);
  
        const response = await axios.post("/organization/join", {
          orgName,
          userId: user.id,
          position,
        });
  
        // Update Clerk metadata
        await user.update({
          unsafeMetadata: {
            position,
            organization: orgName,
          },
        });
  
        // Navigate on success
        navigate("/");
      }
    } catch (err) {
      if (err.response) {
        const { status, data } = err.response;
  
        // Show appropriate messages from backend
        if (status === 404) {
          alert(data.message || "Organization not found.");
        } else if (status === 409) {
          alert(data.message || "User already in the organization.");
          // Optionally still redirect or let them decide
          navigate("/");
        } else if (status === 400) {
          alert(data.message || "Bad request. Please check the form.");
        } else {
          alert(data.message || "An unexpected error occurred.");
        }
      } else {
        alert("Network error or server not reachable.");
      }
  
      console.error("Error during onboarding:", err);
    }
  };
  

  return (
    <div className="container">
      <h2>{isNewOrg ? "Create Your Organization" : "Join an Organization"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="orgName">Organization Name</label>
          <input
            type="text"
            id="orgName"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="position">Your Position</label>
          <input
            type="text"
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>

        <button type="submit">
          {isNewOrg ? "Create Organization" : "Join Organization"}
        </button>
      </form>

      <button onClick={() => setIsNewOrg(!isNewOrg)}>
        {isNewOrg ? "Want to Join an Organization?" : "Want to Create a New Organization?"}
      </button>
    </div>
  );
};

export default Onboarding;
