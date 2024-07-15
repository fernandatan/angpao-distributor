import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Result from './resultPage';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    __esModule: true,
    ...originalModule,
    useNavigate: jest.fn(),
    useLocation: jest.fn(),
  };
});

describe('Result Component', () => {
  beforeEach(() => {
    const useNavigate = require('react-router-dom').useNavigate;
    const useLocation = require('react-router-dom').useLocation;

    useNavigate.mockReturnValue(jest.fn());
    useLocation.mockReturnValue({
      state: {
        result: [10, 20, 30],
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the Result component and displays the correct amounts', async () => {
    render(
      <MemoryRouter initialEntries={['/result']}>
        <Routes>
          <Route path="/result" element={<Result />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Angpao Distribution Result')).toBeInTheDocument();
    expect(screen.getByText('Participant')).toBeInTheDocument();
    expect(screen.getByText('Amount Received')).toBeInTheDocument();

    expect(await screen.findByText('Participant 1')).toBeInTheDocument();
    expect(await screen.findByText('$10')).toBeInTheDocument();
    expect(await screen.findByText('Participant 2')).toBeInTheDocument();
    expect(await screen.findByText('$20')).toBeInTheDocument();
    expect(await screen.findByText('Participant 3')).toBeInTheDocument();
    expect(await screen.findByText('$30')).toBeInTheDocument();
  });

  test('calls navigate function when redistribute angpao button is clicked', () => {
    const navigate = require('react-router-dom').useNavigate();

    render(
      <MemoryRouter initialEntries={['/result']}>
        <Routes>
          <Route path="/result" element={<Result />} />
        </Routes>
      </MemoryRouter>
    );

    const button = screen.getByText('Redistribute Angpao');
    fireEvent.click(button);

    expect(navigate).toHaveBeenCalledWith('../');
  });
});
