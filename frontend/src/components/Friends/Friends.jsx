import React from "react";
import "./Friends.css";
import { FaUserFriends } from 'react-icons/fa';
import FriendsTable from "./FriendsTable/FriendsTable";

/**
 * Component that represents the Friends page.
 * Displays a list of friends.
 */
export default function Friends() {
  return (
    <div className="col flex-grow-1 d-flex flex-column p-0" style={{ height: "100vh" }}>
      <div className="friends-container rounded p-0">

        <div className="friends-header">Friends</div>

        <div className="friends-header-content">
          <div className="d-flex align-items-center">

            <div className="friends-tab">All</div>
          </div>
        </div>
        <FriendsTable />
      </div>
    </div>
  );
}
