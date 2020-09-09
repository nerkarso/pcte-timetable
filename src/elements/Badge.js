import React from 'react';
import '../styles/Badge.scss';

export default function Badge({ children }) {
  return <span className="badge">{children}</span>;
}
