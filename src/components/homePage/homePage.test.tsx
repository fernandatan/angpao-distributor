import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Home from './homePage';

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    __esModule: true,
    ...originalModule,
    useNavigate: jest.fn(),
  };
});

describe('Home Component', () => {
  const navigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the form with all fields and submit button', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Angpao Amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of Participants/i)).toBeInTheDocument();
    expect(screen.getByText(/Distribute Angpao/i)).toBeInTheDocument();
  });

  test('displays validation errors when form is submitted with empty fields', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Distribute Angpao/i));

    expect(await screen.findByText(/Please enter an amount/i)).toBeInTheDocument();
    expect(await screen.findByText(/Please enter the number of participants/i)).toBeInTheDocument();
  });

  test('displays validation errors when form is submitted with invalid values', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const amountInput = screen.getByLabelText(/Angpao Amount/i);
    const participantsInput = screen.getByLabelText(/Number of Participants/i);

    fireEvent.change(amountInput, { target: { value: '-1' } });
    fireEvent.change(participantsInput, { target: { value: '0' } });

    fireEvent.click(screen.getByText(/Distribute Angpao/i));

    expect(await screen.findByText(/Amount must be greater than or equal to 1/i)).toBeInTheDocument();
    expect(await screen.findByText(/Number of participants must be greater than or equal to 1/i)).toBeInTheDocument();
  });

  test('distributes angpao correctly and navigates to result page', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const amountInput = screen.getByLabelText(/Angpao Amount/i);
    const participantsInput = screen.getByLabelText(/Number of Participants/i);

    fireEvent.change(amountInput, { target: { value: '100' } });
    fireEvent.change(participantsInput, { target: { value: '5' } });

    fireEvent.click(screen.getByText(/Distribute Angpao/i));

    expect(amountInput).toHaveValue(100);
    expect(participantsInput).toHaveValue(5);

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('../result', {
        replace: true,
        state: expect.objectContaining({ result: expect.any(Array) }),
      });
    });
  });
});
