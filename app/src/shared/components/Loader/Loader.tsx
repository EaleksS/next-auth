import React, { FC } from "react";
import styles from "./Loader.module.scss";

export const Loader: FC = () => {
	return <span className={styles.loader}></span>;
};
