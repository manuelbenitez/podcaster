import Link from "next/link";
import React from "react";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Link href="/">Podcaster</Link>
    </div>
  );
};

export default Navbar;
