import React, { useState, useEffect } from "react";
import Card from "./Card";
import done from "./assets/blue-tick.png";
import progress from "./assets/in-progress.png";
import todo from "./assets/todo.png";
import backlog from "./assets/backlog.png";
import cancel from "./assets/cancel.png";

const status = ["Backlog", "Todo", "In progress", "Done", "Cancelled"];
const priority = ["No priority", "Urgent", "High", "Medium", "Low"];

const mp1 = {
  "No priority": 0,
  Urgent: 4,
  High: 3,
  Medium: 2,
  Low: 1,
};

function findUserById(users, userId) {
  return users.find((user) => user.id === userId);
}

export default function Group(props) {
  const [data, setData] = useState({ tickets: [], users: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const categorizedTickets = {};
  const ticketsByPriority = {};
  const userTicketsMap = new Map();

  if (props.grouping === "status") {
    props.ordering === "priority"
      ? status.forEach((stat) => {
          const filteredTickets = data.tickets.filter(
            (ticket) => ticket.status === stat
          );
          categorizedTickets[stat] = filteredTickets.sort(
            (a, b) => b.priority - a.priority
          );
        })
      : status.forEach((stat) => {
          const filteredTickets = data.tickets.filter(
            (ticket) => ticket.status === stat
          );
          categorizedTickets[stat] = filteredTickets.sort((a, b) =>
            a.title.localeCompare(b.title)
          );
        });
  } else if (props.grouping === "priority") {
    priority.forEach((prior) => {
      const filteredPriorTickets = data.tickets.filter(
        (ticket) => ticket.priority === mp1[prior]
      );
      ticketsByPriority[prior] = filteredPriorTickets.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    });
  } else {
    props.ordering === "priority"
      ? data.users.forEach((user) => {
          const userTickets = data.tickets
            .filter((ticket) => ticket.userId === user.id)
            .sort((a, b) => b.priority - a.priority); // Sorting tickets by 'priority'
          userTicketsMap.set(user.id, userTickets);
        })
      : data.users.forEach((user) => {
          const userTickets = data.tickets
            .filter((ticket) => ticket.userId === user.id)
            .sort((a, b) => a.title.localeCompare(b.title)); // Sorting tickets by 'title' in ascending order
          userTicketsMap.set(user.id, userTickets);
        });
  }

  Object.keys(ticketsByPriority).forEach((prior) => {
    console.log(
      `Number of items in ${prior}: ${ticketsByPriority[prior].length}`
    );
  });
  function addmore() {
    return (
      <span className="add-more">
        <span class="material-symbols-outlined">add</span>
        <span className="material-symbols-outlined">more_horiz</span>
      </span>
    );
  }
  switch (props.grouping) {
    case "status":
      return (
        <div className="user-columns-container">
          {status.map((stat) => (
            <div key={stat} className="user-column">
              <div className="user-info">
                <img
                  className="top-card"
                  src={(() => {
                    switch (stat) {
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
                <h3>
                  {stat}
                  <span className="add-count">
                    {categorizedTickets[stat].length}
                  </span>
                  {categorizedTickets[stat].length > 0 && addmore()}
                </h3>

                <div className="ticket-cards">
                  {categorizedTickets[stat].map((ticket) => (
                    <Card
                      key={ticket.id}
                      user={findUserById(data.users, ticket.userId)}
                      ticket={ticket}
                      groupBy={props.grouping}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    case "priority":
      return (
        <div className="user-columns-container">
          {priority.map((prior) => (
            <div key={prior} className="user-column">
              <div className="user-info">
                <span className="priority-icon">
                  {(() => {
                    switch (mp1[prior]) {
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
                <h3>
                  {prior}
                  <span className="add-count">
                    {ticketsByPriority[prior].length}
                  </span>
                  {ticketsByPriority[prior].length > 0 && addmore()}
                </h3>
                <div className="ticket-cards">
                  {ticketsByPriority[prior].map((ticket) => (
                    <Card
                      key={ticket.id}
                      user={findUserById(data.users, ticket.userId)}
                      ticket={ticket}
                      groupBy={props.grouping}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      );

    default:
      return (
        <div className="user-columns-container">
          {data.users.map((user) => (
            <div key={user.id} className="user-column">
              <div className="user-info">
                <div className="icon-container2">
                  <div id="profileImage">
                    {user.name
                      .split(" ")
                      .map((name) => name[0])
                      .join("")
                      .toUpperCase()}
                  </div>

                  {user.available === true ? (
                    <div className="status-green-circle"></div>
                  ) : (
                    <div className="status-gray-circle"></div>
                  )}
                </div>
                <h3>
                  {user.name}
                  <span className="add-count">
                    {userTicketsMap.get(user.id).length}
                  </span>
                  {userTicketsMap.get(user.id).length > 0 && addmore()}
                </h3>
                <div className="ticket-cards">
                  {userTicketsMap.get(user.id)?.map((ticket) => (
                    <Card
                      key={ticket.id}
                      user={user}
                      ticket={ticket}
                      groupBy={props.grouping}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
  }
}
