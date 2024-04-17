import AsteroidFormClassComp from "../Asteroid/AsteroidFormClassComp";
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { act } from "react-dom/test-utils";

const mock = new MockAdapter(axios);

describe("Asteroid Form Classes Test", () => {
  beforeEach(() => {
    mock.reset();
  });

  it("Input Field Render Correctly", () => {
    render(
      <BrowserRouter>
        <AsteroidFormClassComp />
      </BrowserRouter>
    );
    const label = screen.getByLabelText("Enter Asteroid ID");
    expect(label).toBeInTheDocument();
    const Search = screen.getByText("Search");
    expect(Search).toBeInTheDocument();
    const RandomBtn = screen.getByText("Random Asteroid");
    expect(RandomBtn).toBeInTheDocument();
  });

  it("Input Field Change Function test", () => {
    render(
      <BrowserRouter>
        <AsteroidFormClassComp />
      </BrowserRouter>
    );
    const inputElement = screen.getByPlaceholderText("Enter Asteroid ID");
    fireEvent.change(inputElement, { target: { value: "2000433" } });
    expect(inputElement.value).toBe("2000433");
  });

  it("handleClick Button test", async () => {
    render(
      <BrowserRouter>
        <AsteroidFormClassComp navigate={jest.fn()} />
      </BrowserRouter>
    );
    const inputElement = screen.getByPlaceholderText("Enter Asteroid ID");
    const buttonElement = screen.getByText("Search");
    fireEvent.change(inputElement, { target: { value: "2000433" } });
    fireEvent.click(buttonElement);
    expect(window.location.pathname).toBe("/");
  });

  it("RandomClick Button test", async () => {
    render(
      <BrowserRouter>
        <AsteroidFormClassComp navigate={jest.fn()} />
      </BrowserRouter>
    );
    const inputElement = screen.getByPlaceholderText("Enter Asteroid ID");
    const buttonElement = screen.getByText("Random Asteroid");
    fireEvent.change(inputElement, { target: { value: "2000433" } });
    fireEvent.click(buttonElement);
    expect(window.location.pathname).toBe("/");
  });

  it("should Search code work properly", async () => {
    mock
      .onGet(
        "https://api.nasa.gov/neo/rest/v1/neo/2000433?api_key=6202jSPpG2GqkXh8LHBaPbumSZ1WVY8evbdOavNs"
      )
      .reply(200, { ok: true });
    render(
      <BrowserRouter>
        <AsteroidFormClassComp navigate={jest.fn()} />
      </BrowserRouter>
    );

    act(() => {
      fireEvent.change(screen.getByPlaceholderText("Enter Asteroid ID"), {
        target: { value: "2000433" },
      });
      fireEvent.click(screen.getByText("Search"));
    });
    await waitFor(() => {
      expect(mock.history.get.length).toBe(1);
      expect(mock.history.get[0].url).toBe(
        "https://api.nasa.gov/neo/rest/v1/neo/2000433?api_key=6202jSPpG2GqkXh8LHBaPbumSZ1WVY8evbdOavNs"
      );
    });
  });

  it("should Random code work properly", async () => {
    render(
      <BrowserRouter>
        <AsteroidFormClassComp navigate={() => {}} />
      </BrowserRouter>
    );
    mock
      .onGet(
        "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=6202jSPpG2GqkXh8LHBaPbumSZ1WVY8evbdOavNs"
      )
      .reply(200, { ok: true });

    await act(async () => {
      fireEvent.click(screen.getByText("Random Asteroid"));
    });
    await waitFor(() => {
      expect(mock.history.get.length).toBe(1);
      expect(mock.history.get[0].url).toBe(
        "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=6202jSPpG2GqkXh8LHBaPbumSZ1WVY8evbdOavNs"
      );
    });
  });

  it('displays error message when API call fails', async () => {
    render(
      <BrowserRouter>
        <AsteroidFormClassComp navigate={() => {}} />
      </BrowserRouter>
    );

    const inputElement = screen.getByPlaceholderText('Enter Asteroid ID');
    const buttonElement = screen.getByText('Search');

    mock.onGet().reply(500, { error: 'Server Error' });

    fireEvent.change(inputElement, { target: { value: '2000433' } });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(screen.getByText('Please Check Asteroid Id')).toBeInTheDocument();
    });  
  });
  
    it('displays error message when Random Button API call fails', async () => {
    render(
      <BrowserRouter>
        <AsteroidFormClassComp navigate={() => {}} />
      </BrowserRouter>
    );

    const inputElement = screen.getByPlaceholderText('Enter Asteroid ID');
    const buttonElement = screen.getByText('Random Asteroid');

    mock.onGet().reply(500, { error: 'Server Error' });

    fireEvent.change(inputElement, { target: { value: '2000433' } });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(screen.getByText('Error fetching random asteroid. Please try again.')).toBeInTheDocument();
    });
  });
});
