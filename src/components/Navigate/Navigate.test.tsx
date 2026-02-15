import ReduxProvider from "@/store/ReduxProvider";
import { render, screen } from "@testing-library/react";
import Navigate from "./Navigate";
import userEvent from "@testing-library/user-event";

// Мокирование useRouter из next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Navigation component', () => {

  test('Отображается логотип', async () => {
    render(
      <ReduxProvider>
        <Navigate />
      </ReduxProvider>
    )

    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
  });

  test('На странице отображается кнопка открытия бургер-меню', () => {
    const { container } = render(
      <ReduxProvider>
        <Navigate />
      </ReduxProvider>
    );

    const burgerButton = container.querySelector('div.nav__burger');

    expect(burgerButton).toBeInTheDocument();
    expect(burgerButton).toBeVisible();
  });

  test('На странице не отображается открытое бургер-меню', () => {
    const { container } = render(
      <ReduxProvider>
        <Navigate />
      </ReduxProvider>
    );

    const navMenu = container.querySelector('div.nav__menu');

    expect(navMenu).not.toBeInTheDocument();
  });

  test('После нажатия кнопки отображается открытое бургер-меню', async () => {
    const user = userEvent.setup();

    const { container } = render(
      <ReduxProvider>
        <Navigate />
      </ReduxProvider>
    );

    const burgerButton = container.querySelector('div.nav__burger');

    if (burgerButton) {
      await user.click(burgerButton);

      const burgerMenu = container.querySelector('div.nav__menu');

      expect(burgerMenu).toBeInTheDocument();
      expect(burgerMenu).toBeVisible();

      expect(screen.getByText('Главное')).toBeInTheDocument();
      expect(screen.getByText('Войти')).toBeInTheDocument();

    } else {
      throw new Error('Кнопка бургер-меню не найдена');
    }
  });

  test('После нажатия кнопки при открытом бургер-меню меню закрывается', async () => {
    const user = userEvent.setup();

    const { container } = render(
      <ReduxProvider>
        <Navigate />
      </ReduxProvider>
    );

    const burgerButton = container.querySelector('div.nav__burger');

    if (burgerButton) {
      // открыть бургер-меню
      await user.click(burgerButton);
      // закрыть бургер-меню
      await user.click(burgerButton);

      const burgerMenu = container.querySelector('div.nav__menu');

      expect(burgerMenu).not.toBeInTheDocument();
    } else {
      throw new Error('Кнопка бургер-меню не найдена');
    }
  });
});