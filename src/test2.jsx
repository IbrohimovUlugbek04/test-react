// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { FaBeer } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { RiSendPlaneFill } from "react-icons/ri";
import { MdOutlineAttachFile } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { FaFile } from "react-icons/fa";

//import css

import "../../scss/main.scss";
import homepageimg from "../../images/icon/bv.png";
import servicesimg from "../../images/icon/services.png";
import chatimg from "../../images/icon/chat.png";
import cabinetimg from "../../images/icon/cabinet.png";
// const isLogeddIn = localStorage.getItem("bv-token") ? true : false;

let admin_id = import.meta.env.VITE_ADMIN_ID;

const Chat = () => {
  const [users, setUsers] = useState(null);
  const [chat, setChat] = useState(null);
  const [message, setMessage] = useState(null);

  const token = localStorage.getItem("bv-token");
  const isLogeddIn = token ? true : false;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });
        const res = await response.json();
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchAllChats = async () => {
      try {
        const response = await fetch("http://localhost:5000/chat", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });
        const res = await response.json();
        setChat(res.data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    const PostChatsAllChats = async () => {
      try {
        const response = await fetch("http://localhost:5000/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            userId: admin_id,
          }),
        });

        const res = await response.json();
        console.log(res);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    const fetchAllMessages = async (params) => {
      try {
        const response = await fetch(`http://localhost:5000/message${params}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });
        const res = await response.json();
        setMessage(res.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (isLogeddIn) {
      fetchUserData();
      fetchAllChats();
      PostChatsAllChats();
      // Uncomment and provide appropriate params when ready to use
      // fetchAllMessages(params);
    }
  }, [isLogeddIn, token]);

  const usersImg = chat?.map((e) => e?.photo);
  console.log(usersImg);
  const usersName = chat?.map((e) =>
    e?.users?.filter((el) => {
      return el?._id != users?._id;
    })
  );
  const results = [];
  usersName?.forEach((el) => {
    el?.forEach((element) => {
      // console.log(element.message);
      results.push(
        <li
          className="site-chat__users-item"
          key={element?._id}
          onClick={(evt) => handleClick(element?.id, evt)}
        >
          <button to={"/chat"}>
            <img src={usersImg[0]} alt="user img" />
            <div className="site-chat__users-item__box">
              <strong className="site-chat__users-name">
                {element?.last_name} {element?.username}
              </strong>
              <span className="site-chat__users-message">
                yaqinda online edi
              </span>
            </div>
          </button>
        </li>
      );
    });
  });

  // click handler start

  const [listItems, setListItems] = useState([]);

  const handleClick = (id, evt) => {
    const value = id;
    console.log(value);

    const newItems = chat
      .filter((item) => id === item.id)
      .map((item) => {
        return <li key={item.id}>ishladi</li>;
      });
    setListItems(newItems);
  };
  // click handler end

  // file value Start
  const [fileInputValue, setFileInputValue] = useState("");
  const [displayBox, setDisplayBox] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(fileInputValue);
    setDisplayBox(false);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setFileInputValue(value);
    if (value) {
      console.log("Ishladi!");
      setDisplayBox(true);
    }
  };

  const handleResetButtonClick = () => {
    setFileInputValue("");
    // if (fileInputValue === "") {
    // }
    setDisplayBox(false);
    console.log("ishlamadi!");
  };

  // file value end

  console.log(chat);

  return (
    <div>
      <header className="site-header__chat">
        <div className="site-header__bottom">
          <div className="container">
            <div className="site-header__bottom-wrapper">
              <ul className="site-header__bottom-list">
                <li className="site-header__bottom-item">
                  <Link to={"/"} className="site-header__bottom-link">
                    <img
                      className="site-header__bottom-btn__img"
                      src={homepageimg}
                      alt="Bosh sahifa"
                    />
                    <span className="site-header__bottom-btn__text">
                      Bosh sahifa
                    </span>
                  </Link>
                </li>
                <li className="site-header__bottom-item">
                  <Link
                    to={isLogeddIn ? "/Services" : "/login"}
                    className="site-header__bottom-link"
                  >
                    <img
                      className="site-header__bottom-btn__img"
                      src={servicesimg}
                      alt="Xizmatlar"
                    />
                    <span className="site-header__bottom-btn__text">
                      Xizmatlar
                    </span>
                  </Link>
                </li>
                <li className="site-header__bottom-item">
                  <Link
                    to={isLogeddIn ? "/Chat" : "/login"}
                    className="site-header__bottom-link"
                  >
                    <img
                      className="site-header__bottom-btn__img"
                      src={chatimg}
                      alt="chat"
                    />
                    <span className="site-header__bottom-btn__text">
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      Biz bilan bog'lanish
                    </span>
                  </Link>
                </li>
                <li className="site-header__bottom-item">
                  <Link
                    to={isLogeddIn ? "/cabinet" : "/login"}
                    className="site-header__bottom-link"
                  >
                    <img
                      className="site-header__bottom-btn__img"
                      src={cabinetimg}
                      alt="Kabinet"
                    />
                    <span className="site-header__bottom-btn__text">
                      Kabinet
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* site header bottom  finish */}
      </header>
      <main className="site-cabinet__chat-main">
        <section className="site-chat">
          <div className="site-chat__container">
            <div className="site-chat__wrapper">
              <div className="site-chat__users">
                <Link className="site-chat__users-back" to={"/"}>
                  <IoMdArrowRoundBack />
                  Orqaga
                </Link>
                <ul className="site-chat__stage-list">
                  <li className="site-chat__stage-item">All</li>
                </ul>

                <ul className="site-chat__users-list">{results}</ul>
                
              </div>
              <div className="site-chat__message-add">
                <div className="site-chat__user-acaund">
                  <div className="container">
                    <div className="site-chat__user-acaund__wrapper">
                      {/* <img className="site-chat__user-acaund-img" src={usersImg[1]} alt="User" /> */}
                    </div>
                  </div>
                </div>
                {listItems.length > 0 && <ul className="list">{listItems}</ul>}
                <div className="site-chat__form-box">
                  <div className="container">
                    <form className="site-chat__form" onSubmit={handleSubmit}>
                      <div className="site-chat__input-box">
                        <textarea
                          className="site-chat__input-text"
                          placeholder="Message"
                          rows="auto"
                        ></textarea>
                        <label className="site-chat__label-file">
                          <MdOutlineAttachFile />
                          <input
                            className="site-chat__input-file js-file"
                            type="file"
                            aria-label="File"
                            multiple
                            value={fileInputValue}
                            onChange={handleInputChange}
                          />
                        </label>
                      </div>
                      <button className="site-chat__button" type="submit">
                        <RiSendPlaneFill />
                      </button>
                      {displayBox && (
                        <div className="input-box">
                          <div className="site-chat__input-box_box">
                            <button
                              className="chat-file__reset-btn"
                              type="button"
                              onClick={handleResetButtonClick}
                            >
                              {/* Reset{" "} */}
                              <IoCloseSharp />
                            </button>
                            <div className="user-add__file-box">
                              <FaFile />
                              <span className="user-add__file-name">
                                {fileInputValue}
                              </span>
                            </div>
                            <div className="site-chat__input-box__input-box">
                              <textarea
                                className="site-chat__input-box__input"
                                placeholder="Izoh qo'shish..."
                                rows="2"
                              ></textarea>
                              <button
                                className="chat-file__submit-btn"
                                type="submit"
                              >
                                YUBORISH
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Chat;
