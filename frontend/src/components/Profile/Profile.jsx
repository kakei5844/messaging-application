import React, { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { useFriends } from "../../context/FriendsContext";

/**
 * Component that represents the user profile page.
 * Displays user information such as name, username, email, and friend count.
 */
export default function Profile() {
  const { user } = useUser();
  const { friendCount } = useFriends();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/user/${user.user_id}`);
        setProfile(response.data);
        //console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchProfileData();
    }
  }, [user]);

  return (
    <div
      className="col flex-grow-1 d-flex flex-column p-0"
      style={{ height: "100vh" }}
    >
      <div className="profile-container p-0 rounded">
        <div className="profile-header">Profile</div>

        <div className="profile-main">
          <div
            className="circle"
            id="UserProfileCircle"
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              backgroundColor: "lightgray",
              boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "10px",
              fontSize: "60px",
              color: "gray",
              fontWeight: "500",
            }}
          >
            {user && user.initials}
          </div>
          <div className="profile-name">
            {user && `${user.firstname} ${user.lastname}`}
          </div>
          <div className="profile-username">
            {user && `@${user.username}`}
          </div>
          <div className="profile-line-break"></div>
          <div className="profile-email">{user && user.email}</div>
          <div className="profile-friend">Friends: {friendCount}</div>
        </div>
      </div>
    </div>
  );
}
