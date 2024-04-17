import React from 'react';
import { render, screen } from '@testing-library/react';
import DisplayAsteroidDetailsClassComp from '../Asteroid/DisplayAsteroidDetalisClassComp.tsx';
import "@testing-library/jest-dom";
import { BrowserRouter } from 'react-router-dom';

  test('renders "Go Back" link', () => {
    render(<BrowserRouter><DisplayAsteroidDetailsClassComp /></BrowserRouter>);
    const linkElement = screen.getByText("Go Back");
    expect(linkElement).toBeInTheDocument();
  });