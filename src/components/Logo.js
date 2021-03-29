import React from 'react';

export default function Logo(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 512 512" {...props}>
      <mask id="a" width="512" height="512" x="0" y="0" maskUnits="userSpaceOnUse">
        <rect width="512" height="512" fill="#fff" rx="90" />
      </mask>
      <g mask="url(#a)">
        <path fill="#C62828" d="M425 .061H0v512h425v-512z" />
        <path fill="#151D68" d="M425 385.061h87v127h-87v-127z" />
        <path fill="#4351D9" d="M425 129.061h87v128h-87v-128z" />
        <path fill="#6570DF" d="M425 0h87v129.061h-87V0z" />
        <path fill="#2130AB" d="M425 257.061h87v128h-87v-128z" />
        <g>
          <path
            fill="#fff"
            d="M85.221 365.662l268.7-268.7v70L120.576 401.018l-35.355-35.356zm-14.143-98.994L240.784 96.962l-.004 70-134.346 135.061-35.356-35.355zm113.137 113.137l169.706-169.706v71.863L219.571 415.16l-35.356-35.355z"
          />
        </g>
      </g>
    </svg>
  );
}
