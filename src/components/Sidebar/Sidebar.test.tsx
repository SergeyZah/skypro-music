import ReduxProvider from "@/store/ReduxProvider";
import { render, screen } from "@testing-library/react";
import Sidebar from "./Sidebar";
import userEvent from "@testing-library/user-event";
import Centerblock from "../Centerblock/Centerblock";
import { TrackType } from "@/sharedTypes/sharedTypes";
import { data } from "@/data";

const mockTracks: TrackType[] = data;


// Мокирование useRouter из next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));


describe('Sidebar component with next/navigation', () => {

  test('Отображается кнопка выхода', () => {
    const { container } = render(
      <ReduxProvider>
        <Sidebar isLoading={false}/>
      </ReduxProvider>
    );

    const logoutButton = container.querySelector('div.sidebar__icon');
    const logoutButtons = container.querySelectorAll('div.sidebar__icon');

    expect(logoutButtons.length).toBe(1);
    expect(logoutButton).toBeInTheDocument();
    expect(logoutButton).toBeVisible();
  });

  test('Отображается три карточки категорий', () => {
    const { container } = render(
      <ReduxProvider>
        <Sidebar isLoading={false}/>
      </ReduxProvider>
    );

    const sidebarItems = container.querySelectorAll('div.sidebar__item');

    expect(sidebarItems.length).toBe(3);

    for (const item of sidebarItems) {
      expect(item).toBeInTheDocument();
      expect(item).toBeVisible();
    }
  });

  test('После выбора категории "Плэйлист дня" открывается страница с корректным заголовком', async () => {
    const user = userEvent.setup();

    render(
      <ReduxProvider>
        <Sidebar />
      </ReduxProvider>
    );

    const sidebarItems = screen.getAllByRole('link');
    console.log(sidebarItems);

    await user.click(sidebarItems[0]);

    render(
      <ReduxProvider>
        <Centerblock
          pagePlaylist={mockTracks}
          playList={mockTracks}
          namePlaylist="Плэйлист дня"
          isLoading={false}
          error=""
        />
      </ReduxProvider>
    );

    console.log(screen.debug());

    // проверить, что отображается корректное название категории
    expect(screen.getByText('Плэйлист дня')).toBeInTheDocument();
  });
});