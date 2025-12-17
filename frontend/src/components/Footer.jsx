import React from 'react';

export default function Footer(){
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Up-Side-Vogue. Crafted in black, white & gold.</p>
      </div>
    </footer>
  );
}