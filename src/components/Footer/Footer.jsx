import React from "react";
import { Container, Logo } from "../index";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="shadow-md bg-[#E8D9C4] border-b border-[#EAD7C3] py-10 mt-10 ">
      <Container>
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Logo width="50px" />
          </div>

          <div className="space-x-6 text-sm font-medium">
            <Link to="/" className="hover:underline cursor-pointer">Home</Link>
            <Link to="/all-posts" className="hover:underline cursor-pointer">Posts</Link>
            <Link to="/add-post" className="hover:underline cursor-pointer">Add Post</Link>
          </div>

          <hr className="border-t border-[#C7B198] my-4 w-1/2 mx-auto" />

          <p className="text-xs text-[#8D6E63]">
            &copy; {new Date().getFullYear()} ReadFly. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
