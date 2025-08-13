import React, { useState } from 'react';

const Welcome = ({ onStart }) => (
  <div style={{ textAlign: 'center', maxWidth: 450, padding: 20 }}>
    <h1 style={{ fontSize: 48, fontWeight: 700, marginBottom: 10, color: '#ec4899' }}>Moyosola</h1>
    <p style={{ fontSize: 20, marginBottom: 30 }}>Welcome to your personalized Love Quiz 💖</p>
    <button
      onClick={onStart}
      style={{
        backgroundColor: '#8a2be2',
        border: 'none',
        padding: '15px 40px',
        fontSize: 18,
        color: 'white',
        borderRadius: 8,
        cursor: 'pointer',
        boxShadow: '0 8px 15px rgba(138, 43, 226, 0.3)',
        transition: '0.3s ease',
      }}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#6b21a8')}
      onMouseLea
