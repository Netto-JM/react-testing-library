import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente <App.js />', () => {
  it('testa se o primeiro link possui o texto Home, e redireciona para a página inicial ao ser clicado', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();

    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('testa se o primeiro link possui o texto About, e redireciona para a página de About ao ser clicado', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('testa se o primeiro link possui o texto Favorite Pokémon, e redireciona para a página de Pokémon Favoritados ao ser clicado', () => {
    const { history } = renderWithRouter(<App />);

    const favoritesLink = screen.getByRole('link', { name: 'Favorite Pokémon' });
    expect(favoritesLink).toBeInTheDocument();
    userEvent.click(favoritesLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('testa um caminho não existente e a renderização do Not Found', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/not/found/page');
    });

    const notFoundTitle = screen.getByRole('heading', { name: 'Page requested not found' });
    expect(notFoundTitle).toBeInTheDocument();
  });
});
