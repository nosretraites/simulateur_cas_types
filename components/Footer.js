import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Footer(props) {

  useEffect(() => {
  }, [props])


  return (
    <footer className="footer">
      <div className='footerSocials'>
      <h5>réseaux sociaux</h5>

        <ul>
          <li>
            <a href='https://twitter.com/nosretraites'
              title="Suivez nous sur Twitter"
              target="_blank" rel="noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="icon icon-tabler icon-tabler-brand-twitter" width="1em" height="1em" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z" />
              </svg>
            </a>
          </li>
          <li>
            <a href='https://www.instagram.com/nosretraites/'
              title="Suivez nous sur Instagram"
              target="_blank" rel="noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="icon icon-tabler icon-tabler-brand-instagram" width="1em" height="1em" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <rect x="4" y="4" width="16" height="16" rx="4" />
                <circle cx="12" cy="12" r="3" />
                <line x1="16.5" y1="7.5" x2="16.5" y2="7.501" />
              </svg>
            </a>
          </li>
        </ul>
      </div>
      <div className='footerMandatory'>
        <ul>
          <li>
            <Link href='/legals'>
              Mentions légales
            </Link>
          </li>
          <li>
            <a href='https://blogs.mediapart.fr/collectif-nos-retraites/blog/110622/retraite-65-ans-quest-ce-qui-changerait-avec-le-projet-macron' target="_blank" rel="noreferrer">Retrouvez nos cas-types commentés sur notre blog médiapart</a>
          </li>
        </ul>
      </div>
      {/* <div><a href='https://twitter.com/nosretraites' target="_blank" rel="noreferrer">Suivez nous sur <img src="twitter-icon.svg" width={"50px"} /></a></div> */}
      {/* <div><a href='https://blogs.mediapart.fr/collectif-nos-retraites/blog/110622/retraite-65-ans-quest-ce-qui-changerait-avec-le-projet-macron' target="_blank" rel="noreferrer">Retrouvez nos cas-types commentés sur notre blog médiapart</a></div> */}
    </footer>
  )
}
