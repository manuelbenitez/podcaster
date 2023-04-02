import { useStoreState } from "@/store";
import Link from "next/link";
import React, { useEffect } from "react";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const isLoadingState = useStoreState((state) => state.podcasts.isLoading);

  return (
    <div className={styles.navbar}>
      <Link href="/">Podcaster</Link>
      {isLoadingState && <p>Loading</p>}
    </div>
  );
};

export default Navbar;
