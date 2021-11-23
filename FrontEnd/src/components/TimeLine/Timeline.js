import React from "react";
import "./Timeline.css";
function Timeline() {
  return (
    <>
      <div class="timeline">
        <div class="timeline__item">
          <h3 class="timeline__title">Register</h3>
        </div>

        <div class="timeline__item">
          <h3 class="timeline__title">Login</h3>
        </div>

        <div class="timeline__item">
          <h3 class="timeline__title">Record a Transaction</h3>
        </div>

        <div class="timeline__item">
          <h3 class="timeline__title">
            <span class="timeline__title--highlight">View Transactions</span>
          </h3>
        </div>

        <div class="timeline__item">
          <h3 class="timeline__title">View Passbook</h3>
        </div>

        <div class="timeline__item">
          <h3 class="timeline__title">View Analytics</h3>
        </div>

        <div class="timeline__item">
          <h3 class="timeline__title">Download Reports</h3>
        </div>
      </div>
    </>
  );
}

export default Timeline;
