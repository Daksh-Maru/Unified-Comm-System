import { useOrganization, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const RequireOrg = ({ children }) => {
  const { organization } = useOrganization();
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn && !organization) {
      navigate("/onboarding");
    }
  }, [isSignedIn, organization, navigate]);

  return children;
};
