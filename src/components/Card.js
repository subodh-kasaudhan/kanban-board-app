import React from "react";
import "./main.css";
import done from "./assets/blue-tick.png";
import progress from "./assets/in-progress.png";
import todo from "./assets/todo.png";
import backlog from "./assets/backlog.png";
import cancel from "./assets/cancel.png";

const Card = ({ user, ticket, groupBy }) => {
  var fullName = user.name;
  const intials = fullName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();
  return (
    <main key={ticket.id} className="l-card">
      <section className="l-card__user">
        {groupBy != "user" ? (
          <div className="icon-container">
            <div id="profileImage">{intials}</div>
            {user.available == true ? (
              <div className="status-green-circle"></div>
            ) : (
              <div className="status-gray-circle"></div>
            )}
          </div>
        ) : (
          <div className="icon-container1"></div>
        )}
        <div className="l-card__userInfo">
          <span>{ticket.id}</span>
          {groupBy != "status" ? (
            <img
              className="top-card1"
              src={(() => {
                switch (ticket.status) {
                  case "Done":
                    return done;
                  case "In progress":
                    return progress;
                  case "Todo":
                    return todo;
                  case "Backlog":
                    return backlog;
                  default:
                    return cancel;
                }
              })()}
              alt="logo"
            />
          ):
          <span></span>
          }
          <span>{ticket.title}</span>
        </div>
      </section>
      <section className="l-card__user">
        {groupBy != "priority" && (
          <span className="bottom-card">
            {(() => {
              switch (ticket.priority) {
                case 4:
                  return (
                    <span className="material-symbols-outlined">
                      assignment_late
                    </span>
                  );
                case 3:
                  return (
                    <span className="material-symbols-outlined">
                      signal_cellular_4_bar
                    </span>
                  );
                case 2:
                  return (
                    <span className="material-symbols-outlined">
                      network_cell
                    </span>
                  );
                case 1:
                  return (
                    <span className="material-symbols-outlined">
                      signal_cellular_1_bar
                    </span>
                  );
                default:
                  return (
                    <span className="material-symbols-outlined">
                      more_horiz
                    </span>
                  );
              }
            })()}
          </span>
        )}

        <span className="bottom-card">
          <span className="status-dot"></span>

          {ticket.tag.map((index) => (
            <span className="l-card__text" key={index.id}>
              {index}
            </span>
          ))}
        </span>
      </section>
    </main>
  );
};
export default Card;
