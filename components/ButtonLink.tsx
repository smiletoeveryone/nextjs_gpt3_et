// components/ButtonLink.tsx

import Link from 'next/link';
import React from 'react';
import styles from './ButtonLink.module.css';

interface IButtonLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const ButtonLink: React.FC<IButtonLinkProps> = ({ href, children, className }) => {
  return (
    <Link href={href}>
      <a className={`${styles.btn} ${className}`}>{children}</a>
    </Link>
  );
};

export default ButtonLink;

