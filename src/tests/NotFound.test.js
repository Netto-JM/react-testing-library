import React from 'react';
import { screen, render } from '@testing-library/react';
import { NotFound } from '../pages';

describe('Testes do componente <NotFound.js />', () => {
  it('testa se a página contém um heading h2 com o texto Page requested not found', () => {
    render(<NotFound />);

    const notFoundHeading = screen.getByRole('heading', { name: 'Page requested not found' });
    expect(notFoundHeading).toBeInTheDocument();
  });

  it('testa se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    render(<NotFound />);

    const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    const sadPikachuImage = screen.getByRole('img');
    expect(sadPikachuImage).toHaveAttribute('src', URL);
    expect(sadPikachuImage).toHaveAttribute('alt', 'Pikachu crying because the page requested was not found');
    expect(sadPikachuImage).toBeInTheDocument();
  });
});
