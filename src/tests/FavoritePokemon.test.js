import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente <FavoritePokemon.js />', () => {
  it('testa se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    render(<FavoritePokemon />);

    const noFavoriteMessage = screen.getByText('No favorite Pokémon found');
    expect(noFavoriteMessage).toBeInTheDocument();
  });

  it('Teste se são exibidos todos os cards de Pokémon favoritados', () => {
    renderWithRouter(<App />);

    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();

    userEvent.click(screen.getByRole('link', { name: 'More details' }));
    userEvent.click(screen.getByRole('checkbox', { name: 'Pokémon favoritado?' }));

    const homeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);

    const nextButton = screen.getByRole('button', { name: 'Próximo Pokémon' });
    userEvent.click(nextButton);
    userEvent.click(nextButton);

    const caterpie = screen.getByText('Caterpie');
    expect(caterpie).toBeInTheDocument();

    userEvent.click(screen.getByRole('link', { name: 'More details' }));
    userEvent.click(screen.getByRole('checkbox', { name: 'Pokémon favoritado?' }));

    const favoritesLink = screen.getByRole('link', { name: 'Favorite Pokémon' });
    userEvent.click(favoritesLink);

    const favoritePokemon = screen.getAllByTestId('pokemon-name');
    expect(favoritePokemon[0]).toHaveTextContent('Pikachu');
    expect(favoritePokemon[1]).toHaveTextContent('Caterpie');
  });
});
